import { describe, expect, it } from 'vitest';
import { createExecutionAuditSummary } from './executionAuditSummary';

describe('createExecutionAuditSummary', () => {
  it('integrates report and health metrics from the same audit records', () => {
    const records = [
      { executionId: '1', idempotencyKey: 'k1', actionType: 'shop' as const, status: 'SUCCEEDED' as const, recordedAt: 'a', durationMs: 100 },
      { executionId: '2', idempotencyKey: 'k2', actionType: 'recipe' as const, status: 'FAILED' as const, recordedAt: 'b', durationMs: 300 },
    ];

    const summary = createExecutionAuditSummary(records, 'now');

    expect(summary.report.generatedAt).toBe('now');
    expect(summary.report.total).toBe(2);
    expect(summary.report.succeeded).toBe(1);
    expect(summary.report.failed).toBe(1);
    expect(summary.report.averageDurationMs).toBe(200);
    expect(summary.health.total).toBe(2);
    expect(summary.health.successRate).toBe(0.5);
    expect(summary.health.failureRate).toBe(0.5);
    expect(summary.health.averageDurationMs).toBe(200);
  });

  it('keeps empty summaries consistent', () => {
    const summary = createExecutionAuditSummary([], 'now');
    expect(summary.report.total).toBe(0);
    expect(summary.health.total).toBe(0);
    expect(summary.health.successRate).toBe(0);
    expect(summary.health.failureRate).toBe(0);
  });
});
