import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import {
  CommerceSyncService,
  SyncJobData,
} from '../services/commerce-sync.service';

@Processor('shopify-webhooks')
export class ShopifyWebhookProcessor extends WorkerHost {
  private readonly logger = new Logger(ShopifyWebhookProcessor.name);

  constructor(private readonly syncService: CommerceSyncService) {
    super();
  }

  async process(job: Job<SyncJobData>): Promise<void> {
    const { topic, webhookId } = job.data;
    this.logger.log(
      `Processing BullMQ Job [${job.id}] - Topic: ${topic}, WebhookId: ${webhookId}`,
    );

    try {
      if (topic.startsWith('orders/')) {
        await this.syncService.syncOrder(job.data);
      } else if (topic.startsWith('products/')) {
        await this.syncService.syncProduct(job.data);
      } else {
        this.logger.log(
          `Unhandled topic [${topic}] - Skipping synchronization`,
        );
      }
    } catch (error) {
      this.logger.error(
        `Error processing BullMQ Job [${job.id}] for topic [${topic}]:`,
        error,
      );
      throw error; // Re-throw to trigger BullMQ retry backoff
    }
  }
}
