import { describe, expect, it } from 'vitest';
import { summarizeExecutionObservability } from './executionObservabilitySummary';

describe('summarizeExecutionObservability', () => {
  it('summarizes execution outcomes and average duration', () => {
    expect(summarizeExecutionObservability([
      { executionId: '1', actionType: 'shop', status: 'SUCCEEDED', durationMs: 100, recordedAt: 'a' },
      { executionId: '2', actionType: 'recipe', status: 'FAILED', durationMs: 300, recordedAt: 'b' },
      { executionId: '3', actionType: 'shop', status: 'SUCCEEDED', durationMs: 200, recordedAt: 'c' },
    ])).toEqual({
      total: 3,
      succeeded: 2,
      failed: 1,
      averageDurationMs: 200,
    });
  });

  it('returns zero average duration for an empty collection', () => {
    expect(summarizeExecutionObservability([])).toEqual({
      total: 0,
      succeeded: 0,
      failed: 0,
      averageDurationMs: 0,
    });
  });
});
