import { describe, expect, it } from 'vitest';
import { toActionPresentationModel } from './actionPresentationModel';

const success = {
  actionType: 'shop' as const,
  status: 'SUCCEEDED' as const,
  output: { productIds: ['p1', 'p2'] },
};

const failure = {
  actionType: 'shop' as const,
  status: 'FAILED' as const,
  error: { code: 'HANDLER_FAILED' as const, message: 'Provider unavailable.' },
};

describe('toActionPresentationModel', () => {
  it('maps success to a stable presentation model', () => {
    expect(toActionPresentationModel(success)).toEqual({
      status: 'SUCCEEDED',
      title: 'Action completed',
      message: 'The requested action completed successfully.',
      output: success.output,
    });
  });

  it('maps failure to a stable presentation model', () => {
    expect(toActionPresentationModel(failure)).toEqual({
      status: 'FAILED',
      title: 'Action failed',
      message: 'Provider unavailable.',
      errorCode: 'HANDLER_FAILED',
    });
  });

  it('uses a fallback message when failure details are absent', () => {
    expect(toActionPresentationModel({
      actionType: 'shop',
      status: 'FAILED',
    })).toMatchObject({
      status: 'FAILED',
      title: 'Action failed',
      message: 'The requested action could not be completed.',
    });
  });
});
