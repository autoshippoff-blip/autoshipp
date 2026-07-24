import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { CommerceMetricsService } from './services/commerce-metrics.service';
import { LlmOrchestratorService } from './services/llm-orchestrator.service';
import { ExecutiveReportService } from './services/executive-report.service';
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
    IntelligenceScanProcessor,
  ],
  exports: [
    CommerceMetricsService,
    LlmOrchestratorService,
    ExecutiveReportService,
  ],
})
export class IntelligenceModule {}
