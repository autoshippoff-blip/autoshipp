import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CommunicationModule } from './modules/communication/communication.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { BillingModule } from './modules/billing/billing.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrganizationsModule,
    DashboardModule,
    CommunicationModule,
    WalletModule,
    BillingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
