import { describe, expect, it } from 'vitest';
import { paginateExecutionAuditTrail } from './executionAuditPagination';

const records = [
  { executionId: '1', idempotencyKey: 'a', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'a' },
  { executionId: '2', idempotencyKey: 'b', actionType: 'recipe' as const, status: 'FAILED' as const, recordedAt: 'b' },
  { executionId: '3', idempotencyKey: 'c', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'c' },
];

describe('paginateExecutionAuditTrail', () => {
  it('returns a page and continuation state', () => {
    expect(paginateExecutionAuditTrail(records, {}, 1, 1)).toEqual({
      items: [records[1]],
      total: 3,
      offset: 1,
      limit: 1,
      hasNext: true,
    });
  });

  it('paginates after filtering', () => {
    expect(paginateExecutionAuditTrail(records, { actionType: 'shop' }, 1, 1)).toEqual({
      items: [records[2]],
      total: 2,
      offset: 1,
      limit: 1,
      hasNext: false,
    });
  });

  it('rejects invalid pagination values', () => {
    expect(() => paginateExecutionAuditTrail(records, {}, -1, 25)).toThrow('offset must be a non-negative integer.');
    expect(() => paginateExecutionAuditTrail(records, {}, 0, 0)).toThrow('limit must be a positive integer.');
  });
});
