import { Test, TestingModule } from '@nestjs/testing';
import { PaymentWebhookController } from './payment-webhook.controller';
import { EXTERNAL_PAYMENT_PORT } from '../domain/external-payment.port';
import { BillingWebhookService } from '../services/billing-webhook.service';
import { UnauthorizedException } from '@nestjs/common';

describe('PaymentWebhookController', () => {
  let controller: PaymentWebhookController;
  let externalPaymentPort: any;
  let billingWebhookService: any;

  beforeEach(async () => {
    externalPaymentPort = {
      verifyWebhookSignature: jest.fn(),
    };

    billingWebhookService = {
      handleIncomingWebhook: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentWebhookController],
      providers: [
        { provide: EXTERNAL_PAYMENT_PORT, useValue: externalPaymentPort },
        { provide: BillingWebhookService, useValue: billingWebhookService },
      ],
    }).compile();

    controller = module.get<PaymentWebhookController>(PaymentWebhookController);
  });

  describe('handleRazorpayWebhook', () => {
    it('should throw UnauthorizedException if signature is missing', async () => {
      const payload = { event: 'payment.captured' };
      const req = { headers: {} } as any;

      await expect(
        controller.handleRazorpayWebhook('', payload, req),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if signature is invalid', async () => {
      externalPaymentPort.verifyWebhookSignature.mockReturnValue(false);
      const payload = { event: 'payment.captured' };
      const req = { headers: {} } as any;

      await expect(
        controller.handleRazorpayWebhook('invalid', payload, req),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should process webhook and return 200 OK if signature is valid', async () => {
      externalPaymentPort.verifyWebhookSignature.mockReturnValue(true);
      const payload = {
        event: 'payment.captured',
        payload: {
          payment: {
            entity: { id: 'pay_123' },
          },
        },
      };
      const req = {
        headers: { 'x-razorpay-event-id': 'evt_123' },
      } as any;

      const result = await controller.handleRazorpayWebhook(
        'valid_sig',
        payload,
        req,
      );

      expect(billingWebhookService.handleIncomingWebhook).toHaveBeenCalledWith({
        provider: 'razorpay',
        eventId: 'evt_123',
        eventType: 'payment.captured',
        payload: payload,
      });

      expect(result).toEqual({ status: 'received' });
    });

    it('should fallback to generated eventId if x-razorpay-event-id header is missing', async () => {
      externalPaymentPort.verifyWebhookSignature.mockReturnValue(true);
      const payload = {
        event: 'payment.captured',
        payload: {
          payment: {
            entity: { id: 'pay_123' },
          },
        },
      };
      const req = {
        headers: {},
      } as any;

      await controller.handleRazorpayWebhook('valid_sig', payload, req);

      expect(billingWebhookService.handleIncomingWebhook).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'razorpay',
          eventId: 'payment.captured_pay_123',
        }),
      );
    });
  });
});
