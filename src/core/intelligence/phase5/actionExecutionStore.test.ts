import { describe, expect, it } from 'vitest';
import type { ActionExecutionResult } from './actionDispatcher';
import { InMemoryActionExecutionStore } from './actionExecutionStore';

describe('InMemoryActionExecutionStore', () => {
  const result: ActionExecutionResult = {
    ok: true,
    actionType: 'shop',
    output: { ids: ['p1'] },
  };

  it('returns nothing for an unknown idempotency key', () => {
    const store = new InMemoryActionExecutionStore();
    expect(store.get('missing')).toBeUndefined();
  });

  it('stores and retrieves an execution result by idempotency key', () => {
    const store = new InMemoryActionExecutionStore();
    store.set({ idempotencyKey: 'request-1', result });
    expect(store.get('request-1')).toEqual({ idempotencyKey: 'request-1', result });
  });

  it('keeps keys isolated', () => {
    const store = new InMemoryActionExecutionStore();
    store.set({ idempotencyKey: 'request-1', result });
    expect(store.get('request-2')).toBeUndefined();
  });
});
