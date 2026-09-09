import type { ExecutionAuditRecord } from './executionAuditTrail';

export type ExecutionAuditHealthTrend = {
  current: { total: number; successRate: number; failureRate: number };
  previous: { total: number; successRate: number; failureRate: number };
  successRateDelta: number;
  failureRateDelta: number;
};

function rates(records: readonly ExecutionAuditRecord[]) {
  const total = records.length;
  const succeeded = records.filter((record) => record.status === 'SUCCEEDED').length;
  const failed = records.filter((record) => record.status === 'FAILED').length;
  return {
    total,
    successRate: total ? succeeded / total : 0,
    failureRate: total ? failed / total : 0,
  };
}

export function compareExecutionAuditHealth(
  current: readonly ExecutionAuditRecord[],
  previous: readonly ExecutionAuditRecord[],
): ExecutionAuditHealthTrend {
  const currentRates = rates(current);
  const previousRates = rates(previous);

  return {
    current: currentRates,
    previous: previousRates,
    successRateDelta: currentRates.successRate - previousRates.successRate,
    failureRateDelta: currentRates.failureRate - previousRates.failureRate,
  };
}
