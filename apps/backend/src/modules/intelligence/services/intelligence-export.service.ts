import {
  Injectable,
  Logger,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { Readable } from 'stream';

@Injectable()
export class IntelligenceExportService {
  private readonly logger = new Logger(IntelligenceExportService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates a CSV export of the latest intelligence scorecard and report
   * for a given organization, and returns it as a StreamableFile.
   */
  async exportIntelligenceCsv(
    organizationId: string,
  ): Promise<{ streamableFile: StreamableFile; filename: string }> {
    this.logger.log(`CSV export requested for Org [${organizationId}]`);

    // 1. Fetch Latest Scorecard and Report with explicit Tenant Isolation
    const scorecard = await this.prisma.intelligenceScorecard.findFirst({
      where: { organizationId },
      orderBy: { calculatedAt: 'desc' },
    });

    const report = await this.prisma.intelligenceReport.findFirst({
      where: { organizationId },
      orderBy: { createdAt: 'desc' },
    });

    if (!scorecard || !report) {
      this.logger.warn(
        `CSV export failed - no scorecard/report found for Org [${organizationId}]`,
      );
      throw new NotFoundException(
        'No intelligence report available for export.',
      );
    }

    // 2. Build CSV Buffer in-memory
    const csvBuffer = this.buildCsvBuffer(scorecard, report);

    // 3. Create StreamableFile from Buffer
    const stream = Readable.from(csvBuffer);
    const filename = `autoshipp-intelligence-${organizationId}-${Date.now()}.csv`;

    this.logger.log(
      `CSV export generated successfully for Org [${organizationId}] (${csvBuffer.length} bytes)`,
    );

    return {
      streamableFile: new StreamableFile(stream),
      filename,
    };
  }

  /**
   * Sanitizes a cell value to prevent CSV formula injection and formats it.
   */
  sanitizeCsvCell(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }

    let strValue = String(value);

    // CSV Injection Protection (escape cells starting with =, +, -, @, \t, \r)
    if (/^[=+\-@\t\r]/.test(strValue)) {
      strValue = "'" + strValue;
    }

    // Escape double quotes and enclose in double quotes if it contains commas, newlines, or quotes
    if (
      strValue.includes('"') ||
      strValue.includes(',') ||
      strValue.includes('\n')
    ) {
      strValue = `"${strValue.replace(/"/g, '""')}"`;
    }

    return strValue;
  }

  /**
   * Builds the 3-section CSV layout directly from persisted fields.
   */
  private buildCsvBuffer(scorecard: any, report: any): Buffer {
    const lines: string[] = [];

    // --- Section 1: Scorecard Dimensions ---
    lines.push('--- SCORECARD DIMENSIONS ---');
    lines.push(
      [
        'Organization ID',
        'Store ID',
        'Overall Score',
        'Business Score',
        'Technical Score',
        'Marketing Score',
        'Security Score',
        'Operations Score',
        'Calculated At',
      ]
        .map(this.sanitizeCsvCell)
        .join(','),
    );
    lines.push(
      [
        scorecard.organizationId,
        scorecard.storeId || '',
        scorecard.overallScore,
        scorecard.businessScore,
        scorecard.technicalScore,
        scorecard.marketingScore,
        scorecard.securityScore,
        scorecard.operationsScore,
        scorecard.calculatedAt.toISOString(),
      ]
        .map(this.sanitizeCsvCell)
        .join(','),
    );
    lines.push('');

    // --- Section 2: Executive Summary ---
    lines.push('--- EXECUTIVE SUMMARY ---');
    lines.push(
      [
        'Report ID',
        'Report Title',
        'Executive Summary Text',
        'Token Usage',
        'Created At',
      ]
        .map(this.sanitizeCsvCell)
        .join(','),
    );
    lines.push(
      [
        report.id,
        report.title,
        report.executiveSummary,
        report.tokenUsage,
        report.createdAt.toISOString(),
      ]
        .map(this.sanitizeCsvCell)
        .join(','),
    );
    lines.push('');

    // --- Section 3: Identified Opportunities & Recommendations ---
    lines.push('--- IDENTIFIED OPPORTUNITIES ---');
    lines.push(
      ['Category', 'Opportunity Title', 'Estimated Impact', 'Priority']
        .map(this.sanitizeCsvCell)
        .join(','),
    );

    let opportunities: any[] = [];
    if (report.opportunitiesJson) {
      if (typeof report.opportunitiesJson === 'string') {
        try {
          opportunities = JSON.parse(report.opportunitiesJson);
        } catch (e) {
          opportunities = [];
        }
      } else if (Array.isArray(report.opportunitiesJson)) {
        opportunities = report.opportunitiesJson;
      } else if (
        typeof report.opportunitiesJson === 'object' &&
        Array.isArray((report.opportunitiesJson as any).opportunities)
      ) {
        // Fallback for some json structures
        opportunities = (report.opportunitiesJson as any).opportunities;
      } else {
        opportunities = [report.opportunitiesJson];
      }
    }

    for (const opp of opportunities) {
      lines.push(
        [
          opp.category || '',
          opp.title || opp.name || '',
          opp.estimatedImpact || opp.impact || '',
          opp.priority || '',
        ]
          .map(this.sanitizeCsvCell)
          .join(','),
      );
    }

    // Combine all lines
    const csvContent = lines.join('\n');

    // Add UTF-8 BOM prefix (\uFEFF)
    const bom = Buffer.from([0xef, 0xbb, 0xbf]);
    const content = Buffer.from(csvContent, 'utf-8');

    return Buffer.concat([bom, content]);
  }
}
