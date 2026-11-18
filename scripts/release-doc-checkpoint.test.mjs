import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-17 18:13 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const currentAuditMarker = "## Exact-head audit — 2026-11-18 08:13 CET";
const currentAuditSections = documents.map((document) => {
  const start = document.lastIndexOf(currentAuditMarker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const extractPreWritePair = (section) => ({
  parent: section.match(/PR #85 pre-write parent HEAD is \x60?([0-9a-f]{40})\x60?/)?.[1],
  evidenced: section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD \x60?([0-9a-f]{40})\x60? only/)?.[1],
});

  it('parses exact parent/evidence SHA values with or without Markdown code formatting', () => {
    const sha = '7f71bd957d3455b7649605099c466dd4d7a4e712';
    for (const formatted of [sha, `\x60${sha}\x60`]) {
      const section = `PR #85 pre-write parent HEAD is ${formatted}.\nThese exact-head runs belong to PR #85 pre-write parent HEAD ${formatted} only.`;
      const pair = extractPreWritePair(section);
      expect(pair.parent).toBe(sha);
      expect(pair.evidenced).toBe(sha);
    }
  });

const misleadingZeroAuditClaim = /npm audit\b[^.\n]*(?:returned|reported|reports?)\s+(?:\*\*)?0 vulnerabilities\b/i;

describe('release documentation exact-head checkpoint', () => {
  it('labels the exact pre-write parent and binds all listed runs to that SHA only', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractPreWritePair);
    for (const pair of pairs) {
      expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.evidenced).toBe(pair.parent);
    }
    expect(new Set(pairs.map((pair) => pair.parent)).size).toBe(1);
    expect(pairs.every((pair) => pair.parent === '7f71bd957d3455b7649605099c466dd4d7a4e712')).toBe(true);
    expect(new Set(latestSections).size).toBe(1);

    for (const section of latestSections) {
      expect(section).toContain('Parent runs are not presented as validation of the documentation commit created by this checkpoint.');
      expect(section).toContain('293 passed / 3 failed across 61 test files');
      expect(section).toContain('The frontend job stopped at Unit tests');
      expect(section).toMatch(/(?:native )?Android Release, Android emulator smoke and (?:the )?runtime npm audit were skipped/);
      expect(section).toMatch(/Validation \[44125620536\](?:\([^)]+\))?: (?:\*\*FAILURE\*\*|FAILURE)/);
      expect(section).toMatch(/CodeQL \[44125620555\](?:\([^)]+\))?: (?:\*\*SUCCESS\*\*|SUCCESS)/);
      expect(section).toMatch(/Dependency Review \[44125620669\](?:\([^)]+\))?: (?:\*\*SUCCESS\*\*|SUCCESS)/);
      expect(section).toContain('PR #140 is OPEN/DRAFT at exact HEAD');
      expect(section).toContain('Validation [44106927809]');
      expect(section).toContain('CodeQL [44106927918]');
      expect(section).toContain('Dependency Review [44106927790]');
      expect(section).toContain('PR #132 remains OPEN/DRAFT');
      expect(section).toContain('Validation [44028244600]');
      expect(section).toContain('CodeQL [44028244408]');
      expect(section).toContain('Dependency Review [44028244391]');
      expect(section).toContain('PR #99 remains OPEN/DRAFT');
      expect(section).toContain('Validation [43772791089]');
      expect(section).toContain('CodeQL [43772791064]');
      expect(section).toContain('Dependency Review [43772791109]');
      expect(section).toMatch(/PR #85 review inventory: .*16 review submissions \(all COMMENTED\), 9\/9 inline threads resolved, 0 human APPROVED reviews/);
      expect(section).toContain('Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews');
      expect(section).toContain('PR #140 has 0 review submissions and 0 inline review threads');
      expect(section).toContain('PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews');
      expect(section).toContain('Issue #136 is CLOSED');
      expect(section).toMatch(/Issue #142,.*is now CLOSED/);
      expect(section).toContain('61 test files, pinned Expo Doctor');
      expect(section).toContain('71 test files passed');
      expect(section).toContain('331/331 tests across 72 test files');
      expect(section).toContain('64 items, 42 checked / 22 open');
      expect(section).toContain('110 branches');
      expect(section).toContain('50 open PRs and 6 open non-PR issues');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('Protect main ruleset #26370589 is ACTIVE');
      expect(section.toLowerCase()).toContain('repository visibility is currently **public**');
      expect(section).toContain('Security alert inventories are **unavailable/unverified, not empty**');
      expect(section).toContain('No Issue #74 checkbox changed');
    }
  });

  it('keeps the latest 2026-11-18 audit evidence synchronized across all three release records', () => {
    expect(currentAuditSections.every(Boolean)).toBe(true);
    // Each release record has document-specific details; verify the shared evidence in every section below instead of requiring byte-for-byte equality.
    for (const section of currentAuditSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('53 conversation comments, 30 inline review comments, 26 review submissions');
      expect(section).toContain('22/22 threads resolved');
      expect(section).toContain('Validation [44245329306]');
      expect(section).toContain('CodeQL [44245329322]');
      expect(section).toContain('Dependency Review [44245329425]');
      expect(section).toContain('28 instances (2 moderate, 26 high dependency paths)');
      expect(section).toContain('2 production maps / 2,634 entries');
      expect(section).toContain('64 checklist items / 41 checked / 23 open');
      expect(section).toContain('Branches 124 (100+24), 64 open PRs, 7 open issues');
      expect(section).toContain('releases 0');
      expect(section).toContain('UNVERIFIED, NOT EMPTY');
      expect(section).toContain('Tally: 2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
    }
  });

  it('keeps the child-branch validation gate in the release record', () => {
    for (const document of documents) {
      expect(document).toContain('The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.');
    }
  });

  it('detects a split-brain parent/evidence pair', () => {
    const mismatched = "PR #85 pre-write parent HEAD is \x60796f3b1b3dfc054850dd7410bce6fa27aa0fd108\x60.\nThese exact-head runs belong to PR #85 pre-write parent HEAD \x6000000000000000000000000000000000000000\x60 only.";
    const pair = extractPreWritePair(mismatched);
    expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
    expect(pair.evidenced).not.toBe(pair.parent);
  });

  it('keeps the audit finding visible and rejects a false clean-audit claim', () => {
    for (const section of latestSections) {
      expect(section).toContain('3 moderate minimatch findings');
      expect(section).toContain('28 vulnerabilities (2 moderate, 26 high)');
      expect(section).toContain('GHSA-fc5q-39xc-vjpf');
      expect(section).toContain('CVE-2026-112366');
      expect(section).toContain('package-lock blob is identical on main and PR #152');
      expect(section).toContain('does not prove that Metro/Expo tooling is shipped in the production application bundle');
      expect(section).toContain('The current picomatch advisory affects versions through 4.0.7 and states no fixed npm version');
      expect(section).toContain('Issue #155');
      expect(section).toContain('GHSA-g3hv-75wg-m249');
      expect(section).toContain('npm audit fix --force');
      expect(section).not.toMatch(misleadingZeroAuditClaim);
      expect(section).toMatch(/no forced Expo downgrade or audit suppression was applied/i);
    }
  });

  it('keeps automated checks separate from human and production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
      expect(section).toContain('0 human APPROVED reviews');
      expect(section).toContain('Issue #64 remains OPEN / production acceptance BLOCKED');
      expect(section).toContain('No main-branch write');
    }
  });
});