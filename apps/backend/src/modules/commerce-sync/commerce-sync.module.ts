import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../prisma.service';
import { CommerceConflictService } from './services/commerce-conflict.service';
import { CommerceSyncService } from './services/commerce-sync.service';
import { OrderSyncService } from './services/order-sync.service';
import { ShopifyFetchProvider } from './providers/shopify-fetch.provider';
import { ShopifyWebhookProcessor } from './processors/shopify-webhook.processor';
import { OrderSyncProcessor } from './processors/order-sync.processor';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue(
      { name: 'shopify-webhooks' },
      { name: 'order-sync' },
    ),
  ],
  providers: [
    PrismaService,
    CommerceConflictService,
    CommerceSyncService,
    OrderSyncService,
    OrderSyncProcessor,
    ShopifyWebhookProcessor,
    {
      provide: 'CommerceFetchProvider',
      useClass: ShopifyFetchProvider,
    },
  ],
  exports: [CommerceConflictService, CommerceSyncService, OrderSyncService],
})
export class CommerceSyncModule {}
