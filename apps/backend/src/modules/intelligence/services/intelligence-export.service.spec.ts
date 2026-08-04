import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { IntelligenceExportService } from './intelligence-export.service';
import { PrismaService } from '../../../prisma.service';

describe('IntelligenceExportService', () => {
  let service: IntelligenceExportService;
  let prismaService: jest.Mocked<PrismaService>;

  const mockOrgId = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

  const mockScorecard = {
    organizationId: mockOrgId,
    storeId: 'store-1',
    overallScore: 84,
    businessScore: 85,
    technicalScore: 82,
    marketingScore: 80,
    securityScore: 90,
    operationsScore: 80,
    calculatedAt: new Date('2026-08-04T12:00:00.000Z'),
  };

  const mockReport = {
    id: 'report-1',
    title: 'Executive Report',
    executiveSummary: 'This is a test summary with a comma, and "quotes".',
    tokenUsage: 1200,
    createdAt: new Date('2026-08-04T12:05:00.000Z'),
    opportunitiesJson: [
      {
        category: 'Business',
        title: '=Formula()', // Test CSV Injection
        estimatedImpact: '$1000',
        priority: 'High',
      },
    ],
  };

  beforeEach(async () => {
    const mockPrisma = {
      intelligenceScorecard: {
        findFirst: jest.fn(),
      },
      intelligenceReport: {
        findFirst: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntelligenceExportService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<IntelligenceExportService>(IntelligenceExportService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('exportIntelligenceCsv', () => {
    it('should generate CSV buffer, wrap in StreamableFile, and include UTF-8 BOM', async () => {
      (
        prismaService.intelligenceScorecard.findFirst as jest.Mock
      ).mockResolvedValue(mockScorecard);
      (
        prismaService.intelligenceReport.findFirst as jest.Mock
      ).mockResolvedValue(mockReport);

      const result = await service.exportIntelligenceCsv(mockOrgId);

      expect(
        prismaService.intelligenceScorecard.findFirst,
      ).toHaveBeenCalledWith({
        where: { organizationId: mockOrgId },
        orderBy: { calculatedAt: 'desc' },
      });
      expect(prismaService.intelligenceReport.findFirst).toHaveBeenCalledWith({
        where: { organizationId: mockOrgId },
        orderBy: { createdAt: 'desc' },
      });

      expect(result.streamableFile).toBeDefined();
      expect(result.filename).toMatch(
        new RegExp(`^autoshipp-intelligence-${mockOrgId}-\\d+\\.csv$`),
      );

      // Read the stream to verify content
      const stream = result.streamableFile.getStream();
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      // Verify UTF-8 BOM
      expect(buffer[0]).toBe(0xef);
      expect(buffer[1]).toBe(0xbb);
      expect(buffer[2]).toBe(0xbf);

      const content = buffer.toString('utf-8');

      // Verify deterministic fields
      expect(content).toContain('--- SCORECARD DIMENSIONS ---');
      expect(content).toContain('84,85,82,80,90,80');

      expect(content).toContain('--- EXECUTIVE SUMMARY ---');
      expect(content).toContain('report-1');
      // Quotes should be escaped properly
      expect(content).toContain(
        '"This is a test summary with a comma, and ""quotes""."',
      );

      // Verify CSV Injection Protection on '=Formula()'
      expect(content).toContain("'=Formula()");
    });

    it('should throw NotFoundException if scorecard is missing', async () => {
      (
        prismaService.intelligenceScorecard.findFirst as jest.Mock
      ).mockResolvedValue(null);
      (
        prismaService.intelligenceReport.findFirst as jest.Mock
      ).mockResolvedValue(mockReport);

      await expect(service.exportIntelligenceCsv(mockOrgId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if report is missing', async () => {
      (
        prismaService.intelligenceScorecard.findFirst as jest.Mock
      ).mockResolvedValue(mockScorecard);
      (
        prismaService.intelligenceReport.findFirst as jest.Mock
      ).mockResolvedValue(null);

      await expect(service.exportIntelligenceCsv(mockOrgId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('sanitizeCsvCell', () => {
    it('should handle null/undefined', () => {
      expect(service.sanitizeCsvCell(null)).toBe('');
      expect(service.sanitizeCsvCell(undefined)).toBe('');
    });

    it('should protect against CSV injection (+, -, =, @, \\t, \\r)', () => {
      expect(service.sanitizeCsvCell('=SUM(A1:A2)')).toBe("'=SUM(A1:A2)");
      expect(service.sanitizeCsvCell('+1+2')).toBe("'+1+2");
      expect(service.sanitizeCsvCell('-100')).toBe("'-100");
      expect(service.sanitizeCsvCell('@test')).toBe("'@test");
      expect(service.sanitizeCsvCell('\ttest')).toBe("'\ttest");
      expect(service.sanitizeCsvCell('\rtest')).toBe("'\rtest");
    });

    it('should properly escape double quotes and enclose in quotes if needed', () => {
      expect(service.sanitizeCsvCell('Normal Text')).toBe('Normal Text');
      expect(service.sanitizeCsvCell('Text, with comma')).toBe(
        '"Text, with comma"',
      );
      expect(service.sanitizeCsvCell('Text "with quotes"')).toBe(
        '"Text ""with quotes"""',
      );
      expect(service.sanitizeCsvCell('Text\nwith newline')).toBe(
        '"Text\nwith newline"',
      );
    });
  });
});
