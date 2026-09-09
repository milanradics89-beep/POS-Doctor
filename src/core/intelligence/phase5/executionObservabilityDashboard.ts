import type { ActionExecutionObservability } from './executionObservability';
import { summarizeExecutionObservability, type ActionExecutionObservabilitySummary } from './executionObservabilitySummary';

export type ExecutionObservabilityDashboard = {
  summary: ActionExecutionObservabilitySummary;
  recent: ActionExecutionObservability[];
};

export function createExecutionObservabilityDashboard(
  records: readonly ActionExecutionObservability[],
  recentLimit = 10,
): ExecutionObservabilityDashboard {
  if (!Number.isInteger(recentLimit) || recentLimit < 0) {
    throw new Error('recentLimit must be a non-negative integer.');
  }

  const recent = recentLimit === 0
    ? []
    : records.slice(-recentLimit).reverse().map((record) => ({ ...record }));

  return {
    summary: summarizeExecutionObservability(records),
    recent,
  };
}
