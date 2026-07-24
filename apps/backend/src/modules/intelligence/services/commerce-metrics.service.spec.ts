import { Test, TestingModule } from '@nestjs/testing';
import { CommerceMetricsService } from './commerce-metrics.service';
import { PrismaService } from '../../../prisma.service';

describe('CommerceMetricsService', () => {
  let service: CommerceMetricsService;
  let prismaService: any;

  beforeEach(async () => {
    prismaService = {
      commerceOrder: {
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommerceMetricsService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<CommerceMetricsService>(CommerceMetricsService);
  });

  it('should return 0 metrics if no orders exist', async () => {
    prismaService.commerceOrder.findMany.mockResolvedValue([]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(0);
    expect(metrics.totalGmv).toEqual(0);
    expect(metrics.codRejectionRate).toEqual(0);
  });

  it('should correctly aggregate GMV, AOV, and COD pending rejection rates', async () => {
    prismaService.commerceOrder.findMany.mockResolvedValue([
      {
        totalPrice: '100.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
      },
      {
        totalPrice: '200.00',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
      },
      {
        totalPrice: '300.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
      },
      {
        totalPrice: '400.00',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
      },
    ]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(4);
    expect(metrics.totalGmv).toEqual(1000.0);
    expect(metrics.aov).toEqual(250.0);
    expect(metrics.codPendingCount).toEqual(2);
    expect(metrics.codRejectionRate).toEqual(50.0); // 2 out of 4 = 50%
  });
});
