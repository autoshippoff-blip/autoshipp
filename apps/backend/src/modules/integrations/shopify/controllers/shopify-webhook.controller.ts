import {
  Controller,
  Post,
  Req,
  Headers,
  Body,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { ShopifyWebhookService } from '../services/shopify-webhook.service';

@Controller('webhooks/shopify')
export class ShopifyWebhookController {
  constructor(private readonly webhookService: ShopifyWebhookService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handleWebhook(
    @Req() req: any,
    @Headers('x-shopify-hmac-sha256') hmacHeader: string,
    @Headers('x-shopify-topic') topic: string,
    @Headers('x-shopify-shop-domain') shopDomain: string,
    @Headers('x-shopify-webhook-id') webhookId: string,
    @Body() payload: any,
  ) {
    if (!hmacHeader || !topic || !shopDomain || !webhookId) {
      throw new BadRequestException('Missing required Shopify webhook headers');
    }

    const rawBody = req.rawBody || JSON.stringify(payload);
    const result = await this.webhookService.processWebhook(
      rawBody,
      hmacHeader,
      topic,
      shopDomain,
      webhookId,
      payload,
    );

    return {
      status: 'success',
      webhookId: result.webhookId,
      duplicate: result.duplicate,
    };
  }
}
