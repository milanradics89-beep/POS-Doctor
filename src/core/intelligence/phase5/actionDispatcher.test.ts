import { describe, expect, it } from 'vitest';
import type { Action } from '../actionEngine';
import { ActionDispatcher } from './actionDispatcher';

const shopAction: Action = {
  type: 'shop',
  title: 'Show the best matching options',
  candidateIds: ['p1'],
  requiresConfirmation: true,
  payload: { comparePrices: true },
};

describe('ActionDispatcher', () => {
  it('blocks confirmation-required actions without explicit confirmation', async () => {
    const dispatcher = new ActionDispatcher({
      handlers: { shop: async () => 'executed' },
    });

    await expect(dispatcher.dispatch(shopAction)).resolves.toEqual({
      ok: false,
      actionType: 'shop',
      code: 'CONFIRMATION_REQUIRED',
      message: 'Explicit confirmation is required before executing this action.',
    });
  });

  it('dispatches a confirmed action to its registered handler', async () => {
    const dispatcher = new ActionDispatcher({
      handlers: { shop: async (action) => ({ ids: action.candidateIds }) },
    });

    await expect(dispatcher.dispatch(shopAction, true)).resolves.toEqual({
      ok: true,
      actionType: 'shop',
      output: { ids: ['p1'] },
    });
  });

  it('fails deterministically when no handler is registered', async () => {
    const dispatcher = new ActionDispatcher({ handlers: {} });

    await expect(dispatcher.dispatch({ ...shopAction, requiresConfirmation: false })).resolves.toEqual({
      ok: false,
      actionType: 'shop',
      code: 'HANDLER_NOT_FOUND',
      message: 'No handler is registered for action type: shop',
    });
  });

  it('converts handler exceptions into structured failures', async () => {
    const dispatcher = new ActionDispatcher({
      handlers: { shop: () => { throw new Error('handler exploded'); } },
    });

    await expect(dispatcher.dispatch({ ...shopAction, requiresConfirmation: false })).resolves.toEqual({
      ok: false,
      actionType: 'shop',
      code: 'HANDLER_FAILED',
      message: 'handler exploded',
    });
  });
});
