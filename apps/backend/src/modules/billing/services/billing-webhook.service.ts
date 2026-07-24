import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { randomUUID } from 'crypto';
import { WebhookStatus } from '@prisma/client';

export interface ProcessWebhookDto {
  provider: string;
  eventId: string;
  eventType: string;
  payload: any;
  eventVersion?: string;
}

@Injectable()
export class BillingWebhookService {
  private readonly logger = new Logger(BillingWebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('billing-webhooks') private readonly webhookQueue: Queue,
  ) {}

  /**
   * Processes an incoming webhook idempotently.
   * Persists the event and enqueues it for asynchronous processing.
   */
  async handleIncomingWebhook(dto: ProcessWebhookDto): Promise<void> {
    const correlationId = randomUUID();
    this.logger.log(
      `[${correlationId}] Received webhook ${dto.eventType} from ${dto.provider} (eventId: ${dto.eventId})`,
    );

    // 1. Idempotency Check & Persistence
    // We use Prisma's upsert or a targeted try/catch on create to handle unique constraint on eventId
    try {
      const event = await this.prisma.webhookEvent.upsert({
        where: { eventId: dto.eventId },
        update: {}, // Do nothing if it exists (idempotent)
        create: {
          provider: dto.provider,
          eventId: dto.eventId,
          eventType: dto.eventType,
          payload: dto.payload,
          eventVersion: dto.eventVersion,
          status: WebhookStatus.PENDING,
        },
      });

      // If the event was already processed or queued successfully before, we might skip enqueuing.
      // But upsert returns the record. If it was already PROCESSED, we skip.
      if (event.status === WebhookStatus.PROCESSED) {
        this.logger.log(
          `[${correlationId}] Webhook eventId ${dto.eventId} was already processed. Skipping.`,
        );
        return;
      }

      // If it's PENDING or FAILED, we can re-enqueue it (or enqueue it for the first time).

      // 2. Enqueue for asynchronous processing
      await this.webhookQueue.add(
        'process-webhook',
        {
          webhookEventId: event.id,
          correlationId,
          eventType: event.eventType,
          provider: event.provider,
        },
        {
          jobId: event.id, // BullMQ deduplication by jobId
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
        },
      );

      this.logger.log(
        `[${correlationId}] Webhook eventId ${dto.eventId} enqueued successfully.`,
      );
    } catch (error) {
      this.logger.error(
        `[${correlationId}] Failed to persist or enqueue webhook ${dto.eventId}: ${error.message}`,
        error.stack,
      );
      throw error; // Let the controller handle it (e.g., return 500 so the provider retries)
    }
  }
}
