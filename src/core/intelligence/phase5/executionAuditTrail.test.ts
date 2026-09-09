import { describe, expect, it } from 'vitest';
import { buildExecutionAuditTrail } from './executionAuditTrail';

describe('buildExecutionAuditTrail', () => {
  it('joins execution history with matching observability metrics', () => {
    const history = [
      {
        executionId: 'exec-1',
        idempotencyKey: 'key-1',
        actionType: 'shop' as const,
        status: 'SUCCEEDED' as const,
        recordedAt: '2026-09-09T08:00:00.000Z',
      },
      {
        executionId: 'exec-2',
        idempotencyKey: 'key-2',
        actionType: 'recipe' as const,
        status: 'FAILED' as const,
        recordedAt: '2026-09-09T08:01:00.000Z',
      },
    ];

    const observability = [
      {
        executionId: 'exec-1',
        actionType: 'shop',
        status: 'SUCCEEDED' as const,
        durationMs: 1250,
        recordedAt: '2026-09-09T08:00:01.250Z',
      },
    ];

    expect(buildExecutionAuditTrail(history, observability)).toEqual([
      { ...history[0], durationMs: 1250 },
      history[1],
    ]);
  });

  it('does not mutate source collections', () => {
    const history = [{
      executionId: 'exec-1',
      idempotencyKey: 'key-1',
      actionType: 'shop' as const,
      status: 'SUCCEEDED' as const,
      recordedAt: '2026-09-09T08:00:00.000Z',
    }];

    const result = buildExecutionAuditTrail(history, []);
    result[0].idempotencyKey = 'changed';

    expect(history[0].idempotencyKey).toBe('key-1');
  });
});
