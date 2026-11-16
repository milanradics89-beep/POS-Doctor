## Exact-head reconciliation — 2026-11-17 00:41 CET

This checkpoint supersedes the 00:16 CET snapshot. It records live repository evidence at 00:41 CET. The current documentation child is based on the exact pre-write PR #85 HEAD below. Parent workflow results are not validation of this child.

### PR #85 — current release-documentation parent

- PR #85 pre-write parent HEAD is `1b70ab892c0ea83d5d8bf0189b8c7892b618a43f`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `1b70ab892c0ea83d5d8bf0189b8c7892b618a43f` only; they do not validate the resulting documentation child.
- Validation [43978290948](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43978290948): IN PROGRESS at capture. Backend passed; frontend unit tests failed; iOS Release build passed and simulator smoke was still running. The frontend job reached typecheck successfully but failed in the checkpoint regression tests. Android export, native build, emulator smoke and runtime audit were skipped after the unit-test failure.
- CodeQL [43978290845](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43978290845): SUCCESS.
- Dependency Review [43978290600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43978290600): SUCCESS.
- The current review inventory is 9/9 inline threads resolved, 16 review submissions (all COMMENTED), and 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested. Human approval and last-push approval are still required.

### PR #119 and stacked minimatch correction

- PR #119 exact parent HEAD is `8fee75afb95f516583515cd55e4801f3830a8fa7`, based on PR #117 HEAD `980c3f8a84615097432cd73af73ecb1c78f5fe2f`.
- Validation [43981564972](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981564972): IN PROGRESS at capture. Backend passed; frontend typecheck failed on a malformed lockfile-path regex in `tests/minimatch-upgrade.test.ts`; iOS validation was still running.
- CodeQL [43981564948](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981564948): IN PROGRESS.
- Dependency Review [43981564942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981564942): SUCCESS.
- A separate child PR [#125](https://github.com/milanradics89-beep/POS-Doctor/pull/125), HEAD `f38a6f1025428beac023a79bb8b89091a4ce7969`, corrects the regex without writing to the active #119 branch. No exact-head workflow had appeared for #125 at capture; it is not accepted until its own checks pass.

### PR #90 — accessibility design foundation

- Current HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2` adds a targeted StatePanel VoiceOver announcement regression test.
- Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087): IN PROGRESS.
- CodeQL [43981707068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707068): IN PROGRESS.
- Dependency Review [43981707044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707044): SUCCESS.
- All 3 inline review threads are resolved. Human accessibility/design approval remains pending. The full screen-level accessibility audit is still open; the prior 1.90:1 mode-card arrow contrast correction to 5.60:1 addresses one known pair only.

### Verified supporting work

- PR #41 is CLOSED/MERGED at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Its 22/22 inline threads are resolved and it has one human APPROVED review. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded. Three obsolete runs remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation 43098210284, CodeQL 43098210473, Dependency Review 43098210255. Repository-admin cancellation is required.
- PR #65, #67, #68 and #69 are CLOSED/unmerged historical candidates. Their verified successors are the merged #41 release baseline, main-based Copilot guidance #96, App Attest/Node 22 regression PR #116, and the current Node 22 prebuild implementation on main. Do not treat old failed checks as current-main failures.
- PR #116 HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86`, PR #117 HEAD `980c3f8a84615097432cd73af73ecb1c78f5fe2f`, and PR #99 HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139` each have exact-head Validation, CodeQL and Dependency Review all SUCCESS. PR #116 has 1/1 review thread resolved; #117 has no inline threads; #99 has 2/2 review threads resolved. Human App Attest, dependency and independent security approvals remain pending.
- PR #99's HTTPX 0.28.1/httpcore 1.0.9 tests exercise per-hop DNS resolution, whole-answer public/global validation, numeric-IP pinning, peer verification before TLS/request bytes, original Host/TLS SNI, and RFC 6052 embedded-IPv4 validation. Issue #64 remains OPEN pending independent human security review and production NAT64/DNS64 prefix inventory plus verified `USEIT_NAT64_PREFIXES` configuration.
- Runtime npm audit continues to report 3 moderate minimatch findings including `GHSA-g3hv-75wg-m249`; findings remain visible and unsuppressed. `npm audit fix --force` would downgrade Expo to 52.0.49. No forced downgrade or security-check weakening was applied.

### Repository, governance and canonical checklist

- Fresh inventory: 89 branches, 40 open PRs and 5 open non-PR issues. The 6th issue search result is #115, which is CLOSED.
- Main HEAD remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Protect main ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is ACTIVE and unchanged: one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward protection and no bypass actors.
- Issue #74 persisted checklist: 64 items, 42 checked / 22 open. The 25-point release register remains 2 Done / 15 In Progress / 8 Blocked.
- Blocked release items remain #2 owner visibility/plan decision; #4 production App Attest entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** External console setup, physical-device tests, production cloud access, witnessed backup/restore, monitoring, rollout approval, pilot and business sign-off remain blocked until direct evidence exists. The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.


---

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
