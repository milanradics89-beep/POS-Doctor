import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-20 21:41 CET';
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

  it('records current exact-head results without transferring CI between PRs', () => {
    for (const section of latestSections) {
      expect(section).toContain('c1250400f5c6022483c967c8b79a42be0dc614fd');
      expect(section).toContain('44743155619');
      expect(section).toContain('44743155647');
      expect(section).toContain('44743155582');
      expect(section).toContain('fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a');
      expect(section).toContain('776432e4e75327088034fa2f5448d96d7d71f068');
      expect(section).toContain('67eafbebd5f45724f2c97430fee4bc1a6d153746');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('7dbc4110b25ab3a879f8711f005d7876b1fbb74e');
      expect(section).toContain('44794452919');
      expect(section).toContain('44794452874');
      expect(section).toContain('44794452833');
      expect(section).toContain('a006fdb882bfb6989487e3faea77db23f183839f');
      expect(section).toContain('Paginated branches: 161 (100 + 61 + 0)');
      expect(section).toContain('Open pull requests: 97');
      expect(section).toContain('Open non-PR issues: 8');
      expect(section).toContain('71 other test files passed');
      expect(section).toContain('331 passed and 1 failed');
      expect(section).toContain('450 pytest');
      expect(section).toContain('PR #204 current exact-head Validation [44810024178]');
      expect(section).toContain('2182ef09fb32f061780552df20a52aadae6770e5');
      expect(section).toContain('44810024440');
      expect(section).toContain('44810024188');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('331 passed and 1 failed');
      expect(section).toContain('PR #205');
      expect(section).toContain('9f275e853429de173975f87bf1bd3ea476e7b9ce');
      expect(section).toContain('44799071611');
      expect(section).toContain('44799071582');
      expect(section).toContain('44799071704');
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
      expect(section).toMatch(/published GitHub releases\s+0/i);
      expect(section).toContain('does not grant production or pilot acceptance');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
