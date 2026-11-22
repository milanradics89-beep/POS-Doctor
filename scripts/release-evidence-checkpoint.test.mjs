import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 01:10 CET';
const stripTrailingHorizontalRules = (value) => {
  const lines = value.split('\n');
  let end = lines.length;
  while (end > 0 && lines[end - 1].trim() === '') end--;
  while (end > 0 && lines[end - 1].trim() === '---') {
    end--;
    while (end > 0 && lines[end - 1].trim() === '') end--;
  }
  return lines.slice(0, end).join('\n');
};

const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  return stripTrailingHorizontalRules(document.slice(start)).trimEnd();
});

describe('current release evidence checkpoint', () => {
  it('strips repeated trailing horizontal rules without regex backtracking', () => {
    const repeated = ['checkpoint', ...Array.from({ length: 256 }, () => '\n\n---')].join('');
    expect(stripTrailingHorizontalRules(repeated)).toBe('checkpoint');
    expect(stripTrailingHorizontalRules('checkpoint\n\n---\n\n')).toBe('checkpoint');
    expect(stripTrailingHorizontalRules('checkpoint\n\n---\n\nkeep')).toBe('checkpoint\n\n---\n\nkeep');
  });

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
      expect(section).toContain('one human APPROVED by `tarlaci1984-sketch`');
      expect(section).toContain('22/22 inline threads resolved');
      expect(section).toContain('Three historical queued runs remain QUEUED with zero jobs');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
    }
  });

  it('records PR #206 exact-head Validation, CodeQL, Dependency Review, and job evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #206 is OPEN/DRAFT at exact HEAD `df0c26e7fb14b170b4f7cd80da570ce031480720`');
      expect(section).toContain('24 commits and four changed files');
      expect(section).toContain('44918462263');
      expect(section).toContain('44918462197');
      expect(section).toContain('44918462179');
      expect(section).toContain('334 tests passed and 2 failed across 71/72 files');
      expect(section).toContain('zero formal human reviews, and zero inline review threads');
      expect(section).toContain('`tarlaci1984-sketch` is requested');
      expect(section).toContain('two failed assertions');
    }
  });

  it('records PR #217 failure and PR #218 exact-head child correction without borrowing CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #217 is OPEN/DRAFT at exact HEAD `1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a`');
      expect(section).toContain('44930055117');
      expect(section).toContain('44930055149');
      expect(section).toContain('44930055266');
      expect(section).toContain('336 tests passed and 1 failed across 71/72 files');
      expect(section).toContain('PR #217 description is stale');
      expect(section).toContain('PR #218 previous exact HEAD `e638a5714481afbb08adc54877131d7152e5ab24`');
      expect(section).toContain('44937218893');
      expect(section).toContain('44937218873');
      expect(section).toContain('44937218887');
      expect(section).toContain('Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed');
      expect(section).toContain('two commits and four changed files');
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
      expect(section).toContain('three moderate minimatch findings');
      expect(section).toContain('pip-audit ended `No known vulnerabilities found`');
      expect(section).toContain('#171 and #172 runtime npm audit each show three moderate minimatch findings and no picomatch finding');
      expect(section).toContain('Issue #155 has 120 comments');
    }
  });

  it('records the current paginated repository, issue, release, and security evidence', () => {
    for (const section of latestSections) {
      expect(section).toContain('176 branches (100 + 76; page 3 empty)');
      expect(section).toContain('108 open PRs and eight open non-PR issues');
      expect(section).toContain('Issue #74 has 356 comments');
      expect(section).toContain('Issue #149 has 275 comments');
      expect(section).toContain('Issue #64 remains OPEN with 96 comments');
      expect(section).toContain('Issue #47 is CLOSED with 11 comments');
      expect(section).toContain('zero published releases');
      expect(section).toContain('unverified, not empty');
      expect(section).toContain('Main ruleset 26370589 is ACTIVE');
      expect(section).toContain('Issue #74 has 356 comments and remains a separate 64-item development checklist: 41 checked and 23 open');
      expect(section).toContain('PR #218 current exact HEAD is `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`');
      expect(section).toContain('Validation [44945232153]');
      expect(section).toContain('frontend 333 passed and 4 failed across 72 test files');
      expect(section).toContain('PR #219 current HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` is based on stale PR #218 base SHA');
      expect(section).toContain('one COMMENTED submission and one unresolved CodeQL inefficient-regex inline thread');
      expect(section).toContain('PR #220 current exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11` passed Validation');
      expect(section).toContain('PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`');
      expect(section).toContain('runtime npm audit reports zero vulnerabilities');
      expect(section).toContain('#171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`');
      expect(section).toContain('#172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`');
      expect(section).toContain('identical tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`');
      expect(section).toContain('PR #116 exact HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86`');
      expect(section).toContain('Node 22 setup precedes both Android and iOS Expo prebuild commands');
      expect(section).toContain('WITHDRAWN (2026-11-18)');
      expect(section).toContain('official npm history still lists `picomatch` 4.0.7 as latest; no 4.0.8 is published');
      expect(section).toContain('untrusted glob reachability remains unproven, not remediated');
      expect(section).toContain('The six required counterexamples remain exactly `+(*)`, `*(*)`, `+(a*)`, `+(*a)`, `*(a*|b)`, and `+(ab|abab)`');
      expect(section).toContain('master `3ab5a7627d480259e3d9ca67fbc14c125d374f0e` is unprotected and its commit is unsigned');
      expect(section).toContain('registry-side `dist.integrity`/attestation was not independently verified');
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
    expect(rows[9]).toContain('c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e');
    expect(rows[23]).toContain('c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e');
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
      expect(section).toContain('Issue #74 has 356 comments and remains a separate 64-item development checklist: 41 checked and 23 open');
    }
  });

  it('keeps the SSRF remediation and human security approval gate open', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN with 96 comments');
      expect(section).toContain('PR #200 exact-head Validation');
      expect(section).toContain('Production SSRF acceptance remains BLOCKED');
      expect(section).toContain('USEIT_NAT64_PREFIXES');
      expect(section).toContain('zero formal reviews and zero inline threads');
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
