import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 10:11 CET';
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
      expect(section).toContain('Three historical runs remain QUEUED with zero jobs');
    }
  });

  it('records PR #204 and PR #206 failures on their own exact heads', () => {
    for (const section of latestSections) {
      expect(section).toContain('c3fd17a1029adb26962b8cb96b06ef87b5fee2a7');
      expect(section).toContain('44828340885');
      expect(section).toContain('44828340790');
      expect(section).toContain('44828341122');
      expect(section).toContain('PR #206');
      expect(section).toContain('108c251f65987f88053c89a3337187164d08c8d4');
      expect(section).toContain('44874048568');
      expect(section).toContain('44874048725');
      expect(section).toContain('44874048701');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('332 passing tests and one failing checkpoint assertion');
    }
  });

  it('keeps the alternate correction branches and their exact-head CI separate', () => {
    for (const section of latestSections) {
      expect(section).toContain('8603fc3be80efcfb0c2a27efc1f13b37af1020b8');
      expect(section).toContain('44879889461');
      expect(section).toContain('44879889464');
      expect(section).toContain('44879889445');
      expect(section).toContain('50a41b13b2cb1f76040c8d16fdbae9e1135a2656');
      expect(section).toContain('2b767c68f7e81a054f8cd12b7ad38dd17f3288a7');
      expect(section).toContain('44883482260');
      expect(section).toContain('44883482245');
      expect(section).toContain('44883482182');
      expect(section).toContain('does not update the three release documents');
    }
  });

  it('records the current paginated repository, issue, release, and security evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('169 branches');
      expect(section).toContain('103 open pull requests');
      expect(section).toContain('eight open non-PR issues');
      expect(section).toContain('89 comments');
      expect(section).toContain('102 comments');
      expect(section).toContain('zero published releases');
      expect(section).toContain('unverified, not empty');
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
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
