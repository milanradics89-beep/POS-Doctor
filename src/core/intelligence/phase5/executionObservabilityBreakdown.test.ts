import { describe, expect, it } from 'vitest';
import { breakdownExecutionObservability } from './executionObservabilityBreakdown';

describe('breakdownExecutionObservability', () => {
  it('groups executions by action type', () => {
    expect(breakdownExecutionObservability([
      { executionId: '1', actionType: 'shop', status: 'SUCCEEDED', durationMs: 100, recordedAt: 'a' },
      { executionId: '2', actionType: 'recipe', status: 'FAILED', durationMs: 300, recordedAt: 'b' },
      { executionId: '3', actionType: 'shop', status: 'SUCCEEDED', durationMs: 200, recordedAt: 'c' },
      { executionId: '4', actionType: 'recipe', status: 'SUCCEEDED', durationMs: 100, recordedAt: 'd' },
    ])).toEqual([
      { actionType: 'shop', total: 2, succeeded: 2, failed: 0, averageDurationMs: 150 },
      { actionType: 'recipe', total: 2, succeeded: 1, failed: 1, averageDurationMs: 200 },
    ]);
  });

  it('returns an empty breakdown for no executions', () => {
    expect(breakdownExecutionObservability([])).toEqual([]);
  });

  it('preserves first-seen action ordering', () => {
    const result = breakdownExecutionObservability([
      { executionId: '1', actionType: 'recipe', status: 'SUCCEEDED', durationMs: 50, recordedAt: 'a' },
      { executionId: '2', actionType: 'shop', status: 'FAILED', durationMs: 80, recordedAt: 'b' },
    ]);

    expect(result.map((item) => item.actionType)).toEqual(['recipe', 'shop']);
  });
});
