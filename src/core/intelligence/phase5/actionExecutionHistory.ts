import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';

export type ActionExecutionHistory = {
  executionId: string;
  idempotencyKey: string;
  actionType: ActionExecutionSnapshot['actionType'];
  status: ActionExecutionSnapshot['status'];
  recordedAt: string;
};

export class InMemoryActionExecutionHistory {
  private readonly entries: ActionExecutionHistory[] = [];

  append(entry: ActionExecutionHistory): void {
    this.entries.push({ ...entry });
  }

  list(): ActionExecutionHistory[] {
    return this.entries.map((entry) => ({ ...entry }));
  }

  findByIdempotencyKey(idempotencyKey: string): ActionExecutionHistory[] {
    const key = idempotencyKey.trim();
    return this.entries
      .filter((entry) => entry.idempotencyKey === key)
      .map((entry) => ({ ...entry }));
  }
}
