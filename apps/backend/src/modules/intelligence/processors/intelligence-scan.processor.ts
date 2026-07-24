import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { ExecutiveReportService } from '../services/executive-report.service';

export interface IntelligenceScanJobData {
  organizationId: string;
  storeId?: string;
  triggerSource: string; // 'ONBOARDING' | 'SCHEDULED' | 'MANUAL'
}

@Processor('intelligence-scans')
export class IntelligenceScanProcessor extends WorkerHost {
  private readonly logger = new Logger(IntelligenceScanProcessor.name);

  constructor(private readonly reportService: ExecutiveReportService) {
    super();
  }

  async process(job: Job<IntelligenceScanJobData>): Promise<void> {
    const { organizationId, storeId, triggerSource } = job.data;
    this.logger.log(
      `Executing Intelligence Scan Job [${job.id}] for Org [${organizationId}] (Source: ${triggerSource})`,
    );

    try {
      await this.reportService.runIntelligenceAnalysis(organizationId, storeId);
      this.logger.log(
        `Intelligence Scan Job [${job.id}] completed successfully`,
      );
    } catch (error) {
      this.logger.error(`Error in Intelligence Scan Job [${job.id}]:`, error);
      throw error;
    }
  }
}
