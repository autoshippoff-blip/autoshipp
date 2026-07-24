import { Test, TestingModule } from '@nestjs/testing';
import { ExecutiveReportService } from './executive-report.service';
import { CommerceMetricsService } from './commerce-metrics.service';
import { LlmOrchestratorService } from './llm-orchestrator.service';
import { PrismaService } from '../../../prisma.service';

describe('ExecutiveReportService', () => {
  let service: ExecutiveReportService;
  let prismaService: any;
  let metricsService: any;
  let llmOrchestrator: any;

  beforeEach(async () => {
    prismaService = {
      store: {
        findFirst: jest.fn(),
      },
      intelligenceScorecard: {
        create: jest.fn(),
        findFirst: jest.fn(),
      },
      intelligenceReport: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    };

    metricsService = {
      calculateMetrics: jest.fn(),
    };

    llmOrchestrator = {
      generateExecutiveSummary: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExecutiveReportService,
        { provide: PrismaService, useValue: prismaService },
        { provide: CommerceMetricsService, useValue: metricsService },
        { provide: LlmOrchestratorService, useValue: llmOrchestrator },
      ],
    }).compile();

    service = module.get<ExecutiveReportService>(ExecutiveReportService);
  });

  it('should run analysis, compute scorecards, match product recommendations, and persist report', async () => {
    prismaService.store.findFirst.mockResolvedValue({
      id: 'store-1',
      name: 'Demo Store',
    });
    metricsService.calculateMetrics.mockResolvedValue({
      totalOrders: 100,
      totalGmv: 100000,
      aov: 1000,
      codPendingCount: 20,
      codRejectionRate: 20.0,
      unfulfilledCount: 5,
      avgFulfillmentDelayDays: 2.0,
    });
    llmOrchestrator.generateExecutiveSummary.mockResolvedValue({
      executiveSummary: 'Narrative summary mock text.',
      tokenUsage: 0,
      providerUsed: 'rule-based-template-engine',
    });
    prismaService.intelligenceScorecard.create.mockResolvedValue({
      id: 'scorecard-1',
    });
    prismaService.intelligenceReport.create.mockResolvedValue({
      id: 'report-1',
      organizationId: 'org-123',
      storeId: 'store-1',
      title: 'Executive Intelligence Report - Demo Store',
      executiveSummary: 'Narrative summary mock text.',
      opportunitiesJson: [],
      productRecommendations: [],
      tokenUsage: 0,
      createdAt: new Date(),
    });

    const reportDto = await service.runIntelligenceAnalysis(
      'org-123',
      'store-1',
    );

    expect(reportDto).toBeDefined();
    expect(reportDto.title).toContain('Demo Store');
    expect(prismaService.intelligenceScorecard.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        organizationId: 'org-123',
        businessScore: expect.any(Number),
        overallScore: expect.any(Number),
      }),
    });
    expect(prismaService.intelligenceReport.create).toHaveBeenCalled();
  });
});
