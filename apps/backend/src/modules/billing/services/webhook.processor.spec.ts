import { Test, TestingModule } from '@nestjs/testing';
import { WebhookProcessor, WebhookJobData } from './webhook.processor';
import { PrismaService } from '../../../prisma.service';
import { PaymentService } from './payment.service';
import { PaymentProvider, WebhookStatus } from '@prisma/client';
import { Job } from 'bullmq';

describe('WebhookProcessor', () => {
  let processor: WebhookProcessor;
  let prismaService: any;
  let paymentService: any;

  beforeEach(async () => {
    prismaService = {
      webhookEvent: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    paymentService = {
      reconcileExternalPayment: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookProcessor,
        { provide: PrismaService, useValue: prismaService },
        { provide: PaymentService, useValue: paymentService },
      ],
    }).compile();

    processor = module.get<WebhookProcessor>(WebhookProcessor);
  });

  const createJob = (data: WebhookJobData): Job<WebhookJobData> => {
    return { data } as Job<WebhookJobData>;
  };

  describe('process', () => {
    it('should skip if webhook event is not found', async () => {
      prismaService.webhookEvent.findUnique.mockResolvedValue(null);
      const job = createJob({
        webhookEventId: 'evt_1',
        correlationId: 'corr_1',
        eventType: 'test',
        provider: 'razorpay',
      });

      await expect(processor.process(job)).rejects.toThrow(
        'WebhookEvent evt_1 not found',
      );
    });

    it('should skip if webhook event is already processed', async () => {
      prismaService.webhookEvent.findUnique.mockResolvedValue({
        id: 'evt_1',
        status: WebhookStatus.PROCESSED,
      });
      const job = createJob({
        webhookEventId: 'evt_1',
        correlationId: 'corr_1',
        eventType: 'test',
        provider: 'razorpay',
      });

      await processor.process(job);

      expect(paymentService.reconcileExternalPayment).not.toHaveBeenCalled();
      expect(prismaService.webhookEvent.update).not.toHaveBeenCalled();
    });

    it('should reconcile payment and mark as PROCESSED for valid razorpay event', async () => {
      prismaService.webhookEvent.findUnique.mockResolvedValue({
        id: 'evt_1',
        status: WebhookStatus.PENDING,
        payload: {
          payload: {
            payment: {
              entity: {
                id: 'pay_123',
                amount: 50000,
                currency: 'INR',
                receipt: 'inv_abc',
              },
            },
          },
        },
      });

      const job = createJob({
        webhookEventId: 'evt_1',
        correlationId: 'corr_1',
        eventType: 'payment.captured',
        provider: 'razorpay',
      });

      await processor.process(job);

      expect(paymentService.reconcileExternalPayment).toHaveBeenCalledWith(
        'inv_abc',
        PaymentProvider.RAZORPAY,
        'pay_123',
        500, // 50000 / 100 for INR
        'INR',
      );

      expect(prismaService.webhookEvent.update).toHaveBeenCalledWith({
        where: { id: 'evt_1' },
        data: { status: WebhookStatus.PROCESSED },
      });
    });

    it('should mark as FAILED and re-throw error if reconciliation fails', async () => {
      prismaService.webhookEvent.findUnique.mockResolvedValue({
        id: 'evt_1',
        status: WebhookStatus.PENDING,
        payload: {
          payload: {
            payment: {
              entity: {
                id: 'pay_123',
                amount: 50000,
                currency: 'INR',
                receipt: 'inv_abc',
              },
            },
          },
        },
      });

      paymentService.reconcileExternalPayment.mockRejectedValue(
        new Error('Reconciliation error'),
      );

      const job = createJob({
        webhookEventId: 'evt_1',
        correlationId: 'corr_1',
        eventType: 'payment.captured',
        provider: 'razorpay',
      });

      await expect(processor.process(job)).rejects.toThrow(
        'Reconciliation error',
      );

      expect(prismaService.webhookEvent.update).toHaveBeenCalledWith({
        where: { id: 'evt_1' },
        data: {
          status: WebhookStatus.FAILED,
          errorDetails: 'Reconciliation error',
        },
      });
    });

    it('should fail if invoiceId cannot be resolved from payload', async () => {
      prismaService.webhookEvent.findUnique.mockResolvedValue({
        id: 'evt_1',
        status: WebhookStatus.PENDING,
        payload: {
          payload: {
            payment: {
              entity: {
                id: 'pay_123',
                amount: 50000,
                currency: 'INR',
                // receipt and notes missing
              },
            },
          },
        },
      });

      const job = createJob({
        webhookEventId: 'evt_1',
        correlationId: 'corr_1',
        eventType: 'payment.captured',
        provider: 'razorpay',
      });

      await expect(processor.process(job)).rejects.toThrow(
        'Could not determine invoiceId from Razorpay webhook payload',
      );

      expect(prismaService.webhookEvent.update).toHaveBeenCalledWith({
        where: { id: 'evt_1' },
        data: {
          status: WebhookStatus.FAILED,
          errorDetails: expect.any(String),
        },
      });
    });
  });
});
