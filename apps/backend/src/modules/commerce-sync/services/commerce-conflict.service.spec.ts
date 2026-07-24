import {
  CommerceConflictService,
  ConflictResolutionOutcome,
} from './commerce-conflict.service';

describe('CommerceConflictService (AES-038 OCC Resolution)', () => {
  let service: CommerceConflictService;

  beforeEach(() => {
    service = new CommerceConflictService();
  });

  it('should ACCEPT_OVERWRITE when incoming timestamp is strictly newer than stored timestamp', () => {
    const storedDate = new Date('2026-07-24T10:00:00.000Z');
    const incomingStr = '2026-07-24T10:05:00.000Z'; // 5 minutes newer

    const result = service.evaluateConflict(incomingStr, storedDate);

    expect(result.outcome).toEqual(ConflictResolutionOutcome.ACCEPT_OVERWRITE);
    expect(result.shouldWrite).toBe(true);
    expect(result.incrementVersion).toBe(true);
  });

  it('should IGNORE_DUPLICATE when incoming timestamp equals stored timestamp', () => {
    const storedDate = new Date('2026-07-24T10:00:00.000Z');
    const incomingStr = '2026-07-24T10:00:00.000Z'; // Same timestamp

    const result = service.evaluateConflict(incomingStr, storedDate);

    expect(result.outcome).toEqual(ConflictResolutionOutcome.IGNORE_DUPLICATE);
    expect(result.shouldWrite).toBe(false);
    expect(result.incrementVersion).toBe(false);
  });

  it('should REJECT_STALE when incoming timestamp is older than stored timestamp', () => {
    const storedDate = new Date('2026-07-24T10:05:00.000Z');
    const incomingStr = '2026-07-24T10:00:00.000Z'; // 5 minutes older (stale event)

    const result = service.evaluateConflict(incomingStr, storedDate);

    expect(result.outcome).toEqual(ConflictResolutionOutcome.REJECT_STALE);
    expect(result.shouldWrite).toBe(false);
    expect(result.incrementVersion).toBe(false);
  });

  it('should ACCEPT_NULL_WARNING when incoming timestamp is null or undefined', () => {
    const storedDate = new Date('2026-07-24T10:00:00.000Z');

    const result = service.evaluateConflict(null, storedDate);

    expect(result.outcome).toEqual(
      ConflictResolutionOutcome.ACCEPT_NULL_WARNING,
    );
    expect(result.shouldWrite).toBe(true);
    expect(result.incrementVersion).toBe(true);
  });
});
