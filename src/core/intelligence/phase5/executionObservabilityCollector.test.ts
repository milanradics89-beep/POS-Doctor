import { describe, expect, it } from 'vitest';
import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import { ExecutionObservabilityCollector } from './executionObservabilityCollector';

describe('ExecutionObservabilityCollector', () => {
  const snapshot: ActionExecutionSnapshot = {
    idempotencyKey: 'exec-1',
    actionType: 'shop',
    status: 'SUCCEEDED',
  };

  it('records and retrieves observability data', () => {
    const collector = new ExecutionObservabilityCollector();
    const metrics = { status: 'SUCCEEDED' as const, durationMs: 1800 };

    const record = collector.record(snapshot, metrics, '2026-09-09T08:00:00.000Z');

    expect(record).toEqual({
      executionId: 'exec-1',
      actionType: 'shop',
      status: 'SUCCEEDED',
      durationMs: 1800,
      recordedAt: '2026-09-09T08:00:00.000Z',
    });
    expect(collector.getByExecutionId(' exec-1 ')).toEqual(record);
    expect(collector.getAll()).toEqual([record]);
  });

  it('does not expose mutable internal records', () => {
    const collector = new ExecutionObservabilityCollector();
    const record = collector.record(snapshot, { status: 'SUCCEEDED', durationMs: 10 });
    record.durationMs = 999;

    expect(collector.getByExecutionId('exec-1')?.durationMs).toBe(10);
  });

  it('returns undefined for an unknown execution', () => {
    const collector = new ExecutionObservabilityCollector();
    expect(collector.getByExecutionId('missing')).toBeUndefined();
  });
});
