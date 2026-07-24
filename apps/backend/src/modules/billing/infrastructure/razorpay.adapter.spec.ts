import { Test, TestingModule } from '@nestjs/testing';
import { RazorpayAdapter } from './razorpay.adapter';
import * as RazorpayUtils from 'razorpay/dist/utils/razorpay-utils';
const Razorpay = require('razorpay');

jest.mock('razorpay');
jest.mock('razorpay/dist/utils/razorpay-utils', () => ({
  validateWebhookSignature: jest.fn(),
}));

describe('RazorpayAdapter', () => {
  let adapter: RazorpayAdapter;
  let mockRazorpayInstance: any;

  beforeEach(async () => {
    // Reset env vars before each test
    process.env.RAZORPAY_KEY_ID = 'test_key_id';
    process.env.RAZORPAY_KEY_SECRET = 'test_key_secret';
    process.env.RAZORPAY_WEBHOOK_SECRET = 'test_webhook_secret';

    mockRazorpayInstance = {
      orders: {
        create: jest.fn().mockResolvedValue({
          id: 'order_test123',
          amount: 1000,
          currency: 'INR',
          status: 'created',
        }),
      },
    };

    (Razorpay as unknown as jest.Mock).mockImplementation(
      () => mockRazorpayInstance,
    );

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
      expect(Razorpay).toHaveBeenCalledWith({
        key_id: 'test_key_id',
        key_secret: 'test_key_secret',
      });
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

      expect(mockRazorpayInstance.orders.create).toHaveBeenCalledWith({
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

      expect(mockRazorpayInstance.orders.create).toHaveBeenCalledWith(
        expect.objectContaining({
          receipt: 'inv_123',
        }),
      );
    });

    it('should log and re-throw error if Razorpay SDK throws', async () => {
      mockRazorpayInstance.orders.create.mockRejectedValueOnce(
        new Error('SDK Error'),
      );

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

    it('should return true if validation succeeds', () => {
      (RazorpayUtils.validateWebhookSignature as jest.Mock).mockReturnValue(
        true,
      );
      const result = adapter.verifyWebhookSignature('payload', 'signature');

      expect(RazorpayUtils.validateWebhookSignature).toHaveBeenCalledWith(
        'payload',
        'signature',
        'test_webhook_secret',
      );
      expect(result).toBe(true);
    });

    it('should return false if validation throws an error', () => {
      (RazorpayUtils.validateWebhookSignature as jest.Mock).mockImplementation(
        () => {
          throw new Error('Validation failed');
        },
      );

      const result = adapter.verifyWebhookSignature(
        'payload',
        'invalid_signature',
      );

      expect(result).toBe(false);
    });
  });
});
