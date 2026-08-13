import { Test, TestingModule } from '@nestjs/testing';
import { StreamableFile } from '@nestjs/common';
import { OrganizationIntelligenceController } from './organization-intelligence.controller';
import { PrismaService } from '../../../prisma.service';
import { ExecutiveReportService } from '../services/executive-report.service';
import { IntelligenceScorerService } from '../services/intelligence-scorer.service';
import { IntelligenceExportService } from '../services/intelligence-export.service';
import { Readable } from 'stream';

describe('OrganizationIntelligenceController', () => {
  let controller: OrganizationIntelligenceController;
  let scorerService: jest.Mocked<IntelligenceScorerService>;
  let reportService: jest.Mocked<ExecutiveReportService>;
  let exportService: jest.Mocked<IntelligenceExportService>;
  let mockQueue: jest.Mocked<any>;

  const mockOrgId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
  const mockStoreId = 'b2f9e3d5-4c5b-5f6a-0b2c-3d4e5f6a7b8c';

  beforeEach(async () => {
    const mockReportService = {
      getReportsForOrganization: jest.fn(),
    };
    const mockScorerService = {
      getLatestScorecard: jest.fn(),
    };
    const mockExportService = {
      exportIntelligenceCsv: jest.fn(),
    };
    const queueMock = {
      add: jest.fn(),
    };

    const mockPrismaService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationIntelligenceController],
      providers: [
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ExecutiveReportService, useValue: mockReportService },
        { provide: IntelligenceScorerService, useValue: mockScorerService },
        { provide: IntelligenceExportService, useValue: mockExportService },
        { provide: 'BullQueue_intelligence-scans', useValue: queueMock },
      ],
    }).compile();

    controller = module.get<OrganizationIntelligenceController>(
      OrganizationIntelligenceController,
    );
    scorerService = module.get(IntelligenceScorerService);
    reportService = module.get(ExecutiveReportService);
    exportService = module.get(IntelligenceExportService);
    mockQueue = module.get('BullQueue_intelligence-scans');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /organizations/:orgId/intelligence/scorecard', () => {
    it('should delegate to IntelligenceScorerService.getLatestScorecard', async () => {
      const mockScorecard: any = {
        id: 'scorecard-123',
        organizationId: mockOrgId,
        overallScore: 85,
      };
      scorerService.getLatestScorecard.mockResolvedValueOnce(mockScorecard);

      const result = await controller.getScorecard(mockOrgId);

      expect(scorerService.getLatestScorecard).toHaveBeenCalledWith(mockOrgId);
      expect(result).toEqual(mockScorecard);
    });
  });

  describe('GET /organizations/:orgId/intelligence/reports', () => {
    it('should delegate to ExecutiveReportService.getReportsForOrganization', async () => {
      const mockReports: any[] = [
        { id: 'report-1', title: 'Executive Report 1' },
      ];
      reportService.getReportsForOrganization.mockResolvedValueOnce(
        mockReports,
      );

      const result = await controller.getReports(mockOrgId);

      expect(reportService.getReportsForOrganization).toHaveBeenCalledWith(
        mockOrgId,
      );
      expect(result).toEqual(mockReports);
    });
  });

  describe('GET /organizations/:orgId/intelligence/reports/export', () => {
    it('should set Content-Disposition header and return StreamableFile', async () => {
      const mockStream = Readable.from(Buffer.from('test csv content'));
      const mockStreamableFile = new StreamableFile(mockStream);
      const mockFilename = `autoshipp-intelligence-${mockOrgId}-12345.csv`;

      exportService.exportIntelligenceCsv.mockResolvedValueOnce({
        streamableFile: mockStreamableFile,
        filename: mockFilename,
      });

      const mockResponse: any = {
        set: jest.fn(),
      };

      const result = await controller.exportCsv(mockOrgId, mockResponse);

      expect(exportService.exportIntelligenceCsv).toHaveBeenCalledWith(
        mockOrgId,
      );
      expect(mockResponse.set).toHaveBeenCalledWith({
        'Content-Disposition': `attachment; filename="${mockFilename}"`,
      });
      expect(result).toBeInstanceOf(StreamableFile);
    });
  });

  describe('POST /organizations/:orgId/intelligence/scan', () => {
    it('should enqueue a manual scan job to intelligence-scans queue', async () => {
      mockQueue.add.mockResolvedValueOnce({ id: 'job-123' });

      const result = await controller.triggerScan(mockOrgId, {
        storeId: mockStoreId,
      });

      expect(mockQueue.add).toHaveBeenCalledWith(
        'manual-scan',
        {
          organizationId: mockOrgId,
          storeId: mockStoreId,
          triggerSource: 'MANUAL',
        },
        expect.any(Object),
      );
      expect(result).toEqual({ status: 'queued', jobId: 'job-123' });
    });
  });
});
