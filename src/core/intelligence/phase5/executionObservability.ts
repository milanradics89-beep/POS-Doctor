import type { ActionExecutionStatus } from './actionExecutionLifecycle';
import type { ActionExecutionMetrics } from './actionExecutionMetrics';

export type ActionExecutionObservability = {
  executionId: string;
  actionType: string;
  status: ActionExecutionStatus;
  durationMs: number;
  recordedAt: string;
};

export function createExecutionObservability(input: {
  executionId: string;
  actionType: string;
  metrics: ActionExecutionMetrics;
  recordedAt?: string;
}): ActionExecutionObservability {
  const executionId = input.executionId.trim();
  const actionType = input.actionType.trim();
  if (!executionId) throw new Error('executionId is required.');
  if (!actionType) throw new Error('actionType is required.');

  return {
    executionId,
    actionType,
    status: input.metrics.status,
    durationMs: input.metrics.durationMs,
    recordedAt: input.recordedAt ?? new Date().toISOString(),
  };
}
