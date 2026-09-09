import { describe, expect, it } from 'vitest';
import { createActionExecutionMetrics } from './actionExecutionMetrics';

describe('createActionExecutionMetrics', () => {
  it('calculates execution duration', () => {
    expect(createActionExecutionMetrics('SUCCEEDED', 1000, 2750)).toEqual({
      status: 'SUCCEEDED',
      durationMs: 1750,
    });
  });

  it('preserves failed status', () => {
    expect(createActionExecutionMetrics('FAILED', 500, 900)).toEqual({
      status: 'FAILED',
      durationMs: 400,
    });
  });

  it('rejects non-finite timestamps', () => {
    expect(() => createActionExecutionMetrics('SUCCEEDED', Number.NaN, 100)).toThrow(
      'Execution timestamps must be finite numbers.',
    );
  });

  it('rejects reversed timestamps', () => {
    expect(() => createActionExecutionMetrics('SUCCEEDED', 100, 99)).toThrow(
      'Execution completion cannot precede execution start.',
    );
  });
});
