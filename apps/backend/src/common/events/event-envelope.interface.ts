import * as crypto from 'crypto';

/**
 * AES-041 Event Envelope Contract with mandatory Versioning (AES-041 §8, D-417)
 */
export interface EventEnvelope<T = any> {
  eventId: string;
  eventName: string;
  version: number;
  occurredAt: string;
  payload: T;
}

export function createEventEnvelope<T>(
  eventName: string,
  payload: T,
  version: number = 1,
): EventEnvelope<T> {
  return {
    eventId: crypto.randomUUID(),
    eventName,
    version,
    occurredAt: new Date().toISOString(),
    payload,
  };
}
