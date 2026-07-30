import { Test, TestingModule } from '@nestjs/testing';
import { RazorpayAdapter } from './razorpay.adapter';
import * as crypto from 'crypto';

const mockCreate = jest.fn();
jest.mock(
  'razorpay',
  () => {
    return jest.fn().mockImplementation(() => ({
      orders: {
        create: mockCreate,
      },
    }));
  },
  { virtual: true },
);

describe('RazorpayAdapter', () => {
  let adapter: RazorpayAdapter;

  beforeEach(async () => {
    // Reset env vars before each test
    process.env.RAZORPAY_KEY_ID = 'test_key_id';
    process.env.RAZORPAY_KEY_SECRET = 'test_key_secret';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'test_webhook_secret';

    mockCreate.mockResolvedValue({
      id: 'order_test123',
      amount: 1000,
      currency: 'INR',
      status: 'created',
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [RazorpayAdapter],
    }).compile();

    adapter = module.get<RazorpayAdapter>(RazorpayAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Configuration Validation', () => {
    it('should initialize successfully with all required environment variables', () => {
      expect(() => adapter.onModuleInit()).not.toThrow();
    });

    it('should throw an error if RAZORPAY_KEY_ID is missing', () => {
      delete process.env.RAZORPAY_KEY_ID;
      expect(() => adapter.onModuleInit()).toThrow(
        'Razorpay configuration missing',
      );
    });

    it('should throw an error if RAZORPAY_KEY_SECRET is missing', () => {
      delete process.env.RAZORPAY_KEY_SECRET;
      expect(() => adapter.onModuleInit()).toThrow(
        'Razorpay configuration missing',
      );
    });

    it('should throw an error if RAZORPAY_WEBHOOK_SECRET is missing', () => {
      delete process.env.RAZORPAY_WEBHOOK_SECRET;
      expect(() => adapter.onModuleInit()).toThrow(
        'Razorpay configuration missing',
      );
    });
  });

  describe('createPaymentIntent', () => {
    beforeEach(() => {
      adapter.onModuleInit(); // initialize client
    });

    it('should create an order with the correct parameters and return PaymentIntentResult', async () => {
      const dto = {
        invoiceId: 'inv_123',
        amount: 5000,
        currency: 'INR',
        receipt: 'rcpt_123',
      };

      const result = await adapter.createPaymentIntent(dto);

      expect(mockCreate).toHaveBeenCalledWith({
        amount: 5000,
        currency: 'INR',
        receipt: 'rcpt_123',
        notes: undefined,
      });

      expect(result).toEqual({
        providerReference: 'order_test123',
        amount: 1000,
        currency: 'INR',
        status: 'created',
      });
    });

    it('should fallback receipt to invoiceId if receipt is not provided', async () => {
      const dto = {
        invoiceId: 'inv_123',
        amount: 5000,
        currency: 'INR',
      };

      await adapter.createPaymentIntent(dto);

      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          receipt: 'inv_123',
        }),
      );
    });

    it('should log and re-throw error if Razorpay SDK throws', async () => {
      mockCreate.mockRejectedValueOnce(new Error('SDK Error'));

      const dto = { invoiceId: 'inv_123', amount: 1000, currency: 'INR' };

      await expect(adapter.createPaymentIntent(dto)).rejects.toThrow(
        'Failed to create payment intent',
      );
    });
  });

  describe('verifyWebhookSignature', () => {
    beforeEach(() => {
      adapter.onModuleInit();
    });

    it('should return true if validation succeeds with valid HMAC signature', () => {
      const payload = JSON.stringify({ event: 'payment.captured' });
      const secret = 'test_webhook_secret';
      const validSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

      const result = adapter.verifyWebhookSignature(payload, validSignature);
      expect(result).toBe(true);
    });

    it('should return false if signature does not match', () => {
      const payload = JSON.stringify({ event: 'payment.captured' });
      const invalidSignature =
        'invalid_signature_hash_value_1234567890abcdef1234567890abcdef';

      const result = adapter.verifyWebhookSignature(payload, invalidSignature);
      expect(result).toBe(false);
    });
  });
});
