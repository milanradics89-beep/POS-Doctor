import type { ExecutionAuditRecord } from './executionAuditTrail';
import { createExecutionAuditSummary, type ExecutionAuditSummary } from './executionAuditSummary';
import { compareExecutionAuditHealth, type ExecutionAuditHealthTrend } from './executionAuditHealthTrend';

export type ExecutionAuditComparison = {
  current: ExecutionAuditSummary;
  previous: ExecutionAuditSummary;
  healthTrend: ExecutionAuditHealthTrend;
};

export function createExecutionAuditComparison(
  current: readonly ExecutionAuditRecord[],
  previous: readonly ExecutionAuditRecord[],
  generatedAt?: string,
): ExecutionAuditComparison {
  return {
    current: createExecutionAuditSummary(current, generatedAt),
    previous: createExecutionAuditSummary(previous, generatedAt),
    healthTrend: compareExecutionAuditHealth(current, previous),
  };
}
