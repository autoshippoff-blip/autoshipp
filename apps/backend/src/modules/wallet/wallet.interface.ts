/**
 * AES-040 Public Interface Contract for Wallet Domain Module
 */
export interface IWalletService {
  getBalance(organizationId: string): Promise<any>;
  debit(
    organizationId: string,
    amount: number,
    referenceId: string,
  ): Promise<any>;
  credit(
    organizationId: string,
    amount: number,
    referenceId: string,
  ): Promise<any>;
}

export const WALLET_SERVICE_INTERFACE = Symbol('IWalletService');
