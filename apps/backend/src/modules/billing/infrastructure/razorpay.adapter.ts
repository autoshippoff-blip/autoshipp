import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import {
  ExternalPaymentPort,
  CreatePaymentIntentDto,
  PaymentIntentResult,
} from '../domain/external-payment.port';
import * as RazorpayUtils from 'razorpay/dist/utils/razorpay-utils';
const Razorpay = require('razorpay');

@Injectable()
export class RazorpayAdapter implements ExternalPaymentPort, OnModuleInit {
  private readonly logger = new Logger(RazorpayAdapter.name);
  private razorpayClient: any; // Using 'any' since @types/razorpay is unavailable

  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;

  onModuleInit() {
    this.keyId = process.env.RAZORPAY_KEY_ID as string;
    this.keySecret = process.env.RAZORPAY_KEY_SECRET as string;
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

    if (!this.keyId || !this.keySecret || !this.webhookSecret) {
      this.logger.error(
        'Missing Razorpay environment variables. RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, and RAZORPAY_WEBHOOK_SECRET are required.',
      );
      throw new Error('Razorpay configuration missing');
    }

    this.razorpayClient = new Razorpay({
      key_id: this.keyId,
      key_secret: this.keySecret,
    });

    this.logger.log('RazorpayAdapter initialized successfully');
  }

  async createPaymentIntent(
    dto: CreatePaymentIntentDto,
  ): Promise<PaymentIntentResult> {
    const options = {
      amount: dto.amount,
      currency: dto.currency,
      receipt: dto.receipt || dto.invoiceId,
      notes: dto.notes,
    };

    try {
      const order = await this.razorpayClient.orders.create(options);

      return {
        providerReference: order.id,
        amount: order.amount,
        currency: order.currency,
        status: order.status,
      };
    } catch (error) {
      this.logger.error(
        `Failed to create Razorpay order for invoice ${dto.invoiceId}: ${error.message}`,
      );
      throw new Error('Failed to create payment intent');
    }
  }

  verifyWebhookSignature(
    payload: string,
    signature: string,
    secret?: string,
  ): boolean {
    const activeSecret = secret || this.webhookSecret;
    try {
      return RazorpayUtils.validateWebhookSignature(
        payload,
        signature,
        activeSecret,
      );
    } catch (error) {
      this.logger.error(
        `Webhook signature verification failed: ${error.message}`,
      );
      return false;
    }
  }
}
