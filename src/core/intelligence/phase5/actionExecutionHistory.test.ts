import { describe, expect, it } from 'vitest';
import { InMemoryActionExecutionHistory } from './actionExecutionHistory';

describe('InMemoryActionExecutionHistory', () => {
  it('appends entries and returns copies', () => {
    const history = new InMemoryActionExecutionHistory();
    const entry = {
      executionId: 'exec-1',
      idempotencyKey: 'request-1',
      actionType: 'shop' as const,
      status: 'SUCCEEDED' as const,
      recordedAt: '2026-09-09T08:00:00.000Z',
    };

    history.append(entry);
    const entries = history.list();
    entries[0].executionId = 'mutated';

    expect(history.list()).toEqual([entry]);
  });

  it('filters entries by normalized idempotency key', () => {
    const history = new InMemoryActionExecutionHistory();
    history.append({
      executionId: 'exec-1', idempotencyKey: 'request-1', actionType: 'shop', status: 'EXECUTING', recordedAt: '2026-09-09T08:00:00.000Z',
    });
    history.append({
      executionId: 'exec-2', idempotencyKey: 'request-2', actionType: 'shop', status: 'SUCCEEDED', recordedAt: '2026-09-09T08:00:01.000Z',
    });
    history.append({
      executionId: 'exec-3', idempotencyKey: 'request-1', actionType: 'shop', status: 'SUCCEEDED', recordedAt: '2026-09-09T08:00:02.000Z',
    });

    expect(history.findByIdempotencyKey(' request-1 ')).toHaveLength(2);
    expect(history.findByIdempotencyKey('request-2')[0].executionId).toBe('exec-2');
  });
});
