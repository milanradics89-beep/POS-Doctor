import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = documents[0].match(/^## Latest live release-watch checkpoint — [^\n]+$/m)?.[0] ?? '';
const latestSections = documents.map((document) => {
  if (!marker || !document.startsWith(marker)) return '';
  const end = document.indexOf('\n\n---\n\n', marker.length);
  return document.slice(0, end < 0 ? document.length : end);
});

describe('current-main release evidence checkpoint', () => {
  it('selects one identical latest checkpoint in all three release records', () => {
    expect(marker).toBeTruthy();
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

  it('records the merged Expo 57.0.34 baseline and post-merge main validation', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #305 — Expo SDK 57.0.34 alignment merged');
      expect(section).toContain('b0af4e7d43acdb0ccaa809899f43d96d47712748');
      expect(section).toContain('252cb529e9fdb0cf7ef05bbb25a29ec94fca1cfc');
      expect(section).toContain('45521231491');
      expect(section).toContain('45521231436');
      expect(section).toContain('45521231462');
      expect(section).toContain('45524790576');
      expect(section).toContain('45524790560');
      expect(section).toContain('45524790755');
      expect(section).toContain('Expo 57.0.34 is merged and post-merge validated');
    }
  });

  it('records current exact-head states for PRs #288 and #249', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #288 is OPEN and non-draft');
      expect(section).toContain('77e964b91aca17bf42fddf6bf69639f24733b86b');
      expect(section).toContain('45532871751');
      expect(section).toContain('45532871933');
      expect(section).toContain('45532871944');
      expect(section).toContain('three APPROVED and two DISMISSED');
      expect(section).toContain('PR #249 is OPEN/DRAFT');
      expect(section).toContain('e89ca4d78082ef8df447388223a62fc8ae7ee95d');
      expect(section).toContain('45461939876');
      expect(section).toContain('Expo Doctor (20/21)');
      expect(section).toContain('superseded HEAD b3533ca');
    }
  });

  it('records PR #204 current-head failure separately from its validated parent', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 is OPEN/DRAFT');
      expect(section).toContain('46955eb3b27878d02e2835a4a6fe4ce54d85db37');
      expect(section).toMatch(/Validation \[45540368306\]\([^)]*\) is terminal FAILURE/);
      expect(section).toMatch(/CodeQL \[45540368268\]\([^)]*\) and Dependency Review \[45540368335\]\([^)]*\) are terminal SUCCESS/);
      expect(section).toContain('337 passed / 7 failed across 74 files');
      expect(section).toContain('03:19 CET checkpoint marker');
      expect(section).toContain('04:25 CET checkpoint');
      expect(section).toContain('fe8b0d0e3e412dfd81005a828ccfc77a2506132e');
      expect(section).toContain('45532839638');
      expect(section).toContain('45532839715');
      expect(section).toContain('45532839650');
    }
  });

  it('records exact-head validation for the unsigned-APK and security-workflow candidates', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #319 is OPEN/DRAFT');
      expect(section).toContain('6a937425ea4d3763ab4555e8bf09f61c5a1797c2');
      expect(section).toContain('45545777077');
      expect(section).toContain('45545777202');
      expect(section).toContain('45545776953');
      expect(section).toContain('PR #320 is OPEN/DRAFT');
      expect(section).toContain('e2bac14104ab112108b4a91f138c3eb3de7b7ca2');
      expect(section).toContain('45546055534');
      expect(section).toContain('45546055447');
      expect(section).toContain('45546055514');
      expect(section).toContain('45546055455');
      expect(section).toContain('Semgrep Community');
      expect(section).toContain('Gitleaks');
      expect(section).toContain('Fallow');
      expect(section).toContain('zizmor');
    }
  });

  it('keeps the canonical candidate register at exactly 25 rows and 3 / 14 / 8', () => {
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
      expect(section).toContain('Issue #47 is CLOSED with 11 comments');
      expect(section).toContain('Issue #64 remains OPEN with 139 comments');
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
