import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 07:03 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

describe('current-main release evidence checkpoint', () => {
  it('keeps the same current checkpoint in all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #41 evidence to its merged exact head and exact-head workflows', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('43492153234');
      expect(section).toContain('43492153161');
      expect(section).toContain('43492153021');
      expect(section).toContain('53 conversation comments');
      expect(section).toContain('30 inline review comments');
      expect(section).toContain('22/22 inline threads resolved');
      expect(section).toContain('109 combined timeline records');
    }
  });

  it('records PR #204 failure, PR #207 merge, and PR #206 current exact-head CI separately', () => {
    for (const section of latestSections) {
      expect(section).toContain('c3fd17a1029adb26962b8cb96b06ef87b5fee2a7');
      expect(section).toContain('44828340885');
      expect(section).toContain('44828340790');
      expect(section).toContain('44828341122');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('PR #207 was CLOSED/MERGED');
      expect(section).toContain('d085930930d099888ab5ea7d7ba09c9a7bac4c7d');
      expect(section).toContain('17c4e432db0df7d97e0185d7c087db8ee2b1563e');
      expect(section).toContain('44865522900');
      expect(section).toContain('44865522924');
      expect(section).toContain('44865522887');
      expect(section).toContain('terminal SUCCESS on `17c4e432`');
      expect(section).toContain('332 unit tests');
      expect(section).toContain('Android emulator smoke');
      expect(section).toContain('runtime dependency audit');
      expect(section).toContain('one automated Dependency Review conversation comment');
    }
  });

  it('records current paginated repository and issue inventory', () => {
    for (const section of latestSections) {
      expect(section).toContain('163 branches');
      expect(section).toContain('98 pull requests');
      expect(section).toContain('eight issues');
      expect(section).toContain('89 comments');
      expect(section).toContain('99 comments');
      expect(section).toMatch(/Published GitHub releases:\s*\*\*0\*\*/);
    }
  });

  it('keeps the row-level 25-point register at 2 Done / 15 In Progress / 8 Blocked', () => {
    const backlog = documents[0];
    const tableStart = backlog.indexOf('| # | Workstream | Status | Current evidence / remaining acceptance |');
    expect(tableStart).toBeGreaterThanOrEqual(0);
    const rows = backlog.slice(tableStart).split('\n')
      .filter((line) => /^\|\s*\d+\s*\|/.test(line))
      .slice(0, 25);
    expect(rows).toHaveLength(25);
    const counts = { Done: 0, 'In Progress': 0, Blocked: 0 };
    for (const row of rows) {
      const status = row.match(/\*\*(Done|In Progress|Blocked)\*\*/)?.[1];
      expect(status).toBeTruthy();
      counts[status]++;
    }
    expect(counts).toEqual({ Done: 2, 'In Progress': 15, Blocked: 8 });
  });

  it('does not promote external acceptance or unavailable security inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
