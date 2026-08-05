import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaService } from '../../prisma.service';
import { WalletController } from './wallet.controller';
import { OrganizationsModule } from '../organizations/organizations.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { WALLET_SERVICE_INTERFACE } from './wallet.interface';

@Module({
  imports: [OrganizationsModule, MarketplaceModule],
  controllers: [WalletController],
  providers: [
    WalletService,
    PrismaService,
    {
      provide: WALLET_SERVICE_INTERFACE,
      useExisting: WalletService,
    },
  ],
  exports: [WalletService, WALLET_SERVICE_INTERFACE],
})
export class WalletModule {}
