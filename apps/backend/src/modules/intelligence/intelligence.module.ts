import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { CommerceMetricsService } from './services/commerce-metrics.service';
import { LlmOrchestratorService } from './services/llm-orchestrator.service';
import { ExecutiveReportService } from './services/executive-report.service';
import { IntelligenceScorerService } from './services/intelligence-scorer.service';
import { PublicStoreCrawlerService } from './services/public-store-crawler.service';
import { IntelligenceExportService } from './services/intelligence-export.service';
import { IntelligenceScanProcessor } from './processors/intelligence-scan.processor';
import { OrganizationIntelligenceController } from './controllers/organization-intelligence.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'intelligence-scans',
    }),
  ],
  controllers: [OrganizationIntelligenceController],
  providers: [
    PrismaService,
    CommerceMetricsService,
    LlmOrchestratorService,
    ExecutiveReportService,
    PublicStoreCrawlerService,
    IntelligenceScorerService,
    IntelligenceExportService,
    IntelligenceScanProcessor,
  ],
  exports: [
    CommerceMetricsService,
    LlmOrchestratorService,
    ExecutiveReportService,
    PublicStoreCrawlerService,
    IntelligenceScorerService,
    IntelligenceExportService,
  ],
})
export class IntelligenceModule {}
