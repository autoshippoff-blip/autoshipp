import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../../prisma.service';
import { ShopifyCryptoService } from './shopify-crypto.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

export interface WebhookIngestionResult {
  processed: boolean;
  duplicate: boolean;
  webhookId: string;
}

@Injectable()
export class ShopifyWebhookService {
  private readonly clientSecret: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: ShopifyCryptoService,
    @InjectQueue('shopify-webhooks') private readonly webhookQueue: Queue,
  ) {
    this.clientSecret =
      process.env.SHOPIFY_API_SECRET || 'mock_shopify_api_secret';
  }

  /**
   * Validates inbound webhook HMAC signature, checks event idempotency, and pushes payload to BullMQ queue.
   */
  async processWebhook(
    rawBody: Buffer | string,
    hmacHeader: string,
    topic: string,
    shopDomain: string,
    webhookId: string,
    payload: any,
  ): Promise<WebhookIngestionResult> {
    // 1. Verify HMAC SHA-256 signature
    const isValidHmac = this.cryptoService.verifyWebhookHmac(
      rawBody,
      hmacHeader,
      this.clientSecret,
    );
    if (!isValidHmac) {
      throw new UnauthorizedException('Invalid Shopify Webhook HMAC signature');
    }

    // 2. Check Idempotency Table (`fit_processed_webhooks`)
    const existing = await this.prisma.processedWebhook.findUnique({
      where: { webhookId },
    });

    if (existing) {
      return { processed: true, duplicate: true, webhookId };
    }

    // 3. Persist Idempotency Record
    await this.prisma.processedWebhook.create({
      data: {
        webhookId,
        topic: topic || 'unknown',
        shopDomain: shopDomain || 'unknown',
      },
    });

    // 4. Resolve Organization ID linked to the Store domain
    const store = await this.prisma.store.findFirst({
      where: { domain: shopDomain },
      select: { organizationId: true, id: true },
    });

    // 5. Publish Event Payload to BullMQ Queue (`shopify-webhooks`)
    await this.webhookQueue.add(
      topic,
      {
        webhookId,
        topic,
        shopDomain,
        organizationId: store?.organizationId || null,
        storeId: store?.id || null,
        payload,
        receivedAt: new Date().toISOString(),
      },
      {
        jobId: webhookId, // Enforce BullMQ level deduplication
        attempts: 5,
        backoff: {
          type: 'exponential',
          delay: 2000,
        },
      },
    );

    return { processed: true, duplicate: false, webhookId };
  }
}
