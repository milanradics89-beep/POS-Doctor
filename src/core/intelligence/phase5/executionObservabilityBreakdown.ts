import type { ActionExecutionObservability } from './executionObservability';

export type ExecutionObservabilityBreakdown = {
  actionType: string;
  total: number;
  succeeded: number;
  failed: number;
  averageDurationMs: number;
};

export function breakdownExecutionObservability(
  records: readonly ActionExecutionObservability[],
): ExecutionObservabilityBreakdown[] {
  const groups = new Map<string, ActionExecutionObservability[]>();

  for (const record of records) {
    const actionType = record.actionType.trim();
    const group = groups.get(actionType);
    if (group) group.push(record);
    else groups.set(actionType, [record]);
  }

  return [...groups.entries()].map(([actionType, group]) => {
    const succeeded = group.filter((record) => record.status === 'SUCCEEDED').length;
    const failed = group.filter((record) => record.status === 'FAILED').length;
    const totalDuration = group.reduce((sum, record) => sum + record.durationMs, 0);

    return {
      actionType,
      total: group.length,
      succeeded,
      failed,
      averageDurationMs: totalDuration / group.length,
    };
  });
}
