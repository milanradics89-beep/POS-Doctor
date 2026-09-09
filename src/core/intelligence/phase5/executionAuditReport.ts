import type { ExecutionAuditRecord } from './executionAuditTrail';

export type ExecutionAuditReport = {
  generatedAt: string;
  total: number;
  succeeded: number;
  failed: number;
  averageDurationMs: number;
  records: ExecutionAuditRecord[];
};

export function createExecutionAuditReport(
  records: readonly ExecutionAuditRecord[],
  generatedAt = new Date().toISOString(),
): ExecutionAuditReport {
  const succeeded = records.filter((record) => record.status === 'SUCCEEDED').length;
  const failed = records.filter((record) => record.status === 'FAILED').length;
  const totalDuration = records.reduce((sum, record) => sum + (record.durationMs ?? 0), 0);

  return {
    generatedAt,
    total: records.length,
    succeeded,
    failed,
    averageDurationMs: records.length ? totalDuration / records.length : 0,
    records: records.map((record) => ({ ...record })),
  };
}
