import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IntelligenceScorerService } from './intelligence-scorer.service';
import { PrismaService } from '../../../prisma.service';
import { CommerceMetricsService } from './commerce-metrics.service';
import { PublicStoreCrawlerService } from './public-store-crawler.service';

describe('IntelligenceScorerService', () => {
  let service: IntelligenceScorerService;
  let prismaService: jest.Mocked<PrismaService>;
  let metricsService: jest.Mocked<CommerceMetricsService>;
  let crawlerService: jest.Mocked<PublicStoreCrawlerService>;

  const mockOrgId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const mockStoreId = 'b2f9e3d5-4c5b-5f6a-0b2c-3d4e5f6a7b8c';

  const mockMetrics = {
    totalOrders: 50,
    totalGmv: 25000,
    aov: 500,
    codPendingCount: 5,
    codRejectionRate: 10, // 10%
    unfulfilledCount: 4,
    avgFulfillmentDelayDays: 2.1,
  };

  const mockScorecard = {
    id: 'scorecard-uuid-1',
    organizationId: mockOrgId,
    storeId: mockStoreId,
    overallScore: 84,
    businessScore: 85,
    technicalScore: 82,
    marketingScore: 80,
    securityScore: 90,
    operationsScore: 80,
    calculatedAt: new Date('2026-08-04T12:00:00.000Z'),
  };

  beforeEach(async () => {
    const mockPrisma = {
      intelligenceScorecard: {
        create: jest.fn().mockResolvedValue(mockScorecard),
        findFirst: jest.fn(),
      },
      store: {
        findUnique: jest.fn().mockResolvedValue({ domain: 'mock-store.com' }),
      },
    };

    const mockMetricsService = {
      calculateMetrics: jest.fn().mockResolvedValue(mockMetrics),
    };

    const mockCrawlerService = {
      collectSignals: jest.fn().mockResolvedValue({}),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntelligenceScorerService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: CommerceMetricsService, useValue: mockMetricsService },
        { provide: PublicStoreCrawlerService, useValue: mockCrawlerService },
      ],
    }).compile();

    service = module.get<IntelligenceScorerService>(IntelligenceScorerService);
    prismaService = module.get(PrismaService);
    metricsService = module.get(CommerceMetricsService);
    crawlerService = module.get(PublicStoreCrawlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('computeAndSaveScorecard', () => {
    it('should calculate 5-dimension score and persist scorecard to DB', async () => {
      const result = await service.computeAndSaveScorecard(
        mockOrgId,
        mockStoreId,
      );

      expect(metricsService.calculateMetrics).toHaveBeenCalledWith(
        mockOrgId,
        mockStoreId,
      );

      // Business score calculation: 100 - (10 * 1.5) = 85
      // Operations score calculation: 100 - (4 * 5) = 80
      // Overall score: Math.round((85 + 80 + 82 + 80 + 90) / 5) = 83.4 -> 83
      expect(prismaService.intelligenceScorecard.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          organizationId: mockOrgId,
          storeId: mockStoreId,
          businessScore: 85,
          operationsScore: 80,
          technicalScore: 82,
          marketingScore: 80,
          securityScore: 90,
          overallScore: 83,
        }),
      });

      expect(result.organizationId).toEqual(mockOrgId);
      expect(result.id).toEqual(mockScorecard.id);
    });

    it('should clamp minimum scores to 20 when metrics are poor', async () => {
      metricsService.calculateMetrics.mockResolvedValueOnce({
        ...mockMetrics,
        codRejectionRate: 90, // Would give 100 - 135 = -35 -> clamped to 20
        unfulfilledCount: 30, // Would give 100 - 60 = 40
      });

      await service.computeAndSaveScorecard(mockOrgId);

      expect(prismaService.intelligenceScorecard.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          businessScore: 20,
          operationsScore: 40,
        }),
      });
    });
  });

  describe('getLatestScorecard', () => {
    it('should return latest scorecard for tenant organization', async () => {
      (
        prismaService.intelligenceScorecard.findFirst as jest.Mock
      ).mockResolvedValueOnce(mockScorecard);

      const result = await service.getLatestScorecard(mockOrgId);

      expect(
        prismaService.intelligenceScorecard.findFirst,
      ).toHaveBeenCalledWith({
        where: { organizationId: mockOrgId },
        orderBy: { calculatedAt: 'desc' },
      });
      expect(result.id).toEqual(mockScorecard.id);
      expect(result.overallScore).toEqual(mockScorecard.overallScore);
    });

    it('should throw NotFoundException when no scorecard exists', async () => {
      (
        prismaService.intelligenceScorecard.findFirst as jest.Mock
      ).mockResolvedValueOnce(null);

      await expect(service.getLatestScorecard(mockOrgId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
