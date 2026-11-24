import { describe, expect, it, vi } from 'vitest';
import { createIdempotencyKey, getOrCreateAnalysisAttempt } from './analysisAttempt';

describe('analysis idempotency attempts', () => {
  it('reuses the same key when the same intent is retried', () => {
    const createKey = vi.fn()
      .mockReturnValueOnce('analysis-first-key-123456')
      .mockReturnValueOnce('analysis-second-key-123456');

    const first = getOrCreateAnalysisAttempt(null, 'improve', createKey);
    const retry = getOrCreateAnalysisAttempt(first, 'improve', createKey);

    expect(retry).toBe(first);
    expect(retry.idempotencyKey).toBe('analysis-first-key-123456');
    expect(createKey).toHaveBeenCalledTimes(1);
  });

  it('creates a new key when the analysis intent changes', () => {
    const createKey = vi.fn()
      .mockReturnValueOnce('analysis-first-key-123456')
      .mockReturnValueOnce('analysis-second-key-123456');

    const first = getOrCreateAnalysisAttempt(null, 'improve', createKey);
    const changed = getOrCreateAnalysisAttempt(first, 'fix', createKey);

    expect(changed).not.toBe(first);
    expect(changed.idempotencyKey).toBe('analysis-second-key-123456');
    expect(createKey).toHaveBeenCalledTimes(2);
  });

  it('uses crypto.randomUUID when available', () => {
    const cryptoApi = { randomUUID: () => '123e4567-e89b-12d3-a456-426614174000' } as unknown as Crypto;
    expect(createIdempotencyKey(cryptoApi)).toBe('analysis-123e4567-e89b-12d3-a456-426614174000');
  });

  it('uses crypto.getRandomValues when randomUUID is unavailable', () => {
    const cryptoApi = {
      getRandomValues: (bytes: Uint8Array) => {
        bytes.fill(0xab);
        return bytes;
      },
    } as unknown as Crypto;
    expect(createIdempotencyKey(cryptoApi)).toBe(`analysis-${'ab'.repeat(16)}`);
  });

  it('fails closed instead of falling back to Math.random', () => {
    expect(() => createIdempotencyKey({} as Crypto)).toThrow(/Secure random generation is unavailable/);
  });
});
