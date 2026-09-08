import type { Action } from '../actionEngine';
import type { ActionDispatcher, ActionExecutionResult } from './actionDispatcher';

export type ActionExecutionStatus = 'REQUESTED' | 'EXECUTING' | 'SUCCEEDED' | 'FAILED';

export type ActionExecutionSnapshot = {
  idempotencyKey: string;
  actionType: Action['type'];
  status: ActionExecutionStatus;
  result?: ActionExecutionResult;
};

export class ActionExecutionLifecycle {
  private readonly executions = new Map<string, ActionExecutionSnapshot>();

  constructor(private readonly dispatcher: ActionDispatcher) {}

  get(idempotencyKey: string): ActionExecutionSnapshot | undefined {
    return this.executions.get(idempotencyKey.trim());
  }

  async execute(action: Action, idempotencyKey: string, confirmed = false): Promise<ActionExecutionResult> {
    const key = idempotencyKey.trim();
    if (!key) throw new Error('idempotencyKey is required.');

    const existing = this.executions.get(key);
    if (existing?.result) return existing.result;

    this.executions.set(key, { idempotencyKey: key, actionType: action.type, status: 'REQUESTED' });
    this.executions.set(key, { idempotencyKey: key, actionType: action.type, status: 'EXECUTING' });

    const result = await this.dispatcher.dispatch(action, confirmed);
    this.executions.set(key, {
      idempotencyKey: key,
      actionType: action.type,
      status: result.ok ? 'SUCCEEDED' : 'FAILED',
      result,
    });
    return result;
  }
}
