import { describe, expect, it } from 'vitest';
import { createExecutionObservabilityDashboard } from './executionObservabilityDashboard';

describe('createExecutionObservabilityDashboard', () => {
  const records = [
    { executionId: '1', actionType: 'shop', status: 'SUCCEEDED' as const, durationMs: 100, recordedAt: 'a' },
    { executionId: '2', actionType: 'recipe', status: 'FAILED' as const, durationMs: 300, recordedAt: 'b' },
    { executionId: '3', actionType: 'shop', status: 'SUCCEEDED' as const, durationMs: 200, recordedAt: 'c' },
  ];

  it('combines summary with most recent executions', () => {
    expect(createExecutionObservabilityDashboard(records, 2)).toEqual({
      summary: { total: 3, succeeded: 2, failed: 1, averageDurationMs: 200 },
      recent: [records[2], records[1]],
    });
  });

  it('supports an empty recent window', () => {
    expect(createExecutionObservabilityDashboard(records, 0).recent).toEqual([]);
  });

  it('rejects invalid limits', () => {
    expect(() => createExecutionObservabilityDashboard(records, -1)).toThrow(
      'recentLimit must be a non-negative integer.',
    );
    expect(() => createExecutionObservabilityDashboard(records, 1.5)).toThrow(
      'recentLimit must be a non-negative integer.',
    );
  });
});
