import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Current release evidence checkpoint — 2026-11-22 11:46 CET';

const stripTrailingHorizontalRules = (value) => {
  const lines = value.split('\n');
  let end = lines.length;

  while (end > 0 && lines[end - 1].trim() === '') {
    end -= 1;
  }

  while (end > 1 && lines[end - 1].trim() === '---') {
    end -= 1;
    while (end > 0 && lines[end - 1].trim() === '') {
      end -= 1;
    }
  }

  return lines.slice(0, end).join('\n');
};

const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  return stripTrailingHorizontalRules(document.slice(start))
    .trimEnd()
    .replace(/\*\*/g, '')
    .replace(/`/g, '');
});

describe('current release evidence checkpoint', () => {
  it('strips repeated trailing horizontal rules without backtracking', () => {
    const repeatedRules = ['checkpoint', ...Array.from({ length: 256 }, () => '\n\n---')].join('');
    expect(stripTrailingHorizontalRules(repeatedRules)).toBe('checkpoint');
    expect(stripTrailingHorizontalRules('checkpoint\n \t--- \t\n\n')).toBe('checkpoint');
    expect(stripTrailingHorizontalRules('checkpoint\n\n---\n\nkeep')).toBe('checkpoint\n\n---\n\nkeep');
  });

  it('keeps the same current checkpoint in all three release records', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
  });

  it('binds PR #41 to its merged exact head, human review, Redis baseline, and resolved threads', () => {
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
      expect(section).toContain('22/22 resolved inline threads');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
    }
  });

  it('records current #204/#226 and #85/#227 exact-head evidence without borrowing CI', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #204 exact HEAD ddd34e688343189b67d9fca463590287479188d1');
      expect(section).toContain('45011953827');
      expect(section).toContain('333 passed / 1 failed');
      expect(section).toContain('PR #226 is a child of that exact #204 HEAD');
      expect(section).toContain('e9a5826af011d65ff53ed4c6aa9123dfb7c82c71');
      expect(section).toContain('45013162271 remains IN_PROGRESS');
      expect(section).toContain('45013162204');
      expect(section).toContain('45013162217');
      expect(section).toContain('PR #85 current exact HEAD ea1bf815d90d91026b24c46ec1869b8218211d80');
      expect(section).toContain('44645305669');
      expect(section).toContain('299 passed / 1 failed');
      expect(section).toContain('PR #227 is a child of that exact #85 HEAD');
      expect(section).toContain('cc4406e577d9b3fa2cdace46bc5e3cf0a97ecf52');
      expect(section).toContain('45013272115 remains IN_PROGRESS');
      expect(section).toContain('45013272126');
      expect(section).toContain('45013272120');
    }
  });

  it('records current #206/#217/#218/#219 heads and the stale-base boundary', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #206 exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720');
      expect(section).toContain('44918462263');
      expect(section).toContain('PR #217 exact HEAD 1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a');
      expect(section).toContain('44930055117');
      expect(section).toContain('PR #218 current exact HEAD c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e');
      expect(section).toContain('44945232153');
      expect(section).toContain('333 passed / 4 failed');
      expect(section).toContain('PR #219 current exact HEAD 3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735');
      expect(section).toContain('4 commits ahead / 1 behind');
      expect(section).toContain('one outdated CodeQL thread now resolved');
      expect(section).toContain('no exact-head workflow runs');
    }
  });

  it('keeps #215 and the #224/#225 stacked branch separate from the current #204 head', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #215 exact HEAD 061bd79a581f5c98385bab58dc9d355ece2f3fce');
      expect(section).toContain('mergeable=false');
      expect(section).toContain('44898489771');
      expect(section).toContain('PR #224 exact HEAD 3a4b661ff1752345e4c6467f803d598f683f170d');
      expect(section).toContain('45008948274');
      expect(section).toContain('PR #225 child exact HEAD edfdf22f24bc7318d9341915421cb3e242c84649');
      expect(section).toContain('45009233930');
      expect(section).toContain('one commit ahead');
    }
  });

  it('keeps the #163–#170 failure categories separate and verifies #171/#172 exact-head success', () => {
    for (const section of latestSections) {
      expect(section).toContain('44241274884 frontend Unit-test failure');
      expect(section).toContain('44253605974 frontend Unit-test failure');
      expect(section).toContain('44253962999 frontend Unit-test failure');
      expect(section).toContain('44254136344 frontend Unit-test failure');
      expect(section).toContain('44255156916 runtime npm audit failure');
      expect(section).toContain('44272119611 frontend Unit-test failure');
      expect(section).toContain('44272942930 frontend Unit-test failure');
      expect(section).toContain('44273476324 runtime npm audit failure');
      expect(section).toContain('28 historical findings (2 moderate, 26 high)');
      expect(section).toContain('cd3cd0e01f8dab9c1ac8e47c923a05134857d47d');
      expect(section).toContain('44358862088');
      expect(section).toContain('5e0f0c000a3a3707e5565c32804e4d221a886caa');
      expect(section).toContain('44350568289');
      expect(section).toContain('three moderate minimatch findings');
    }
  });

  it('distinguishes backend pip-audit from frontend npm audit and records Node 22 plugin boundaries', () => {
    for (const section of latestSections) {
      expect(section).toContain('cryptography 50.0.2');
      expect(section).toContain('No known vulnerabilities found');
      expect(section).toContain('EC X-coordinate');
      expect(section).toContain('unsupported');
      expect(section).toContain('18 findings (1 low, 8 moderate, 8 high, 1 critical)');
      expect(section).toContain('27fafece2783b11677bdd90e896a1c0e8551aa86');
      expect(section).toContain('app.plugin.js');
      expect(section).toContain('expo-module.config.json');
    }
  });

  it('records the current paginated repository and issue inventory without changing canonical counts', () => {
    for (const section of latestSections) {
      expect(section).toContain('183 branches (100 + 83; page 3 empty)');
      expect(section).toContain('115 open PRs (100 + 15)');
      expect(section).toContain('8 open non-PR issues');
      expect(section).toContain('386 comments');
      expect(section).toContain('314');
      expect(section).toContain('105');
      expect(section).toContain('139');
      expect(section).toContain('zero published releases');
      expect(section).toContain('Protect main ruleset #26370589 remains ACTIVE');
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('25 rows / 2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('3 Done / 15 In Progress / 7 Blocked');
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
  });

  it('keeps SSRF and external provider acceptance blocked', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #200 exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a');
      expect(section).toContain('539 tests');
      expect(section).toContain('27 readiness checks');
      expect(section).toContain('78 security/privacy checks');
      expect(section).toContain('Production SSRF acceptance remains BLOCKED');
      expect(section).toContain('USEIT_NAT64_PREFIXES');
      expect(section).toContain('independent human security owner');
      expect(section).toContain('Issues #23, #24, and #25 remain open');
    }
  });

  it('records the withdrawn picomatch advisory without treating it as a patched release', () => {
    for (const section of latestSections) {
      expect(section).toContain('WITHDRAWN (2026-11-18)');
      expect(section).toContain('Snyk marks the JavaScript advisory revoked');
      expect(section).toContain('4.0.7');
      expect(section).toContain('no 4.0.8');
      expect(section).toContain('+(*)');
      expect(section).toContain('*(*)');
      expect(section).toContain('+(a*)');
      expect(section).toContain('+(*a)');
      expect(section).toContain('*(a*|b)');
      expect(section).toContain('+(ab|abab)');
      expect(section).toContain('5/6');
      expect(section).toContain('2/6');
      expect(section).toContain('3/6');
      expect(section).toContain('unsigned');
      expect(section).toContain('npm registry provenance/integrity could not be directly verified');
      expect(section).toContain('Do not import, pin, or override the fork');
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