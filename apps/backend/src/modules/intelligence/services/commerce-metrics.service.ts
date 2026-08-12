import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';

export interface CommerceMetrics {
  totalOrders: number;
  totalGmv: number;
  aov: number;
  codPendingCount: number;
  codRejectionRate: number; // percentage (0 - 100)
  unfulfilledCount: number;
  avgFulfillmentDelayDays: number;
}

@Injectable()
export class CommerceMetricsService {
  private readonly logger = new Logger(CommerceMetricsService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Aggregates normalized commerce metrics from Phase 6 `CommerceOrder` records for a tenant.
   */
  async calculateMetrics(
    organizationId: string,
    storeId?: string,
  ): Promise<CommerceMetrics> {
    const whereCondition: any = { organizationId };
    if (storeId) {
      whereCondition.storeId = storeId;
    }

    const totalOrders = await this.prisma.commerceOrder.count({
      where: whereCondition,
    });

    if (totalOrders === 0) {
      return {
        totalOrders: 0,
        totalGmv: 0,
        aov: 0,
        codPendingCount: 0,
        codRejectionRate: 0,
        unfulfilledCount: 0,
        avgFulfillmentDelayDays: 0,
      };
    }

    // 1. Database-Native Aggregation for total GMV sum
    const gmvAggregate = await this.prisma.commerceOrder.aggregate({
      where: whereCondition,
      _sum: { totalPrice: true },
    });
    const totalGmvSum = Number(gmvAggregate._sum.totalPrice) || 0;

    // 2. Database-Native Aggregation for COD Pending Count
    const codPendingCount = await this.prisma.commerceOrder.count({
      where: {
        ...whereCondition,
        financialStatus: { in: ['pending', 'unpaid'] },
      },
    });

    // 3. Database-Native Aggregation for Unfulfilled Count
    const unfulfilledCount = await this.prisma.commerceOrder.count({
      where: {
        ...whereCondition,
        fulfillmentStatus: { in: ['unfulfilled', 'partial'] },
      },
    });

    const aov =
      totalOrders > 0 ? Number((totalGmvSum / totalOrders).toFixed(2)) : 0;
    const codRejectionRate =
      totalOrders > 0
        ? Number(((codPendingCount / totalOrders) * 100).toFixed(1))
        : 0;

    // 4. Chunked Fallback Processing for ADR-001 Fulfillment Delay Metrics
    // Uses bounded chunk size (e.g. 500) to ensure RAM usage is independent of total dataset size
    const CHUNK_SIZE = 500;
    let avgFulfillmentDelayDays = 0;
    let fulfilledValidCount = 0;
    let fulfilledDelaySum = 0;
    let unfulfilledValidCount = 0;
    let unfulfilledAgeSum = 0;

    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    let cursor: string | undefined = undefined;
    let hasMore = true;

    while (hasMore) {
      const chunk: Array<{
        id: string;
        fulfillmentStatus: string;
        externalCreatedAt: Date | null;
        externalUpdatedAt: Date | null;
      }> = await this.prisma.commerceOrder.findMany({
        where: whereCondition,
        take: CHUNK_SIZE,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { id: 'asc' },
        select: {
          id: true,
          fulfillmentStatus: true,
          externalCreatedAt: true,
          externalUpdatedAt: true,
        },
      });

      if (chunk.length === 0) {
        hasMore = false;
        break;
      }

      for (const o of chunk) {
        if (!o.externalCreatedAt) continue;
        const createdAtTime = new Date(o.externalCreatedAt).getTime();
        if (isNaN(createdAtTime)) continue;

        if (o.fulfillmentStatus === 'fulfilled' && o.externalUpdatedAt) {
          const updatedAtTime = new Date(o.externalUpdatedAt).getTime();
          if (!isNaN(updatedAtTime) && updatedAtTime >= createdAtTime) {
            fulfilledValidCount++;
            fulfilledDelaySum += (updatedAtTime - createdAtTime) / msPerDay;
          }
        } else if (
          o.fulfillmentStatus === 'unfulfilled' ||
          o.fulfillmentStatus === 'partial'
        ) {
          unfulfilledValidCount++;
          const ageMs = Math.max(0, now.getTime() - createdAtTime);
          unfulfilledAgeSum += ageMs / msPerDay;
        }
      }

      if (chunk.length < CHUNK_SIZE) {
        hasMore = false;
      } else {
        cursor = chunk[chunk.length - 1].id;
      }
    }

    if (fulfilledValidCount > 0) {
      avgFulfillmentDelayDays = Number(
        (fulfilledDelaySum / fulfilledValidCount).toFixed(1),
      );
    } else if (unfulfilledCount > 0 && unfulfilledValidCount > 0) {
      avgFulfillmentDelayDays = Number(
        (unfulfilledAgeSum / unfulfilledValidCount).toFixed(1),
      );
    }

    this.logger.log(
      `Calculated metrics for Org [${organizationId}]: Orders=${totalOrders}, GMV=${totalGmvSum}, COD%=${codRejectionRate}, DelayDays=${avgFulfillmentDelayDays}`,
    );

    return {
      totalOrders,
      totalGmv: Number(totalGmvSum.toFixed(2)),
      aov,
      codPendingCount,
      codRejectionRate,
      unfulfilledCount,
      avgFulfillmentDelayDays,
    };
  }
}
