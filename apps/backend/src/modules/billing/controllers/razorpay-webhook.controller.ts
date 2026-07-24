import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { RazorpayService } from '../services/razorpay.service';

@Controller('webhooks/razorpay')
export class RazorpayWebhookController {
  constructor(
    private readonly razorpayService: RazorpayService,
    @InjectQueue('payment-webhooks') private readonly paymentQueue: Queue,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: any,
    @Headers('x-razorpay-signature') signature: string,
  ): Promise<{ status: string }> {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'mock_secret';
    const rawBody =
      typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    // Verify HMAC signature if secret exists
    if (
      process.env.RAZORPAY_WEBHOOK_SECRET &&
      !this.razorpayService.verifyWebhookSignature(
        rawBody,
        signature,
        webhookSecret,
      )
    ) {
      throw new BadRequestException('Invalid Razorpay webhook signature');
    }

    const payload =
      typeof req.body === 'object' ? req.body : JSON.parse(rawBody || '{}');
    const paymentEntity = payload.payload?.payment?.entity || {};

    const paymentId =
      paymentEntity.id || payload.payment_id || `pay_mock_${Date.now()}`;
    const orderId =
      paymentEntity.order_id || payload.order_id || `order_mock_${Date.now()}`;
    const amount = (paymentEntity.amount || payload.amount || 0) / 100;
    const currency = paymentEntity.currency || payload.currency || 'INR';
    const status = paymentEntity.status || payload.status || 'captured';

    // Dispatch to BullMQ queue asynchronously (<500ms response)
    await this.paymentQueue.add(
      'process-payment',
      {
        paymentId,
        orderId,
        amount,
        currency,
        status,
      },
      {
        jobId: paymentId,
        attempts: 3,
        backoff: { type: 'exponential', delay: 1000 },
      },
    );

    return { status: 'acknowledged' };
  }
}
