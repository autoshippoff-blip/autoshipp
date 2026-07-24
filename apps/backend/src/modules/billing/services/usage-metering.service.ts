import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../prisma.service';
import { WalletService } from '../../wallet/wallet.service';
import { WalletType, TransactionDirection } from '@prisma/client';

@Injectable()
export class UsageMeteringService {
  private readonly logger = new Logger(UsageMeteringService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService,
  ) {}

  /**
   * Records consumption of platform features, appends debit transaction to Wallet, and writes OutboxEvent atomically.
   */
  async recordUsage(
    organizationId: string,
    featureCode: string,
    quantity: number,
    unitPriceAmount: number,
  ) {
    const totalCost = Number((quantity * unitPriceAmount).toFixed(2));

    return await this.prisma.$transaction(async (tx) => {
      // 1. Create UsageRecord
      const usageRecord = await tx.usageRecord.create({
        data: {
          organizationId,
          featureCode,
          quantity,
          totalCost,
        },
      });

      // 2. Resolve target wallet using hierarchy traversal
      const wallet = await this.walletService.resolveWallet(organizationId);

      // 3. Write Transactional Outbox Event (AES-036)
      const outboxEvent = await tx.outboxEvent.create({
        data: {
          aggregateType: 'USAGE_RECORD',
          aggregateId: usageRecord.id,
          eventType: 'USAGE_RECORDED',
          payload: {
            usageRecordId: usageRecord.id,
            organizationId,
            featureCode,
            quantity,
            totalCost,
            walletId: wallet.id,
          },
          status: 'PENDING',
        },
      });

      this.logger.log(
        `Recorded usage [${usageRecord.id}] for Org [${organizationId}] (Cost: ₹${totalCost}, Outbox: ${outboxEvent.id})`,
      );

      return { usageRecord, wallet, outboxEvent };
    });
  }
}
