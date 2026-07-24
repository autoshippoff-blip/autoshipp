import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOrganizationRelationshipDto } from './dto/create-organization-relationship.dto';
import { TransferOrganizationRelationshipDto } from './dto/transfer-organization-relationship.dto';
import { RelationshipType } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrganizationRelationshipsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRelationship(
    childOrganizationId: string,
    createDto: Omit<CreateOrganizationRelationshipDto, 'childOrganizationId'>,
    userId: string,
  ) {
    try {
      return await this.prisma.organizationRelationship.create({
        data: {
          ...createDto,
          childOrganizationId,
          createdBy: userId,
          updatedBy: userId,
          approvedBy: userId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'An active relationship of this type already exists for the organization.',
        );
      }
      throw error;
    }
  }

  async transferRelationship(
    organizationId: string,
    transferDto: TransferOrganizationRelationshipDto,
    userId: string,
  ) {
    const { newParentId, reason } = transferDto;

    if (organizationId === newParentId) {
      throw new BadRequestException('Organization cannot be its own parent');
    }

    // Validate both organizations exist and get their types
    const [childOrg, newParentOrg] = await Promise.all([
      this.prisma.organization.findUnique({
        where: { id: organizationId },
        include: { type: true },
      }),
      this.prisma.organization.findUnique({
        where: { id: newParentId },
        include: { type: true },
      }),
    ]);

    if (!childOrg) {
      throw new NotFoundException('Organization to transfer not found');
    }
    if (!newParentOrg) {
      throw new NotFoundException('New parent organization not found');
    }

    const childTypeCode = childOrg.type.code;
    const parentTypeCode = newParentOrg.type.code;

    // 1. Prevent transferring Platform organization
    if (childTypeCode === 'PLATFORM') {
      throw new BadRequestException(
        'The PLATFORM organization cannot be transferred',
      );
    }

    // 3. Enforce hierarchy rules
    if (childTypeCode === 'AGGREGATOR' && parentTypeCode !== 'PLATFORM') {
      throw new BadRequestException(
        'An AGGREGATOR must be a child of the PLATFORM',
      );
    }
    if (
      childTypeCode === 'BRAND' &&
      parentTypeCode !== 'PLATFORM' &&
      parentTypeCode !== 'AGGREGATOR'
    ) {
      throw new BadRequestException(
        'A BRAND must be a child of the PLATFORM or an AGGREGATOR',
      );
    }

    // 4. Prevent hierarchy cycles
    // We must ensure newParentId is not a descendant of organizationId.
    const isCycle = await this.checkHierarchyCycle(organizationId, newParentId);
    if (isCycle) {
      throw new ConflictException(
        'Hierarchy cycle detected: The new parent is a descendant of the organization being transferred.',
      );
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const currentRelationship = await tx.organizationRelationship.findFirst(
          {
            where: {
              childOrganizationId: organizationId,
              active: true,
              relationshipType: RelationshipType.MANAGES,
            },
          },
        );

        const previousParentId =
          currentRelationship?.parentOrganizationId || null;

        if (currentRelationship) {
          await tx.organizationRelationship.update({
            where: { id: currentRelationship.id },
            data: {
              active: false,
              validTo: new Date(),
              updatedBy: userId,
            },
          });
        }

        await tx.organizationRelationship.create({
          data: {
            parentOrganizationId: newParentId,
            childOrganizationId: organizationId,
            relationshipType: RelationshipType.MANAGES,
            active: true,
            createdBy: userId,
            updatedBy: userId,
            approvedBy: userId,
          },
        });

        return await tx.organizationTransferHistory.create({
          data: {
            organizationId,
            previousParentId,
            newParentId,
            transferredBy: userId,
            approvedBy: userId,
            reason,
          },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'An active relationship of this type already exists for the organization.',
        );
      }
      throw error;
    }
  }

  async deactivateRelationship(relationshipId: string, userId: string) {
    const relationship = await this.prisma.organizationRelationship.findUnique({
      where: { id: relationshipId },
    });

    if (!relationship) {
      throw new NotFoundException('Relationship not found');
    }

    return this.prisma.organizationRelationship.update({
      where: { id: relationshipId },
      data: {
        active: false,
        validTo: new Date(),
        updatedBy: userId,
      },
    });
  }

  /**
   * Resolves the full chain of ancestor organization IDs, starting from the given organizationId
   * up to the root (PLATFORM). Used by modules like Wallet to determine hierarchy traversal
   * without leaking relationship semantics.
   *
   * @param organizationId The starting child organization ID
   * @returns An ordered array of organization IDs [child, parent, grandparent, ...]
   * @throws NotFoundException if the starting organization does not exist
   * @throws ConflictException if a hierarchy cycle is detected or MAX_DEPTH is exceeded
   */
  async getAncestorOrganizationIds(
    organizationId: string,
  ): Promise<readonly string[]> {
    const orgExists = await this.prisma.organization.findUnique({
      where: { id: organizationId },
      select: { id: true },
    });

    if (!orgExists) {
      throw new NotFoundException('Organization not found');
    }

    const path: string[] = [];
    let currentId: string | null = organizationId;
    let depth = 0;
    const MAX_DEPTH = 100;

    while (currentId) {
      if (depth >= MAX_DEPTH) {
        throw new ConflictException(
          'Hierarchy traversal exceeded maximum depth',
        );
      }

      if (path.includes(currentId)) {
        throw new ConflictException(
          'Hierarchy cycle detected during traversal',
        );
      }

      path.push(currentId);

      const parentRel = await this.prisma.organizationRelationship.findFirst({
        where: {
          childOrganizationId: currentId,
          active: true,
          relationshipType: RelationshipType.MANAGES,
        },
        select: { parentOrganizationId: true },
      });

      currentId = parentRel?.parentOrganizationId || null;
      depth++;
    }

    return Object.freeze([...path]);
  }

  /**
   * Checks if targetParentId is a descendant of sourceId.
   */
  private async checkHierarchyCycle(
    sourceId: string,
    targetParentId: string,
  ): Promise<boolean> {
    // We walk UP the tree from the targetParentId to see if we ever hit sourceId.
    // If we hit sourceId, then targetParentId is a descendant of sourceId (or IS sourceId, but we already checked that).
    let currentId: string | null = targetParentId;

    // Safety break to prevent infinite loops in case of corrupt DB data
    let depth = 0;
    const MAX_DEPTH = 100;

    while (currentId && depth < MAX_DEPTH) {
      if (currentId === sourceId) {
        return true;
      }

      const parentRel = await this.prisma.organizationRelationship.findFirst({
        where: {
          childOrganizationId: currentId,
          active: true,
          relationshipType: RelationshipType.MANAGES,
        },
        select: { parentOrganizationId: true },
      });

      currentId = parentRel?.parentOrganizationId || null;
      depth++;
    }

    return false;
  }
}
