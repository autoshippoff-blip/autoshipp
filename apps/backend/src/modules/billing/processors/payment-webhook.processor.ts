import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { PrismaService } from '../../../prisma.service';
import { PaymentStatus } from '@prisma/client';

export interface PaymentWebhookJobData {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  organizationId?: string;
}

@Processor('payment-webhooks')
export class PaymentWebhookProcessor extends WorkerHost {
  private readonly logger = new Logger(PaymentWebhookProcessor.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async process(job: Job<PaymentWebhookJobData>): Promise<void> {
    const { paymentId, orderId, amount, currency, status } = job.data;
    this.logger.log(
      `Processing Payment Webhook Job [${job.id}] for PaymentRef [${paymentId}]`,
    );

    await this.prisma.$transaction(async (tx) => {
      // 1. Idempotency check on provider reference
      const existingPayment = await tx.payment.findFirst({
        where: { providerReference: paymentId },
      });

      if (existingPayment && existingPayment.status === PaymentStatus.SUCCESS) {
        this.logger.log(
          `PaymentRef [${paymentId}] already processed. Skipping duplicate processing.`,
        );
        return;
      }

      // 2. Write Transactional Outbox Event (AES-036)
      await tx.outboxEvent.create({
        data: {
          aggregateType: 'PAYMENT',
          aggregateId: paymentId,
          eventType: 'PAYMENT_PROCESSED',
          payload: {
            paymentId,
            orderId,
            amount,
            currency,
            status,
          },
          status: 'PROCESSED',
          processedAt: new Date(),
        },
      });

      this.logger.log(`Payment Webhook Job [${job.id}] executed successfully`);
    });
  }
}
