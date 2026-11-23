import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-23 01:12 CET';
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
      expect(section).toContain('450 pytest tests');
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

  it('records PR #233 pre-correction exact-head failure without transferring parent results', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #233 is OPEN/DRAFT');
      expect(section).toContain('6cf6f262697fbf0682d0c48c66ced56fcb46c000');
      expect(section).toContain('6 commits and 4 changed files');
      expect(section).toContain('Validation [#45067156099](');
      expect(section).toContain('terminal FAILURE');
      expect(section).toContain('CodeQL [#45067156045](');
      expect(section).toContain('Dependency Review [#45067156113](');
      expect(section).toContain('333 passed / 4 failed across 72 test files');
      expect(section).toContain('PR #236 is CLOSED/MERGED into the PR #233 branch');
      expect(section).toContain('fast-forwarded with expected-SHA');
      expect(section).toContain('1a35bf4aa51b5d0f623728c4645e42b5df0fe54c');
      expect(section).toContain('336 passed / 1 failed across 72 test files');
      expect(section).toContain('539 pytest tests');
      expect(section).toContain('runtime npm audit was skipped');
      expect(section).toContain('2 conversation comments');
      expect(section).toContain('0 formal review submissions');
      expect(section).toContain('0 inline review threads');
      expect(section).toContain('0 human approvals');
      expect(section).toContain('The PR #229 test correction is carried forward by content in PR #233');
      expect(section).not.toContain('on the PR #204 candidate branch');
    }
  });

  it('records PR #233 current exact-head failure and isolates the two checkpoint assertion mismatches', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #233 is OPEN/DRAFT at exact HEAD 6805604d5781ff62284a94beb5d77f39b816ccf9');
      expect(section).toContain('7 commits and 4 changed files');
      expect(section).toContain('Validation [45073803426](');
      expect(section).toContain('CodeQL [45073803442](');
      expect(section).toContain('Dependency Review [45073803419](');
      expect(section).toContain('335 passed / 2 failed across 72 test files');
      expect(section).toContain('expected 450 tests while the PR #204 evidence correctly says 450 pytest tests');
      expect(section).toContain('expected fast-forward with expected-SHA while the PR #236 provenance correctly says fast-forwarded with expected-SHA');
      expect(section).toContain('Backend job [137372346371](');
      expect(section).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(section).toContain('iOS job [137372296410](');
      expect(section).toContain('native Release build and simulator smoke');
      expect(section).toContain('runtime npm audit were skipped');
      expect(section).toContain('PR #233 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(section).toContain('PR #236 is CLOSED/MERGED into the PR #233 branch only');
    }
  });

  it('records the latest PR #233 exact head and keeps PR #237 base evidence separate', () => {
    for (const section of latestSections) {
      expect(section).toContain('Current PR #233 exact HEAD is `dd732252a3a8eea5211ca0a5324c61eca044a8c4`');
      expect(section).toContain('8 commits and 4 changed files');
      expect(section).toContain('Validation [#45077680540](');
      expect(section).toContain('CodeQL [#45077680551](');
      expect(section).toContain('Dependency Review [#45077680544](');
      expect(section).toContain('337 passed / 1 failed across 72 test files');
      expect(section).toContain('runtime npm audit was skipped, not failed');
      expect(section).toContain('PR #237 is a separate child at exact HEAD `fe6178ce5d342dc7a9dbf9eb4594e51167622503`');
      expect(section).toContain('base SHA is still `6805604d5781ff62284a94beb5d77f39b816ccf9`');
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('PR #85 current exact HEAD `e3cc12a5ecb36877bdee5984ddd09d5e4f8f7bc9`');
      expect(section).toContain('9/9 resolved inline threads');
      expect(section).toContain('three commits behind current main');
      expect(section).toContain('PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`');
      expect(section).toContain('PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`');
      expect(section).toContain('3 moderate minimatch findings and no picomatch finding');
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('records PR #238 child exact-head failure separately from PR #233', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #238 is OPEN/DRAFT at exact HEAD `46c594e57404934d8be8c8f2dc300886fc02caf0`');
      expect(section).toContain('1 commit and 4 changed files');
      expect(section).toContain('based on PR #233 branch');
      expect(section).toContain('Validation [#45081443668](');
      expect(section).toContain('CodeQL [#45081443620](');
      expect(section).toContain('Dependency Review [#45081443715](');
      expect(section).toContain('337 passed / 2 failed across 72 test files');
      expect(section).toContain('two PR #238 frontend failures are test/evidence-contract mismatches');
      expect(section).toContain('Backend job [137394341947](');
      expect(section).toContain('539 pytest tests, 27 production-readiness checks, and 78 security/privacy checks');
      expect(section).toContain('iOS job [137394342328](');
      expect(section).toContain('native Release build and simulator smoke');
      expect(section).toContain('PR #238 review inventory: 2 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
      expect(section).toContain('PR #233 current review inventory: 3 conversation comments, 0 formal review submissions, 0 inline review threads, and 0 human approvals');
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
