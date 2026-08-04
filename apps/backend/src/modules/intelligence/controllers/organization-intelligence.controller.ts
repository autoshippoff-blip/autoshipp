import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UseGuards,
  ParseUUIDPipe,
  Res,
  Header,
  StreamableFile,
} from '@nestjs/common';
import type { Response } from 'express';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { ExecutiveReportService } from '../services/executive-report.service';
import { IntelligenceScorerService } from '../services/intelligence-scorer.service';
import { IntelligenceExportService } from '../services/intelligence-export.service';
import {
  ScorecardResponseDto,
  ReportResponseDto,
  TriggerScanDto,
} from '../dto/intelligence.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { OrganizationGuard } from '../../auth/organization.guard';
import { PermissionGuard } from '../../auth/permission.guard';
import { RequirePermissions } from '../../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../../auth/permissions.enum';

@Controller('organizations/:orgId/intelligence')
@UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
export class OrganizationIntelligenceController {
  constructor(
    private readonly reportService: ExecutiveReportService,
    private readonly scorerService: IntelligenceScorerService,
    private readonly exportService: IntelligenceExportService,
    @InjectQueue('intelligence-scans') private readonly scanQueue: Queue,
  ) {}

  @Get('scorecard')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async getScorecard(
    @Param('orgId', ParseUUIDPipe) orgId: string,
  ): Promise<ScorecardResponseDto> {
    return await this.scorerService.getLatestScorecard(orgId);
  }

  @Get('reports/export')
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async exportCsv(
    @Param('orgId', ParseUUIDPipe) orgId: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { streamableFile, filename } =
      await this.exportService.exportIntelligenceCsv(orgId);
    res.set({
      'Content-Disposition': `attachment; filename="${filename}"`,
    });
    return streamableFile;
  }

  @Get('reports')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async getReports(
    @Param('orgId', ParseUUIDPipe) orgId: string,
  ): Promise<ReportResponseDto[]> {
    return await this.reportService.getReportsForOrganization(orgId);
  }

  @Post('scan')
  @RequirePermissions(PlatformPermission.MARKETPLACE_READ)
  async triggerScan(
    @Param('orgId', ParseUUIDPipe) orgId: string,
    @Body() dto: TriggerScanDto,
  ): Promise<{ status: string; jobId: string }> {
    const job = await this.scanQueue.add(
      'manual-scan',
      {
        organizationId: orgId,
        storeId: dto.storeId,
        triggerSource: 'MANUAL',
      },
      {
        attempts: 3,
        backoff: { type: 'exponential', delay: 2000 },
      },
    );

    return {
      status: 'queued',
      jobId: job.id?.toString() || 'unknown',
    };
  }
}
