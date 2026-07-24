import { Test, TestingModule } from '@nestjs/testing';
import { RazorpayWebhookController } from './razorpay-webhook.controller';
import { RazorpayService } from '../services/razorpay.service';
import { getQueueToken } from '@nestjs/bullmq';

describe('RazorpayWebhookController', () => {
  let controller: RazorpayWebhookController;
  let razorpayService: any;
  let paymentQueue: any;

  beforeEach(async () => {
    razorpayService = {
      verifyWebhookSignature: jest.fn().mockReturnValue(true),
    };

    paymentQueue = {
      add: jest.fn().mockResolvedValue({ id: 'job-123' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RazorpayWebhookController],
      providers: [
        { provide: RazorpayService, useValue: razorpayService },
        { provide: getQueueToken('payment-webhooks'), useValue: paymentQueue },
      ],
    }).compile();

    controller = module.get<RazorpayWebhookController>(
      RazorpayWebhookController,
    );
  });

  it('should acknowledge valid Razorpay webhooks and dispatch asynchronous BullMQ job', async () => {
    const req = {
      body: {
        event: 'payment.captured',
        payload: {
          payment: {
            entity: {
              id: 'pay_test123',
              order_id: 'order_test123',
              amount: 50000,
              currency: 'INR',
              status: 'captured',
            },
          },
        },
      },
    };

    const response = await controller.handleWebhook(req, 'mock_sig');

    expect(response).toEqual({ status: 'acknowledged' });
    expect(paymentQueue.add).toHaveBeenCalledWith(
      'process-payment',
      expect.objectContaining({
        paymentId: 'pay_test123',
        orderId: 'order_test123',
        amount: 500,
        currency: 'INR',
      }),
      expect.objectContaining({
        jobId: 'pay_test123',
      }),
    );
  });
});
