import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import type { ActionExecutionHistory, ActionExecutionHistoryEntry } from './actionExecutionHistory';

export class ExecutionHistoryRecorder {
  constructor(private readonly history: ActionExecutionHistory) {}

  record(snapshot: ActionExecutionSnapshot, recordedAt = new Date().toISOString()): ActionExecutionHistoryEntry {
    const entry: ActionExecutionHistoryEntry = {
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
