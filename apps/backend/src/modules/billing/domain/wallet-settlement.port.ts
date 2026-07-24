export interface WalletSettlementResult {
  success: boolean;
  transactionId?: string;
  reason?: string;
}

export interface WalletSettlementPort {
  /**
   * Debits a specific amount from the organization's wallet.
   * @param organizationId - The organization whose wallet should be debited.
   * @param amount - The amount to debit.
   * @param currency - The currency code.
   * @param reference - A reference identifier (e.g. Invoice Number).
   * @param idempotencyKey - Unique key to prevent double charging.
   */
  debitBalance(
    organizationId: string,
    amount: number,
    currency: string,
    reference: string,
    idempotencyKey: string,
  ): Promise<WalletSettlementResult>;
}
