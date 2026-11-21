import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 17:32 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end).trimEnd();
});

describe('current release evidence checkpoint', () => {
  it('keeps the same current checkpoint in all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #41 evidence to its merged exact head, review inventory, and exact-head workflows', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1');
      expect(section).toContain('43492153234');
      expect(section).toContain('43492153161');
      expect(section).toContain('43492153021');
      expect(section).toContain('26 formal submissions');
      expect(section).toContain('25 COMMENTED');
      expect(section).toContain('one human APPROVED by tarlaci1984-sketch');
      expect(section).toContain('22/22 inline threads resolved');
      expect(section).toContain('Three historical queued runs remain QUEUED with zero jobs');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
    }
  });

  it('records PR #206 current exact-head Validation, CodeQL, Dependency Review, and job evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #206 is OPEN/DRAFT at exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720');
      expect(section).toContain('24 commits and four changed files');
      expect(section).toContain('44918462263');
      expect(section).toContain('44918462197');
      expect(section).toContain('44918462179');
      expect(section).toContain('334 frontend tests passed, 2 failed; 71/72 files');
      expect(section).toContain('450 backend tests, 27 production-readiness checks, 78 security/privacy checks');
      expect(section).toContain('Expo Doctor 21/21');
      expect(section).toContain('native Release build and simulator smoke');
      expect(section).toContain('zero formal human reviews, zero inline review threads');
      expect(section).toContain('tarlaci1984-sketch is requested');
      expect(section).toContain('validated parent PR #206 HEAD d924ad080f04f765016821113210bc4634c3e8f2');
      expect(section).toContain('two release-evidence assertion mismatches');
      expect(section).toContain('PR #206 description is stale');
    }
  });

  it('records PR #217 child exact-head workflows and the remaining checkpoint wording failure', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #217 is OPEN/DRAFT at exact HEAD 4ee367797e748c1fc5d1e1614f4e4f766a9665ac');
      expect(section).toContain('44923441377');
      expect(section).toContain('44923441358');
      expect(section).toContain('44923441374');
      expect(section).toContain('335 frontend tests passed, 1 failed; 71/72 files');
      expect(section).toContain('Three historical queued runs remain QUEUED with zero jobs');
      expect(section).toContain('zero formal reviews');
      expect(section).toContain('zero inline review threads');
      expect(section).toContain('PR #217 description is stale');
    }
  });

  it('keeps stale PR #215 separate from the current PR #206 candidate', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #215 remains OPEN/DRAFT');
      expect(section).toContain('061bd79a581f5c98385bab58dc9d355ece2f3fce');
      expect(section).toContain('mergeable=false');
      expect(section).toContain('44898489771');
      expect(section).toContain('44898489791');
      expect(section).toContain('44898489815');
    }
  });

  it('distinguishes frontend npm audit findings from the clean backend pip-audit', () => {
    for (const section of latestSections) {
      expect(section).toContain('reports 3 moderate minimatch vulnerabilities');
      expect(section).toContain('No known vulnerabilities found');
      expect(section).toContain('not evidence of zero frontend vulnerabilities');
      expect(section).toContain('Issue #155 has 112 comments and remains OPEN');
    }
  });

  it('records the current paginated repository, issue, release, and security evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('173 branches (100 + 73; final page empty)');
      expect(section).toContain('105 open PRs and eight open non-PR issues');
      expect(section).toContain('Issue #74 has 338 comments');
      expect(section).toContain('Issue #149 has 249 comments');
      expect(section).toContain('Issue #64 has 91 comments');
      expect(section).toContain('Issue #47 is CLOSED with 11 comments');
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
    expect(rows[9]).toContain('4ee367797e748c1fc5d1e1614f4e4f766a9665ac');
    expect(rows[23]).toContain('4ee367797e748c1fc5d1e1614f4e4f766a9665ac');
    const counts = { Done: 0, 'In Progress': 0, Blocked: 0 };
    for (const row of rows) {
      const status = row.match(/\*\*(Done|In Progress|Blocked)\*\*/)?.[1];
      expect(status).toBeTruthy();
      counts[status]++;
    }
    expect(counts).toEqual({ Done: 2, 'In Progress': 15, Blocked: 8 });
    for (const section of latestSections) {
      expect(section).toContain("Main's existing register remains 3 Done / 15 In Progress / 7 Blocked");
      expect(section).toContain('candidate backlog contains exactly 25 numbered rows: 2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('Issue #74 has 338 comments and remains a separate 64-item development checklist: 41 checked and 23 open');
    }
  });

  it('keeps the SSRF remediation and human security approval gate open', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN with 91 comments');
      expect(section).toContain('PR #200 exact-head Validation');
      expect(section).toContain('Production SSRF acceptance remains BLOCKED');
      expect(section).toContain('USEIT_NAT64_PREFIXES');
      expect(section).toContain('zero formal reviews and zero inline review threads');
    }
  });

  it('does not promote external acceptance or unavailable security inventories', () => {
    for (const section of latestSections) {
      expect(section).toContain('Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED');
      expect(section).toContain('No published release exists');
      for (const item of ['#2', '#4', '#5', '#16', '#18', '#21', '#22', '#25']) {
        expect(section).toContain(item);
      }
    }
  });
});
