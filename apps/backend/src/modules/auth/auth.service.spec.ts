import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

describe('AuthService & JwtStrategy (AES-039 Multi-Org Session Model)', () => {
  let authService: AuthService;
  let jwtStrategy: JwtStrategy;
  let prismaService: any;
  let usersService: any;
  let jwtService: any;

  beforeEach(async () => {
    prismaService = {
      session: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      membership: {
        findFirst: jest.fn(),
        count: jest.fn(),
      },
    };

    usersService = {
      findOne: jest.fn(),
      findById: jest.fn(),
    };

    jwtService = {
      sign: jest.fn(
        (payload) =>
          `signed_jwt_${payload.active_organization_id || payload.organization_id}`,
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtStrategy,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtStrategy = module.get<JwtStrategy>(JwtStrategy);
  });

  describe('Single Membership Login (AC-1)', () => {
    it('should auto-select active organization and issue JWT with AES-039 claims', async () => {
      const user = {
        id: 'user-uuid-1',
        email: 'admin@brand.com',
        firstName: 'John',
        lastName: 'Doe',
        tokenVersion: 1,
        memberships: [
          {
            organizationId: 'org-brand-1',
            status: 'ACTIVE',
            organization: { status: 'ACTIVE', type: { code: 'BRAND' } },
            userRoles: [{ role: { code: 'BRAND_ADMIN' } }],
          },
        ],
      };

      prismaService.session.findFirst.mockResolvedValue(null);

      const result = await authService.login(user);

      expect(result.active_organization_id).toBe('org-brand-1');
      expect(jwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          sub: 'user-uuid-1',
          active_organization_id: 'org-brand-1',
          organization_id: 'org-brand-1', // Temporary fallback
          user_type: 'BRAND',
          membership_count: 1,
        }),
      );
    });
  });

  describe('Multi-Membership Selection Flow (AC-2 & AC-3)', () => {
    it('should return ORGANIZATION_SELECTION_REQUIRED when no remembered org exists', async () => {
      const user = {
        id: 'user-uuid-2',
        email: 'aggregator@multi.com',
        tokenVersion: 1,
        memberships: [
          {
            organizationId: 'org-a',
            status: 'ACTIVE',
            organization: { name: 'Brand A', type: { code: 'BRAND' } },
          },
          {
            organizationId: 'org-b',
            status: 'ACTIVE',
            organization: { name: 'Brand B', type: { code: 'BRAND' } },
          },
        ],
      };

      prismaService.session.findFirst.mockResolvedValue(null);

      const selectionResult = (await authService.login(user)) as any;
      expect(selectionResult.action).toBe('ORGANIZATION_SELECTION_REQUIRED');
      expect(selectionResult.data.availableOrganizations).toHaveLength(2);
      expect(selectionResult.data.availableOrganizations[0].id).toBe('org-a');
    });

    it('should auto-select remembered lastActiveOrganizationId if session exists', async () => {
      const user = {
        id: 'user-uuid-2',
        email: 'aggregator@multi.com',
        tokenVersion: 1,
        memberships: [
          {
            organizationId: 'org-a',
            status: 'ACTIVE',
            organization: { type: { code: 'BRAND' } },
          },
          {
            organizationId: 'org-b',
            status: 'ACTIVE',
            organization: { type: { code: 'BRAND' } },
          },
        ],
      };

      prismaService.session.findFirst.mockResolvedValue({
        id: 'sess-123',
        lastActiveOrganizationId: 'org-b',
      });

      const result = await authService.login(user);

      expect(result.active_organization_id).toBe('org-b');
      expect(jwtService.sign).toHaveBeenCalledWith(
        expect.objectContaining({
          active_organization_id: 'org-b',
          membership_count: 2,
        }),
      );
    });
  });

  describe('Organization Switching (AC-4 & AC-5)', () => {
    it('should successfully switch organization and update session', async () => {
      prismaService.membership.findFirst.mockResolvedValue({
        organizationId: 'org-target-99',
        status: 'ACTIVE',
        organization: { status: 'ACTIVE', type: { code: 'BRAND' } },
        userRoles: [{ role: { code: 'BRAND_ADMIN' } }],
      });
      prismaService.membership.count.mockResolvedValue(3);
      usersService.findById.mockResolvedValue({
        id: 'user-uuid-1',
        tokenVersion: 1,
      });
      prismaService.session.findFirst.mockResolvedValue({ id: 'sess-1' });

      const result = await authService.switchOrganization(
        'user-uuid-1',
        'org-target-99',
      );

      expect(result.active_organization_id).toBe('org-target-99');
      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'sess-1' },
        data: expect.objectContaining({
          lastActiveOrganizationId: 'org-target-99',
        }),
      });
    });

    it('should throw ForbiddenException if user has no active membership in target org', async () => {
      prismaService.membership.findFirst.mockResolvedValue(null); // No active membership

      await expect(
        authService.switchOrganization('user-uuid-1', 'org-forbidden-99'),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('JwtStrategy Claims Mapping & Fallback', () => {
    it('should validate claims and extract active_organization_id to req.user.tenantId', async () => {
      usersService.findById.mockResolvedValue({
        id: 'user-1',
        tokenVersion: 2,
      });

      const payload = {
        sub: 'user-1',
        active_organization_id: 'org-active-777',
        user_type: 'BRAND',
        role: 'BRAND_ADMIN',
        token_version: 2,
        membership_count: 2,
      };

      const result = await jwtStrategy.validate(payload);

      expect(result.tenantId).toBe('org-active-777');
      expect(result.active_organization_id).toBe('org-active-777');
      expect(result.membership_count).toBe(2);
    });

    it('should support temporary fallback to organization_id for legacy tokens', async () => {
      usersService.findById.mockResolvedValue({
        id: 'user-1',
        tokenVersion: 1,
      });

      const legacyPayload = {
        sub: 'user-1',
        organization_id: 'org-legacy-123',
        token_version: 1,
      };

      const result = await jwtStrategy.validate(legacyPayload);

      expect(result.tenantId).toBe('org-legacy-123');
      expect(result.active_organization_id).toBe('org-legacy-123');
    });
  });
});
