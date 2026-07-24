import { Test, TestingModule } from '@nestjs/testing';
import { BillingWebhookService } from './billing-webhook.service';
import { PrismaService } from '../../../prisma.service';
import { getQueueToken } from '@nestjs/bullmq';
import { WebhookStatus } from '@prisma/client';

describe('BillingWebhookService', () => {
  let service: BillingWebhookService;
  let prismaService: any;
  let webhookQueue: any;

  beforeEach(async () => {
    prismaService = {
      webhookEvent: {
        upsert: jest.fn(),
      },
    };

    webhookQueue = {
      add: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillingWebhookService,
        { provide: PrismaService, useValue: prismaService },
        { provide: getQueueToken('billing-webhooks'), useValue: webhookQueue },
      ],
    }).compile();

    service = module.get<BillingWebhookService>(BillingWebhookService);
  });

  describe('handleIncomingWebhook', () => {
    const dto = {
      provider: 'razorpay',
      eventId: 'evt_123',
      eventType: 'payment.captured',
      payload: { data: 'test' },
    };

    it('should persist a new event and enqueue it', async () => {
      prismaService.webhookEvent.upsert.mockResolvedValue({
        id: 'db_id_1',
        provider: 'razorpay',
        eventId: 'evt_123',
        eventType: 'payment.captured',
        status: WebhookStatus.PENDING,
      });

      await service.handleIncomingWebhook(dto);

      expect(prismaService.webhookEvent.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { eventId: 'evt_123' },
          create: expect.objectContaining({
            provider: 'razorpay',
            eventId: 'evt_123',
            eventType: 'payment.captured',
            status: WebhookStatus.PENDING,
          }),
        }),
      );

      expect(webhookQueue.add).toHaveBeenCalledWith(
        'process-webhook',
        expect.objectContaining({
          webhookEventId: 'db_id_1',
          eventType: 'payment.captured',
        }),
        expect.objectContaining({
          jobId: 'db_id_1',
        }),
      );
    });

    it('should not enqueue if the event was already PROCESSED', async () => {
      prismaService.webhookEvent.upsert.mockResolvedValue({
        id: 'db_id_1',
        provider: 'razorpay',
        eventId: 'evt_123',
        status: WebhookStatus.PROCESSED,
      });

      await service.handleIncomingWebhook(dto);

      expect(prismaService.webhookEvent.upsert).toHaveBeenCalled();
      expect(webhookQueue.add).not.toHaveBeenCalled();
    });

    it('should throw an error if persistence fails', async () => {
      prismaService.webhookEvent.upsert.mockRejectedValue(
        new Error('DB Error'),
      );

      await expect(service.handleIncomingWebhook(dto)).rejects.toThrow(
        'DB Error',
      );
      expect(webhookQueue.add).not.toHaveBeenCalled();
    });
  });
});
