import { describe, expect, it } from 'vitest';
import { queryExecutionAuditTrail } from './executionAuditQuery';

const records = [
  { executionId: '1', idempotencyKey: 'a', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'a', durationMs: 100 },
  { executionId: '2', idempotencyKey: 'b', actionType: 'recipe' as const, status: 'FAILED' as const, recordedAt: 'b', durationMs: 300 },
  { executionId: '3', idempotencyKey: 'c', actionType: 'shop' as const, status: 'FAILED' as const, recordedAt: 'c' },
];

describe('queryExecutionAuditTrail', () => {
  it('filters by action type and status', () => {
    expect(queryExecutionAuditTrail(records, { actionType: 'shop', status: 'FAILED' })).toEqual([records[2]]);
  });

  it('supports an empty query as a copy of all records', () => {
    const result = queryExecutionAuditTrail(records);
    expect(result).toEqual(records);
    expect(result).not.toBe(records);
  });

  it('returns an empty result when no record matches', () => {
    expect(queryExecutionAuditTrail(records, { actionType: 'recipe', status: 'SUCCEEDED' })).toEqual([]);
  });
});
