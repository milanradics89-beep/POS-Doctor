import type { ExecutionAuditRecord } from './executionAuditTrail';

export function exportExecutionAuditCsv(records: readonly ExecutionAuditRecord[]): string {
  const header = ['executionId', 'idempotencyKey', 'actionType', 'status', 'recordedAt', 'durationMs'];
  const escape = (value: unknown): string => {
    const text = value === undefined ? '' : String(value);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const rows = records.map((record) => [
    record.executionId,
    record.idempotencyKey,
    record.actionType,
    record.status,
    record.recordedAt,
    record.durationMs,
  ].map(escape).join(','));

  return [header.join(','), ...rows].join('\n');
}
