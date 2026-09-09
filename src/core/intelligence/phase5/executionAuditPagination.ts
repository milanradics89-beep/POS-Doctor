import type { ExecutionAuditRecord } from './executionAuditTrail';
import { queryExecutionAuditTrail, type ExecutionAuditQuery } from './executionAuditQuery';

export type ExecutionAuditPage = {
  items: ExecutionAuditRecord[];
  total: number;
  offset: number;
  limit: number;
  hasNext: boolean;
};

export function paginateExecutionAuditTrail(
  records: readonly ExecutionAuditRecord[],
  query: ExecutionAuditQuery = {},
  offset = 0,
  limit = 25,
): ExecutionAuditPage {
  if (!Number.isInteger(offset) || offset < 0) {
    throw new Error('offset must be a non-negative integer.');
  }
  if (!Number.isInteger(limit) || limit <= 0) {
    throw new Error('limit must be a positive integer.');
  }

  const filtered = queryExecutionAuditTrail(records, query);
  const items = filtered.slice(offset, offset + limit);

  return {
    items,
    total: filtered.length,
    offset,
    limit,
    hasNext: offset + items.length < filtered.length,
  };
}
