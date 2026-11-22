import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 06:11 CET';
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
      expect(section).toContain('22/22 inline review threads resolved');
    }
  });

  it('records the current PR #204 exact-head success without borrowing parent CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 current exact HEAD is 18c8ea7b40a5d936c3f56f18300b396ce685a8d7');
      expect(section).toContain('Validation [44986429539] terminal SUCCESS');
      expect(section).toContain('CodeQL [44986429568] terminal SUCCESS');
      expect(section).toContain('Dependency Review [44986429575] terminal SUCCESS');
      expect(section).toContain('334 tests across 72 files');
      expect(section).toContain('21/21 checks passed');
      expect(section).toContain('Android emulator smoke test passed');
      expect(section).toContain('iOS simulator smoke test passed');
      expect(section).toContain('3 moderate severity vulnerabilities');
      expect(section).toContain('PR #204 review inventory: 2 conversation comments');
      expect(section).toContain('This checkpoint records the validated pre-write parent');
      expect(section).toContain('documentation/test child must pass its own exact-head CI');
    }
  });

  it('records other exact-head candidates and security remediation without transferring results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`');
      expect(section).toContain('44735858583');
      expect(section).toContain('44735858347');
      expect(section).toContain('44735858455');
      expect(section).toContain('539 tests');
      expect(section).toContain('27 readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`');
      expect(section).toContain('44744190838');
      expect(section).toContain('44744190840');
      expect(section).toContain('44744190839');
      expect(section).toContain('**PR #218** exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`');
      expect(section).toContain('44945232153');
      expect(section).toContain('**PR #219** exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735`');
      expect(section).toContain('zero exact-head workflow runs, zero check-runs, and zero status contexts');
      expect(section).toContain('PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`');
      expect(section).toContain('44955675733');
    }
  });

  it('records exact-head PR #204 validation and security workflow evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('Validation [44986429539]');
      expect(section).toContain('CodeQL [44986429568]');
      expect(section).toContain('Dependency Review [44986429575]');
      expect(section).toContain('450 pytest tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('No known vulnerabilities found');
      expect(section).toContain('**PR #219** exact HEAD');
      expect(section).toContain('zero exact-head workflow runs, zero check-runs, and zero status contexts');
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