import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { SubscriptionStatus } from '@prisma/client';

@Injectable()
export class SubscriptionLifecycleService {
  private readonly logger = new Logger(SubscriptionLifecycleService.name);
  private readonly DEFAULT_GRACE_PERIOD_DAYS = 7;

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Initiates the grace period for a subscription, typically after payment fails.
   */
  async initiateGracePeriod(subscriptionId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) {
        throw new Error(`Subscription ${subscriptionId} not found`);
      }

      if (
        subscription.status !== SubscriptionStatus.ACTIVE &&
        subscription.status !== SubscriptionStatus.PAST_DUE
      ) {
        return; // Only Active or Past Due can enter grace period
      }

      const gracePeriodStartsAt = new Date();
      const gracePeriodEndsAt = new Date();
      gracePeriodEndsAt.setDate(
        gracePeriodEndsAt.getDate() + this.DEFAULT_GRACE_PERIOD_DAYS,
      );

      await tx.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: SubscriptionStatus.GRACE_PERIOD,
          suspendedAt: null,
          gracePeriodStartsAt,
          gracePeriodEndsAt,
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateType: 'SUBSCRIPTION',
          aggregateId: subscriptionId,
          eventType: 'GRACE_PERIOD_STARTED',
          payload: {
            subscriptionId,
            organizationId: subscription.organizationId,
            gracePeriodEndsAt: gracePeriodEndsAt.toISOString(),
          },
        },
      });
    });
  }

  /**
   * Processes expired grace periods by emitting a suspension event to the worker.
   */
  async processExpiredGracePeriods(): Promise<number> {
    const expiredSubscriptions = await this.prisma.subscription.findMany({
      where: {
        status: SubscriptionStatus.GRACE_PERIOD,
        gracePeriodEndsAt: {
          lt: new Date(),
        },
      },
    });

    let count = 0;
    for (const sub of expiredSubscriptions) {
      await this.prisma.$transaction(async (tx) => {
        // Double check status in transaction
        const current = await tx.subscription.findUnique({
          where: { id: sub.id },
        });
        if (current?.status === SubscriptionStatus.GRACE_PERIOD) {
          await tx.outboxEvent.create({
            data: {
              aggregateType: 'SUBSCRIPTION',
              aggregateId: sub.id,
              eventType: 'GRACE_PERIOD_EXPIRED',
              payload: {
                subscriptionId: sub.id,
                organizationId: sub.organizationId,
              },
            },
          });
          count++;
        }
      });
    }

    return count;
  }

  /**
   * Directly suspends the subscription and logs it. Worker will pick up to suspend assignments.
   */
  async suspendSubscription(
    subscriptionId: string,
    reason: string,
  ): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) throw new Error('Subscription not found');

      await tx.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: SubscriptionStatus.SUSPENDED,
          suspendedAt: new Date(),
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateType: 'SUBSCRIPTION',
          aggregateId: subscriptionId,
          eventType: 'ACCESS_SUSPENDED',
          payload: {
            subscriptionId,
            organizationId: subscription.organizationId,
            reason,
          },
        },
      });
    });
  }

  /**
   * Restores a suspended subscription.
   */
  async restoreSubscription(subscriptionId: string): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      const subscription = await tx.subscription.findUnique({
        where: { id: subscriptionId },
      });

      if (!subscription) throw new Error('Subscription not found');

      await tx.subscription.update({
        where: { id: subscriptionId },
        data: {
          status: SubscriptionStatus.ACTIVE,
          suspendedAt: null,
          gracePeriodStartsAt: null,
          gracePeriodEndsAt: null,
        },
      });

      await tx.outboxEvent.create({
        data: {
          aggregateType: 'SUBSCRIPTION',
          aggregateId: subscriptionId,
          eventType: 'ACCESS_RESTORED',
          payload: {
            subscriptionId,
            organizationId: subscription.organizationId,
            reason: 'SUBSCRIPTION_EXPIRED', // Only auto-restore expiry suspensions
          },
        },
      });
    });
  }

  /**
   * Overrides grace period duration for a subscription by persisting custom end timestamp.
   */
  async overrideGracePeriod(
    subscriptionId: string,
    days: number,
  ): Promise<Date> {
    const gracePeriodEndsAt = new Date();
    gracePeriodEndsAt.setDate(gracePeriodEndsAt.getDate() + days);

    await this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        gracePeriodEndsAt,
      },
    });

    return gracePeriodEndsAt;
  }
}
