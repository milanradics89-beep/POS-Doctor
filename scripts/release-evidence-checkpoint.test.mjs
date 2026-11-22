import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 12:20 CET';
const latestSections = documents.map((document) => {
  if (!document.startsWith(marker)) return '';
  const end = document.indexOf('\n\n---\n\n', marker.length);
  return document.slice(0, end < 0 ? document.length : end);
});

describe('current-main release evidence checkpoint', () => {
  it('selects the top checkpoint rather than a historical section', () => {
    expect(documents.every((document) => document.startsWith(marker))).toBe(true);
  });

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
      expect(section).toContain('26 formal review submissions');
      expect(section).toContain('22/22 inline review threads resolved');
      expect(section).toContain('tarlaci1984-sketch');
    }
  });

  it('records PR #204 current exact-head failure and separate security workflow results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 is OPEN/DRAFT against `main`');
      expect(section).toContain('current exact HEAD is `ddd34e688343189b67d9fca463590287479188d1`');
      expect(section).toContain('Validation [45011953827](');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('CodeQL [45011953752](');
      expect(section).toContain('Dependency Review [45011953751](');
      expect(section).toContain('333 tests passed / 1 failed across 72 files');
      expect(section).toContain('450 pytest tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('iOS job [137182795014](');
      expect(section).toContain('passed native Release build and simulator install/launch smoke');
      expect(section).toContain('Expo Doctor, Android export, Android Release build, Android emulator smoke, and frontend runtime audit were skipped');
      expect(section).toContain('the frontend runtime audit were skipped after the frontend unit-test failure');
      expect(section).toContain('PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals');
      expect(section).toContain('assertion expects literal `Issue #47 is CLOSED`');
      expect(section).toContain('Parent results are historical');
    }
  });

  it('keeps other candidate CI evidence bound to their exact heads', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #200 exact HEAD');
      expect(section).toContain('Backend evidence is 539 tests');
      expect(section).toContain('44735858583');
      expect(section).toContain('PR #201 exact HEAD');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('PR #218 exact HEAD');
      expect(section).toContain('44945232153');
      expect(section).toContain('PR #219 exact HEAD');
      expect(section).toContain('0 exact-head workflow runs, 0 check-runs and 0 status contexts');
      expect(section).toContain('PR #220 exact HEAD');
      expect(section).toContain('44955675733');
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
      expect(section).toContain('0 published releases');
      expect(section).toContain('Issue [#47](');
      expect(section).toContain('is CLOSED with 11 comments');
      expect(section).toContain('Issue [#64](');
      // The 97-comment count is the checkpoint's capture-time metadata, not a live counter.
      expect(section).toContain('is OPEN with 97 comments');
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
