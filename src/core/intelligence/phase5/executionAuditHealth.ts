import type { ExecutionAuditRecord } from './executionAuditTrail';

export type ExecutionAuditHealth = {
  total: number;
  successRate: number;
  failureRate: number;
  averageDurationMs: number;
};

export function calculateExecutionAuditHealth(
  records: readonly ExecutionAuditRecord[],
): ExecutionAuditHealth {
  const total = records.length;
  const succeeded = records.filter((record) => record.status === 'SUCCEEDED').length;
  const failed = records.filter((record) => record.status === 'FAILED').length;
  const totalDuration = records.reduce((sum, record) => sum + (record.durationMs ?? 0), 0);

  return {
    total,
    successRate: total === 0 ? 0 : succeeded / total,
    failureRate: total === 0 ? 0 : failed / total,
    averageDurationMs: total === 0 ? 0 : totalDuration / total,
  };
}
