import { Module } from '@nestjs/common';
import { BillingService } from './services/billing.service';
import { PaymentService } from './services/payment.service';
import { PlanService } from './services/plan.service';
import { EXTERNAL_PAYMENT_PORT } from './domain/external-payment.port';
import { RazorpayAdapter } from './infrastructure/razorpay.adapter';
import { AdminBillingController } from './controllers/admin-billing.controller';
import { OrganizationBillingController } from './controllers/organization-billing.controller';

@Module({
  controllers: [AdminBillingController, OrganizationBillingController],
  providers: [
    BillingService,
    PaymentService,
    PlanService,
    {
      provide: EXTERNAL_PAYMENT_PORT,
      useClass: RazorpayAdapter,
    },
  ],
  exports: [BillingService, PaymentService, PlanService, EXTERNAL_PAYMENT_PORT],
})
export class BillingModule {}
