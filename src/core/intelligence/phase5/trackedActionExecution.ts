import type { Action } from '../actionEngine';
import type { ActionExecutionResult } from './actionDispatcher';
import type { ActionExecutionHistory } from './actionExecutionHistory';
import type { ActionExecutionLifecycle, ActionExecutionSnapshot } from './actionExecutionLifecycle';
import { ExecutionHistoryRecorder } from './executionHistoryRecorder';

export class TrackedActionExecution {
  private readonly recorder: ExecutionHistoryRecorder;

  constructor(
    private readonly lifecycle: ActionExecutionLifecycle,
    history: { append(entry: ActionExecutionHistory): void },
  ) {
    this.recorder = new ExecutionHistoryRecorder(history);
  }

  async execute(action: Action, idempotencyKey: string, confirmed = false): Promise<ActionExecutionResult> {
    const key = idempotencyKey.trim();
    const result = await this.lifecycle.execute(action, key, confirmed);
    const snapshot = this.lifecycle.get(key);
    if (snapshot) this.recorder.record(snapshot);
    return result;
  }
}
