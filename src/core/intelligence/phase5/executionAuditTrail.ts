import type { ActionExecutionHistory } from './actionExecutionHistory';
import type { ActionExecutionObservability } from './executionObservability';

export type ExecutionAuditRecord = ActionExecutionHistory & {
  durationMs?: number;
};

export function buildExecutionAuditTrail(
  history: readonly ActionExecutionHistory[],
  observability: readonly ActionExecutionObservability[],
): ExecutionAuditRecord[] {
  const durationByExecutionId = new Map(
    observability.map((record) => [record.executionId, record.durationMs]),
  );

  return history.map((entry) => {
    const durationMs = durationByExecutionId.get(entry.executionId);
    return durationMs === undefined ? { ...entry } : { ...entry, durationMs };
  });
}
