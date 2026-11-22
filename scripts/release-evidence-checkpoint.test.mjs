import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 17:37 CET';
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

  it('records the merged SSRF remediation without transferring source CI to the merge commit', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #200 is CLOSED/MERGED');
      expect(section).toContain('fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a');
      expect(section).toContain('3a262358552a9650d865aa5bd3c92905f1');
      expect(section).toContain('44735858583');
      expect(section).toContain('44735858347');
      expect(section).toContain('44735858455');
      expect(section).toContain('no separate PR-triggered workflow runs or combined status contexts');
    }
  });

  it('records PR #204 exact-head failure and the separately validated PR #229 test correction', () => {
    for (const section of latestSections) {
      expect(section).toContain('### PR #204 and PR #229 — historical documentation candidates');
      expect(section).toContain('00d2dff332888e5eb2fa731d32e2e5b3e1cc4f9f');
      expect(section).toContain('Validation [45017190851](');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('CodeQL [45017190867](');
      expect(section).toContain('Dependency Review [45017190810](');
      expect(section).toContain('332 passed / 2 failed across 72 test files');
      expect(section).toContain('450 tests');
      expect(section).toContain('27 production-readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('native Release build and simulator install/launch smoke');
      expect(section).toContain('PR #229');
      expect(section).toContain('26aafc7a2f5b3a735bc04926568ef5cbcc99f1d6');
      expect(section).toContain('45031397060');
      expect(section).toContain('45031397027');
      expect(section).toContain('45031397143');
      expect(section).toContain('all passed');
    }
  });

  it('records PR #233 exact-head validation failure without transferring parent results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #233 is OPEN/DRAFT');
      expect(section).toContain('1a35bf4aa51b5d0f623728c4645e42b5df0fe54c');
      expect(section).toContain('Validation [45043529095](');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('336 passed / 1 failed across 72 test files');
      expect(section).toContain('expects `450 pytest tests` but the PR #204 backend evidence correctly says `450 tests`');
      expect(section).toContain('539 tests, 27 production-readiness checks, 78 security/privacy checks');
      expect(section).toContain('native Release build and simulator install/launch smoke');
      expect(section).toContain('45043529095');
      expect(section).toContain('CodeQL [45043529103](');
      expect(section).toContain('Dependency Review [45043529261](');
      expect(section).toContain('PR #229 test correction is carried forward by content in PR #233');
      expect(section).toContain('1 conversation comment');
      expect(section).toContain('0 formal review submissions');
      expect(section).toContain('0 inline review threads');
      expect(section).not.toContain('on the PR #204 candidate branch');
    }
  });

  it('records the current-main Redis acceptance candidate on its own exact head', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #232 is OPEN/DRAFT');
      expect(section).toContain('696ac10f2bbb4a502a507a07d562fb92136b0fb2');
      expect(section).toContain('Validation [45040014939](');
      expect(section).toContain('CodeQL [45040015166](');
      expect(section).toContain('Dependency Review [45040014952](');
      expect(section).toContain('3/3 terminal SUCCESS');
    }
  });

  it('keeps current-main minimatch evidence bound to PR #231 exact HEAD', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #231 is OPEN/DRAFT');
      expect(section).toContain('444e312b4bf94237eedfb0af1a24922bf5853942');
      expect(section).toContain('45031336861');
      expect(section).toContain('45031337208');
      expect(section).toContain('45031336869');
      expect(section).toContain('found 0 vulnerabilities');
      expect(section).toContain('0 formal reviews and 0 inline threads');
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
      expect(section).toMatch(/remains OPEN with \d+ comments/);
      expect(section).toContain('Release decision: NOT READY');
      expect(section).toContain('Production/pilot acceptance: NOT GRANTED');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
