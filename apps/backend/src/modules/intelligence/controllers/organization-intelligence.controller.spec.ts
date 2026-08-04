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
  let exportService: jest.Mocked<IntelligenceExportService>;

  const mockOrgId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

  beforeEach(async () => {
    const mockReportService = {};
    const mockScorerService = {};
    const mockExportService = {
      exportIntelligenceCsv: jest.fn(),
    };
    const mockQueue = {};

    const mockPrismaService = {};

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationIntelligenceController],
      providers: [
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ExecutiveReportService, useValue: mockReportService },
        { provide: IntelligenceScorerService, useValue: mockScorerService },
        { provide: IntelligenceExportService, useValue: mockExportService },
        { provide: 'BullQueue_intelligence-scans', useValue: mockQueue },
      ],
    }).compile();

    controller = module.get<OrganizationIntelligenceController>(
      OrganizationIntelligenceController,
    );
    exportService = module.get(IntelligenceExportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
});
