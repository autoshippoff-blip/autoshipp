import { Module } from '@nestjs/common';
import { ProductRegistryService } from './services/product-registry.service';
import { MarketplaceCatalogService } from './services/marketplace-catalog.service';
import { SubscriptionService } from './services/subscription.service';
import { AssignmentService } from './services/assignment.service';
import { AdminProductController } from './controllers/admin-product.controller';
import { MarketplaceController } from './controllers/marketplace.controller';
import { OrganizationMarketplaceController } from './controllers/organization-marketplace.controller';
import { MarketplaceExceptionFilter } from './marketplace-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { PrismaService } from '../../prisma.service';
import {
  ASSIGNMENT_SERVICE_INTERFACE,
  PRODUCT_REGISTRY_INTERFACE,
} from './marketplace.interface';

@Module({
  providers: [
    PrismaService,
    ProductRegistryService,
    MarketplaceCatalogService,
    SubscriptionService,
    AssignmentService,
    {
      provide: ASSIGNMENT_SERVICE_INTERFACE,
      useExisting: AssignmentService,
    },
    {
      provide: PRODUCT_REGISTRY_INTERFACE,
      useExisting: ProductRegistryService,
    },
    {
      provide: APP_FILTER,
      useClass: MarketplaceExceptionFilter,
    },
  ],
  controllers: [
    AdminProductController,
    MarketplaceController,
    OrganizationMarketplaceController,
  ],
  exports: [
    ProductRegistryService,
    MarketplaceCatalogService,
    SubscriptionService,
    AssignmentService,
    ASSIGNMENT_SERVICE_INTERFACE,
    PRODUCT_REGISTRY_INTERFACE,
  ],
})
export class MarketplaceModule {}
