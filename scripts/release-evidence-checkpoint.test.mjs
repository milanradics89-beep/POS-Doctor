import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 11:27 CET';
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
      expect(section).toContain('26 submissions (25 COMMENTED, 1 APPROVED)');
      expect(section).toContain('22/22 inline threads resolved');
      expect(section).toContain('three historical queued runs 43098210284, 43098210473 and 43098210255');
    }
  });

  it('records PR #204 failure separately from the successful PR #206 parent exact head', () => {
    for (const section of latestSections) {
      expect(section).toContain('c3fd17a1029adb26962b8cb96b06ef87b5fee2a7');
      expect(section).toContain('44828340885');
      expect(section).toContain('44828340790');
      expect(section).toContain('44828341122');
      expect(section).toContain('PR #206 is OPEN/DRAFT at pre-update parent HEAD f7d61201f298817df3bf449b501b811fb6f97c4d');
      expect(section).toContain('44891058990');
      expect(section).toContain('44891058987');
      expect(section).toContain('44891058847');
      expect(section).toContain('334 frontend tests');
      expect(section).toContain('450 backend tests');
      expect(section).toContain('27 readiness checks');
      expect(section).toContain('78 security checks');
      expect(section).toContain('three moderate minimatch findings');
      expect(section).toContain('18 commits ahead of main and 0 behind');
      expect(section).toContain('tarlaci1984-sketch is requested');
    }
  });

  it('keeps stacked correction PRs and their exact-head CI separate', () => {
    for (const section of latestSections) {
      expect(section).toContain('8603fc3be80efcfb0c2a27efc1f13b37af1020b8');
      expect(section).toContain('50a41b13b2cb1f76040c8d16fdbae9e1135a2656');
      expect(section).toContain('PR #212 remains OPEN/DRAFT at 2b767c68f7e81a054f8cd12b7ad38dd17f3288a7');
      expect(section).toContain('44883482260');
      expect(section).toContain('mergeable_state=dirty');
      expect(section).toContain('PR #213 remains OPEN/DRAFT at f744702155aad6f8f7fc8423b15af8d7c4fbbf6c');
      expect(section).toContain('44883818525');
      expect(section).toContain('PR #214 is CLOSED/unmerged as superseded');
      expect(section).toContain('3a28d3455e066cc0ab726af2a05421d0594118ad');
      expect(section).toContain('44889456793');
    }
  });

  it('distinguishes Unit-test failures from runtime npm-audit failures', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #85 current exact HEAD is ea1bf815d90d91026b24c46ec1869b8218211d80');
      expect(section).toContain('44645305669');
      expect(section).toContain('44645305765');
      expect(section).toContain('44645306118');
      expect(section).toContain('299/300 tests');
      expect(section).toContain('PR #163 exact HEAD 879a6392b3bcd248deca40916e15fd69a467df7b');
      expect(section).toContain('PR #166 exact HEAD 205d39742a8c98e94453df44106ec83d5dba0ea0');
      expect(section).toContain('PR #167 exact HEAD 3177cfba1cbaee43a9feed2dd8b2010249a7d12f');
      expect(section).toContain('PR #170 exact HEAD 6de7cedc9b1214f7bf819e8b76fd1d8986d8d085');
      expect(section).toContain('28 findings (2 moderate, 26 high)');
      expect(section).toContain('PR #171 exact HEAD cd3cd0e01f8dab9c1ac8e47c923a05134857d47d');
      expect(section).toContain('PR #172 exact HEAD 5e0f0c000a3a3707e5565c32804e4d221a886caa');
      expect(section).toContain('cf955182d98cae2e19f10c0e08f8e12621cb5242');
    }
  });

  it('records the current paginated repository, issue, release, and security evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('170 branches');
      expect(section).toContain('103 open PRs');
      expect(section).toContain('eight open non-PR issues');
      expect(section).toContain('Issue #74 had 319 comments');
      expect(section).toContain('Issue #149 had 227 comments');
      expect(section).toContain('zero published releases');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('Protect main ruleset 26370589 is ACTIVE');
    }
  });

  it('keeps the row-level 25-point candidate register at 2 Done / 15 In Progress / 8 Blocked', () => {
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
    for (const section of latestSections) {
      expect(section).toContain('main 3 Done / 15 In Progress / 7 Blocked');
      expect(section).toContain('candidate 2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('Issue #74 remains 64 checklist items: 41 checked and 23 open');
    }
  });

  it('records the picomatch withdrawal without treating it as a patched npm release', () => {
    for (const section of latestSections) {
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('Snyk marks the JavaScript advisory revoked');
      expect(section).toContain('Official npm lists picomatch 4.0.7 as latest');
      expect(section).toContain('there is no 4.0.8 release');
      expect(section).toContain('Upstream PR #238 exact HEAD 44f192261f312ddf236cb7bdc05d8f22663f98f9');
      expect(section).toContain('3/6');
      expect(section).toContain('PR #235 is CLOSED/unmerged');
      expect(section).toContain('do not import, pin or override this fork');
      expect(section).toContain('Issue #155 remains OPEN');
    }
  });

  it('does not promote external acceptance or unavailable security inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN');
      expect(section).toContain('Production SSRF acceptance remains BLOCKED');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED');
      expect(section).toContain('No published release exists');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
