import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import {
  ProductModel,
  ProductCategoryModel,
  ProductEditionModel,
} from '../domain/marketplace.models';
import { ProductStatus, SubscriptionStatus } from '@prisma/client';

export interface CatalogItemModel extends ProductModel {
  isSubscribed: boolean;
  editions?: ProductEditionModel[];
}

/**
 * MarketplaceCatalogService (Marketplace & Licensing Domain)
 *
 * Responsibility: Commercial presentation and visibility resolution.
 * Note: This is strictly a READ-ONLY model. It never mutates subscriptions,
 * assignments, or products.
 */
@Injectable()
export class MarketplaceCatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories(): Promise<ProductCategoryModel[]> {
    return await this.prisma.productCategory.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  }

  async getCatalogForOrganization(
    organizationId: string,
    categoryId?: string,
  ): Promise<CatalogItemModel[]> {
    // 1. Fetch all ACTIVE products from the registry
    const whereClause: any = { status: ProductStatus.ACTIVE };
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    const activeProducts = await this.prisma.product.findMany({
      where: whereClause,
      include: {
        editions: {
          where: { active: true },
          include: {
            features: {
              include: { feature: true },
            },
          },
        },
      },
    });

    // 2. Fetch the organization's valid active subscriptions
    const now = new Date();
    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: {
        organizationId,
        status: SubscriptionStatus.ACTIVE,
        effectiveFrom: { lte: now },
        OR: [{ effectiveUntil: null }, { effectiveUntil: { gt: now } }],
      },
      select: { productId: true },
    });

    const subscribedProductIds = new Set(
      activeSubscriptions.map((s) => s.productId),
    );

    // 3. Resolve visibility
    return activeProducts.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      version: product.version,
      apiEndpoint: product.apiEndpoint,
      status: product.status,
      createdAt: product.createdAt,
      isSubscribed: subscribedProductIds.has(product.id),
      editions: product.editions.map((e) => ({
        id: e.id,
        code: e.code,
        name: e.name,
        description: e.description,
        sortOrder: e.sortOrder,
        active: e.active,
        features: e.features.map((f) => ({
          id: f.feature.id,
          code: f.feature.code,
          name: f.feature.name,
          description: f.feature.description,
        })),
      })),
    }));
  }
}
