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

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'billing-webhooks',
    }),
  ],
  controllers: [
    AdminBillingController,
    OrganizationBillingController,
    PaymentWebhookController,
  ],
  providers: [
    BillingService,
    PaymentService,
    PlanService,
    BillingWebhookService,
    WebhookProcessor,
    PrismaService,
    {
      provide: EXTERNAL_PAYMENT_PORT,
      useClass: RazorpayAdapter,
    },
  ],
  exports: [
    BillingService,
    PaymentService,
    PlanService,
    BillingWebhookService,
    EXTERNAL_PAYMENT_PORT,
  ],
})
export class BillingModule {}
