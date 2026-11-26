import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const paths = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
];
const documents = paths.map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));
const marker = documents[0].match(/^## Latest live release-watch checkpoint — [^\n]+$/m)?.[0] ?? '';
const sections = documents.map((document) => {
  if (!marker || !document.startsWith(marker)) return '';
  const separator = document.indexOf('\n\n---\n\n', marker.length);
  return document.slice(0, separator < 0 ? document.length : separator);
});

describe('current release evidence checkpoint', () => {
  it('keeps one identical live checkpoint at the top of all three release records', () => {
    expect(marker).toBeTruthy();
    expect(sections.every(Boolean)).toBe(true);
    expect(new Set(sections).size).toBe(1);
  });

  it('binds PR #41 to its merged exact HEAD and exact-head CI', () => {
    const section = sections[0];
    expect(section).toContain('is **CLOSED/MERGED**');
    expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
    expect(section).toContain('f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1');
    for (const run of ['43492153234', '43492153161', '43492153021']) {
      expect(section).toContain(run);
    }
    expect(section).toContain('53 conversation comments');
    expect(section).toContain('30 inline review comments');
    expect(section).toContain('26 formal review submissions');
    expect(section).toContain('All 22/22 inline threads are resolved');
    expect(section).toContain('tarlaci1984-sketch');
    expect(section).toContain('43098210284');
    expect(section).toContain('43098210473');
    expect(section).toContain('43098210255');
  });

  it('records current candidate evidence without transferring results between SHAs', () => {
    const section = sections[0];
    for (const value of [
      '0a907e820b396111a15f42c48ce7ce4b4053be13',
      '45723475105', '45723475050', '45723475048', '45723475166',
      '809b97744abbb5075ec896d02e79b31ebd23706c',
      '45717661072', '45717661086', '45717661270', '45717661069',
      'f0c7d4561f449ce640bcaa813e84d0bd0a5b275e',
      '45748693636', '45748693477', '45748693458', '45748693481',
      '707b4bbd7163aa36e73ca8fb2210cca2cb1e7d81',
      '45743545603', '45743545596', '45743545518', '45743545623',
      '5d026cb62e0626e59e3fdf686fca0e7f6981d780',
      '45743617132', '45743617056', '45743617033', '45743617016',
      '790dcceedeb554638325f8127c68fe2a347c6e20',
      '45759191651', '45759191640', '45759191636', '45759191631',
      '768e1d018bba7d5c1cdaaf2310a98fd086014473',
      '45764030850', '45764030788', '45764030857', '45764030833',
    ]) expect(section).toContain(value);
    expect(section).toContain('Fallow on this exact HEAD is not clean:');
    expect(section).toContain('FALLOW_GATES_FAILED: audit-verdict');
    expect(section).toContain('fail-on-issues: false');
    expect(section).toContain('fail-on-issues: true');
    expect(section).toContain('no human APPROVED review');
    expect(section).toContain('395 passed / 1 failed');
    expect(section).toContain('Validation [45759191651]');
    expect(section).toContain('all four exact-head workflows are terminal SUCCESS');
    expect(section).toContain('396 passed across 81 test files');
  });

  it('contains exactly 25 rows with the canonical 3 / 15 / 7 distribution', () => {
    const section = sections[0];
    const start = section.indexOf('| # | Workstream | Status | Current evidence / remaining acceptance |');
    expect(start).toBeGreaterThanOrEqual(0);
    const rows = section.slice(start).split('\n').filter((line) => /^\|\s*\d+\s*\|/.test(line));
    expect(rows).toHaveLength(25);
    const counts = { Done: 0, 'In Progress': 0, Blocked: 0 };
    for (const row of rows) {
      const status = row.match(/\*\*(Done|In Progress|Blocked)\*\*/)?.[1];
      expect(status).toBeTruthy();
      counts[status]++;
    }
    expect(counts).toEqual({ Done: 3, 'In Progress': 15, Blocked: 7 });
  });

  it('records the stacked Home refactor and validated documentation candidate on their own exact heads', () => {
    const section = sections[0];
    expect(section).toContain('Stacked child PR #339 addresses the changed Home path');
    expect(section).toContain('PR #339');
    expect(section).toContain('PR #340');
    expect(section).toContain('FALLOW_GATES_PASSED: audit-verdict');
    expect(section).toContain('fail-on-issues: true');
    expect(section).toContain('semgrep scan --config p/ci --error --metrics=off /src');
    expect(section).toContain('new child of validated parent');
  });

  it('keeps production blockers and unavailable alert inventories explicit', () => {
    const section = sections[0];
    expect(section).toContain('0 published releases');
    expect(section).toContain('UNVERIFIED, NOT EMPTY');
    expect(section).toContain('Issue [#47]');
    expect(section).toContain('Issue [#64]');
    for (const item of ['#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
      expect(section).toContain(item);
    }
    expect(section).toContain('Release decision: NOT READY');
    expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
  });
});
