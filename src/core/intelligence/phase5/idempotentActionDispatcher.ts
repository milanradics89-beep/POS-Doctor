import type { Action } from '../actionEngine';
import type { ActionDispatcher, ActionExecutionResult } from './actionDispatcher';
import type { ActionExecutionStore } from './actionExecutionStore';

export class IdempotentActionDispatcher {
  constructor(
    private readonly dispatcher: ActionDispatcher,
    private readonly store: ActionExecutionStore,
  ) {}

  async dispatch(
    action: Action,
    idempotencyKey: string,
    confirmed = false,
  ): Promise<ActionExecutionResult> {
    const key = idempotencyKey.trim();
    if (!key) {
      throw new Error('idempotencyKey is required.');
    }

    const existing = this.store.get(key);
    if (existing) return existing.result;

    const result = await this.dispatcher.dispatch(action, confirmed);
    this.store.set({ idempotencyKey: key, result });
    return result;
  }
}
