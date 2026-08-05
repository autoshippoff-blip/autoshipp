import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { PrismaService } from '../../prisma.service';
import { WalletController } from './wallet.controller';
import { OrganizationsModule } from '../organizations/organizations.module';

import { MarketplaceModule } from '../marketplace/marketplace.module';

@Module({
  imports: [OrganizationsModule, MarketplaceModule],
  controllers: [WalletController],
  providers: [WalletService, PrismaService],
  exports: [WalletService],
})
export class WalletModule {}
