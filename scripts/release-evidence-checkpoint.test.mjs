import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 02:12 CET';
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

  it('records current exact-head candidates and security remediation without transferring parent results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 exact HEAD is `ef8b92b63ce3449b061728f56c351671f46ffe14`');
      expect(section).toContain('44966643867');
      expect(section).toContain('44966643883');
      expect(section).toContain('44966643922');
      expect(section).toContain('332 passed across 72 test files');
      expect(section).toContain('3 moderate severity vulnerabilities');
      expect(section).toContain('PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`');
      expect(section).toContain('44735858583');
      expect(section).toContain('44735858347');
      expect(section).toContain('44735858455');
      expect(section).toContain('539 tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`');
      expect(section).toContain('44744190838');
      expect(section).toContain('44744190840');
      expect(section).toContain('44744190839');
      expect(section).toContain('PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`');
      expect(section).toContain('44945232153');
      expect(section).toContain('PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735`');
      expect(section).toContain('zero exact-head workflow runs, zero check-runs, and zero status contexts');
      expect(section).toContain('PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`');
      expect(section).toContain('44955675733');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('PR #204 review inventory: 2 conversation comments');
    }
  });

  it('records exact-head PR #204 validation and security workflow evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('Validation [44966643867]');
      expect(section).toContain('CodeQL [44966643883]');
      expect(section).toContain('Dependency Review [44966643922]');
      expect(section).toContain('450 pytest tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('No known vulnerabilities found');
      expect(section).toContain('PR #219 exact HEAD');
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