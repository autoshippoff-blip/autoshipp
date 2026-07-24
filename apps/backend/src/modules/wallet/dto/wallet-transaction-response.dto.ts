import { TransactionDirection } from '@prisma/client';

export class WalletTransactionResponseDto {
  transactionId: string;
  idempotencyKey: string;
  direction: TransactionDirection;
  amount: string; // Serialized Prisma.Decimal
  referenceType: string;
  referenceId: string | null;
  description: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export class WalletTransactionHistoryDto {
  data: WalletTransactionResponseDto[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
