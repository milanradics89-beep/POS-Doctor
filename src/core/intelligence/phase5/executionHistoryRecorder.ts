import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import type { ActionExecutionHistory } from './actionExecutionHistory';

export class ExecutionHistoryRecorder {
  constructor(private readonly history: { append(entry: ActionExecutionHistory): void }) {}

  record(snapshot: ActionExecutionSnapshot, recordedAt = new Date().toISOString()): ActionExecutionHistory {
    const entry: ActionExecutionHistory = {
      executionId: snapshot.idempotencyKey,
      idempotencyKey: snapshot.idempotencyKey,
      actionType: snapshot.actionType,
      status: snapshot.status,
      recordedAt,
    };
    this.history.append(entry);
    return entry;
  }
}
