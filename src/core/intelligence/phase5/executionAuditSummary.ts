import type { ExecutionAuditRecord } from './executionAuditTrail';
import { createExecutionAuditReport, type ExecutionAuditReport } from './executionAuditReport';
import { calculateExecutionAuditHealth, type ExecutionAuditHealth } from './executionAuditHealth';

export type ExecutionAuditSummary = {
  report: ExecutionAuditReport;
  health: ExecutionAuditHealth;
};

export function createExecutionAuditSummary(
  records: readonly ExecutionAuditRecord[],
  generatedAt?: string,
): ExecutionAuditSummary {
  return {
    report: createExecutionAuditReport(records, generatedAt),
    health: calculateExecutionAuditHealth(records),
  };
}
