import {
  Injectable,
  BadRequestException,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import {
  WalletType,
  TransactionDirection,
  RelationshipType,
} from '@prisma/client';
import { Prisma } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}

  async createWallet(
    organizationId: string,
    type: WalletType = WalletType.PRIMARY,
    currency: string,
  ) {
    return this.prisma.wallet.create({
      data: {
        organizationId,
        type,
        currency,
        balance: {
          create: {
            availableBalance: 0,
            reservedBalance: 0,
          },
        },
      },
      include: {
        balance: true,
      },
    });
  }

  async getWallet(walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: { balance: true },
    });

    if (!wallet) {
      throw new NotFoundException('wallet-not-found');
    }

    return wallet;
  }

  async resolveWallet(organizationId: string) {
    const directWallet = await this.prisma.wallet.findFirst({
      where: { organizationId, type: WalletType.PRIMARY },
      include: { balance: true },
    });

    if (directWallet) {
      return directWallet;
    }

    let currentOrgId = organizationId;
    const visited = new Set<string>();

    while (true) {
      if (visited.has(currentOrgId)) {
        throw new NotFoundException('wallet-not-found');
      }
      visited.add(currentOrgId);

      const rel = await this.prisma.organizationRelationship.findFirst({
        where: {
          childOrganizationId: currentOrgId,
          relationshipType: RelationshipType.MANAGES,
          active: true,
        },
      });

      if (!rel) {
        throw new NotFoundException('wallet-not-found');
      }

      currentOrgId = rel.parentOrganizationId;

      const parentWallet = await this.prisma.wallet.findFirst({
        where: { organizationId: currentOrgId, type: WalletType.PRIMARY },
        include: { balance: true },
      });

      if (parentWallet) {
        return parentWallet;
      }
    }
  }

  async getBalance(walletId: string) {
    const balance = await this.prisma.walletBalance.findUnique({
      where: { walletId },
    });

    if (!balance) {
      throw new NotFoundException('Wallet balance not found');
    }

    return balance;
  }

  async credit(params: {
    walletId: string;
    idempotencyKey: string;
    transactionTypeId: string;
    amount: Prisma.Decimal | number | string;
    referenceType: string;
    referenceId?: string;
    description?: string;
    metadata?: any;
    createdBy?: string;
  }) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Idempotency check
        const existingTx = await tx.walletTransaction.findUnique({
          where: { idempotencyKey: params.idempotencyKey },
        });

        if (existingTx) {
          const balance = await tx.walletBalance.findUnique({
            where: { walletId: params.walletId },
          });
          return { transaction: existingTx, balance };
        }

        // Wallet must exist, but we do not reject credits for SUSPENDED or CLOSED wallets.
        // A customer is entitled to refunds, manual adjustments, or invoice payments regardless of status.
        const wallet = await tx.wallet.findUnique({
          where: { id: params.walletId },
        });
        if (!wallet) throw new NotFoundException('wallet-not-found');

        // 1. Insert immutable transaction
        const transaction = await tx.walletTransaction.create({
          data: {
            walletId: params.walletId,
            idempotencyKey: params.idempotencyKey,
            transactionTypeId: params.transactionTypeId,
            amount: params.amount,
            direction: TransactionDirection.CREDIT,
            referenceType: params.referenceType,
            referenceId: params.referenceId,
            description: params.description,
            metadata: params.metadata,
            createdBy: params.createdBy,
          },
        });

        // 2. Update balance
        const balance = await tx.walletBalance.update({
          where: { walletId: params.walletId },
          data: {
            availableBalance: { increment: params.amount },
          },
        });

        // Internal semantic evaluations (for future AES-036 Outbox)
        // const newBalance = Number(balance.availableBalance);
        // const creditsRestored = priorBalance <= 0 && newBalance > 0;

        return { transaction, balance };
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Idempotency race condition: UNIQUE constraint failed
        const existingTx = await this.prisma.walletTransaction.findUnique({
          where: { idempotencyKey: params.idempotencyKey },
        });
        if (existingTx) {
          const balance = await this.prisma.walletBalance.findUnique({
            where: { walletId: params.walletId },
          });
          return { transaction: existingTx, balance };
        }
      }
      throw error;
    }
  }

  async debit(params: {
    walletId: string;
    idempotencyKey: string;
    transactionTypeId: string;
    amount: Prisma.Decimal | number | string;
    referenceType: string;
    referenceId?: string;
    description?: string;
    metadata?: any;
    createdBy?: string;
  }) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        // Idempotency check
        const existingTx = await tx.walletTransaction.findUnique({
          where: { idempotencyKey: params.idempotencyKey },
        });

        if (existingTx) {
          const balance = await tx.walletBalance.findUnique({
            where: { walletId: params.walletId },
          });
          return { transaction: existingTx, balance };
        }

        // Check wallet status
        const wallet = await tx.wallet.findUnique({
          where: { id: params.walletId },
        });
        if (!wallet) throw new NotFoundException('wallet-not-found');
        if (wallet.status === 'SUSPENDED')
          throw new BadRequestException('wallet-suspended');
        if (wallet.status === 'CLOSED')
          throw new BadRequestException('wallet-closed');

        // Lock the balance row to prevent race conditions during negative balance check
        const currentBalance = await tx.$queryRaw<
          { available_balance: number }[]
        >`
          SELECT available_balance 
          FROM wallet_balances 
          WHERE wallet_id = ${params.walletId}::uuid
          FOR UPDATE
        `;

        if (!currentBalance.length) {
          throw new NotFoundException('wallet-not-found');
        }

        const balanceValue = currentBalance[0].available_balance;
        const amountValue =
          typeof params.amount === 'number'
            ? params.amount
            : Number(params.amount);

        if (balanceValue < amountValue) {
          throw new BadRequestException('insufficient-credits');
        }

        // 1. Insert immutable transaction
        const transaction = await tx.walletTransaction.create({
          data: {
            walletId: params.walletId,
            idempotencyKey: params.idempotencyKey,
            transactionTypeId: params.transactionTypeId,
            amount: params.amount,
            direction: TransactionDirection.DEBIT,
            referenceType: params.referenceType,
            referenceId: params.referenceId,
            description: params.description,
            metadata: params.metadata,
            createdBy: params.createdBy,
          },
        });

        // 2. Update balance
        const balance = await tx.walletBalance.update({
          where: { walletId: params.walletId },
          data: {
            availableBalance: { decrement: params.amount },
          },
        });

        // Internal semantic evaluations (for future AES-036 Outbox)
        // const newBalance = Number(balance.availableBalance);
        // const creditsExhausted = newBalance === 0;
        // Low balance threshold requires wallet_metadata (AES-014 / 5.9), which is not yet implemented.
        // const lowBalance = newBalance > 0 && newBalance <= (wallet.metadata?.low_balance_alert ?? 0);

        return { transaction, balance };
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        // Idempotency race condition: UNIQUE constraint failed
        const existingTx = await this.prisma.walletTransaction.findUnique({
          where: { idempotencyKey: params.idempotencyKey },
        });
        if (existingTx) {
          const balance = await this.prisma.walletBalance.findUnique({
            where: { walletId: params.walletId },
          });
          return { transaction: existingTx, balance };
        }
      }
      throw error;
    }
  }
}
