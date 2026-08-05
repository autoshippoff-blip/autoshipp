import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
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

  async countAll() {
    return this.prisma.user.count({
      where: { deletedAt: null },
    });
  }

  /**
   * AES-042 User Erasure & Pseudonymization Flow (AES-042 §7, D-423, D-426).
   * Pseudonymizes PII in identity.users while retaining row & referential integrity.
   * Blocks erasure if user belongs to an organization under active legal hold.
   */
  async eraseUser(userId: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberships: {
          include: {
            organization: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // AES-042 §13 Legal Hold Verification (D-426)
    if (user.memberships) {
      for (const membership of user.memberships) {
        const org = membership.organization;
        if (org && org.metadata) {
          const meta =
            typeof org.metadata === 'object'
              ? (org.metadata as Record<string, any>)
              : JSON.parse((org.metadata as string) || '{}');
          if (meta.legal_hold === true) {
            throw new ForbiddenException(
              `User ${userId} cannot be erased because organization ${org.name} (${org.id}) is under active legal hold: ${meta.legal_hold_reason || 'Legal Hold Active'}`,
            );
          }
        }
      }
    }

    // Transactional Pseudonymization (Retains FK/UUID integrity, clears PII, revokes sessions)
    return this.prisma.$transaction(async (tx) => {
      const pseudonymizedEmail = `deleted_${userId}@deleted.autoshipp.in`;
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          email: pseudonymizedEmail,
          firstName: 'Deleted',
          lastName: 'User',
          phone: null,
          avatarUrl: null,
          status: 'ARCHIVED',
          deletedAt: new Date(),
        },
      });

      // Revoke all active sessions
      await tx.session.deleteMany({
        where: { userId },
      });

      return updatedUser;
    });
  }
}
