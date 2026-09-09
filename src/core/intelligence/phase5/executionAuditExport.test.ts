import { describe, expect, it } from 'vitest';
import { exportExecutionAuditCsv } from './executionAuditExport';

describe('exportExecutionAuditCsv', () => {
  it('exports audit records with a stable header', () => {
    expect(exportExecutionAuditCsv([
      {
        executionId: 'exec-1',
        idempotencyKey: 'key-1',
        actionType: 'shop',
        status: 'SUCCEEDED',
        recordedAt: '2026-09-09T08:00:00.000Z',
        durationMs: 1800,
      },
    ])).toBe([
      'executionId,idempotencyKey,actionType,status,recordedAt,durationMs',
      'exec-1,key-1,shop,SUCCEEDED,2026-09-09T08:00:00.000Z,1800',
    ].join('\n'));
  });

  it('escapes csv-special values', () => {
    expect(exportExecutionAuditCsv([{
      executionId: 'exec,1',
      idempotencyKey: 'key"1',
      actionType: 'shop',
      status: 'FAILED',
      recordedAt: '2026-09-09T08:00:00.000Z',
    }])).toContain('"exec,1","key""1"');
  });

  it('exports an empty dataset with the header only', () => {
    expect(exportExecutionAuditCsv([])).toBe(
      'executionId,idempotencyKey,actionType,status,recordedAt,durationMs',
    );
  });
});
