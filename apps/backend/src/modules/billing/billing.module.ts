import { Module } from '@nestjs/common';
import { BillingService } from './services/billing.service';
import { PaymentService } from './services/payment.service';
import { PlanService } from './services/plan.service';
import { EXTERNAL_PAYMENT_PORT } from './domain/external-payment.port';
import { RazorpayAdapter } from './infrastructure/razorpay.adapter';
import { AdminBillingController } from './controllers/admin-billing.controller';
import { OrganizationBillingController } from './controllers/organization-billing.controller';
import { PaymentWebhookController } from './controllers/payment-webhook.controller';
import { BillingWebhookService } from './services/billing-webhook.service';
import { WebhookProcessor } from './services/webhook.processor';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { RazorpayService } from './services/razorpay.service';
import { UsageMeteringService } from './services/usage-metering.service';
import { PaymentWebhookProcessor } from './processors/payment-webhook.processor';
import { RazorpayWebhookController } from './controllers/razorpay-webhook.controller';
import { WalletModule } from '../wallet/wallet.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { SubscriptionLifecycleService } from './services/subscription-lifecycle.service';
import { SubscriptionLifecycleProcessor } from './processors/subscription-lifecycle.processor';
import { GracePeriodScheduler } from './schedulers/grace-period.scheduler';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'billing-webhooks',
    }),
    BullModule.registerQueue({
      name: 'payment-webhooks',
    }),
    BullModule.registerQueue({
      name: 'subscription-lifecycle',
    }),
    WalletModule,
    MarketplaceModule,
  ],
  controllers: [
    AdminBillingController,
    OrganizationBillingController,
    PaymentWebhookController,
    RazorpayWebhookController,
  ],
  providers: [
    BillingService,
    PaymentService,
    PlanService,
    BillingWebhookService,
    WebhookProcessor,
    PrismaService,
    RazorpayService,
    UsageMeteringService,
    PaymentWebhookProcessor,
    {
      provide: EXTERNAL_PAYMENT_PORT,
      useClass: RazorpayAdapter,
    },
    SubscriptionLifecycleService,
    SubscriptionLifecycleProcessor,
    GracePeriodScheduler,
  ],
  exports: [
    BillingService,
    PaymentService,
    PlanService,
    BillingWebhookService,
    EXTERNAL_PAYMENT_PORT,
    RazorpayService,
    UsageMeteringService,
  ],
})
export class BillingModule {}
