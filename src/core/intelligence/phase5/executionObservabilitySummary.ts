import type { ActionExecutionObservability } from './executionObservability';

export type ActionExecutionObservabilitySummary = {
  total: number;
  succeeded: number;
  failed: number;
  averageDurationMs: number;
};

export function summarizeExecutionObservability(
  records: readonly ActionExecutionObservability[],
): ActionExecutionObservabilitySummary {
  const succeeded = records.filter((record) => record.status === 'SUCCEEDED').length;
  const failed = records.filter((record) => record.status === 'FAILED').length;
  const totalDuration = records.reduce((sum, record) => sum + record.durationMs, 0);

  return {
    total: records.length,
    succeeded,
    failed,
    averageDurationMs: records.length === 0 ? 0 : totalDuration / records.length,
  };
}
