import type { ExecutionAuditRecord } from './executionAuditTrail';

export type ExecutionAuditQuery = {
  actionType?: ExecutionAuditRecord['actionType'];
  status?: ExecutionAuditRecord['status'];
};

export function queryExecutionAuditTrail(
  records: readonly ExecutionAuditRecord[],
  query: ExecutionAuditQuery = {},
): ExecutionAuditRecord[] {
  return records
    .filter((record) => query.actionType === undefined || record.actionType === query.actionType)
    .filter((record) => query.status === undefined || record.status === query.status)
    .map((record) => ({ ...record }));
}
