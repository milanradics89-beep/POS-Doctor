import { describe, expect, it } from 'vitest';
import { createExecutionObservability } from './executionObservability';

describe('createExecutionObservability', () => {
  it('creates a stable observability record', () => {
    expect(createExecutionObservability({
      executionId: ' exec-1 ',
      actionType: 'shop',
      metrics: { status: 'SUCCEEDED', durationMs: 1800 },
      recordedAt: '2026-09-09T08:00:00.000Z',
    })).toEqual({
      executionId: 'exec-1',
      actionType: 'shop',
      status: 'SUCCEEDED',
      durationMs: 1800,
      recordedAt: '2026-09-09T08:00:00.000Z',
    });
  });

  it('supports failed executions', () => {
    expect(createExecutionObservability({
      executionId: 'exec-2',
      actionType: 'recipe',
      metrics: { status: 'FAILED', durationMs: 250 },
    }).status).toBe('FAILED');
  });

  it('rejects a blank execution id', () => {
    expect(() => createExecutionObservability({
      executionId: ' ',
      actionType: 'shop',
      metrics: { status: 'SUCCEEDED', durationMs: 1 },
    })).toThrow('executionId is required.');
  });

  it('rejects a blank action type', () => {
    expect(() => createExecutionObservability({
      executionId: 'exec-3',
      actionType: ' ',
      metrics: { status: 'SUCCEEDED', durationMs: 1 },
    })).toThrow('actionType is required.');
  });
});
