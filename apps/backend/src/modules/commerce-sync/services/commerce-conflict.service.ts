import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

export enum ConflictResolutionOutcome {
  ACCEPT_OVERWRITE = 'ACCEPT_OVERWRITE',
  IGNORE_DUPLICATE = 'IGNORE_DUPLICATE',
  REJECT_STALE = 'REJECT_STALE',
  REJECT_MANUAL_OVERRIDE = 'REJECT_MANUAL_OVERRIDE',
  ACCEPT_NULL_WARNING = 'ACCEPT_NULL_WARNING',
}

export interface ConflictEvaluationResult {
  outcome: ConflictResolutionOutcome;
  message: string;
  shouldWrite: boolean;
  incrementVersion: boolean;
}

@Injectable()
export class CommerceConflictService {
  /**
   * Evaluates incoming payload timestamp against stored database timestamp
   * adhering strictly to AES-038 Optimistic Concurrency Control (OCC).
   */
  evaluateConflict(
    incomingUpdatedAtStr: string | null | undefined,
    storedUpdatedAt: Date | null | undefined,
    isManualOverride: boolean = false,
  ): ConflictEvaluationResult {
    // Scenario 0: Record has manual override enabled (AES-038 §4, §11)
    if (isManualOverride) {
      return {
        outcome: ConflictResolutionOutcome.REJECT_MANUAL_OVERRIDE,
        message:
          'Record has an active manual admin override. Reject external sync write.',
        shouldWrite: false,
        incrementVersion: false,
      };
    }

    // Scenario 1: Incoming timestamp is missing or NULL
    if (!incomingUpdatedAtStr) {
      return {
        outcome: ConflictResolutionOutcome.ACCEPT_NULL_WARNING,
        message: 'Incoming timestamp is NULL. Accept write with warning.',
        shouldWrite: true,
        incrementVersion: true,
      };
    }

    const incomingTime = new Date(incomingUpdatedAtStr).getTime();

    // Scenario 2: No stored record exists in DB (New Entity)
    if (!storedUpdatedAt) {
      return {
        outcome: ConflictResolutionOutcome.ACCEPT_OVERWRITE,
        message: 'New record. Accept write.',
        shouldWrite: true,
        incrementVersion: false,
      };
    }

    const storedTime = storedUpdatedAt.getTime();

    // Scenario 3: Incoming is strictly newer than stored record
    if (incomingTime > storedTime) {
      return {
        outcome: ConflictResolutionOutcome.ACCEPT_OVERWRITE,
        message:
          'Incoming record is newer. Accept write and overwrite stored state.',
        shouldWrite: true,
        incrementVersion: true,
      };
    }

    // Scenario 4: Incoming is identical to stored record (Idempotent Duplicate)
    if (incomingTime === storedTime) {
      return {
        outcome: ConflictResolutionOutcome.IGNORE_DUPLICATE,
        message:
          'Incoming timestamp equals stored timestamp. Ignore write (idempotent duplicate).',
        shouldWrite: false,
        incrementVersion: false,
      };
    }

    // Scenario 5: Incoming is older than stored record (Stale Event)
    return {
      outcome: ConflictResolutionOutcome.REJECT_STALE,
      message:
        'Incoming record is older than stored record. Reject stale write.',
      shouldWrite: false,
      incrementVersion: false,
    };
  }

  /**
   * Computes a deterministic SHA-256 hash of a payload for change detection (AES-038 §8).
   */
  computePayloadHash(payload: any): string {
    const serialized = JSON.stringify(payload);
    return crypto.createHash('sha256').update(serialized).digest('hex');
  }
}
