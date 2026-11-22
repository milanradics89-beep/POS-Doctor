import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 08:22 CET';
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

  it('records the current PR #204 exact-head success and security workflow results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 is OPEN/DRAFT against `main`');
      expect(section).toContain('current exact HEAD is `9311dae635423369badf9b4fcfdcc14aa26a8b96`');
      expect(section).toContain('Validation [44993531919](');
      expect(section).toContain('terminal SUCCESS');
      expect(section).toContain('CodeQL [44993531899](');
      expect(section).toContain('Dependency Review [44993531931](');
      expect(section).toContain('334 tests across 72 files');
      expect(section).toContain('450 pytest tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('iOS job');
      expect(section).toContain('Parent results are historical');
      expect(section).toContain('21/21 checks passed');
      expect(section).toContain('Android emulator smoke test passed');
      expect(section).toContain('iOS simulator smoke test passed');
      expect(section).toContain('3 moderate severity vulnerabilities');
      expect(section).toContain('PR #204 review inventory: 2 conversation comments');
    }
  });

  it('keeps other candidate CI evidence bound to each candidate exact head', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #200 exact HEAD');
      expect(section).toContain('Backend evidence is 539 tests');
      expect(section).toContain('44735858583');
      expect(section).toContain('PR #201 exact HEAD');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('PR #203 exact HEAD');
      expect(section).toContain('44744190838');
      expect(section).toContain('PR #218 exact HEAD');
      expect(section).toContain('44945232153');
      expect(section).toContain('PR #219 exact HEAD');
      expect(section).toContain('0 exact-head workflow runs, 0 check-runs and 0 status contexts');
      expect(section).toContain('PR #220 exact HEAD');
      expect(section).toContain('44955675733');
      expect(section).toContain('PR #221 exact HEAD');
      expect(section).toContain('PR #222 exact HEAD');
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
      expect(section).toContain('Issue #47 is CLOSED');
      expect(section).toContain('Issue #64 is OPEN');
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});