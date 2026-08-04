import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { CommerceMetricsService } from './commerce-metrics.service';
import { ScorecardResponseDto } from '../dto/intelligence.dto';
import { PublicStoreCrawlerService } from './public-store-crawler.service';

@Injectable()
export class IntelligenceScorerService {
  private readonly logger = new Logger(IntelligenceScorerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly metricsService: CommerceMetricsService,
    private readonly crawlerService: PublicStoreCrawlerService,
  ) {}

  /**
   * Computes a 5-dimension scorecard from commerce metrics and persists it for the specified organization.
   */
  async computeAndSaveScorecard(
    organizationId: string,
    storeId?: string,
  ): Promise<ScorecardResponseDto> {
    const metrics = await this.metricsService.calculateMetrics(
      organizationId,
      storeId,
    );

    let technicalScore = 82;
    let marketingScore = 80;
    let securityScore = 90;

    if (storeId) {
      const store = await this.prisma.store.findUnique({
        where: { id: storeId },
      });
      if (store?.domain) {
        // Collect signals strictly as defined by AES-043 Slice 2.
        // No new unbacked scoring formulas are applied here until defined by architecture.
        const signals = await this.crawlerService.collectSignals(store.domain);
        this.logger.log(
          `Received CrawlSignals for [${store.domain}]: ${JSON.stringify(signals)}`,
        );
      }
    }

    const businessScore = Math.max(
      20,
      100 - Math.round(metrics.codRejectionRate * 1.5),
    );
    const operationsScore = Math.max(
      20,
      100 - Math.min(60, metrics.unfulfilledCount * 5),
    );

    const overallScore = Math.round(
      (businessScore +
        operationsScore +
        technicalScore +
        marketingScore +
        securityScore) /
        5,
    );

    const scorecard = await this.prisma.intelligenceScorecard.create({
      data: {
        organizationId,
        storeId: storeId || null,
        overallScore,
        businessScore,
        technicalScore,
        marketingScore,
        securityScore,
        operationsScore,
      },
    });

    this.logger.log(
      `Persisted IntelligenceScorecard [${scorecard.id}] for Org [${organizationId}] (Score: ${overallScore})`,
    );

    return new ScorecardResponseDto(scorecard);
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
}
