import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Latest live release-watch checkpoint — 2026-11-25 03:19 CET';
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

  it('records the merged Expo 57.0.34 baseline and current candidate heads', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #305 is CLOSED/MERGED');
      expect(section).toContain('b0af4e7d43acdb0ccaa809899f43d96d47712748');
      expect(section).toContain('252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc');
      expect(section).toContain('45521231491');
      expect(section).toContain('45521231436');
      expect(section).toContain('45521231462');
      expect(section).toContain('45524790576');
      expect(section).toContain('45524790560');
      expect(section).toContain('45524790755');
      expect(section).toContain('Expo ~57.0.34');
      expect(section).toContain('PR #288 is OPEN and non-draft');
      expect(section).toContain('23a235e0fa35555507190902341143f592fad5aa');
      expect(section).toContain('45525231729');
      expect(section).toContain('45525231505');
      expect(section).toContain('45525231555');
      expect(section).toContain('11 commits, 13 changed files');
      expect(section).toContain('three APPROVED, two DISMISSED');
      expect(section).toContain('PR #249 is OPEN/DRAFT');
      expect(section).toContain('e89ca4d78082ef8df447388223a62fc8ae7ee95d');
      expect(section).toContain('Validation [45461939876]');
      expect(section).toContain('Expo Doctor failed 20/21');
      expect(section).toContain('superseded HEAD b3533ca');
    }
  });

  it('records the current documentation HEAD and exact-head workflow conclusions', () => {
    for (const section of latestSections) {
      expect(section).toContain('Before this checkpoint commit, its branch was based on main 5389190fe230122f19c3406bfcb125c98ced5966 at exact HEAD bfd018b95b9edea5b1fd762bb26794a7d1656618');
      expect(section).toMatch(/Validation \[45509270446\]\([^)]*\) is terminal FAILURE/);
      expect(section).toMatch(/CodeQL \[45509270613\]\([^)]*\) and Dependency Review \[45509270488\]\([^)]*\) are terminal SUCCESS/);
      expect(section).toContain('343 passed / 1 failed across 74 files');
      expect(section).toContain('scripts/release-evidence-checkpoint.test.mjs:63');
      expect(section).toContain('264 branches');
    }
  });

  it('records the pre-refresh documentation-branch failure without inheriting its checks', () => {
    for (const section of latestSections) {
      expect(section).toContain('Before the prior checkpoint refresh its branch HEAD was 00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f');
      expect(section).toContain('Validation [45017190851]');
      expect(section).toContain('CodeQL [45017190867]');
      expect(section).toContain('Dependency Review [45017190810]');
      expect(section).toContain('332 passed / 2 failed across 72 files');
      expect(section).toContain("This is historical evidence, not current-head CI.");
    }
  });

  it('keeps the candidate register at exactly 25 rows and 3 / 14 / 8', () => {
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
    expect(counts).toEqual({ Done: 3, 'In Progress': 14, Blocked: 8 });
    expect(rows.find((row) => row.startsWith('| 3 |'))).toContain('**Done**');
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