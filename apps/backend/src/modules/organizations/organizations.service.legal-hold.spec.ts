import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsService } from './organizations.service';
import { PrismaService } from '../../prisma.service';
import { ForbiddenException } from '@nestjs/common';

describe('OrganizationsService Legal Hold & Deletion (AES-042 §13, D-426)', () => {
  let service: OrganizationsService;
  let prisma: PrismaService;

  const mockOrg = {
    id: 'org-100',
    name: 'Test Enterprise Org',
    metadata: { legal_hold: false },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationsService,
        {
          provide: PrismaService,
          useValue: {
            organization: {
              findUnique: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<OrganizationsService>(OrganizationsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should set legal hold on organization metadata', async () => {
    jest
      .spyOn(prisma.organization, 'findUnique')
      .mockResolvedValue(mockOrg as any);
    jest
      .spyOn(prisma.organization, 'update')
      .mockImplementation((args: any) => {
        return Promise.resolve({
          ...mockOrg,
          metadata: args.data.metadata,
        } as any) as any;
      });

    const res = await service.setLegalHold(
      'org-100',
      'Regulatory audit',
      'CASE-2026-999',
      'usr-owner',
    );

    const meta = res.metadata as any;
    expect(meta.legal_hold).toBe(true);
    expect(meta.legal_hold_reason).toBe('Regulatory audit');
    expect(meta.legal_hold_reference).toBe('CASE-2026-999');
  });

  it('should prevent organization deletion when active legal hold exists', async () => {
    const orgWithLegalHold = {
      ...mockOrg,
      metadata: { legal_hold: true, legal_hold_reason: 'Tax Audit' },
    };

    jest
      .spyOn(prisma.organization, 'findUnique')
      .mockResolvedValue(orgWithLegalHold as any);

    await expect(service.deleteOrganization('org-100')).rejects.toThrow(
      ForbiddenException,
    );
  });

  it('should allow deletion when no active legal hold exists', async () => {
    jest
      .spyOn(prisma.organization, 'findUnique')
      .mockResolvedValue(mockOrg as any);
    jest.spyOn(prisma.organization, 'update').mockResolvedValue({
      ...mockOrg,
      status: 'SUSPENDED',
      deletedAt: new Date(),
    } as any);

    const res = await service.deleteOrganization('org-100');
    expect(res.status).toBe('SUSPENDED');
    expect(res.deletedAt).toBeDefined();
  });
});
