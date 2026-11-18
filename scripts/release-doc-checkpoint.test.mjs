import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const documents = [
  'docs/25-POINT-RELEASE-BACKLOG.md',
  'docs/RELEASE_RUNBOOK.md',
  'docs/RELEASE_PILOT_ACCEPTANCE.md',
].map((path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8'));

const marker = '## Exact-head reconciliation — 2026-11-18 22:34 CET';
const latestSections = documents.map((document) => {
  const start = document.lastIndexOf(marker);
  if (start < 0) return '';
  const end = document.indexOf('\\n\\n---\\n\\n', start);
  return document.slice(start, end < 0 ? document.length : end);
});

const captureSha = (match) => match?.[1] ?? match?.[2];
const extractPreWritePair = (section) => ({
  parent: captureSha(section.match(/The exact pre-write parent HEAD is (?:\\x60([0-9a-f]{40})\\x60|([0-9a-f]{40})\\b)/)),
  evidenced: captureSha(section.match(/These exact-head runs belong to PR #85 pre-write parent HEAD (?:\\x60([0-9a-f]{40})\\x60|([0-9a-f]{40})\\b) only/)),
});

describe('release documentation exact-head checkpoint', () => {
  it('parses plain and code-formatted SHA labels but rejects unbalanced backticks', () => {
    const sha = 'fd08077d7967c2f415853cb1e194c3983d1bff20';
    const plain = [
      'The exact pre-write parent HEAD is ' + sha + '.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.',
    ].join('\\n');
    const code = [
      'The exact pre-write parent HEAD is \\x60' + sha + '\\x60.',
      'These exact-head runs belong to PR #85 pre-write parent HEAD \\x60' + sha + '\\x60 only.',
    ].join('\\n');
    const malformed = 'The exact pre-write parent HEAD is \\x60' + sha + '.\\n'
      + 'These exact-head runs belong to PR #85 pre-write parent HEAD ' + sha + ' only.';

    expect(extractPreWritePair(plain)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(code)).toEqual({ parent: sha, evidenced: sha });
    expect(extractPreWritePair(malformed)).toEqual({ parent: undefined, evidenced: sha });
  });

  it('binds current PR #85 results to the exact pre-write parent and current child HEAD', () => {
    expect(latestSections.every(Boolean)).toBe(true);
    const pairs = latestSections.map(extractPreWritePair);
    expect(pairs.every((pair) => pair.parent === '563db2b558206b5bab0700432a055bc13e7b2478')).toBe(true);
    expect(pairs.every((pair) => pair.evidenced === pair.parent)).toBe(true);
    expect(new Set(latestSections).size).toBe(1);

    for (const section of latestSections) {
      expect(section).toContain('Current exact HEAD: \\x60c1d2cfdfbaffbeb7a7e7586d57b3971a7d1a844a\\x60');
      expect(section).toMatch(/Validation \\[44376829457\\].*terminal SUCCESS/);
      expect(section).toMatch(/CodeQL \\[44376829436\\].*terminal SUCCESS/);
      expect(section).toMatch(/Dependency Review \\[44376829434\\].*terminal SUCCESS/);
      expect(section).toMatch(/Validation \\[44393580609\\].*terminal FAILURE/);
      expect(section).toMatch(/CodeQL \\[44393580584\\].*terminal SUCCESS/);
      expect(section).toMatch(/Dependency Review \\[44393581143\\].*terminal SUCCESS/);
      expect(section).toContain('292 passed / 8 failed');
      expect(section).toContain('Runtime npm audit is **SKIPPED**, not passed or failed.');
      expect(section).toContain('Backend job \\x60135135683613\\x60 succeeded');
      expect(section).toContain('iOS job \\x60135135602431\\x60 succeeded');
      expect(section).toContain('16 formal submissions, all COMMENTED; 9/9 inline threads resolved; 0 human APPROVED.');
      expect(section).not.toMatch(/Runtime npm audit[^\\n]*SUCCESS/i);
    }
  });

  it('records PR #41 merge, Redis review resolution and obsolete zero-job runs', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #41 is CLOSED/MERGED on \\x60fix/release-blockers-2026-10\\x60');
      expect(section).toContain('26 submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.');
      expect(section).toContain('43098210284');
      expect(section).toContain('43098210473');
      expect(section).toContain('43098210255');
      expect(section).toContain('Each has zero jobs and requires repository-admin cancellation');
    }
  });

  it('keeps parser child PRs on their exact heads and records their shared tree', () => {
    for (const section of latestSections) {
      expect(section).toContain('PR #171 exact HEAD \\x60cd3cd0e01f8dab9c1ac8e47c923a05134857d47d\\x60');
      expect(section).toContain('PR #172 exact HEAD \\x605e0f0c000a3a3707e5565c32804e4d221a886caa\\x60');
      expect(section).toContain('cf955182d98cae2e19f10c0e08f8e12621cb5242');
      expect(section).toContain('#172 is stacked on #171, not a sibling.');
      expect(section).toContain('Both have 0 formal review submissions and 0 inline review threads.');
    }
  });

  it('distinguishes historical Unit-test assertion failures from runtime npm audit failures', () => {
    for (const section of latestSections) {
      expect(section).toContain('#163');
      expect(section).toContain('#166');
      expect(section).toContain('#167');
      expect(section).toContain('#170');
      expect(section).toContain('Runtime npm audit: 28 findings (2 moderate, 26 high)');
      expect(section).toContain('Unit-test assertion');
      expect(section).toContain('historical exact-head findings');
    }
  });

  it('records the mainline successors and keeps external acceptance blocked', () => {
    for (const section of latestSections) {
      expect(section).toContain('package.json blob \\x60d91e6ff791d5c80a14fe056f7c19662ebf73bc9d\\x60');
      expect(section).toContain('package-lock blob \\x602bccc4107db8e2b4ac638215328677761d34374a\\x60');
      expect(section).toContain('Successor #96 exact HEAD \\x60e06a3c3513244289169b705fa7b1e9ee381945e0\\x60');
      expect(section).toContain('cryptography 50.0.2; pip-audit reported no known vulnerabilities.');
      expect(section).toContain('Successor #116 exact HEAD \\x6027fafece2783b11677bdd90e896a1c0e8551aa86\\x60');
      expect(section).toContain('PR #99 remains OPEN/DRAFT');
      expect(section).toContain('Production acceptance remains BLOCKED');
      expect(section).toContain('verified deployed \\x60USEIT_NAT64_PREFIXES\\x60');
    }
  });

  it('records the withdrawn picomatch advisory and conflicting OSV snapshot', () => {
    for (const section of latestSections) {
      expect(section).toContain('WITHDRAWN on 2026-11-18');
      expect(section).toContain('OSV record');
      expect(section).toContain('still reports HIGH with Modified 2026-11-17');
      expect(section).toContain('4.0.7 as latest');
      expect(section).toContain('there is no 4.0.8');
      expect(section).toContain('+(*)');
      expect(section).toContain('*(*)');
      expect(section).toContain('+(a*)');
      expect(section).toContain('+(*a)');
      expect(section).toContain('*(a*|b)');
      expect(section).toContain('+(ab|abab)');
      expect(section).toContain('22/22 successful jobs');
      expect(section).toContain('npm registry provenance/integrity is not verified');
    }
  });

  it('preserves the 64-item checklist and separate 25-point release register', () => {
    for (const section of latestSections) {
      expect(section).toContain('64 items / 41 checked / 23 open');
      expect(section).toContain('2 Done / 15 In Progress / 8 Blocked');
      expect(section).toContain('No checkbox changed.');
      expect(section).toContain('Protect main ruleset #26370589 is ACTIVE');
      expect(section).toContain('129 branches (100 + 29 + 0), 69 open PRs, 7 open non-PR issues, 0 published releases.');
      expect(section).toContain('RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.');
      expect(section).toContain('No main-branch write occurred.');
    }
  });
});
