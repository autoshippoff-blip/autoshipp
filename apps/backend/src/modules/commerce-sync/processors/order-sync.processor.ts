import { Processor, WorkerHost, InjectQueue } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import { ClsService } from 'nestjs-cls';
import { OrderSyncService } from '../services/order-sync.service';

export interface OrderSyncJobData {
  organizationId: string;
  storeId: string;
  correlationId?: string;
}

@Processor('order-sync')
export class OrderSyncProcessor extends WorkerHost {
  private readonly logger = new Logger(OrderSyncProcessor.name);

  constructor(
    @InjectQueue('order-sync') private readonly orderSyncQueue: Queue,
    private readonly orderSyncService: OrderSyncService,
    private readonly cls: ClsService,
  ) {
    super();
  }

  async process(job: Job<OrderSyncJobData>): Promise<void> {
    const { organizationId, storeId, correlationId } = job.data;

    // Re-hydrate execution correlation context into CLS
    if (correlationId) {
      this.cls.set('correlationId', correlationId);
    }

    this.logger.log(
      `Processing Order Sync Job [${job.id}] for Store [${storeId}] (Org: ${organizationId})`,
    );

    try {
      // 1. Acquire CAS Lock / ensure IN_PROGRESS status
      await this.orderSyncService.startOrResumeSync(organizationId, storeId);

      // 2. Process page batch
      const result = await this.orderSyncService.processPageBatch(
        organizationId,
        storeId,
      );

      // 3. If more pages remain, enqueue next page iteration job
      if (result.hasMore) {
        await this.orderSyncQueue.add(
          'sync-order-page',
          {
            organizationId,
            storeId,
            correlationId,
          },
          {
            attempts: 5,
            backoff: { type: 'exponential', delay: 3000 },
          },
        );
      }

      this.logger.log(
        `Order Sync Job [${job.id}] completed batch write. Status: ${result.status}`,
      );
    } catch (error: any) {
      // Rate-limit backoff handling: if 429 encountered, re-enqueue job with delay
      if (error?.status === 429 || error?.message?.includes('429')) {
        const retryAfterSeconds = error?.retryAfterSeconds || 10;
        this.logger.warn(
          `Rate limit 429 encountered for Store [${storeId}]. Delaying retry for ${retryAfterSeconds}s`,
        );

        await this.orderSyncQueue.add(
          'sync-order-page',
          { organizationId, storeId, correlationId },
          { delay: retryAfterSeconds * 1000 },
        );
        return;
      }

      this.logger.error(`Error in Order Sync Job [${job.id}]:`, error);
      throw error;
    }
  }
}
