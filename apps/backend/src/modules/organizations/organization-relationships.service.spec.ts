import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationRelationshipsService } from './organization-relationships.service';
import { PrismaService } from '../../prisma.service';
import { RelationshipType, Prisma } from '@prisma/client';
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

describe('OrganizationRelationshipsService', () => {
  let service: OrganizationRelationshipsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    organization: {
      findUnique: jest.fn(),
    },
    organizationRelationship: {
      create: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      findUnique: jest.fn(),
    },
    organizationTransferHistory: {
      create: jest.fn(),
    },
    $transaction: jest.fn((callback) => callback(mockPrismaService)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrganizationRelationshipsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrganizationRelationshipsService>(
      OrganizationRelationshipsService,
    );
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRelationship', () => {
    it('should throw ConflictException on P2002 error', async () => {
      mockPrismaService.organizationRelationship.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('msg', {
          code: 'P2002',
          clientVersion: '1',
        }),
      );

      await expect(
        service.createRelationship(
          'child',
          { parentOrganizationId: 'parent', relationshipType: 'MANAGES' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('transferRelationship', () => {
    it('should throw BadRequestException if newParentId equals organizationId', async () => {
      await expect(
        service.transferRelationship(
          'org-1',
          { newParentId: 'org-1', reason: 'self transfer' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if child organization is missing', async () => {
      mockPrismaService.organization.findUnique.mockResolvedValueOnce(null);

      await expect(
        service.transferRelationship(
          'org-1',
          { newParentId: 'new-parent' },
          'user-1',
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if transferring PLATFORM', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'org-1', type: { code: 'PLATFORM' } })
        .mockResolvedValueOnce({ id: 'org-2', type: { code: 'BRAND' } });

      await expect(
        service.transferRelationship(
          'org-1',
          { newParentId: 'org-2' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if AGGREGATOR parent is not PLATFORM', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'child', type: { code: 'AGGREGATOR' } })
        .mockResolvedValueOnce({ id: 'parent', type: { code: 'BRAND' } });

      await expect(
        service.transferRelationship(
          'child',
          { newParentId: 'parent' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if BRAND parent is invalid', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'child', type: { code: 'BRAND' } })
        .mockResolvedValueOnce({ id: 'parent', type: { code: 'BRAND' } });

      await expect(
        service.transferRelationship(
          'child',
          { newParentId: 'parent' },
          'user-1',
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if hierarchy cycle is detected', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'child', type: { code: 'BRAND' } })
        .mockResolvedValueOnce({ id: 'parent', type: { code: 'AGGREGATOR' } });

      // Mock cycle check: parent is child of child
      mockPrismaService.organizationRelationship.findFirst.mockResolvedValueOnce(
        {
          parentOrganizationId: 'child',
        },
      );

      await expect(
        service.transferRelationship(
          'child',
          { newParentId: 'parent' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
    });

    it('should successfully transfer and log history', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'child', type: { code: 'BRAND' } })
        .mockResolvedValueOnce({ id: 'parent', type: { code: 'AGGREGATOR' } });

      // Mock cycle check: no cycle
      mockPrismaService.organizationRelationship.findFirst
        .mockResolvedValueOnce(null) // hierarchy check loop 1
        .mockResolvedValueOnce({
          id: 'rel-1',
          parentOrganizationId: 'old-parent',
          childOrganizationId: 'child',
          active: true,
        }); // find current relationship in transaction

      mockPrismaService.organizationRelationship.update.mockResolvedValue({});
      mockPrismaService.organizationRelationship.create.mockResolvedValue({});
      mockPrismaService.organizationTransferHistory.create.mockResolvedValue(
        {},
      );

      await service.transferRelationship(
        'child',
        { newParentId: 'parent', reason: 'acquisition' },
        'user-1',
      );

      expect(
        mockPrismaService.organizationRelationship.update,
      ).toHaveBeenCalledWith({
        where: { id: 'rel-1' },
        data: expect.objectContaining({ active: false }),
      });

      expect(
        mockPrismaService.organizationTransferHistory.create,
      ).toHaveBeenCalledWith({
        data: expect.objectContaining({
          organizationId: 'child',
          previousParentId: 'old-parent',
          newParentId: 'parent',
        }),
      });
    });

    it('should map P2002 to ConflictException on transaction failure', async () => {
      mockPrismaService.organization.findUnique
        .mockResolvedValueOnce({ id: 'child', type: { code: 'BRAND' } })
        .mockResolvedValueOnce({ id: 'parent', type: { code: 'AGGREGATOR' } });

      // Mock cycle check: no cycle
      mockPrismaService.organizationRelationship.findFirst
        .mockResolvedValueOnce(null) // hierarchy check
        .mockResolvedValueOnce(null); // transaction find

      mockPrismaService.organizationRelationship.create.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('msg', {
          code: 'P2002',
          clientVersion: '1',
        }),
      );

      await expect(
        service.transferRelationship(
          'child',
          { newParentId: 'parent' },
          'user-1',
        ),
      ).rejects.toThrow(ConflictException);
    });
  });
});
