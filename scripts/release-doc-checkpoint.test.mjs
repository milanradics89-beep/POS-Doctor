import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-17 00:41 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  return start < 0 ? '' : document.slice(start);
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
    expect(pairs.every((pair) => pair.parent === '1b70ab892c0ea83d5d8bf0189b8c7892b618a43f')).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
    for (const section of latestSections) {
      expect(section).toContain('The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.');
      expect(section).toMatch(/Validation \[43978290948\](?:\([^)]+\))?: IN PROGRESS/);
      expect(section).toMatch(/CodeQL \[43978290845\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toMatch(/Dependency Review \[43978290600\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toContain('Validation [43981564972]');
      expect(section).toContain('Validation [43981707087]');
      expect(section).toContain('64 items, 42 checked / 22 open');
      expect(section).toContain('89 branches, 40 open PRs and 5 open non-PR issues');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
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
      expect(section).toContain('No forced downgrade or security-check weakening was applied');
    }
  });

  it('keeps automated checks separate from human and production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
      expect(section).toContain('0 human APPROVED reviews');
      expect(section).toContain('9/9 inline threads resolved');
      expect(section).toContain('Issue #64 remains OPEN');
    }
  });
});
