import { describe, expect, it } from 'vitest';
import { createExecutionAuditReport } from './executionAuditReport';

describe('createExecutionAuditReport', () => {
  it('creates a stable report from audit records', () => {
    const records = [
      { executionId: '1', idempotencyKey: 'k1', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'a', durationMs: 100 },
      { executionId: '2', idempotencyKey: 'k2', actionType: 'recipe' as const, status: 'FAILED' as const, recordedAt: 'b', durationMs: 300 },
    ];

    expect(createExecutionAuditReport(records, '2026-09-09T08:00:00.000Z')).toEqual({
      generatedAt: '2026-09-09T08:00:00.000Z',
      total: 2,
      succeeded: 1,
      failed: 1,
      averageDurationMs: 200,
      records,
    });
  });

  it('handles records without duration', () => {
    expect(createExecutionAuditReport([
      { executionId: '1', idempotencyKey: 'k1', actionType: 'shop', status: 'SUCCEEDED', recordedAt: 'a' },
    ], 'now').averageDurationMs).toBe(0);
  });

  it('returns an empty report correctly', () => {
    expect(createExecutionAuditReport([], 'now')).toEqual({
      generatedAt: 'now',
      total: 0,
      succeeded: 0,
      failed: 0,
      averageDurationMs: 0,
      records: [],
    });
  });
});
