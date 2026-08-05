import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { CommerceConflictService } from './services/commerce-conflict.service';
import { CommerceSyncService } from './services/commerce-sync.service';
import { ShopifyWebhookProcessor } from './processors/shopify-webhook.processor';

import { CommerceSyncController } from './controllers/commerce-sync.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'shopify-webhooks',
    }),
  ],
  controllers: [CommerceSyncController],
  providers: [
    PrismaService,
    CommerceConflictService,
    CommerceSyncService,
    ShopifyWebhookProcessor,
  ],
  exports: [CommerceConflictService, CommerceSyncService],
})
export class CommerceSyncModule {}
