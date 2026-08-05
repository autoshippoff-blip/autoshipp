import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { OrganizationStatus } from '@prisma/client';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrganizationTypes() {
    return this.prisma.organizationType.findMany({
      select: {
        id: true,
        code: true,
        displayName: true,
      },
    });
  }

  async create(createDto: CreateOrganizationDto, userId: string) {
    const org = await this.prisma.organization.create({
      data: {
        ...createDto,
        createdBy: userId,
        updatedBy: userId,
      },
    });

    // Automatically create a membership for the creator
    await this.prisma.membership.create({
      data: {
        userId,
        organizationId: org.id,
        status: 'ACTIVE',
      },
    });

    return org;
  }

  async findAll(userId: string) {
    // Only return organizations where the user has a membership
    return this.prisma.organization.findMany({
      where: {
        memberships: {
          some: {
            userId,
            status: 'ACTIVE',
          },
        },
        deletedAt: null,
      },
      include: {
        type: {
          select: {
            id: true,
            code: true,
            displayName: true,
          },
        },
      },
    });
  }

  async findOne(id: string, userId: string) {
    const org = await this.prisma.organization.findFirst({
      where: {
        id,
        memberships: {
          some: {
            userId,
            status: 'ACTIVE',
          },
        },
        deletedAt: null,
      },
      include: {
        type: {
          select: {
            id: true,
            code: true,
            displayName: true,
          },
        },
      },
    });

    if (!org) {
      throw new NotFoundException(
        `Organization with ID ${id} not found or you do not have access`,
      );
    }
    return org;
  }

  async update(id: string, updateDto: UpdateOrganizationDto, userId: string) {
    const org = await this.findOne(id, userId);

    return this.prisma.organization.update({
      where: { id: org.id },
      data: {
        ...updateDto,
        updatedBy: userId,
      },
    });
  }

  async countAll() {
    return this.prisma.organization.count({
      where: { deletedAt: null },
    });
  }

  async getRecent(limit: number = 5) {
    return this.prisma.organization.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        type: {
          select: {
            code: true,
            displayName: true,
          },
        },
      },
    });
  }

  /**
   * AES-042 Legal Hold Administration (AES-042 §13, D-426).
   * Places a legal hold on an organization to block all deletion and erasure requests.
   */
  async setLegalHold(
    orgId: string,
    reason: string,
    caseReference: string,
    imposedBy: string,
  ) {
    const org = await this.prisma.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) {
      throw new NotFoundException(`Organization with ID ${orgId} not found`);
    }

    const currentMetadata =
      ((org as any).metadata as Record<string, any>) || {};
    const updatedMetadata = {
      ...currentMetadata,
      legal_hold: true,
      legal_hold_reason: reason,
      legal_hold_reference: caseReference,
      legal_hold_imposed_by: imposedBy,
      legal_hold_imposed_at: new Date().toISOString(),
    };

    return this.prisma.organization.update({
      where: { id: orgId },
      data: { metadata: updatedMetadata },
    });
  }

  /**
   * AES-042 Lifts a legal hold from an organization.
   */
  async removeLegalHold(orgId: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) {
      throw new NotFoundException(`Organization with ID ${orgId} not found`);
    }

    const currentMetadata =
      ((org as any).metadata as Record<string, any>) || {};
    const {
      legal_hold,
      legal_hold_reason,
      legal_hold_reference,
      legal_hold_imposed_by,
      legal_hold_imposed_at,
      ...rest
    } = currentMetadata;

    return this.prisma.organization.update({
      where: { id: orgId },
      data: { metadata: rest },
    });
  }

  /**
   * AES-042 Soft-deletes an organization after verifying no active legal hold exists.
   */
  async deleteOrganization(orgId: string) {
    const org = await this.prisma.organization.findUnique({
      where: { id: orgId },
    });
    if (!org) {
      throw new NotFoundException(`Organization with ID ${orgId} not found`);
    }

    const metadata = ((org as any).metadata as Record<string, any>) || {};
    if (metadata.legal_hold === true) {
      throw new ForbiddenException(
        `Organization ${orgId} cannot be deleted because it is under active legal hold: ${metadata.legal_hold_reason || 'Legal Hold Active'}`,
      );
    }

    return this.prisma.organization.update({
      where: { id: orgId },
      data: { deletedAt: new Date(), status: OrganizationStatus.SUSPENDED },
    });
  }
}
