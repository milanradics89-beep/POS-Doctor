import type { ActionExecutionResult } from './actionDispatcher';

export type ActionExecutionRecord = {
  idempotencyKey: string;
  result: ActionExecutionResult;
};

export interface ActionExecutionStore {
  get(idempotencyKey: string): ActionExecutionRecord | undefined;
  set(record: ActionExecutionRecord): void;
}

export class InMemoryActionExecutionStore implements ActionExecutionStore {
  private readonly records = new Map<string, ActionExecutionRecord>();

  get(idempotencyKey: string): ActionExecutionRecord | undefined {
    return this.records.get(idempotencyKey);
  }

  set(record: ActionExecutionRecord): void {
    this.records.set(record.idempotencyKey, record);
  }
}
