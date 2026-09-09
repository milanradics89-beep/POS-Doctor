import { describe, expect, it } from 'vitest';
import { compareExecutionAuditHealth } from './executionAuditHealthTrend';

describe('compareExecutionAuditHealth', () => {
  it('calculates rate deltas between periods', () => {
    const current = [
      { executionId: '1', idempotencyKey: '1', actionType: 'shop', status: 'SUCCEEDED', recordedAt: 'a' },
      { executionId: '2', idempotencyKey: '2', actionType: 'shop', status: 'SUCCEEDED', recordedAt: 'b' },
      { executionId: '3', idempotencyKey: '3', actionType: 'shop', status: 'FAILED', recordedAt: 'c' },
    ] as const;
    const previous = [
      { executionId: '4', idempotencyKey: '4', actionType: 'shop', status: 'SUCCEEDED', recordedAt: 'd' },
      { executionId: '5', idempotencyKey: '5', actionType: 'shop', status: 'FAILED', recordedAt: 'e' },
    ] as const;

    expect(compareExecutionAuditHealth(current, previous)).toEqual({
      current: { total: 3, successRate: 2 / 3, failureRate: 1 / 3 },
      previous: { total: 2, successRate: 1 / 2, failureRate: 1 / 2 },
      successRateDelta: 2 / 3 - 1 / 2,
      failureRateDelta: 1 / 3 - 1 / 2,
    });
  });

  it('handles empty periods', () => {
    expect(compareExecutionAuditHealth([], [])).toEqual({
      current: { total: 0, successRate: 0, failureRate: 0 },
      previous: { total: 0, successRate: 0, failureRate: 0 },
      successRateDelta: 0,
      failureRateDelta: 0,
    });
  });
});
