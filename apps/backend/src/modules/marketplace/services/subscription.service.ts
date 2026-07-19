import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  SubscriptionModel,
  EntitlementModel,
} from '../domain/marketplace.models';
import {
  ProductNotFoundException,
  ProductDeprecatedException,
  SubscriptionOverlapException,
  SubscriptionNotFoundException,
} from '../exceptions/marketplace.exceptions';
import { CreateSubscriptionDto } from '../dto/marketplace.dto';
import { ProductStatus, SubscriptionStatus } from '@prisma/client';

/**
 * SubscriptionService (Marketplace & Licensing Domain)
 *
 * Responsibility: Managing commercial licenses, their lifecycles, and their child entitlements.
 */
@Injectable()
export class SubscriptionService {
  constructor(private readonly prisma: PrismaService) {}

  private mapToDomain(prismaSub: any): SubscriptionModel {
    return {
      id: prismaSub.id,
      organizationId: prismaSub.organizationId,
      productId: prismaSub.productId,
      status: prismaSub.status,
      billingCycle: prismaSub.billingCycle,
      effectiveFrom: prismaSub.effectiveFrom,
      effectiveUntil: prismaSub.effectiveUntil,
      createdAt: prismaSub.createdAt,
      entitlements: (prismaSub.entitlements || []).map((e: any) => ({
        id: e.id,
        featureCode: e.featureCode,
        limit: e.limit,
        used: e.used,
      })),
    };
  }

  async createSubscription(
    organizationId: string,
    dto: CreateSubscriptionDto,
  ): Promise<SubscriptionModel> {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new ProductNotFoundException(dto.productId);
    }

    if (product.status === ProductStatus.DEPRECATED) {
      throw new ProductDeprecatedException(dto.productId);
    }

    const effectiveFrom = dto.effectiveFrom
      ? new Date(dto.effectiveFrom)
      : new Date();
    const effectiveUntil = dto.effectiveUntil
      ? new Date(dto.effectiveUntil)
      : null;

    // Domain Invariant: Canonical Interval Overlap Validation
    // Two date ranges overlap iff: (A.start < B.end) AND (B.start < A.end)
    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: {
        organizationId,
        productId: dto.productId,
        status: SubscriptionStatus.ACTIVE,
      },
    });

    const hasOverlap = activeSubscriptions.some((sub) => {
      const startA = effectiveFrom.getTime();
      const endA = effectiveUntil ? effectiveUntil.getTime() : Infinity;

      const startB = sub.effectiveFrom.getTime();
      const endB = sub.effectiveUntil ? sub.effectiveUntil.getTime() : Infinity;

      return startA < endB && startB < endA;
    });

    if (hasOverlap) {
      throw new SubscriptionOverlapException(organizationId, dto.productId);
    }

    // Transaction Boundary: Create subscription and its child entitlements atomically
    const subscription = await this.prisma.$transaction(async (tx) => {
      const sub = await tx.subscription.create({
        data: {
          organizationId,
          productId: dto.productId,
          billingCycle: dto.billingCycle,
          effectiveFrom,
          effectiveUntil,
          status: SubscriptionStatus.ACTIVE,
          entitlements: {
            create:
              dto.entitlements?.map((e) => ({
                featureCode: e.key,
                limit: parseInt(e.value, 10) || null,
              })) || [],
          },
        },
        include: {
          entitlements: true,
        },
      });
      return sub;
    });

    return this.mapToDomain(subscription);
  }

  async cancelSubscription(subscriptionId: string): Promise<SubscriptionModel> {
    const existing = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { entitlements: true },
    });

    if (!existing) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    const updated = await this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: { status: SubscriptionStatus.CANCELED },
      include: { entitlements: true },
    });

    return this.mapToDomain(updated);
  }

  async getSubscription(subscriptionId: string): Promise<SubscriptionModel> {
    const sub = await this.prisma.subscription.findUnique({
      where: { id: subscriptionId },
      include: { entitlements: true },
    });

    if (!sub) {
      throw new SubscriptionNotFoundException(subscriptionId);
    }

    return this.mapToDomain(sub);
  }
}
