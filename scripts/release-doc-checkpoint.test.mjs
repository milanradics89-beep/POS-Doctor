import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-17 00:16 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  return start < 0 ? '' : document.slice(start);
});

const extractPreWritePair = (section) => ({
  parent: section.match(/PR #85 pre-write parent HEAD is .([0-9a-f]{40})./)?.[1],
  evidenced: section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD .([0-9a-f]{40}). only/)?.[1],
});

const misleadingZeroAuditClaim = /npm audit\b[^.\n]*(?:returned|reported|reports?)\s+(?:\*\*)?0 vulnerabilities\b/i;

describe('release documentation exact-head checkpoint', () => {
  it('labels the exact pre-write parent and does not claim that parent is green', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractPreWritePair);
    for (const pair of pairs) {
      expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.evidenced).toBe(pair.parent);
    }
    expect(new Set(pairs.map((pair) => pair.parent)).size).toBe(1);
    expect(pairs.every((pair) => pair.parent === '73cd5ef13aef379044d2de66039eb6afe0025e6d')).toBe(true);
    expect(new Set(latestSections).size).toBe(1);
    const childGate = 'The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review; the parent runs above do not validate the child.';
    for (const section of latestSections) expect(section).toContain(childGate);
    for (const section of latestSections) expect(section).toContain('Validation [43968296273]');
    for (const section of latestSections) expect(section).toContain('FAILURE');
  });

  it('detects a split-brain pre-write parent evidence pair', () => {
    const mismatched = 'PR #85 pre-write parent HEAD is [796f3b1b3dfc054850dd7410bce6fa27aa0fd108].\nThese exact-head runs belong to PR #85 pre-write parent HEAD [0000000000000000000000000000000000000000] only.';
    const pair = extractPreWritePair(mismatched);
    expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
    expect(pair.evidenced).not.toBe(pair.parent);
  });

  it('keeps exact-head workflow IDs, outcomes, checklist, inventory and release tally aligned', () => {
    for (const section of latestSections) {
      expect(section).toMatch(/Validation \[43968296273\](?:\([^)]+\))?: FAILURE/);
      expect(section).toMatch(/CodeQL \[43968296228\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toMatch(/Dependency Review \[43968296194\](?:\([^)]+\))?: SUCCESS/);
      expect(section).toContain('294 passed / 1 failed across 295 tests; 59/60 test files passed');
      expect(section).toContain('Issue #74 persisted checklist: 64 items, 39 checked / 25 open');
      expect(section).toMatch(/88 branches, 39 open PRs(?:,| and) 6 open non-PR issues/);
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
    }
  });

  it('reports the observed moderate npm audit finding without claiming the audit is clean', () => {
    for (const section of latestSections) {
      expect(section).toMatch(/3 moderate (?:minimatch findings|findings for minimatch)/);
      expect(section).toContain('GHSA-g3hv-75wg-m249');
      expect(section).toContain('npm audit fix --force');
      expect(section).toContain('No forced downgrade, global override or security suppression was applied');
      expect(section).not.toMatch(misleadingZeroAuditClaim);
    }
  });

  it('rejects a false zero-vulnerability claim without rejecting the accurate warning', () => {
    const accurateWarning = 'Do not describe this command as a zero-vulnerability or clean production-only audit.';
    const falseClaim = 'npm audit --omit=dev --audit-level=high returned 0 vulnerabilities.';
    expect(accurateWarning).not.toMatch(misleadingZeroAuditClaim);
    expect(falseClaim).toMatch(misleadingZeroAuditClaim);
  });

  it('keeps automated validation separate from human and production acceptance', () => {
    for (const section of latestSections) {
      expect(section).toContain('RELEASE NOT READY');
      expect(section).toContain('PRODUCTION/PILOT ACCEPTANCE NOT GRANTED');
      expect(section).toContain('0 human APPROVED reviews');
      expect(section).toContain('9 inline threads, all 9 resolved');
      expect(section).toContain('Issue #64 remains OPEN');
    }
  });
});
