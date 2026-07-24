import { RazorpayService } from './razorpay.service';

describe('RazorpayService', () => {
  let service: RazorpayService;

  beforeEach(() => {
    service = new RazorpayService();
  });

  it('should generate a mock order when environment API keys are absent', async () => {
    const result = await service.createOrder(500, 'INR', 'receipt_123');

    expect(result).toBeDefined();
    expect(result.orderId).toContain('order_mock_');
    expect(result.amount).toEqual(500);
    expect(result.currency).toEqual('INR');
  });

  it('should verify valid HMAC signature correctly', () => {
    const secret = 'test_webhook_secret';
    const rawBody = JSON.stringify({
      event: 'payment.captured',
      amount: 50000,
    });
    const signature = require('crypto')
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const isValid = service.verifyWebhookSignature(rawBody, signature, secret);

    expect(isValid).toBe(true);
  });
});
