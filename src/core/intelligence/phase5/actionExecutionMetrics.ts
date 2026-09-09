import type { ActionExecutionStatus } from './actionExecutionLifecycle';

export type ActionExecutionMetrics = {
  status: ActionExecutionStatus;
  durationMs: number;
};

export function createActionExecutionMetrics(
  status: ActionExecutionStatus,
  startedAtMs: number,
  completedAtMs: number,
): ActionExecutionMetrics {
  if (!Number.isFinite(startedAtMs) || !Number.isFinite(completedAtMs)) {
    throw new Error('Execution timestamps must be finite numbers.');
  }
  if (completedAtMs < startedAtMs) {
    throw new Error('Execution completion cannot precede execution start.');
  }

  return {
    status,
    durationMs: completedAtMs - startedAtMs,
  };
}
