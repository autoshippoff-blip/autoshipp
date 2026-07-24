import {
  Controller,
  Get,
  Request,
  UseGuards,
  Query,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrganizationGuard } from '../auth/organization.guard';
import { PermissionGuard } from '../auth/permission.guard';
import { RequirePermissions } from '../auth/decorators/require-permissions.decorator';
import { PlatformPermission } from '../auth/permissions.enum';
import { WalletBalanceResponseDto } from './dto/wallet-balance-response.dto';
import {
  WalletTransactionResponseDto,
  WalletTransactionHistoryDto,
} from './dto/wallet-transaction-response.dto';
import {
  WalletStatus,
  WalletType,
  Wallet,
  WalletBalance,
  WalletTransaction,
} from '@prisma/client';

@Controller()
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /**
   * Brand Access: Get own wallet balance
   * Relies on the user's organizationId from the JWT payload.
   */
  @Get('wallet/me')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions(PlatformPermission.WALLET_READ)
  async getMyWalletBalance(@Request() req): Promise<WalletBalanceResponseDto> {
    const userOrgId = req.user?.organization_id;
    if (!userOrgId) {
      throw new ForbiddenException(
        'User is not associated with an organization',
      );
    }

    const wallet = await this.walletService.resolveWallet(userOrgId);
    const balance = await this.walletService.getBalance(wallet.id);

    return this.mapToBalanceDto(wallet, balance);
  }

  /**
   * Brand Access: Get own wallet transactions
   */
  @Get('wallet/me/transactions')
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @RequirePermissions(PlatformPermission.WALLET_READ)
  async getMyWalletTransactions(
    @Request() req,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<WalletTransactionHistoryDto> {
    const userOrgId = req.user?.organization_id;
    if (!userOrgId) {
      throw new ForbiddenException(
        'User is not associated with an organization',
      );
    }

    const wallet = await this.walletService.resolveWallet(userOrgId);

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));

    const { transactions, total } = await this.walletService.getTransactions(
      wallet.id,
      pageNum,
      limitNum,
    );

    return {
      data: transactions.map((t) => this.mapToTransactionDto(t)),
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
      },
    };
  }

  /**
   * Aggregator/Platform Access: Get managed brand's wallet balance
   * Protected by OrganizationGuard which traverses the MANAGES hierarchy.
   */
  @Get('organizations/:orgId/wallet')
  @UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
  @RequirePermissions(PlatformPermission.WALLET_READ)
  async getManagedWalletBalance(
    @Param('orgId') orgId: string,
  ): Promise<WalletBalanceResponseDto> {
    const wallet = await this.walletService.resolveWallet(orgId);
    const balance = await this.walletService.getBalance(wallet.id);

    return this.mapToBalanceDto(wallet, balance);
  }

  /**
   * Aggregator/Platform Access: Get managed brand's wallet transactions
   */
  @Get('organizations/:orgId/wallet/transactions')
  @UseGuards(JwtAuthGuard, OrganizationGuard, PermissionGuard)
  @RequirePermissions(PlatformPermission.WALLET_READ)
  async getManagedWalletTransactions(
    @Param('orgId') orgId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ): Promise<WalletTransactionHistoryDto> {
    const wallet = await this.walletService.resolveWallet(orgId);

    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit) || 20));

    const { transactions, total } = await this.walletService.getTransactions(
      wallet.id,
      pageNum,
      limitNum,
    );

    return {
      data: transactions.map((t) => this.mapToTransactionDto(t)),
      meta: {
        total,
        page: pageNum,
        limit: limitNum,
      },
    };
  }

  /**
   * Private Mapping Helpers
   */
  private mapToBalanceDto(
    wallet: Wallet,
    balance: WalletBalance,
  ): WalletBalanceResponseDto {
    return {
      organizationId: wallet.organizationId,
      status: wallet.status,
      type: wallet.type,
      currency: wallet.currency,
      availableBalance: balance.availableBalance.toString(),
      reservedBalance: balance.reservedBalance.toString(),
      updatedAt: balance.updatedAt,
    };
  }

  private mapToTransactionDto(
    transaction: WalletTransaction,
  ): WalletTransactionResponseDto {
    return {
      transactionId: transaction.id,
      idempotencyKey: transaction.idempotencyKey,
      direction: transaction.direction,
      amount: transaction.amount.toString(),
      referenceType: transaction.referenceType,
      referenceId: transaction.referenceId,
      description: transaction.description,
      metadata: transaction.metadata
        ? (transaction.metadata as Record<string, unknown>)
        : null,
      createdAt: transaction.createdAt,
    };
  }
}
