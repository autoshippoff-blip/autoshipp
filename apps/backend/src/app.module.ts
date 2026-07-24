import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { ShopifyIntegrationModule } from './modules/integrations/shopify/shopify-integration.module';
import { CommerceSyncModule } from './modules/commerce-sync/commerce-sync.module';
import { IntelligenceModule } from './modules/intelligence/intelligence.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379', 10),
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    DashboardModule,
    CommunicationModule,
    WalletModule,
    MarketplaceModule,
    ShopifyIntegrationModule,
    CommerceSyncModule,
    IntelligenceModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
