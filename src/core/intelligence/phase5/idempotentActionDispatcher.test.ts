import { describe, expect, it, vi } from 'vitest';
import type { Action } from '../actionEngine';
import { ActionDispatcher } from './actionDispatcher';
import { IdempotentActionDispatcher } from './idempotentActionDispatcher';
import { InMemoryActionExecutionStore } from './actionExecutionStore';

describe('IdempotentActionDispatcher', () => {
  const action = { type: 'shop', requiresConfirmation: false } as Action;

  it('executes a key only once and returns the original result', async () => {
    const handler = vi.fn().mockResolvedValue({ orderId: 'order-1' });
    const dispatcher = new IdempotentActionDispatcher(
      new ActionDispatcher({ handlers: { shop: handler } }),
      new InMemoryActionExecutionStore(),
    );

    const first = await dispatcher.dispatch(action, ' request-1 ');
    const second = await dispatcher.dispatch(action, 'request-1');

    expect(first).toEqual(second);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('keeps different keys independent', async () => {
    const handler = vi.fn().mockResolvedValue({ ok: true });
    const dispatcher = new IdempotentActionDispatcher(
      new ActionDispatcher({ handlers: { shop: handler } }),
      new InMemoryActionExecutionStore(),
    );

    await dispatcher.dispatch(action, 'request-1');
    await dispatcher.dispatch(action, 'request-2');

    expect(handler).toHaveBeenCalledTimes(2);
  });

  it('rejects a blank idempotency key', async () => {
    const dispatcher = new IdempotentActionDispatcher(
      new ActionDispatcher({ handlers: {} }),
      new InMemoryActionExecutionStore(),
    );

    await expect(dispatcher.dispatch(action, '   ')).rejects.toThrow('idempotencyKey is required.');
  });
});
