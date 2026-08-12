import { SyncStatus, SyncEntityType } from '@prisma/client';

export interface SyncTelemetryDto {
  storeId: string;
  organizationId: string;
  entityType: SyncEntityType;
  status: SyncStatus;
  pagesProcessed: number;
  recordsProcessed: number;
  nextCursor?: string | null;
  lastError?: string | null;
  lastCheckpointAt: string;
}

/**
 * OrderSyncTelemetryService decouples database persistence models
 * from public API / operational telemetry contracts.
 */
export class OrderSyncTelemetryService {
  static toDto(checkpoint: any): SyncTelemetryDto {
    return {
      storeId: checkpoint.storeId,
      organizationId: checkpoint.organizationId,
      entityType: checkpoint.entityType,
      status: checkpoint.status,
      pagesProcessed: checkpoint.pagesProcessed,
      recordsProcessed: checkpoint.recordsProcessed,
      nextCursor: checkpoint.nextCursor,
      lastError: checkpoint.lastError,
      lastCheckpointAt:
        checkpoint.lastCheckpointAt instanceof Date
          ? checkpoint.lastCheckpointAt.toISOString()
          : checkpoint.lastCheckpointAt,
    };
  }
}
