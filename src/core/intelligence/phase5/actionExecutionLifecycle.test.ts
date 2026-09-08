import { describe, expect, it, vi } from 'vitest';
import type { Action } from '../actionEngine';
import { ActionDispatcher } from './actionDispatcher';
import { ActionExecutionLifecycle } from './actionExecutionLifecycle';

describe('ActionExecutionLifecycle', () => {
  const action = { type: 'shop', requiresConfirmation: false } as Action;

  it('records requested, executing and succeeded states', async () => {
    const handler = vi.fn().mockResolvedValue({ orderId: 'order-1' });
    const lifecycle = new ActionExecutionLifecycle(new ActionDispatcher({ handlers: { shop: handler } }));

    const result = await lifecycle.execute(action, 'request-1');

    expect(result.ok).toBe(true);
    expect(lifecycle.get('request-1')).toMatchObject({
      idempotencyKey: 'request-1',
      actionType: 'shop',
      status: 'SUCCEEDED',
      result,
    });
  });

  it('records FAILED when the dispatcher returns an execution failure', async () => {
    const lifecycle = new ActionExecutionLifecycle(new ActionDispatcher({ handlers: {} }));

    const result = await lifecycle.execute(action, 'request-2');

    expect(result).toMatchObject({ ok: false, code: 'HANDLER_NOT_FOUND' });
    expect(lifecycle.get('request-2')).toMatchObject({ status: 'FAILED', result });
  });

  it('returns the stored terminal result for a repeated key', async () => {
    const handler = vi.fn().mockResolvedValue({ orderId: 'order-2' });
    const lifecycle = new ActionExecutionLifecycle(new ActionDispatcher({ handlers: { shop: handler } }));

    const first = await lifecycle.execute(action, 'request-3');
    const second = await lifecycle.execute(action, 'request-3');

    expect(second).toEqual(first);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('rejects a blank idempotency key', async () => {
    const lifecycle = new ActionExecutionLifecycle(new ActionDispatcher({ handlers: {} }));
    await expect(lifecycle.execute(action, '  ')).rejects.toThrow('idempotencyKey is required.');
  });
});
