import { describe, expect, it } from 'vitest';
import { createExecutionAuditComparison } from './executionAuditComparison';

describe('createExecutionAuditComparison', () => {
  it('keeps period summaries and health trend aligned', () => {
    const current = [
      { executionId: '1', idempotencyKey: 'k1', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'a', durationMs: 100 },
      { executionId: '2', idempotencyKey: 'k2', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'b', durationMs: 200 },
    ];
    const previous = [
      { executionId: '3', idempotencyKey: 'k3', actionType: 'shop' as const, status: 'FAILED' as const, recordedAt: 'c', durationMs: 300 },
      { executionId: '4', idempotencyKey: 'k4', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'd', durationMs: 100 },
    ];

    const result = createExecutionAuditComparison(current, previous, 'now');

    expect(result.current.report.total).toBe(2);
    expect(result.current.health.successRate).toBe(1);
    expect(result.previous.report.total).toBe(2);
    expect(result.previous.health.failureRate).toBe(0.5);
    expect(result.healthTrend.successRateDelta).toBe(0.5);
    expect(result.healthTrend.failureRateDelta).toBe(-0.5);
  });
});
