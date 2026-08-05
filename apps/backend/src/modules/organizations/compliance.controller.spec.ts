import { Test, TestingModule } from '@nestjs/testing';
import { ComplianceController } from './compliance.controller';
import { PrismaService } from '../../prisma.service';
import { ForbiddenException } from '@nestjs/common';

describe('ComplianceController Export API (AES-042 §14, D-429)', () => {
  let controller: ComplianceController;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplianceController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            loginHistory: {
              findMany: jest.fn().mockResolvedValue([{ id: 'log-1' }]),
            },
            membership: {
              findMany: jest.fn().mockResolvedValue([{ id: 'mem-1' }]),
            },
          },
        },
      ],
    }).compile();

    controller = module.get<ComplianceController>(ComplianceController);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should generate compliance evidence export payload for Platform OWNER', async () => {
    const platformOwnerUser = {
      sub: 'usr-owner',
      user_type: 'PLATFORM',
      role: 'OWNER',
    };

    const dto = {
      type: 'SOC2_EVIDENCE',
      startDate: '2026-01-01T00:00:00Z',
      endDate: '2026-12-31T23:59:59Z',
      scopes: ['access_reviews', 'login_history'],
    };

    const res = await controller.exportComplianceEvidence(
      { user: platformOwnerUser },
      dto,
    );

    expect(res.exportId).toContain('EXP-');
    expect(res.requestedBy).toBe('usr-owner');
    expect(res.evidence.loginHistoryCount).toBe(1);
    expect(res.evidence.activeMembershipCount).toBe(1);
  });

  it('should throw ForbiddenException if request is made by non-PLATFORM user', async () => {
    const brandUser = {
      sub: 'usr-brand',
      user_type: 'BRAND',
      role: 'ADMIN',
    };

    const dto = {
      type: 'SOC2_EVIDENCE',
      startDate: '2026-01-01T00:00:00Z',
      endDate: '2026-12-31T23:59:59Z',
      scopes: ['access_reviews'],
    };

    await expect(
      controller.exportComplianceEvidence({ user: brandUser }, dto),
    ).rejects.toThrow(ForbiddenException);
  });
});
