import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-21 20:01 CET';
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

  it('records PR #206 exact-head Validation, CodeQL, Dependency Review, and job evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #206 is OPEN/DRAFT at exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720');
      expect(section).toContain('24 commits and four changed files');
      expect(section).toContain('44918462263');
      expect(section).toContain('44918462197');
      expect(section).toContain('44918462179');
      expect(section).toContain('334 tests passed and 2 failed across 71/72 files');
      expect(section).toContain('zero formal human reviews, and zero inline review threads');
      expect(section).toContain('tarlaci1984-sketch is requested');
      expect(section).toContain('two failed assertions');
    }
  });

  it('records PR #217 failure and PR #218 exact-head child correction without borrowing CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #217 is OPEN/DRAFT at exact HEAD 1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a');
      expect(section).toContain('44930055117');
      expect(section).toContain('44930055149');
      expect(section).toContain('44930055266');
      expect(section).toContain('336 tests passed and 1 failed across 71/72 files');
      expect(section).toContain('PR #217 description is stale');
      expect(section).toContain('PR #218 previously validated HEAD 8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776');
      expect(section).toContain('44933475924');
      expect(section).toContain('44933476051');
      expect(section).toContain('44933475916');
      expect(section).toContain('frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed');
      expect(section).toContain('PR #218 current exact HEAD e638a5714481afbb08adc54877131d7152e5ab24');
      expect(section).toContain('44937218893');
      expect(section).toContain('44937218873');
      expect(section).toContain('44937218887');
      expect(section).toContain('frontend job 136946382756 FAILED at Unit tests');
      expect(section).toContain('backend job 136946383046 SUCCESS');
      expect(section).toContain('iOS job 136946382948 is IN_PROGRESS');
      expect(section).toContain('334 frontend tests passed, 3 failed; 71/72 files');
      expect(section).toContain('new logical commit on a separate child branch; its own exact-head CI is a separate gate');
    }
  });

  it('keeps stale PR #215 separate from the current PR #218 candidate', () => {
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
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('No known vulnerabilities found');
      expect(section).toContain('not evidence of zero frontend vulnerabilities');
      expect(section).toContain('Issue #155 has 114 comments');
    }
  });

  it('records the current paginated repository, issue, release, and security evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('174 branches (100 + 74; page 3 empty)');
      expect(section).toContain('106 open PRs and five open non-PR issues');
      expect(section).toContain('Issue #74 has 342 comments');
      expect(section).toContain('Issue #149 has 255 comments');
      expect(section).toContain('Issue #64 remains OPEN with 93 comments');
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
    expect(rows[9]).toContain('8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776');
    expect(rows[23]).toContain('8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776');
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
      expect(section).toContain('Issue #74 has 342 comments and remains a separate 64-item development checklist: 41 checked and 23 open');
    }
  });

  it('keeps the SSRF remediation and human security approval gate open', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN with 93 comments');
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
