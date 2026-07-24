import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../../prisma.service';
import { ShopifyCryptoService } from './services/shopify-crypto.service';
import { ShopifyOAuthService } from './services/shopify-oauth.service';
import { ShopifyWebhookService } from './services/shopify-webhook.service';
import { ShopifyOAuthController } from './controllers/shopify-oauth.controller';
import { ShopifyWebhookController } from './controllers/shopify-webhook.controller';
import { OrganizationStoreController } from './controllers/organization-store.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret-jwt-key',
      signOptions: { expiresIn: '15m' },
    }),
    BullModule.registerQueue({
      name: 'shopify-webhooks',
    }),
  ],
  controllers: [
    ShopifyOAuthController,
    ShopifyWebhookController,
    OrganizationStoreController,
  ],
  providers: [
    PrismaService,
    ShopifyCryptoService,
    ShopifyOAuthService,
    ShopifyWebhookService,
  ],
  exports: [ShopifyOAuthService, ShopifyWebhookService],
})
export class ShopifyIntegrationModule {}
