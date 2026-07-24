import {
  Controller,
  Post,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  UnauthorizedException,
  Logger,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {
  EXTERNAL_PAYMENT_PORT,
  ExternalPaymentPort,
} from '../domain/external-payment.port';
import type { Request } from 'express';
import { BillingWebhookService } from '../services/billing-webhook.service';

@Controller('webhooks/payment')
export class PaymentWebhookController {
  private readonly logger = new Logger(PaymentWebhookController.name);

  constructor(
    @Inject(EXTERNAL_PAYMENT_PORT) private readonly externalPaymentPort: any,
    private readonly billingWebhookService: BillingWebhookService,
  ) {}

  @Post('razorpay')
  @HttpCode(HttpStatus.OK)
  async handleRazorpayWebhook(
    @Headers('x-razorpay-signature') signature: string,
    @Body() payload: any,
    @Req() req: any,
  ): Promise<{ status: string }> {
    if (!signature) {
      this.logger.warn('Razorpay webhook request missing signature header');
      throw new UnauthorizedException('Missing signature');
    }

    // Razorpay webhook validation requires the raw body string.
    // Ensure raw body is enabled in NestJS bootstrap (app.useBodyParser('json', { limit: '10mb' }) is typical,
    // or NestJS 8+ `rawBody: true` in NestFactory.create).
    const rawBody = req.rawBody
      ? req.rawBody.toString('utf8')
      : JSON.stringify(payload);

    const isValid = this.externalPaymentPort.verifyWebhookSignature(
      rawBody,
      signature,
    );

    if (!isValid) {
      this.logger.warn('Razorpay webhook signature verification failed');
      throw new UnauthorizedException('Invalid signature');
    }

    // Extract relevant data from the payload
    // Razorpay standard payload structure:
    // { entity: "event", account_id: "acc_...", event: "payment.captured", contains: ["payment"], payload: { payment: { entity: { id: "pay_...", ... } } }, created_at: 1234567890 }

    const eventId =
      payload.headers?.['x-razorpay-event-id'] ||
      payload.payload?.payment?.entity?.id ||
      String(Date.now());
    // Wait, Razorpay sends the event ID as a header x-razorpay-event-id in real webhooks,
    // or we can use a combination of entity IDs to form a unique eventId if not present directly on the payload root.
    // Actually Razorpay webhook body doesn't have an 'id' at root. It has 'event', 'account_id', and 'payload'.
    // We will extract a unique event identifier.
    const uniqueEventId =
      (req.headers['x-razorpay-event-id'] as string) ||
      `${payload.event}_${payload.payload?.payment?.entity?.id}`;

    // Pass to service asynchronously and do not await its completion to respond 200 OK fast.
    // However, if we don't await, errors in persistence won't trigger a 500.
    // It's acceptable to await the persistence to DB and enqueueing because they are fast.
    // Processing the webhook itself (invoice state transition) is what we defer to BullMQ.
    await this.billingWebhookService.handleIncomingWebhook({
      provider: 'razorpay',
      eventId: uniqueEventId,
      eventType: payload.event,
      payload: payload,
    });

    return { status: 'received' };
  }
}
