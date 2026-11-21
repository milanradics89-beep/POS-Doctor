import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 02:04 CET';
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
      expect(section).toContain('22/22 inline threads resolved');
    }
  });

  it('records exact-head remediation and current PR #204 CI without transferring parent results', () => {
    for (const section of latestSections) {
      expect(section).toContain('fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a');
      expect(section).toContain('776432e4e75327088034fa2f5448d96d7d71f068');
      expect(section).toContain('67eafbebd5f45724f2c97430fee4bc1a6d153746');
      expect(section).toContain('a006fdb882bfb6989487e3faea77db23f183839f');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`');
      expect(section).toContain('PR #204 pre-checkpoint exact HEAD was `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`');
      expect(section).toContain('44828340885');
      expect(section).toContain('44828340790');
      expect(section).toContain('44828341122');
      expect(section).toContain('331 tests passed, one failed');
      expect(section).toContain('71 other test files passed');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('PR #204 review inventory: 2 conversation comments, 0 inline review comments, 0 formal reviews');
      expect(section).toContain('PR #206 pre-checkpoint HEAD was `42879b4d6e6b9f1b8646aa6bb8b1a71bbfd61d5e`');
      expect(section).toContain('44831372949');
      expect(section).toContain('44831372936');
      expect(section).toContain('44831372878');
      expect(section).toContain('162** (100 + 62). Open pull requests: **98**. Open non-PR issues: **7');
      expect(section).toContain('Issue [#64]');
      expect(section).toContain('85 comments');
      expect(section).toContain('Issue [#155]');
      expect(section).toContain('94 comments');
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
      expect(section).toMatch(/Published GitHub releases:\s*0/i);
      expect(section).toContain('does not grant production or pilot acceptance');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
