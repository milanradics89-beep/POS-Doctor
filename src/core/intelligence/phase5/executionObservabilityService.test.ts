import { describe, expect, it } from 'vitest';
import type { ActionExecutionSnapshot } from './actionExecutionLifecycle';
import { ExecutionObservabilityCollector } from './executionObservabilityCollector';
import { ExecutionObservabilityService } from './executionObservabilityService';

describe('ExecutionObservabilityService', () => {
  it('records executions and exposes a dashboard', () => {
    const service = new ExecutionObservabilityService(new ExecutionObservabilityCollector());
    const snapshot: ActionExecutionSnapshot = {
      idempotencyKey: 'exec-1',
      actionType: 'shop',
      status: 'SUCCEEDED',
    };

    service.record(snapshot, { status: 'SUCCEEDED', durationMs: 120 }, '2026-09-09T08:00:00.000Z');

    expect(service.dashboard()).toEqual({
      summary: { total: 1, succeeded: 1, failed: 0, averageDurationMs: 120 },
      recent: [{
        executionId: 'exec-1',
        actionType: 'shop',
        status: 'SUCCEEDED',
        durationMs: 120,
        recordedAt: '2026-09-09T08:00:00.000Z',
      }],
    });
  });
});
