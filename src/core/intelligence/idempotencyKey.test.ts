import { describe, expect, it } from 'vitest';
import { createIdempotencyKey } from './idempotencyKey';

describe('analysis idempotency key', () => {
  it('creates a bounded ASCII header value accepted by the backend contract', () => {
    const key = createIdempotencyKey();
    expect(key).toMatch(/^[A-Za-z0-9._:-]{16,128}$/);
  });

  it('creates distinct identifiers for separate user actions', () => {
    expect(createIdempotencyKey()).not.toBe(createIdempotencyKey());
  });
});
