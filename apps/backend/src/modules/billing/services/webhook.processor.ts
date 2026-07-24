import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { PaymentService } from './payment.service';
import { PaymentProvider, WebhookStatus } from '@prisma/client';

export interface WebhookJobData {
  webhookEventId: string;
  correlationId: string;
  eventType: string;
  provider: string;
}

@Processor('billing-webhooks')
export class WebhookProcessor extends WorkerHost {
  private readonly logger = new Logger(WebhookProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly paymentService: PaymentService,
  ) {
    super();
  }

  async process(job: Job<WebhookJobData>): Promise<void> {
    const { webhookEventId, correlationId, eventType, provider } = job.data;
    this.logger.log(
      `[${correlationId}] Processing webhook ${webhookEventId} (event: ${eventType})`,
    );

    try {
      const webhookEvent = await this.prisma.webhookEvent.findUnique({
        where: { id: webhookEventId },
      });

      if (!webhookEvent) {
        throw new Error(`WebhookEvent ${webhookEventId} not found`);
      }

      if (webhookEvent.status === WebhookStatus.PROCESSED) {
        this.logger.log(
          `[${correlationId}] Webhook ${webhookEventId} is already PROCESSED. Skipping.`,
        );
        return;
      }

      // We handle razorpay payment.captured
      if (provider === 'razorpay' && eventType === 'payment.captured') {
        const payload = webhookEvent.payload as any;
        const paymentData = payload?.payload?.payment?.entity;

        if (!paymentData) {
          throw new Error('Invalid Razorpay payload: missing payment.entity');
        }

        const providerReference = paymentData.id; // e.g. pay_29QQoUBi66xm2f
        // Amount is often in the smallest currency unit (paise/cents). Our service expects the actual number,
        // or we convert it here? Usually the webhook payload contains amount in paise.
        // Let's assume the payload amount is in the smallest unit, so we divide by 100 for INR.
        // But for generic robustness, we check currency.
        let amount = paymentData.amount;
        if (['INR', 'USD', 'EUR', 'GBP'].includes(paymentData.currency)) {
          amount = amount / 100;
        }

        const currency = paymentData.currency || 'INR';

        // Assuming receipt contains the invoiceId, or notes.invoiceId
        const invoiceId = paymentData.receipt || paymentData.notes?.invoiceId;

        if (!invoiceId) {
          throw new Error(
            'Could not determine invoiceId from Razorpay webhook payload (expected in receipt or notes.invoiceId)',
          );
        }

        // Reconcile in a transaction within PaymentService
        await this.paymentService.reconcileExternalPayment(
          invoiceId,
          PaymentProvider.RAZORPAY,
          providerReference,
          amount,
          currency,
        );
      } else {
        this.logger.warn(
          `[${correlationId}] Unhandled webhook event type: ${eventType} from ${provider}`,
        );
      }

      // Mark as processed
      await this.prisma.webhookEvent.update({
        where: { id: webhookEventId },
        data: { status: WebhookStatus.PROCESSED },
      });

      this.logger.log(
        `[${correlationId}] Successfully processed webhook ${webhookEventId}`,
      );
    } catch (error) {
      this.logger.error(
        `[${correlationId}] Failed to process webhook ${webhookEventId}: ${error.message}`,
        error.stack,
      );

      // Update status to FAILED in the database.
      // BullMQ will automatically retry based on backoff settings.
      // We don't swallow the error so that the queue knows it failed and applies retries.
      await this.prisma.webhookEvent.update({
        where: { id: webhookEventId },
        data: {
          status: WebhookStatus.FAILED,
          errorDetails: error.message,
        },
      });

      throw error;
    }
  }
}
