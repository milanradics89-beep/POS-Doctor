## Exact-head reconciliation — 2026-11-17 13:22 CET

This checkpoint supersedes the 09:46 CET snapshot. Every workflow result below is tied to the exact SHA stated; no parent result is borrowed for a child. No main-branch write, production deployment, release approval or pilot acceptance is implied.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED into main at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its two P2 Redis runbook corrections are present on main: production always uses shared Redis, including single-instance deployments; process-local memory rate limiting is local/test-only; the shared client uses 2-second connect and 5-second socket timeouts; readiness reuses and does not close the shared client.
- Review inventory: 26 submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.
- Three obsolete runs remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation remains required; these are not current-head checks.

### PR #85 — current release-documentation branch

- PR #85 remains OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting main at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #85 pre-write parent HEAD is `f3aa1905e8f496f4be4d142e159e2faca182efd3`. These exact-head runs belong to PR #85 pre-write parent HEAD `f3aa1905e8f496f4be4d142e159e2faca182efd3` only:
  - Validation [44073847674](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44073847674): **SUCCESS**.
  - CodeQL [44073847774](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44073847774): **SUCCESS**.
  - Dependency Review [44073847717](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44073847717): **SUCCESS**.
- Validation backend, frontend and iOS jobs all succeeded. Frontend logs show 61 test files passed, Android Release build and emulator smoke passed, iOS Release build and simulator smoke passed. The runtime npm audit still reports **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`; `npm audit fix --force` would downgrade Expo to 52.0.49. Backend pip-audit reports no known Python vulnerabilities.
- PR #139 was merged into the PR #85 documentation branch, not main. Its CI-only D8 remediation configures a 4 GiB Gradle heap, 1 GiB metaspace cap, at most two workers and disables Gradle parallel project execution; R8/minification remains enabled. The exact-head PR #85 Android Release and emulator smoke steps above now pass.
- PR #138's release-checkpoint assertion correction is also included in this branch. The old repeated-failure incident for superseded SHA `0dd49b837e4b8794c11a22b58b29100a8ded953e` is tracked by Issue #136, now CLOSED after the current #85 exact-head checks succeeded.
- PR #85 review inventory: 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested. This branch is not approved for main.
- The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review; the parent runs above do not validate this new child.

### PR #140 and its design parent #90

- PR #140 is OPEN/DRAFT, exact HEAD `bf6a7d9ef45343aa65376724800ce39b4b9e5857`, based on PR #90's design branch at `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. It adds shared BrandMark/FadeIn usage to the Home flow and an AST regression test; it preserves the parent's newer offline, permission, recovery and retry behavior.
- Exact-head Validation [44077737637](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737637), CodeQL [44077737700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737700), and Dependency Review [44077737572](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737572) are all **SUCCESS**. Backend, frontend and iOS jobs passed; frontend logs show 71 test files passed, Android Release/emulator smoke and iOS Release/simulator smoke passed.
- PR #140 has 0 review submissions and 0 inline review threads; it remains draft and must not merge independently of PR #90.
- PR #90 parent HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2` has Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087), CodeQL [43981707068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707068), and Dependency Review [43981707044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707044) all **SUCCESS**. Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews; human design/accessibility approval remains required.

### PR #132 — Home photo replacement

- PR #132 remains OPEN/DRAFT at exact HEAD `d463f924500b0b070f50c9c328b4078b83f6df08`, stacked on `dd0407406bc3ad675f8ad68fb6041357bdc38d8d`.
- Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are all **SUCCESS**. Frontend logs show 72 test files passed; Android Release/emulator smoke and iOS Release/simulator smoke passed. Human review and safe integration remain pending.

### PR #99 / Issue #64 — DNS-rebinding SSRF

- PR #99 remains OPEN/DRAFT on main, exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are all **SUCCESS**.
- The HTTPX 0.28.1/httpcore 1.0.9 transport re-resolves and validates DNS on every redirect hop, validates every returned address, pins TCP to a numeric IP, checks the connected peer before TLS/request transmission, preserves original Host/TLS SNI and disables keep-alive reuse. RFC 6052 network-specific prefixes and the well-known `64:ff9b::/96` prefix now have explicit embedded-IPv4 validation and regression coverage.
- The two inline NAT64 review findings have evidence-backed replies and are now 2/2 resolved. PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews.
- Issue #64 remains OPEN / production acceptance BLOCKED pending independent human security approval, production DNS64/NAT64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress verification. Source tests do not prove deployed production configuration.

### App Attest, Copilot and dependency remediation

- PR #116 exact HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86`: Validation [43938664477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664477), CodeQL [43938664451](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664451), Dependency Review [43938664475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664475) all **SUCCESS**. The JavaScript Expo config plugin remains separate from the TypeScript runtime module; Node 22 is configured before Android/iOS prebuild.
- PR #117 exact HEAD `980c3f8a84615097432cd73af73ecb1c78f5fe2f`: Validation [43898737672](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737672), CodeQL [43898737938](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737938), Dependency Review [43898737797](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737797) all **SUCCESS**; the minimatch migration test is included in Vitest discovery.
- PR #119 exact HEAD `f38a6f1025428beac023a79bb8b89091a4ce7969`: Validation [43989350463](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43989350463), CodeQL [43989350470](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43989350470), Dependency Review [43989350456](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43989350456) all **SUCCESS**. Independent acceptance of the Expo SDK 57 fingerprint range versus the minimatch 11 override remains pending.
- PR #96 Copilot Free guidance exact HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0`: Validation [43800887062](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887062), CodeQL [43800886964](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800886964), Dependency Review [43800887028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887028) all **SUCCESS**; human approval remains pending.
- PR #107 full npm audit exact HEAD `431d96a31beb523be31c109d81c7009d49357318`: Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all **SUCCESS**. Findings remain visible; no forced Expo downgrade or audit suppression was applied.
- Historical PRs #65, #67, #68 and #69 are CLOSED/unmerged. The validated mainline successors above carry the SDK 57/Redis, Copilot, App Attest/cryptography and Node 22 remediations. Python cryptography/pip-audit results remain separate from npm/minimatch findings.

### Repository, governance and canonical checklist

- Repository visibility is currently **public**. Branch search pagination is exhausted at **101 branches**; current search inventory is **42 open PRs and 5 open non-PR issues** (#74, #64, #25, #24, #23). Issue #136 is closed after the superseded CI failure was replaced by current exact-head success.
- Main HEAD remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset #26370589 is ACTIVE and unchanged: one required approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward protection and no bypass actors.
- Issue #74 canonical checklist remains **64 items, 42 checked / 22 open**. No Issue #74 checkbox changed in this checkpoint.
- The authoritative 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. In Progress: #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23 and #24. Blocked: #2 visibility/plan owner decision; #4 Apple production App Attest entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.
- Security alert inventories are **unavailable/unverified, not empty** through this integration. No zero-alert claim is made.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** External console setup, production cloud configuration, physical-device testing, witnessed backup/restore, production alert delivery, staged rollout/rollback, independent human approvals and real-user pilot/business sign-off remain blocked until direct evidence exists.

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review. The runs above validate only pre-write parent HEAD `f3aa1905e8f496f4be4d142e159e2faca182efd3`.

---

## Exact-head reconciliation — 2026-11-17 09:46 CET

This checkpoint supersedes the 07:36 CET snapshot. It records live repository metadata, current exact-head workflow results, review state, and release evidence. No production, pilot, or external acceptance is implied.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` resolves to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; live PR metadata and the branch endpoint match. Merge commit and current `main` HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; merge base is `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- PR metadata: 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. The source branch compares 517 ahead / 1 behind `main`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`; all five jobs succeeded.
- Review inventory: 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, 1 human APPROVED), and 22/22 inline threads resolved. The human approval is from `tarlaci1984-sketch`.
- Three obsolete workflows remain QUEUED on historical SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Their jobs endpoints return zero jobs. These are not current-head failures or successes; repository administrator cancellation remains required.

### PR #85 — current release-documentation branch

- PR #85 remains OPEN and non-draft on `docs/post-merge-release-evidence-20261113`, targeting `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #85 pre-write parent HEAD is `c7f67f35913d52633368129880b1ae6a8111a9a9`. The branch compares 100 commits ahead / 0 behind `main`; PR metadata records 100 commits, 4 changed files, +7,583 additions and -764 deletions.
- These exact-head runs belong to PR #85 pre-write parent HEAD `c7f67f35913d52633368129880b1ae6a8111a9a9` only:
  - Validation [44041386344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44041386344): SUCCESS.
  - CodeQL [44041386347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44041386347): SUCCESS.
  - Dependency Review [44041386361](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44041386361): SUCCESS.
- All five exact-head jobs succeeded: backend, frontend, iOS, CodeQL analyze, and dependency-review. Frontend logs confirm 293 tests passed across 60 files, Android Release build and emulator smoke passed, and the runtime npm audit still reports 3 moderate minimatch findings including `GHSA-g3hv-75wg-m249`. `npm audit fix --force` would install Expo 52.0.49, a breaking downgrade. Backend evidence is 450 tests, 27 production-readiness checks and 78 production-security checks passed; pip-audit reports no known Python vulnerabilities. The iOS job completed successfully.
- PR #85 review inventory: 61 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved, and 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested.
- PR #135 is CLOSED/MERGED into the PR #85 documentation branch, not into `main`; its one-file correction is included in exact HEAD `c7f67f3`.
- The previous Validation failure on superseded SHA `0dd49b837e4b8794c11a22b58b29100a8ded953e` was caused by an over-escaped Markdown visibility assertion in `scripts/release-doc-checkpoint.test.mjs`. PR #135 corrected the assertion; exact-head Validation on `c7f67f3` now passes. Issue #136 remains OPEN until the validated PR #85 branch is integrated into `main`; do not describe the old failure as a current-head failure.
- The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review. Parent results above do not validate that child.

### PR #132 — camera photo replacement request invalidation

- PR #132 remains OPEN/DRAFT on branch `fix/home-camera-request-invalidation-20261117`, based on `fix/home-stale-request-guards-20261117` at `dd0407406bc3ad675f8ad68fb6041357bdc38d8d`; exact HEAD is `d463f924500b0b070f50c9c328b4078b83f6df08`. This is a stacked UI change, not a mainline integration or release-acceptance claim.
- Exact-head Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are terminal SUCCESS on the exact HEAD above.
- Validation logs confirm backend tests, 27 production-readiness checks and 78 production-security checks passed; frontend **331/331 tests across 72 files**, Expo Doctor **21/21**, Android Release build and emulator smoke, and iOS Release build and simulator smoke all passed.
- The camera-capture path now calls `invalidatePendingRequests()` after confirming a usable base64 image and before replacing the selected photo. The targeted regression test asserts this ordering, so an older analysis/render response cannot overwrite the newly captured image.
- Review inventory: **0 review submissions and 0 inline review threads**. Reviewer `tarlaci1984-sketch` is requested; human review and integration remain pending. These CI results do not imply physical-device acceptance or production rollout.

### Release documents and regression test

- `docs/RELEASE_RUNBOOK.md`, `docs/RELEASE_PILOT_ACCEPTANCE.md`, and `docs/25-POINT-RELEASE-BACKLOG.md` currently share an identical 07:36 CET checkpoint prefix. This new 09:46 CET checkpoint is being added identically to all three files.
- The checkpoint regression test remains enabled. It asserts the exact pre-write parent SHA, binds all three listed run IDs to that SHA, checks the 293 frontend tests and backend readiness/security counts, keeps the npm audit finding visible, and rejects a false zero-vulnerability claim.

### Repository inventory and governance

- Repository visibility is currently **public**. Current inventory: 97 branches (pagination exhausted), 41 open PRs and 6 open non-PR issues.
- Issue #47 is CLOSED (10 comments). Main is protected at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset #26370589 is ACTIVE: one approving review, stale-approval dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion and non-fast-forward protection, and no bypass actors.
- Issue #74 remains OPEN: 64 items, 42 checked / 22 open, 139 comments. No checklist checkbox or release-register status was changed.

### Issue #64 / PR #99 — SSRF and NAT64

- Issue #64 remains OPEN (45 comments). PR #99 remains OPEN/DRAFT on `main`, exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`, 17 commits and 7 changed files.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS.
- PR #99 has 2 COMMENTED review submissions, 2/2 inline security threads resolved, and no human APPROVED security review. Source-level transport evidence covers per-redirect DNS re-resolution, validation of all answers, numeric-IP TCP pinning, connected-peer verification before TLS/request bytes, Host/SNI preservation, disabled keep-alive reuse, and RFC 6052/NAT64 handling. Backend evidence recorded on Issue #64 includes 539 tests, 27 readiness checks and 78 production-security checks.
- Issue #64 and PR #99 remain OPEN/DRAFT because independent human security approval, production DNS64/NAT64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress verification are still absent. Source tests and CI do not establish production acceptance.

### Releases, security alerts and dependency findings

- GitHub Releases API returned **0 published releases**.
- Security alert inventories are **unavailable/unverified, not empty**. Code Scanning, Dependabot, and Secret Scanning alert endpoints are not accessible through the current integration; no zero-alert claim is made.
- The exact-head frontend runtime audit reports 3 moderate minimatch findings, including `GHSA-g3hv-75wg-m249`; the configured high-severity threshold passes, but the dependency tree is not clean. `npm audit fix --force` would downgrade Expo. no forced downgrade, global suppression or security-check weakening was applied.

### Authoritative 25-point release register

- 25-point register remains **2 Done / 15 In Progress / 8 Blocked**.
- **2 Done:** #1, #6.
- **15 In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **8 Blocked:** #2 repository visibility/plan owner decision; #4 Apple App Attest production entitlement and physical iPhone; #5 Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring/alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot/business sign-off.
- External console setup, physical-device testing, production cloud access, witnessed backup/restore, staged rollout approval and real-user pilot/business approval remain Blocked until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke, and source-level tests do not replace human approval or production evidence.

---

## Exact-head reconciliation — 2026-11-17 07:36 CET

This checkpoint supersedes the 06:36 CET snapshot. Every workflow result below is tied to the exact source SHA stated for that PR. PR #85 parent c81491e has now passed its own exact-head Validation, CodeQL and Dependency Review. The next documentation child created from this parent must pass its own exact-head checks; these parent runs do not validate that child.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` resolves to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; live PR metadata matches. Merge commit and current `main` HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; merge base is `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- PR metadata: 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparing `main` with the source branch reports 517 ahead / 1 behind.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): SUCCESS; backend, frontend and iOS jobs passed.
- Exact-head CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): SUCCESS; Analyze passed.
- Exact-head Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): SUCCESS. All five jobs across the three workflows passed on the exact PR #41 HEAD.
- PR #41 review inventory: 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), and 22/22 inline threads resolved (20 outdated, 2 current).
- Three historical workflows remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). These are not current-head checks and are not treated as success or failure; repository-admin cancellation remains required.

### PR #85 — current release-documentation parent

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, branch `docs/post-merge-release-evidence-20261113`.
- PR #85 pre-write parent HEAD is `c81491ebfa005d477eb6ee1006e2266a87a23ee3`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `c81491ebfa005d477eb6ee1006e2266a87a23ee3` only; they do not validate the resulting documentation child.
- PR #85 has 97 commits and 4 changed files (+7,391 / -763).
- Validation [44025706066](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44025706066): SUCCESS. Backend, frontend and iOS jobs all completed successfully. Backend: 450 tests, 27 production-readiness checks and 78 production-security checks passed; pip-audit reported no known vulnerabilities. Frontend: 293 tests passed across 60 files, Expo Doctor 21/21, Android export, native Release build and emulator smoke passed. iOS native Release build and simulator smoke passed.
- The frontend runtime audit reported **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`. The configured `npm audit --omit=dev --audit-level=high` step succeeds at its high-severity threshold but does not mean the dependency tree is clean. `npm audit fix --force` would force an incompatible Expo downgrade; no forced downgrade, global suppression or security-check weakening was applied.
- CodeQL [44025706097](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44025706097): SUCCESS; Analyze passed.
- Dependency Review [44025706080](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44025706080): SUCCESS.
- PR #85 review inventory: 61 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved (8 outdated, 1 current), and 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested; human approval and last-push approval remain outstanding.
- The three latest release-document checkpoint sections are byte-for-byte identical. The parity regression test passed on this parent. Keep PR #85 open and unmerged until the next documentation child passes its own exact-head checks and the required human approval is recorded.

### Repository inventory, visibility and branch governance

- Repository visibility is currently **public**. Fresh branch search returned **96 branches**; the follow-up cursor query returned no additional branches. There are **96 branches, 41 open PRs and 6 open non-PR issues**. The current open issue set is #134, #74, #64, #25, #24 and #23.
- Current `main` HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset #26370589 is ACTIVE and targets the default branch. It requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads and six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`); deletion and non-fast-forward are blocked; bypass actors are empty and current-user bypass is never.
- Issue #47 is CLOSED. Its older private-visibility warning is superseded by current repository metadata and the directly verified active ruleset. The owner decision to retain public visibility or restore private visibility remains separate governance work and release item #2; no visibility or ruleset setting was changed.
- Issue #74 persisted checklist: **64 items, 42 checked / 22 open** (134 comments). No checklist checkbox was changed. The latest owner-action note says public visibility is temporary; an owner/admin must change repository settings if private visibility is intended and verify the resulting API state.
- Issue #134 remains OPEN as an auto-generated diagnostic for the earlier PR #132 Validation failure on SHA `9f1c9f8442753798f15f31c46d92617bbe328622`, run [44023058008](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44023058008). That failure is superseded by PR #132 exact HEAD `d463f924500b0b070f50c9c328b4078b83f6df08`: Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are all SUCCESS on that exact current head. Issue #134 still needs reconciliation; its old failed run is not a current PR #132 failure.

### Issue #64 — DNS-rebinding SSRF and PR #99

- Issue #64 remains OPEN (44 comments). PR #99 remains OPEN/DRAFT on base `main` at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`, with 17 commits and 7 changed files.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS on that exact HEAD.
- The implementation tests cover redirect-hop DNS re-resolution, whole-answer public/global address validation, numeric-IP connection pinning, connected-peer verification before TLS/request transmission, original Host/TLS SNI preservation, DNS-rebinding rejection and RFC 6052 NAT64 handling. PR #99 has two COMMENTED review submissions, two resolved inline security threads and no human APPROVED security review.
- Issue #64 remains OPEN and production acceptance remains blocked by independent human security approval, a production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress verification. Keep PR #99 draft/unmerged.

### Releases, security alerts and dependency findings

- GitHub Releases API returned an empty array: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration. Security alert inventories are **unavailable/unverified, not empty**.
- The current exact-head frontend runtime audit reports **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`. Do not call the dependency tree clean. No forced Expo downgrade, global security override or security-check weakening was applied.

### Authoritative 25-point release register

**2 Done / 15 In Progress / 8 Blocked.** The same row-level register is retained in all three release records.

- **Done:** #1, #6.
- **In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked:** #2 repository visibility/plan owner decision; #4 Apple App Attest production entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, simulator/emulator smoke and documentation do not replace human approval or production evidence.

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.

---

## Exact-head reconciliation — 2026-11-17 06:36 CET

This checkpoint supersedes the 04:25 CET snapshot. Every workflow result below is tied to the exact source SHA stated for that PR. The current PR #85 documentation parent is fully validated on its own exact head; the next documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` resolves to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; the live Git ref matches. Merge commit and current `main` HEAD are both `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparing `main` to the source HEAD reports 517 ahead / 1 behind; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head workflows for `68b380e73ca3c870048035197beef8febbf90ef1`:
  - Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): SUCCESS; backend, frontend and iOS jobs passed.
  - CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): SUCCESS; Analyze passed.
  - Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): SUCCESS.
- PR #41 review inventory: 52 conversation comments, 30 inline comments, 26 review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), and 22/22 inline threads resolved (20 outdated, 2 current).
- Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is still required. These are not current-head checks and are not treated as success or failure.

### PR #85 — current release-documentation parent

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, branch `docs/post-merge-release-evidence-20261113`.
- PR #85 pre-write parent HEAD is `315314f2ffce2297e6139862c6fa797945487dc7`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `315314f2ffce2297e6139862c6fa797945487dc7` only; they do not validate the resulting documentation child.
- PR #85 has 96 commits and 4 changed files (+7,195 / -762).
- Validation [44018085508](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44018085508): SUCCESS. Backend, frontend and iOS jobs all completed successfully. Backend: 450 tests, 27 production-readiness checks and 78 production-security checks passed; pip-audit reported no known vulnerabilities. Frontend: 293 tests passed across 60 files, Expo Doctor 21/21, Android export, native Release build and emulator smoke passed. iOS native Release build and simulator smoke passed.
- The frontend runtime audit step `npm audit --omit=dev --audit-level=high` completed successfully at its configured high threshold but reported **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`. A successful high-threshold step is not a zero-finding audit. `npm audit fix --force` is not accepted because it would force an incompatible Expo downgrade. No forced downgrade or security-check weakening was applied.
- CodeQL [44018085504](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44018085504): SUCCESS; Analyze passed.
- Dependency Review [44018085666](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44018085666): SUCCESS.
- PR #85 review inventory: 61 conversation comments, 16 inline comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved (8 outdated), and 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested; human approval and last-push approval remain outstanding.
- The latest checkpoint-parity correction was integrated from PR #133 using a non-force, expected-SHA-protected fast-forward. PR #133 is CLOSED/MERGED into this PR #85 branch. The latest sections of all three release records are byte-for-byte identical; the regression test passed on this parent. Keep PR #85 open and unmerged until the next documentation child has its own terminal exact-head checks and required human approval.

### Repository inventory, visibility and branch governance

- The repository visibility is currently **public**. Fresh branch search returned **96 branches**; the follow-up pagination query returned no additional branches. There are **96 branches, 41 open PRs and 5 open non-PR issues**. The five open issues are #74, #64, #25, #24 and #23.
- Current `main` HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset #26370589 is ACTIVE and targets the default branch. It requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads and six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`); deletion and non-fast-forward are blocked; bypass actors are empty and current-user bypass is never.
- Issue #47 is CLOSED. Its older private-visibility warning is historical relative to current API evidence: repository visibility is public and the active ruleset is directly verified. The owner's choice to keep the repository public or restore private visibility remains a separate governance decision and release item #2; no visibility change was made.
- Issue #74 persisted checklist: **64 items, 42 checked / 22 open** (132 comments). No checklist checkbox was changed by this update. Its latest owner-action note says the repository was made public temporarily; if private visibility is intended, an owner/admin must change it in repository settings and verify the resulting API state.

### Issue #64 — DNS-rebinding SSRF and PR #99

- Issue #64 remains OPEN (44 comments). PR #99 remains OPEN/DRAFT on base `main` at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`, with 17 commits and 7 changed files.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS; backend, frontend and iOS jobs passed.
- The implementation tests cover DNS re-resolution on redirects, validation of every DNS answer, numeric-IP connection pinning, connected-peer verification before TLS/request transmission, original Host/TLS SNI preservation, rebinding rejection and RFC 6052 NAT64 handling. The two inline security threads are resolved; review submissions remain COMMENTED with no human APPROVED security review.
- Issue #64 remains OPEN and production acceptance remains blocked by independent human security approval, a production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress verification. Keep PR #99 draft/unmerged.

### Releases, security alerts and dependency findings

- GitHub Releases API returned an empty array: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration. Security alert inventories are **unavailable/unverified, not empty**.
- The exact-head npm runtime audit still reports 3 moderate minimatch findings, including `GHSA-g3hv-75wg-m249`. Do not call the audit clean. No forced Expo downgrade, global security override or security-check weakening was applied.

### Authoritative 25-point release register

**2 Done / 15 In Progress / 8 Blocked.** The same row-level register is retained in all three release records.

- **Done:** #1, #6.
- **In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked:** #2 repository visibility/plan owner decision; #4 Apple App Attest production entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists.

Historical exact-head references retained for separate workstreams only (not used as PR #85 acceptance evidence): PR #119 Validation [43989350463](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43989350463); PR #90 Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087).

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI and simulator/emulator smoke do not replace human approval or production evidence.

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.

---

## Exact-head reconciliation — 2026-11-17 04:25 CET

This checkpoint supersedes the 02:30 CET snapshot. Every workflow result below is tied to the exact source SHA stated for that PR. The documentation child created from the pre-write parent must pass its own exact-head Validation, CodeQL and Dependency Review.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` resolves to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit and current `main` HEAD are both `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparing `main` to the source HEAD reports 517 ahead / 1 behind; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head workflows for `68b380e73ca3c870048035197beef8febbf90ef1`:
  - Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): SUCCESS; backend, frontend and iOS jobs passed.
  - CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): SUCCESS; Analyze passed.
  - Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): SUCCESS.
- PR #41 review inventory: 52 conversation comments, 30 inline comments, 26 review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), and 22/22 inline threads resolved (20 outdated, 2 current).
- Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is still required. These are not current-head checks and are not treated as success or failure.

### PR #85 — current release-documentation parent

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #85 pre-write parent HEAD is `a8a0f7713a0466ed9f1248080a3ba398cc404063`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `a8a0f7713a0466ed9f1248080a3ba398cc404063` only; they do not validate the resulting documentation child.
- PR #85 has 93 commits and 4 changed files (+7,178 / -762).
- Validation [44002469266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44002469266): SUCCESS. Backend, frontend and iOS jobs all completed successfully. Backend: 450 tests, 27 production-readiness checks and 78 production-security checks passed; pip-audit reported no known vulnerabilities. Frontend: 293 tests passed across 60 files, Expo Doctor 21/21, Android export, native Release build and emulator smoke passed. iOS native Release build and simulator smoke passed.
- The frontend runtime audit step `npm audit --omit=dev --audit-level=high` completed successfully at its configured high threshold but reported **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`. A successful high-threshold step is not a zero-finding audit. The separate full dependency-tree audit also remains tracked; the suggested `npm audit fix --force` path is not accepted because it would force an incompatible Expo downgrade. No forced downgrade or security-check weakening was applied.
- CodeQL [44002469285](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44002469285): SUCCESS; Analyze passed.
- Dependency Review [44002469270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44002469270): SUCCESS.
- PR #85 review inventory: 61 conversation comments, 16 inline comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved (8 outdated), and 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested; human approval and last-push approval remain outstanding.
- The new documentation child is not validated by the parent runs above. Keep PR #85 open and unmerged until the child has its own terminal exact-head checks and the required human approval.

### Repository inventory, visibility and branch governance

- The repository visibility is currently **public**. Fresh branch search returned **95 branches** and the follow-up pagination query returned no additional branches. There are **95 branches, 41 open PRs and 6 open non-PR issues**. The six open issues are #131, #74, #64, #25, #24 and #23.
- Current `main` HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; the branch API reports `protected: true`. Protect main ruleset #26370589 is ACTIVE and targets the default branch. It requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads and six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`); deletion and non-fast-forward are blocked; bypass actors are empty and current-user bypass is never.
- Issue #47 is CLOSED. Its older private-visibility warning is historical relative to the current API evidence: repository visibility is public, main is protected, and the active ruleset is directly verified. The owner’s choice to keep the repository public or restore private visibility remains a separate governance decision and release item #2; no visibility change was made.
- Issue #74 persisted checklist: **64 items, 42 checked / 22 open** (127 comments). No checklist checkbox was changed by this update. Its latest owner-action note says the repository was made public temporarily; if private visibility is intended, an owner/admin must change it in repository settings and verify the resulting API state.

### Issue #64 — DNS-rebinding SSRF and PR #99

- Issue #64 remains OPEN (44 comments). PR #99 remains OPEN/DRAFT on base `main` at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS; backend, frontend and iOS jobs passed.
- The current two inline security threads are resolved (one outdated); review submissions are two COMMENTED with no human APPROVED security review. The implementation tests cover DNS re-resolution on redirects, validation of every DNS answer, numeric-IP connection pinning, connected-peer verification before TLS/request transmission, original Host/TLS SNI preservation, rebinding rejection and RFC 6052 NAT64 handling.
- Issue #64 remains OPEN and production acceptance remains blocked by independent human security approval, a production DNS64/NAT64 prefix inventory, and verified deployed `USEIT_NAT64_PREFIXES`. Keep PR #99 draft/unmerged.

### Releases, security alerts and dependency findings

- GitHub Releases API returned an empty array: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration. Security alert inventories are **unavailable/unverified, not empty**.
- The exact-head npm runtime audit still reports 3 moderate minimatch findings, including `GHSA-g3hv-75wg-m249`. Do not call the audit clean. No forced Expo downgrade, global security override or security-check weakening was applied.

### Authoritative 25-point release register

**2 Done / 15 In Progress / 8 Blocked.** The same row-level register is retained in all three release records.

- **Done:** #1, #6.
- **In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked:** #2 repository visibility/plan owner decision; #4 Apple App Attest production entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI and simulator/emulator smoke do not replace human approval or production evidence.

Historical exact-head references retained for separate workstreams only (not used as PR #85 acceptance evidence): PR #119 Validation [43989350463](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43989350463); PR #90 Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087).

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.

---

## Live operational checkpoint — 2026-11-16 09:53 CET

This checkpoint supersedes prior live operational summaries; older entries remain historical evidence. No production deployment or pilot acceptance is implied.

### Verified repository and PR state

- **PR #41** is closed/merged. Source branch `fix/release-blockers-2026-10` and PR metadata both point to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; the live Git ref matches. Merge commit and main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Comparison: 517 ahead / 1 behind, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata: 517 commits, 100 files, +11,887 / -2,005. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded; all five jobs passed. Review inventory: 52 conversation comments, 30 inline comments, 26 submissions (25 COMMENTED, one human APPROVED), 22/22 threads resolved. The source branch itself is not protected; the active protection ruleset applies to main.
- **PR #85** is OPEN, non-draft, based on main, with reviewer `tarlaci1984-sketch` requested. This documentation-only commit `0f0147abb181ab14e9bb52cbe219b6039d770d12` is the current PR HEAD; it is a child of pre-write HEAD `bc60fc308b3ba7bffc123b80cc72b735f4375eeb`. Parent exact-head Validation [43818014565](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43818014565), CodeQL [43818014606](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43818014606), and Dependency Review [43818014583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43818014583) all succeeded. Current documentation child exact-head Validation [43829708185](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43829708185), CodeQL [43829708487](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43829708487), and Dependency Review [43829708758](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43829708758) all succeeded. Validation backend, frontend/Android and iOS jobs passed, including Android Release/emulator and iOS Release/simulator smoke. Codex re-reviewed parent `bc60fc3` and found no major issues; re-review of current child `0f0147ab` is requested. All 5/5 inline review threads are resolved; no human APPROVED review is recorded. Issue [#111](https://github.com/milanradics89-beep/POS-Doctor/issues/111) is CLOSED after the child Validation passed. Human approval remains outstanding.
- **PR #90** HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`: Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) all succeeded; backend/frontend/iOS jobs passed. Three accessibility threads are resolved; human design/accessibility approval remains pending.
- **PR #99 / Issue #64** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`: Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all succeeded; all backend/frontend/iOS jobs passed. The RFC 6052 NAT64 and DNS-rebinding tests are green and both security threads are resolved. PR #99 remains Draft. Issue #64 is open with 39 comments; production `USEIT_NAT64_PREFIXES` inventory/configuration and independent human security approval remain missing.
- **PR #107** HEAD `431d96a31beb523be31c109d81c7009d49357318`: Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all succeeded. Full npm audit remains 3 moderate / 0 high / 0 critical / 0 low; findings remain visible and unsuppressed. Human security approval remains pending.
- Supporting exact-head checks: PR #96 HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0` has Validation [43800887062](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887062), CodeQL [43800886964](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800886964), Dependency Review [43800887028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887028), all successful. PR #100 is Draft at `a91434c1669ad159fa50fd3526b6594f2c2f8ebd`; its latest exact-head set (Validation 43624487754, CodeQL 43624487717, Dependency Review 43624487726) passed. PR #106 HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7` has Validation 43705947653, CodeQL 43705947633, Dependency Review 43705947631 successful. PR #108 HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e` has Validation 43730870752, CodeQL 43730870781, Dependency Review 43730870776 successful.
- **Issue #47** is closed; repository metadata is public; main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires PRs, one approval, stale-review dismissal, last-push approval, resolved threads, six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion/non-fast-forward protection and no bypass. The owner's durable public/private and plan decision is still not documented.
- Repository branch inventory: **78 branches**. GitHub Releases API: **0 published releases**. Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable through the current integration; they are **unverified, not empty**.

### Canonical Issue #74 checklist and 25-point release register

- Fresh persisted Issue [#74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) body contains **64 checkboxes / 39 checked / 25 open**. This is separate from the 25-point release register. No checklist checkbox was changed by this checkpoint.
- The authoritative 25-point release register remains exactly **2 Done / 15 In Progress / 8 Blocked**:
  - **Done (2):** #1, #6.
  - **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
  - **Blocked (8):** #2, #4, #5, #16, #18, #21, #22, #25.
- Keep #2 blocked until the owner records the repository visibility/plan decision; #4 until production App Attest entitlement and witnessed physical iPhone evidence; #5 until Play-installed physical Android Play Integrity evidence; #16 until witnessed production backup/restore; #18 until a representative product-recognition benchmark and business acceptance; #21 until production monitoring/alert delivery is demonstrated; #22 until authorized staged rollout and tested rollback; #25 until real-user pilot evidence and business sign-off.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, simulator/emulator smoke tests and documentation do not satisfy external production or business acceptance gates.

---

## Live operational checkpoint — 2026-11-16 01:59 CET

This section supersedes older operational snapshots below. It is a documentation-only child of PR #85 pre-write HEAD `49201852ba2b179cf6c19ad03da9e33cac26b49f`; its own exact-head checks are required.

- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) remains active and unchanged.
- PR #41 is merged and human-approved; 22/22 review threads resolved. Three obsolete queued Actions runs have empty job lists on stale SHA `b46c5b8`; owner/admin cleanup is required.
- PR #85 pre-write HEAD `49201852ba2b179cf6c19ad03da9e33cac26b49f` passed Validation 43780032663, CodeQL 43780032586 and Dependency Review 43780032572. Both P2 threads are resolved/outdated; human approval remains pending. This documentation child needs a fresh check set.
- PR #90 HEAD `12024e1d3948d04c664888c72510e9949a6164e3`: Validation 43783060018 is running (backend passed, Android/iOS Release jobs running); CodeQL 43783060010 and Dependency Review 43783060119 passed. Issue #110 tracks the failed predecessor's test assertion and remains open until current-head Validation succeeds.
- PR #99 HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139` passed all three required workflows. Actual HTTPX/httpcore transport and NAT64 regressions passed; both P2 threads are resolved. Keep issue #64 open for independent human security review and production NAT64 prefix configuration.
- PR #96/#97/#106/#107/#108 retain terminal-success exact-head checks. npm audit still has 3 moderate findings; keep them visible. PR #106 does not prove Redis server 8 production compatibility.
- Issue #74 remains 64 checklist boxes / 31 checked / 33 open; the 25-point register remains 2 Done / 15 In Progress / 8 Blocked. Do not treat CI, simulator/emulator or documentation as external acceptance.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** Physical provider/device tests, production backup/restore, monitoring, staged rollout/rollback, benchmark/business acceptance and pilot remain blocked pending direct evidence and approval.

---

## Latest verified operational release checkpoint — 2026-11-15 22:07 CET

This checkpoint supersedes the 21:14 CET snapshot below. It records current operational evidence. The documentation correction is based on validated PR #85 parent `2cd7198a111dc0937150d344bc7817418de0e227`; this child must pass its own Validation, CodeQL and Dependency Review before further writes.

### Current operational and CI state
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active with one approval, stale-review dismissal, last-push approval, resolved threads, six strict required checks, deletion/non-fast-forward protection and no bypass actors.
- PR #41 is merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; source ref `fix/release-blockers-2026-10` matches. Exact-head Validation 43492153234, CodeQL 43492153161 and Dependency Review 43492153021 succeeded. Review inventory: 52 conversation comments, 30 inline comments, 26 review submissions (one human APPROVED), 22/22 threads resolved. Three old runs remain queued with empty job lists on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; they are not current-head checks.
- PR #85 validated parent `2cd7198a111dc0937150d344bc7817418de0e227` passed Validation 43757893067, CodeQL 43757893059 and Dependency Review 43757893072. Backend, frontend/Android and iOS jobs succeeded; Android emulator and iOS simulator smoke passed. Runtime npm audit still reports 3 moderate minimatch findings; it is not clean. Human approval is pending.
- The current PR #85 review has one unresolved P2 finding: literal JavaScript checklist-count text was printed instead of an evaluated count. This child replaces it in the backlog and runbook with the persisted Issue #74 count, 31/64 checked and 33/64 open. Do not resolve the thread until this child passes exact-head CI and the reviewer re-evaluates it.
- PR #107 exact HEAD `431d96a31beb523be31c109d81c7009d49357318` passed all three workflows. Full dependency-tree npm audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) reports 3 moderate / 0 high / 0 critical / 0 low. Keep findings visible; no Expo downgrade, major override, audit suppression or threshold reduction.
- PR #90 current HEAD `05be357c1e46ecd134c4aaf5feaed05b2bad9878`: Validation 43760238641 is running; CodeQL 43760238628 and Dependency Review 43760238664 succeeded. Backend passed; Android emulator smoke and iOS Release build/simulator were still running at last job read. No write to PR #90 until its exact-head Validation terminates.
- PR #99 exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f` passed all three workflows; independent HTTPX/httpcore transport security review remains pending, issue #64 is open with 32 comments. PR #106, #108 and #96 also have terminal-success exact-head required checks.

### Release gates and operating constraints
- Repository visibility is public. Published GitHub Releases API returned `[]` (zero published releases).
- Issue #47 is closed (10 comments); current ruleset is active while the repository is public. The owner's long-term visibility/plan decision remains separate; keep backlog item #2 Blocked.
- Issue #74 currently contains 64 checklist boxes: 31 checked / 33 open. The literal-count defect in the prior checkpoint is corrected above.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable/unverified, not empty.
- External blockers remain: owner visibility/plan decision; physical iPhone App Attest; Play-installed physical Android Play Integrity; production cloud access; witnessed backup/restore; representative benchmark/business acceptance; production monitoring/alert delivery; staged rollout/rollback approval; real-user pilot/business sign-off.
- The authoritative 25-point register remains 2 Done / 15 In Progress / 8 Blocked. Release **NOT READY**; production/pilot acceptance **NOT GRANTED**. Do not use CI, emulator/simulator or documentation as a substitute for external acceptance.

## Latest verified operational release checkpoint — 2026-11-15 21:14 CET

This checkpoint supersedes the 20:41 CET snapshot below. It is a new documentation child of validated PR #85 parent a964933d646338a4f80856ddc846735a1a63beaf; run Validation, CodeQL and Dependency Review again on the new child before treating this documentation update as validated.

### Current operational and CI state
- Main: f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Protect main ruleset 26370589 is active and unchanged: six strict required checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection, no bypass actors.
- PR #41 is merged at approved HEAD 68b380e73ca3c870048035197beef8febbf90ef1; 22/22 review threads resolved. Both Redis runbook P2 fixes are present on main. Three obsolete #41 runs remain queued with no jobs on b46c5b8082ecbebd263a86cd53b1321a86e570d1: 43098210284, 43098210473 and 43098210255. Owner/admin cancellation is required.
- PR #65/#67/#68/#69 are closed unmerged. Their relevant outcomes are on main: SDK 57 dependency alignment; Redis runbook corrections; cryptography 50.0.2 with clean pip-audit; App Attest JS config plugin separated from runtime TS module under Node 22.
- PR #85 validated parent a964933d646338a4f80856ddc846735a1a63beaf passed Validation 43754312793, CodeQL 43754312748 and Dependency Review 43754312725. Backend/frontend/iOS jobs succeeded. One inline thread resolved; no human APPROVED review; reviewer tarlaci1984-sketch is requested.
- PR #96, #97, #99, #106, #107 and #108 all have terminal exact-head Validation, CodeQL and Dependency Review SUCCESS. #99 remains draft pending independent security review. #106 remains stacked on #97.
- PR #107 full npm audit reports 3 moderate / 0 high / 0 critical / 0 low. Keep all advisories visible; do not downgrade Expo or apply an untested major override.
- PR #90 current HEAD 01940599717eed35374b03b8b8ab2018aae0da19 adds unified loading/empty StatePanel integration. Validation 43757720829 and CodeQL 43757720826 are in progress; Dependency Review 43757720835 succeeded. No further write to that branch until exact-head Validation and CodeQL terminate.

### Release gates and operating constraints
- Repository remains public; inventory 78 branches / 38 open PRs / 5 open non-PR issues. Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable/unverified, not empty.
- Issue #74 body: 64 checklist boxes / 31 checked / 33 open. 25-point register: 2 Done / 15 In Progress / 8 Blocked.
- External blockers: owner visibility/plan decision; physical iPhone App Attest; Play-installed physical Android Play Integrity; production backup/restore witness; representative benchmark/business acceptance; production monitoring/alert delivery; staged rollout/rollback; real-user pilot/business sign-off.
- Release **NOT READY**; production/pilot acceptance **NOT GRANTED**. Do not use CI, emulator/simulator or documentation as a substitute for external acceptance.

## Latest verified operational release checkpoint — 2026-11-15 20:41 CET

This checkpoint supersedes earlier status summaries. Historical checkpoints remain below for audit traceability; they are not current state.

- **PR #41:** merged. Source branch `fix/release-blockers-2026-10` still points to reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and main are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Branch comparison: 517 ahead / 1 behind main. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded. Review: 52 conversation comments, 30 inline comments, 26 submissions (25 COMMENTED, one human APPROVED), 22/22 threads resolved; approver `tarlaci1984-sketch`.
- Three historical PR #41 runs remain queued on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks; owner/admin cancellation is optional cleanup.
- **PR #85:** current HEAD `64f42129f167fc34bb01a62e2f8573e69f9e8fb8`, 59 commits, 3 files (+3,854/-31), open/unmerged. Validation [43747770438](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770438), CodeQL [43747770429](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770429), Dependency Review [43747770432](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770432) all succeeded. Backend 450 tests / readiness 27 / production-security 78; frontend 289 tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke; iOS Release/simulator smoke. Runtime npm audit still has three moderate findings. One automated COMMENTED review, one resolved inline thread, no human APPROVED review; `tarlaci1984-sketch` remains requested.
- **PR #107:** current HEAD `431d96a31beb523be31c109d81c7009d49357318`, 4 commits, 3 files (+199/-0). Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all succeeded. Backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs passed. Frontend completed runtime npm audit, full dependency-tree audit and artifact upload. Artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989), SHA-256 `e3c3f430830bf6e0d987bb6d43ee96cca53d1cd4549ddf322af730adf1f3528a`, reports **3 moderate / 0 high / 0 critical** (`@expo/fingerprint`, `expo`, `minimatch`). Expo 52.0.49 is a breaking major downgrade and remains rejected. No dependency version, audit threshold or security gate was weakened. The P2 review thread is resolved; two COMMENTED submissions, no human approval.
- PR #90 accessibility, #99 DNS-rebinding SSRF, #106 Redis-py compatibility, #108 non-empty Vitest gate and #96 Copilot guidance each passed their own current exact-head Validation, CodeQL and Dependency Review. PR #99 still requires independent human security review; #106 tests redis-py 8.1 against Redis 7.4, not Redis server 8 production.
- Repository is public: 78 branches, 38 open PRs, 5 open non-PR issues. Main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` reports protected. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires one approval, stale-review dismissal, last-push approval, resolved threads and six strict checks; deletion/non-fast-forward are blocked and no bypass actors are configured. Issue #47 is closed (10 comments); issue #64 remains open (31 comments).
- GitHub Releases returns **0 published releases**. Code Scanning, Dependabot and Secret Scanning inventories remain **unavailable/unverified, not empty** through the connected integration.
- Register remains **2 Done / 15 In Progress / 8 Blocked**. Three moderate npm findings remain visible debt. Release **NOT READY**; production/pilot acceptance **NOT GRANTED**.
- External blockers remain #2 owner visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/tested rollback; #25 real-user pilot/business sign-off. CI/emulator/simulator evidence does not satisfy these gates.

## Latest verified operational release checkpoint — 2026-11-15 19:42 CET

This checkpoint records current exact-head observations as of 2026-11-15 19:42 CET. It is committed as a new child of validated PR #85 parent `ab0652e97dacaadafd43fcf04e41e26383fa77d1`; this child must pass its own Validation, CodeQL and Dependency Review. Parent checks are not inherited.

- Current main: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) remains unchanged. No main protection or required-check setting was changed.
- The 25-point release register is **2 Done / 15 In Progress / 8 Blocked**. Release is **NOT READY**; production/pilot acceptance is **NOT GRANTED**.
- PR #85 validated parent `ab0652e97dacaadafd43fcf04e41e26383fa77d1` passed Validation `43741911579`, CodeQL `43741911524`, and Dependency Review `43741911549`. This documentation refresh is a new child and must pass its own exact-head checks.
- PR #107 current HEAD `431d96a31beb523be31c109d81c7009d49357318`: CodeQL and Dependency Review succeeded; Validation remains in progress while Android/iOS native builds run. The full-tree audit has not yet run on this head.
- PR #108 no-empty-Vitest gate is 3/3 green. PR #99 SSRF transport is 3/3 green with 509 backend tests, 27 readiness checks and 78 production-security checks; independent human security review remains outstanding.
- PR #96 Copilot guidance has corrected USEIT scope/privacy wording at `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`; its Validation and CodeQL are still running. PR #102 is closed as superseded.
- Production continues to require shared Redis rate limiting on every worker/replica, including single-instance production; shared client timeout is 2s connect / 5s socket, and a temporary readiness client uses 2s / 2s and is closed after ping. The App Attest config plugin remains the JS `app.plugin.js` entrypoint, separate from runtime TypeScript `index.ts`.
- Do not treat CI, emulator/simulator, injected-network or documentation evidence as production acceptance. External gates remain production Apple/Google configuration and physical-device verification, witnessed backup/restore, monitoring/alert delivery, staged rollout/rollback approval, representative benchmark, and real-user pilot/business sign-off.
- The three moderate minimatch findings remain visible dependency debt. No forced major override, Expo downgrade, audit suppression, threshold reduction or test bypass is accepted.

## Latest verified release checkpoint — 2026-11-15 17:43 CET

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** This checkpoint supersedes the earlier 15:11 and 16:29 summaries. The exact PR #85 head below is the last validated parent before this documentation commit; this commit creates a new child whose own checks must run separately.

### Repository, governance and security inventory
- Repository visibility: **public**. Live inventory: **78 branches, 39 open PRs, 7 open non-PR issues, 0 published GitHub releases**. The releases API returned an empty array.
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads, and six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review)); deletion and non-fast-forward are blocked, bypass actors are empty, current-user bypass is never.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are **unavailable/unverified, not empty**. The connected GitHub read interface does not expose these alert endpoints.
- Full dependency-tree npm audit on PR #107 exact HEAD reports **3 moderate, 0 high, 0 critical**. The three moderate advisories involve `@expo/fingerprint`, `expo`, and `minimatch`; npm's suggested Expo 52.0.49 fix is a breaking major downgrade and is rejected for the SDK 57 baseline. No dependency version was changed, no audit was suppressed, and no global minimatch override was applied.

### PR #41 — merged application baseline
- PR #41 is merged. Source branch `fix/release-blockers-2026-10` still points to exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Comparison: 517 commits ahead / 1 behind main; 517 commits, 100 changed files, +11,887/-2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all **SUCCESS**. Backend, frontend, iOS, CodeQL Analyze, and Dependency Review jobs all succeeded.
- Review inventory: 108 combined timeline records = 52 conversation comments, 30 inline review comments, and 26 review submissions (25 COMMENTED, one human APPROVED). All **22/22 inline threads are resolved** (20 outdated). Human approval: `tarlaci1984-sketch`.

### PR #85 — release documentation
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, base `main`, branch `docs/post-merge-release-evidence-20261113`. Last validated exact HEAD before this checkpoint: `17b9d46f10d44d7005167d7d7a1d788cdca3a465`; 56 commits, 3 changed files, +3,671/-31.
- Validation [43730574442](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574442): **SUCCESS**. Backend [132861873928](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574442/job/132861873928): 450 tests, 27 readiness checks, 78 production-security checks. Frontend [132861873600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574442/job/132861873600): 289 tests across 59 files, Expo Doctor 21/21, Android Release build and emulator smoke passed; runtime npm audit still reports 3 moderate findings. iOS [132861873924](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574442/job/132861873924): iOS Release build and simulator smoke passed.
- CodeQL [43730574467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574467): **SUCCESS**. Dependency Review [43730574509](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574509): **SUCCESS**. All five jobs succeeded on this exact HEAD.
- PR #85 review timeline has 26 records (24 conversation comments, 1 inline review comment, 1 review submission); its 1 inline thread is resolved/outdated. The only review submission is automated COMMENTED; no human APPROVED review exists. `tarlaci1984-sketch` remains requested. Keep open/unmerged pending human approval and last-push approval.
- This checkpoint itself creates a new documentation child commit. Its own Validation, CodeQL and Dependency Review are **pending until GitHub creates and completes those runs**; the parent `17b9d46` results must not be attributed to the child.

### PR #107 — full dependency-tree audit and fail-closed report parser
- PR [#107](https://github.com/milanradics89-beep/POS-Doctor/pull/107) remains open/Draft at exact HEAD `6e0d24587466fc7da35ace3a4af7a044d266991a`, base `main`; 3 commits, 3 changed files, +195/-0.
- Validation [43730357960](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960): **SUCCESS**. Backend [132861221184](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960/job/132861221184): 450 tests, 27 readiness, 78 production-security checks. Frontend [132861220940](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960/job/132861220940): 296 tests across 60 files, Expo Doctor 21/21, Android Release/emulator smoke, iOS Release/simulator smoke, runtime audit, full dependency-tree audit and artifact upload succeeded. Full audit artifact [npm-full-audit-report](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960/artifacts/14168971891) records **3 moderate / 0 high / 0 critical**.
- CodeQL [43730357954](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357954) and Dependency Review [43730357937](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357937): **SUCCESS**. All five jobs passed on exact HEAD `6e0d245`.
- The parser hardening validates all five severity counters as non-negative safe integers, rejects malformed vulnerability entries/advisory lists and contradictory aggregate/package severity data, and has targeted regression coverage (7 tests in `scripts/npm-audit-report.test.mjs`). It does not change dependency versions or weaken the existing runtime high-severity gate. PR #107 has no submitted review or inline thread; reviewer `tarlaci1984-sketch` is requested.

### PR #90, #99 and #106
- PR #90 remains Draft at `49e1cf958a25cf8399e40b2495c8d96a67bd4d02`; Validation [43694475229](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475229), CodeQL [43694475198](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475198), and Dependency Review [43694475189](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475189) all **SUCCESS**. The StatePanel empty accessibility-hint fallback fix has regression coverage. Human design/accessibility approval remains pending.
- PR #99 remains Draft at `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`; Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), and Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448) all **SUCCESS**. Validation includes 509 backend tests, 27 readiness, 78 production-security, 289 frontend tests/59 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke. Same-host DNS-rebinding regression rejects private second answer `10.0.0.9` before a second TCP connection. Independent human review of the custom HTTPX/httpcore transport remains outstanding; issue #64 stays open.
- PR #106 remains Draft at `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`, stacked on PR #97; Validation [43705947653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947653), CodeQL [43705947633](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947633), and Dependency Review [43705947631](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947631) all **SUCCESS**. This validates redis-py 8.1 against Redis 7.4, not a Redis server 8 production migration. Human review remains pending.

### Issues and release acceptance
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed (10 comments) after direct verification of main protection. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open (30 comments) pending independent SSRF security review. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open (25 comments) for security capability/alert-inventory access.
- **Authoritative 25-point register: 2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. In Progress: #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. No status was promoted solely because CI passed.
- External gates remain blocked: final repository visibility/plan decision; physical iPhone App Attest production entitlement; Play-installed physical Android Play Integrity; owner-authorized production cloud/configuration; witnessed production backup/restore; representative product-recognition benchmark/business acceptance; production monitoring and verified alert delivery; staged rollout/rollback approval; real-user pilot and business sign-off.
- **Release NOT READY. Production/pilot acceptance NOT GRANTED.** Simulator/emulator tests and automated CI are not physical-device, production, witnessed recovery, rollout or business acceptance.


---

## Superseded checkpoint — 2026-11-15 15:11 CET

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** This checkpoint supersedes the 14:16 CET snapshot. Older dated checkpoints are historical.

### Repository, governance and release inventory
- Repository is public; latest inventory: 77 branches, 38 open PRs, 7 open non-PR issues, and 0 published GitHub releases.
- Main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` is protected by active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward blocked, and no bypass actors.
- Complete Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration. They remain **unverified, not empty**.
- Runtime npm audit retains **three moderate** `GHSA-g3hv-75wg-m249` findings through `@expo/fingerprint@0.20.16` / `minimatch@10.2.6`. Expo's upstream compatibility assessment retains minimatch 10 for fingerprint-ignore semantics; this is scoped context, not a clean audit. No forced override, audit suppression, or Expo downgrade was applied.

### PR #41 — merged application baseline
- PR #41 is merged. Source branch `fix/release-blockers-2026-10` and exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch ref was re-read and matches the PR HEAD. PR metadata: 517 commits, 100 files, +11,887/-2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all **SUCCESS**. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs all completed successfully.
- Review inventory: 108 combined timeline records, 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, one human APPROVED), and 22/22 review threads resolved. Human approval: `tarlaci1984-sketch`.

### PR #85 — current release-documentation HEAD
- PR #85 is open, non-draft, unmerged, base `main`, branch `docs/post-merge-release-evidence-20261113`; exact HEAD `d570412723df8b2194107b12bf05f3ee70716e71`, 54 commits, 3 changed files (+3,557/-31).
- Exact-head Validation [43718569225](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43718569225): **SUCCESS**; backend, frontend/Android, and iOS jobs all completed successfully.
- Exact-head CodeQL [43718569238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43718569238): **SUCCESS**; analyze job completed successfully.
- Exact-head Dependency Review [43718569236](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43718569236): **SUCCESS**; dependency-review job completed successfully.
- These are the current `d570412` child's own terminal-success runs. All five jobs (backend, frontend/Android, iOS, CodeQL Analyze, Dependency Review) passed; no parent-commit results are substituted.
- PR #85 review inventory: 24 combined timeline records (22 conversation comments, 1 inline review comment, 1 review submission); 1/1 inline review thread resolved. The only review submission is an automated COMMENTED review; no human APPROVED review exists. Reviewer `tarlaci1984-sketch` remains requested. Keep open and unmerged until human approval and last-push approval are satisfied.
- The exact-head Validation reran backend, frontend/Android and iOS successfully. The three moderate minimatch findings remain visible; a high-severity audit threshold does not make npm audit clean.

### PR #90 — accessibility/design
- PR #90 remains open/Draft at `49e1cf958a25cf8399e40b2495c8d96a67bd4d02`. Exact-head Validation [43694475229](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475229), CodeQL [43694475198](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475198), and Dependency Review [43694475189](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475189): all **SUCCESS**. Backend, frontend, iOS, analyze and dependency-review jobs all passed.
- The `StatePanel` empty accessibility-hint fallback is fixed with regression coverage. No human review submission or inline review thread is recorded; design/accessibility approval remains pending.

### PR #99 — SSRF/DNS rebinding
- PR #99 remains open/Draft at `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`. Exact-head Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), and Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448): all **SUCCESS**. Backend, frontend, iOS, analyze and dependency-review jobs all passed.
- Validation evidence: 509 backend tests, 27 readiness checks, 78 production-security checks, 289 frontend tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release/simulator smoke. The same-host DNS-rebinding regression changes the resolver answer from public `8.8.8.8` to private `10.0.0.9` and verifies rejection before a second TCP connection.
- PR #99 remains Draft/unmerged with no human review submission or inline thread. Reviewer `tarlaci1984-sketch` is requested. Issue #64 remains open with 27 comments; independent human review of the custom HTTPX/httpcore transport and compatibility boundary is still required.

### Issues and acceptance risks
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed after live main-protection verification. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open with 26 comments pending independent SSRF security review. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open for security capability/alert-inventory access.
### Authoritative 25-point register
- **Done (2):** #1 iOS CI closure; #6 Redis multi-instance concurrency.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 final owner visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business sign-off.
- The canonical 25-row table remains the row-level source of truth. Historical **3 Done / 15 In Progress / 7 Blocked** totals in older dated snapshots are superseded pre-reopen states; the current distribution is **2 / 15 / 8**.
- CI, CodeQL, Dependency Review, simulator/emulator and injected-network tests do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot or business-approval gates. **Release NOT READY; production/pilot acceptance NOT GRANTED.**

### External acceptance requirements still blocked
- **#2 Repository visibility/plan:** permanent public/private and plan decision remains owner-controlled, despite the currently active main ruleset.
- **#4 Apple App Attest:** production App ID/capability and provisioning entitlement, signed production build, provider-backed enrollment/assertion on a supported physical iPhone.
- **#5 Play Integrity:** Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play.
- **Production cloud/configuration:** owner-authorized production console access, secrets/provider identity, ingress/CORS, live Redis TLS/ACL/sysctl, host hardening and production configuration evidence.
- **#16 Backup/restore:** witnessed production datastore/Redis recovery drill with measured RPO/RTO.
- **#18 Product accuracy:** representative labelled benchmark, agreed metrics, human evaluation and business acceptance.
- **#21 Monitoring:** production metrics/log pipeline, named on-call owner, thresholds and verified alert delivery/acknowledgement.
- **#22 Rollout:** approved staged rollout gates, monitoring thresholds, named rollback owner and tested rollback.
- **#25 Pilot:** real-user cohort, safeguards, measured acceptance criteria and business sign-off.
- Human review remains outstanding for PR #85 release documentation, PR #90 design/accessibility, and PR #99 independent security acceptance.

## Superseded checkpoint — 2026-11-15 06:12 CET

## Superseded exact-head release checkpoint — 2026-11-15 04:58 CET

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** This checkpoint supersedes the 04:00 CET checkpoint below. Historical checkpoints are retained for traceability and are not current status.

### Repository and governance
- Repository visibility is public (owner's final public/private decision remains outstanding). Current inventory: **74 branches / 38 open PRs / 7 open issues**.
- Current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; branch metadata reports `protected:true`.
- Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active and unchanged: PR required, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified through the connected integration; they are not represented as zero.

### PR #85 — current exact HEAD fully validated
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, base `main`, branch `docs/post-merge-release-evidence-20261113`.
- Current exact HEAD: `a54347d204ede8d5eebfeceaf38ca703397ead4c`; its parent is `520b131b79406008ad83d149b577fa07026711a8`.
- Validation [43675205917](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205917): **SUCCESS**. Backend [132693715332](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205917/job/132693715332): **450 tests / 27 readiness / 78 production-security** passed; cryptography 50.0.2; pip-audit clean. Frontend [132693715703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205917/job/132693715703): **289/289 tests across 59 files**, Expo Doctor **21/21**, Android Release build and emulator install/launch smoke passed. Its runtime audit still reports **3 moderate minimatch findings** (GHSA-g3hv-75wg-m249); the workflow uses `npm audit --omit=dev --audit-level=high`, so the moderate findings remain visible rather than treated as clean. iOS [132693715552](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205917/job/132693715552): iOS Release build and simulator install/launch smoke passed.
- CodeQL [43675205929](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205929): **SUCCESS**; Analyze job [132693715289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205929/job/132693715289) completed successfully.
- Dependency Review [43675205951](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43675205951): **SUCCESS**.
- Frontend runtime npm audit still reports **3 moderate** minimatch findings (GHSA-g3hv-75wg-m249). This is visible dependency debt, not a clean npm audit; no forced override, audit suppression, or Expo downgrade was applied.
- PR #85 review inventory: one automated Codex COMMENTED review; the P2 status-tally thread is now **resolved/outdated**; no human APPROVED review is recorded and `tarlaci1984-sketch` remains requested. Keep open and unmerged until human approval and last-push approval are satisfied.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains open/draft, base `main`, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh post-retarget Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), and Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204) all succeeded.
- Validation: 508 backend tests, 27 readiness, 78 production-security; 289 frontend tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke and iOS Release/simulator smoke passed. HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit clean.
- Real HTTPX/httpcore tests cover numeric-IP TCP pinning, peer verification before TLS/request bytes, original Host/TLS SNI preservation, fresh DNS resolution at every redirect hop, DNS-rebinding rejection before the next TCP connection, non-global/transition/multicast address rejection, and bounded DNS/connect time.
- PR #99 has no human review submission and no inline review thread. `tarlaci1984-sketch` is requested but has not submitted an independent security review. Keep issue #64 OPEN until that review accepts the private HTTPX/httpcore pool integration and compatibility boundary. CI is not human security approval or production acceptance.

### Historical priority PRs and dependency coordination
- PR #41 is merged. **22/22** inline review threads are resolved and one human APPROVED review is recorded. Both Redis runbook P2 fixes are present on main.
- PR #65 is closed unmerged; its SDK 57 package/lockfile alignment matches main, and its Redis runbook corrections are present on main.
- PR #67 and #69 are closed unmerged/superseded. Their old App Attest fixture/npm audit failures are historical, not current-main failures.
- PR #68 is closed unmerged; its historical backend log recorded 177 passing tests, cryptography 50.0.2 and clean pip-audit. JavaScript minimatch findings are separate from Python cryptography.
- Main's App Attest configuration plugin remains CommonJS `modules/useit-app-attest/app.plugin.js`, separate from runtime TypeScript `modules/useit-app-attest/index.ts`; Node 22 prebuild regression coverage is present.
- Main's Redis runbook blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540` records the two P2 corrections: shared Redis client 2s connect / 5s socket timeout without closing it; temporary readiness client 2s / 2s and closed after ping; Redis-backed rate limiting is mandatory in every production deployment, including single-instance deployments.
- PR #12's broader `httpx>=0.28.1,<1` proposal must not be integrated independently: PR #99's tested custom transport is bounded to HTTPX 0.28.x / httpcore 1.0.x.
- PR #8's Vitest 5.0.0 proposal is stale and would downgrade main's Vitest 5.1.0; its historical Validation and Dependency Review failed. PR #31's Expo Image Picker 58.0.0 is incompatible with the current SDK 57 line; its Expo Doctor reported 20/21. Neither major upgrade is accepted without current-base migration tests.

### Minimatch security remediation candidate
- Main runtime audit reports **3 moderate** GHSA-g3hv-75wg-m249 findings through `@expo/fingerprint@0.20.16`, which declares `minimatch: ^10.2.6`; main currently resolves root minimatch 10.2.6. The npm force-fix proposes an Expo 52 downgrade and is rejected.
- Main runtime audit reports **3 moderate** GHSA-g3hv-75wg-m249 findings through `@expo/fingerprint@0.20.16`, which declares `minimatch: ^10.2.6`; main resolves minimatch 10.2.6. The suggested `npm audit fix --force` would downgrade Expo to 52 and remains rejected.
- Draft [PR #104](https://github.com/milanradics89-beep/POS-Doctor/pull/104) is based on main and uses branch `security/minimatch-11-override-mainline-20261114`, current exact HEAD `e1db1b695cce0f83043c29607b4ef399598a5746`. It carries the minimatch 11.0.5 override, lockfile update, direct migration tests and a new real `@expo/fingerprint.createFingerprintAsync` integration regression. The override remains outside the upstream `^10.2.6` range and is not accepted yet.
- Parent candidate HEAD `6428924ebdc339683d8ae9a19671435a9c179273` passed all three exact-head workflows: Validation [43585751528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43585751528), CodeQL [43585751472](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43585751472), and Dependency Review [43585751665](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43585751665). Validation passed 450 backend tests, 27 readiness checks, 78 production-security checks, 289 frontend tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke and iOS Release/simulator smoke; `npm audit --omit=dev --audit-level=high` reported 0 production-tree vulnerabilities.
- New PR #104 exact-head runs for `e1db1b695cce0f83043c29607b4ef399598a5746` are queued: Validation [43680099350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680099350), CodeQL [43680099395](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680099395), Dependency Review [43680099396](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680099396). The branch is frozen until these exact-head checks finish. Full dependency-tree audit and independent human compatibility review remain required.

### Stale Actions and release discipline
- Three obsolete runs remain queued on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255), Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284). Their job lists are empty. The connected integration cannot cancel them; owner/admin must inspect and cancel them if appropriate.
- Preserve [Issue #74](https://github.com/milanradics89-beep/POS-Doctor/issues/74): **64 checklist boxes / 26 checked / 38 open**. Preserve the 25-point release register at **2 Done / 15 In Progress / 8 Blocked**. No checkbox is advanced by this checkpoint.
- Physical iPhone App Attest, Play-installed Android Play Integrity, witnessed production backup/restore, production monitoring/alert delivery, staged rollout/rollback, representative benchmark/business acceptance, and real-user pilot remain blocked on external evidence or human decisions.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** No merge or external acceptance is implied by these CI results.


### Redis production readiness — verified main behavior
- Production must use shared Redis-backed rate limiting even for a single backend instance. Memory mode is only for local development/tests.
- The normal application-scoped Redis client uses a 2-second connect timeout and 5-second socket timeout; readiness reuses it and must not close it.
- Only the isolated fallback readiness probe uses 2-second connect and 2-second socket timeouts; it must be closed after the ping.
- Redis unavailability fails closed. These source/runbook facts do not prove the production Redis endpoint, TLS, ACL, host sysctl, or monitoring configuration; those require environment evidence.

## Verified exact-head release checkpoint — 2026-11-15 04:00 CET

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** This checkpoint supersedes the 03:06 CET live-state checkpoint below; historical records are retained.

### Repository and governance
- Repository is public temporarily. Current inventory: **74 branches / 38 open PRs / 7 open non-PR issues**.
- `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; branch metadata reports `protected:true`.
- Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active: PR required, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors. No protection setting was changed.
- Security alert inventories remain unavailable/unverified through the connected integration; they are not represented as zero.

### PR #85 — exact current parent fully validated
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, base `main`, branch `docs/post-merge-release-evidence-20261113`.
- Exact HEAD/validated parent: `62ca6e57c2904af07cbb03c934f9bbe3501ccd00`.
- Validation [43666465504](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465504): **SUCCESS**. Backend job [132666837408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465504/job/132666837408), frontend job [132666837160](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465504/job/132666837160), and iOS job [132666837359](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465504/job/132666837359) all **SUCCESS**.
- Backend log: **450 passed**, readiness **27 passed**, production-security **78 passed**; cryptography **50.0.2**; pip-audit: **No known vulnerabilities found**. One non-fatal Starlette TestClient/httpx deprecation warning remains.
- Frontend log: **59/59 test files passed**; typecheck, pinned Expo Doctor step, Android export, native Android Release build, Android emulator install/launch smoke and runtime dependency audit completed. Runtime npm audit still reports **3 moderate minimatch** findings (GHSA-g3hv-75wg-m249); the job passes but the dependency debt remains visible.
- iOS log: CocoaPods, native iOS Release build and simulator install/launch smoke completed successfully.
- CodeQL [43666465396](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465396): **SUCCESS**, Analyze job [132666837024](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465396/job/132666837024) successfully uploaded SARIF and completed analysis. A non-fatal SARIF column-kind mismatch warning was emitted.
- Dependency Review [43666465427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43666465427): **SUCCESS**.
- PR #85 has an automated COMMENTED review only. Reviewer `tarlaci1984-sketch` is requested; **no human APPROVED review** is recorded. Do not merge automatically.
- This checkpoint is a documentation-only child of the validated parent above. The new child must receive its own exact-head Validation, CodeQL and Dependency Review; parent checks are not reused as child evidence.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains open/draft, unmerged, base `main`, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh post-retarget Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), and Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204) all succeeded.
- The real HTTPX/httpcore transport tests cover validated-IP TCP pinning, peer verification before TLS/request bytes, original Host/TLS SNI preservation, DNS re-resolution and pinning at every redirect hop, rebinding rejection, non-global/transition/multicast addresses, and bounded DNS/connect time.
- Resolved versions: HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit clean.
- The custom transport uses constrained HTTPX/httpcore pool internals. Compatibility is bounded to HTTPX 0.28.x and httpcore 1.0.x. No human review has been submitted; reviewer `tarlaci1984-sketch` is requested. Keep PR #99 and issue #64 open until independent human security review accepts the private-pool integration and compatibility boundary.

### Historical priority PR reconciliation
- PR #41 is merged. **22/22** inline review threads are resolved; one human APPROVED review by `tarlaci1984-sketch` is recorded. Both Redis runbook P2 fixes are present on main.
- PR #65 is closed unmerged. SDK 57 package/lockfile alignment is present on main; Redis readiness and production rate-limit requirements are documented.
- PR #67 and #69 are closed unmerged/superseded; their historical App Attest fixture and old lockfile npm audit failures are not current-main failures.
- PR #68 is closed unmerged; its historical exact-head validation recorded 177 backend tests, cryptography 50.0.2 and clean pip-audit. Its three moderate frontend npm findings are distinct from Python cryptography.
- Main retains the CommonJS config plugin `modules/useit-app-attest/app.plugin.js` separately from runtime TypeScript `modules/useit-app-attest/index.ts`; Node 22 Expo prebuild regression coverage remains on main.

### Actions queue and release discipline
- Three obsolete runs remain queued on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` on obsolete `fix/release-blockers-2026-10`: CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255), Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284). Their job lists are empty; they are not current release evidence. The connected integration cannot cancel runs; owner/admin must inspect and cancel them if appropriate.
- Preserve the canonical [Issue #74](https://github.com/milanradics89-beep/POS-Doctor/issues/74): **64 checklist boxes / 26 checked / 38 open**. The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. No checkbox is advanced by this checkpoint.
- Physical iPhone App Attest, Play-installed physical Android Play Integrity, witnessed production backup/restore, production monitoring and alert delivery, staged rollout/rollback approval, representative benchmark/business acceptance, and real-user pilot remain blocked on external evidence or human decisions.

### Operational release gates
- Do not interpret successful CI, simulator smoke, or source-level transport tests as physical-device or production acceptance.
- Before release: obtain physical iPhone App Attest and Play-installed Android Play Integrity evidence; witness production backup/restore; verify monitoring and alert delivery; obtain staged rollout/rollback approval; complete representative benchmark and business acceptance; then run and record the real-user pilot.
- Maintain Redis-backed rate limiting for every production deployment, including single-instance production. Shared readiness uses the application Redis client (2s connect / 5s socket) without closing it; an isolated readiness probe uses 2s / 2s and is closed after ping.
- Keep HTTPX/httpcore constrained to the tested compatibility range until the independent reviewer approves the custom pinned transport and a future migration has transport-level regression tests.

## Live repository checkpoint — 2026-11-15 03:06 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes earlier live-state snapshots below. Historical entries remain for traceability. The exact parent/child distinction below is deliberate: the PR #85 checks cited here validate the parent SHA, not the documentation child that contains this checkpoint.

### Repository and governance
- Repository visibility: **public**. Current inventory: **74 branches**, **38 open PRs**, **7 open issues**.
- Default branch `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; branch metadata reports `protected:true`.
- Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): pull request required, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors. No protection setting was changed.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified through the current integration; no zero-alert claim is made.

### PR #85 — exact-head parent validation and documentation correction
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, base `main`, branch `docs/post-merge-release-evidence-20261113`.
- Last fully validated parent before this documentation refresh: `215de3523d021113816b154cbc1a7b48a7e89249`.
- Parent exact-head Validation [43661572653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572653) completed **SUCCESS**. Backend job [132651837228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572653/job/132651837228), frontend job [132651837071](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572653/job/132651837071), and iOS job [132651837212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572653/job/132651837212) all completed successfully. Backend compile, tests, readiness and dependency-audit steps passed. Frontend typecheck, unit tests, Expo Doctor, Android export, native Android Release build, emulator install/launch smoke and runtime dependency audit passed. iOS native project generation, CocoaPods, Release build and simulator install/launch smoke passed.
- Parent exact-head CodeQL [43661572660](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572660) completed **SUCCESS**; Analyze job [132651836975](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572660/job/132651836975) succeeded. Dependency Review [43661572676](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43661572676) completed **SUCCESS**.
- The runtime npm audit still reports **3 moderate minimatch** findings (GHSA-g3hv-75wg-m249) through Expo fingerprint tooling. No forced major override, Expo downgrade, audit suppression, or test weakening was applied.
- PR #85 has one automated COMMENTED review and one resolved/outdated P2 status-tally thread. Reviewer `tarlaci1984-sketch` is requested; **no human APPROVED review** is recorded. Do not merge automatically.
- This checkpoint is a documentation-only child of the validated parent above. The child must receive its own exact-head Validation, CodeQL and Dependency Review; do not reuse the parent's runs as child evidence.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains open/draft, unmerged, base `main`, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh post-retarget exact-head Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), and Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204) all completed **SUCCESS**. Validation records 508 backend tests, 27 readiness checks, 78 production-security checks, 289 frontend tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke and iOS Release/simulator smoke. HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit clean.
- Deterministic tests exercise the actual HTTPX/httpcore TCP/TLS path: validated numeric-IP dialing, connected-peer verification before TLS/request bytes, original Host and TLS SNI preservation, fresh DNS resolution and pinning for every redirect hop, and rejection of private DNS rebinding before the next TCP connection. Non-global, transition, multicast and mixed DNS answers, plus bounded DNS/connect time, are covered.
- The custom transport relies on constrained HTTPX/httpcore pool internals; compatibility remains bounded to HTTPX 0.28.x and httpcore 1.0.x. PR #99 has no submitted human review and no inline review thread. Reviewer `tarlaci1984-sketch` is requested. Keep PR #99 draft and [issue #64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open until independent human security review accepts the private-pool integration and compatibility boundary. CI is not human approval or production acceptance.

### Historical priority PR reconciliation
- [PR #41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is merged at main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. All **22/22** inline review threads are resolved and one human APPROVED review by `tarlaci1984-sketch` is recorded. Both Redis runbook P2 fixes are present on main.
- PR #65 is closed unmerged. Its package and lockfile are aligned with main; its exact-head Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754) all succeeded. The shared Redis readiness client uses 2s connect/5s socket timeout without closing the shared client; the temporary probe uses 2s/2s and is closed after ping; Redis rate limiting is mandatory in every production deployment, including single-instance deployments.
- PR #67 is closed unmerged; its historical Validation failed on stale App Attest fixtures. PR #68 is closed unmerged; its exact-head Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), and Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) all succeeded. Its backend recorded 177 tests, cryptography 50.0.2 and clean pip-audit. Its three moderate frontend minimatch findings are separate from Python cryptography.
- PR #69 is closed unmerged/superseded. Main separates CommonJS `modules/useit-app-attest/app.plugin.js` from runtime TypeScript `modules/useit-app-attest/index.ts`; Node 22 workflow/prebuild regressions are covered. The old #67/#69 failures are not current-main failures.

### Other active development PRs and dependency gates
- PR #96 exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`: Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) all succeeded; open/draft on main.
- PR #102 exact HEAD `1dce62ad4907b096a32d76785cf1e695f0f7bb71`: Validation [43605416452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416452), CodeQL [43605416392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416392), Dependency Review [43605416335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416335) all succeeded; open/draft stacked on #96.
- PR #90 exact HEAD `634a05636aa527eec58fec344240f9a9d3fd1402`: Validation [43603193547](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193547), CodeQL [43603193541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193541), Dependency Review [43603193557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193557) all succeeded; open/draft on main.
- PR #100 exact HEAD `a91434c1669ad159fa50fd3526b6594f2c2f8ebd`: Validation [43624487754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487754), CodeQL [43624487717](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487717), Dependency Review [43624487726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487726) all succeeded; open/draft stacked on #90.
- PR #97 exact HEAD `6212c217e700e6cf263d6f98e0481af4888c3fa4`: Validation [43600898776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898776), CodeQL [43600898781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898781), Dependency Review [43600898787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898787) all succeeded; open/draft on main.
- PR #81 remains an audit-only draft based on the closed #65 remediation branch, not current main. PR #8 (Vitest 5) and PR #31 (Expo Image Picker 58) have exact-head Validation and Dependency Review failures; their base SHAs are behind current main. Do not accept either major upgrade without current-base migration tests. The current SDK 57 line is not to be downgraded or bypassed.

### GitHub Actions queue and release dependencies
- Three obsolete runs remain **queued** since 2026-11-11 20:48:34 UTC on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` on obsolete `fix/release-blockers-2026-10`: CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255), Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284). They are not current main or current PR evidence. The connected integration has no cancel-run action; owner/admin must inspect and cancel them if appropriate.
- The canonical [Issue #74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) remains **64 checklist points / 26 checked / 38 open**. The 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**; the 25 row statuses were independently recounted and match that tally. No checkbox is advanced by this checkpoint.
- External gates remain blocked pending actual evidence: physical iPhone App Attest, Play-installed physical Android Play Integrity, production backup/restore, monitoring and alert delivery, staged rollout/rollback, real-user pilot and business approval. **Release NOT READY; production/pilot acceptance NOT GRANTED.**

---

## Live repository checkpoint — 2026-11-15 02:04 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes earlier “current” snapshots below. Historical entries remain for traceability; use the exact SHAs and run IDs in this section for the current state.

### Repository and governance
- Repository visibility: **public**; default branch `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Inventory at this refresh: **74 branches**, **38 open PRs**, **7 open issues**.
- Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): PR required, one approving review, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors. No protection setting was changed.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified through the current integration; no zero-alert claim is made.

### PR #85 — current release-documentation HEAD and exact-head CI
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, **non-draft**, unmerged, base `main`, exact HEAD `ce60642090f9ca29dfcbcadd3b1b2f2527a18d11` on `docs/post-merge-release-evidence-20261113`.
- Exact-head Validation [43657634423](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634423), CodeQL [43657634373](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634373), and Dependency Review [43657634357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634357) are all **SUCCESS**. All three run records identify this exact source SHA.
- Validation backend job [132639625450](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634423/job/132639625450): **450 backend tests, 27 readiness checks and 78 production-security checks passed**; cryptography 50.0.2; pip-audit reported no known vulnerabilities. A non-fatal Starlette TestClient/httpx deprecation warning remains.
- Validation frontend job [132639625652](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634423/job/132639625652): **289/289 tests across 59 files**, Expo Doctor **21/21**, Android Release build and emulator install/launch smoke succeeded. Runtime npm audit still reports **3 moderate minimatch** findings (GHSA-g3hv-75wg-m249) through Expo fingerprint tooling; no forced major override or Expo downgrade was applied.
- Validation iOS job [132639625574](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634423/job/132639625574): iOS Release build and simulator install/launch smoke succeeded.
- CodeQL Analyze job [132639625125](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43657634373/job/132639625125) completed successfully. Dependency Review succeeded on this documentation-only diff; it does not replace a full dependency inventory.
- PR #85 has one automated COMMENTED review, one resolved/outdated P2 status-tally thread, and **no human APPROVED review**. Reviewer `tarlaci1984-sketch` is requested. Do not merge automatically.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains open/draft, unmerged, base `main`, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh post-retarget exact-head Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), and Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204) all **SUCCESS**. Validation: 508 backend tests, 27 readiness, 78 production-security; 289 frontend tests, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed. HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit clean.
- Tests exercise real HTTPX/httpcore TCP/TLS peer pinning, original Host/TLS SNI preservation, redirect-hop DNS re-resolution and rebinding rejection before a second TCP connection, non-global/transition/multicast address rejection, and bounded DNS/connect time. The custom transport depends on constrained HTTPX/httpcore internals; compatibility remains bounded to HTTPX 0.28.x and httpcore 1.0.x.
- PR #99 has **no submitted human review and no inline review thread**. Reviewer `tarlaci1984-sketch` is requested. Keep PR #99 draft and [issue #64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open until independent human security review accepts the private-pool integration and compatibility boundary. CI is not human approval or production acceptance.

### Historical priority PR reconciliation
- [PR #41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is merged. Its 22/22 inline review threads are resolved and one human APPROVED review is recorded. Both Redis runbook P2 fixes are present on main.
- PR #65 is closed unmerged. Its SDK 57 package/lockfile alignment is present on main; the two Redis runbook corrections are present in main.
- PRs #67, #68 and #69 are closed unmerged/superseded. Their old App Attest fixture failures and historical npm audit results are not current-main failures. PR #68's historical backend log recorded 177 passing tests, cryptography 50.0.2 and a clean pip-audit; JavaScript minimatch findings are separate from Python cryptography.
- PR #81 is an open/draft full-tree npm audit child based on the closed #65 remediation branch, not directly on current main. Do not treat its base as the current release baseline without rebasing and rerunning its audit.

### GitHub Actions queue and release dependencies
- Three obsolete runs remain **queued** since 2026-11-11 20:48:34 UTC on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255), and Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284). They are on obsolete `fix/release-blockers-2026-10`, not current main or the active #85/#99 heads. The current connector has no workflow-cancel action; owner/admin must inspect and cancel them if appropriate.
- The 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. The canonical [Issue #74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) remains **64 checklist points / 26 checked / 38 open**. No checkbox is advanced by this checkpoint.
- External gates remain blocked pending actual evidence: physical iPhone App Attest, Play-installed physical Android Play Integrity, production backup/restore, monitoring and alert delivery, staged rollout/rollback, real-user pilot and business approval. **Release NOT READY; production/pilot acceptance NOT GRANTED.**

---

## Verified repository checkpoint — 2026-11-15 01:16 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes earlier inventory and workflow snapshots below. Historical entries are retained for traceability and must not be read as current status.

### Repository and governance
- Repository visibility: **public**. Branch search returned **74 branches** (the follow-up cursor query returned no additional entries); live search returned **38 open PRs** and **7 open issues**. GitHub Releases API returned **0 published releases**.
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Branch metadata reports `protected:true`. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is directly readable and `active`: PR required, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors. The legacy branch-protection detail endpoint is not readable to the integration; no protection setting was changed.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not zero**. No zero-alert claim is made.

### PR #41 and release remediation
- [PR #41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is merged; merge commit/current main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. All **22/22** inline review threads are resolved. Review inventory contains **26** submissions: 25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`. Both Redis runbook P2 fixes are present on main: shared Redis readiness client 2s connect/5s socket without closing the shared client; temporary probe client 2s/2s and closed after ping; Redis rate limiting is mandatory in every production deployment, including single-instance deployments.
- PR #65 is closed unmerged. Its package-lock blob SHA `2bccc4107db8e2b4ac638215328677761d34374a` is identical to main. Main's Expo SDK 57 package alignment and the Redis runbook corrections are verified. PR #67, #68 and #69 are historical/closed unmerged; their old branch failures are not current-main results. PR #68 historical backend result was 177 passed, cryptography 50.0.2, pip-audit clean. Main separates CommonJS `modules/useit-app-attest/app.plugin.js` from runtime TypeScript `modules/useit-app-attest/index.ts`; Node 22 validation uses the pinned project-local Expo Doctor CLI and the workflow-contract regression tests.

### PR #85 — current release-documentation HEAD
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, base `main`, exact HEAD `b200f15b4a0320ad0127fa29cf9ba767b7621258`.
- Exact-head Validation [43655253536](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253536), CodeQL [43655253598](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253598), and Dependency Review [43655253594](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253594) all **SUCCESS**. Run metadata confirms all three use this exact HEAD.
- Validation backend job [132632240668](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253536): **450 backend tests, 27 readiness checks, 78 production-security checks** passed; cryptography 50.0.2; pip-audit clean. Frontend job [132632240411](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253536): typecheck, unit tests, pinned Expo Doctor, Android export, Android Release build, emulator smoke and runtime audit passed. iOS job [132632240579](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43655253536): CocoaPods, Release build and simulator smoke passed. Expo Doctor 21/21; frontend 289 tests across 59 files.
- Runtime npm audit still reports **3 moderate minimatch** findings through Expo fingerprint tooling; no high-or-higher finding at the configured threshold. No forced major override or Expo downgrade.
- One inline P2 status-tally thread is resolved. The only submitted PR #85 review is automated COMMENTED; human reviewer `tarlaci1984-sketch` is requested but has not submitted APPROVED. No merge or release acceptance is claimed.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains open/draft, base `main`, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh **post-retarget** exact-head Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), and Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204) all **SUCCESS**. These runs were created 2026-11-14 22:08:30 UTC, after the base changed to main at 16:20:47 UTC. Validation passed 508 backend tests, 27 readiness checks, 78 production-security checks, frontend/Android Release/emulator smoke, and iOS Release/simulator smoke. HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit clean.
- Tests exercise real HTTPX/httpcore TCP/TLS peer pinning, original Host/TLS SNI preservation, redirect-hop DNS re-resolution and private-answer rebinding rejection before a second TCP connection, non-global/transition/multicast address rejection, and bounded DNS/connect time. The custom transport uses private HTTPX pool internals; compatibility remains deliberately bounded to HTTPX 0.28.x and httpcore 1.0.x.
- PR #99 has no submitted human review or inline review thread; `tarlaci1984-sketch` is requested. Keep PR #99 draft and issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open until an independent human security review accepts the private-pool integration and compatibility bounds. CI success is not human approval or production security acceptance.

### Other current PRs and Actions
- PR #96 exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`: Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) all SUCCESS; draft, no review submission.
- PR #102 exact HEAD `1dce62ad4907b096a32d76785cf1e695f0f7bb71`: Validation [43605416452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416452), CodeQL [43605416392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416392), Dependency Review [43605416335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416335) all SUCCESS; draft, stacked on #96 and must not merge independently.
- PR #100 exact HEAD `a91434c1669ad159fa50fd3526b6594f2c2f8ebd`: Validation [43624487754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487754), CodeQL [43624487717](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487717), Dependency Review [43624487726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487726) all SUCCESS; draft, stacked on #90.
- Three stale queued Actions runs remain since 2026-11-11 20:48:34 UTC on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255), Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284). Their jobs endpoints return no jobs/404; these are not current release evidence. The connected integration has no cancel-run action; owner/admin action is required to inspect and cancel them if appropriate.
- Issue #84 remains open for the owner's final visibility/plan decision and complete security-alert inventory. PR #87's CodeQL SARIF upload and Dependency Review recovery are successful. Issue #103 remains open only for independent human security review after the corrected #99 CI; the old #95 failure is historical.

### Checklist and release acceptance
- The canonical [Issue #74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) contains **64** checklist boxes: **26 checked / 38 open**. No checkbox is advanced in this checkpoint.
- The 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. Three moderate minimatch findings remain visible dependency debt. No forced upgrade, downgrade, audit suppression, test deletion, skip or xfail was used.
- Release remains **NOT READY**; production/pilot acceptance remains **NOT GRANTED**. Physical iPhone App Attest, Play-installed physical Android Play Integrity, witnessed production backup/restore, production monitoring and alert delivery, staged rollout/rollback, representative benchmark/business acceptance, and real-user pilot/business approval remain external or human-owned gates.

### Release execution controls
1. Do not merge PR #85 or #99 automatically. Obtain the required human approval and last-push approval, then recheck the exact merge candidate and all required checks.
2. Keep the three stale queued runs isolated from current acceptance evidence. Owner/admin must inspect them in GitHub Actions; do not rerun or cancel unrelated jobs blindly.
3. Before production, verify Apple App Attest and Google Play Integrity using production identifiers/credentials and supported physical devices; verify shared Redis persistence and fail-closed behavior.
4. Require witnessed backup/restore, alert delivery and on-call ownership, staged rollout and rollback rehearsal, and explicit business pilot approval. Record evidence and timestamps in the release register.
5. Keep HTTPX/httpcore pinned to the tested compatibility range until the custom transport is migrated away from private pool internals with transport-level regression coverage.

---

## Verified repository checkpoint — 2026-11-15 00:47 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes older inventory and workflow snapshots below. Historical checkpoints remain for traceability; their statuses and run results must not be mistaken for the current state.

### Repository, main branch, and governance
- Repository visibility is public. Current inventory: **74 branches, 38 open PRs, 7 open issues**. The GitHub Releases API returned an empty array: **0 published releases**.
- Main HEAD is  f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The main branch reports protected:true. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires pull requests, one approval, stale-review dismissal, last-push approval, resolved review threads, and six strict checks: CodeQL, backend, frontend, ios, analyze, dependency-review. Deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is never.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed/completed after direct verification. Item #2 remains Blocked only pending the owner's final public/private visibility decision and re-verification if visibility changes.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty** through the current integration. No zero-alert claim is made.

### PR #41 — merged application baseline
- [PR #41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged. Source branch fix/release-blockers-2026-10 still points to exact reviewed HEAD 68b380e73ca3c870048035197beef8febbf90ef1. Merge commit and current main are f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. PR: 517 commits, 100 changed files (+11,887 / -2,005).
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded on the same source SHA. Jobs: backend 13/13, frontend 17/17, iOS 11/11, CodeQL 8/8, Dependency Review 5/5.
- Review inventory: 108 timeline records (52 conversation comments, 30 inline comments), 22/22 review threads resolved, and 26 review submissions (25 COMMENTED, one human APPROVED by tarlaci1984-sketch).

### PR #85 — release documentation and exact-head CI
- [PR #85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, and targets main. Current exact HEAD: 90fb1bd88cc0b5893ab338104a2efb35b4131e1c (39 commits, 3 changed files); main base f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- All three workflows passed on this exact HEAD: Validation [43652340946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43652340946), CodeQL [43652340926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43652340926), Dependency Review [43652340931](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43652340931).
- Validation jobs: backend 13/13, frontend 17/17, iOS 11/11. Backend: 450 tests, 27 readiness checks, 78 security/privacy checks; cryptography 50.0.2; pip-audit found no known Python vulnerabilities. Frontend: 289 tests across 59 files, Expo Doctor 21/21, Android Release/emulator smoke passed. iOS Release build and simulator smoke passed. Runtime npm audit still reports 3 moderate minimatch findings through Expo fingerprint tooling; no high-or-higher finding was reported at the configured threshold.
- CodeQL completed analysis and SARIF upload successfully. Dependency Review passed on this documentation-only diff and scanned no dependency files; this is not a full dependency inventory. One automated COMMENTED review and one resolved/outdated inline P2 status-tally thread are recorded; no human APPROVED review exists. Reviewer tarlaci1984-sketch is requested. PR #85 remains open pending human approval and authorized integration.

### SSRF / DNS rebinding — PR #99 and issue #64
- [PR #99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is open, draft, unmerged, and targets main. Exact source HEAD: e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9.
- Fresh post-retarget exact-head workflows all succeeded: Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193), CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186), Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204).
- Validation: backend 508 tests, 27 readiness checks, 78 production-security checks; frontend 289 tests across 59 files, Expo Doctor 21/21; Android Release/emulator smoke and iOS Release/simulator smoke passed. HTTPX 0.28.1, httpcore 1.0.9, cryptography 50.0.2; pip-audit reported no known Python dependency vulnerabilities. Runtime npm audit still reports 3 moderate minimatch findings.
- The transport pins each TCP connection to a validated numeric public IP, verifies the actual connected peer before TLS/request bytes, preserves Host and TLS SNI, re-resolves and pins each redirect hop, rejects DNS rebinding before the next connection, and bounds DNS/connect deadlines. Requirements constrain the private compatibility boundary to HTTPX 0.28.x and httpcore 1.0.x.
- Human reviewer tarlaci1984-sketch is requested but has submitted no review. PR #99 has no review submissions or inline threads; keep it Draft and keep issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open pending independent human security review and authorized integration. PR #95 was closed without merge; its earlier 507/508 result is superseded by #99's fresh main-based checks. No production security acceptance is claimed.

### Release register and external acceptance
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final owner visibility/plan decision; #4 physical iPhone App Attest and production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off. The other 15 remain In Progress.
- CI, CodeQL, Dependency Review, simulator, and emulator evidence do not satisfy external console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback approval, real-user pilot, or business sign-off. **Release remains NOT READY. Pilot/production acceptance remains NOT GRANTED.**
- The main-branch copies of these release records remain unchanged; this documentation branch is not merged.

---

## Verified repository checkpoint — 2026-11-15 00:12 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes all older inventory and workflow snapshots below. It records the current repository state and the exact parent commits whose checks completed before this documentation-only update. The new child commit created by this checkpoint must pass its own exact-head Validation, CodeQL, and Dependency Review; do not transfer the parent results to the child.

### Repository inventory and main governance
- Repository `milanradics89-beep/POS-Doctor` is **public**. Current live inventory: **74 branches** (branch pagination exhausted), **38 open PRs**, and **7 open issues**. The GitHub Releases API returns an empty list (**0 published releases**).
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- The main branch endpoint reports `protected: true`. Active repository ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is `active` and targets the default branch. It requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads, and six strict checks: `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`. Deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is `never`. No governance setting was changed.
- The legacy branch-protection subobject reports `protection.enabled: false` and its required-status-check enforcement is off, while the branch's `protected` metadata is true and the separately readable active ruleset enforces the controls above. Do not interpret the legacy subobject as overriding the active ruleset. The legacy protection detail endpoint is not readable by the connected GitHub App.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty** through the current integration. No zero-alert claim is made.

### PR #85 — release documentation and exact-head CI
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, non-draft, unmerged, and targets main. The audited parent HEAD immediately before this checkpoint is `2dd6a20df0660883bbc4288a3b617108c5a3c375`.
- All three exact-head workflows succeeded on that parent:
  - Validation [43646168449](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646168449): SUCCESS.
  - CodeQL [43646168409](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646168409): SUCCESS.
  - Dependency Review [43646168404](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646168404): SUCCESS.
- Validation logs: backend **450 passed**, readiness **27 passed**, production-security **78 passed**; cryptography **50.0.2**; pip-audit reported **No known vulnerabilities found**. Frontend **289 tests across 59 files**, Expo Doctor **21/21**, Android Release build and emulator install/launch smoke passed, and iOS Release build and simulator install/launch smoke passed.
- Runtime `npm audit --omit=dev --audit-level=high` reports **3 moderate** minimatch findings through Expo SDK 57 fingerprint tooling; no high-or-higher finding was reported at that configured threshold. Do not force a major override or downgrade Expo without a tested SDK-compatible migration.
- The P2 status-tally review thread is resolved/outdated. One COMMENTED review submission exists, but no human APPROVED review is recorded. Human reviewer `tarlaci1984-sketch` has been requested. PR #85 remains open pending human approval and the owner's integration decision. This checkpoint creates a new documentation child commit, so its own three workflows are still pending.

### SSRF / DNS rebinding — PR #99 and issue #64
- PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is open, draft, unmerged, and targets main. Exact source HEAD: `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`.
- Fresh post-retarget exact-head workflows now all succeeded:
  - Validation [43646499193](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499193): SUCCESS.
  - CodeQL [43646499186](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499186): SUCCESS.
  - Dependency Review [43646499204](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43646499204): SUCCESS.
- Post-retarget Validation: backend **508 passed**, readiness **27 passed**, production-security **78 passed**; cryptography **50.0.2**; pip-audit reported no known vulnerabilities. Frontend **289 tests across 59 files**, Expo Doctor **21/21**, Android Release/emulator smoke and iOS Release/simulator smoke passed. Runtime npm audit still reports 3 moderate minimatch findings.
- The PR pins the private transport compatibility boundary to HTTPX `>=0.28.1,<0.29` and httpcore `>=1.0.9,<1.1`. Its tests exercise actual HTTPX/httpcore TCP/TLS peer identity, numeric-IP connection pinning, original Host and TLS SNI preservation, redirect-hop DNS re-resolution, rebinding rejection before a second TCP connection, mixed DNS and special IPv4/IPv6 address rejection, and bounded DNS/connect deadlines.
- Human reviewer `tarlaci1984-sketch` has been requested, but no human review submission or inline review thread is recorded. Keep #99 draft and issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open pending independent human security review and authorized integration. These checks do not constitute production security acceptance.
- PR #95 was closed without merge after confirming that its source changes are contained in #99, which also carries the deterministic resolver-order test correction. Do not treat the old #95 507/508 failure as the current #99 result.

### App Attest, Expo/Node 22, SDK 57, and Copilot guidance
- PR #41 is merged at main. Its exact-head CI passed, all **22/22** review threads are resolved, and human APPROVED review by `tarlaci1984-sketch` is recorded. The two Redis runbook P2 corrections are present in the merged runbook.
- PR #65 is closed/unmerged. Its exact-head Validation, CodeQL, and Dependency Review succeeded. Its `package.json` and `package-lock.json` blobs match main exactly; Expo SDK 57 dependencies and lockfile are aligned. The Redis runbook corrections were integrated through #41, not by treating #65 as merged.
- PR #67 is closed/unmerged. Its historical Validation log recorded **175 passed / 2 failed** from stale App Attest fixtures; its historical full npm audit reported **18 findings** (1 low, 8 moderate, 8 high, 1 critical). Those are not current-main counts.
- PR #68 is closed/unmerged. Its exact Validation backend log recorded **177 passed**, readiness **13 passed**, production-security **15 passed**, cryptography **50.0.2**, and pip-audit found no known vulnerabilities. The App Attest test regressions and cryptography audit are separate concerns; the #68 backend and Python audit both passed.
- PR #69 is closed/unmerged. Its historical Node 22 prebuild failed with `ERR_UNSUPPORTED_NODE_MODULES_TYPE_STRIPPING` because the config-plugin path loaded the runtime `expo-modules-core/src/index.ts`. Current main separates the CommonJS `modules/useit-app-attest/app.plugin.js` config plugin from the TypeScript `index.ts` runtime module. `scripts/app-attest-expo-config.test.mjs` verifies the separation and Node 22 workflow; the current #85 Validation passed the Node 22 Expo prebuild path.
- The former Copilot guidance PR #67 is superseded by current mainline documentation PRs #96 and #102. #96 exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2` passed Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), and Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047). #102 exact HEAD `1dce62ad4907b096a32d76785cf1e695f0f7bb71` passed Validation [43605416452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416452), CodeQL [43605416392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416392), and Dependency Review [43605416335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416335). Both remain draft/open without human review submissions. #102 corrects the product-domain/privacy guidance to describe USEIT as a consumer product-discovery and visual-assistance application, not a payment-terminal operations product.
- PR #76 is also open/draft but is stacked on the closed release-remediation branch #65; its green checks do not replace the main-based #96/#102 checks.

### Release register and acceptance
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2 final owner visibility/plan decision; #4 physical iPhone App Attest and production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off. The other 15 remain In Progress.
- CI, CodeQL, Dependency Review, simulator, and emulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. **Release remains NOT READY. Pilot/production acceptance remains NOT GRANTED.**

---

## Verified repository checkpoint — 2026-11-14 22:08 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes the 21:22 CET checkpoint below. It records only evidence tied to the exact commits and workflow runs listed here. This documentation update creates a new PR #85 HEAD and must pass its own Validation, CodeQL, and Dependency Review before acceptance.

### Repository and main-branch governance
- Repository `milanradics89-beep/POS-Doctor` is currently **public**. Live inventory: **74 branches / 39 open PRs / 7 open non-PR issues**. GitHub Releases API returned an empty array: **0 published releases**.
- Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; the main branch API reports `protected:true`. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and requires PRs, one approving review, stale-review dismissal, last-push approval, resolved review threads, and strict `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review` checks. Deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is never. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed/completed after live verification. No ruleset setting was changed. Any future visibility change requires re-verification.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**; the connected GitHub integration rejects those collection endpoints. No zero-alert claim is made.

### PR #41 — merged application baseline
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged. Source branch `fix/release-blockers-2026-10` still points to exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR: 517 commits, 100 changed files (+11,887/-2,005).
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded on the same source SHA. Jobs: backend 13/13, frontend 17/17, iOS 11/11, CodeQL 8/8, Dependency Review 5/5.
- Review inventory: 108 timeline records (52 conversation comments, 30 inline comments), 22/22 review threads resolved, and 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`). The source branch itself is not protected; the active ruleset targets main.

### PR #85 — current release-documentation gate
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open/unmerged on `docs/post-merge-release-evidence-20261113`, targeting main. Current exact HEAD before this documentation update: `eb71dfedd28fb9b8524883b8541d1e6fa5115667` (36 commits, 3 changed files; 36 ahead / 0 behind main). It has one resolved inline thread, one COMMENTED review submission, and **no human APPROVED review**.
- All three exact-head workflows succeeded on `eb71df`: Validation [43637471629](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43637471629), CodeQL [43637471659](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43637471659), Dependency Review [43637471732](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43637471732). Jobs: backend 13/13, frontend 17/17, iOS 11/11, CodeQL 8/8, Dependency Review 5/5.
- Backend: 450 tests, 27 readiness checks, and 78 security/privacy checks passed; `pip-audit` found no known Python dependency vulnerabilities. Frontend: 289 tests across 59 files, Expo Doctor 21/21, Android Release build and emulator smoke passed. Runtime npm audit still reports 3 moderate minimatch findings through Expo fingerprint tooling, with no high-or-higher finding at the configured threshold. iOS Release build and simulator smoke passed.
- CodeQL generated and uploaded combined JavaScript/Python SARIF successfully. Dependency Review passed on this documentation-only diff and scanned no dependency files; it is not a full dependency inventory or proof that existing alerts are resolved. PR #85 remains open pending human approval and an authorized integration decision. This new documentation commit has a new exact HEAD and must receive its own three workflows.

### SSRF / DNS rebinding — PRs #95/#99 and issue #64
- Parent PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/draft at exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, base main. Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) recorded **507 passed / 1 failed**; the remaining assertion expected resolver input order instead of deterministic sorted IP order. CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed. Parent Validation remains failed.
- Child/main-based PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is open/draft, base main at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, exact source HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`. Its Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all passed **before** its base changed to main at 2026-11-14 16:20:47Z. Current exact-SHA run lookup still returns only those pre-retarget runs; no fresh post-retarget PR-triggered checks are present.
- The validated #99 source suite recorded 508 backend tests, 27 readiness checks, and 78 production-security checks. It covers HTTPX/httpcore numeric-IP TCP pinning, actual peer comparison before TLS/request bytes, Host/TLS SNI preservation, redirect-hop re-resolution, DNS-rebinding rejection before a second TCP connection, NAT64/transition/multicast/reserved-address cases, and bounded DNS/connect deadlines. No human security review is recorded. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **OPEN** pending fresh post-retarget exact-head checks, independent human security review, and authorized integration. No production security acceptance is claimed.

### Code scanning and dependency risk
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open for owner-side visibility/plan and alert-inventory review. Its latest recorded PR #87 exact-head evidence shows successful Validation [43513943699](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943699), CodeQL [43513943661](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943661) with successful SARIF upload, and Dependency Review [43513943996](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943996). PR #85's current pre-update exact HEAD also passed CodeQL and Dependency Review.
- Frontend runtime audit continues to report 3 moderate minimatch findings through Expo fingerprint tooling. Do not force minimatch 11, downgrade Expo, suppress the audit, or lower its threshold without a tested SDK-compatible migration. Dependency-risk item #3 remains In Progress.

### 25-point release register and acceptance
- The authoritative register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout/tested rollback; #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- CI, SARIF upload, emulator, and simulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. **Pilot/production acceptance remains NOT GRANTED.** Do not merge automatically or bypass required checks.

### Runbook / pilot acceptance note
Existing operational, mobile distribution, staging, monitoring, backup/restore, rollback, and release-record procedures are retained. This checkpoint updates evidence only; it does not authorize production credentials, deployment, release, or pilot acceptance.

---

## Verified repository checkpoint — 2026-11-14 21:22 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes the 19:33 CET checkpoint below. It records exact-head evidence refreshed on 2026-11-14; this documentation update creates a new PR #85 HEAD and must pass its own Validation, CodeQL, and Dependency Review before it is accepted.

### Repository and governance
- Repository `milanradics89-beep/POS-Doctor` is **public temporarily**, pending the owner's final public/private decision. Current inventory: **74 branches / 39 open PRs / 7 open issues**. The GitHub Releases API returned an empty array: **0 published releases**.
- Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; the main branch API reports `protected:true`. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and enforces PRs, one approving review, stale-approval dismissal, last-push approval, resolved review threads, and strict `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review` checks. Deletion and non-fast-forward updates are blocked; there are no bypass actors and current-user bypass is never. No protection setting was changed in this audit.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is **closed/completed** after direct verification of the public repository, protected main branch, and active ruleset. Release item #2 remains Blocked only until the owner confirms the final visibility/plan decision and protection is reverified after any visibility change.
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged. Reviewed source branch `fix/release-blockers-2026-10` still points to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It has 517 commits and 100 changed files (+11,887/-2,005); comparison is 517 ahead / 1 behind main. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed on the same source SHA. Jobs: frontend 17/17 steps, backend 13/13, iOS 11/11, CodeQL 8/8, Dependency Review 5/5. Review inventory: 108 timeline records (52 conversation comments, 30 inline comments), 22/22 review threads resolved, and 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`). No separate post-merge main Dependency Review run is claimed.

### PR #85 — current exact-head release documentation
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open/unmerged and non-draft on `docs/post-merge-release-evidence-20261113`, targeting main. Current exact HEAD: `91b4c554d1c4cdb18baccf7bdbbc445d5aaca36b` (35 commits, three changed files; 35 ahead / 0 behind main). It has one resolved inline review thread and one COMMENTED review submission; **no human APPROVED review** is recorded.
- All three required workflows completed successfully on this exact HEAD: Validation [43627585210](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43627585210), CodeQL [43627585183](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43627585183), and Dependency Review [43627585199](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43627585199). Job-level results: backend 13/13 steps, frontend 17/17, iOS 11/11, CodeQL analyze 8/8, Dependency Review 5/5.
- Backend log: **450 tests**, **27 readiness checks**, and **78 security/privacy checks** passed; `pip-audit` reported no known Python dependency vulnerabilities. Frontend: **289 tests across 59 files**, Expo Doctor 21/21, Android Release build and emulator smoke passed. Runtime `npm audit --omit=dev --audit-level=high` still reports **3 moderate minimatch findings** through Expo fingerprint tooling and no high-or-higher finding at that configured threshold. iOS Release build and simulator smoke passed.
- CodeQL generated JavaScript/Python SARIF, combined it, and successfully uploaded the result. Dependency Review passed on this documentation-only diff; no dependency files were scanned, so it is not a full dependency inventory or proof that existing alerts are resolved. Keep PR #85 open/unmerged pending human approval and the owner's integration decision. Any subsequent documentation commit is a new exact HEAD and must receive its own three workflows.

### SSRF / DNS-rebinding — PRs #95/#99 and issue #64
- Parent PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/draft at exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, base main. Its Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) recorded **507 passed / 1 failed**; the remaining regression expected resolver input order rather than the transport's deterministic sorted IP order. CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed. The parent Validation remains failed; child evidence does not change that result.
- Child/main-based PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is open/draft, base main, exact source HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9` (13 commits / 5 files). GitHub issue-event history records its `base_ref_changed` event at **2026-11-14T16:20:47Z**; its three green runs [Validation 43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), [CodeQL 43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and [Dependency Review 43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) were created at **2026-11-14T14:25:40Z**, before the retarget. Current exact-SHA run lookup returns only those pre-retarget runs; no fresh post-retarget PR-triggered checks are present. Do not describe them as a fresh main-base gate.
- The validated #99 source suite recorded **508 backend tests**, 27 readiness checks, 78 production-security checks, cryptography 50.0.2, and clean `pip-audit`. It covers HTTPX/httpcore numeric-IP TCP pinning, actual TCP-peer comparison before TLS/request bytes, Host/TLS SNI preservation, redirect-hop re-resolution and pinning, DNS-rebinding rejection before a second TCP connect, mixed DNS, NAT64 embedded-private-address, multicast/reserved-address rejection, and bounded DNS/connect deadlines. No human security review is recorded. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **OPEN** pending fresh post-retarget exact-head CI, human security review, and authorized integration. No production security acceptance is claimed.

### Code scanning, dependency graph, and dependency risk
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open for owner-side visibility/plan and alert-inventory review. Its latest recorded PR #87 evidence shows Validation [43513943699](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943699), CodeQL [43513943661](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943661) with successful SARIF upload, and Dependency Review [43513943996](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43513943996) all successful on that PR's exact head. PR #85 also passed exact-head CodeQL and Dependency Review above. These runs prove workflow execution in the current public state, not that the features remain available after a future private transition.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty** through the connected integration. The alert endpoints are not exposed to this connection; no zero-alert claim is made.
- Frontend runtime audit continues to report **3 moderate minimatch findings** through Expo fingerprint tooling, with no high-or-higher finding at the configured threshold. Do not force minimatch 11, downgrade Expo, suppress the audit, or lower its threshold without a tested SDK-compatible migration. Dependency-risk item #3 remains In Progress.

### 25-point release register and acceptance
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout/tested rollback; #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- CI, SARIF upload, emulator, and simulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. **Pilot/production acceptance remains NOT GRANTED.** Do not merge automatically or bypass required checks.


### Runbook execution note
Existing production, mobile distribution, staging, monitoring, backup/restore, rollback, and release-record procedures below are retained. This checkpoint updates evidence only; it does not authorize production credentials, deployment, or release.

---

## Verified repository checkpoint — 2026-11-14 19:33 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes the 18:20 CET checkpoint below. It records only evidence tied to the exact commits and runs listed here. The documentation commit created from this checkpoint will have a new HEAD and must pass its own exact-head Validation, CodeQL, and Dependency Review.

### Repository and governance
- Repository `milanradics89-beep/POS-Doctor` is **public temporarily**, pending the owner's final public/private decision. Current inventory: **74 branches / 39 open PRs / 7 open issues**. GitHub Releases API returned an empty array: **0 published releases**.
- Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; main metadata reports `protected:true`. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch, requires PRs, one approval, stale-approval dismissal, last-push approval, resolved review threads, and strict CodeQL/backend/frontend/ios/analyze/dependency-review checks; it blocks deletion and non-fast-forward updates and has no bypass actors. No protection settings were changed.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is **closed** after direct verification of the public repository, protected main branch, and active ruleset. Release item #2 remains Blocked only until the owner confirms the final visibility/plan decision and the same protection is reverified after any visibility change.
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged. Reviewed source branch `fix/release-blockers-2026-10` still points to exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It has 517 commits and 100 changed files (+11,887/-2,005); branch comparison is 517 ahead / 1 behind main. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed on the same source SHA. Review inventory: 108 timeline records (52 conversation comments, 30 inline comments), 22/22 review threads resolved, 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`). No separate post-merge main Dependency Review run is claimed.

### PR #85 — current exact-head release documentation
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open/unmerged on `docs/post-merge-release-evidence-20261113`, targeting main. Current exact HEAD: `73fff17a60fd52edc112b7aa936987f416e6cf64` (34 commits, three changed files; 34 ahead / 0 behind main). It has one resolved inline review thread and one COMMENTED review submission; **no human APPROVED review** is recorded.
- All three required workflows completed successfully on this exact HEAD: Validation [43624265629](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624265629), CodeQL [43624265642](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624265642), and Dependency Review [43624265662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624265662). Job-level results: backend 13/13 steps, frontend 17/17, iOS 11/11, CodeQL analyze 8/8, Dependency Review 5/5.
- Backend log: **450 tests**, **27 readiness checks**, and **78 security/privacy checks** passed; `pip-audit` reported no known Python dependency vulnerabilities. Frontend: **289 tests across 59 files**, Expo Doctor 21/21, Android Release build and emulator smoke passed. Runtime `npm audit --omit=dev --audit-level=high` still reports **3 moderate minimatch findings** through Expo fingerprint tooling and no high-or-higher finding at that configured threshold. iOS Release build and simulator smoke passed.
- CodeQL generated JavaScript/Python SARIF, combined it, and successfully uploaded the result. Dependency Review passed on this documentation-only diff; no dependency files were scanned, so it is not a full dependency inventory or proof that existing alerts are resolved. The run found no high-or-higher vulnerable package and no denied package in the reviewed diff.
- Keep PR #85 open/unmerged pending human approval and the owner's integration decision. Any subsequent documentation commit is a new exact HEAD and must receive its own three workflows.

### SSRF / DNS-rebinding — PRs #95/#99 and issue #64
- Parent PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/draft at exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, base main. Its Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) recorded **507 passed / 1 failed**; the failing regression expected resolver input order rather than the transport's deterministic sorted IP order. Its CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed. The parent Validation remains failed; child evidence does not change that result.
- Child/main-based PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is open/draft, base main, exact source HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9` (13 commits / 5 files). Its Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all passed **before PR #99 was retargeted from the #95 child branch to main**. Current exact-SHA run lookup returns only those pre-retarget runs; no fresh post-retarget PR-triggered checks are present. Do not describe them as a fresh main-base gate.
- The validated #99 source suite recorded **508 backend tests**, 27 readiness checks, 78 production-security checks, cryptography 50.0.2, and clean `pip-audit`. It covers HTTPX/httpcore numeric-IP TCP pinning, actual TCP-peer comparison before TLS/request bytes, Host/TLS SNI preservation, redirect-hop re-resolution and pinning, DNS-rebinding rejection before a second TCP connect, mixed DNS, NAT64 embedded-private-address, multicast/reserved-address rejection, and bounded DNS/connect deadlines. No human security review is recorded. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **OPEN** pending fresh post-retarget exact-head CI, human security review, and authorized integration. No production security acceptance is claimed.

### Code scanning, dependencies, alerts, and release inventory
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains **OPEN**. PR #85's current exact-head CodeQL SARIF upload and Dependency Review both succeeded; this supersedes earlier no-runner/feature-failure snapshots for that PR, but does not prove the complete security-alert inventory is available or empty. Owner-side settings and alert-inventory verification remain necessary.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are **unavailable/unverified, not empty** through the connected GitHub integration. Direct collection reads returned no usable alert payload; no zero-alert claim is made.
- The npm runtime audit still has three moderate minimatch findings; the global minimatch 11 override was rejected because it conflicts with `@expo/fingerprint@0.20.16`'s declared `^10.2.6` range. No forced override, Expo downgrade, audit-threshold reduction, or test deletion was used. Dependency-risk item #3 remains In Progress.
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout/tested rollback; #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- CI, SARIF upload, emulator, and simulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. **Pilot/production acceptance remains NOT GRANTED.**

### Runbook execution note
Existing production, mobile distribution, staging, monitoring, backup/restore, rollback, and release-record procedures below are retained. This checkpoint updates evidence only; it does not authorize production credentials, store submission, deployment, or rollout. Before any future repository write, refresh PR #41's exact source HEAD and its current Validation/CodeQL/Dependency Review runs, then verify the target documentation branch HEAD and its own current runs. Never reuse a parent or earlier-child CI result for a new exact SHA.

---

## Verified repository checkpoint — 2026-11-14 18:20 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint records the completed exact-head CI on the previous documentation head. The commit created by this checkpoint will have a new exact head and must receive its own full CI before this PR can be treated as validated.

### Repository and governance
- Repository visibility is public temporarily, pending the owner's final public/private decision. Inventory at this checkpoint: 74 branches / 40 open PRs / 7 open issues.
- Main HEAD remains f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The active Protect main ruleset (ID 26370589) targets the default branch and requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, and strict CodeQL/backend/frontend/ios/analyze/dependency-review checks. Deletion and non-fast-forward updates are blocked; there are no bypass actors; current-user bypass is never. The main branch endpoint reports protected:true. No protection settings were changed.
- Issue #47 is now closed as completed after this direct verification. Release item #2 remains Blocked only for the owner's final public/private visibility decision; technical ruleset enforcement is verified.
- PR #41 is merged from reviewed HEAD 68b380e73ca3c870048035197beef8febbf90ef1; main HEAD is f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Its 22/22 inline threads are resolved and one human APPROVED review is recorded.

### PR #85 — completed exact-head evidence
- Previous exact PR #85 HEAD: f819e8d885a363c7c7bc289cdaaa0f5be060cf46. Validation [43618057996](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43618057996), CodeQL [43618058036](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43618058036), and Dependency Review [43618058089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43618058089) all completed **SUCCESS** on that exact head.
- Validation backend: 450 tests passed, 27 production-readiness checks passed, 78 security/privacy checks passed; cryptography 50.0.2; pip-audit: no known vulnerabilities found.
- Validation frontend: 289 tests across 59 test files passed; Expo Doctor 21/21; Android export, Android Release build, KVM setup, and Android emulator smoke all passed; runtime npm audit completed with 3 moderate minimatch findings and no high-or-higher finding at the configured audit threshold.
- Validation iOS: native Release build and simulator smoke both passed. CodeQL analysis completed successfully; Dependency Review completed successfully.
- PR #85 remains open/unmerged. The current PR has one automated COMMENTED review and no human APPROVED review. The new documentation commit below will change the exact head; do not reuse f819e8d results as validation of the new head.

### SSRF / DNS-rebinding
- PR #99 is open/draft, base main, source HEAD e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9 (13 commits / 5 files). Its three green runs 43604802611 / 43604802662 / 43604802669 were created before retargeting from the #95 child branch to main. No post-retarget PR-triggered runs are present in the current audit; fresh exact-head Validation/CodeQL/Dependency Review and human security review remain required.
- The source suite recorded 508 backend tests, 27 readiness checks, 78 production-security checks, cryptography 50.0.2, clean pip-audit, real HTTPX/httpcore TCP/TLS pinned-peer behavior, Host/SNI preservation, redirect-hop DNS re-resolution, and DNS-rebinding rejection before the second TCP connection.
- Parent PR #95 remains separately failed at 507 passed / 1 failed; do not transfer #99's source results to #95. Issue #64 remains OPEN.

### App Attest, Expo and related PR evidence
- Main uses app.json -> modules/useit-app-attest/app.plugin.js for the JavaScript config plugin; runtime index.ts separately imports expo-modules-core. The four-case Node 22 regression test is present in scripts/app-attest-expo-config.test.mjs.
- PR #65 is closed unmerged; its exact-head Validation/CodeQL/Dependency Review all passed. The SDK 57 / Node 22 remediation is present on main.
- PR #67 is closed unmerged; its historical Validation failed with 175 backend tests passed / 2 stale App Attest test failures and an 18-finding npm audit (1 low, 8 moderate, 8 high, 1 critical).
- PR #68 is closed unmerged; Validation/CodeQL/Dependency Review passed. Its backend log recorded 177 passed and cryptography 50.0.2. Keep this Python cryptography/pip-audit evidence separate from the frontend npm audit.
- PR #69 is closed unmerged; its historical Validation had the same 2 backend App Attest test failures and 18 npm findings; iOS Release/simulator smoke passed. Its plugin/runtime entrypoint fix is now present on main.
- PRs #90, #96, #97, #101 and #102 have successful exact-head Validation, CodeQL and Dependency Review. PR #100's original 304/305 frontend AST assertion failure is corrected by #101.

### Code scanning / dependency graph
- PR #87 exact head 18eec1bda29d419d8e71958df895c14fac4de464 previously failed CodeQL SARIF upload because Code Scanning was disabled and failed Dependency Review because Dependency Graph/GitHub Advanced Security was not enabled. Its workflow already grants actions: read, contents: read and security-events: write; broader permissions are not a workaround.
- Those failures were recorded while the repository was private. The repository is public now, but feature enablement is not inferred from visibility. Owner action: inspect Settings > Security > Code security and analysis, enable Code Scanning and Dependency Graph if needed, then rerun exact current heads. Issue #84 remains OPEN.

### Dependency and release acceptance
- The current frontend npm audit reports 3 moderate minimatch findings through Expo fingerprint tooling. Do not force minimatch 11, downgrade Expo, suppress the audit or lower its threshold without a tested SDK-compatible migration.
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final visibility decision, #4 physical iPhone App Attest/production entitlement, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring/alert delivery, #22 approved staged rollout/tested rollback, #25 real-user pilot/business sign-off.
- CI/simulator success does not grant physical-device, production-cloud, backup/restore, monitoring, rollout, pilot or business acceptance. Pilot/production acceptance remains NOT GRANTED.

---

## Verified repository checkpoint — 2026-11-14 17:48 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes the 17:16 CET status summary below; older checkpoints are retained as historical evidence.

### Repository and governance
- Repository visibility is **public temporarily**, pending the owner's final public/private decision. Main HEAD remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The active `Protect main` ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch, requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, strict `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review` checks, blocks deletion/non-fast-forward updates, and has no bypass actors. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open until the owner confirms the final visibility/plan and enforcement is reverified after any change.
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged from reviewed source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge and main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Review inventory: 108 combined timeline records, 52 conversation comments, 30 inline comments, 22/22 threads resolved, 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`). The source branch remains at the reviewed SHA.
- The GitHub Releases API returned an empty array: **0 published releases**. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty** through the connected integration.

### Current exact-head release documentation — PR #85
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, exact HEAD `7ad4ffe14637e2072e8656b461a27eb32085aa25` (31 commits, three changed release records).
- Exact-head Validation [43614974247](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974247), CodeQL [43614974171](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974171), and Dependency Review [43614974249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974249) are all **SUCCESS**. Validation jobs: backend 13/13 steps, frontend 17/17, iOS 11/11; CodeQL 8/8; Dependency Review 5/5.
- Backend log: **450 tests**, **27 readiness checks**, and **78 security/privacy checks** passed; `pip-audit` reported no known Python dependency vulnerabilities. Frontend typecheck/unit tests, Expo Doctor, Android Release build, and Android emulator smoke passed. iOS Release simulator build and simulator smoke passed.
- CodeQL generated JavaScript/Python SARIF, combined it, successfully uploaded the results, and completed analysis. A non-fatal SARIF column-kind mismatch warning remains. Dependency Review succeeded on this documentation-only diff; it scanned no changed dependency files, so this is not a full dependency-alert inventory.
- The current PR #85 has one resolved inline review thread and one COMMENTED review submission; **no human APPROVED review** is recorded. Keep it open/unmerged pending human approval and the owner's integration decision.

### SSRF security integration — PRs #95/#99 and issue #64
- Parent PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95), exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, has Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) **FAILED** with 507 passed / 1 failed: a regression expected resolver input order rather than the transport's deterministic sorted IP order. Parent CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed. The child result does not make the parent Validation green.
- Child PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) has been retargeted directly to `main` at unchanged source HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`. Its Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) passed **before the retarget** while the source was stacked on #95. These are exact-source results, but no fresh post-retarget PR-triggered workflow runs were returned in the current audit. Do not represent them as new main-based PR checks.
- The passing source suite recorded backend **508 passed**, readiness **27 passed**, production-security **78 passed**, cryptography 50.0.2, and no known Python dependency vulnerabilities. It covers real HTTPX/httpcore TCP/TLS numeric-peer pinning, original Host/SNI preservation, mismatched-peer rejection before TLS/request bytes, redirect-hop DNS re-resolution/pinning, DNS-rebinding rejection before the second TCP connect, mixed DNS, NAT64/IPv6 transition-address embedded-private IPv4, multicast, empty answers, and bounded DNS/connect deadlines. Android and iOS emulator/simulator validation passed on that source run.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **OPEN** pending fresh exact-head checks on the main-based PR #99, human security review, and authorized integration. No production security acceptance is claimed.

### Dependency and security-alert status
- The current PR #85 frontend runtime audit `npm audit --omit=dev --audit-level=high` reports **3 moderate** vulnerabilities and no high-or-higher finding at the configured threshold. The Expo fingerprint/minimatch compatibility constraint remains; no incompatible major override, forced Expo downgrade, audit-threshold reduction, or test removal was used. Dependency-risk item #3 remains In Progress.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) contains an older in-progress snapshot. It is superseded for PR #85's current exact HEAD by the successful CodeQL SARIF upload and Dependency Review runs above. The full alert inventories remain unavailable/unverified, and the final repository visibility/plan decision remains open; do not close the issue or claim alert inventories are empty based only on workflow success.

### Authoritative 25-point release register
- **2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection durability/final visibility decision, #4 physical iPhone App Attest and production entitlement, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- CI, CodeQL, SARIF upload, emulator, and simulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. Pilot/production acceptance remains **NOT GRANTED**.

---

## Verified repository checkpoint — 2026-11-14 17:16 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.**

### Repository and governance
- Live inventory: **74 branches / 40 open PRs / 8 open issues**. Repository visibility is **public**, still described as temporary by the owner.
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The main branch object reports `protected: true`; active repository ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, strict CodeQL/backend/frontend/iOS/analyze/Dependency Review checks, and blocks deletion/non-fast-forward updates with no bypass actors. No protection setting was changed. The owner must still decide the final public/private plan and re-verify after any visibility change.
- PR #41 is merged from reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. All 22/22 inline review threads are resolved, one human APPROVED review exists, and both Redis runbook P2 findings are resolved.

### Current exact-head PR evidence
- **PR #85** exact HEAD `e4a726d320e17935c4bc7d7a75dee7355758c5b0`: Validation [43611993471](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43611993471), CodeQL [43611993475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43611993475), and Dependency Review [43611993474](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43611993474) all **SUCCESS**. Backend, frontend, and iOS jobs completed successfully; frontend runtime dependency audit, Android release build/emulator smoke, and iOS Release/simulator smoke completed. Its single P2 status-tally thread is resolved; there is one COMMENTED review submission and **no human APPROVED review on the current PR**. Keep open/unmerged.
- **PR #90** exact HEAD `634a05636aa527eec58fec344240f9a9d3fd1402`: Validation [43603193547](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193547), CodeQL [43603193541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193541), Dependency Review [43603193557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193557) all **SUCCESS**.
- **PR #96** exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`: Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) all **SUCCESS**.
- **PR #97** exact HEAD `6212c217e700e6cf263d6f98e0481af4888c3fa4`: Validation [43600898776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898776), CodeQL [43600898781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898781), Dependency Review [43600898787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898787) all **SUCCESS**. Redis PEXPIRE preflight and TTL-preservation regressions are validated.
- **PR #99**, child of #95, exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9`: Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all **SUCCESS**. Backend **508 passed**, readiness **27 passed**, production security **78 passed**, cryptography **50.0.2**, pip-audit reported no known Python vulnerabilities. The exact-head suite proves real HTTPX/httpcore TCP/TLS pinned-peer behavior, original Host/SNI, mismatch rejection before TLS/request, per-redirect-hop DNS re-resolution/pinning, and DNS-rebinding rejection before the second TCP connect. Frontend Android and iOS validation also passed. No human security review; child remains draft/stacked/unmerged.
- **PR #95 parent** exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`: Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) failed on one backend assertion (**507 passed / 1 failed**) because the test expected resolver input order instead of deterministic sorted IP order; CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed. Child #99 corrects the test expectation but does not make parent #95 green. Keep issue #64 open pending integration and independent human security review.
- **PR #100** exact HEAD `995b1dca73ef3de64fc956427acde29a49436575`: Validation [43605093521](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093521) failed on the original frontend AST Set/arrayContaining assertion (**304 passed / 1 failed**); CodeQL [43605093391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093391) and Dependency Review [43605093460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093460) passed. Child #101 contains the isolated test-only correction.
- **PR #101**, child of #100, exact HEAD `a91434c1669ad159fa50fd3526b6594f2c2f8ebd`: Validation [43605226464](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226464), CodeQL [43605226487](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226487), Dependency Review [43605226520](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226520) all **SUCCESS**. Backend 450, readiness 27, production security 78; frontend typecheck/unit, Expo Doctor, Android release/emulator, and iOS release/simulator checks passed.
- **PR #102**, child of #96, exact HEAD `1dce62ad4907b096a32d76785cf1e695f0f7bb71`: Validation [43605416452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416452), CodeQL [43605416392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416392), Dependency Review [43605416335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416335) all **SUCCESS**. It corrects USEIT product-scope/privacy guidance. The shared runtime npm audit still reports **3 moderate minimatch advisories** via Expo → @expo/fingerprint; no incompatible major override or forced Expo downgrade was applied.

### Historical priority PR disposition
- **PR #65** is closed without merge. Its historical exact HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0` passed Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754). The Node 22 Expo plugin/runtime split is present on main and the main post-merge prebuild validation succeeded.
- **PR #67** is closed without merge; its historical Validation failed with 18 npm audit findings and two App Attest backend test failures. Do not reuse it as current mainline evidence.
- **PR #68** is closed without merge; its historical exact-head Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), and Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) all succeeded; backend 177 passed, cryptography 50.0.2, pip-audit clean.
- **PR #69** is closed without merge; its historical Validation failed on the old dependency/backend regressions, while Node 22 iOS prebuild succeeded. The current mainline config-plugin/runtime separation is validated independently.

### Authoritative release and acceptance state
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final visibility/plan decision, #4 physical iPhone App Attest/production entitlement, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- Code Scanning/Dependency Review workflows now execute successfully in the temporary public state; this does not expose or prove the full alert inventory. Alert inventories remain unavailable/unverified, not empty.
- External console setup, physical-device tests, production cloud access, witnessed recovery, monitoring, staged rollout, real-user pilot and business approval remain blocked until independent evidence exists. CI, simulator, and emulator results do not satisfy those gates.
- No merge is authorized by this checkpoint. Human approval, final repository visibility decision, and external release acceptance remain separate gates.

---

## Verified repository checkpoint — 2026-11-14 16:09 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.**

### Live repository and governance evidence
- Repository visibility is currently **public** (owner-described as temporary). Current default branch is main, HEAD f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- Live branch inventory: **74 branches**. Live search inventory: **40 open pull requests / 8 open issues**.
- Main branch object reports protected: true. Repository ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is **active**, targets the default branch, has no bypass actors, blocks deletion and non-fast-forward updates, and requires PRs, one approval, stale-review dismissal, last-push approval, and resolved review threads.
- The active ruleset requires strict status checks CodeQL, backend, frontend, ios, analyze, and dependency-review. The legacy branch-protection subresource is not the enforcement source; no branch-protection or ruleset setting was changed by this checkpoint.
- Keep the final visibility/plan decision with the owner. If the repository is returned to private visibility, re-verify ruleset availability and enforcement before treating this temporary-public state as durable.

### Merged release baseline — PR #41
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is merged. Reviewed HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge/main HEAD f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) succeeded.
- Review: 22/22 inline threads resolved; one human APPROVED review. Both Redis runbook P2 threads are resolved: PRRT_kwDOSkaDTM62Wr0n (shared-client timeouts) and PRRT_kwDOSkaDTM62Wr0r (Redis mandatory in production).

### Current exact-head PR and workflow evidence
- **PR #85**, HEAD d9d63cd4a21df3d152363fc8e331f2e1a2f4de5f: Validation [43604226434](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604226434), CodeQL [43604226444](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604226444), Dependency Review [43604226457](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604226457) all **SUCCESS**. Its status-tally P2 review thread PRRT_kwDOSkaDTM63ShCN is resolved. The PR remains open/unmerged and has no human APPROVED review.
- **PR #90**, HEAD 634a05636aa527eec58fec344240f9a9d3fd1402: Validation [43603193547](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193547), CodeQL [43603193541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193541), Dependency Review [43603193557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193557) all **SUCCESS**. No human review is recorded.
- **PR #95**, HEAD 35f8afe5fd947d25b1d9d6fa55e40f02365dcb67: Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397) failed in backend tests: **507 passed / 1 failed**, solely because a fallback-order assertion expected 8.8.8.8 before the transport's deterministic sorted order 1.1.1.1. Frontend and iOS jobs passed; CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) succeeded. The isolated test correction is in child PR #99; #95 itself remains unmerged.
- **PR #99**, child of #95, HEAD e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9: Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all **SUCCESS**. Backend: **508 tests**, 27 readiness checks, 78 production-security checks; cryptography 50.0.2 and pip-audit clean. The passing suite includes real HTTPX/httpcore TCP/TLS peer pinning, original Host/SNI preservation, peer-mismatch rejection before TLS/request, per-redirect-hop DNS re-resolution/pinning, and DNS-rebinding rejection before the second TCP connection. Frontend Android and iOS validation also succeeded. No human security review is recorded; keep #64 open.
- **PR #96**, HEAD 598735d45bcd34570b6fb1887cd380432c58bbf2: Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), and Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) all **SUCCESS**.
- **PR #102**, child of #96, HEAD 1dce62ad4907b096a32d76785cf1e695f0f7bb71: Validation [43605416452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416452), CodeQL [43605416392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416392), and Dependency Review [43605416335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605416335) all **SUCCESS**. The correction describes USEIT as consumer product discovery/visual assistance and prioritizes user photos, session tokens, attestation payloads, credentials and personal data. Backend: 450 tests, 27 readiness checks, 78 production-security checks; cryptography 50.0.2, pip-audit clean; frontend and iOS/Android simulator/build checks succeeded. No human review is recorded.
- **PR #97**, HEAD 6212c217e700e6cf263d6f98e0481af4888c3fa4: Validation [43600898776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898776), CodeQL [43600898781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898781), and Dependency Review [43600898787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898787) all **SUCCESS**. It adds Redis PEXPIRE readiness regressions, including both-key preflight and TTL preservation on a later probe failure. No human review is recorded.
- **PR #100**, HEAD 995b1dca73ef3de64fc956427acde29a49436575: CodeQL [43605093391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093391) and Dependency Review [43605093460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093460) succeeded. Validation [43605093521](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605093521) has a frontend AST assertion failure (**304 passed / 1 failed**) caused by comparing a Set directly with arrayContaining; its iOS simulator smoke step was still running at the last job read. The test-only correction is in child PR #101; do not overwrite #100.
- **PR #101**, child of #100, HEAD a91434c1669ad159fa50fd3526b6594f2c2f8ebd: Validation [43605226464](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226464), CodeQL [43605226487](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226487), and Dependency Review [43605226520](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43605226520) all **SUCCESS**. Backend: 450 tests, 27 readiness, 78 production security; cryptography 50.0.2 and pip-audit clean. Frontend typecheck, unit tests, Expo Doctor, Android export/release/emulator checks, and iOS release/simulator checks succeeded. No human review is recorded.

All child PRs #99–#102 remain draft/stacked/unmerged. Parent PRs #95 and #100 are not silently treated as green from their child PRs. Do not merge automatically.

### Authoritative release register and external acceptance
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 final main-protection/visibility-plan confirmation; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business approval. The other 15 remain In Progress.
- Current ruleset evidence proves main is protected in the temporary-public configuration, but item #2 remains blocked until the owner confirms the final visibility/plan choice and the same enforcement is re-verified after any visibility change.
- External console setup, physical-device testing, production cloud access, witnessed recovery, monitoring, staged rollout, real-user pilot and business approval remain **Blocked** until independent evidence exists. CI/simulator/emulator results do not satisfy these gates.

### Operational consequence
The current main ruleset is active and strict in the temporary-public configuration. Before changing repository visibility, the owner must confirm the supported plan and re-read the live ruleset after the transition. Never treat a legacy protection.enabled=false field alone as evidence that the active repository ruleset is absent.

---

## Latest release operations checkpoint — 2026-11-14 15:14 CET

### Repository evidence — 2026-11-14 15:14 CET

#### Merged application baseline — PR #41
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged from `fix/release-blockers-2026-10`. Exact reviewed HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current `main`: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch still points to the reviewed SHA; comparison is 517 commits ahead / 1 behind.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Validation frontend/backend/iOS jobs completed 17/13/11 steps; CodeQL 8; Dependency Review 5.
- Review inventory: 108 combined timeline records (52 conversation comments, 30 inline review comments, 26 review submissions); 22/22 inline threads resolved; one human APPROVED review by `tarlaci1984-sketch`.

#### Current documentation gate — PR #85
- Before this checkpoint commit, PR #85 was open/unmerged on `docs/post-merge-release-evidence-20261113`, exact HEAD `56fe39cb46ad2a343544cb7ce88bc7acc143695d`, 27 commits and three changed files; base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43596107888](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43596107888), CodeQL [43596107711](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43596107711), and Dependency Review [43596107700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43596107700) all completed with failure. Backend `132450824766`, frontend `132450825009`, iOS `132450824531`, CodeQL `132450823525`, and Dependency Review `132450823434` each have empty step lists and no usable logs. No tests or scans executed on that exact HEAD.
- Review inventory: 10 combined timeline records, one resolved inline thread, one COMMENTED review submission, no human approval. This new documentation commit creates another exact-head gate; no parent CI is substituted.

#### Current SSRF candidate — PR #95 / issue #64
- PR #95 remains open/draft on `security/ssrf-mainline-integration-20261114`, exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, 12 commits and five changed files, based on current main.
- The transport pins the validated numeric DNS address, checks the actual TCP peer immediately after connect and before TLS/HTTP request bytes, closes mismatched streams, and retains response-level peer verification. Commit `35f8afe` adjusts the real-socket regression to inspect the peer while the response stream is still open, before reading the body.
- Exact-head Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397), CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402), and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) all failed before steps. All five jobs have empty step lists; the DNS timeout, NAT64, multicast, redirect and pinned-peer regressions have not executed on this exact HEAD.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. A 15:15 CET exact-head refresh was added as issue comment [#6878630154](https://github.com/milanradics89-beep/POS-Doctor/issues/64#issuecomment-6878630154). PR #95 has no human review submission or inline thread. No production exploit or deployment is claimed.

#### Current USEIT design and Redis regression candidates
- PR [#90](https://github.com/milanradics89-beep/POS-Doctor/pull/90) is open/draft on `integration/useit-design-foundation-20261114`, exact HEAD `634a05636aa527eec58fec344240f9a9d3fd1402` (11 commits / 12 files). The latest commit migrates the main screen to shared `ProductCard` and `SectionHeader` components and shared theme tokens. Exact-head Validation [43603193547](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193547), CodeQL [43603193541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193541), and Dependency Review [43603193557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43603193557) failed before steps; all five jobs have empty step lists. No test or scan ran. No reviews or inline threads are recorded.
- PR [#97](https://github.com/milanradics89-beep/POS-Doctor/pull/97) is open/draft on `test/redis-readiness-mainline-20261114`, exact HEAD `6212c217e700e6cf263d6f98e0481af4888c3fa4` (3 commits / 2 files). The latest commit adds the missing pytest import for readiness parametrization. Exact-head Validation [43600898776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898776), CodeQL [43600898781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898781), and Dependency Review [43600898787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898787) failed before steps; all five jobs have empty step lists. No test or scan ran. No reviews or inline threads are recorded.

#### Dependency, governance and repository inventory
- PR #98 is closed without merge: its root `minimatch@11.0.5` override conflicts with `@expo/fingerprint@0.20.16` declaring `^10.2.6`. PR #81's separate legacy-base audit reports 3 moderate, 0 high and 0 critical findings; that does not remediate current main. Item #3 remains In Progress; do not force an unsupported override.
- Repository visibility is private. Current main branch metadata reports `protected:false` and required-status enforcement `off`; branch-protection reads return HTTP 403 and rulesets reads return HTTP 403 with GitHub's GitHub Pro/public-visibility requirement. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The 2026-11-02 ruleset snapshot is historical, not proof of current enforcement.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records that Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private-repository configuration.
- Releases API: 0 published releases. Repository inventory: 70 branches, 36 open PRs, 7 open issues. Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable/unverified, not empty.

#### Authoritative 25-point register
- **2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business approval. The other 15 remain In Progress.
- Pilot/production acceptance remains **NOT GRANTED**. External console setup, physical-device testing, production cloud access, witnessed recovery, staged rollout and real-user/business approval remain blocked until independent evidence exists.

---
## Latest release operations checkpoint — 2026-11-14 13:34 CET

### Merged application baseline — PR #41
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged from `fix/release-blockers-2026-10`. Exact reviewed HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current `main`: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch remains at the reviewed SHA; comparison is 517 ahead / 1 behind after the merge.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Validation frontend/backend/iOS jobs completed 17/13/11 successful steps; CodeQL completed 8 steps; Dependency Review completed 5 steps.
- Review inventory: 108 combined timeline records (52 conversation comments, 30 inline review comments, 26 review submissions); 22/22 inline threads resolved; one human APPROVED review by `tarlaci1984-sketch`.

### Current documentation branch — PR #85
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open and unmerged on `docs/post-merge-release-evidence-20261113`, exact HEAD `32b7c300eb3be3f2bd548bbba40090da7a32ec01`, 26 commits and three changed release records.
- Exact-head Validation [43592077952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077952), CodeQL [43592077937](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077937), and Dependency Review [43592077920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077920) all completed with failure. Backend `132438737354`, frontend `132438737511`, iOS `132438737558`, CodeQL analyze `132438737290`, and Dependency Review `132438737068` each report no executed steps; sampled log retrieval returned `BlobNotFound`.
- No documentation tests, native builds, CodeQL analysis, or Dependency Review execution is evidenced for this exact HEAD. These are pre-step failures, not application assertion failures and not passes. PR #85 has one resolved inline review thread, one COMMENTED review submission, and no human approval.
- This checkpoint is synchronized across all three release records. The PR remains unmerged; the default-branch copies remain unchanged.

### Current SSRF candidate — PR #95 / issue #64
- PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is open/draft on `security/ssrf-mainline-integration-20261114`, based on main, exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, 12 commits and five changed files. Latest commit: `test(security): inspect real socket peer before response close`; it checks the actual socket peer while the response stream is still open.
- The branch contains a DNS-pinned HTTPX/httpcore transport: all DNS answers are validated as public unicast; DNS resolution and sequential IP attempts share the connect deadline; the numeric IP is dialed directly; the actual TCP peer is compared with the pinned address before TLS/request transmission; redirects are revalidated; Host and TLS SNI remain the original hostname; proxy and keep-alive reuse are disabled; post-connect response peer validation remains defense in depth. NAT64 embedded IPv4, multicast, reserved, and unspecified destinations are rejected.
- Exact-head Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397), CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402), and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) all completed with failure. iOS `132448408914`, frontend `132448409115`, backend `132448409139`, CodeQL analyze `132448408793`, and Dependency Review `132448408522` each have no executed steps. The DNS-timeout, NAT64, multicast, pinned-peer, and real-socket tests have not executed on this exact HEAD. No security acceptance is claimed; issue #64 remains open.
- The transport is constrained to HTTPX `>=0.28.1,<0.29` and httpcore `>=1.0.9,<1.1`; human compatibility/security review remains required.

### Governance, dependencies, and release boundary
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is open. A fresh branch read at 13:34 reports main SHA `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, `protected:false`, and required-status enforcement `off`. The rulesets endpoint returns HTTP 403 requiring a supported private-repository plan or public visibility. The 2026-11-02 ruleset evidence is historical, not current enforcement proof.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open for Code Scanning / Dependency Graph capability restrictions. Issue #64 remains open.
- PR [#98](https://github.com/milanradics89-beep/POS-Doctor/pull/98) is closed without merge: its root minimatch 11.0.5 override violates `@expo/fingerprint@0.20.16`'s declared `^10.2.6` range. Do not force the override, downgrade Expo, or lower the audit threshold. PR #81's full-tree audit remains evidence from its separate legacy base, not a mainline fix.
- The releases API returned `[]` (zero published releases). The branch search returned 70 branches; current search returned 36 open PRs and 7 open issues. Code Scanning, Dependabot, and Secret Scanning alert endpoints are not exposed by the connected integration; their inventories remain unavailable/unverified, not empty.
- Pilot/production acceptance remains **NOT GRANTED**. Preserve physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user pilot, and business-approval gates. The operational procedures below are retained and remain the runbook.

---

## Latest release operations checkpoint — 2026-11-14 12:20 CET

### Follow-up exact-head CI result — PR #85 checkpoint commit
- The preceding documentation update was committed as `072ab3bdabbb9cfcbc6cd954b47cc7d446f8be55`; PR #85 now points to this exact HEAD (23 commits, three release-record files).
- Exact-head Validation [43589918942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918942), CodeQL [43589918950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918950), and Dependency Review [43589918966](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918966) all completed with failure.
- Five jobs (backend `132432256450`, frontend `132432256636`, iOS `132432256700`, CodeQL `132432256536`, Dependency Review `132432256079`) each have zero executed steps. Sampled job-log downloads return HTTP 404 `BlobNotFound`.
- No tests, native builds, CodeQL scan, or Dependency Review execution is evidenced on this exact HEAD. This is not an application assertion failure and is not a pass. The exact GitHub-side dispatch/log-storage cause remains unverified.
- The current 25-row register is **2 Done / 15 In Progress / 8 Blocked**. Row #2 is **Blocked** because live main metadata reports `protected:false` and required-status enforcement `off`; branch-protection/rulesets reads return HTTP 403 under the current private-repository plan. Issue #47 remains open.
- No further commit should be made until these exact-head checks are reconciled with GitHub Actions execution availability. Pilot/production acceptance remains **NOT GRANTED**.

### Current release decision
- PR #41 remains the validated merged application baseline at exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1` and merge/main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #95 remains a draft SSRF integration candidate at `aec819f2c4ff321611ff7a4899e7d0666b0cd845`; its Validation, CodeQL, and Dependency Review failed before steps. The multicast/NAT64/DNS tests are not executed/accepted; issue #64 remains open.
- PR #98 is closed without merge due to the incompatible minimatch 11 override for Expo fingerprint. The full npm audit finding remains moderate and In Progress; do not force the override.
- Main branch protection remains blocked; current private-repository security entitlements and Actions execution need owner intervention. Security alert inventories remain unavailable/unverified, not empty.
- The release register is 2 Done / 15 In Progress / 8 Blocked. Production and pilot acceptance remain NOT GRANTED.

---

## Latest release operations checkpoint — 2026-11-14 12:17 CET

### Merged application baseline — PR #41
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged from `fix/release-blockers-2026-10`. Exact reviewed HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed on the same PR HEAD. Validation frontend/backend/iOS jobs passed; CodeQL analyze and Dependency Review passed.
- Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. No separate post-merge Dependency Review is claimed.
- Review inventory: 108 combined timeline records, 22/22 inline threads resolved, and 26 review submissions (25 COMMENTED, one human APPROVED). The source branch still points to the reviewed SHA; comparison is 517 ahead / 1 behind main after merge.

### Current documentation gate — PR #85
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, based on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Current exact HEAD: `71116d40a7e1a36bea015fc7c8da8d6043e911c9` (22 commits, three release-record files).
- Exact-head Validation [43586364962](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364962), CodeQL [43586364980](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364980), and Dependency Review [43586364929](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364929) are terminal failures. Backend, frontend, iOS, CodeQL analyze, and Dependency Review job records all have empty step lists; sampled job-log downloads return HTTP 404 `BlobNotFound`.
- No application tests, native builds, CodeQL scan, or Dependency Review execution is evidenced on this HEAD. This is not a source assertion failure and is not a pass. No human approval is recorded for PR #85.

### Mainline SSRF candidate — PR #95
- Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/unmerged on main. Current exact HEAD: `aec819f2c4ff321611ff7a4899e7d0666b0cd845`; latest commit message: `fix(security): reject multicast SSRF destinations`.
- The shared public-unicast predicate now explicitly rejects multicast, reserved, and unspecified addresses, including IPv4/IPv6 multicast and NAT64-embedded multicast. Regression coverage addresses syntax-only URL validation, synchronous DNS answers, connected peers, and async transport rejection before TCP connection. Existing DNS pinning, bounded resolver/connect deadline, NAT64 embedded-private-address rejection, Host/TLS SNI preservation, and post-connect peer validation remain.
- Exact-head Validation [43586519237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519237), CodeQL [43586519299](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519299), and Dependency Review [43586519266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519266) are terminal failures. All five jobs have empty step lists; sampled logs return `BlobNotFound`. The new multicast/NAT64/DNS tests have not executed on this exact HEAD. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open; no SSRF acceptance is claimed.

### Dependency advisory — PR #98 closed without merge
- PR [#98](https://github.com/milanradics89-beep/POS-Doctor/pull/98) was closed without merge at exact HEAD `6428924ebdc339683d8ae9a19671435a9c179273`. Its global `minimatch@11.0.5` override conflicts with `@expo/fingerprint@0.20.16`'s declared `minimatch ^10.2.6` range. Expo upstream attempts to move fingerprint to minimatch 11 and to replace it with picomatch closed without merge because of compatibility/pattern differences; maintainers retain minimatch 10 for this SDK line.
- PR #81's full-tree npm audit artifact (exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14`, on a separate legacy release-remediation base) reports 3 moderate, 0 high, 0 critical findings. Advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) affects minimatch versions `>=7.0.0 <11.0.1`. Expo issue [#52735](https://github.com/expo/expo/issues/52735) assesses this as local CLI/build tooling rather than shipped-app runtime and documents the compatibility reason for retaining minimatch 10.
- Keep the moderate finding visible and In Progress. Do not claim a clean npm audit or force an unsupported global override. PR #81's green checks apply only to its own older-base audit branch.

### Governance, inventories, and release gates
- Repository remains private. Live `main` metadata reports `protected: false` and required-status-check enforcement `off`; branch-protection read returns HTTP 403 and rulesets read returns HTTP 403 with GitHub's GitHub Pro/private-repository restriction. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. Current main enforcement is not verified; owner action is required.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) separately confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled under the current private-repository configuration. Do not remove, skip, or weaken CodeQL or Dependency Review.
- Current inventory: 70 branch names (pagination exhausted), 36 open PRs, and 7 open issues. GitHub Releases API returned an empty list: 0 published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected GitHub operations; they remain **unavailable/unverified, not empty**.
- The 25-point register is **2 Done / 15 In Progress / 8 Blocked**. Blocked: #2 main branch protection; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business approval.
- Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot, and business-approval gates remain blocked until their named evidence exists.

---

## Latest release operations checkpoint — 2026-11-14 11:29 CET

### Merged application baseline
- PR #41 reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1` passed Validation `43492153234`, CodeQL `43492153161`, and Dependency Review `43492153021`; merged as current main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Post-merge main Validation `43503743786` (frontend/backend/iOS) and CodeQL `43503743752` passed. No separate post-merge Dependency Review is claimed.
- PR #41 has 22/22 inline review threads resolved, 26 review submissions, and one human APPROVED review. Both known Redis runbook P2 findings are resolved.

### Current documentation gate — PR #85
- Pre-write exact HEAD: `3ec68482a31c974e6955d4f846ed47446ea29992`, 21 commits ahead / 0 behind main.
- Exact-head Validation `43585978140`, CodeQL `43585978083`, and Dependency Review `43585978102` all completed with failure before any step. All five jobs had `steps=null` and `logs_url=null`; no tests, native builds, CodeQL analysis, or Dependency Review execution is evidenced.
- The new documentation commit created by this checkpoint requires its own exact-head checks. Do not reuse PR #41 or parent results.

### Mainline candidates
- PR #90 HEAD `a603fd181d963c0a0da9a367560711fb29f71593`: Validation `43586115513`, CodeQL `43586115512`, Dependency Review `43586115530` all failed before steps.
- PR #95 HEAD `adac0e6dd6525b197ba7433f290e2afb017d7903`: Validation `43578843298`, CodeQL `43578843319`, Dependency Review `43578843263` all failed before steps. NAT64 and DNS-timeout tests remain unexecuted; issue #64 remains open.
- PR #96 HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`: Validation `43561261094`, CodeQL `43561261044`, Dependency Review `43561261047` all failed before steps.
- PR #97 HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`: Validation `43561295099`, CodeQL `43561295147`, Dependency Review `43561295126` all failed before steps.
- Recent pre-step failures have empty step lists and no log URLs. Treat them as GitHub Actions execution/logging failures, not application test failures or passes.

### Dependency security disposition
- PR #98 was closed without merge at final HEAD `6428924ebdc339683d8ae9a19671435a9c179273`. Its global minimatch 11 override would violate `@expo/fingerprint@0.20.16`'s declared `minimatch ^10.2.6` range.
- Expo upstream issue #52735 says the moderate finding is local CLI/build tooling, not shipped-app runtime, and fingerprint's minimatch 10 range is retained due to breaking changes. Upstream PRs #52753 and #52790 closed unmerged; SDK-57 PR #52819 updated glob where applicable but excluded fingerprint.
- Keep the moderate npm audit finding visible and In Progress. Do not claim a clean audit or force a global override without upstream-supported compatibility and exact-head tests.

### Governance and owner actions
- Repository is private. Live main metadata reports `protected:false` and required-status-check enforcement `off`; branch-protection and rulesets reads return HTTP 403. Issue #47 remains open. The November 2 ruleset record is historical, not current enforcement evidence.
- Issue #84 separately records Code Scanning disabled and Dependency Graph / GitHub Advanced Security unavailable or not enabled for the current private-repository configuration. Keep CodeQL and Dependency Review mandatory; do not broaden permissions or bypass checks.
- Owner action: restore supported private-repository GitHub Pro/security capabilities, then verify the exact six required checks, one approval, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection.
- Inventory: 70 branch names, 36 open PRs, 7 open issues. The main copy of the release records remains stale until this documentation PR is reviewed and integrated.

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.**

---

## Latest release operations checkpoint — 2026-11-14 10:38 CET

### Accepted application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged from `fix/release-blockers-2026-10`. Exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. The source branch ref still equals the reviewed HEAD. Review inventory: 108 combined timeline records, 22/22 inline threads resolved, 26 review submissions (25 COMMENTED, 1 human APPROVED). Post-merge main Validation and CodeQL passed; no separate post-merge Dependency Review is claimed.

### Current documentation gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, exact pre-update HEAD `277555f5f07752a3313e3a30d071f424d195c141`. Its own Validation [43577412306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412306), CodeQL [43577412333](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412333), and Dependency Review [43577412275](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412275) failed. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs have empty step lists; sampled log downloads returned HTTP 404 `BlobNotFound`. No application tests, native builds, CodeQL analysis, or dependency review executed on that exact SHA. The exact GitHub-side dispatch cause remains unverified. Do not reuse PR #41 or parent-commit results.

### SSRF security review — PR #95 / issue #64

Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is main-based at exact HEAD `adac0e6dd6525b197ba7433f290e2afb017d7903`. It includes bounded DNS/connect deadline handling and NAT64 well-known-prefix embedded-IPv4 rejection across URL validation, DNS answers, transport connection validation, and post-connect peer checks, with five focused regression tests. Validation [43578843298](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843298) failed on attempt 2; CodeQL [43578843319](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843319) and Dependency Review [43578843263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843263) failed. All five jobs have empty step records and sampled logs return `BlobNotFound`; the new tests have not executed on this exact HEAD. Keep issue #64 open and PR #95 draft pending executed exact-head checks and human security review.

### Dependency security — PRs #81 and #98

PR [#81](https://github.com/milanradics89-beep/POS-Doctor/pull/81) exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14` passed its own Validation, CodeQL, and Dependency Review on the older `fix/release-remediation-2026-11-13` base. Its full npm audit reported 3 moderate, 0 high, 0 critical advisories; the moderate `minimatch` globparts-amplification DoS range is 7.0.0–11.0.0, transitive through `@expo/fingerprint`/`expo`.

Main-based draft PR [#98](https://github.com/milanradics89-beep/POS-Doctor/pull/98) proposes `minimatch@11.0.5` plus migration tests for globstar, brace expansion, extglob, and dotfile behavior. Exact HEAD `468ec2684bb969da8676b29b07a6680790f2bdfd` has Validation [43579189877](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189877), CodeQL [43579189858](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189858), and Dependency Review [43579189714](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189714) all failed before steps; no test or scan execution is evidenced. Keep item #3 In Progress until this main-based remediation has executed exact-head CI and human review.

### Repository settings and release evidence

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is open/reopened. Main currently reports `protected: false`; rulesets read returns HTTP 403 under the current private-repository plan, and branch-protection read returns HTTP 403. Owner action is required to restore supported private-repository governance and verify required checks, approval, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection.

Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records Code Scanning and Dependency Graph / GitHub Advanced Security capability blockers. Keep CodeQL and Dependency Review mandatory; do not broaden permissions or remove checks as a workaround.

GitHub Releases API returned an empty list (0 published releases). Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable/unverified, not empty. The main copies of the three release records remain at the stale 2026-11-13 18:49 CET checkpoint until the documentation PR is reviewed and integrated.

**Release decision: automated application CI is accepted for PR #41 only. Documentation, SSRF integration, and dependency remediation remain unaccepted. Pilot/production acceptance: NOT GRANTED.** Preserve the existing production configuration, mobile signing, staging load-probe, rollout, monitoring, rollback, and release-record procedures below; this checkpoint does not replace them.

---

## Latest release runbook checkpoint — 2026-11-14 06:37 CET

### Merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current `main` HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review run is claimed. PR #41 review: 108 combined timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### Documentation gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Current exact HEAD `ec85777b2ee1086883cb7b3be0b1789a3947343d`, 11 commits ahead / 0 behind, with 3 changed files. Its exact-head Validation [43562730906](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562730906), CodeQL [43562730911](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562730911), and Dependency Review [43562730860](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562730860) all completed with failure. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs have null step records; explicit step lookup returned an empty list and a job-log request returned HTTP 404 `BlobNotFound`. No tests, native builds, CodeQL scan upload, or dependency review executed on this exact HEAD. The exact GitHub dispatch/runner cause remains unverified. The 25-point backlog was refreshed in parent commit `ec85777b2ee1086883cb7b3be0b1789a3947343d`; this commit refreshes the runbook and pilot-acceptance records. Do not treat parent or PR #41 CI as evidence for the current documentation HEAD.

### Mainline SSRF integration — PR #95

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is based directly on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, exact HEAD `5971e4275c8263d5728910369dfd80d1f2b8b88f`, 1 commit, 5 files (+608 / -21). It introduces a DNS-pinned HTTPX/httpcore transport, fresh per-connection DNS validation, rejection of mixed public/private answers, direct numeric-IP dialing while preserving Host/TLS SNI, disabled environment proxies and keep-alive reuse, redirect-by-redirect validation, and post-connect peer verification, with deterministic transport/rebinding tests.

PR #95 exact-head Validation [43561091697](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091697), CodeQL [43561091647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091647), and Dependency Review [43561091637](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091637) all failed. Its Validation jobs have no executed step records; logs are unavailable. The new tests therefore have not executed on this mainline HEAD. CodeQL and Dependency Review are also blocked by the repository capability issues tracked in #84. PR #95 has no human review submissions or inline threads and remains draft/unmerged. Static review note: the transport reconstructs an httpcore pool using HTTPX private pool attributes; the narrow HTTPX/httpcore version constraints are part of the compatibility contract and require exact-head CI and human security review.

Earlier PRs #70 and #79 passed their own exact-head three-check suites, but those results do not substitute for PR #95. PR #94's peer/mixed-DNS tests were not executed on its own failed exact-head Validation. Keep #64 open until the mainline integration receives executed CI, human review, and integration acceptance.

### Other mainline candidates

- Draft PR [#90](https://github.com/milanradics89-beep/POS-Doctor/pull/90), exact HEAD `3a1650649d99efdcde4e8f631d8c2466782b2eae`, adds the accessible USEIT design foundation (5 commits, 9 files, +407 / -26). Exact-head Validation [43534946927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534946927) passed; CodeQL [43534947109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947109) and Dependency Review [43534947012](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947012) failed under the repository security-capability blocker.
- Draft PR [#96](https://github.com/milanradics89-beep/POS-Doctor/pull/96), exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`, adds 45 lines of Copilot repository guidance. Its exact-head Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), and Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) failed.
- Draft PR [#97](https://github.com/milanradics89-beep/POS-Doctor/pull/97), exact HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`, adds 116 lines of Redis readiness TTL regression tests. Its exact-head Validation [43561295099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295099), CodeQL [43561295147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295147), and Dependency Review [43561295126](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295126) failed.
- Draft PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains on the old `fix/release-blockers-2026-10` base (71 commits, 23 files). PR #90 is the separate main-based design-foundation candidate; do not merge or retarget #48 automatically.

### Governance and release controls

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository is private; the latest recorded main branch metadata reports `protected: false`, and rulesets reads return HTTP 403 requiring a supported plan or public visibility. Current main enforcement is unverified. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private-repository configuration. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable/unverified, not empty.

Current search inventory: 66 branches, 40 open PRs, and 7 open issues. The last recorded releases inventory returned 0 published releases; a releases-list read is not exposed by the current connected GitHub action set, so that count is not independently refreshed in this checkpoint.

Release decision: the merged PR #41 application baseline has automated exact-head CI evidence. The documentation branch, mainline SSRF candidate, repository security capabilities, and main branch protection remain outstanding. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest release checkpoint - 2026-11-14 05:42 CET

### PR #41 merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) remains closed and merged. Source branch: `fix/release-blockers-2026-10`; exact reviewed HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge and current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review run is claimed. PR #41 review inventory: 52 conversation comments, 22/22 inline threads resolved, 26 review submissions (25 COMMENTED, 1 human APPROVED).

### PR #85 documentation branch - exact-head CI incident

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Exact HEAD: `f05c85f85e5f38ee6c36f74e784dd3cbbfd38b78`; 9 commits ahead / 0 behind; 3 changed files (+533 / -8).

All three required workflows for this exact HEAD completed with failure:
- Validation [43556921830](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921830): backend job [132331782879](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921830/job/132331782879), frontend job [132331783064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921830/job/132331783064), and iOS job [132331783078](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921830/job/132331783078) failed before runner assignment.
- CodeQL [43556921835](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921835): analyze job [132331782546](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921835/job/132331782546) failed before runner assignment.
- Dependency Review [43556921848](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921848): dependency-review job [132331782560](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921848/job/132331782560) failed before runner assignment.

The five jobs started at 2026-11-14 04:29:46 UTC and completed within approximately 2-3 seconds. Each reports `runner_id: 0`, an empty runner name, zero executed steps, and no downloadable job log (the log endpoint returned `BlobNotFound`). This establishes a pre-runner allocation/dispatch failure. It does not establish an application test failure or pass, a completed CodeQL scan, or a Dependency Review result. The precise GitHub-side cause remains unverified. Similar pre-runner failures were recorded on earlier PR #85 and PR #94 heads; do not infer a root cause without runner/account evidence.

PR #85 review inventory at this checkpoint: 2 conversation comments, 1/1 inline review thread resolved, 1 COMMENTED review submission anchored to an older HEAD, and no human approval on the current HEAD. The current documentation commit has not passed its own required CI and must not be merged.

### Repository governance and security configuration

Repository visibility remains private. Current `main` HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` and the branch API reports `protected: false`. The rulesets endpoint returns HTTP 403 with GitHub's requirement to upgrade the private repository plan or make the repository public. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records the separate Code Scanning disabled and Dependency Graph / GitHub Advanced Security capability blockers. Do not remove or bypass CodeQL or Dependency Review. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable/unverified, not empty.

### SSRF issue #64

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) have previously passed their own exact-head Validation, CodeQL, and Dependency Review workflows. PR [#94](https://github.com/milanradics89-beep/POS-Doctor/pull/94) adds peer/mixed-DNS regression tests, but its recorded Validation failed before runner assignment and the tests were not executed. Keep #64 open until the tests execute on an exact HEAD, receive human review, and the complete remediation is integrated.

The releases endpoint returned an empty list: there are currently no published GitHub releases.

### Current release decision

The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The remaining 15 are In Progress. Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user-pilot, and business-approval gates remain blocked until independent evidence exists.

---

## Latest release checkpoint — 2026-11-14 05:25 CET

### PR #41 merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed exact PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed. Validation frontend (17 steps), backend (13), and iOS (11) jobs passed; CodeQL analyze (8 steps) and Dependency Review (5 steps) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) passed all three jobs; main CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. No separate post-merge Dependency Review run is claimed. PR #41 review: 108 timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### PR #85 documentation branch — latest exact-head gate

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Exact HEAD: `c1c85ad27bd43176f981516bbffd2676bbda452b`; base/main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 8 commits ahead / 0 behind, 3 changed files (+441 / -8).

All three workflows for this exact HEAD completed with **failure**:
- Validation [43550836422](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836422): backend [132312651841](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836422/job/132312651841), iOS [132312651999](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836422/job/132312651999), and frontend [132312652107](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836422/job/132312652107) failed before runner assignment.
- CodeQL [43550836413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836413): analyze [132312651917](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836413/job/132312651917) failed before runner assignment.
- Dependency Review [43550836406](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836406): dependency-review [132312651749](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836406/job/132312651749) failed before runner assignment.

The raw Actions API shows all five jobs started at 2026-11-14 03:17:14 UTC and completed at 03:17:16 UTC, with `runner_id: 0`, empty `runner_name`, zero executed steps, and no downloadable logs. The job-step endpoint returns no steps; job-log retrieval returns HTTP 404 `BlobNotFound`. The workflows did not execute tests or scans on this SHA. This does **not** prove an application-code test failure or a successful validation. The precise GitHub-side runner/dispatch cause remains unverified.

PR #85 review: 4 timeline records, 1/1 inline thread resolved, one COMMENTED review submission anchored to older commit `74e0eea7b00e8d4706e04b89018830fa75487473`, and no human approval on the current HEAD. The P2 tally finding remains resolved.

### Governance and security

The repository is private. Current `main` metadata reports `protected: false`; rulesets and branch-protection reads return HTTP 403 requiring GitHub Pro or public visibility. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open; November 2 ruleset #26370589 evidence is historical and does not prove current enforcement. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) separately confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for the current private-repository configuration. These feature blockers are distinct from the pre-runner failures on PR #85 HEAD `c1c85ad27bd43176f981516bbffd2676bbda452b`; do not remove, skip, or weaken CodeQL or Dependency Review.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) passed their own exact-head Validation, CodeQL, and Dependency Review runs but remain separate, unmerged branches. PR [#94](https://github.com/milanradics89-beep/POS-Doctor/pull/94), exact HEAD `902d96b06fc033d3642192d429c69b940641d13d`, adds peer/mixed-DNS regression tests but its three workflows failed before runner assignment; those tests have not executed in CI.

### Inventory and release decision

The GitHub releases endpoint returned an empty list: **0 published releases**. Code Scanning, Dependabot, and Secret Scanning alert endpoints are not exposed by the connected integration; their inventories remain **unavailable/unverified, not empty**. Current search returned 39 open PRs and 7 open issues. PR #48 remains open on `feature/useit-design-system`, targets the old merged release branch, and compares 324 commits ahead / 3 behind `main`; reconcile before integration.

The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The other 15 remain In Progress. Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user-pilot, and business-approval items must remain blocked until independent evidence exists.

---

## Latest release checkpoint — 2026-11-14 02:15 CET

### Merged application baseline

PR #41 is merged: reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge/current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. PR #41 review: 108 timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### PR #85 documentation branch — exact-head gate

PR #85 remains open at exact HEAD `e3d99b1f58b2133318d168ec4c20e58b515cf2c2`, 3 commits ahead / 0 behind main. Its exact-head Validation [43533470828](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533470828) was **cancelled**: backend and iOS passed, but frontend was cancelled during the Android native Release Gradle build; Android build completion, emulator smoke, and runtime dependency audit are not established. CodeQL [43533470808](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533470808) **failed** at workflow-run metadata access (`Resource not accessible by integration`), ending with `configuration error`. Dependency Review [43533471028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533471028) **failed** because GitHub reports the feature unsupported on this repository and requires Dependency Graph plus GitHub Advanced Security. These are not passing checks and no parent CI is substituted. The single P2 tally thread is resolved; the one COMMENTED review submission is anchored to an earlier commit, with no approval on current HEAD.

### Governance and security

The repository is private; current `main` reports `protected: false`. The rulesets API returns HTTP 403 requiring GitHub Pro or public visibility. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open; November 2 ruleset #26370589 evidence is historical, not current enforcement proof. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) passed their own exact-head three-check suites but remain separate, unmerged branches; their CI is not integrated SSRF acceptance.

### Related design work

PR #88 Validation passed while CodeQL/Dependency Review failed. PR #90 Validation passed while CodeQL/Dependency Review failed and is stacked on #88. PR #91 Validation remains in progress while CodeQL/Dependency Review failed and is stacked on #90. These are separate branches, not release acceptance.

### Inventory and release decision

Releases API: **0 published releases**. Inventory: **63 branches, 37 open PRs, 7 open issues**. Code Scanning, Dependabot, and Secret Scanning inventories are **unavailable/unverified, not empty**. The 25-point register is **2 Done / 15 In Progress / 8 Blocked**; blocked items are #2, #4, #5, #16, #18, #21, #22, and #25. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest release checkpoint — 2026-11-14 01:16 CET

### Merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD: [`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`](https://github.com/milanradics89-beep/POS-Doctor/commit/f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1). Final PR review: 22/22 inline threads resolved; 26 submissions (25 COMMENTED, 1 APPROVED).

All three required workflows passed on the exact PR #41 HEAD:
- Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): success; frontend, backend, and iOS jobs passed.
- CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): success.
- Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): success.

Post-merge checks on the exact `main` commit `f03d239` also passed: Validation [#43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [#43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752). The PR-head Dependency Review is the recorded dependency gate; no separate post-merge Dependency Review run is claimed.

### Documentation PR #85: previous exact-head gate failed

Before this documentation refresh, PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) was open on `docs/post-merge-release-evidence-20261113` at exact HEAD `ab302518de26a798fc417b22a32bda10376fcf11`. All three runs reached terminal states, but none passed:
- Validation [#43520112435](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435): failure. Backend job [132231794474](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231794474) and iOS job [132231856374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231856374) passed. Frontend job [132231791727](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435/job/132231791727) failed while preparing the Google APIs Intel x86_64 Atom System Image: `No space left on device`. Android emulator smoke and later runtime dependency audit did not complete. This is a runner-capacity failure, not a passing Validation result.
- CodeQL [#43520112498](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112498): failure. The scan processed 75/75 Python files and 5/5 GitHub Actions files and exported SARIF, then failed because the action could not access workflow-run metadata (`Resource not accessible by integration`). The log also explicitly says Code Scanning is not enabled and requests `security-events: read`. A successful scan/export is not a successful CodeQL workflow.
- Dependency Review [#43520112508](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112508): failure. GitHub reports Dependency Review is not supported on this repository and requires Dependency Graph plus GitHub Advanced Security.

PR [#87](https://github.com/milanradics89-beep/POS-Doctor/pull/87), exact HEAD `18eec1bda29d419d8e71958df895c14fac4de464`, attempted a job-scoped `actions: read` permission change. Its Validation was cancelled, CodeQL failed with the explicit Code Scanning-not-enabled error, and Dependency Review failed with the same repository-capability error. The permission-only candidate has not resolved the owner-side feature/configuration blockers.

This documentation refresh creates a new PR #85 commit with a new exact-head CI gate. Do not inherit PR #41 or `main` CI results, and do not treat the previous PR #85 failures as results for the new commit.

### Main branch governance

The repository is private. The current `main` branch object reports `protected: false`; the rulesets API returns HTTP 403 with GitHub's requirement to upgrade to GitHub Pro or make the repository public. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The 2026-11-02 ruleset evidence is historical, not proof of current enforcement. Owner action and fresh verification are required before main protection can be marked Done.

### SSRF, releases, and security inventories

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PR [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70), exact HEAD `935cb0a6b88810696849f93c61a336541ce50914`, and PR [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79), exact HEAD `109e77ba8ccd78d42d4c4dc9cc0d557c98c0d902`, each passed Validation, CodeQL, and Dependency Review on its own exact head. Both remain open on separate branches and are not integrated security acceptance on `main`.

The repository has 0 published GitHub releases. Current inventory: 61 branches, 36 open pull requests, and 8 open issues. Code Scanning, Dependabot, and Secret Scanning alert inventories could not be retrieved through the connected GitHub interface; they remain unverified, not zero.

Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout, and real-user/business acceptance require their own external evidence.

## Latest release checkpoint — 2026-11-13 22:07 CET

### PR #41 merged; exact-head CI verified

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) was merged into `main` at **2026-11-13 20:40:35 UTC (21:40:35 CET)**. Reviewed PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; resulting main commit: [`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`](https://github.com/milanradics89-beep/POS-Doctor/commit/f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1).

A human approval was recorded from `tarlaci1984-sketch` at 2026-11-13 20:05:16 UTC. Final PR review inventory: **22/22 inline threads resolved; 26 review submissions (25 COMMENTED, 1 APPROVED)**.

The three required workflows completed successfully on the exact PR HEAD `68b380e`:

- Validation [#43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): **success**. Frontend [job 132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [job 132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [job 132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed.
- CodeQL [#43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), analyze job 132115827817: **success**.
- Dependency Review [#43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021), job 132115827187: **success**.

Frontend log: **59 test files passed**, Expo Doctor passed, Android native Release build **BUILD SUCCESSFUL**, and Android emulator smoke passed for `com.useit.app`. The iOS simulator smoke passed for `com.useit.app`; backend Validation passed. Auxiliary Expo SDK 57 lock-refresh workflow [#43492142700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492142700) passed and uploaded an artifact (SHA-256 `cac15d2ff98a79b14917c85eb32a8a70989c9d63775bf4908399ad01f47d442e`).

Post-merge checks on exact `main` commit `f03d239` also completed:
- Push Validation [#43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786): frontend, backend, and iOS jobs all **success**.
- Push CodeQL [#43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752): analyze **success**.
- Dependency Review above is the PR-head check; no separate post-merge push Dependency Review run is claimed.

### Main branch protection requires renewed owner action

Repository visibility is **private**. The current `main` branch API response reports `protected: false`. The rulesets API returns HTTP 403 with: `Upgrade to GitHub Pro or make this repository public to enable this feature.` Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47), previously closed after the 2026-11-02 verification of ruleset #26370589, has been **reopened** because current enforcement cannot be independently verified after privatization. The 403 does not prove the historical ruleset was deleted; it does mean current protection must not be represented as verified.

**Owner action:** while keeping the repository private, upgrade to GitHub Pro and verify the active ruleset and exact required checks; alternatively, make the repository public and re-verify. Until then, main branch protection is Blocked.

### Remaining security and release status

- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains **open**. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) remain open/unmerged; each has Validation, CodeQL, and Dependency Review success on its own exact head. The SSRF remediation is not yet integrated and accepted.
- PR [#81](https://github.com/milanradics89-beep/POS-Doctor/pull/81), a separate full npm-audit candidate, has all three exact-head workflows green but reports **3 moderate, 0 high, and 0 critical** findings. These results are not attributed to the merged main tree.
- PR #41 Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 Scorecard findings.
- Repository inventory: **57 branches, 32 open PRs, 0 published GitHub releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are **unavailable/unverified, not empty**; the connected GitHub interface does not expose those endpoints.
- Pilot/production acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout, and real-user/business acceptance remain blocked.

## Latest release checkpoint — 2026-11-13 18:49 CET

### Pre-integration evidence for PR #41

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. Immediately before this integration commit, its exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92` (parent `e74a69a2fa1a4afd4e0c1cf5bf848d4acba2ede4`). The branch was 515 commits ahead and 0 behind main; the PR diff contained 98 files (+11,362 / -911).

Exact-head workflows for `b793a47f8f0a84155d1200fc797f191701f4eb92`:

- Validation [#43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114): **failure overall**. Backend [job 132027276413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027276413) and iOS [job 132027357144](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027357144) passed. Frontend [job 132027272954](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027272954) failed at Expo Doctor.
- Frontend unit tests passed **285/285 across 58 files**. Expo Doctor passed 20/21 checks and found four SDK 57 patch mismatches: `expo` 57.0.32 vs `~57.0.33`, `expo-constants` 57.0.23 vs `~57.0.24`, `expo-linking` 57.0.13 vs `~57.0.14`, and `expo-router` 57.0.30 vs `~57.0.31`. Android export, Release build, and emulator smoke were not reached after this failure.
- CodeQL [#43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128), analyze job 132017424470: **success**.
- Dependency Review [#43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149), job 132017428447: **success**.

### Validated remediation candidate integrated by this commit

Draft PR [#65](https://github.com/milanradics89-beep/POS-Doctor/pull/65), exact candidate HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`, passed its own exact-head workflows:

- Validation [#43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602): backend, frontend, and iOS jobs all **success**.
- CodeQL [#43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289): **success**.
- Dependency Review [#43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754): **success**.

The candidate updates the four Expo SDK 57 packages and lockfile, aligns validation jobs to Node 22, pins the Expo Doctor CLI used by the lock-refresh workflow, adds App Attest config/workflow regression coverage, and adds a prototype-pollution regression test for the vendored deepmerge package. Its Redis readiness and production rate-limiting corrections are byte-identical to the current release branch runbook.

This commit applies the validated candidate tree as a single child of the current PR #41 HEAD. The resulting commit is a **new exact-head CI gate**. Do not reuse either the pre-integration PR #41 failure or the PR #65 candidate's green runs as CI evidence for the resulting commit. PR #65 remains open and draft; it has not been merged.

### Review, security, and release state

- PR #41 inline review threads: **22/22 resolved**.
- Review submissions: **25**, all `COMMENTED`; **0 human APPROVED**. A human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires CodeQL, analyze, backend, frontend, iOS, and dependency-review; one approval; last-push approval; resolved threads; deletion/non-fast-forward protection; and no bypass actors.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) have each passed Validation, CodeQL, and Dependency Review on their own exact heads. The redirect-chain and DNS-pinning code still requires review/integration before #64 can close.
- Repository inventory at this checkpoint: **57 branches, 33 open PRs, 0 published GitHub releases**.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because their alert endpoints are not exposed by the connected GitHub interface.
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers #4, #5, #16, #18, #21, #22, and #25 remain Blocked until physical-device, production, witnessed backup/restore, monitoring, rollout, and real-pilot evidence exists.

**Release decision:** the pre-integration PR #41 HEAD did not pass Validation. The integration commit created by this checkpoint must pass all exact-head required workflows independently. Human approval and external production/pilot acceptance remain outstanding. Do not merge PR #41 automatically or bypass required checks.

---

## Latest release checkpoint — 2026-11-11 21:40 CET

PR #41 remains **open, unmerged, and non-draft** on fix/release-blockers-2026-10, targeting main. The fully validated parent immediately before this documentation repair is 4883c652d61b93236b7a604f124bf5708caa07e6. This commit is a documentation-only child of that parent; its own exact-head Validation, CodeQL, and Dependency Review must pass independently. Do not reuse the parent runs as evidence for the child.

### Exact-head evidence for validated parent 4883c65

All three required workflows completed successfully for the same exact SHA:

- Validation [#43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324): backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957), frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800), and iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) all **success**. All steps passed, including Expo Doctor, Android export/Release/emulator smoke, iOS Release simulator/smoke, and runtime dependency audit.
- CodeQL [#43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156): **success**.
- Dependency Review [#43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397), job [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843): **success**; no high-or-higher vulnerable package in the reviewed diff and no denied package.

The unchanged source/test baseline 2faa49c records **450 backend tests / 27 production-readiness checks / 78 security-privacy checks**, **285 frontend tests across 58 files**, Expo Doctor **21/21**, Android Release and emulator install/launch smoke, and iOS Release simulator build and launch smoke. The exact 4883c65 Validation reran all three jobs successfully; its source/test tree is unchanged from the validated parent.

### Dependency and security disposition

- Runtime npm audit: **four moderate** transitive glob/minimatch advisory instances; no high-or-higher finding at the configured --audit-level=high threshold.
- Dependency Review metadata: unknown license metadata remains for vendor/deepmerge@4.3.2; below-threshold Scorecard results remain for @expo/devcert (2.9) and is-mergeable-object (1.5).
- CodeQL succeeded. The previously observed SARIF column-kind mismatch is non-fatal.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.

### Review, governance, and repository state

- The Codex review of 4883c65 raised two P2 documentation findings: distinguish the validated parent from the current documentation HEAD, and preserve the actionable production/mobile/staging/rollout/monitoring/rollback/release-record procedures. This commit addresses both. The two corresponding review threads are resolved after the push.
- At the pre-write refresh, PR #41 had **20 inline threads total, 18 resolved and 2 open**, **24 review submissions, 0 APPROVED**. A fresh Codex review is requested for this documentation child; a human approving review and last-push approval remain mandatory.
- Branch comparison immediately before this commit: **512 ahead / 0 behind** main; this documentation-only commit adds one linear commit. Main HEAD: 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0.
- Repository inventory: **32 branches, 19 open PRs, 4 open non-PR issues** (#46, #25, #24, #23). GitHub Releases API returns **0 published releases**.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Issues #62 and #63 are closed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. External blockers remain #4 physical iPhone App Attest production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and alert delivery; #22 staged rollout/rollback approval; and #25 real-user pilot and business approval.

**Automated CI acceptance for exact parent HEAD 4883c65: PASSED. The documentation-only child created by this checkpoint has separate exact-head checks and is not accepted until those checks pass. Pilot/production acceptance: NOT GRANTED. Do not merge automatically or bypass required checks.**

# USEIT release and production runbook

## 1. Required CI evidence and merge gate

Before merge, require the current PR HEAD (not its parent) to pass all six ruleset contexts: CodeQL, analyze, backend, frontend, ios, and dependency-review. Confirm Validation's backend, frontend/Android, and iOS jobs all completed successfully. A successful parent commit does not validate a documentation-only child.

PR #41 also requires one human approving review, approval of the last push, and resolved review threads. Keep the PR open until those gates and the external acceptance gates below are met. Never bypass checks, weaken the ruleset, force-push, or merge automatically.

Simulator/emulator CI is not evidence of physical-device App Attest or Play Integrity. CI success is not production, store, pilot, or business approval.

## 2. Production backend configuration

Configure secrets in the hosting platform's secret manager, never in source control, committed app config, logs, or client-side EXPO_PUBLIC variables.

Required:
- USEIT_ENV=production
- OPENAI_API_KEY
- Either USEIT_API_KEY for server-to-server/legacy access or USEIT_SESSION_SECRET for server-issued sessions. Session secrets must be at least 32 characters and randomly generated.
- USEIT_CORS_ORIGINS containing explicit trusted origins; wildcard CORS is forbidden.
- USEIT_ALLOW_DOCS=false
- USEIT_RATE_LIMIT_MODE=redis
- USEIT_REDIS_URL pointing to the shared production Redis service used by every backend worker/replica. Production startup rejects process-local memory rate limiting because its counters are not shared across workers. The Redis sliding-window operation is atomic and uses Redis server time.

When session authentication is enabled:
- USEIT_ATTESTATION_MODE=required
- USEIT_ATTESTATION_APP_ID set to the platform's real app identity.
- The shared USEIT_REDIS_URL service also stores persistent challenge and attestation-key state. The normal shared Redis client uses a 2-second connection timeout and a 5-second socket timeout; readiness must not close this shared client. If the temporary fallback readiness probe client is used, it uses a 2-second connection timeout and a 2-second socket timeout and must be closed after the ping. Treat a failed readiness check as a release blocker. The in-memory challenge store is capped at 10,000 unexpired challenges and fails closed at capacity; it is for tests/local development only.
- Select USEIT_ATTESTATION_PROVIDER=apple_app_attest or google_play_integrity to match the released platform and backend deployment.

For Google Play Integrity:
- Set `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` in the EAS build environment to the numeric Google Cloud project number associated with the Play Integrity API. This identifier is embedded in the client build and is not a secret; the Android client fails closed if it is missing or invalid.
- USEIT_GOOGLE_PLAY_PACKAGE_NAME must match the Android package.
- USEIT_GOOGLE_PLAY_CERT_SHA256 must contain the production Play signing certificate digest(s) returned in the Play Integrity payload.
- Set `USEIT_GOOGLE_PLAY_DEVICE_INTEGRITY` to the explicitly approved comma-separated device verdicts. The default is `MEETS_DEVICE_INTEGRITY`; do not weaken it without a documented risk decision.
- Confirm the Google service account has the required Play Integrity permission and that the production app is published through the expected Play track.

For Apple App Attest:
- The bundle identifier and team-prefixed App Attest app ID must match the Apple Developer configuration.
- Production builds must use the production App Attest entitlement and production AAGUID.
- Confirm the production Apple Developer capability is enabled for the correct App ID.

Every production deployment must use `USEIT_RATE_LIMIT_MODE=redis` and a shared Redis instance, including single-instance production deployments. Memory-mode rate limiting is permitted only for local development and automated tests; it is never an acceptable production configuration. Redis rate limiting uses one Lua operation with Redis server time, a sorted-set sliding 60-second window, atomic pruning/count/admission, and TTL assignment for the event and sequence keys. Redis connections use explicit 2-second connect and 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

## 3. Mobile release configuration

- [ ] Verify the bundle identifier/package name and app version (com.useit.app in the current app.json).
- [ ] Create/review the EAS production profile and configure store signing credentials in the external build service. The repository currently has no eas.json; this is an external release prerequisite.
- [ ] Use the EAS production build profile for store artifacts.
- [ ] Confirm Apple App Attest entitlement is production in production builds; never ship a production build with development attestation.
- [ ] Confirm the Android application is signed with the intended Play App Signing certificate.
- [ ] Keep provider credentials and backend secrets out of the mobile bundle.
- [ ] Test camera permission grant, denial, recovery through Settings, image capture, analysis failure, retry, product discovery, and no-results states on physical devices.
- [ ] Test on at least one supported physical iOS device and one supported physical Android device. Simulator/emulator tests do not validate hardware-backed attestation.


### Bounded staging load probe

The repository includes `scripts/load-test.mjs` for a controlled HTTP load probe. Run it only against an approved staging environment after agreeing request volume and expected thresholds with the service owner.

Example health/readiness probe:

```bash
USEIT_LOAD_BASE_URL=https://staging-api.example.com \
USEIT_LOAD_TARGET_ENV=staging \
USEIT_LOAD_APPROVED_ORIGIN=https://staging-api.example.com \
USEIT_LOAD_PATH=/ready \
USEIT_LOAD_REQUESTS=100 \
USEIT_LOAD_CONCURRENCY=5 \
node scripts/load-test.mjs
```

For POST endpoints, explicitly set `USEIT_LOAD_TEST_ALLOW_POST=YES`, provide `USEIT_LOAD_BODY_JSON`, and configure `USEIT_LOAD_API_KEY` if required. POST tests can trigger billable AI calls or state changes. The harness caps each run at 1,000 requests and concurrency at 20, reports status counts, throughput and p50/p95/max latency, and exits non-zero on any failed request. Do not treat a health-endpoint probe as evidence of AI-analysis capacity; use an approved representative payload and a cost ceiling for analysis tests.

## 4. Staged rollout

1. Deploy the exact reviewed backend commit to staging.
2. Apply required environment variables and verify the readiness endpoint.
3. Smoke-test health/readiness, authentication, attestation, image analysis, product discovery, rate limiting, and timeout/error handling.
4. Release mobile builds to internal TestFlight and Google Play internal testing first.
5. Validate sign-in/session creation, attestation on real devices, camera permissions, analysis, shopping results, and recovery after network loss.
6. Run a limited pilot. Track crash-free sessions, API error rates, p95 latency, provider failures, product-resolution success rate, rate-limit events, and per-session AI cost.
7. Expand rollout only after the pilot meets the agreed quality, reliability, and cost thresholds. Record the approval and released commit SHA.

## 5. Monitoring, privacy, and rollback

- [ ] Confirm structured logs include request IDs and status/latency but do not contain images, data URIs, API keys, bearer tokens, or raw provider responses.
- [ ] Confirm `vision_usage` events contain only the model identifier and validated prompt/completion/total token counts; establish model-specific pricing and per-session budget alerts outside the application rather than hard-coding mutable provider prices.
- [ ] Alert on sustained 5xx/429 rates, provider outages, readiness failures, unusual cost spikes, and repeated attestation failures.
- [ ] Verify backups and recovery procedures for the production datastore and shared Redis state where applicable.
- [ ] Document the on-call owner, hosting provider, alert destination, and incident escalation path before public launch.
- [ ] Keep the previous known-good backend artifact and mobile store release available for rollback.
- [ ] For a backend regression, roll back to the previous known-good artifact/configuration and verify readiness and smoke tests. Use a reviewed revert commit for source rollback; do not force-push shared release branches.
- [ ] For a mobile regression, halt staged rollout and use the store's release controls. Mobile clients generally cannot be remotely downgraded, so restore service compatibility on the backend and publish a fixed version.
- [ ] After release, review metrics and crash reports at 24 hours and 7 days; turn findings into tracked issues with owners and acceptance criteria.

## 6. Release record

Record before release:
- Release version and Git commit SHA
- CI run URLs for validation and security workflows
- Backend deployment identifier and environment
- Mobile artifact identifiers and signing/build profiles
- Attestation provider and configuration verification (never record secrets)
- Pilot start/end, acceptance results, approver, and rollback owner

This repository does not itself prove that cloud secrets, Apple/Google console settings, store signing, production hosting, monitoring, backups, or physical-device validation are configured. Those items require verification in the relevant external systems before public release.


## Repository settings required for CI

The dependency-review workflow uses GitHub's dependency graph and must not be bypassed. If it reports that dependency review is unsupported, enable **Settings → Advanced Security → Dependency graph** for this repository, then rerun the workflow for the exact release commit. Lockfile-based npm and Python audits are additional checks, not a substitute for this gate.


## Personal memory security

- Set `USEIT_MEMORY_SECRET` to a randomly generated secret of at least 32 bytes before enabling the memory API.
- Treat memory IDs as bearer capabilities: clients must generate an unpredictable URL-safe token of at least 32 characters and store it privately. Guessable IDs such as usernames are rejected.
- Personal-memory writes require a literal JSON boolean `consent: true`; coerced values such as `1` or `"true"` are not consent.


## Personal memory encryption at rest

Personal-memory values are encrypted with AES-256-GCM before SQLite persistence. The encryption key is derived with domain separation from `USEIT_MEMORY_SECRET`; keep that secret in the host's secret manager and back up the database and secret together. Existing plaintext rows are migrated transactionally on first access after upgrading. If the secret is missing/weak or ciphertext authentication fails, the memory API fails closed rather than returning plaintext or corrupt data.


## Release evidence checkpoint — 2026-11-14 04:13 CET

### Merged application baseline: PR #41

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) remains closed and merged. Reviewed exact PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully on the same PR HEAD. Review inventory: 108 combined timeline records, 22/22 inline threads resolved, and 26 submissions (25 COMMENTED, 1 human APPROVED). Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed on the merge commit. No separate post-merge Dependency Review run is claimed.

### PR #85 — current exact-head documentation gate

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Exact HEAD: `f0453516349d892cc7fd2f0a4769d9a201262c23`; base/main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The branch is 7 commits ahead / 0 behind main and changes the three release-record files. The P2 status-tally review thread `PRRT_kwDOSkaDTM63ShCN` is resolved (1/1). One COMMENTED review submission is recorded, anchored to older commit `74e0eea7b00e8d4706e04b89018830fa75487473`; no human approval for the current PR #85 head is recorded.

All three required workflows for exact HEAD `f0453516349d892cc7fd2f0a4769d9a201262c23` completed with **failure**:

- Validation [43549057054](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057054): backend job [132307033357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057054/job/132307033357), frontend job [132307033548](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057054/job/132307033548), and iOS job [132307033585](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057054/job/132307033585) all failed before runner assignment.
- CodeQL [43549057083](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057083): analyze job [132307033644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057083/job/132307033644) failed before runner assignment.
- Dependency Review [43549057067](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057067): dependency-review job [132307033322](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549057067/job/132307033322) failed before runner assignment.

The raw GitHub jobs API confirms all five jobs were created/started at 2026-11-14 02:57:18 UTC and completed within 1–2 seconds, with `runner_id: 0`, empty `runner_name`, empty `steps`, and no log URL. The step endpoint returned no steps and log downloads returned HTTP 404 `BlobNotFound`. This is evidence of a pre-runner allocation/dispatch failure; it is **not** evidence that application tests ran and failed, nor that they passed. The precise GitHub-side cause remains unverified.

Separately, issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records repository-level security capability blockers on other exact heads: Code Scanning is not enabled for this private repository, and Dependency Graph / GitHub Advanced Security is unavailable or not enabled under the current configuration. Those independently verified blockers remain owner actions; they are not inferred from the no-runner jobs above. Do not remove, skip, or weaken CodeQL or Dependency Review.

### SSRF security issue #64

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PR #70 exact HEAD `935cb0a6b88810696849f93c61a336541ce50914` passed Validation [43433697438](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43433697438), CodeQL [43433697081](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43433697081), and Dependency Review [43433697108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43433697108). PR #79 exact HEAD `109e77ba8ccd78d42d4c4dc9cc0d557c98c0d902` passed Validation [43447696077](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43447696077), CodeQL [43447695973](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43447695973), and Dependency Review [43447695950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43447695950). These remain separate open branches and are not integrated acceptance on `main`.

PR #94 adds deterministic mixed-DNS and peer-validation regression tests at exact HEAD `902d96b06fc033d3642192d429c69b940641d13d`, but Validation [43549425659](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549425659) failed before runner assignment: all three jobs had zero steps, empty runner names, and no logs. The tests were not executed. CodeQL [43549425705](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549425705) and Dependency Review [43549425785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43549425785) also failed under the repository-level configuration blockers recorded in #84. Keep #64 open until #94 receives an actually executed exact-head Validation, human review, and integration. The #79 deterministic transport tests use an injected network backend; they do not claim a live external socket or TLS handshake.

### Governance, inventory, and release decision

The repository remains private. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The last observed main branch metadata reported `protected: false`; the current branch-protection read returns HTTP 403, and the rulesets endpoint returns HTTP 403 with GitHub's requirement to upgrade the private repository plan or make the repository public. Current enforcement therefore remains unverified; the November 2 ruleset evidence is historical, not proof of current protection.

The releases API currently returns an empty list: **0 published GitHub releases**. The branch search returned 66 branches; the current issue search returned 39 open pull requests and 7 open issues. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**. The Code Scanning feature/configuration issue is tracked separately in #84.

The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The other 15 remain In Progress. Pilot/production acceptance remains **NOT GRANTED**. Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user-pilot, or business-approval items based on CI, simulator, or emulator evidence.


---

## Current release and governance checkpoint — 2026-11-14 22:59 CET

The repository is currently public. Main HEAD is \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`; GitHub branch metadata reports \`protected: true\`. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces pull requests, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (\`CodeQL\`, \`backend\`, \`frontend\`, \`ios\`, \`analyze\`, \`dependency-review\`), deletion/non-fast-forward protection, and no bypass actors. The legacy branch-protection detail endpoint is not readable by the connected integration (HTTP 403); the active ruleset is directly readable. No protection setting was changed. Issue #47 is closed after verification. The owner's final public/private decision remains separate.

PR #85 parent HEAD \`3268fb78da02f3c2f0843f8455ac065683712651\` passed exact-head Validation [43641492814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492814), CodeQL [43641492911](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492911), and Dependency Review [43641492818](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492818). Validation recorded backend 450/450, readiness 27/27, production-security 78/78, frontend 289/289 across 59 files, Expo Doctor 21/21, Android Release/emulator smoke and iOS Release/simulator smoke success, cryptography 50.0.2, and clean pip-audit. Runtime npm audit still reports three moderate minimatch findings; do not force the incompatible major fix or downgrade Expo.

The dependency-review workflow now succeeds on this public repository state. If it becomes unsupported again after an owner visibility/plan change, enable the required Dependency Graph capability in repository settings and rerun the exact release commit. Never remove, skip, or weaken the check. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable/unverified, not empty.

PR #99 remains draft. Its source-SHA checks passed before retarget to main, but no post-retarget exact-head set exists. A human security review has been requested; none is submitted yet. Issue #64 remains open. PR #85 also has a human reviewer request pending; neither review request is approval.

Production release still requires the external steps in this runbook: Apple/Google production configuration, signed store builds, physical-device attestation, production deployment and monitoring, witnessed backup/restore, staged rollout/rollback, and real-user pilot/business approval. CI success does not satisfy those gates. **Release remains NOT READY; production/pilot acceptance is NOT GRANTED.**


## Live release and governance reconciliation — 2026-11-15 09:23 CET

- Repository visibility is currently public. Inventory: 74 branches / 38 open PRs / 7 open non-PR issues / 0 published releases.
- Main HEAD: f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1; GitHub branch metadata reports protected:true.
- Active ruleset Protect main, ID 26370589, targets the default branch and requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, strict checks CodeQL, backend, frontend, ios, analyze, and dependency-review; deletion and non-fast-forward updates are blocked. No bypass actor is configured. No protection setting was changed.
- PR #85 exact HEAD 66dd30ef8cdc10702fa9d2ec3ff4062056c9d75d: Validation 43689326489, CodeQL 43689326486, and Dependency Review 43689326524 all SUCCESS. Backend 450, readiness 27, production-security 78, frontend 289 across 59 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release/simulator smoke passed. Cryptography 50.0.2; pip-audit clean. Runtime npm audit still reports three moderate minimatch findings.
- PR #99 exact HEAD 0c66d9c3f0d6d3ba28db8020cd67eed04952c28f, base main: Validation 43684598555, CodeQL 43684598557, and Dependency Review 43684598448 all SUCCESS. Backend 509, readiness 27, production-security 78; cryptography 50.0.2 and pip-audit clean. Frontend 289/289 across 59 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release/simulator smoke passed. HTTPX 0.28.1/httpcore 1.0.9 transport tests cover pinned TCP address, peer verification, original Host/TLS SNI, redirect-hop DNS re-resolution, and same-host DNS rebinding rejection. PR #99 remains draft; no human security review is submitted, so issue #64 stays open.
- PR #90 failed at exact HEAD cb4e6029ba652d8f3ed4d673025283e93a81840e on one real accessibility test: StatePanel used nullish coalescing for an optional hint, allowing an empty string. The production fix and regression test are now committed as 49e1cf958a25cf8399e40b2495c8d96a67bd4d02; its exact-head Validation and CodeQL are running, Dependency Review has succeeded. Do not treat that new commit as validated until all required checks are terminal.
- Human approval is still missing on PR #85; external production, physical-device, monitoring, backup/restore, rollout, pilot and business-acceptance gates remain blocked. Release: NOT READY.


## Exact-head release reconciliation — 2026-11-15 11:36 CET

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) current exact HEAD: `ad26a2a1ab5019ba4e2924412cfc90bfa2677cfa`, base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.

- Validation [43701032092](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032092): **SUCCESS**. Backend job [132771997733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032092/job/132771997733): 450 backend tests, 27 readiness checks and 78 production-security checks passed; cryptography 50.0.2; pip-audit reported no known vulnerabilities. Frontend job [132771997992](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032092/job/132771997992): 59/59 test files and 289/289 tests passed, Expo Doctor 21/21, Android Release build and emulator install/launch smoke passed. Runtime npm audit still reports **3 moderate minimatch findings**; the high-severity workflow threshold does not make the npm audit clean. iOS job [132771997918](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032092/job/132771997918): iOS Release build and simulator install/launch smoke passed.
- CodeQL [43701032116](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032116): **SUCCESS**.
- Dependency Review [43701032109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43701032109): **SUCCESS**.
- The exact-head review-thread inventory contains one P2 status-tally thread; it is resolved and outdated. The review submission inventory contains only an automated Codex COMMENTED review, no human APPROVED review. Reviewer `tarlaci1984-sketch` remains requested.
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Release remains **NOT READY** and pilot/production acceptance remains **NOT GRANTED**. No external acceptance gate is promoted by CI evidence.

No application code, dependency policy, security check, or main branch protection was changed by this documentation checkpoint.

---

## Exact-head release evidence reconciliation — 2026-11-15 16:29 CET

This checkpoint supersedes earlier workflow/head summaries in this document. Historical entries are retained for audit history; they are not current status.

### Current documentation candidate and CI

- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, not merged, base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Current exact documentation HEAD before this checkpoint: `758f79de03a8bdbf00d5109d78e0b92c723e95fd`.
- Validation [43723328158](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43723328158): **SUCCESS**. Backend, frontend/Android, and iOS jobs all completed successfully. Backend: 450 tests, 27 readiness checks, 78 production-security checks; cryptography 50.0.2; pip-audit clean. Frontend: 289/289 tests across 59 files, Expo Doctor 21/21, Android Release build and emulator install/launch smoke passed. iOS Release build and simulator install/launch smoke passed.
- CodeQL [43723328164](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43723328164): **SUCCESS**.
- Dependency Review [43723328172](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43723328172): **SUCCESS**.
- Runtime npm audit still reports **3 moderate minimatch-related findings**. This is not a clean npm audit and no global minimatch 11 override or Expo downgrade is accepted.

### Full dependency-tree npm audit

- PR [#107](https://github.com/milanradics89-beep/POS-Doctor/pull/107) parent exact HEAD `c824e6c98f4d3252b121db208242b271729c4f0d` completed Validation [43724886123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43724886123), CodeQL [43724886112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43724886112), and Dependency Review [43724886131](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43724886131): all **SUCCESS**.
- Full-tree audit artifact [npm-full-audit-report](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43724886123/artifacts/14166298508): **3 moderate, 0 high, 0 critical**. npm's suggested Expo 52.0.49 downgrade is breaking and rejected.
- A fail-closed parser hardening commit `6e0d24587466fc7da35ace3a4af7a044d266991a` is now on PR #107. It validates all five severity counters, rejects malformed entries, and rejects contradictory high/critical metadata, with targeted regressions. Its own exact-head checks are pending; do not transfer the parent green result to this child commit.

### Current security, design, Redis and Copilot evidence

- PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99), HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`: Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448) all **SUCCESS**. Backend 509, readiness 27, production-security 78; frontend 289/289; Expo Doctor 21/21; Android/iOS Release and simulator smoke passed. The HTTPX 0.28.1/httpcore 1.0.9 transport tests exercise redirect-hop DNS re-resolution, numeric-IP pinning, peer verification, original Host/TLS SNI and same-host DNS-rebinding rejection. Independent human security review remains outstanding; issue #64 stays open.
- PR [#90](https://github.com/milanradics89-beep/POS-Doctor/pull/90), HEAD `49e1cf958a25cf8399e40b2495c8d96a67bd4d02`: Validation [43694475229](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475229), CodeQL [43694475198](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475198), Dependency Review [43694475189](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475189) all **SUCCESS**. Main-based design branch is 13 commits ahead / 0 behind main. Human design review remains outstanding.
- PR [#97](https://github.com/milanradics89-beep/POS-Doctor/pull/97), HEAD `6212c217e700e6cf263d6f98e0481af4888c3fa4`: Validation [43600898776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898776), CodeQL [43600898781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898781), Dependency Review [43600898787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43600898787) all **SUCCESS**.
- PR [#102](https://github.com/milanradics89-beep/POS-Doctor/pull/102), HEAD `d34fc14875606f481baa7ba5d2af249a14e8f96d`: Validation [43705014926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705014926), CodeQL [43705014946](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705014946), Dependency Review [43705014936](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705014936) all **SUCCESS**.
- PR [#106](https://github.com/milanradics89-beep/POS-Doctor/pull/106), HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`: Validation [43705947653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947653), CodeQL [43705947633](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947633), Dependency Review [43705947631](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947631) all **SUCCESS**. Redis-py 8.1.0 client compatibility was tested against Redis 7.4; this does not establish a Redis server 8 production migration. Human review remains outstanding.

### Governance and release decision

- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active and unchanged: one approval, stale-review dismissal, last-push approval, resolved review threads, six required status checks, deletion/non-fast-forward protection, and no bypass actors.
- PR #41 is merged; its merged head is `68b380e73ca3c870048035197beef8febbf90ef1`, 22/22 inline review threads are resolved, and one human APPROVED review was submitted.
- The 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. The 64-point Issue #74 checklist remains **26 checked / 38 open** at this checkpoint.
- Release remains **NOT READY** and production/pilot acceptance remains **NOT GRANTED**. Physical iPhone App Attest, Play-installed physical Android Play Integrity, witnessed production backup/restore, monitoring/alert delivery, staged rollout/rollback approval, representative benchmark/business acceptance, and real-user pilot remain external or human gates.



## Exact-head repository reconciliation — 2026-11-15 23:12 CET

This checkpoint supersedes the 22:07 CET snapshot above. It records current GitHub evidence; historical checkpoints remain for audit traceability and are not current status.

### PR #41 — merged application baseline
- PR #41 is closed/merged. Source branch `fix/release-blockers-2026-10` and PR metadata both point to reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch comparison: 517 ahead / 1 behind main; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata: 517 commits, 100 changed files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded; backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs passed.
- Review inventory: 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved.
- Historical Validation 43098210284, CodeQL 43098210473 and Dependency Review 43098210255 remain queued on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has an empty jobs list. They are not current-head checks. Owner/admin cancellation is not exposed by this integration.

### PR #85 — release-documentation branch
- Current exact HEAD `c0d7c54ff4d94750415e92c9023bee5e917303e8`, branch `docs/post-merge-release-evidence-20261113`, base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 62 commits and 3 changed files. PR remains open and unmerged.
- Exact-head Validation [43762241856](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43762241856), CodeQL [43762241890](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43762241890), and Dependency Review [43762241889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43762241889) all completed successfully. Backend, frontend/Android and iOS jobs passed; Android emulator install/launch and iOS simulator install/launch smoke tests passed; CodeQL Analyze and Dependency Review passed.
- Backend pip-audit reported no known vulnerabilities. Runtime npm audit still reports three moderate minimatch-related findings; the npm audit is not clean. No Expo downgrade, forced major override, audit suppression or threshold reduction is accepted.
- Review inventory: 28 conversation comments, 3 COMMENTED review submissions, 2/2 inline threads resolved. The latest Codex review on `c0d7c54ff4d9` found no major issues. No human APPROVED review is recorded; `tarlaci1984-sketch` remains requested.

### PR #107 — complete dependency-tree audit
- Exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all succeeded, including all five jobs.
- Full dependency-tree audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989): 3 moderate, 0 high, 0 critical, 0 low. Findings remain visible and unsuppressed. The fail-closed parser and full-audit-after-runtime-failure workflow correction passed exact-head Validation. One P2 thread is resolved; two COMMENTED submissions, no human approval.

### PR #90 — accessibility/design work
- Current HEAD `606e57ddb86d869a8806aabce947e75857350018`, branch `integration/useit-design-foundation-20261114`. Validation [43766269840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766269840) remains in progress; backend and frontend jobs passed, while the iOS Release build is still running. CodeQL [43766269973](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766269973) and Dependency Review [43766269879](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766269879) succeeded.
- The empty-products panel now uses `shouldShowEmptyProductPanel` to gate it on shopping intent/action; its P2 thread remains open pending validation and reviewer re-evaluation. A second open P2 identifies missing explicit VoiceOver announcement for StatePanel changes; the component currently has role/label/live-region props but no iOS announcement mechanism. PR review inventory: 21 timeline records, 3 COMMENTED submissions, 3 threads (1 resolved / 2 open), no human approval.

### PR #99 — DNS-pinned SSRF and NAT64
- Current HEAD `f122e239da624a3d8d7e38bf80bd088433ae1f77`, branch `fix/ssrf-sorted-address-order-regression-20261114`, base main. Validation [43766380573](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766380573) is still in progress; CodeQL [43766380577](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766380577) and Dependency Review [43766380576](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43766380576) succeeded.
- Backend job failed at `test_connected_peer_accepts_nat64_address_embedding_global_ipv4`: 535 passed / 1 failed. Python 3.12 classifies `64:ff9b::808:808` as reserved; `_is_public_address` rejects it in the generic `_is_public_unicast_address` check before extracting and validating the embedded public IPv4. Frontend Android-emulator and iOS Release/simulator jobs were still running at the latest job read. Do not treat this Validation as passed.
- Two P2 review threads remain open: validate embedded IPv4 under configured network-specific RFC 6052 NAT64 prefixes, and permit the globally reachable well-known `64:ff9b::/96` prefix while still rejecting private embedded IPv4. The current code requires every network-specific translator prefix to be explicitly configured in `USEIT_NAT64_PREFIXES`; the well-known-prefix false rejection is reproduced by the failing test. No code write was made while this exact-head Validation remains active.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open with 34 comments. PR #99 has two COMMENTED review submissions, two open inline threads and no human APPROVED review. Independent security review remains mandatory.

### Governance, releases and security inventories
- Repository visibility is public. Main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires one approval, stale-review dismissal, last-push approval, resolved review threads and six strict checks; deletion/non-fast-forward are blocked and bypass actors are empty. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed with 10 comments. Backlog item #2 remains Blocked only for the owner's final public/private and plan decision, not because the current ruleset is absent.
- GitHub Releases API returned an empty array: 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories are not exposed to this integration; they remain unavailable/unverified, not empty.
- Issue #74 remains open with 81 comments and 64 checklist boxes: 31 checked / 33 open.
- The 25-point register remains 2 Done / 15 In Progress / 8 Blocked. Done: #1 and #6. Blocked: #2 owner visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/tested rollback; #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- Release remains NOT READY; production/pilot acceptance remains NOT GRANTED. Simulator/emulator CI, security scans and documentation do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot or business-approval gates.

 
## Exact-head release reconciliation — 2026-11-16 00:40 CET

This checkpoint supersedes the 2026-11-15 23:12 CET operational snapshot above. Historical checkpoints are retained for traceability; the evidence below is the latest verified state.

### PR #41 — merged application baseline
- PR #41 is closed and merged. Source branch `fix/release-blockers-2026-10` points to exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; the live branch ref matches. Merge commit and main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch comparison: 517 ahead / 1 behind main; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata: 517 commits, 100 files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully on this exact SHA. Backend, frontend, iOS, CodeQL Analyze, and Dependency Review jobs passed.
- Review inventory: 108 combined timeline records; 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`); 22/22 inline threads resolved.
- Historical runs 43098210284, 43098210473 and 43098210255 remain queued against obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` and have empty job lists. They are not current-head checks and are not represented as passing.

### PR #85 — release documentation
- Exact HEAD before this checkpoint: `fe33ed03f3c824babb2839c956bdfae9a31cdbbf`; branch `docs/post-merge-release-evidence-20261113`, base main at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 63 commits, 3 changed files. PR remains open and unmerged.
- Exact-head Validation [43768435582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43768435582), CodeQL [43768435606](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43768435606), and Dependency Review [43768435651](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43768435651) all succeeded. Backend, frontend/Android, and iOS jobs passed; Android emulator install/launch and iOS Release simulator install/launch smoke passed.
- Review: 34 combined timeline records, two inline threads and both are resolved/outdated; three review submissions are COMMENTED, with no human APPROVED review. Reviewer `tarlaci1984-sketch` remains requested.
- This new checkpoint is a documentation-only child of `fe33ed0`; its own Validation, CodeQL, and Dependency Review must run on the new child SHA. Parent green checks are not inherited as child acceptance.

### PR #90 — accessible design foundation
- Exact HEAD `27d7c201d3cc63f357af538abd8b89e0c80cca24`; 17 commits, 16 changed files; PR open, non-draft.
- Exact-head Validation [43772776331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776331), CodeQL [43772776342](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776342), and Dependency Review [43772776343](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776343) all succeeded. Backend, frontend/Android, and iOS jobs passed; Android emulator and iOS simulator smoke completed.
- The empty-products panel is gated by shopping intent through `shouldShowEmptyProductPanel`. StatePanel now calls iOS `AccessibilityInfo.announceForAccessibility` on state/title/description changes while preserving the nested recovery Pressable; a targeted component regression asserts the announcement and action accessibility contract.
- Review inventory: 23 combined timeline records; three inline threads, all 3/3 resolved (product-card accessible name, shopping-only empty panel, VoiceOver state announcement); three automated COMMENTED reviews, no human APPROVED review. Human design/accessibility approval remains pending.

### PR #99 / Issue #64 — DNS-pinned SSRF and NAT64
- Exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; branch `fix/ssrf-sorted-address-order-regression-20261114`, base main; 17 commits, 7 changed files. PR remains open and Draft.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all succeeded. Backend, frontend/Android, and iOS jobs passed. Backend production-readiness checks: 78 passed; pip-audit reported no known vulnerabilities. Frontend Android emulator and iOS simulator smoke passed.
- The correction handles RFC 6052-matching addresses before the generic reserved-IPv6 predicate, validates the outer global/non-multicast/non-unspecified address and every embedded IPv4 endpoint, and retains generic reserved-range rejection for non-translator IPv6 destinations.
- Regression coverage includes the well-known `64:ff9b::/96` prefix at syntax-only URL validation, DNS preflight, connected-peer validation, and actual HTTPX/httpcore transport; the transport test verifies the original Host header and TLS SNI. Configured network-specific RFC 6052 prefixes retain all six supported prefix lengths (/32, /40, /48, /56, /64, /96), zero-u-octet checks, invalid-prefix fail-closed behavior, and private embedded IPv4 rejection before TCP connect.
- Both NAT64 P2 inline review threads are now resolved after exact-head CI and code/test inspection. Review inventory: 18 combined timeline records, two automated COMMENTED submissions, two inline threads resolved, no human APPROVED review.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 35 comments. Deployment-specific `USEIT_NAT64_PREFIXES` must be inventoried/configured for the production egress path, and an independent human security review of the HTTPX/httpcore transport is still required. No production security acceptance is claimed.

### PR #107 — complete npm dependency audit
- Exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all succeeded.
- Full dependency-tree audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989): 3 moderate, 0 high, 0 critical, 0 low. Findings remain visible and unsuppressed. Runtime npm audit is not clean; no Expo downgrade, global minimatch override, threshold reduction, or suppression is accepted.
- The workflow runs the full audit after a runtime-audit failure if dependency installation succeeded; fail-closed parser regression tests passed. One P2 thread is resolved; no human approval is recorded.

### Other exact-head PR checks
- PR #96 HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`: Validation 43747514393, CodeQL 43747514431, Dependency Review 43747514474 all SUCCESS.
- PR #106 HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`: Validation 43705947653, CodeQL 43705947633, Dependency Review 43705947631 all SUCCESS. Redis-py 8.1 client compatibility against Redis 7.4 is validated; Redis server 8 production migration is not.
- PR #108 HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`: Validation 43730870752, CodeQL 43730870781, Dependency Review 43730870776 all SUCCESS.

### Repository governance and inventories
- Repository is public. Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires one approving review, stale-review dismissal, last-push approval, resolved review threads and six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review); deletion/non-fast-forward are blocked and there are no bypass actors.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed (10 comments). Its latest body/comment still says to keep it open pending the owner's final public/private and plan decision; this conflicts with the closed state. The active ruleset is verified, but backlog item #2 remains Blocked for the owner's decision.
- Issue #64 is open (35 comments). Issue #74 is open (82 comments); its persisted 64-box checklist remains 31 checked / 33 open.
- Live repository inventory: 78 branches, 38 open PRs, 6 open non-PR issues, 0 published GitHub releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through this integration and remain unavailable/unverified, not empty.

### Authoritative 25-point release register
- **Done (2):** #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 owner public/private and plan decision; #4 physical iPhone App Attest plus production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.
- No physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot, or business-approval item is promoted by automated CI. Release remains NOT READY; production/pilot acceptance remains NOT GRANTED.


## Exact-head follow-up — 2026-11-16 01:20 CET

This follow-up closes the previous checkpoint's pending validation statement for documentation HEAD `769546a9390ef81f2bced1ed9d8823953a476242`. The following runs are attached to that exact SHA:
- Validation [43776477235](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43776477235): SUCCESS; backend, frontend/Android, and iOS jobs all completed successfully. Android Release build/emulator install-launch smoke and iOS Release/simulator install-launch smoke passed.
- CodeQL [43776477232](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43776477232): SUCCESS.
- Dependency Review [43776477270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43776477270): SUCCESS.
- The #85 documentation P2 threads remain resolved. Reviewer `tarlaci1984-sketch` is still requested; no human APPROVED review is recorded.

### Current technical PRs
- **PR #90** HEAD `27d7c201d3cc63f357af538abd8b89e0c80cca24`: Validation [43772776331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776331), CodeQL [43772776342](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776342), Dependency Review [43772776343](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772776343) all SUCCESS. Backend/frontend/iOS jobs passed; frontend 315 tests across 67 files, Expo Doctor 21/21, Android emulator smoke and iOS simulator smoke passed. All three P2 review threads are resolved. No human design/accessibility approval or merge.
- **PR #99 / Issue #64** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`: Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all SUCCESS. Backend 539, readiness 27, production-security 78 passed; cryptography 50.0.2; pip-audit reports no known Python vulnerabilities. The frontend and iOS jobs, Android emulator and iOS simulator smoke also passed. Both NAT64 P2 threads are resolved. Issue #64 remains OPEN: production `USEIT_NAT64_PREFIXES` inventory/configuration and independent human security approval are outstanding; PR #99 remains Draft.
- **PR #109 CI incident** is closed as completed after the failed `f122e239` NAT64 validation was corrected by #99 HEAD `f91c70d` and the full exact-head check set passed. Closing this CI incident does not close issue #64 or grant security acceptance.
- **PR #85** remains open/unmerged and awaits human approval. **PR #96, #97, #106, #107 and #108** retain their previously verified terminal-success exact-head check sets. PR #107's full npm audit still reports 3 moderate / 0 high / 0 critical / 0 low; the findings remain visible and unsuppressed.

### Checklist and release decision
- Main HEAD remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active and unchanged.
- Repository is public; inventory is 78 branches / 38 open PRs / 6 open non-PR issues.
- Issue #74's persisted body remains 64 boxes / 31 checked / 33 open. A targeted body update for the validated main-based design-integration item did not persist; the evidence is recorded in issue comment [#6903876391](https://github.com/milanradics89-beep/POS-Doctor/issues/74#issuecomment-6903876391). No checkbox is claimed as changed.
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. The eight blocked items still require owner decision, physical Apple/Google devices and production configuration, witnessed backup/restore, benchmark/business acceptance, production monitoring/alert delivery, staged rollout/rollback approval, and real-user pilot/business sign-off.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified, not empty.

**Release NOT READY. Production/pilot acceptance NOT GRANTED.** CI and simulator/emulator evidence do not replace human approval or external production acceptance.


## Live release-watch checkpoint — 2026-11-16 03:18 CET

### PR #41 — merged baseline
- PR is CLOSED/MERGED. Reviewed source branch `fix/release-blockers-2026-10` remains at exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; branch ref matches. Merge commit and current main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR diff: 517 commits from merge base, 100 files, +11,887 / -2,005. Compare main...source branch reports 517 ahead / 1 behind (merge-base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0)); this is the historical source-branch comparison, not an open/unmerged PR state.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all SUCCESS. Backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs and their steps passed.
- Review inventory: 108 combined timeline entries (52 conversation comments, 30 inline comments, 26 review submissions); 25 COMMENTED and one human APPROVED; all 22/22 inline threads resolved. PR description retains stale historical open/unmerged text; live PR metadata is authoritative.

### PR #85 — current release-record branch
- Current HEAD `89757fdd0b549c96447edb874a64d39d6f22cbb4`, 66 commits, 3 files, +4,437 / -31; PR remains open and unmerged.
- Exact-head Validation [43784170026](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43784170026), CodeQL [43784170040](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43784170040), Dependency Review [43784169985](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43784169985) all SUCCESS. Backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed.
- Review inventory: 37 combined entries (31 conversation comments, 3 inline comments, 3 review submissions); all submissions COMMENTED; 2/2 inline threads resolved; no human APPROVED review. Reviewer `tarlaci1984-sketch` remains requested.

### PR #90 — design/accessibility validation
- Current HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`, 20 commits, 20 files, +1,061 / -158; open and unmerged.
- Exact-head Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) all SUCCESS. Backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed. Latest change pins the Android validation runner and adds a workflow-contract regression.
- Review inventory: 25 combined entries (19 conversation comments, 3 inline comments, 3 COMMENTED submissions); 3/3 threads resolved; no human APPROVED review. Human design/accessibility approval remains pending.

### PR #99 / Issue #64 — SSRF and NAT64
- Current PR HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`, 17 commits, 7 files, +1,417 / -34; open and Draft.
- Exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all SUCCESS; backend, frontend/Android and iOS jobs passed.
- The well-known `64:ff9b::/96` and configured RFC 6052 /32, /40, /48, /56, /64 and /96 paths validate embedded IPv4 destinations; private embedded IPv4 is rejected before TCP connect. HTTPX/httpcore transport tests cover numeric-IP pinning, connected-peer verification, original Host/TLS SNI, redirect-hop DNS re-resolution and rebinding rejection.
- Review inventory: 18 combined entries (14 conversation comments, 2 inline comments, 2 COMMENTED submissions); both P2 threads resolved; no human APPROVED review. Issue #64 remains OPEN with 38 comments. Production `USEIT_NAT64_PREFIXES` inventory/configuration and independent human security approval remain outstanding.

### PR #107 and supporting branches
- PR #107 HEAD `431d96a31beb523be31c109d81c7009d49357318`: Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all SUCCESS; backend, frontend/Android, iOS, analyze and dependency-review jobs passed. Full npm audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) reports 3 moderate / 0 high / 0 critical / 0 low; findings remain visible and unsuppressed.
- PR #96 HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`, PR #106 HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`, and PR #108 HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e` each retain exact-head Validation, CodeQL and Dependency Review SUCCESS.

### Governance, inventory and acceptance
- Repository visibility is public; main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Main reports protected=true. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch, requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-review dismissal, last-push approval and resolved threads; deletion/non-fast-forward are blocked; no bypass actors.
- Issue #47 is closed (10 comments), but its body still contains a prior instruction to keep it open pending the owner's long-term public/private and plan decision. Current public visibility and active ruleset are verified; the durable owner decision remains unconfirmed, so workstream #2 stays Blocked.
- Issue #74 remains open with 86 comments; its persisted checklist is 64 items: 31 checked / 33 open. Issue #64 remains open with 38 comments.
- Repository inventory: 78 branches, 38 open PRs, 5 open non-PR issues (#74, #64, #25, #24, #23), and 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through this integration; they remain unavailable/unverified, not empty.
- The 25-point register remains 2 Done (#1, #6), 15 In Progress (#3, #7–#15, #17, #19, #20, #23, #24), and 8 Blocked (#2, #4, #5, #16, #18, #21, #22, #25). Physical devices, production configuration/cloud access, witnessed backup/restore, monitoring, staged rollout, real-user pilot and business approval remain external gates.

This checkpoint is being appended as a documentation-only child of PR #85 HEAD `89757fdd0b549c96447edb874a64d39d6f22cbb4`. The child commit's own Validation, CodeQL and Dependency Review must run and pass; the parent's successful checks are not inherited. Release remains NOT READY; production/pilot acceptance remains NOT GRANTED.


## 2026-11-16 04:23 CET — Exact-head completion checkpoint

The documentation child `10597c75f4c3d0dd360e5df400dcd631f03e5f0a` has now completed its own Validation, CodeQL and Dependency Review successfully. All backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed. See the complete current evidence below.


---

## Exact-head release evidence refresh — 2026-11-16 04:23 CET

### PR #41 — merged application baseline
- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` resolves to exact PR HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Comparison reports 517 ahead / 1 behind main (merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`). PR metadata: 517 commits, 100 changed files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. Backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Review: 108 timeline records (52 conversation comments, 30 inline comments, 26 review submissions: 25 COMMENTED / 1 human APPROVED); 22/22 inline threads resolved. Human approval recorded from `tarlaci1984-sketch`.

### PR #85 — release documentation, current exact HEAD
- PR #85 remains OPEN and unmerged on `docs/post-merge-release-evidence-20261113`, targeting main. Exact HEAD `10597c75f4c3d0dd360e5df400dcd631f03e5f0a`; 67 commits, 3 changed files, +4,572 / -31.
- The current child HEAD's own Validation [43791800960](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43791800960), CodeQL [43791800916](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43791800916), and Dependency Review [43791800928](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43791800928) are all terminal SUCCESS. Backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs all completed successfully. This supersedes the preceding checkpoint's statement that this child's checks were still pending; parent evidence is not reused.
- Review: 37 timeline records (31 conversation comments, 3 inline comments, 3 COMMENTED submissions); 2/2 threads resolved; no human APPROVED review. Reviewer `tarlaci1984-sketch` remains requested. Human release approval is still required.

### PR #90 — design/accessibility
- Exact HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`; Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), and Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) are all terminal SUCCESS; backend, frontend/Android, iOS, analyze and dependency-review jobs passed.
- Review: 25 timeline records (19 conversation comments, 3 inline comments, 3 COMMENTED submissions); 3/3 threads resolved; no human APPROVED review. Human design/accessibility approval remains pending.

### PR #99 / Issue #64 — SSRF and NAT64
- PR #99 remains OPEN/DRAFT on main at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS; backend, frontend/Android, iOS, analyze and dependency-review jobs passed.
- Regression coverage includes well-known `64:ff9b::/96`, configured RFC 6052 /32, /40, /48, /56, /64 and /96 prefixes, public embedded IPv4 acceptance, private embedded IPv4 rejection before TCP, numeric-IP pinning, connected-peer verification, original Host/TLS SNI, and redirect-hop DNS re-resolution/rebinding rejection. Both P2 review threads are resolved.
- Issue #64 remains OPEN with 38 comments. Production egress owners must still provide the authoritative NAT64 prefix inventory and verified `USEIT_NAT64_PREFIXES` configuration; independent human security review of the HTTPX/httpcore transport remains outstanding. No production security acceptance is granted.

### PR #107 — full dependency audit
- Exact HEAD `431d96a31beb523be31c109d81c7009d49357318`. Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) are terminal SUCCESS; all five jobs passed.
- Full npm audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) reports 3 moderate / 0 high / 0 critical / 0 low. Findings remain visible and unsuppressed; the npm audit is not clean. Its one inline review thread is resolved; human security approval remains pending.

### Governance, inventory and security-alert availability
- Repository is currently PUBLIC. Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; branch API reports `protected: true`. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approval, stale-review dismissal, last-push approval and resolved threads; deletion/non-fast-forward are blocked; no bypass actors.
- Issue #47 is CLOSED (10 comments). Its body contains an older private/plan-limitation snapshot; a later issue comment records the repository restored to public and the active ruleset. Current live repository metadata and ruleset endpoint confirm public visibility and active enforcement. The owner's durable long-term public/private and plan decision remains unconfirmed; workstream #2 stays Blocked.
- Issue #74 remains OPEN with 86 comments; persisted checklist is 64 items, 31 checked / 33 open. Repository inventory: 78 branches, 38 open PRs, 5 open non-PR issues (#74, #64, #25, #24, #23), and 0 published releases (Releases API returned an empty array).
- Code Scanning, Dependabot and Secret Scanning alert inventories are not exposed by this integration. Their status is unavailable/unverified, not zero.

### Authoritative 25-point status register

**Done — 2:** #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.

**In Progress — 15:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.

**Blocked — 8:**
| # | Workstream | Required evidence |
|---:|---|---|
| 2 | Repository visibility / GitHub plan decision | Owner's durable decision |
| 4 | Apple App Attest | Production entitlement and witnessed physical iPhone |
| 5 | Google Play Integrity | Play-installed physical Android validation |
| 16 | Backup / restore | Witnessed production recovery |
| 18 | Product recognition | Representative benchmark and business acceptance |
| 21 | Monitoring | Production alert delivery and verified response |
| 22 | Staged rollout | Authorized approval and tested rollback |
| 25 | Real-user pilot | Real-user evidence and business sign-off |

The register remains exactly 25 workstreams: **2 Done / 15 In Progress / 8 Blocked**. No external acceptance gate is promoted by automated CI, documentation, emulator/simulator smoke, or resolved review threads. **Release NOT READY; production/pilot acceptance NOT GRANTED.**

---

## Exact-head reconciliation — 2026-11-16 05:50 CET

This entry supersedes the 04:44 CET snapshot above. PR #85 source HEAD immediately before this documentation-and-regression-test child is `3402686bcdbe73eb921c5ab9a174c8b0899bc239`.

### PR #85 exact parent-head evidence
- Validation [43802599004](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43802599004): **SUCCESS**. Backend job passed 450 tests, 27 readiness checks and 78 production-security checks. Frontend passed **293 tests across 60 files**, the release-document checkpoint regression (4/4), Expo Doctor 21/21, Android Release build and emulator install/launch smoke. iOS Release build and simulator install/launch smoke passed.
- CodeQL [43802599033](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43802599033): **SUCCESS**.
- Dependency Review [43802599167](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43802599167): **SUCCESS**.
- These runs validate parent HEAD `3402686bcdbe73eb921c5ab9a174c8b0899bc239` only. This documentation-and-test child must pass its own exact-head Validation, CodeQL and Dependency Review; parent checks are not inherited.
- PR #85 remains OPEN and unmerged. All four inline review threads are resolved. Codex reviewed parent `3402686` and found no major issue. No human APPROVED review is recorded; `tarlaci1984-sketch` remains requested.

### Current related exact-head evidence
- **PR #90 USEIT design/accessibility:** HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`; Validation `43788320357`, CodeQL `43788320223`, Dependency Review `43788320228` all **SUCCESS**. Backend 450, readiness 27, production-security 78; frontend 321 tests / 70 files; Expo Doctor 21/21; Android Release/emulator and iOS Release/simulator smoke passed. Three inline threads are resolved; human design/accessibility approval remains pending.
- **PR #96 Copilot guidance:** HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0`; Validation `43800887062`, CodeQL `43800886964`, Dependency Review `43800887028` all **SUCCESS**. The synthetic-fixture privacy clarification and regression test are present; its only inline thread is resolved. Human approval remains pending.
- **PR #99 SSRF/NAT64:** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation `43772791089`, CodeQL `43772791064`, Dependency Review `43772791109` all **SUCCESS**. Backend 539, readiness 27, production-security 78; frontend 289/289 across 59 files; Expo Doctor 21/21; Android/iOS Release smoke passed. Actual HTTPX 0.28.1/httpcore 1.0.9 socket tests cover numeric-IP pinning, peer verification before TLS/request bytes, original Host/TLS SNI, redirect-hop DNS re-resolution and private rebinding rejection. Both inline threads are resolved. Issue #64 remains OPEN pending independent human security approval and production NAT64 prefix/configuration evidence.
- **PR #108 non-empty Vitest gate:** HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`; Validation `43730870752`, CodeQL `43730870781`, Dependency Review `43730870776` all **SUCCESS**. The workflow uses plain `npm test`, the regression rejects `--passWithNoTests`, and Codex found no major issue. Human approval remains pending.
- **PR #41:** merged at reviewed source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge/main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 22/22 review threads resolved and one human APPROVED review. Three obsolete runs on stale SHA `b46c5b8` remain QUEUED with zero jobs; owner/admin cancellation is required.
- **PR #65/#67/#68/#69:** closed/unmerged historical candidates. SDK 57 package/lock alignment, Node 22 JS config-plugin/runtime TypeScript separation, Redis runbook fixes and the separate cryptography 50.0.2 / pip-audit result are verified in the main/release lineage.

### Dependency audit disposition
- The exact PR #85 frontend log for `npm audit --omit=dev --audit-level=high` reports **3 moderate findings**, zero high and zero critical: `GHSA-g3hv-75wg-m249` through `expo → @expo/fingerprint → minimatch`. The `--audit-level=high` flag sets the failure threshold; it does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit.
- `npm audit fix --force` proposes the breaking Expo 52.0.49 downgrade. The global minimatch 11 override remains rejected because it violates the declared `@expo/fingerprint` `^10.2.6` range and changes fingerprint ignore semantics. Keep the moderate finding visible and unsuppressed; no downgrade or unsupported override is applied.

### Repository, checklist and release gates
- Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; inventory: 78 branches, 38 open PRs, 5 open non-PR issues; repository visibility remains PUBLIC pending the owner's decision.
- Protect main ruleset `26370589` remains active and unchanged: six required checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors.
- Issue #74 current persisted checkbox count: **64 items / 35 checked / 29 open**. Older 26/31 checked figures elsewhere in the historical issue body are superseded by the current checkbox count; no external gate is promoted by documentation or CI.
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Physical App Attest / Play Integrity, production backup/restore, benchmark/business acceptance, monitoring/alert delivery, staged rollout/rollback, real-user pilot and owner visibility/plan decision remain external or human gates.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**



## Exact-head reconciliation — 2026-11-16 12:30 CET

This checkpoint supersedes the 05:50 CET snapshot and older checklist counts. It preserves all historical evidence and operational runbook procedures above. The source/validated parent below is the exact PR #85 HEAD immediately before this documentation refresh.

### PR #85 — release-documentation validation

- PR #85 is OPEN and unmerged on `docs/post-merge-release-evidence-20261113`, base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, with 77 commits and 4 changed files.
- PR #85 validated parent HEAD is `e759240d4bd34268dac7f6aa16730e07e533e827`.
- These runs validate parent HEAD `e759240d4bd34268dac7f6aa16730e07e533e827` only. Do not attribute these results to the documentation child created by this checkpoint.
- Exact-head parent Validation [43850175026](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43850175026): **SUCCESS**. Backend, frontend and iOS jobs all passed. Frontend completed 296 tests across 60 files, typecheck, Expo Doctor, Android export, native Android Release build, emulator install/launch smoke, and runtime dependency audit. iOS native Release build and simulator install/launch smoke passed.
- Exact-head parent CodeQL [43850175048](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43850175048): **SUCCESS**; Analyze job passed.
- Exact-head parent Dependency Review [43850174981](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43850174981): **SUCCESS**; dependency-review job passed.
- PR #85 review inventory: 62 combined timeline records, 8 review submissions, 6 inline threads; all 6 threads are resolved (5 outdated). No human APPROVED review is recorded. `tarlaci1984-sketch` remains requested; human release approval is still required.
- PR #114 is CLOSED/MERGED into this documentation branch at the same exact commit `e759240d4bd34268dac7f6aa16730e07e533e827`. Its one-file grouped workflow-ID regex correction was reviewed by Codex on that exact SHA; Codex reported no major issues. PR #112 remains OPEN/DRAFT on older base `21eeb082481060fcac0804e55ef5a858bc286dc0`; its green checks are not substituted for current PR #85 evidence.
- Issue #113 is CLOSED after the successful exact-head validation above. The original double-escaped grouped-ID parser regression is resolved; no application code, security gate, or audit threshold was changed.
- The documentation commit created by this checkpoint is a new child of the validated parent. It must pass its own exact-head Validation, CodeQL and Dependency Review; no child result is inferred or claimed here.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` still points to exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch comparison against main: 517 commits ahead / 1 behind; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata records 517 commits, 100 changed files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on the reviewed source SHA.
- PR #41 review inventory: 108 combined timeline records (52 conversation comments, 30 inline comments and 26 review submissions); 22/22 inline threads resolved, 20 outdated; one human APPROVED review by `tarlaci1984-sketch`.
- Three historical runs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` remain QUEUED with no jobs. They are not current-head checks. The connected integration does not expose the cancellation operation; owner/admin cancellation is required.
- The source branch object reports `protected:false`; main protection is enforced through the active repository ruleset below.

### Current technical PRs

- **PR #90 accessibility/design:** exact HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`; Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) all terminal SUCCESS. All three inline findings are resolved. Human accessibility/design approval remains pending.
- **PR #99 SSRF/NAT64:** exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all terminal SUCCESS. Tests cover numeric-IP pinning, connected-peer verification before TLS/request bytes, Host/TLS SNI preservation, redirect-hop DNS re-resolution, private-answer rebinding rejection, well-known NAT64 and RFC 6052 prefix lengths /32, /40, /48, /56, /64 and /96. PR remains OPEN/DRAFT.
- **Issue #64** remains OPEN (40 comments). Production egress owners must provide the authoritative DNS64/NAT64 prefix inventory and verify deployed `USEIT_NAT64_PREFIXES`; independent human security review of the HTTPX/httpcore transport and human security approval remain outstanding. No production security acceptance is granted.
- **PR #107 dependency audit:** exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all terminal SUCCESS. The full audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) and current PR #85 runtime audit report **3 moderate / 0 high / 0 critical** findings, including `GHSA-g3hv-75wg-m249` through `expo → @expo/fingerprint → minimatch`. The `--audit-level=high` threshold does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit. No forced Expo downgrade, global minimatch override, or finding suppression was applied.

### Governance, inventory and alert availability

- Repository metadata: **PUBLIC**, default branch `main`. Main exact HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; branch API reports `protected:true`.
- Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets `~DEFAULT_BRANCH`, enforcement active, requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, and six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`). Deletion and non-fast-forward updates are blocked; no bypass actors; current-user bypass is never.
- Issue #47 is CLOSED (10 comments); its current verification records public visibility and active main ruleset. The owner’s durable long-term public/private and GitHub-plan decision is not independently evidenced as final; release workstream #2 remains Blocked.
- Issue #74 is OPEN (94 comments). Its current persisted body contains **64 checklist items: 39 checked / 25 open**. This is separate from the 25-point release register. No checkbox was changed by this checkpoint.
- The latest repository inventory recorded in Issue #74 at 12:18 CET is 80 branches, 26 open PRs and 6 open non-PR issues. Treat this as the last recorded inventory snapshot, not a fresh count after this checkpoint.
- GitHub Releases API returned an empty array: no published releases were found.
- Code Scanning, Dependabot and Secret Scanning alert endpoints are not exposed by the connected integration. Their inventories are **unavailable/unverified, not empty**.

### Authoritative 25-point release register

**Done — 2:** #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.

**In Progress — 15:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.

**Blocked — 8:**

| # | Workstream | Required evidence |
|---:|---|---|
| 2 | Repository visibility / GitHub plan decision | Owner’s durable decision |
| 4 | Apple App Attest | Production entitlement and witnessed physical iPhone |
| 5 | Google Play Integrity | Play-installed physical Android validation |
| 16 | Backup / restore | Witnessed production recovery |
| 18 | Product recognition | Representative benchmark and business acceptance |
| 21 | Monitoring | Production alert delivery and verified response |
| 22 | Staged rollout | Authorized approval and tested rollback |
| 25 | Real-user pilot | Real-user evidence and business sign-off |

The register remains exactly 25 workstreams: **2 Done / 15 In Progress / 8 Blocked**. External console setup, physical-device acceptance, production cloud access, witnessed recovery, staged rollout and real-user/business approval remain Blocked until evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**


## Exact-head reconciliation — 2026-11-16 13:34 CET

This checkpoint supersedes the earlier repository inventory snapshot in this document. It preserves the historical runbook, acceptance evidence and the canonical 25-point register.

### PR #85 — current exact-head release-documentation validation

- PR #85 is OPEN and unmerged on `docs/post-merge-release-evidence-20261113`, base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Current metadata: **78 commits / 4 changed files**.
- PR #85 exact current HEAD is `ec7227c73951e1c0354fb4c248666d9fab841e4c`.
- These exact-head runs validate PR #85 HEAD `ec7227c73951e1c0354fb4c248666d9fab841e4c` only. All three required workflows are terminal SUCCESS:
  - Validation [43859741920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43859741920): **SUCCESS**; backend, frontend/Android and iOS jobs all completed successfully.
  - CodeQL [43859742093](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43859742093): **SUCCESS**; Analyze job passed.
  - Dependency Review [43859742153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43859742153): **SUCCESS**; dependency-review job passed.
- The earlier validated parent `e759240d4bd34268dac7f6aa16730e07e533e827` is historical evidence only; the three successful runs above belong to the current child HEAD `ec7227c`.
- PR #114 is CLOSED/MERGED into this documentation branch at `e759240d4bd34268dac7f6aa16730e07e533e827`, with the grouped workflow-ID parser correction. PR #112 remains OPEN/DRAFT on an older parent and is not used as current PR #85 evidence.
- PR #85 review inventory: 62 timeline records (54 conversation comments, 8 inline comments), 8 review submissions (all COMMENTED), 6 inline threads (6/6 resolved), and **0 human APPROVED reviews**. `tarlaci1984-sketch` remains requested. Human release approval is still required.
- Issue #113 is CLOSED after the parser regression was corrected and the current exact-head CI passed. No application source, security gate, audit threshold, or test coverage was weakened.

### PR #41 — merged application baseline

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` still points to exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch comparison: **517 ahead / 1 behind**, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata: 517 commits, 100 changed files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS; backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- PR #41 review inventory: 108 combined timeline records (52 conversation comments, 30 inline comments, 26 review submissions); 22/22 inline threads resolved (20 outdated); 25 COMMENTED submissions and one human APPROVED review by `tarlaci1984-sketch`.
- Three historical runs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` remain QUEUED with no jobs: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are stale and do not count as current-head CI. The connected integration has no cancellation operation; owner/admin cancellation remains required.
- The source branch reports `protected:false`; main protection is enforced through the active repository ruleset.

### Current technical PRs and security evidence

- **PR #90 accessibility/design:** exact HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`; Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) all terminal SUCCESS. Three inline findings are resolved; human accessibility/design approval remains pending.
- **PR #99 SSRF/NAT64:** exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all terminal SUCCESS. Tests cover numeric-IP pinning, connected-peer verification before TLS/request bytes, original Host/TLS SNI, redirect-hop DNS re-resolution, private-answer rebinding rejection, and RFC 6052 NAT64 prefix lengths /32, /40, /48, /56, /64 and /96. PR remains OPEN/DRAFT.
- **Issue #64** remains OPEN (40 comments). Production egress owners must provide the authoritative DNS64/NAT64 prefix inventory and verify deployed `USEIT_NAT64_PREFIXES`; independent human security review of HTTPX/httpcore transport and human security approval remain outstanding. No production security acceptance is granted.
- **PR #107 dependency audit:** exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all terminal SUCCESS. Runtime npm audit remains **3 moderate / 0 high / 0 critical** findings, including `GHSA-g3hv-75wg-m249` through `expo → @expo/fingerprint → minimatch`. The `--audit-level=high` threshold does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit. No forced Expo downgrade, global minimatch override, or finding suppression was applied.

### Governance, live inventory and alert availability

- Repository metadata: **PUBLIC**, default branch `main`. Main exact HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; main branch reports `protected:true`.
- Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is enforced and requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion/non-fast-forward protection, and no bypass actors.
- Issue #47 is CLOSED (10 comments); main protection is directly verified. The owner's durable long-term public/private and GitHub-plan decision is not independently evidenced as final; release workstream #2 remains Blocked.
- Fresh GitHub inventory: **80 branches, 39 open PRs, 5 open non-PR issues**. This supersedes the older 80 / 26 / 6 snapshot in Issue #74 and previous release-document checkpoints.
- Issue #74 remains OPEN (94 comments); its persisted checklist is **64 checklist items: 39 checked / 25 open**. This development checklist is separate from the 25-point release register. No checkbox was changed.
- GitHub Releases API returned an empty list: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert endpoints are unavailable to this integration. Their inventories are **unverified, not empty**.

### Authoritative 25-point release register

**Done — 2:** #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.

**In Progress — 15:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.

**Blocked — 8:**

| # | Workstream | Required evidence |
|---:|---|---|
| 2 | Repository visibility / GitHub plan decision | Owner's durable decision |
| 4 | Apple App Attest | Production entitlement and witnessed physical iPhone |
| 5 | Google Play Integrity | Play-installed physical Android validation |
| 16 | Backup / restore | Witnessed production recovery |
| 18 | Product recognition | Representative benchmark and business acceptance |
| 21 | Monitoring | Production alert delivery and verified response |
| 22 | Staged rollout | Authorized approval and tested rollback |
| 25 | Real-user pilot | Real-user evidence and business sign-off |

The register remains exactly 25 workstreams: **2 Done / 15 In Progress / 8 Blocked**. External console setup, physical-device acceptance, production cloud access, witnessed recovery, staged rollout and real-user/business approval remain Blocked until evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**


## Exact-head reconciliation — 2026-11-16 15:15 CET

This checkpoint supersedes the 13:34 CET snapshot. It corrects the P2 review finding by distinguishing the validated pre-write parent from the new documentation child. Historical evidence and the canonical 25-point register remain preserved.

### PR #85 — exact-head parent evidence and child validation gate

- At checkpoint time, PR #85 was OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, based on `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The pre-write PR HEAD and branch ref were both `5c94766c6c355c6c6f0511c0287c2d241cf3496c`.
- PR #85 pre-write parent HEAD is `5c94766c6c355c6c6f0511c0287c2d241cf3496c`.
- These exact-head runs validate PR #85 pre-write parent HEAD `5c94766c6c355c6c6f0511c0287c2d241cf3496c` only. All three required workflows are terminal SUCCESS on that exact SHA:
  - Validation [43868361398](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43868361398): SUCCESS; backend, frontend and iOS jobs passed, including typecheck, unit tests, Expo Doctor, Android export, native Android Release build/emulator smoke, iOS Release/simulator smoke and runtime dependency audit.
  - CodeQL [43868361501](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43868361501): SUCCESS.
  - Dependency Review [43868361365](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43868361365): SUCCESS.
- This documentation update is a child of pre-write parent `5c94766c6c355c6c6f0511c0287c2d241cf3496c`. The resulting child SHA is assigned by GitHub after commit creation. The parent runs above do not validate the child. The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the parent runs do not validate the child.
- Immediately before this update, PR #85 had 7 inline review threads: 6 resolved and 1 unresolved. The open P2 thread [4585927016](https://github.com/milanradics89-beep/POS-Doctor/pull/85#discussion_r4585927016) in `docs/RELEASE_PILOT_ACCEPTANCE.md` identified that the 13:34 checkpoint called `ec7227c73951e1c0354fb4c248666d9fab841e4c` the current HEAD even though the live PR HEAD was `5c94766c6c355c6c6f0511c0287c2d241cf3496c`. This checkpoint labels `5c94766` as the pre-write parent and does not reuse its CI for the child.
- PR #85 has 0 human APPROVED reviews; reviewer `tarlaci1984-sketch` remains requested. Keep the P2 thread open until the child exact-head CI and review are complete.
- PR #114 is CLOSED/MERGED into this documentation branch at `e759240d4bd34268dac7f6aa16730e07e533e827`; PR #112 remains OPEN/DRAFT on an older parent and is not current evidence. Issue #113 is closed with the earlier parser-regression evidence.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED. Reviewed source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; main/merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Review: 22/22 inline threads resolved and one human APPROVED review recorded.
- Three historical Actions runs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` remain QUEUED with no jobs: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are stale; owner/admin cancellation is required.

### Historical priority PRs #65, #67, #68 and #69

- **#65** closed/unmerged, HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`: Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754) all SUCCESS. Backend 450 tests, 27 readiness, 78 production-security; cryptography 50.0.2 and pip-audit clean. SDK 57 alignment and Redis runbook fixes are in the release baseline. PR #106 is a separate redis-py 8.1 candidate tested against Redis 7.4.12 only.
- **#67** closed/unmerged, HEAD `0b4a0e2a31e2a690db5fdeda3ba4716663607727`: Validation [43423727535](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727535) FAILURE; CodeQL [43423727559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727559) and Dependency Review [43423727485](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727485) SUCCESS. Backend 175 passed / 2 failed (Apple root-certificate fixture type error and unsupported `AttestationEvidence(key_id=...)`); historical npm audit had 18 findings (1 low, 8 moderate, 8 high, 1 critical), and iOS prebuild failed. Main-based successor #96 has separate green checks but is not merged.
- **#68** closed/unmerged, HEAD `a4324896a95aca621885ba89daa44f96bdcb636f`: Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) all SUCCESS. Backend 177 general tests, 13 readiness and 15 targeted App Attest tests passed; cryptography 50.0.2; pip-audit found no known vulnerabilities.
- **#69** closed/unmerged, HEAD `a84fdf39792da4ce6c663d88b976861fa3c968be`: Validation [43432490009](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432490009) FAILURE; CodeQL [43432489904](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489904) and Dependency Review [43432489915](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489915) SUCCESS. Historical backend fixture failures and 18 npm findings remain attached to that old candidate. Current main `app.json` explicitly loads `modules/useit-app-attest/app.plugin.js`; this JavaScript config plugin is separate from runtime TypeScript `modules/useit-app-attest/index.ts`.

### Current main-based technical PRs

- **#90** HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`: Validation [43788320357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320357), CodeQL [43788320223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320223), Dependency Review [43788320228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43788320228) all SUCCESS; human accessibility/design approval pending.
- **#96** HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0`: Validation [43800887062](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887062), CodeQL [43800886964](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800886964), Dependency Review [43800887028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887028) all SUCCESS; Copilot guidance awaits human approval.
- **#99 / Issue #64** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`: Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all SUCCESS. Backend 539, readiness 27, production-security 78. HTTPX 0.28.1/httpcore 1.0.9 tests cover per-hop DNS, all-answer public/global validation, numeric-IP pinning, peer verification before TLS/request bytes, original Host/TLS SNI, rebinding rejection and RFC 6052 /32, /40, /48, /56, /64, /96. Both P2 threads resolved. Issue #64 remains OPEN pending production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` evidence and independent human security APPROVED review.
- **#106** HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`: Validation [43705947653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947653), CodeQL [43705947633](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947633), Dependency Review [43705947631](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43705947631) all SUCCESS; Redis server 7.4.12 only.
- **#107** HEAD `431d96a31beb523be31c109d81c7009d49357318`: Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) all SUCCESS. Full npm audit remains 3 moderate / 0 high / 0 critical / 0 low; `GHSA-g3hv-75wg-m249` remains visible through `expo → @expo/fingerprint → minimatch`. The `--audit-level=high` threshold does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit. No forced major override, Expo downgrade or audit suppression.
- **#108** HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`: Validation [43730870752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870752), CodeQL [43730870781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870781), Dependency Review [43730870776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870776) all SUCCESS. The non-empty Vitest guard is not on main until human approval/integration; main still uses `--passWithNoTests`.

### Governance, inventory and release acceptance

- Repository is PUBLIC; default branch `main` remains at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is freshly read as `active`: PR required, one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion/non-fast-forward protection and no bypass actors. No protection setting changed.
- Fresh inventory: 80 branches, 39 open PRs and 5 open non-PR issues. Code Scanning, Dependabot and Secret Scanning alert inventories are unverified through this integration, not empty.
- Persisted Issue #74 checklist: 64 items, 39 checked / 25 open. Separate 25-point release register: 2 Done / 15 In Progress / 8 Blocked. No checkbox changed.
- External acceptance remains outstanding: physical iPhone App Attest and production entitlement; Play-installed physical Android Play Integrity; witnessed production backup/restore; production monitoring and alert delivery; staged rollout/rollback approval; representative benchmark and business acceptance; real-user pilot and business sign-off; production NAT64 prefix inventory/configuration and independent security approval. The three stale #41 Actions runs also require owner/admin cancellation.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke and documentation do not replace human approval or production evidence.


## Exact-head reconciliation — 2026-11-16 18:11 CET

This checkpoint supersedes the 15:15 snapshot. It records the current exact-head Validation failure and the verified live repository inventory. Historical evidence remains intact. No production deployment or pilot acceptance is implied.

### PR #85 — exact pre-write HEAD and Validation failure

- PR #85 remains OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #85 pre-write HEAD is `0d6ba3764803c4843860893847a09ead87191b18`. The branch ref matched this SHA immediately before the documentation update; this is the parent of the new documentation child.
- These exact-head runs belong to PR #85 pre-write HEAD `0d6ba3764803c4843860893847a09ead87191b18` only. They do not validate the resulting documentation child.
- Validation [43897662455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43897662455): FAILURE (completed). Backend SUCCESS, frontend FAILURE, iOS SUCCESS. Frontend ran 295 tests across 60 files: 294 passed and one failed; 59/60 files passed.
- The only failing assertion is in `scripts/release-doc-checkpoint.test.mjs:50`. It expects `80 branches, 39 open PRs, 5 open non-PR issues`, while the persisted 15:15 checkpoint says `80 branches, 39 open PRs and 5 open non-PR issues`. This is a punctuation mismatch in a brittle inventory assertion, not an application/runtime failure. The targeted regression fix accepts either comma or “and” while still pinning the exact current counts below.
- CodeQL [43897662490](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43897662490): SUCCESS.
- Dependency Review [43897662539](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43897662539): SUCCESS.
- All three pre-write workflows are terminal. The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the pre-write runs do not validate the child.
- PR #85 review inventory before this update: 48 conversation comments, 13 inline comments, 13 review submissions; 9 inline threads (6 resolved, 3 unresolved); all 13 submissions are COMMENTED; 0 human APPROVED reviews. `tarlaci1984-sketch` remains requested.
- Isolated child [PR #118](https://github.com/milanradics89-beep/POS-Doctor/pull/118), HEAD `c87296d23214ba674f8b9b25b5ac6a1bb4df00a8`, contains the same punctuation-tolerant assertion. Its Validation [43899196034](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43899196034) concluded FAILURE because its iOS job was cancelled; backend and frontend passed. Its CodeQL [43899195836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43899195836) and Dependency Review [43899195674](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43899195674) succeeded. PR #118 is not treated as fully validated or merged; the targeted fix is applied directly to this PR #85 branch.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED. Reviewed source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; branch `fix/release-blockers-2026-10` still points to that exact SHA. Main and merge commit are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #41 contains 517 commits and 100 changed files (+11,887 / -2,005). Its review inventory is 52 conversation comments, 30 inline comments and 26 review submissions (25 COMMENTED, 1 human APPROVED); all 22/22 inline threads are resolved.
- Current exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS; all five jobs passed.
- Three historical runs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` remain QUEUED with zero jobs: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are stale; owner/admin cancellation is required.

### Repository inventory, governance and releases

- Fresh GitHub API inventory: 84 branches, 43 open PRs and 6 open non-PR issues. The repository is PUBLIC; main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Main ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active: PR required, one approving review, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion and non-fast-forward protection, no bypass actors.
- Published releases: 0 (fresh Releases API response is an empty list).
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the current integration. They are unverified, not empty.

### Issues #47, #64 and #74

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED. Its resolution is supported by the active main ruleset and `main.protected: true`; the owner’s durable public/private and plan decision remains separate from the verified ruleset.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN (42 comments). PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) is OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. Both inline security threads are resolved. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES`, and independent human security APPROVED review are still missing; keep #64 open and PR #99 draft/unmerged.
- Persisted Issue [#74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) checklist: 64 items, 39 checked / 25 open. No checkbox was changed.

### Dependency evidence and release register

- PR #107 exact HEAD `431d96a31beb523be31c109d81c7009d49357318` has terminal-success Validation, CodeQL and Dependency Review. The full npm audit still reports 3 moderate / 0 high / 0 critical / 0 low; `GHSA-g3hv-75wg-m249` remains visible through `expo → @expo/fingerprint → minimatch`. The `--audit-level=high` threshold does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit. No forced Expo downgrade, global override or audit suppression was applied.
- The evidence-based 25-point release register remains: **2 Done / 15 In Progress / 8 Blocked**.
- **Done:** #1, #6.
- **In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked:** #2 (owner visibility/plan decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Console configuration and Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device testing, production cloud access, witnessed recovery, rollout approval and real-user/business acceptance remain BLOCKED until direct evidence is recorded.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke and documentation do not replace human approval or production evidence.

## Exact-head reconciliation — 2026-11-16 19:30 CET

This checkpoint supersedes the 18:11 live snapshot; historical checkpoints remain for traceability. It records fresh GitHub evidence. No production deployment or pilot acceptance is implied.

### PR #85 — exact pre-write HEAD and Validation failure

- PR #85 remains OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- PR #85 pre-write HEAD is `7c30088d27d006e887157ae6fc2ce06e5575435b`. PR metadata identifies this exact branch HEAD; it is the parent of the new documentation child.
- These exact-head runs belong to PR #85 pre-write HEAD `7c30088d27d006e887157ae6fc2ce06e5575435b` only. They do not validate the resulting documentation child.
- Validation [43917494857](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43917494857): FAILURE (completed). Backend SUCCESS, frontend FAILURE, iOS SUCCESS. Frontend ran 295 tests across 60 files: 293 passed and 2 failed; 59/60 files passed.
- The two failures are confined to `scripts/release-doc-checkpoint.test.mjs`. First, the parent-pair parser does not accept the test fixture's `pre-write parent HEAD` wording or its `These exact-head runs validate ...` phrase. Second, the workflow-status assertions expect plain text such as `Validation [run-id]: FAILURE`, but the release records correctly use Markdown links between the run ID and status. These are test-harness contract defects, not application/runtime failures.
- Backend completed successfully. The iOS Release build and simulator smoke completed successfully. The frontend unit-test failure caused later Expo Doctor, Android export/build/emulator smoke and runtime-audit steps to be skipped; those steps are not claimed as passed.
- CodeQL [43917494516](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43917494516): SUCCESS; Analyze job completed successfully.
- Dependency Review [43917494739](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43917494739): SUCCESS; dependency-review job completed successfully.
- All three pre-write workflows are terminal. The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the pre-write runs do not validate the child.
- PR #85 review inventory before this update: 75 timeline records (49 conversation comments, 13 inline comments, 13 review submissions); 9 inline threads (6 resolved, 3 unresolved); all 13 review submissions are COMMENTED; 0 human APPROVED reviews. `tarlaci1984-sketch` remains requested.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. PR metadata reports 517 commits, 100 changed files, +11,887 / -2,005. Comparison against main: 517 ahead / 1 behind; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Merge commit and main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. All five jobs passed: backend, frontend, iOS, CodeQL Analyze and Dependency Review.
- Review inventory: 108 timeline records (52 conversation comments, 30 inline comments, 26 review submissions); 22/22 inline threads resolved; 25 COMMENTED submissions and one human APPROVED review by `tarlaci1984-sketch`.
- Three obsolete runs remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are historical, not current-head checks; owner/admin cancellation is required.

### Repository inventory, governance and related security work

- Fresh GitHub inventory: 84 branches, 43 open PRs and 6 open non-PR issues. Repository visibility is public. Main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` and reports `protected: true`.
- Issue #47 is CLOSED. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires pull requests, one approving review, stale-review dismissal, last-push approval, resolved review threads, six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion/non-fast-forward protection and no bypass actors. The owner's durable public/private and plan decision remains separate.
- Issue #64 remains OPEN with 43 comments. PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES`, independent human security review and human APPROVED security submission remain missing.
- PR #107 exact HEAD `431d96a31beb523be31c109d81c7009d49357318` has terminal-success Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667). The latest recorded full npm audit reports 3 moderate / 0 high / 0 critical / 0 low; `GHSA-g3hv-75wg-m249` remains visible through the Expo fingerprint/minimatch dependency chain. The configured `--audit-level=high` threshold does not remove moderate findings. Do not describe this command as a zero-vulnerability or clean production-only audit.
- Issue #74 persisted checklist: 64 items, 39 checked / 25 open. No checklist checkbox was changed.
- Published releases: 0 (the GitHub Releases API returned an empty list). Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the current integration; they are unverified, not empty.

### Authoritative 25-point release register

- The evidence-based register remains exactly **2 Done / 15 In Progress / 8 Blocked**.
- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 (owner visibility/plan decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Console configuration and Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, staged rollout approvals, and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke tests and documentation do not replace human approval or production evidence.

## Exact-head reconciliation — 2026-11-16 21:31 CET

### PR #85 — exact-head release validation

- PR #85 is OPEN on `docs/post-merge-release-evidence-20261113`, targeting `main`. Its current exact HEAD is `59a31c88fd95219030ae1d815b2bd58b8f555a68` (84 commits, 4 changed files, +5,842 / -31). This checkpoint is written as a child of that verified HEAD.
- PR #85 pre-write parent HEAD is `59a31c88fd95219030ae1d815b2bd58b8f555a68`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `59a31c88fd95219030ae1d815b2bd58b8f555a68` only.
- Validation [43938412640](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938412640): SUCCESS. Backend, frontend/Android, and iOS jobs all completed SUCCESS.
- CodeQL [43938412643](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938412643): SUCCESS; Analyze job completed SUCCESS.
- Dependency Review [43938412633](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938412633): SUCCESS; dependency-review job completed SUCCESS.
- Backend evidence: 450 tests passed, 27 production-readiness checks passed, 78 production-security checks passed; the backend dependency-audit step completed successfully.
- Frontend evidence: 295 tests across 60 files passed; Expo Doctor passed 21/21; Android export, native Release build, and emulator install/launch smoke passed. The current runtime npm audit reports 3 moderate findings for minimatch via the Expo fingerprint dependency chain, including GHSA-g3hv-75wg-m249. The suggested `npm audit fix --force` would downgrade Expo to 52.0.49 and is a breaking change; no forced downgrade or override was applied.
- iOS evidence: native Release build and simulator install/launch smoke both passed.
- The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the pre-write runs do not validate the child.
- PR #85 review inventory: 78 timeline records (52 conversation comments, 13 inline comments, 13 review submissions); 9 inline threads (6 resolved, 3 unresolved); all 13 review submissions are COMMENTED; 0 human APPROVED reviews. `tarlaci1984-sketch` remains requested. The latest Codex review attempt on this exact HEAD failed because the connected Codex code-review usage limit was reached; this is not a completed clean review.
- The three unresolved review findings remain open pending re-review: parent/child SHA labeling, checklist-count assertion, and inventory assertion. The latter two now pass on exact-head Validation, but no review thread is marked resolved solely from the passing test.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; exact HEAD and branch ref are both `68b380e73ca3c870048035197beef8febbf90ef1`. Metadata reports 517 commits, 100 changed files, +11,887 / -2,005. Main and the merge commit are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- GitHub compare currently reports 517 ahead / 1 behind, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. This is the retained source-branch history after the squash merge; PR #41 is already closed/merged and is not an open change awaiting integration.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. All five jobs passed: backend, frontend, iOS, CodeQL Analyze, and Dependency Review.
- Review inventory: 108 timeline records (52 conversation comments, 30 inline comments, 26 review submissions); 22/22 inline threads resolved; 25 COMMENTED submissions and one human APPROVED review by `tarlaci1984-sketch`.
- Three obsolete workflows remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are historical, not current-head checks; owner/admin cancellation is required.

### Repository inventory, governance, security, and release records

- Fresh inventory: 87 branches, 46 open PRs and 6 open non-PR issues. Repository visibility is public. Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` and reports `protected: true`.
- Issue #47 is CLOSED. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires pull requests, one approving review, stale-review dismissal, last-push approval, resolved review threads, six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), deletion/non-fast-forward protection, and no bypass actors. The owner's long-term public/private and GitHub-plan decision remains separate.
- Issue #64 remains OPEN with 43 comments. PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; its exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. The transport tests cover numeric-IP connection pinning, peer verification before TLS/request bytes, Host/TLS SNI preservation, redirect-hop DNS re-resolution, and DNS-rebinding rejection. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES`, independent human security review, and human APPROVED security submission remain missing; keep the issue open and PR #99 draft.
- PR #107 remains OPEN at exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; its exact-head Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) are terminal SUCCESS. The current PR #85 frontend audit independently confirms 3 moderate minimatch findings; do not use the breaking `--force` remediation.
- Issue #74 persisted checklist: 64 items, 39 checked / 25 open. No checklist checkbox was changed.
- Issue #115 remains OPEN with 15 comments. Its latest bot failure report is Validation run [43930577131](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43930577131) on commit `11a881c3b10f2ba74828fc7511838d40ea2a0a21`, not PR #85's current validated HEAD `59a31c8`; do not attribute that separate run to PR #85.
- Published releases: 0; the GitHub Releases API returned an empty array. Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the current GitHub integration; they remain unverified, not empty.

### Authoritative 25-point release register

- The evidence-based register remains exactly **2 Done / 15 In Progress / 8 Blocked**.
- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 (owner visibility/plan decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Console configuration and Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, staged rollout approvals, and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke tests, and documentation do not replace human approval or production evidence.

## Exact-head reconciliation — 2026-11-16 23:12 CET

This checkpoint records the current PR #85 pre-write HEAD and its exact-head evidence. The documentation update in this commit is a child of that pre-write HEAD; the runs below validate the parent only, not the resulting child.

### PR #85 — current release documentation state

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its pre-write branch HEAD and live ref are both `41acf506e28fe974a3f208503ca829df081eaae4`.
- PR #85 pre-write parent HEAD is `41acf506e28fe974a3f208503ca829df081eaae4`.
- These exact-head runs validate PR #85 pre-write parent HEAD `41acf506e28fe974a3f208503ca829df081eaae4` only. All three required workflows are terminal SUCCESS:
  - Validation [43961856098](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43961856098): SUCCESS. Backend, frontend and iOS jobs all completed SUCCESS. Frontend typecheck, unit tests, Expo Doctor, Android export, Android Release build, emulator install/launch smoke and runtime dependency audit passed; iOS Release build and simulator smoke passed.
  - CodeQL [43961856163](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43961856163): SUCCESS.
  - Dependency Review [43961856217](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43961856217): SUCCESS.
- The resulting documentation child must pass its own exact-head Validation, CodeQL, and Dependency Review; the pre-write runs do not validate the child.
- Review inventory on the pre-write HEAD: 9 inline threads (9 resolved, 0 unresolved), 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested. The resolved threads cover the stale parent/current SHA wording, the persisted checklist count, and the inventory conjunction; each was answered with source and exact-head evidence.
- The exact frontend audit log reports 3 moderate minimatch findings through `expo → @expo/fingerprint → minimatch`, including `GHSA-g3hv-75wg-m249`. `npm audit fix --force` would install Expo 52.0.49, a breaking downgrade. No forced downgrade, global override or finding suppression was applied.

### App Attest and Expo Node 22

- PR #116 exact HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86`: Validation [43938664477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664477), CodeQL [43938664451](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664451), Dependency Review [43938664475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664475) all SUCCESS. The named Node 22 workflow steps execute Android and iOS prebuild; App Attest workflow-contract tests passed 4/4 and frontend tests 289/289. Android Release/emulator smoke and iOS Release/simulator smoke passed. Its P2 workflow-test thread is resolved; human approval remains pending.
- Main `app.json` explicitly loads `modules/useit-app-attest/app.plugin.js`; the JavaScript config plugin is separate from runtime TypeScript `modules/useit-app-attest/index.ts`. The exact Node 22 prebuild validation is recorded above.

### Minimatch 11 and npm audit

- PR #117 exact HEAD `980c3f8a84615097432cd73af73ecb1c78f5fe2f`: Validation [43898737672](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737672), CodeQL [43898737938](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737938), Dependency Review [43898737797](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43898737797) all SUCCESS. Frontend 295/295 across 60 files; the SDK 57 minimatch migration suite passed 6/6, including the actual Expo fingerprint pipeline.
- PR #119 exact HEAD `63161dc785030e7f821c076ca89de54e5adcf8e2`: Validation [43916549260](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43916549260), CodeQL [43916549431](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43916549431), Dependency Review [43916549163](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43916549163) all SUCCESS. Its lockfile-wide test requires every resolved minimatch copy to be 11.0.5. The full npm audit still has 3 moderate findings; these green migration tests do not make the audit clean.

### SSRF — Issue #64 / PR #99

- PR #99 exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`, base `main`: Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all SUCCESS.
- The branch pins HTTPX to `>=0.28.1,<0.29` and httpcore to `>=1.0.9,<1.1`. Exact-head tests cover real HTTPX/httpcore TCP/TLS numeric-IP pinning, peer verification before TLS/request bytes, original Host/SNI, redirect-hop DNS re-resolution, private DNS-rebinding rejection and RFC 6052 NAT64 prefixes. Both inline security threads are resolved.
- Issue #64 remains OPEN. Independent human security APPROVED review, production NAT64/DNS64 prefix inventory, and verified deployed `USEIT_NAT64_PREFIXES` are still missing.

### Historical priority PRs and PR #41

- PR #41 is CLOSED/MERGED. Review inventory: 22/22 inline threads resolved and one human APPROVED review. Three Actions runs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` remain QUEUED with zero jobs: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is required.
- PR #65 is CLOSED/unmerged; its exact-head Validation, CodeQL and Dependency Review all succeeded. Backend 450 tests passed, cryptography 50.0.2 and pip-audit was clean. Its Redis service was 7.4.12, so Redis 8 production compatibility is not claimed; the current runbook requires shared Redis, explicit timeouts and fail-closed behavior.
- PR #67 is CLOSED/unmerged with historical Validation failure (175 backend tests passed / 2 failed; old npm audit had 18 findings). Main-based successor PR #96 has 3/3 exact-head checks successful; human Copilot-guidance approval remains pending.
- PR #68 is CLOSED/unmerged with 3/3 exact-head checks successful: 177 backend tests, 13 readiness tests and 15 App Attest tests; cryptography 50.0.2 and pip-audit clean. This Python audit is separate from npm findings.
- PR #69 is CLOSED/unmerged with historical Validation failure. Its Node 22 / Expo prebuild path is independently covered by PR #116.
- The repeated-failure issue #115 was closed after the latest PR #85 release-branch Validation became terminal-success. Intermediate draft children #118, #120, #121, #122 and #123 were closed as superseded by the combined, validated correction on #85; none was merged.

### Repository inventory, governance and acceptance

- Fresh inventory: 88 branches, 42 open PRs and 5 open non-PR issues. The branch search returned all 88 results with no next page.
- Main remains at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Ruleset `Protect main` #26370589 was freshly read as ACTIVE and unchanged: one required approval, stale-review dismissal, last-push approval, resolved review threads, six strict required status checks, deletion/non-fast-forward protection and no bypass actors.
- Issue #74 persisted checklist: 64 items, 39 checked / 25 open. No checkbox is changed by this documentation update. The separate 25-point release register remains 2 Done / 15 In Progress / 8 Blocked.
- External acceptance remains blocked: physical iPhone App Attest and production entitlement; Play-installed physical Android Play Integrity; production NAT64/DNS64 configuration; witnessed production backup/restore; production monitoring and alert delivery; staged rollout/rollback approval; representative benchmark/business acceptance; real-user pilot and business sign-off.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke and documentation do not replace human approval or production evidence.

## Exact-head reconciliation — 2026-11-17 00:16 CET

This checkpoint supersedes the 2026-11-16 23:12 CET snapshot. The current documentation update is a child of the pre-write PR #85 HEAD below. The listed workflows belong to that parent only; they do not validate the resulting documentation child.

### PR #41 — merged release baseline

- PR #41 is CLOSED/MERGED. Its live PR metadata and source branch \`fix/release-blockers-2026-10\` both point to exact HEAD \`68b380e73ca3c870048035197beef8febbf90ef1\`. Merge commit and main HEAD are \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`; base SHA is \`7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0\`. PR metadata: 517 commits, 100 files, +11,887 / -2,005; comparison 517 ahead / 1 behind.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. All five jobs passed: backend, frontend, iOS, CodeQL Analyze and Dependency Review.
- Review inventory: 52 conversation comments, 30 inline comments, 26 review submissions (25 COMMENTED, one human APPROVED), and 22/22 inline threads resolved. The human approval is by \`tarlaci1984-sketch\`.
- PR #41's description still contains a historical 2026-11-12 note naming \`b46c5b8082ecbebd263a86cd53b1321a86e570d1\`. That note is superseded by the live PR metadata and branch ref above. Its three old runs on that obsolete SHA remain queued with zero jobs: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is still required; do not treat these obsolete runs as current checks.

### PR #85 — exact pre-write parent evidence

- PR #85 is OPEN/non-draft on base \`main\` at \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`. Its live branch and PR metadata both point to pre-write parent HEAD \`73cd5ef13aef379044d2de66039eb6afe0025e6d\`.
- The exact-head workflows for that parent are terminal:
  - Validation [43968296273](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43968296273): **FAILURE**. Backend job passed. iOS job passed, including native Release build and simulator smoke. Frontend job failed during unit tests: 294 passed / 1 failed across 295 tests; 59/60 test files passed. The failing assertion expected the literal wording \`3 moderate findings for minimatch\`, while the same checkpoint says \`3 moderate minimatch findings\`. Android Expo Doctor, export, native Release build, emulator smoke and runtime audit were skipped because the frontend unit-test step failed.
  - CodeQL [43968296228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43968296228): **SUCCESS**; analyze job passed.
  - Dependency Review [43968296194](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43968296194): **SUCCESS**; dependency-review job passed.
- This is a release-checkpoint test wording mismatch, not evidence of an application runtime failure. Do not describe the parent as green: its Validation is failed. The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.
- Review inventory on the current PR #85: 9 inline threads, all 9 resolved; 16 review submissions, all COMMENTED; 0 human APPROVED reviews. Reviewer \`tarlaci1984-sketch\` remains requested. The lack of a human approval is still a release gate.

### Repository inventory and release evidence

- Fresh repository inventory: **88 branches, 39 open PRs and 6 open non-PR issues**. Branch search returned 88 results; the follow-up cursor query returned zero additional branches. The current open issue set includes #115, #74, #64, #23, #24 and #25.
- Main remains at \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`. Ruleset \`Protect main\` #26370589 was directly read as ACTIVE: one required approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward protection and no bypass actors. Repository visibility is public.
- GitHub Releases API returned an empty array: **0 published releases**.
- Code Scanning, Dependabot and Secret Scanning alert endpoints are not available through the connected GitHub integration. Their inventories are **unverified, not empty**.
- The exact frontend audit evidence reports **3 moderate minimatch findings**, including \`GHSA-g3hv-75wg-m249\`, through \`expo → @expo/fingerprint → minimatch\`. \`npm audit fix --force\` would downgrade Expo to 52.0.49. No forced downgrade, global override or security suppression was applied.

### Issues #47 and #64

- Issue #47 is CLOSED. Main protection is directly verified through active ruleset #26370589 and branch metadata; no protection setting was changed.
- Issue #64 remains OPEN (44 comments). PR #99 remains OPEN/DRAFT at exact HEAD \`f91c70d2636948e538f8e3559afc39cd93eb5139\`; its Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064) and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. Tests cover numeric-IP pinning, peer verification before TLS/request transmission, Host/SNI preservation, redirect-hop DNS re-resolution, DNS-rebinding rejection and NAT64 validation.
- Issue #64 is not accepted for production: independent human security approval, production DNS64/NAT64 prefix inventory and verified deployed \`USEIT_NAT64_PREFIXES\` remain missing.

### Development checklist and authoritative 25-point release register

- Issue #74 persisted checklist: **64 items, 39 checked / 25 open**. No checkbox was changed by this update.
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked** in all three release records.
- **Done:** #1, #6.
- **In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked:** #2 repository visibility/plan owner decision; #4 Apple App Attest production entitlement and physical iPhone; #5 Play Integrity production configuration and Play-installed physical Android; #16 witnessed production backup/restore; #18 representative benchmark and business acceptance; #21 production alert delivery; #22 staged rollout approval and tested rollback; #25 real-user pilot and business sign-off.
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, simulator/emulator smoke and documentation do not replace human approval or production evidence.

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review; the parent runs above do not validate the child.


---

## Exact-head reconciliation — 2026-11-17 15:06 CET

This checkpoint supersedes the 2026-11-17 13:22 CET snapshot. All PR #85 run IDs below were re-fetched from GitHub and each run-level `head_sha` equals the stated pre-write parent. Parent runs are not presented as validation of the documentation commit created by this checkpoint.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on source branch `fix/release-blockers-2026-10`. Live PR metadata identifies exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; base SHA is `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- PR metadata: 517 commits, 100 changed files, +11,887 / -2,005. Comparison against main: 517 ahead / 1 behind, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e`. Validation jobs backend, frontend and iOS all succeeded; CodeQL analyze and Dependency Review jobs also succeeded. A separate temporary Expo SDK 57 lockfile refresh run [43492142700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492142700) is also terminal SUCCESS on the same SHA.
- Review inventory: 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED and one human APPROVED), 22/22 inline threads resolved. The human approval is by `tarlaci1984-sketch`.
- Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). These are not current-head checks; repository-admin cancellation remains required.

### PR #85 — current release-documentation branch

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Branch `docs/post-merge-release-evidence-20261113` and live PR metadata both point to pre-write parent HEAD `fea211fdbd086a07e51bd5d7491d96e64375d8a4`. The PR contains 106 commits and 6 changed files (+8,056 / -766).
- PR #85 pre-write parent HEAD is `fea211fdbd086a07e51bd5d7491d96e64375d8a4`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `fea211fdbd086a07e51bd5d7491d96e64375d8a4` only. All three are terminal SUCCESS:
  - Validation [44090801232](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44090801232): SUCCESS. Backend, frontend and iOS jobs all succeeded. Frontend completed source-boundary validation, typecheck, 61 test files, pinned Expo Doctor, Android export, native Android Release build, Android emulator install/launch smoke, and runtime dependency audit. iOS native Release build and simulator install/launch smoke succeeded.
  - CodeQL [44090801233](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44090801233): SUCCESS; analyze job succeeded.
  - Dependency Review [44090801161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44090801161): SUCCESS; dependency-review job succeeded.
- The backend dependency audit completed with `No known vulnerabilities found`. The frontend command `npm audit --omit=dev --audit-level=high` reported **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`; it exits successfully at the configured high threshold, so this is not a clean npm audit. `npm audit fix --force` is not accepted as a remediation because it risks a breaking Expo downgrade. No forced Expo downgrade or audit suppression was applied.
- The previous parent `e1e4a80d322af5c1c72ea5bff8654ad090a73dfd` had one release-documentation test wording mismatch. PR #141 corrected the assertion and review-inventory wording; its commit is now the current PR #85 HEAD. PR #141 is integrated into this release-documentation branch, not main.
- PR #85 review inventory: 63 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested. The human approval gate remains open.
- Issue #136 is CLOSED. Issue #142, the repeated-failure diagnostic for parent run [44084128419](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44084128419) on `e1e4a80`, is now CLOSED after the correction was integrated and all three required workflows passed on `fea211f`. This does not grant release acceptance.
- The resulting documentation child from this checkpoint must pass its own exact-head Validation, CodeQL and Dependency Review. The parent runs above do not validate that new child.

### Related active work and independent evidence

- PR #90 remains OPEN/non-draft at exact HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. Its Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087), CodeQL [43981707068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707068), and Dependency Review [43981707044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707044) are terminal SUCCESS. Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews; human design/accessibility approval remains pending. Its recorded frontend evidence includes 71 test files passed.
- PR #132 remains OPEN/DRAFT at exact HEAD `d463f924500b0b070f50c9c328b4078b83f6df08`. Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are terminal SUCCESS. Recorded frontend evidence is 331/331 tests across 72 test files, with Android Release/emulator smoke and iOS Release/simulator smoke passed. No review submissions or inline threads exist.
- PR #140 is OPEN/DRAFT at exact HEAD `bf6a7d9ef45343aa65376724800ce39b4b9e5857`, based on PR #90 HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. Validation [44077737637](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737637), CodeQL [44077737700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737700), and Dependency Review [44077737572](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44077737572) are terminal SUCCESS. PR #140 has 0 review submissions and 0 inline review threads.
- PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews.

### Repository inventory, governance and releases

- Repository visibility is currently **public**. Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` and main reports `protected: true`.
- Branch search pagination is exhausted: 102 branches (100 + 2 + 0). Current inventory: 42 open PRs and 5 open non-PR issues (#74, #64, #25, #24 and #23). Issue #142 is closed; Issue #136 is closed.
- Issue #47 is CLOSED. Protect main ruleset #26370589 is ACTIVE and unchanged: one approving review, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze and dependency-review), deletion/non-fast-forward protection, and no bypass actors. The legacy branch-protection endpoint is not needed to establish the active ruleset requirements.
- GitHub Releases API returned an empty array: **0 published releases**. Code Scanning, Dependabot and Secret Scanning alert endpoints are unavailable through the current integration. Security alert inventories are **unavailable/unverified, not empty**.
- Issue #74 persisted development checklist: **64 items, 42 checked / 22 open** (150 comments). This 64-item development checklist is separate from the authoritative 25-point release register. No Issue #74 checkbox changed.

### Issue #64 — SSRF security and production acceptance

- Issue #64 remains OPEN (48 comments). PR #99 exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139` has terminal Validation, CodeQL and Dependency Review success as listed above. Source and deterministic transport tests cover per-hop DNS re-resolution, full DNS-answer validation, numeric-IP pinning, connected-peer verification before TLS/request bytes, original Host/TLS SNI preservation, DNS-rebinding rejection and RFC 6052/NAT64 embedded-address checks.
- Issue #64 remains OPEN / production acceptance BLOCKED pending independent human security APPROVED review, production DNS64/NAT64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress verification. CI and source-level tests do not establish production acceptance.

### Authoritative 25-point release register

- The evidence-based 25-point register remains exactly **2 Done / 15 In Progress / 8 Blocked**.
- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 (repository visibility/plan owner decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Integrity production configuration and Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production alert delivery), #22 (authorized staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke tests and documentation do not replace human approval or production evidence. No main-branch write occurred.

## Exact-head reconciliation — 2026-11-17 17:21 CET

This checkpoint supersedes the 2026-11-17 15:06 CET snapshot. The PR #85 pre-write parent, all three workflow run IDs, repository inventory, review state and release gates were re-fetched from GitHub. The three PR #85 runs below all report the exact pre-write parent SHA. Parent runs are not presented as validation of the documentation commit created by this checkpoint.

### PR #85 — release documentation and Android D8 remediation

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Branch `docs/post-merge-release-evidence-20261113`.
- PR #85 pre-write parent HEAD is `dcc6310694028c6eba21110a18b3d2b5fac11a2f`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `dcc6310694028c6eba21110a18b3d2b5fac11a2f` only. All three are terminal SUCCESS:
  - Validation [44119805074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805074): SUCCESS. Backend, frontend and iOS jobs all succeeded. Frontend completed source-boundary validation, typecheck, 61 test files, pinned Expo Doctor, Android export, native Android Release build and emulator install/launch smoke. Android reported **BUILD SUCCESSFUL in 15m 47s**; emulator smoke passed for `com.useit.app`. iOS Release build and simulator install/launch smoke succeeded.
  - CodeQL [44119805115](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805115): SUCCESS; analyze completed.
  - Dependency Review [44119805108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805108): SUCCESS.
- PR #139's Gradle memory remediation is integrated into the #85 branch only, not main. The validated configuration writes `-Xmx4g -XX:MaxMetaspaceSize=1g`, limits Gradle to two workers and disables parallel execution before `assembleRelease`; R8/minification remains enabled. The current #85 Android Release build and emulator smoke pass, superseding the earlier D8 `OutOfMemoryError`.
- Backend dependency audit reports `No known vulnerabilities found`. Frontend `npm audit --omit=dev --audit-level=high` reports **3 moderate minimatch findings**, including `GHSA-g3hv-75wg-m249`. This command passes its configured high-severity threshold; it is not a zero-vulnerability audit. `npm audit fix --force` is not accepted because it risks a breaking Expo downgrade. No forced Expo downgrade or audit suppression was applied.
- PR #85 review inventory: **16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews**. Reviewer `tarlaci1984-sketch` remains requested; human release approval is still required.
- PR #139 is CLOSED/MERGED into the #85 documentation branch only; it is not merged into main.
- Issue #136 is CLOSED. Issue #142, the repeated-failure diagnostic for parent run [44084128419](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44084128419), is now CLOSED after the correction was integrated and validated.

### Related exact-head work

- PR #90 remains OPEN/non-draft at exact HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. Its Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087), CodeQL [43981707068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707068), and Dependency Review [43981707044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707044) are terminal SUCCESS. Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews; human design/accessibility approval remains pending.
- PR #140 is OPEN/DRAFT at exact HEAD `248c7c6fb4fbb289946f51ef504cc47f18365a77`, based on PR #90 exact HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. Validation [44106927809](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927809), CodeQL [44106927918](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927918), and Dependency Review [44106927790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927790) are terminal SUCCESS. Frontend reports **71 test files passed**; Android Release/emulator smoke and iOS Release/simulator smoke succeeded. The shared `FadeIn` respects the OS reduced-motion preference and reacts to live changes. PR #140 has 0 review submissions and 0 inline review threads; human design/accessibility review remains pending.
- PR #132 remains OPEN/DRAFT at exact HEAD `d463f924500b0b070f50c9c328b4078b83f6df08`. Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are terminal SUCCESS. Frontend evidence is **331/331 tests across 72 test files**; Android Release/emulator smoke and iOS Release/simulator smoke passed. Human review remains pending.
- PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. HTTPX 0.28.1/httpcore 1.0.9 transport tests exercise per-hop DNS re-resolution, whole-answer public/global validation, numeric-IP pinning, actual peer verification before TLS/request bytes, original Host/TLS SNI preservation, redirect rebinding rejection and RFC 6052/NAT64 address handling. PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews. **Issue #64 remains OPEN / production acceptance BLOCKED** pending independent human security approval, production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES` and production egress evidence.
- PR #96 Copilot Free, #107 full npm audit, #116 App Attest/Node 22, #117 minimatch migration and #119 lockfile-wide minimatch tests retain their previously recorded exact-head 3/3 successes. PR #117/#119 do not constitute independent acceptance of the minimatch 11 override: Expo fingerprint declares `^10.2.6`; three moderate findings and compatibility/security approval remain visible.

### Historical priority audit

- PR #41 is CLOSED/MERGED at main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are SUCCESS. Review: 22/22 threads resolved and one human APPROVED. Both Redis P2 runbook fixes are on main.
- PR #65 is CLOSED/unmerged; Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754) are SUCCESS. SDK 57 alignment and Redis runbook corrections are present on main.
- PR #67 is CLOSED/unmerged; historical Validation [43423727535](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727535) failed, while CodeQL [43423727559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727559) and Dependency Review [43423727485](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727485) succeeded. Copilot Free successor #96 has 3/3 success.
- PR #68 is CLOSED/unmerged; Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), and Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) are SUCCESS. The separate Python audit used cryptography 50.0.2 and pip-audit reported no known vulnerabilities; this is distinct from npm/minimatch.
- PR #69 is CLOSED/unmerged; historical Validation [43432490009](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432490009) failed, while CodeQL [43432489904](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489904) and Dependency Review [43432489915](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489915) succeeded. The main-based #116 successor separates the JavaScript Expo config plugin from the TypeScript runtime and validates Node 22 prebuild.

### Repository, governance and canonical registers

- Repository visibility: **public**. Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch pagination is exhausted: **105 branches** (100 + 5 + 0). Current inventory: **45 open PRs and 5 open non-PR issues** (#74, #64, #25, #24, #23).
- Protect main ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is ACTIVE and unchanged: one required approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward protection and no bypass actors.
- Three obsolete PR #41 runs remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is required; these are not current-head checks.
- Security alert inventories are **unavailable/unverified, not empty**.
- Issue #74 remains **64 items / 42 checked / 22 open**. **No Issue #74 checkbox changed.** The separate 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**.
- The 25-point release register remains 2 Done / 15 In Progress / 8 Blocked. External Apple/Google console work, physical-device validation, production backup/restore, monitoring/alert delivery, staged rollout/rollback, benchmark/business acceptance, real-user pilot and owner decision remain blocked pending direct evidence.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** Automated CI, emulator/simulator smoke and documentation do not replace human approval or production evidence. No main-branch write occurred. The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review.


---

