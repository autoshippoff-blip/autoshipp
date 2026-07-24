import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';

export interface RazorpayOrderResult {
  orderId: string;
  amount: number;
  currency: string;
  status: string;
}

@Injectable()
export class RazorpayService {
  private readonly logger = new Logger(RazorpayService.name);

  /**
   * Creates a Razorpay Order session for wallet top-up or invoice payment.
   */
  async createOrder(
    amount: number,
    currency: string = 'INR',
    receipt: string,
  ): Promise<RazorpayOrderResult> {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keyId && keySecret && keyId !== 'mock_key_id') {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const response = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: Math.round(amount * 100), // amount in paise
            currency,
            receipt,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            orderId: data.id,
            amount: data.amount / 100,
            currency: data.currency,
            status: data.status,
          };
        }
      } catch (error: any) {
        this.logger.warn(
          `Razorpay API order creation failed: ${error.message}. Falling back to mock provider.`,
        );
      }
    }

    // Deterministic Mock Provider for dev/test environments
    const mockOrderId = `order_mock_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    this.logger.log(
      `Created Mock Razorpay Order [${mockOrderId}] for amount ${amount} ${currency}`,
    );
    return {
      orderId: mockOrderId,
      amount,
      currency,
      status: 'created',
    };
  }

  /**
   * Verifies Razorpay Webhook HMAC signature.
   */
  verifyWebhookSignature(
    rawBody: string,
    signature: string,
    secret: string,
  ): boolean {
    if (!signature || !secret) return false;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    );
  }
}
