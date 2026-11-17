import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-17 15:06 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const extractPreWritePair = (section) => ({
  parent: section.match(/PR #85 pre-write parent HEAD is \x60([0-9a-f]{40})\x60/)?.[1],
  evidenced: section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD \x60([0-9a-f]{40})\x60 only/)?.[1],
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
    expect(pairs.every((pair) => pair.parent === 'fea211fdbd086a07e51bd5d7491d96e64375d8a4')).toBe(true);
    expect(new Set(latestSections).size).toBe(1);

    for (const section of latestSections) {
      expect(section).toContain('Parent runs are not presented as validation of the documentation commit created by this checkpoint.');
      expect(section).toMatch(/Validation \[44090801232\](?:\([^)]+\))?: \*\*SUCCESS\*\*/);
      expect(section).toMatch(/CodeQL \[44090801233\](?:\([^)]+\))?: \*\*SUCCESS\*\*/);
      expect(section).toMatch(/Dependency Review \[44090801161\](?:\([^)]+\))?: \*\*SUCCESS\*\*/);
      expect(section).toContain('PR #140 is OPEN/DRAFT, exact HEAD');
      expect(section).toContain('Validation [44077737637]');
      expect(section).toContain('CodeQL [44077737700]');
      expect(section).toContain('Dependency Review [44077737572]');
      expect(section).toContain('PR #132 remains OPEN/DRAFT');
      expect(section).toContain('Validation [44028244600]');
      expect(section).toContain('CodeQL [44028244408]');
      expect(section).toContain('Dependency Review [44028244391]');
      expect(section).toContain('PR #99 remains OPEN/DRAFT');
      expect(section).toContain('Validation [43772791089]');
      expect(section).toContain('CodeQL [43772791064]');
      expect(section).toContain('Dependency Review [43772791109]');
      expect(section).toContain('PR #85 review inventory: 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews');
      expect(section).toContain('Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews');
      expect(section).toContain('PR #140 has 0 review submissions and 0 inline review threads');
      expect(section).toContain('PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews');
      expect(section).toContain('Issue #136, now CLOSED');
      expect(section).toContain('Issue #142, now CLOSED');
      expect(section).toContain('61 test files passed');
      expect(section).toContain('71 test files passed');
      expect(section).toContain('72 test files passed');
      expect(section).toContain('64 items, 42 checked / 22 open');
      expect(section).toContain('102 branches');
      expect(section).toContain('42 open PRs and 5 open non-PR issues');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('PR #41 is CLOSED/MERGED');
      expect(section).toContain('Protect main ruleset #26370589 is ACTIVE');
      expect(section.toLowerCase()).toContain('repository visibility is currently **public**');
      expect(section).toContain('Security alert inventories are **unavailable/unverified, not empty**');
      expect(section).toContain('No Issue #74 checkbox changed');
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