import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        memberships: {
          include: {
            organization: {
              include: {
                type: true,
              },
            },
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async findById(id: string): Promise<any | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        memberships: {
          include: {
            organization: {
              include: {
                type: true,
              },
            },
            userRoles: {
              include: {
                role: true,
              },
            },
          },
        },
      },
    });
  }

  async checkClient(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      return { active: false, reason: 'user_not_found' };
    }

    if (!user.memberships || user.memberships.length === 0) {
      return { active: false, reason: 'no_tenant' };
    }

    const membership =
      user.memberships.find((m) => m.status === 'ACTIVE') ||
      user.memberships[0];

    if (!membership.organization) {
      return { active: false, reason: 'account_not_found' };
    }

    if (membership.organization.status !== 'active') {
      return {
        active: false,
        reason: 'account_inactive',
        accountName: membership.organization.name,
      };
    }

    return {
      active: true,
      tenantId: membership.organization.id,
      accountName: membership.organization.name,
      status: membership.organization.status,
    };
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
