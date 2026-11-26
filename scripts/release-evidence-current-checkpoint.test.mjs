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
      'abe19faac6b05449bf37f6531bba9853c7bb5172',
      '45708952090', '45708952378', '45708952349', '45708952695',
    ]) expect(section).toContain(value);
    expect(section).toContain('failed audit verdict');
    expect(section).toContain('fail-on-issues: false');
    expect(section).toContain('fail-on-issues: true');
    expect(section).toContain('no human APPROVED review');
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
