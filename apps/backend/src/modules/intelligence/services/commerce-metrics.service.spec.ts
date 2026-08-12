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
        count: jest.fn(),
        aggregate: jest.fn(),
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

  const setupMocks = (orders: any[]) => {
    prismaService.commerceOrder.count.mockImplementation((args: any) => {
      if (args?.where?.financialStatus) {
        return orders.filter((o) =>
          ['pending', 'unpaid'].includes(o.financialStatus),
        ).length;
      }
      if (args?.where?.fulfillmentStatus) {
        return orders.filter((o) =>
          ['unfulfilled', 'partial'].includes(o.fulfillmentStatus),
        ).length;
      }
      return orders.length;
    });
    prismaService.commerceOrder.aggregate.mockResolvedValue({
      _sum: {
        totalPrice: orders.reduce(
          (sum, o) => sum + (Number(o.totalPrice) || 0),
          0,
        ),
      },
    });
    prismaService.commerceOrder.findMany.mockImplementation((args: any) => {
      if (args?.skip) return [];
      return orders.map((o, idx) => ({ id: `ord-${idx}`, ...o }));
    });
  };

  it('should return 0 metrics if no orders exist (Path 3: Zero orders)', async () => {
    setupMocks([]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(0);
    expect(metrics.totalGmv).toEqual(0);
    expect(metrics.codRejectionRate).toEqual(0);
    expect(metrics.avgFulfillmentDelayDays).toEqual(0);
  });

  it('should calculate Path 1 (Fulfilled Turnaround Mean) when fulfilled orders exist', async () => {
    setupMocks([
      {
        totalPrice: '100.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('2026-08-01T00:00:00Z'),
        externalUpdatedAt: new Date('2026-08-03T00:00:00Z'), // 2 days
      },
      {
        totalPrice: '200.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('2026-08-01T00:00:00Z'),
        externalUpdatedAt: new Date('2026-08-05T00:00:00Z'), // 4 days
      },
    ]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(2);
    expect(metrics.unfulfilledCount).toEqual(0);
    // (2 + 4) / 2 = 3.0 days
    expect(metrics.avgFulfillmentDelayDays).toEqual(3.0);
  });

  it('should verify Mixed Population Precedence: Path 1 (Fulfilled) wins over unfulfilled backlog', async () => {
    setupMocks([
      {
        totalPrice: '100.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('2026-08-01T00:00:00Z'),
        externalUpdatedAt: new Date('2026-08-03T00:00:00Z'), // 2 days
      },
      {
        totalPrice: '200.00',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
        externalCreatedAt: new Date('2026-01-01T00:00:00Z'), // 7+ months old unfulfilled
      },
    ]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(2);
    expect(metrics.unfulfilledCount).toEqual(1);
    // Path 1 primary precedence: 2.0 days from fulfilled order, unfulfilled backlog is ignored
    expect(metrics.avgFulfillmentDelayDays).toEqual(2.0);
  });

  it('should fall back to Path 2 (Unfulfilled Backlog Age) when 0 fulfilled orders exist', async () => {
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    const fourDaysAgo = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000);

    setupMocks([
      {
        totalPrice: '100.00',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
        externalCreatedAt: twoDaysAgo,
      },
      {
        totalPrice: '200.00',
        financialStatus: 'pending',
        fulfillmentStatus: 'unfulfilled',
        externalCreatedAt: fourDaysAgo,
      },
    ]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(2);
    expect(metrics.unfulfilledCount).toEqual(2);
    // Path 2 fallback mean: (2 + 4) / 2 = 3.0 days approx
    expect(metrics.avgFulfillmentDelayDays).toBeCloseTo(3.0, 1);
  });

  it('should safely exclude null, malformed, or chronologically inverted timestamps', async () => {
    setupMocks([
      {
        totalPrice: '100.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('2026-08-01T00:00:00Z'),
        externalUpdatedAt: new Date('2026-08-03T00:00:00Z'), // 2 days (valid)
      },
      {
        totalPrice: '150.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: null, // missing created_at
        externalUpdatedAt: new Date('2026-08-03T00:00:00Z'),
      },
      {
        totalPrice: '200.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('2026-08-05T00:00:00Z'),
        externalUpdatedAt: new Date('2026-08-01T00:00:00Z'), // inverted: updatedAt < createdAt
      },
      {
        totalPrice: '250.00',
        financialStatus: 'paid',
        fulfillmentStatus: 'fulfilled',
        externalCreatedAt: new Date('invalid-date'),
        externalUpdatedAt: new Date('2026-08-03T00:00:00Z'),
      },
    ]);

    const metrics = await service.calculateMetrics('org-123');

    expect(metrics.totalOrders).toEqual(4);
    // Only order 1 is valid (2 days). Orders 2, 3, 4 are excluded from delay calculation without crashing.
    expect(metrics.avgFulfillmentDelayDays).toEqual(2.0);
  });
});
