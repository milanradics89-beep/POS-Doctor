import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-18 15:34 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\n\n---\n\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const captureSha = (match) => match?.[1] ?? match?.[2];

const extractPreWritePair = (section) => ({
  parent: captureSha(section.match(/(?:PR #85 )?(?:The exact )?pre-write parent HEAD is (?:\x60([0-9a-f]{40})\x60|([0-9a-f]{40})\b)/)),
  evidenced: captureSha(section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD (?:\x60([0-9a-f]{40})\x60|([0-9a-f]{40})\b) only/)),
});

const misleadingZeroAuditClaim = /npm audit\b[^.\n]*(?:returned|reported|reports?)\s+(?:\*\*)?0 vulnerabilities\b/i;

describe('release documentation exact-head checkpoint', () => {
  it('parses plain and code-formatted SHA labels but rejects unbalanced backticks', () => {
    const sha = 'fd08077d7967c2f415853cb1e194c3983d1bff20';
    const plain = [
      'PR #85 pre-write parent HEAD is ' + sha + '.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\n');
    const code = [
      'PR #85 pre-write parent HEAD is \x60' + sha + '\x60.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD \x60' + sha + '\x60 only.',
    ].join('\n');
    const mixedCode = [
      'PR #85 pre-write parent HEAD is \x60' + sha + '\x60.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\n');
    const documentWording = [
      'The exact pre-write parent HEAD is ' + sha + '.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\n');
    const documentCode = [
      'The exact pre-write parent HEAD is \x60' + sha + '\x60.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\n');
    const malformed = 'The exact pre-write parent HEAD is \x60' + sha + '.\n'
      + 'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.';

    expect(extractPreWritePair(plain)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(code)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(mixedCode)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(documentWording)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(documentCode)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(malformed)).toEqual({ parent: undefined, evidenced: sha });
  });

  it('binds every PR #85 workflow result to the exact pre-write parent', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractPreWritePair);
    for (const pair of pairs) {
      expect(pair.parent).toMatch(/^[0-9a-f]{40}$/);
      expect(pair.evidenced).toBe(pair.parent);
    }
    expect(new Set(pairs.map((pair) => pair.parent)).size).toBe(1);
    expect(pairs.every((pair) => pair.parent === 'fd08077d7967c2f415853cb1e194c3983d1bff20')).toBe(true);
    expect(new Set(latestSections).size).toBe(1);

    for (const section of latestSections) {
      expect(section).toContain('Parent runs are not presented as validation of the documentation commit created by this checkpoint.');
      expect(section).toMatch(/Validation \[44313934098\].*terminal FAILURE/);
      expect(section).toMatch(/CodeQL \[44313933984\].*terminal SUCCESS/);
      expect(section).toMatch(/Dependency Review \[44313933991\].*terminal SUCCESS/);
      expect(section).toContain('Frontend TypeScript typecheck, unit tests, Expo Doctor, Android export, Android Release build and Android emulator smoke all passed.');
      expect(section).toContain('The mandatory command npm audit --omit=dev --audit-level=high reports 28 vulnerability instances (2 moderate, 26 high dependency paths).');
      expect(section).toMatch(/minimatch GHSA-g3hv-75wg-m249 is moderate; picomatch GHSA-fc5q-39xc-vjpf is high\./i);
      expect(section).toContain('no forced Expo downgrade, unverified dependency pin, npm audit fix --force, or audit suppression was applied.');
      expect(section).toContain('PR #85 review inventory: 64 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews.');
      expect(section).not.toMatch(misleadingZeroAuditClaim);
    }
  });

  it('records PR #41 exact-head CI, branch and review inventory', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10.');
      expect(section).toContain('68b380e73ca3c870048035197beef8febbf90ef1');
      expect(section).toContain('517 commits, 100 changed files, +11,887 additions and -2,005 deletions');
      expect(section).toContain('Validation [43492153234]');
      expect(section).toContain('CodeQL [43492153161]');
      expect(section).toContain('Dependency Review [43492153021]');
      expect(section).toContain('53 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
      expect(section).toContain('QUEUED with zero jobs');
    }
  });

  it('records current governance and repository inventory without overstating security alerts', () => {
    for (const section of latestSections) {
      expect(section).toContain('Repository visibility is public');
      expect(section).toContain('Protect main #26370589');
      expect(section).toContain('six strict required checks');
      expect(section).toContain('127 branches (100 + 27 + 0)');
      expect(section).toContain('67 open PRs and 7 open non-PR issues');
      expect(section).toContain('0 published releases');
      expect(section).toContain('unverified, not empty');
    }
  });

  it('keeps Issue #64 production acceptance separate from CI success', () => {
    for (const section of latestSections) {
      expect(section).toContain('Issue #64 remains OPEN with 56 comments');
      expect(section).toContain('f91c70d2636948e538f8e3559afc39cd93eb5139');
      expect(section).toContain('Validation [43772791089]');
      expect(section).toContain('CodeQL [43772791064]');
      expect(section).toContain('Dependency Review [43772791109]');
      expect(section).toContain('4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED');
      expect(section).toContain('production DNS64/NAT64 translator-prefix inventory');
      expect(section).toContain('verified deployed USEIT_NAT64_PREFIXES');
    }
  });

  it('keeps Issue #74 separate from the 25-point release register', () => {
    for (const section of latestSections) {
      expect(section).toContain('64 items / 41 checked / 23 open (186 comments)');
      expect(section).toContain('separate from the 25-point release register');
    }
  });

  it('preserves the evidence-based 25-point register and all external blockers', () => {
    for (const section of latestSections) {
      expect(section).toContain('exactly 2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('Done (2): #1, #6.');
      expect(section).toContain('In Progress (15): #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.');
      expect(section).toContain('Blocked (8): #2');
      expect(section).toContain('#4 (production Apple App Attest entitlement and physical iPhone)');
      expect(section).toContain('#5 (Play Integrity on Play-installed physical Android)');
      expect(section).toContain('#16 (witnessed production backup/restore)');
      expect(section).toContain('#18 (representative product-recognition benchmark and business acceptance)');
      expect(section).toContain('#21 (production monitoring and alert delivery)');
      expect(section).toContain('#22 (approved staged rollout and tested rollback)');
      expect(section).toContain('#25 (real-user pilot and business sign-off)');
      expect(section).toContain('RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.');
      expect(section).toContain('No main-branch write occurred.');
    }
  });
});