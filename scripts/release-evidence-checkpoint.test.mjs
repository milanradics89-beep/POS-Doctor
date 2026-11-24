import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Latest live release-watch checkpoint — 2026-11-25 00:16 CET';
const latestSections = documents.map((document) => {
  if (!document.startsWith(marker)) return '';
  const end = document.indexOf('\n\n---\n\n', marker.length);
  return document.slice(0, end < 0 ? document.length : end);
});

describe('current-main release evidence checkpoint', () => {
  it('selects the latest checkpoint in all three release records', () => {
    expect(documents.every((document) => document.startsWith(marker))).toBe(true);
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
      expect(section).toContain('26 formal submissions');
      expect(section).toContain('22/22 inline threads resolved');
      expect(section).toContain('tarlaci1984-sketch');
      expect(section).toContain('b46c5b8082ecbebd263a86cd53b1321a86e570d1');
    }
  });

  it('separates the failing Expo 57.0.33 candidate from the green 57.0.34 candidate', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #249 is OPEN/DRAFT');
      expect(section).toContain('e89ca4d78082ef8df447388223a62fc8ae7ee95d');
      expect(section).toContain('Validation [45461939876]');
      expect(section).toContain('Expo Doctor failed 20/21');
      expect(section).toContain('expects Expo `~57.0.34`');
      expect(section).toContain('resolve Expo `57.0.33`');
      expect(section).toContain('PR #288 is OPEN and non-draft');
      expect(section).toContain('db37acaa156a39be55309784026ae5710a9ecef5');
      expect(section).toContain('45472083095');
      expect(section).toContain('45472083619');
      expect(section).toContain('45472083171');
      expect(section).toContain('347 tests passed across 73 files');
      expect(section).toContain('Expo Doctor passed 21/21');
      expect(section).toContain('Android emulator smoke passed');
      expect(section).toContain('iOS Release build and simulator launch smoke passed');
      expect(section).toContain('reported 0 vulnerabilities');
    }
  });

  it('records the current documentation HEAD and exact-head workflow conclusions', () => {
    for (const section of latestSections) {
      expect(section).toContain('Before this checkpoint commit, PR #204 branch HEAD was `299e6f1c2ee995c03ca5d9148b5b45bfafaeeaac`');
      expect(section).toMatch(/Validation \[45501294294\]\([^)]*\) is terminal FAILURE/);
      expect(section).toMatch(/CodeQL \[45501294310\]\([^)]*\) and Dependency Review \[45501294338\]\([^)]*\) are terminal SUCCESS/);
      expect(section).toContain('343 passed / 1 failed across 74 files');
      expect(section).toContain('scripts/release-evidence-checkpoint.test.mjs:64');
      expect(section).toContain('261 branches');
    }
  });

  it('records the pre-refresh documentation-branch failure without inheriting its checks', () => {
    for (const section of latestSections) {
      expect(section).toContain('Before this refresh its branch HEAD was `00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f`');
      expect(section).toContain('Validation [45017190851]');
      expect(section).toContain('CodeQL [45017190867]');
      expect(section).toContain('Dependency Review [45017190810]');
      expect(section).toContain('332 passed / 2 failed across 72 files');
      expect(section).toContain("the new commit's own exact-head CI must be evaluated separately");
    }
  });

  it('keeps the candidate register at exactly 25 rows and 2 / 15 / 8', () => {
    const section = latestSections[0];
    const tableStart = section.indexOf('| # | Workstream | Status | Evidence / next gate |');
    expect(tableStart).toBeGreaterThanOrEqual(0);
    const rows = section.slice(tableStart).split('\n')
      .filter((line) => /^\|\s*\d+\s*\|/.test(line));
    expect(rows).toHaveLength(25);
    const counts = { Done: 0, 'In Progress': 0, Blocked: 0 };
    for (const row of rows) {
      const status = row.match(/\*\*(Done|In Progress|Blocked)\*\*/)?.[1];
      expect(status).toBeTruthy();
      counts[status]++;
    }
    expect(counts).toEqual({ Done: 2, 'In Progress': 15, Blocked: 8 });
    expect(rows.find((row) => row.startsWith('| 3 |'))).toContain('**In Progress**');
  });

  it('keeps external acceptance blocked and alert inventories unverified', () => {
    for (const section of latestSections) {
      expect(section).toContain('UNVERIFIED, NOT EMPTY');
      expect(section).toContain('0 published releases');
      expect(section).toContain('Issue [#47]');
      expect(section).toContain('CLOSED with 11 comments');
      expect(section).toContain('Issue [#64]');
      expect(section).toContain('OPEN with 139 comments');
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
