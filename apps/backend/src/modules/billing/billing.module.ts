import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PrismaService } from '../../prisma.service';
import { RazorpayService } from './services/razorpay.service';
import { UsageMeteringService } from './services/usage-metering.service';
import { PaymentWebhookProcessor } from './processors/payment-webhook.processor';
import { RazorpayWebhookController } from './controllers/razorpay-webhook.controller';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'payment-webhooks',
    }),
    WalletModule,
  ],
  controllers: [RazorpayWebhookController],
  providers: [
    PrismaService,
    RazorpayService,
    UsageMeteringService,
    PaymentWebhookProcessor,
  ],
  exports: [RazorpayService, UsageMeteringService],
})
export class BillingModule {}
