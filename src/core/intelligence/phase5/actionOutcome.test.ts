import { describe, expect, it } from 'vitest';
import { toActionOutcome } from './actionOutcome';

describe('toActionOutcome', () => {
  it('maps a successful execution to a stable outcome', () => {
    expect(toActionOutcome({
      ok: true,
      actionType: 'shop',
      output: { productIds: ['p1'] },
    })).toEqual({
      actionType: 'shop',
      status: 'SUCCEEDED',
      output: { productIds: ['p1'] },
    });
  });

  it('maps a failed execution without exposing an output field', () => {
    expect(toActionOutcome({
      ok: false,
      actionType: 'shop',
      code: 'HANDLER_FAILED',
      message: 'Provider unavailable',
    })).toEqual({
      actionType: 'shop',
      status: 'FAILED',
      error: {
        code: 'HANDLER_FAILED',
        message: 'Provider unavailable',
      },
    });
  });
});
