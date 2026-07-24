import { WalletStatus, WalletType } from '@prisma/client';

export class WalletBalanceResponseDto {
  organizationId: string;
  status: WalletStatus;
  type: WalletType;
  currency: string;
  availableBalance: string; // Serialized Prisma.Decimal
  reservedBalance: string; // Serialized Prisma.Decimal
  updatedAt: Date;
}
