import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

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
}
