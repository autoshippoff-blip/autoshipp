import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { CommerceConflictService } from './services/commerce-conflict.service';
import { CommerceSyncService } from './services/commerce-sync.service';
import { ShopifyWebhookProcessor } from './processors/shopify-webhook.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'shopify-webhooks',
    }),
  ],
  providers: [
    PrismaService,
    CommerceConflictService,
    CommerceSyncService,
    ShopifyWebhookProcessor,
  ],
  exports: [CommerceConflictService, CommerceSyncService],
})
export class CommerceSyncModule {}
