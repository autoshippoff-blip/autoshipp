import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, preferredOrgId?: string) {
    const activeMemberships =
      user.memberships?.filter(
        (m: any) =>
          m.status === 'ACTIVE' &&
          (!m.organization ||
            !m.organization.status ||
            m.organization.status === 'ACTIVE'),
      ) || [];

    if (activeMemberships.length === 0) {
      throw new UnauthorizedException('No active organization memberships');
    }

    let selectedMembership: any = null;

    if (preferredOrgId) {
      selectedMembership = activeMemberships.find(
        (m: any) => m.organizationId === preferredOrgId,
      );
    }

    if (!selectedMembership && activeMemberships.length === 1) {
      selectedMembership = activeMemberships[0];
    }

    if (!selectedMembership && activeMemberships.length > 1) {
      // Check if user has a remembered last active organization in session
      const lastSession = await this.prisma.session.findFirst({
        where: { userId: user.id, revokedAt: null },
        orderBy: { lastSeenAt: 'desc' },
      });

      if (lastSession?.lastActiveOrganizationId) {
        selectedMembership = activeMemberships.find(
          (m: any) => m.organizationId === lastSession.lastActiveOrganizationId,
        );
      }
    }

    // If multiple memberships exist and no org could be determined, return org picker payload
    if (!selectedMembership && activeMemberships.length > 1) {
      return {
        success: true,
        action: 'ORGANIZATION_SELECTION_REQUIRED',
        data: {
          availableOrganizations: activeMemberships.map((m: any) => ({
            id: m.organizationId,
            name:
              m.organization?.name ||
              m.organization?.displayName ||
              m.organizationId,
            type: m.organization?.type?.code || 'BRAND',
            logoUrl: m.organization?.logoUrl || null,
          })),
        },
      };
    }

    // Fallback safety if no membership matched preferred
    if (!selectedMembership) {
      selectedMembership = activeMemberships[0];
    }

    const payload = {
      sub: user.id,
      active_organization_id: selectedMembership.organizationId,
      // TEMPORARY FALLBACK: Preserved for legacy frontend compatibility during AES-039 transition
      organization_id: selectedMembership.organizationId,
      organization_type: selectedMembership.organization?.type?.code || 'BRAND',
      user_type: selectedMembership.organization?.type?.code || 'BRAND',
      role: selectedMembership.userRoles?.[0]?.role?.code || 'BRAND_ADMIN',
      token_version: user.tokenVersion ?? 1,
      membership_count: activeMemberships.length,
    };

    // Update Session record if active session exists
    const currentSession = await this.prisma.session.findFirst({
      where: { userId: user.id, revokedAt: null },
      orderBy: { lastSeenAt: 'desc' },
    });

    if (currentSession) {
      await this.prisma.session.update({
        where: { id: currentSession.id },
        data: {
          lastActiveOrganizationId: selectedMembership.organizationId,
          lastSeenAt: new Date(),
        },
      });
    }

    return {
      access_token: this.jwtService.sign(payload),
      active_organization_id: selectedMembership.organizationId,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: payload.role,
        activeOrganizationId: selectedMembership.organizationId,
      },
    };
  }

  async switchOrganization(userId: string, targetOrganizationId: string) {
    const membership = await this.prisma.membership.findFirst({
      where: {
        userId,
        organizationId: targetOrganizationId,
        status: 'ACTIVE',
        organization: {
          status: 'ACTIVE',
        },
      },
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
    });

    if (!membership) {
      throw new ForbiddenException(
        'User does not have an active membership in the target organization',
      );
    }

    const activeCount = await this.prisma.membership.count({
      where: {
        userId,
        status: 'ACTIVE',
        organization: {
          status: 'ACTIVE',
        },
      },
    });

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const session = await this.prisma.session.findFirst({
      where: { userId, revokedAt: null },
      orderBy: { lastSeenAt: 'desc' },
    });

    if (session) {
      await this.prisma.session.update({
        where: { id: session.id },
        data: {
          lastActiveOrganizationId: targetOrganizationId,
          lastSeenAt: new Date(),
        },
      });
    }

    const payload = {
      sub: user.id,
      active_organization_id: membership.organizationId,
      // TEMPORARY FALLBACK: Preserved for legacy frontend compatibility during AES-039 transition
      organization_id: membership.organizationId,
      organization_type:
        (membership.organization as any)?.type?.code || 'BRAND',
      user_type: (membership.organization as any)?.type?.code || 'BRAND',
      role: membership.userRoles?.[0]?.role?.code || 'BRAND_ADMIN',
      token_version: user.tokenVersion ?? 1,
      membership_count: activeCount,
    };

    return {
      access_token: this.jwtService.sign(payload),
      active_organization_id: targetOrganizationId,
      role: payload.role,
    };
  }

  async register(data: any) {
    const { email, password, firstName, lastName } = data;
    const existing = await this.usersService.findOne(email);
    if (existing) {
      throw new UnauthorizedException('Email already exists');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      email,
      passwordHash: hash,
      firstName,
      lastName,
    });
    const { passwordHash, ...result } = user;
    return result;
  }
}
