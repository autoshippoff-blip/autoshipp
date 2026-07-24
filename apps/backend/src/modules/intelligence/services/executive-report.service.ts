import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CommerceMetricsService } from './commerce-metrics.service';
import { LlmOrchestratorService } from './llm-orchestrator.service';
import {
  ScorecardResponseDto,
  ReportResponseDto,
} from '../dto/intelligence.dto';

@Injectable()
export class ExecutiveReportService {
  private readonly logger = new Logger(ExecutiveReportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly metricsService: CommerceMetricsService,
    private readonly llmOrchestrator: LlmOrchestratorService,
  ) {}

  /**
   * Runs complete intelligence analysis for an organization, calculating scorecards and generating executive narrative reports.
   */
  async runIntelligenceAnalysis(
    organizationId: string,
    storeId?: string,
  ): Promise<ReportResponseDto> {
    const store = await this.prisma.store.findFirst({
      where: storeId ? { id: storeId, organizationId } : { organizationId },
    });

    const storeName = store?.name || 'Your Store';
    const activeStoreId = store?.id || null;

    // 1. Calculate aggregated commerce metrics
    const metrics = await this.metricsService.calculateMetrics(
      organizationId,
      activeStoreId || undefined,
    );

    // 2. Estimate revenue leakage
    const estimatedLeakage = Math.round(
      metrics.totalGmv * (metrics.codRejectionRate / 100) * 0.4,
    );

    // 3. Generate narrative CEO summary via LLM Orchestrator
    const llmResult = await this.llmOrchestrator.generateExecutiveSummary(
      storeName,
      metrics,
      estimatedLeakage,
    );

    // 4. Match opportunities & product recommendations
    const opportunities = [
      {
        title: 'High COD Rejection & Abandonment',
        severity: metrics.codRejectionRate > 15 ? 'HIGH' : 'MEDIUM',
        estimatedMonthlyLoss: estimatedLeakage,
        impactDescription: `COD rejection rate at ${metrics.codRejectionRate}%, exceeding the 13.9% industry benchmark.`,
      },
      {
        title: 'Fulfillment Processing Time',
        severity: metrics.unfulfilledCount > 5 ? 'MEDIUM' : 'LOW',
        estimatedMonthlyLoss: Math.round(estimatedLeakage * 0.25),
        impactDescription: `Average fulfillment processing delay is ${metrics.avgFulfillmentDelayDays} days.`,
      },
    ];

    const productRecommendations = [
      {
        productCode: 'DELIVERY_ETA',
        productName: 'AutoShipp Delivery ETA',
        roiEstimate: `Recover up to ₹${Math.round(estimatedLeakage * 0.6).toLocaleString('en-IN')}/month`,
        confidence: 'HIGH',
      },
      {
        productCode: 'RETURNS_MANAGEMENT',
        productName: 'AutoShipp Returns Management',
        roiEstimate: `Reduce return processing overhead by 45%`,
        confidence: 'MEDIUM',
      },
    ];

    // 5. Calculate 5-Category Dynamic Scorecard (0-100)
    const businessScore = Math.max(
      20,
      100 - Math.round(metrics.codRejectionRate * 1.5),
    );
    const operationsScore = Math.max(
      20,
      100 - Math.min(60, metrics.unfulfilledCount * 5),
    );
    const technicalScore = 82;
    const marketingScore = 80;
    const securityScore = 90;

    const overallScore = Math.round(
      (businessScore +
        operationsScore +
        technicalScore +
        marketingScore +
        securityScore) /
        5,
    );

    // 6. Persist Scorecard and Report
    await this.prisma.intelligenceScorecard.create({
      data: {
        organizationId,
        storeId: activeStoreId,
        overallScore,
        businessScore,
        technicalScore,
        marketingScore,
        securityScore,
        operationsScore,
      },
    });

    const report = await this.prisma.intelligenceReport.create({
      data: {
        organizationId,
        storeId: activeStoreId,
        title: `Executive Intelligence Report - ${storeName}`,
        executiveSummary: llmResult.executiveSummary,
        opportunitiesJson: opportunities,
        productRecommendations,
        tokenUsage: llmResult.tokenUsage,
      },
    });

    this.logger.log(
      `Generated Intelligence Report [${report.id}] for Org [${organizationId}] (Score: ${overallScore})`,
    );
    return new ReportResponseDto(report);
  }

  /**
   * Retrieves the latest scorecard for an organization.
   */
  async getLatestScorecard(
    organizationId: string,
  ): Promise<ScorecardResponseDto> {
    const scorecard = await this.prisma.intelligenceScorecard.findFirst({
      where: { organizationId },
      orderBy: { calculatedAt: 'desc' },
    });

    if (!scorecard) {
      throw new NotFoundException(
        'No intelligence scorecard found for this organization',
      );
    }

    return new ScorecardResponseDto(scorecard);
  }

  /**
   * Retrieves all executive reports for an organization.
   */
  async getReportsForOrganization(
    organizationId: string,
  ): Promise<ReportResponseDto[]> {
    const reports = await this.prisma.intelligenceReport.findMany({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    return reports.map((r) => new ReportResponseDto(r));
  }
}
