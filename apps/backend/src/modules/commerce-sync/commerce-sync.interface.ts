/**
 * AES-040 Public Interface Contract for Commerce Sync Domain Module
 */
export interface ICommerceSyncService {
  syncOrder(jobData: any): Promise<void>;
  syncProduct(jobData: any): Promise<void>;
  applyManualOverride(
    orderId: string,
    adminUserId: string,
    updates: any,
  ): Promise<any>;
  releaseManualOverride(orderId: string): Promise<any>;
}

export interface ICommerceConflictService {
  evaluateConflict(
    incomingStr: string | null | undefined,
    storedDate: Date | null | undefined,
    isManualOverride?: boolean,
  ): any;
  computePayloadHash(payload: any): string;
}

export const COMMERCE_SYNC_INTERFACE = Symbol('ICommerceSyncService');
export const COMMERCE_CONFLICT_INTERFACE = Symbol('ICommerceConflictService');
