import { describe, expect, it } from 'vitest';
import type { Action } from '../actionEngine';
import { validateActionExecutionRequest } from './validateActionExecutionRequest';

const validAction: Action = {
  type: 'shop',
  title: 'Show options',
  candidateIds: ['p1'],
  requiresConfirmation: true,
  payload: { comparePrices: true },
};

describe('validateActionExecutionRequest', () => {
  it('accepts a valid action execution request', () => {
    expect(validateActionExecutionRequest(validAction)).toEqual({ ok: true });
  });

  it('rejects an unsupported action type at the runtime boundary', () => {
    const invalid = { ...validAction, type: 'purchase' } as unknown as Action;
    expect(validateActionExecutionRequest(invalid)).toEqual({
      ok: false,
      code: 'INVALID_ACTION_TYPE',
      message: 'Action type is not supported by the execution boundary.',
    });
  });

  it('rejects non-string candidate identifiers', () => {
    const invalid = { ...validAction, candidateIds: ['p1', 2] } as unknown as Action;
    expect(validateActionExecutionRequest(invalid)).toEqual({
      ok: false,
      code: 'INVALID_CANDIDATES',
      message: 'Action candidateIds must be an array of strings.',
    });
  });

  it('rejects a non-object payload', () => {
    const invalid = { ...validAction, payload: [] } as unknown as Action;
    expect(validateActionExecutionRequest(invalid)).toEqual({
      ok: false,
      code: 'INVALID_ACTION_PAYLOAD',
      message: 'Action payload must be a plain object.',
    });
  });
});
