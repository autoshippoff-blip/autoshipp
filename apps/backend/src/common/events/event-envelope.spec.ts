import { createEventEnvelope } from './event-envelope.interface';

describe('EventEnvelope Contract (AES-041 §8, D-417)', () => {
  it('should construct event envelope carrying version: 1 by default', () => {
    const payload = { orderId: 'ord-123', total: 100 };
    const event = createEventEnvelope('order.created', payload);

    expect(event.eventName).toBe('order.created');
    expect(event.version).toBe(1);
    expect(event.eventId).toBeDefined();
    expect(event.occurredAt).toBeDefined();
    expect(event.payload).toEqual(payload);
  });

  it('should support explicit event version specification', () => {
    const payload = { orderId: 'ord-456', total_price: 150 };
    const event = createEventEnvelope('order.created', payload, 2);

    expect(event.version).toBe(2);
  });
});
