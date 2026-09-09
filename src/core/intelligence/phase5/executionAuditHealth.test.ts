import { describe, expect, it } from 'vitest';
import { calculateExecutionAuditHealth } from './executionAuditHealth';

describe('calculateExecutionAuditHealth', () => {
  it('calculates success, failure and duration metrics', () => {
    const records = [
      { executionId: '1', idempotencyKey: 'k1', actionType: 'shop', status: 'SUCCEEDED' as const, recordedAt: 'a', durationMs: 100 },
      { executionId: '2', idempotencyKey: 'k2', actionType: 'recipe', status: 'FAILED' as const, recordedAt: 'b', durationMs: 300 },
      { executionId: '3', idempotencyKey: 'k3', actionType: 'shop', status: 'SUCCEEDED' as const, recordedAt: 'c', durationMs: 200 },
    ];

    expect(calculateExecutionAuditHealth(records)).toEqual({
      total: 3,
      successRate: 2 / 3,
      failureRate: 1 / 3,
      averageDurationMs: 200,
    });
  });

  it('returns zero metrics for an empty collection', () => {
    expect(calculateExecutionAuditHealth([])).toEqual({
      total: 0,
      successRate: 0,
      failureRate: 0,
      averageDurationMs: 0,
    });
  });
});
