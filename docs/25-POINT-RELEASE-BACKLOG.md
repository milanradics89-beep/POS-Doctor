## Release-watch audit checkpoint — 2026-11-18 14:20 CET

This checkpoint supersedes earlier status statements in this document. Evidence is tied to the exact commit and workflow runs listed below; no parent CI is reused as exact-head evidence.

### PR #41 merged baseline
- PR #41 is CLOSED/MERGED. Head branch `fix/release-blockers-2026-10`, exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all terminal SUCCESS. Validation frontend, backend and iOS jobs passed.
- Review inventory: 53 conversation comments, 30 inline comments, 26 submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.
- Three historical runs remain queued with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; they are not current-head evidence and require administrator cancellation.

### Governance and repository inventory
- Repository is public; main reports `protected: true`. Active ruleset [Protect main #26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and requires strict six checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-review dismissal, last-push approval and resolved threads; deletion/non-fast-forward prohibited; no bypass actors. Classic protection status checks are disabled; the active ruleset is the enforcement evidence.
- Current inventory: 127 branches, 67 open PRs, 7 open non-PR issues. GitHub Releases API: 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable through the connected integration; report them as unverified, not empty.

### Release-document branch and exact-head CI
- PR #85 is OPEN at exact HEAD `ab44497b3a9e220b38cc2ec8ae7fb3533bc43cde`. Validation [44267337906](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44267337906) FAILED at mandatory `npm audit --omit=dev --audit-level=high`; backend and iOS passed, while frontend completed unit tests, Expo Doctor, Android export/Release build and emulator smoke before the audit failure. CodeQL [44267337830](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44267337830) and Dependency Review [44267337820](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44267337820) passed.
- PR #169 HEAD `0b6d97be460cabc24013b15d180cdf6d4180d42b`: Validation [44272942930](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272942930) failed at the same npm audit; CodeQL [44272943096](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272943096) and Dependency Review [44272943019](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272943019) passed.
- PR #170 HEAD `6de7cedc9b1214f7bf819e8b76fd1d8986d8d085`: Validation [44273476324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476324) failed at the same npm audit; CodeQL [44273476308](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476308) and Dependency Review [44273476354](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476354) passed.
- PR #162 HEAD `2b3414a954741e3149a96e37dc965fee84f575d0`: Validation [44232687433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687433) failed runtime audit; CodeQL [44232687360](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687360) and Dependency Review [44232687432](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687432) passed. Frontend 303 tests, Android/iOS builds and smoke tests passed; source-root-aware bundle scan found no picomatch package source in 2 production maps / 2,634 entries. This does not remediate the lockfile.

### Security blocker: picomatch
- Runtime audit reports 28 vulnerability instances (2 moderate, 26 high dependency paths), including minimatch `GHSA-g3hv-75wg-m249` and picomatch `GHSA-fc5q-39xc-vjpf` / CVE-2026-112366. The advisory is HIGH (CVSS 4.0 8.7), affects picomatch through 4.0.7, and has no verified fixed npm release.
- Upstream PRs #264/#265 remain open/unmerged without checks/reviews. PR #238 has approvals but reported reproductions still demonstrate uncovered patterns; #246 is v2-only. No candidate is accepted as complete. Do not force Expo downgrade, pin unverified code, or suppress audit.

### Issue #64 / PR #99
- PR #99 exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`: Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) all terminal SUCCESS. Four COMMENTED reviews, zero human APPROVED, 2/2 inline threads resolved. Independent security approval and production DNS64/NAT64 configuration/egress evidence remain required; production acceptance is blocked.

### Canonical 25-point register
- **2 Done:** #1, #6.
- **15 In Progress:** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **8 Blocked:** #2 (durable visibility/plan decision), #4 (production Apple entitlement/physical iPhone), #5 (Play Integrity on Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark/business acceptance), #21 (production monitoring/alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot/business sign-off).
- Issue #74's separate 168-hour checklist remains 64 items / 41 checked / 23 open (182 comments). No checklist item changed.
- External console setup, physical device testing, production cloud access, witnessed backup/restore, monitoring, rollout approvals and pilot/business sign-off remain BLOCKED until direct evidence exists.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**


---

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

## Live exact-head reconciliation and 25-point register — 2026-11-16 09:53 CET

This is the authoritative current checkpoint. Older snapshots below are retained for traceability and are superseded by this section.

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

## Live exact-head reconciliation — 2026-11-16 01:59 CET

This snapshot supersedes older status summaries below; historical checkpoints remain for traceability. It is a documentation-only child of pre-write PR #85 HEAD `49201852ba2b179cf6c19ad03da9e33cac26b49f`; this child requires its own exact-head Validation, CodeQL and Dependency Review.

- **PR #85:** pre-write HEAD `49201852ba2b179cf6c19ad03da9e33cac26b49f`; Validation [43780032663](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43780032663), CodeQL [43780032586](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43780032586), Dependency Review [43780032572](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43780032572): all SUCCESS. Both P2 threads are resolved/outdated. Reviewer `tarlaci1984-sketch` remains requested; no human APPROVED review.
- **PR #90:** HEAD `12024e1d3948d04c664888c72510e9949a6164e3`; Validation [43783060018](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43783060018) IN_PROGRESS (backend passed; Android and iOS Release jobs running); CodeQL [43783060010](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43783060010) and Dependency Review [43783060119](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43783060119) SUCCESS. Three P2 threads resolved. Predecessor `902781b4` failed a brittle frontend source assertion; child `12024e1` corrects the test. Issue [#110](https://github.com/milanradics89-beep/POS-Doctor/issues/110) stays open until current-head Validation succeeds.
- **PR #99 / Issue #64:** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109): all SUCCESS. Backend 539, readiness 27, production security 78; cryptography 50.0.2; pip-audit clean. HTTPX/httpcore transport tests cover DNS-per-hop, IP pinning, peer verification, Host/SNI preservation and NAT64 embedded IPv4 validation. Both NAT64 P2 threads resolved. PR #99 remains Draft; independent human security review and production `USEIT_NAT64_PREFIXES` inventory/configuration remain outstanding.
- **PR #41:** merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; 22/22 threads resolved, one human APPROVED review. Three obsolete runs remain QUEUED with empty job lists on stale SHA `b46c5b8`: Validation 43098210284, CodeQL 43098210473, Dependency Review 43098210255. Owner/admin cleanup is required.
- **PR #65/#67/#68/#69:** closed unmerged; verified SDK 57 alignment, Redis runbook fixes, cryptography 50.0.2/pip-audit and Node 22 config-plugin/runtime split are on main. **PR #96/#97/#106/#107/#108:** recorded exact-head check sets remain 3/3 SUCCESS. PR #106 tests redis-py 8.1 against Redis 7.4.12, not Redis server 8 production. PR #107 npm audit remains 3 moderate / 0 high / 0 critical, visible and unsuppressed.
- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active and unchanged (one approval, last-push approval, resolved threads, six strict checks, no bypass).
- Issue [#74](https://github.com/milanradics89-beep/POS-Doctor/issues/74) remains 64 checklist boxes / 31 checked / 33 open. No checkbox is changed here. The 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. Security-alert inventories remain unavailable/unverified, not zero.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** Physical-device App Attest/Play Integrity, production configuration, witnessed backup/restore, monitoring/alert delivery, staged rollout/rollback, representative benchmark/business acceptance and real-user pilot remain external or human-owned gates.

---

## Latest exact-head evidence — 2026-11-15 22:07 CET

This checkpoint supersedes the 21:14 CET snapshot below. It records live GitHub state at 22:07 CET. The documentation correction is a child of validated PR #85 parent `2cd7198a111dc0937150d344bc7817418de0e227`; this new child must pass its own Validation, CodeQL and Dependency Review.

### PR #41 — merged application baseline
- PR #41 is closed/merged on source branch `fix/release-blockers-2026-10`; live Git ref and PR metadata both point to reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit and main HEAD are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch comparison against main: 517 ahead / 1 behind; merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR metadata: 517 commits, 100 changed files, +11,887 / -2,005.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all SUCCESS; backend, frontend, iOS, CodeQL Analyze and Dependency Review jobs succeeded.
- Review inventory: 52 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved.
- Three historical runs remain queued on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation 43098210284, CodeQL 43098210473, Dependency Review 43098210255. Their job lists are empty. These are not current-head checks; owner/admin cancellation is required and no cancellation operation is exposed here.

### PR #85 — release-documentation branch
- Current validated parent HEAD: `2cd7198a111dc0937150d344bc7817418de0e227`; base main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 61 commits, 3 changed files.
- Exact-head Validation [43757893067](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893067), CodeQL [43757893059](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893059), Dependency Review [43757893072](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893072): all SUCCESS. Backend, frontend/Android and iOS jobs passed. Android emulator smoke and iOS simulator smoke passed. Backend pip-audit reported no known vulnerabilities. Runtime npm audit still reports 3 moderate minimatch findings; this is not a clean npm audit.
- Review inventory: 25 conversation comments, 2 automated COMMENTED review submissions, 2 inline threads (one resolved/outdated, one unresolved P2). No human APPROVED review; `tarlaci1984-sketch` remains requested.
- The unresolved P2 finding identified a literal, unevaluated JavaScript checklist-count expression in the new backlog and runbook checkpoints. This documentation child replaces it with the actual Issue #74 count: 64 total, 31 checked, 33 open. Keep the review thread open until this child passes exact-head CI and the reviewer re-evaluates it.
- This documentation child is not validated by its parent's green workflows. Its own three required checks must complete before another repository write or review-thread resolution.

### Other exact-head PR evidence
- PR #107 HEAD `431d96a31beb523be31c109d81c7009d49357318`: Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667): all SUCCESS. Full dependency-tree audit artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) reports 3 moderate / 0 high / 0 critical / 0 low; findings remain visible and unsuppressed. The P2 workflow thread is resolved. No human approval.
- PR #90 current HEAD `05be357c1e46ecd134c4aaf5feaed05b2bad9878`: CodeQL [43760238628](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238628) and Dependency Review [43760238664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238664) SUCCESS; Validation [43760238641](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238641) IN_PROGRESS. Backend passed; Android emulator smoke and iOS Release build/simulator steps were still running at the latest job read. Do not reuse the previous PR #90 parent results.
- PR #99 HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`: Validation 43684598555, CodeQL 43684598557, Dependency Review 43684598448 all SUCCESS. Issue #64 remains open pending independent human security review of the HTTPX/httpcore DNS-pinning transport.
- PR #106 HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`, PR #108 HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`, and PR #96 HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f` each have terminal-success Validation, CodeQL and Dependency Review. PR #106 validates redis-py 8.1 against Redis 7.4, not Redis server 8 production.

### Repository, governance and security
- Repository visibility is public; default branch is main at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Published GitHub Releases API returned an empty array.
- Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active. It requires PRs, one approval, stale-review dismissal, last-push approval, resolved review threads and six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review); deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is never.
- Issue #47 is closed (10 comments); the ruleset is currently readable and active while the repository is public. The owner's long-term visibility/plan decision remains separate, so backlog item #2 stays Blocked until the owner decision is explicit.
- Issue #64 is open with 32 comments. Reviewer `tarlaci1984-sketch` is requested on PR #99 but has not submitted a human review. Keep the issue open.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable to the connected integration, therefore unavailable/unverified, not empty.
- Issue #74 currently has 64 checklist boxes: 31 checked and 33 open. The prior literal-expression defect is corrected in this child.

### Authoritative 25-point register
- Done (2): #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.
- In Progress (15): #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- Blocked (8): #2 owner visibility/plan decision; #4 physical iPhone App Attest and production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** Simulator/emulator CI, dependency scans and documentation do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot or business-approval gates.

## Latest exact-head evidence — 2026-11-15 21:14 CET

This checkpoint supersedes the 20:41 CET snapshot below. It is added as a new child of the previously validated PR #85 HEAD a964933d646338a4f80856ddc846735a1a63beaf; this documentation child must pass its own Validation, CodeQL and Dependency Review.

### Current exact-head PR and CI state
- **PR #41:** merged at reviewed HEAD 68b380e73ca3c870048035197beef8febbf90ef1; one human APPROVED review and 22/22 inline threads resolved. Both Redis runbook P2 fixes are on main.
- **PR #65, #67, #68, #69:** closed unmerged historical candidates. #65's Expo SDK 57 package/lockfile alignment is present on main; #68's cryptography 50.0.2/pip-audit evidence is separate from npm findings; #69's JavaScript config-plugin/runtime TypeScript entrypoint split is present on main.
- **PR #85 validated parent:** HEAD a964933d646338a4f80856ddc846735a1a63beaf; Validation 43754312793, CodeQL 43754312748 and Dependency Review 43754312725 all SUCCESS. Backend, frontend and iOS jobs passed. One inline thread is resolved; no human APPROVED review; tarlaci1984-sketch remains requested.
- **PR #96:** HEAD 15e9c9fbd0e605911d4618e2e9216ebf611ab33f; Validation 43747514393, CodeQL 43747514431 and Dependency Review 43747514474 all SUCCESS. No human review submission yet.
- **PR #97:** HEAD 6212c217e700e6cf263d6f98e0481af4888c3fa4; Validation 43600898776, CodeQL 43600898781 and Dependency Review 43600898787 all SUCCESS. No human review submission yet.
- **PR #99 / issue #64:** HEAD 0c66d9c3f0d6d3ba28db8020cd67eed04952c28f; Validation 43684598555, CodeQL 43684598557 and Dependency Review 43684598448 all SUCCESS. Backend 509, readiness 27 and production-security 78 passed. Real HTTPX/httpcore transport tests cover per-hop DNS re-resolution, public-IP pinning, peer verification, original Host/TLS SNI and rejection of private rebinding before the next TCP connect. Independent human security review is still outstanding.
- **PR #106:** HEAD 8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7; Validation 43705947653, CodeQL 43705947633 and Dependency Review 43705947631 all SUCCESS. This validates redis-py 8.1 against Redis 7.4.12, not Redis server 8 production; the PR remains stacked on #97.
- **PR #107:** HEAD 431d96a31beb523be31c109d81c7009d49357318; Validation 43746773703, CodeQL 43746773650 and Dependency Review 43746773667 all SUCCESS. Backend 450, readiness 27, production-security 78, frontend 296/296, Expo Doctor 21/21, Android/iOS smoke and full dependency-tree npm audit passed. Audit: 3 moderate, 0 high, 0 critical, 0 low; findings remain visible and unsuppressed. No human APPROVED review.
- **PR #108:** HEAD e565b9aa029072d88298d83de2c37f6c55f97f2e; Validation 43730870752, CodeQL 43730870781 and Dependency Review 43730870776 all SUCCESS. Frontend 290/290 and Android/iOS Release smoke passed; plain npm test and the non-empty Vitest guard are validated.
- **PR #90 accessibility/design foundation:** parent HEAD 49e1cf958a25cf8399e40b2495c8d96a67bd4d02 passed Validation 43694475229, CodeQL 43694475198 and Dependency Review 43694475189; frontend 305/305 tests across 65 files, accessibility 4, contrast 5, screen semantics 1, Android emulator and iOS simulator smoke passed. Current HEAD is now 01940599717eed35374b03b8b8ab2018aae0da19: it adds reusable loading/empty/offline/permission-denied StatePanel variants and integrates loading/empty states. Its own Validation 43757720829 and CodeQL 43757720826 are IN_PROGRESS; Dependency Review 43757720835 is SUCCESS. Do not transfer the parent green result to this child. PR #90 is Ready for review; tarlaci1984-sketch is requested.

### Repository and release controls
- Repository visibility is public; current inventory is 78 branches / 38 open PRs / 5 open non-PR issues. Main is f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Protect main ruleset 26370589 remains active with six strict checks, one approval, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors.
- PR #41's three old Actions runs remain queued on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1 with empty job lists: Validation 43098210284, CodeQL 43098210473, Dependency Review 43098210255. Owner/admin-side cleanup is required; the current integration exposes no cancellation operation.
- Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified, not empty. Three moderate npm findings remain visible; no Expo downgrade, forced major override, audit suppression, threshold reduction or security-check weakening is accepted.
- Issue #74's persisted body currently contains 64 checklist boxes / 31 checked / 33 open. P1 Frontend, P0 iOS simulator, P1 Accessibility and P1 Security workflow-review rows have exact-head evidence; physical iPhone App Attest remains separate and alert inventory remains unverified.
- The authoritative 25-point release register remains 2 Done / 15 In Progress / 8 Blocked. Done: #1 iOS simulator CI and #6 Redis multi-instance concurrency. Blocked: #2 owner visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/tested rollback; #25 real-user pilot/business sign-off.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** Simulator/emulator CI and documentation do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot or business-approval gates.

## Latest exact-head evidence — 2026-11-15 20:41 CET

This checkpoint supersedes earlier status summaries. Historical entries remain below for audit traceability; they are not current state.

### Current PR and CI state
- **PR #41:** merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; source branch `fix/release-blockers-2026-10` still matches. Merge commit/main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all SUCCESS. Review: 52 conversation comments, 30 inline comments, 26 submissions (25 COMMENTED, one human APPROVED), 22/22 threads resolved.
- **PR #85:** current exact HEAD `64f42129f167fc34bb01a62e2f8573e69f9e8fb8`; Validation [43747770438](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770438), CodeQL [43747770429](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770429), Dependency Review [43747770432](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747770432): all SUCCESS. Backend 450 / readiness 27 / production-security 78; frontend 289 tests/59 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke. One automated COMMENTED review, one resolved thread, no human APPROVED review; `tarlaci1984-sketch` remains requested.
- **PR #107:** current exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667): all SUCCESS. Backend 450 / readiness 27 / production-security 78; frontend completed typecheck, tests, Expo Doctor, Android Release/emulator, runtime audit and full-tree audit. Artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989), SHA-256 `e3c3f430830bf6e0d987bb6d43ee96cca53d1cd4549ddf322af730adf1f3528a`, reports **3 moderate / 0 high / 0 critical**. Fail-closed parser and full-audit-after-runtime-failure correction are validated. P2 thread resolved; no human APPROVED review.
- **PR #90:** exact HEAD `49e1cf958a25cf8399e40b2495c8d96a67bd4d02`; Validation [43694475229](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475229), CodeQL [43694475198](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475198), Dependency Review [43694475189](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43694475189) all SUCCESS. StatePanel empty accessibility-hint fallback has regression coverage; human design review pending.
- **PR #99:** exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`; Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448) all SUCCESS. Backend 509 / readiness 27 / production-security 78; HTTPX/httpcore tests cover per-hop DNS, pinned public IP, peer verification, Host/TLS SNI and same-host DNS-rebinding rejection. Independent human security review remains outstanding; issue #64 is open with 31 comments.
- **PR #106:** exact HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`; all three required workflows SUCCESS. This validates redis-py 8.1 against Redis 7.4, not Redis server 8 production.
- **PR #108:** exact HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`; Validation, CodeQL and Dependency Review all SUCCESS. Plain `npm test` and non-empty Vitest guard validated.
- **PR #96:** exact HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`; Validation, CodeQL and Dependency Review all SUCCESS.

### Repository, governance and security
- Repository public; inventory **78 branches / 38 open PRs / 5 open non-PR issues / 0 published GitHub releases**. Main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` reports protected. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires one approval, stale-review dismissal, last-push approval, resolved threads and six strict checks; deletion/non-fast-forward are blocked and no bypass actors are configured. Issue #47 closed (10 comments).
- Three historical PR #41 runs remain queued on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1` (Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255)); not current-head checks.
- Code Scanning, Dependabot and Secret Scanning inventories are **unavailable/unverified, not empty**. GitHub Releases API currently returns zero published releases.
- Three moderate npm findings remain visible debt. No downgrade, forced override, audit suppression, threshold reduction or security-check weakening.

### Authoritative status distribution
- **Done (2):** #1 iOS CI closure; #6 Redis multi-instance concurrency.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 final owner visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/tested rollback; #25 real-user pilot/business sign-off.
- **Release NOT READY; production/pilot acceptance NOT GRANTED.** CI, emulator/simulator or documentation evidence does not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot or business-approval gates.

## Latest exact-head evidence — 2026-11-15 19:42 CET

This checkpoint records current exact-head observations as of 2026-11-15 19:42 CET. It is committed as a new child of validated PR #85 parent `ab0652e97dacaadafd43fcf04e41e26383fa77d1`; this child must pass its own Validation, CodeQL and Dependency Review. Parent checks are not inherited.

### Current PR and CI state
- **PR #85 parent:** `ab0652e97dacaadafd43fcf04e41e26383fa77d1`; Validation [43741911579](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43741911579), CodeQL [43741911524](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43741911524), Dependency Review [43741911549](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43741911549) all SUCCESS. This documentation update creates a new child whose own checks are pending.
- **PR #107 full npm audit:** exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650) SUCCESS; Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667) SUCCESS; Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703) IN_PROGRESS. Backend is SUCCESS; Android/iOS native Release builds are running; runtime and full-tree npm audit steps have not executed. The last completed full-audit parent `6e0d2458` reported 3 moderate, 0 high, 0 critical; do not substitute that parent result for the current head.
- **PR #108 non-empty Vitest gate:** exact HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`; Validation [43730870752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870752), CodeQL [43730870781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870781), Dependency Review [43730870776](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730870776) all SUCCESS. The no-empty-test guard uses plain `npm test`; the step-scoped regression test rejects `--passWithNoTests`.
- **PR #99 SSRF transport:** exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f`; Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448) all SUCCESS. Backend 509, readiness 27, production-security 78; HTTPX/httpcore transport tests cover per-hop DNS, public IP pinning, peer verification, Host/TLS SNI and rebinding rejection. Independent human security review is still required; issue #64 remains open.
- **PR #96 Copilot guidance:** exact HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`; Dependency Review [43747514474](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747514474) SUCCESS; Validation [43747514393](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747514393) and CodeQL [43747514431](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43747514431) IN_PROGRESS. The guidance now correctly describes USEIT as consumer product discovery/visual assistance and uses plain `npm test`. Stacked PR #102 is closed as superseded; #108 owns the stronger CI regression test.
- **PR #97 Redis readiness:** exact HEAD `6212c217e700e6cf263d6f98e0481af4888c3fa4`, all three required checks SUCCESS.
- **PR #106 Redis-py migration:** exact HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`, all three required checks SUCCESS. This validates redis-py 8.1.0 against Redis server 7.4.12, not a Redis server 8 production migration.
- **PR #41:** merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; one human APPROVED review and 22/22 resolved inline threads. Three old runs remain queued on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; owner/admin cancellation is required.
- **PR #65, #67, #68 and #69:** closed unmerged historical branches. Current-main file checks confirm the SDK 57 package/lockfile, Redis runbook corrections, App Attest key/client-data handling, cryptography 50.x and the separate JS config-plugin/runtime TS entrypoints. Historical failures are not current-main failures.

### Repository and release controls
- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; 78 branches, 39 open PRs, 5 open non-PR issues. Main reports protected; active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) remains unchanged, with six strict checks, one approval, last-push approval, resolved-thread requirement, deletion/non-fast-forward protection and no bypass actors.
- Issues #84 (CodeQL workflow/SARIF recovery) and #103 (repeated Validation failure) are closed as completed after exact-head evidence. Issue #64 remains open for independent security review. Full Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable/unverified, not zero.
- The authoritative 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Release remains **NOT READY**; production/pilot acceptance remains **NOT GRANTED**.
- External gates remain physical iPhone App Attest, Play-installed physical Android Play Integrity, witnessed production backup/restore, production monitoring/alert delivery, staged rollout/rollback approval, representative benchmark/business acceptance, and real-user pilot/business sign-off.

## Latest 25-point release register checkpoint — 2026-11-15 17:43 CET

**Authoritative tally: 2 Done / 15 In Progress / 8 Blocked.** The canonical row-level register below remains exactly 25 unique items (#1–#25). This checkpoint supersedes the 15:11 and 16:29 snapshots; historical evidence is retained.

### Current exact-head evidence
- PR #41 is merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; source branch ref matches. Merge/main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): all **SUCCESS**. Review: 52 conversation comments, 30 inline comments, 26 review submissions (25 COMMENTED, one human APPROVED), 22/22 threads resolved.
- PR #85 last validated exact HEAD before this documentation commit: `17b9d46f10d44d7005167d7d7a1d788cdca3a465`. Validation [43730574442](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574442), CodeQL [43730574467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574467), Dependency Review [43730574509](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730574509): all **SUCCESS** on that exact HEAD. Backend 450 / readiness 27 / security 78; frontend 289 tests/59 files, Expo Doctor 21/21, Android Release/emulator; iOS Release/simulator. This checkpoint creates a new PR #85 child; its own CI is pending and parent results are not inherited.
- PR #107 exact HEAD `6e0d24587466fc7da35ace3a4af7a044d266991a` passed Validation [43730357960](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960), CodeQL [43730357954](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357954), and Dependency Review [43730357937](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357937). Backend 450 / readiness 27 / security 78; frontend 296 tests/60 files, Expo Doctor 21/21, Android/iOS Release smoke. Full-tree audit artifact [14168971891](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43730357960/artifacts/14168971891): 3 moderate, 0 high, 0 critical. Fail-closed parser and targeted tests pass.
- PR #90 exact HEAD `49e1cf958a25cf8399e40b2495c8d96a67bd4d02` and PR #99 exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f` each passed their own Validation, CodeQL and Dependency Review workflows. PR #99 includes 509 backend tests, 27 readiness, 78 security checks, 289 frontend tests, Expo Doctor 21/21, Android/iOS Release smoke and same-host DNS-rebinding regression. Human security/design reviews remain pending.
- PR #106 exact HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7` passed all three workflows; this tests redis-py 8.1 against Redis 7.4, not a Redis server 8 production migration.

### Repository and governance
- Repository is public; inventory: **78 branches / 39 open PRs / 7 open non-PR issues / 0 published releases**.
- Main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` is protected by active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): one approval, stale-review dismissal, last-push approval, resolved threads, six strict checks, deletion/non-fast-forward blocked, no bypass actors.
- Code Scanning, Dependabot and Secret Scanning alert inventories are **unavailable/unverified, not empty**. Issue #47 is closed (10 comments); issue #64 remains open (30 comments); issue #84 remains open (25 comments).
- Runtime npm audit still reports three moderate minimatch-related findings. The full-tree audit confirms 3 moderate / 0 high / 0 critical; the suggested Expo 52.0.49 major downgrade is rejected for SDK 57. No dependency version, audit threshold or security check was weakened.

### Authoritative distribution
- **Done (2):** #1 iOS CI closure; #6 Redis multi-instance concurrency.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 final visibility/plan decision; #4 physical iPhone App Attest/production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business sign-off.
- Physical-device, production-cloud, witnessed recovery, monitoring, rollout, pilot and business acceptance remain blocked until direct evidence exists. **Release NOT READY; production/pilot acceptance NOT GRANTED.**


---

## Superseded checkpoint — 2026-11-15 15:11 CET

**Authoritative tally: 2 Done / 15 In Progress / 8 Blocked.** The canonical row-level register remains below; statuses were re-counted and no external gate was promoted.

### Current exact-head evidence
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

### Repository, governance and dependency evidence
- Repository is public; latest inventory: 77 branches, 38 open PRs, 7 open non-PR issues, and 0 published GitHub releases.
- Main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1` is protected by active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward blocked, and no bypass actors.
- Complete Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration. They remain **unverified, not empty**.
- Runtime npm audit retains **three moderate** `GHSA-g3hv-75wg-m249` findings through `@expo/fingerprint@0.20.16` / `minimatch@10.2.6`. Expo's upstream compatibility assessment retains minimatch 10 for fingerprint-ignore semantics; this is scoped context, not a clean audit. No forced override, audit suppression, or Expo downgrade was applied.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed; active ruleset #26370589 remains in force. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) is open with 26 comments and awaits independent human security review. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) remains open for security-alert capability/inventory access.

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


### Current 25-point register
The current table below remains the canonical row-level record. Its status tally is **2 Done / 15 In Progress / 8 Blocked**: Done items #1 and #6; Blocked items #2, #4, #5, #16, #18, #21, #22 and #25. The remaining 15 are In Progress. The rows are not promoted based on documentation or simulator evidence alone.

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

### Backlog register discipline
The row-level 25-item table remains 2 Done / 15 In Progress / 8 Blocked. Do not promote a row based solely on source presence, unit tests, simulator/emulator results, or CI. Each external gate requires its own dated evidence and accountable owner.

---

## Verified repository checkpoint — 2026-11-15 00:47 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes older inventory and workflow snapshots below. Historical checkpoints remain for traceability; their statuses and run results must not be mistaken for the current state.

### Repository, main branch, and governance
- Repository visibility is public. Current inventory: **74 branches, 38 open PRs, 7 open issues**. The GitHub Releases API returned an empty array: **0 published releases**.
- Main HEAD is f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The main branch reports protected:true. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires pull requests, one approval, stale-review dismissal, last-push approval, resolved review threads, and six strict checks: CodeQL, backend, frontend, ios, analyze, dependency-review. Deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is never.
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

### Authoritative 25-point release register
- The row-level table below contains exactly 25 entries and remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The other 15 remain In Progress. Historical 3/15/7 checkpoints elsewhere in this file are superseded.
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


### Authoritative row-level register
The 25-entry table below remains authoritative. Its current distribution is **2 Done / 15 In Progress / 8 Blocked**. Historical 3/15/7 checkpoints elsewhere in this file are superseded and must not be treated as current.

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

### Authoritative row-level register
The 25-entry table below remains authoritative. Its current distribution is **2 Done / 15 In Progress / 8 Blocked**; rows #2, #8, #10, and #24 below were reconciled against the live evidence above. Historical 3/15/7 checkpoints elsewhere in this file are superseded and must not be treated as current.

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

## Verified repository checkpoint — 2026-11-14 16:44 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.**

### Merged application baseline — PR #41
- PR #41 is closed and merged. Source branch `fix/release-blockers-2026-10` remains at exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded.
- Review inventory: 108 combined timeline records; 52 conversation comments; 30 inline review comments; 22/22 threads resolved; 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`).

### Current documentation gate — PR #85
- Current exact HEAD: `322516376d15323dd181b9b6f550e14855f7f6df`; branch `docs/post-merge-release-evidence-20261113`; PR remains open and unmerged.
- Exact-head Validation [43608976346](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43608976346): success. Backend, frontend, and iOS jobs completed successfully (13, 17, and 11 steps). Backend log records 450 tests, 27 readiness checks, and 78 security/privacy checks passed. Android build/emulator smoke and iOS Release simulator build/smoke completed.
- Exact-head CodeQL [43608976345](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43608976345): success; SARIF generation and upload completed. A non-fatal SARIF column-kind warning did not prevent upload.
- Exact-head Dependency Review [43608976479](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43608976479): success.
- PR #85 review: one resolved inline thread, one COMMENTED review submission, no human APPROVED review. Do not merge automatically.

### SSRF integration — PR #95 / child PR #99 / issue #64
- Parent PR #95 exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67` has its own Validation failure [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397): backend 507 passed / 1 failed because a regression expected resolver input order instead of deterministic sorted IP order. Parent CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402) and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) passed.
- Stacked child PR #99 exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9` corrects only the two test expectations; production security assertions are unchanged. Its own Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all passed. Backend: 508 tests, 27 readiness checks, 78 security/privacy checks passed; pip-audit reported no known Python dependency vulnerabilities. Android and iOS simulator smoke also passed.
- PR #99 remains stacked on #95 and open/draft. Its green checks are not attributed to parent #95. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open pending integration, fresh parent exact-head checks, and human security review.

### Governance, alerts, dependencies, and releases
- Repository visibility is currently public, described by the owner as temporary. Main is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires PRs, one approval, stale-review dismissal, last-push approval, resolved threads, strict CodeQL/backend/frontend/iOS/analyze/Dependency Review checks, blocks deletion and non-fast-forward updates, and has no bypass actors.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open until the owner decides whether to keep the repository public or move to a private plan that preserves the same protections. Re-verify enforcement after any visibility change.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) needs reconciliation: exact-head CodeQL SARIF upload and Dependency Review now succeeded on PR #85 and #99, but this does not expose or prove the complete alert inventory.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**. Alert endpoints are not exposed to this integration.
- GitHub Releases API returned an empty array: 0 published releases. Repository inventory: 74 branches, 40 open PRs, 8 open issues.

### Authoritative 25-point release register
- **2 Done / 15 In Progress / 8 Blocked**; retain exactly 25 row-level entries.
- Done: #1 iOS CI closure; #6 Redis multi-instance concurrency.
- Blocked: #2 durable main-protection/visibility-plan decision; #4 physical iPhone App Attest and production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and alert delivery; #22 staged rollout and tested rollback approval; #25 real-user pilot and business sign-off.
- The other 15 remain In Progress. PR #99's successful child CI strengthens item #8 but does not make the parent integration Done.
- External console setup, physical-device tests, production cloud access, witnessed recovery, rollout approval, and real-user/business acceptance remain blocked until independent evidence exists.

### Operational consequence
PR #85 now has terminal-success Validation, CodeQL, and Dependency Review on its own exact HEAD. This documentation checkpoint does not authorize a merge. Human approval and all external acceptance evidence remain required.

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

### Register maintenance
The row-level 25-entry register below remains authoritative. This checkpoint does not change any row status or checkbox; the 2/15/8 tally is preserved pending the owner's final visibility/plan decision for item #2.

---

## Latest 25-point status checkpoint — 2026-11-14 15:14 CET

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

The row-level 25-entry register below remains authoritative and was re-counted before this update: **25 rows; 2 Done / 15 In Progress / 8 Blocked**. Row #2 is Blocked; historical 3/15/7 snapshots are not current.
---
## Latest audit addendum — 2026-11-14 13:34 CET

### PR #41 merged application baseline
- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged from `fix/release-blockers-2026-10`; exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch comparison is 517 ahead / 1 behind main; the PR diff is 100 files (+11,887 / -2,005).
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Validation frontend/backend/iOS jobs completed 17/13/11 steps; CodeQL 8; Dependency Review 5.
- Review inventory: 108 combined timeline records (52 conversation comments, 30 inline review comments, 26 review submissions); 22/22 inline threads resolved; one human APPROVED review by `tarlaci1984-sketch`.

### Current documentation gate — PR #85
- PR #85 is open/unmerged on `docs/post-merge-release-evidence-20261113`, exact HEAD `32b7c300eb3be3f2bd548bbba40090da7a32ec01`, 26 commits, three changed files, 0 behind main.
- Exact-head Validation [43592077952](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077952), CodeQL [43592077937](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077937), and Dependency Review [43592077920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592077920) all failed. Backend `132438737354`, frontend `132438737511`, iOS `132438737558`, CodeQL `132438737290`, and Dependency Review `132438737068` each have no executed steps and no usable logs. No tests or scans ran on this HEAD. Review: one resolved inline thread, one COMMENTED review, no human approval.
- This commit synchronizes the latest checkpoint across all three release records. PR #85 remains open and unmerged; its exact-head CI remains a separate failed gate.

### Current SSRF candidate — PR #95 / issue #64
- PR #95 is open/draft on `security/ssrf-mainline-integration-20261114`, exact HEAD `35f8afe5fd947d25b1d9d6fa55e40f02365dcb67`, 12 commits and five changed files. Latest commit `test(security): inspect real socket peer before response close`.
- The transport validates every DNS answer as public unicast, bounds DNS and sequential connection attempts by the connect deadline, dials the pinned numeric IP, verifies the actual TCP peer against the pinned address before TLS/request transmission, revalidates each redirect, preserves original Host/TLS SNI, disables proxies and keep-alive reuse, and retains response peer validation. NAT64 embedded IPv4, multicast, reserved, and unspecified addresses are rejected.
- Exact-head Validation [43595304397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304397), CodeQL [43595304402](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304402), and Dependency Review [43595304460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43595304460) all failed before steps. iOS `132448408914`, frontend `132448409115`, backend `132448409139`, CodeQL `132448408793`, and Dependency Review `132448408522` have no executed steps. No DNS-timeout, NAT64, multicast, pinned-peer, or real-socket test is accepted on this HEAD. Issue #64 remains open.
- HTTPX is constrained to `>=0.28.1,<0.29` and httpcore to `>=1.0.9,<1.1`; private-pool compatibility remains part of human security review.

### Dependency disposition — PR #98 / PR #81
- PR #98 exact HEAD `6428924ebdc339683d8ae9a19671435a9c179273` is closed without merge. Compatibility review confirmed `@expo/fingerprint@0.20.16` declares `minimatch ^10.2.6`; the root override to `11.0.5` violates that contract. Do not force the override, downgrade Expo, or lower the npm audit threshold.
- PR #81 exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14` passed its own Validation, CodeQL, and Dependency Review on the separate `fix/release-remediation-2026-11-13` base. Its full-tree npm audit reports 3 moderate, 0 high, and 0 critical findings. This is not a mainline remediation or a clean alert inventory. Item #3 remains In Progress pending a compatible upstream fix or explicit owner risk acceptance.

### Governance, inventory, and current release decision
- Repository visibility is private. A fresh main branch read at 13:34 reports SHA `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, `protected:false`, and required-status enforcement `off`. Rulesets API returns HTTP 403 requiring a supported private-repository plan or public visibility. Issue #47 remains open; issue #84 remains open for Code Scanning / Dependency Graph capability restrictions; issue #64 remains open.
- Releases API returned `[]` (0 published releases). Branch search returned 70 branches; open search returned 36 PRs and 7 issues. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable/unverified, not empty.
- **Current authoritative 25-row tally: 2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The other 15 remain In Progress. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest audit addendum — 2026-11-14 12:47 CET

### PR #41 merged application baseline
- PR #41 is closed/merged from `fix/release-blockers-2026-10`; exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch comparison is 517 ahead / 1 behind main; PR diff is 100 files (+11,887 / -2,005).
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed. Validation frontend/backend/iOS jobs completed 17/13/11 successful steps; CodeQL analyze completed 8 steps; Dependency Review completed 5 steps.
- PR #41 review inventory: 108 combined timeline records, including 52 conversation comments; 22/22 inline review threads resolved; 26 review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`).

### Current documentation gate — PR #85
- Current exact HEAD `9d3cb0572c1514ceadfccb3b877b2529bcf8f054`, branch `docs/post-merge-release-evidence-20261113`, 24 commits, three release-record files, open/unmerged. Its review inventory is one resolved inline thread and one COMMENTED review; no human approval.
- Exact-head Validation [43590019917](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43590019917), CodeQL [43590019919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43590019919), and Dependency Review [43590019925](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43590019925) all completed with failure.
- Backend `132432563219`, frontend `132432563367`, iOS `132432563358`, CodeQL analyze `132432563195`, and Dependency Review `132432562833` each have zero executed steps and no log URL. No tests, native builds, CodeQL scan, or Dependency Review execution is evidenced. This is not an application assertion failure and is not a pass.

### Current SSRF integration — PR #95 / issue #64
- PR #95 current exact HEAD `f283a493714af28ca6bbaec7876bcffe8e680c87`, branch `security/ssrf-mainline-integration-20261114`, open/draft, based on main. The latest commit `fix(security): verify the actual pinned TCP peer` compares the connected socket's actual peer IP with the normalized pinned DNS IP immediately after TCP connect and before TLS or HTTP request bytes. A mismatch closes the stream and raises `httpcore.ConnectError`; the regression test asserts no TLS handshake and no request writes.
- Exact-head Validation [43591784615](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784615), CodeQL [43591784583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784583), and Dependency Review [43591784599](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784599) all completed with failure. Backend `132437863380`, iOS `132437863446`, frontend `132437863469`, CodeQL `132437863077`, and Dependency Review `132437863010` each have zero steps and no log URL. The peer-mismatch and earlier DNS/NAT64 regressions have not executed on this HEAD. Issue #64 remains open; no SSRF acceptance is claimed.

### Governance, inventory, and external acceptance
- Repository visibility is private. Issue #47 is reopened. Live main metadata reports `protected:false` and required-status enforcement `off`; branch-protection/rulesets reads return HTTP 403 under the current private-repository plan. The 2026-11-02 ruleset evidence is historical, not current enforcement proof. Owner action is required to restore supported private-repository ruleset access and verify all required checks, approvals, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection.
- Issue #84 records Code Scanning disabled and Dependency Graph / GitHub Advanced Security unavailable or not enabled under the current private-repository configuration. Security alert inventories remain unavailable/unverified, not empty.
- Current inventory: 70 branch names (branch pagination exhausted), 21 open PRs, and 7 open issues. A fresh published-release list is not exposed by the connected GitHub operations; the last recorded inventory was zero, but that count is not independently reverified in this checkpoint.
- The authoritative row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The other 15 remain In Progress. Pilot/production acceptance remains **NOT GRANTED**. Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user-pilot, or business-approval items based on CI, simulator, emulator, or injected-backend evidence.

---

## Latest audit addendum — 2026-11-14 12:20 CET

### Follow-up exact-head CI result — PR #85 checkpoint commit
- The preceding documentation update was committed as `072ab3bdabbb9cfcbc6cd954b47cc7d446f8be55`; PR #85 now points to this exact HEAD (23 commits, three release-record files).
- Exact-head Validation [43589918942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918942), CodeQL [43589918950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918950), and Dependency Review [43589918966](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43589918966) all completed with failure.
- Five jobs (backend `132432256450`, frontend `132432256636`, iOS `132432256700`, CodeQL `132432256536`, Dependency Review `132432256079`) each have zero executed steps. Sampled job-log downloads return HTTP 404 `BlobNotFound`.
- No tests, native builds, CodeQL scan, or Dependency Review execution is evidenced on this exact HEAD. This is not an application assertion failure and is not a pass. The exact GitHub-side dispatch/log-storage cause remains unverified.
- The current 25-row register is **2 Done / 15 In Progress / 8 Blocked**. Row #2 is **Blocked** because live main metadata reports `protected:false` and required-status enforcement `off`; branch-protection/rulesets reads return HTTP 403 under the current private-repository plan. Issue #47 remains open.
- No further commit should be made until these exact-head checks are reconciled with GitHub Actions execution availability. Pilot/production acceptance remains **NOT GRANTED**.

### Current dependency and SSRF disposition
- PR #95 exact HEAD `aec819f2c4ff321611ff7a4899e7d0666b0cd845` contains multicast/reserved/unspecified destination rejection and focused syntax/DNS/peer/transport tests, but its exact-head checks all failed before steps. No test result is claimed; issue #64 remains open.
- PR #98 closed without merge because the minimatch 11 override violates `@expo/fingerprint@0.20.16`'s declared `^10.2.6` range. PR #81's separate legacy-base audit reports 3 moderate, 0 high, 0 critical findings. Keep item #3 In Progress and do not force the override.
- Main remains private, `protected:false`, and required status enforcement off. Issue #47 remains open; issue #84 records unavailable Code Scanning/Dependency Graph capabilities. Security alert inventories remain unavailable/unverified, not empty. Releases API returned an empty list.

---

## Latest audit addendum — 2026-11-14 12:17 CET

### Merged baseline and repository state
- PR #41 is closed/merged from `fix/release-blockers-2026-10`; exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review is claimed.
- PR #41 review inventory: 108 combined timeline records; 22/22 inline threads resolved; 26 review submissions (25 COMMENTED, one human APPROVED). Source branch still points to the reviewed HEAD; compare reports 517 ahead / 1 behind main after merge.
- Current repository inventory: 70 branch names, 36 open PRs, 7 open issues; repository is private. GitHub Releases API returned `[]` (0 published releases).
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub operations; they remain **unavailable/unverified, not empty**.

### Exact-head PR #85 documentation gate
- Current PR #85 HEAD: `71116d40a7e1a36bea015fc7c8da8d6043e911c9`, 22 commits and three release-record files, open/unmerged.
- Validation [43586364962](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364962), CodeQL [43586364980](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364980), and Dependency Review [43586364929](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364929) are terminal failures. Backend, frontend, iOS, CodeQL analyze, and Dependency Review job step lists are empty; sampled logs return HTTP 404 `BlobNotFound`. No tests/scans executed; this is not a source assertion failure and not a pass. No human approval is recorded.
- The current main copies of all three release records remain at the historical 2026-11-13 18:49 CET checkpoint. This documentation branch is not merged.

### Mainline SSRF candidate — PR #95
- Current exact HEAD: `aec819f2c4ff321611ff7a4899e7d0666b0cd845`; latest commit rejects multicast SSRF destinations. The shared public-unicast predicate explicitly rejects multicast, reserved, and unspecified addresses, including IPv4/IPv6 multicast and NAT64-embedded multicast. Tests cover syntax-only URL validation, DNS answers, connected peers, and async transport rejection before TCP connection; prior NAT64 and bounded-DNS tests remain.
- Exact-head Validation [43586519237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519237), CodeQL [43586519299](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519299), and Dependency Review [43586519266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519266) all failed before steps. All five jobs have empty step lists and no retrievable logs. The new security tests have **not executed** on this HEAD. Issue #64 remains open; no SSRF integration acceptance is claimed.

### Dependency advisory disposition
- PR #98 was closed without merge at exact HEAD `6428924ebdc339683d8ae9a19671435a9c179273`. Its global minimatch 11.0.5 override violates `@expo/fingerprint@0.20.16`'s declared `minimatch ^10.2.6` range. Expo upstream fingerprint/minimatch 11 and picomatch attempts closed unmerged due compatibility differences; maintainers retain minimatch 10 for this SDK line.
- PR #81 full-tree npm audit artifact (exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14`, on a separate legacy release-remediation base) reports 3 moderate, 0 high, 0 critical findings. [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) affects minimatch `>=7.0.0 <11.0.1`. Expo issue [#52735](https://github.com/expo/expo/issues/52735) assesses this as local CLI/build tooling rather than shipped-app runtime and documents the breaking-change reason for retaining minimatch 10.
- Keep item #3 **In Progress**. Do not claim a clean npm audit or force an unsupported global override. PR #81's successful CI applies only to its own older-base audit branch; PR #98's migration tests did not execute on its failed exact head.

### Governance and owner actions
- Live main metadata reports `protected: false` and required-status-check enforcement `off`. Branch-protection read returns HTTP 403; rulesets read returns HTTP 403 with GitHub's private-repository plan restriction. Issue #47 remains open; current main enforcement is unverified. Item #2 stays **Blocked** until the owner restores supported private-repository ruleset access and verifies required checks, approvals, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection.
- Issue #84 separately records Code Scanning disabled and Dependency Graph / GitHub Advanced Security unavailable or not enabled under the current private-repository configuration. Do not remove, skip, or weaken CodeQL or Dependency Review.

### Authoritative 25-point register and release decision
**2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection; #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 staged rollout/rollback approval; #25 real-user pilot/business approval. The other 15 remain In Progress.

Pilot/production acceptance remains **NOT GRANTED**. Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items based on CI, simulator, emulator, or injected-backend evidence.

---

## Latest audit addendum — 2026-11-14 11:29 CET

### Repository and release evidence

- Current `main` HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; PR #41 is merged at that commit. PR #41 has 22/22 inline review threads resolved, 26 review submissions, and one human APPROVED review. Its two Redis runbook P2 findings are resolved.
- Live GitHub branch metadata reports `main.protected: false`. The branch-protection endpoint returns HTTP 403 and the repository rulesets endpoint returns HTTP 403 with the GitHub Pro/private-repository restriction. The older 2026-11-02 ruleset evidence is historical and does not prove current enforcement. Item #2 remains **Blocked** until the owner restores supported private-repository ruleset access and verifies the six required checks, one approval, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass.
- Current repository inventory: **70 branch names, 40 open PRs, 7 open issues**. The repository remains private.
- The row-level release register remains **2 Done / 15 In Progress / 8 Blocked**. External blockers #4, #5, #16, #18, #21, #22, and #25 remain unchanged.

### PR #85 exact-head workflow result before this documentation update

Pre-write PR #85 HEAD: `0727a5616f32ed6176a1a0dd15f592f014b116bf`.

- Validation [43581889793](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43581889793): backend, frontend, and iOS jobs all completed with failure and `steps=null`, `logs_url=null`.
- CodeQL [43581889816](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43581889816): analyze job completed with failure and no steps/log URL.
- Dependency Review [43581889851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43581889851): job completed with failure and no steps/log URL.
- Job-log retrieval returned `BlobNotFound`. No tests, native builds, CodeQL analysis, or Dependency Review execution is evidenced for this exact head. This is not an application test failure and is not a pass.
- The single P2 backlog-tally review thread remains resolved; the only review submission is COMMENTED, not APPROVED. PR #85 remains open/unmerged.

### npm audit / minimatch compatibility disposition

- The current main lockfile resolves `@expo/fingerprint@0.20.16` with a declared `minimatch ^10.2.6` dependency; a separate `glob@14.0.4` path already uses patched `minimatch@11.0.5`.
- GitHub advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies minimatch versions `>=7.0.0 <11.0.1` as affected and 11.0.1 as patched.
- Expo upstream issue [#52735](https://github.com/expo/expo/issues/52735) records the maintainer's assessment that this is local CLI/build tooling, not a vulnerability in shipped apps, and that fingerprint's minimatch 10 range is retained because of breaking changes. Expo PR [#52753](https://github.com/expo/expo/pull/52753) (fingerprint → minimatch 11) and [#52790](https://github.com/expo/expo/pull/52790) (picomatch replacement) both closed without merge; SDK-57 PR [#52819](https://github.com/expo/expo/pull/52819) updated glob where applicable but explicitly excluded fingerprint.
- Project PR #98's global minimatch 11 override was therefore closed without merge. It would override the declared Expo fingerprint range without the upstream compatibility change. A focused `Minimatch` class test was added on its branch at commit `6428924ebdc339683d8ae9a19671435a9c179273`, but no exact-head tests ran; this does not establish full Expo fingerprint compatibility.
- Keep the moderate audit finding visible and **In Progress**; do not claim a clean npm audit or force the global override. Revisit when Expo publishes a supported SDK-57 fingerprint fix or an explicitly tested compatibility migration.

### Current active mainline candidates

- PR #90 design foundation: HEAD `205d7f4a646300d710ad91a28673ad60784c34f5`; exact-head Validation `43566731474`, CodeQL `43566731464`, Dependency Review `43566731482` all failed before steps.
- PR #95 SSRF/NAT64: HEAD `adac0e6dd6525b197ba7433f290e2afb017d7903`; Validation `43578843298`, CodeQL `43578843319`, Dependency Review `43578843263` all failed before steps. The five NAT64 regressions and DNS-timeout regressions have not executed on this head; issue #64 remains open.
- PR #96 Copilot guidance: HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`; Validation `43561261094`, CodeQL `43561261044`, Dependency Review `43561261047` all failed before steps.
- PR #97 Redis readiness: HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`; Validation `43561295099`, CodeQL `43561295147`, Dependency Review `43561295126` all failed before steps.
- PR #98 is closed without merge; its final head was `6428924ebdc339683d8ae9a19671435a9c179273`; Validation `43585751528`, CodeQL `43585751472`, and Dependency Review `43585751665` failed before steps. No migration test or Expo build executed.

No item is promoted to Done by this addendum. Exact-head CI, human review, current main protection, device, production, monitoring, rollout, and pilot gates remain separate acceptance requirements.

---

## Latest exact-head release audit — 2026-11-14 10:38 CET

### Merged application baseline — PR #41

- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged from `fix/release-blockers-2026-10`. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current `main` HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The source branch ref still equals the reviewed HEAD.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully on this exact SHA. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review is claimed.
- PR #41 has 517 commits and 100 changed files. Review inventory: 108 combined timeline records, 22/22 inline threads resolved, 26 review submissions (25 COMMENTED, 1 human APPROVED). No further source-branch write is required.

### Documentation gate — PR #85

- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, based on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Before this checkpoint, exact HEAD was `277555f5f07752a3313e3a30d071f424d195c141` (19 commits, 3 release-record files; +884 / -8).
- Exact-head Validation [43577412306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412306), CodeQL [43577412333](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412333), and Dependency Review [43577412275](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43577412275) all completed with failure.
- Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs all have empty step lists. Explicit step reads returned empty arrays; sampled job-log downloads returned HTTP 404 `BlobNotFound`. No tests, native builds, CodeQL analysis, or Dependency Review execution is evidenced on this SHA. The exact GitHub-side dispatch cause remains unverified; do not describe these as application test failures or passes.
- PR #85 review inventory: 6 combined timeline records, 1/1 inline thread resolved, 1 COMMENTED review submission, no human approval. The main-branch copies of all three release records remain stale at the 2026-11-13 18:49 CET checkpoint. PR #85 is not merged.

### SSRF security candidate — PR #95 / issue #64

- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is based directly on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, exact HEAD `adac0e6dd6525b197ba7433f290e2afb017d7903` (6 commits, 5 files; +827 / -27).
- The candidate includes DNS-pinned per-connection and per-redirect resolution, all-answer public-IP validation, numeric-IP dialing with Host/TLS SNI preservation, no proxy/keep-alive reuse, bounded DNS/connect deadlines, post-connect peer verification, and NAT64 well-known-prefix embedded-IPv4 checks. Five focused NAT64 regressions cover URL literal, synchronous DNS answer, async transport answer before TCP, connected peer, and acceptance of a NAT64 address embedding public 8.8.8.8.
- Exact-head Validation [43578843298](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843298) was retried as attempt 2 and failed again; CodeQL [43578843319](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843319) and Dependency Review [43578843263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43578843263) also failed. All three Validation jobs, CodeQL analyze, and Dependency Review have empty step records; sampled logs return HTTP 404 `BlobNotFound`. The NAT64 tests have **not executed** on this exact HEAD; no CI acceptance is claimed.
- PR #95 has no human review submissions or inline threads. Keep it draft/open pending executed exact-head checks and human security review. The previous PR #70/#79 green runs are separate branch evidence, not integrated acceptance.

### Dependency audit and minimatch remediation — PRs #81 and #98

- PR [#81](https://github.com/milanradics89-beep/POS-Doctor/pull/81), exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14`, passed its own Validation [43463421519](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463421519), CodeQL [43463421635](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463421635), and Dependency Review [43463421693](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463421693). It targets the older `fix/release-remediation-2026-11-13` base, not current main.
- The full-tree npm audit log on that exact PR #81 Validation reported **3 moderate, 0 high, 0 critical**. The advisory is `minimatch` denial of service via globparts amplification, affected range 7.0.0–11.0.0, transitively reached through `@expo/fingerprint` and `expo`. The audit step's high/critical gate passed; this does not mean the moderate advisory is fixed.
- Main-based draft PR [#98](https://github.com/milanradics89-beep/POS-Doctor/pull/98), exact HEAD `468ec2684bb969da8676b29b07a6680790f2bdfd` (1 commit, 3 files; +40 / -22), proposes `minimatch@11.0.5` in npm overrides/lockfile and migration regressions for globstar, brace expansion, extglob, and dotfile behavior.
- PR #98 exact-head Validation [43579189877](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189877), CodeQL [43579189858](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189858), and Dependency Review [43579189714](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43579189714) all failed before executing steps. All five jobs have empty step lists; sampled logs return HTTP 404 `BlobNotFound`. The migration tests and override have **not executed** on this exact HEAD. PR #98 has no review submissions or inline threads. Keep dependency item #3 In Progress until exact-head CI and review validate the remediation.

### Governance, inventory, and alert visibility

- Repository is private. Current main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; the live main branch object reports `protected: false`. Rulesets read returns HTTP 403 requiring a supported private-repository plan or public visibility; branch-protection read returns HTTP 403. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is open/reopened. Current ruleset enforcement is not verified.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records the separate Code Scanning and Dependency Graph / GitHub Advanced Security capability blockers. Do not remove, skip, or weaken CodeQL or Dependency Review.
- GitHub Releases API returned `[]`: **0 published releases**. Branch search returned 69 branch names and the continuation page was empty; repository search returned 41 open PRs and 7 open issues.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected GitHub operations; they remain **unavailable/unverified, not empty**.

### Authoritative 25-point register and release decision

**2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection, #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval. The other 15 remain In Progress.

Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items based on CI, simulator, emulator, or injected-backend evidence. Pilot/production acceptance remains **NOT GRANTED**. This checkpoint records the pre-update PR #85 HEAD; the new documentation commit must pass its own exact-head checks and must not inherit parent results.

---

## Latest exact-head release audit — 2026-11-14 09:43 CET

### Merged application baseline — PR #41

- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged from `fix/release-blockers-2026-10`. Reviewed exact HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed. Validation's frontend, backend, and iOS jobs passed; CodeQL analyze and Dependency Review jobs passed.
- Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. No separate post-merge Dependency Review run is claimed.
- PR #41 review inventory: 108 combined timeline records; 22/22 inline review threads resolved; 26 review submissions (25 COMMENTED, 1 human APPROVED). The source branch still points to the reviewed HEAD; comparison against main is 517 ahead / 1 behind after merge. No source-branch rewrite is needed.

### Documentation gate — PR #85

- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, based on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Before this checkpoint, exact HEAD was `113a7582dec331001c513f22d73208cc5b324637` (18 commits; 3 release-record files; +844 / -8).
- Its own exact-head Validation [43575600289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575600289), CodeQL [43575600238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575600238), and Dependency Review [43575600231](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575600231) all completed with failure.
- Five jobs (backend, frontend, iOS, CodeQL analyze, Dependency Review) report empty step lists. Job-log downloads returned HTTP 404 `BlobNotFound`. No application tests, native builds, CodeQL scan, or Dependency Review execution is evidenced on this exact HEAD. The specific GitHub-side cause remains unverified; do not describe this as an application assertion failure or a pass.
- PR #85 review inventory: 6 combined timeline records, 1/1 inline review thread resolved, 1 COMMENTED review submission, no human approval.

### Mainline SSRF candidate — PR #95

- Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/unmerged, based on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact HEAD: `6ff1d0cc7ec8bd60197ea3ce674bb54ceb8c183f` (5 commits, 5 files; +761 / -26).
- The branch includes DNS-pinned HTTPX/httpcore transport, per-connection and per-redirect DNS revalidation, all-address global-IP checks, direct numeric-IP dialing, Host/TLS SNI preservation, disabled environment proxies and keep-alive reuse, post-connect peer validation, and a shared monotonic connect deadline for DNS plus sequential address attempts.
- Product-fetch URL preflight is syntax-only (`resolve_dns=False`); authoritative hostname resolution is performed by the pinned transport under the connect deadline. The slow-resolver regression uses an `asyncio.Event` handshake and asserts timeout before any TCP attempt; a second test verifies the remaining timeout budget decreases across sequential address attempts.
- Exact-head Validation [43574284810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284810), CodeQL [43574284827](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284827), and Dependency Review [43574284747](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284747) all completed with failure. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs have empty step lists; sampled job logs returned HTTP 404 `BlobNotFound`. The new DNS-timeout tests have **not executed on this HEAD**; the correction is committed but not CI-validated.
- PR #95 has no human review submissions or inline review threads. Keep it draft/open. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs #70 and #79 passed their own earlier exact-head checks, but remain separate branches and do not constitute integrated acceptance.

### Governance, inventory, and release evidence

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open/reopened. Its latest recorded live verification (2026-11-14 07:51 CET) reports private repository visibility, `main.protected=false`, required-check enforcement off, and rulesets API HTTP 403 requiring GitHub Pro or public visibility. Current enforcement is not verified; owner action is required.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private-repository configuration. Do not remove, skip, or weaken either required security workflow.
- Branch search returned 69 branches and the continuation page was empty. Repository search returned 40 open PRs and 7 open issues. PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains draft/open on the old `fix/release-blockers-2026-10` base (71 commits, 23 files); it is not automatically retargeted.
- A current releases-list read and security-alert inventory are not exposed by the connected GitHub operations. The last recorded release inventory was 0 published releases, but that count is not independently refreshed here. Code Scanning, Dependabot, and Secret Scanning alerts remain **unavailable/unverified, not empty**.
- The main-branch copies of the three release records remain at the stale 2026-11-13 18:49 CET checkpoint and still contain the historical 3/15/7 tally. This PR branch is the reviewed documentation candidate; it is not merged.

### Authoritative 25-point register and release decision

**2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection, #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval. The other 15 remain In Progress.

Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items based on CI, simulator, emulator, or injected-backend evidence. Pilot/production acceptance remains **NOT GRANTED**. This checkpoint describes the preceding PR #85 HEAD; the new documentation commit's own exact-head checks must be evaluated separately and must not inherit parent results.

---

## PR #85 checkpoint-commit CI result — 2026-11-14 09:22 CET

The preceding 09:19 CET audit checkpoint was committed as [`5eeeb6e1c9a6d3e76980a57355f6e92e1d8156fd`](https://github.com/milanradics89-beep/POS-Doctor/commit/5eeeb6e1c9a6d3e76980a57355f6e92e1d8156fd). PR #85 now points to this exact HEAD (17 commits, 3 release-record files; base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1)).

All three workflows triggered by that commit are terminal failures on the exact HEAD:
- Validation [43575542915](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575542915): frontend, backend, and iOS jobs failed.
- CodeQL [43575542897](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575542897): analyze job failed.
- Dependency Review [43575542895](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43575542895): dependency-review job failed.

The five job records all report zero executed steps; explicit step reads returned empty arrays. Sampled log downloads returned HTTP 404 `BlobNotFound`. No documentation tests, application tests, CodeQL scan, or Dependency Review execution is evidenced on this exact HEAD. The specific GitHub-side cause remains unverified. Do not substitute parent-head results or treat these failures as source-code test failures.

The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**: Done #1 and #6; Blocked #2, #4, #5, #16, #18, #21, #22, and #25. Pilot/production acceptance remains **NOT GRANTED**. The next repository write must wait until the current exact-head workflows for this checkpoint commit are terminal; then refresh PR #41 HEAD and its current required workflows again before writing.

---

## Latest exact-head audit — 2026-11-14 09:19 CET

### Merged application baseline — PR #41

- PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged from `fix/release-blockers-2026-10`. Exact reviewed HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact PR-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully on this exact HEAD. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review run is claimed.
- Review inventory: 108 combined timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED). The source branch ref still points to the reviewed HEAD.

### Documentation PR #85 — current exact HEAD

- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open/unmerged on `docs/post-merge-release-evidence-20261113`, targeting main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact HEAD: `8f948caaa6a02a5ee757e9c13f63f1e59e09b4e2`; 16 commits, 3 release-record files changed (+790 / -8).
- Exact-head Validation [43567425274](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567425274), CodeQL [43567425195](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567425195), and Dependency Review [43567425146](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567425146) all completed with failure.
- The jobs endpoint reports backend, frontend, iOS, CodeQL analyze, and Dependency Review as failed with no step records; explicit step reads returned empty arrays. Sampled job-log downloads returned HTTP 404 `BlobNotFound`. No application test or security scan success is inferred from these runs. The exact GitHub-side cause for this HEAD is unverified.
- PR #85 review inventory: 6 timeline records, 1/1 inline review thread resolved, 1 COMMENTED review submission, no human approval. The P2 tally finding remains resolved.

### SSRF mainline candidate — PR #95

- Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) remains open/unmerged, based directly on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Current exact HEAD: `6ff1d0cc7ec8bd60197ea3ce674bb54ceb8c183f`; 5 commits, 5 files (+761 / -26).
- The branch contains the bounded DNS-connect-deadline correction and deterministic test hardening: resolver execution is bounded by the connect deadline, timeout maps to `httpcore.ConnectTimeout`, sequential pinned-address attempts share the remaining budget, and product URL preflight is syntax-only so authoritative DNS validation occurs in the pinned transport. The slow-resolver test uses an `asyncio.Event` handshake to prove the resolver started before asserting timeout and zero TCP attempts.
- Exact-head Validation [43574284810](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284810), CodeQL [43574284827](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284827), and Dependency Review [43574284747](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43574284747) all completed with failure. Backend, frontend, iOS, CodeQL analyze, and Dependency Review job records have no step records; sampled job-log downloads returned HTTP 404 `BlobNotFound`. The new DNS timeout tests have **not executed on this HEAD** and the correction is not CI-validated.
- PR #95 has no human review submissions or inline review threads. Keep it draft/open pending actually executed exact-head Validation, CodeQL, Dependency Review, and human security review. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs #70 and #79 passed their own earlier exact-head checks but remain separate branches; those results are not integrated acceptance.

### Governance, inventory, and release evidence

- Repository remains private. The latest issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) owner-side verification at 07:51 CET reports main `protected:false`, required-check enforcement off, and rulesets API HTTP 403 requiring a supported private-repository plan or public visibility. Current main protection is therefore not verified; issue #47 remains open.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) separately confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for the current private-repository configuration. Do not remove, skip, or weaken CodeQL or Dependency Review.
- Issue #64 remains open for SSRF remediation and exact-head acceptance. No production exploit is claimed.
- Branch search returned 69 branches (continuation exhausted); repository search returned 40 open PRs and 7 open issues.
- A fresh published-release inventory and security-alert inventories were not available through the connected GitHub operations in this audit. The last recorded release inventory was 0 published releases, but that count is not independently refreshed here. Code Scanning, Dependabot, and Secret Scanning alerts remain **unavailable/unverified, not empty**.
- The three release documents on this PR branch are ahead of main; main's copies remain stale at the 2026-11-13 18:49 CET checkpoint until an authorized, reviewed integration. This PR branch is not merged.

### Authoritative 25-point register and release decision

**2 Done / 15 In Progress / 8 Blocked.** Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection, #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval. The other 15 remain In Progress.

Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items based on CI, simulator, emulator, or injected-backend evidence. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest exact-head checkpoint — 2026-11-14 07:32 CET

### PR #41 merged application baseline

- PR #41 is closed and merged from `fix/release-blockers-2026-10`; exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Exact PR-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully on the exact reviewed HEAD. Main push Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) also succeeded on the merge commit.
- PR #41 review inventory: 108 combined timeline records, 22/22 inline threads resolved, 26 review submissions, including one human APPROVED review. The source branch ref still points to the exact reviewed HEAD.

### Documentation PR #85

- Current exact HEAD at this checkpoint: `700fdfee40d32e32f9c792cb7786d4323411a409`, 14 commits, 3 release-record files changed.
- Exact-head Validation [43566883628](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43566883628), CodeQL [43566883764](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43566883764), and Dependency Review [43566883634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43566883634) all ended in failure.
- All five jobs (frontend, backend, iOS, CodeQL analyze, Dependency Review) returned `steps=null`; the explicit step endpoint returned empty arrays and job-log downloads returned HTTP 404 `BlobNotFound`. No documentation tests, app tests, CodeQL scan, or dependency review executed on this SHA. This is a pre-runner/dispatch failure, not a content-test result and not a pass.
- The P2 status-tally review thread is resolved. The PR branch's row-level register is 2 Done / 15 In Progress / 8 Blocked. PR #85 remains open and unmerged. The `main` copies of the three release records are still stale at the 2026-11-13 18:49 CET checkpoint and still describe PR #41 as unmerged; do not treat the PR branch documents as already integrated.

### SSRF bounded-DNS timeout correction — PR #95

- PR #95 remains draft/open, based on main. Previous exact HEAD `5971e4275c8263d5728910369dfd80d1f2b8b88f` was updated by commit [`cf3867d78ec8f01de7ea6a11edaca09f84c96d50`](https://github.com/milanradics89-beep/POS-Doctor/commit/cf3867d78ec8f01de7ea6a11edaca09f84c96d50).
- The change bounds DNS resolver execution by the HTTP connect deadline, converts resolver timeout to `httpcore.ConnectTimeout`, carries the remaining deadline across sequential pinned-IP connection attempts, and applies the same deadline to each connection attempt.
- Two deterministic regression tests were added: slow DNS must time out before any TCP attempt; sequential address attempts must receive a decreasing remaining timeout budget.
- Exact new-head Validation [43567232105](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567232105), CodeQL [43567232047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567232047), and Dependency Review [43567232048](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567232048) all ended in failure before executing steps. The three Validation jobs, CodeQL analyze, and Dependency Review job had empty step arrays and log downloads returned HTTP 404 `BlobNotFound`. The new regression tests have **not executed** and the fix is **not CI-validated**.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. Keep PR #95 draft/open pending executed exact-head Validation, CodeQL, Dependency Review, and human security review. This is a boundedness/reliability correction, not evidence of an SSRF exploit.

### Governance and release status

- Repository remains private. Current main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; GitHub branch metadata reports `protected: false`. Rulesets and branch-protection reads return HTTP 403 under the current private-repository plan. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open; current enforcement is unverified.
- Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records that Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private repository configuration. Do not remove, skip, or weaken CodeQL or Dependency Review.
- GitHub Releases API returned an empty list (0 published releases). Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the current integration and remain **unverified, not empty**.
- The latest main-commit auxiliary CI auto-recovery run [43567241932](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43567241932) failed; its retry job had no steps/logs and the reporting job was skipped. This does not overturn the successful main Validation and CodeQL runs above.

### Authoritative 25-point register

**2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. Blocked: #2 main branch protection, #4 physical iPhone App Attest, #5 Play-installed Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval. The other 15 remain In Progress. Production/pilot acceptance remains **NOT GRANTED**. Physical-device, production-cloud, witnessed recovery, rollout, and business acceptance cannot be promoted based on CI, emulator, simulator, or injected-backend tests.

---

## Latest 25-point status checkpoint — 2026-11-14 exact-head refresh

### Mainline and governance

- Current `main` commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #41 is closed/merged; its reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1` passed exact-head Validation `43492153234`, CodeQL `43492153161`, and Dependency Review `43492153021`. Post-merge main Validation `43503743786` and CodeQL `43503743752` passed. PR #41 review inventory: 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).
- Issue #47 is open again after privatization. Latest recorded repository state is private, main `protected:false`, and rulesets read unavailable (HTTP 403 requiring a supported plan or public visibility). The #2 row is therefore **Blocked**; the 2026-11-02 ruleset evidence is historical, not current enforcement proof.
- Main's existing `docs/25-POINT-RELEASE-BACKLOG.md` still shows the old **3 Done / 15 In Progress / 7 Blocked** tally and #2 Done. This PR branch corrects it to **2 Done / 15 In Progress / 8 Blocked** with #2 Blocked. Main remains unchanged until an authorized, reviewed integration; do not treat this draft branch as already published.
- Issue #84 confirms Code Scanning is not enabled and Dependency Graph / Advanced Security is unavailable or not enabled for the current private-repository plan. Do not remove or bypass CodeQL/Dependency Review.

### Exact-head documentation and mainline candidate status

- PR #85 parent HEAD before this checkpoint: `ffffc6c9fa3a7d15ebea8c6187c11fb677fbcd15`. Its Validation `43562911841`, CodeQL `43562911830`, and Dependency Review `43562911818` all completed failure. Validation backend/frontend/iOS jobs had `steps=null`; no runner steps or tests executed. These failures are not source/test assertions.
- PR #90 main-based design foundation: exact HEAD `205d7f4a646300d710ad91a28673ad60784c34f5`, 7 ahead / 0 behind main. It contains the recursive screen-wide accessibility AST test from the #92/#93 work and the least-privilege CodeQL `actions: read` permission. Exact-head Validation `43566731474`, CodeQL `43566731464`, Dependency Review `43566731482` all failed before steps; all jobs have `steps=null`. The new tests and permission workflow were not executed.
- PR #95 main-based SSRF candidate: exact HEAD `5971e4275c8263d5728910369dfd80d1f2b8b88f`. Validation `43561091697`, CodeQL `43561091647`, Dependency Review `43561091637` failed before steps. Static review found DNS resolution is not bounded by the HTTPX/httpcore connect timeout; a slow resolver can exceed the intended deadline. Required follow-up is a remaining-budget timeout around DNS and address attempts plus deterministic slow-resolver/no-connect tests. Issue #64 remains open.
- PR #96 main-based Copilot guidance: exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`; Validation `43561261094`, CodeQL `43561261044`, Dependency Review `43561261047` failed before steps.
- PR #97 main-based Redis readiness tests: exact HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`; Validation `43561295099`, CodeQL `43561295147`, Dependency Review `43561295126` failed before steps.
- PR #90/#95/#96/#97 remain drafts and have no human approvals. No workflow result from a parent or older stacked branch is attributed to these exact heads.

### Verified remediation already on main

- PR #65 candidate HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0` passed Validation `43452488602`, CodeQL `43452493289`, Dependency Review `43452488754`. Main has Expo SDK 57.0.33 package versions, Node 22 validation, and the App Attest config/runtime split.
- Main `app.json` references `modules/useit-app-attest/app.plugin.js`; that CommonJS plugin imports only `@expo/config-plugins`. The runtime `modules/useit-app-attest/index.ts` imports `expo-modules-core`, and its package manifest main is `index.ts`. This keeps the Expo config loader away from the runtime TypeScript entrypoint. PR #65's exact-head Node 22 Expo Doctor/Android/iOS evidence remains the execution proof.
- PR #68 exact HEAD `a4324896a95aca621885ba89daa44f96bdcb636f` passed all three required workflows; backend validation recorded 177 passing tests, cryptography 50.0.2, and pip-audit no known vulnerabilities. Main requires `cryptography>=50,<51`.
- PR #76 Copilot guidance, #79 SSRF transport, #81 full npm audit, and #83 Redis readiness each passed all three checks on their own exact heads (`730eeb49...`, `109e77ba...`, `efe16ec1...`, `bd6b85f5...`). They remain older-base evidence, not validation of the newer mainline PRs. PR #81's full npm audit artifact records 3 moderate, 0 high, 0 critical, 0 low; do not force a major minimatch upgrade without migration tests.
- Main `docs/RELEASE_RUNBOOK.md` confirms shared Redis production rate limiting, 2-second connect / 5-second socket timeouts, and bounded temporary readiness-probe client closure. Production environment and real-device checks remain external.

### Current authoritative status

**2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Preserve all physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, and business-approval gates until their named evidence exists. Pilot/production acceptance remains **NOT GRANTED**.

This documentation commit is a child of parent HEAD `ffffc6c9fa3a7d15ebea8c6187c11fb677fbcd15`. It requires its own exact-head Validation, CodeQL, and Dependency Review; no parent run is reused.
---

## Latest 25-point status checkpoint — 2026-11-14 06:37 CET

### Exact merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) remains closed and merged at reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge/current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. PR #41 review: 108 combined timeline records, 22/22 inline threads resolved, 26 review submissions (25 COMMENTED, 1 human APPROVED).

### Current documentation gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting main. Current exact HEAD `19a2f6876a93fc4f322ba0322a37beb533b5e172`; 12 commits ahead / 0 behind; 3 changed files. The backlog was refreshed in commit `ec85777b2ee1086883cb7b3be0b1789a3947343d`; the runbook was refreshed in commit `19a2f6876a93fc4f322ba0322a37beb533b5e172`. The pilot-acceptance document still has its prior 05:42 CET checkpoint and is not yet refreshed to this HEAD.

Exact-head Validation [43562841123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562841123), CodeQL [43562841126](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562841126), and Dependency Review [43562841075](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43562841075) all completed with failure. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs all have null step records; explicit step lookup returned an empty list and job-log retrieval returned HTTP 404 `BlobNotFound`. No tests, native builds, scans, or dependency review executed on this exact HEAD. The GitHub-side dispatch/runner cause remains unverified. Do not reuse PR #41 or parent-commit CI.

### Mainline SSRF integration — PR #95

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is based directly on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, exact HEAD `5971e4275c8263d5728910369dfd80d1f2b8b88f`, 1 commit, 5 files (+608 / -21). It carries DNS-pinned HTTPX/httpcore transport, per-connection DNS validation, mixed public/private answer rejection, numeric-IP dialing with original Host/TLS SNI preservation, proxy/keep-alive disabling, redirect-by-redirect validation, post-connect peer verification, and deterministic transport/rebinding tests. Its exact-head Validation [43561091697](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091697), CodeQL [43561091647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091647), and Dependency Review [43561091637](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091637) failed. Validation jobs had no executed steps, so these tests have not run on the mainline candidate. CodeQL/Dependency Review remain blocked by repository capability issue #84. PR #95 is draft, with no human review submissions or inline threads. Keep #64 open until exact-head tests execute, human security review is completed, and integration is accepted.

Earlier PRs #70 and #79 passed their own exact-head three-check suites; those results do not substitute for #95. PR #94 peer/mixed-DNS tests were not executed on its failed exact-head Validation. Static review of #95 notes that the custom transport reconstructs an httpcore pool using HTTPX private pool attributes; the narrow HTTPX/httpcore version bounds are part of its compatibility contract.

### Other mainline candidates

- Draft PR [#90](https://github.com/milanradics89-beep/POS-Doctor/pull/90), exact HEAD `3a1650649d99efdcde4e8f631d8c2466782b2eae`, adds the accessible USEIT design foundation (5 commits, 9 files, +407 / -26). Validation [43534946927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534946927) passed; CodeQL [43534947109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947109) and Dependency Review [43534947012](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947012) failed.
- Draft PR [#96](https://github.com/milanradics89-beep/POS-Doctor/pull/96), exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`, adds 45 lines of Copilot guidance. Its exact-head Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), and Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) failed.
- Draft PR [#97](https://github.com/milanradics89-beep/POS-Doctor/pull/97), exact HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`, adds 116 lines of Redis readiness TTL regression tests. Its exact-head Validation [43561295099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295099), CodeQL [43561295147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295147), and Dependency Review [43561295126](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295126) failed.
- Draft PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains based on the old release branch (71 commits, 23 files). PR #90 is the separate main-based design-foundation candidate; do not merge or retarget #48 automatically.

### Governance, inventories, and authoritative register

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository is private; latest recorded main branch metadata reports `protected: false`, and rulesets reads return HTTP 403 requiring a supported plan or public visibility. Current main enforcement is unverified. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private-repository configuration. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable/unverified, not empty.

Current search inventory: 66 branches, 40 open PRs, 7 open issues. Last recorded releases inventory returned 0 published releases; the current connected GitHub action set does not expose a releases-list read, so the count is not independently refreshed here.

**Authoritative 25-row tally: 2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The remaining 15 stay In Progress. Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items without their stated evidence. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest 25-point status checkpoint — 2026-11-14 06:37 CET

### Merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current `main` HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review run is claimed. PR #41 review inventory: 108 combined timeline records, 22/22 inline threads resolved, 26 review submissions (25 COMMENTED, 1 human APPROVED).

### Current documentation gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Exact HEAD `e35adf9d1a2108e73e6e3653ed6c830912edee5d`; 10 commits ahead / 0 behind; 3 changed files (+614 / -8). Its exact-head Validation [43558302250](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43558302250), CodeQL [43558302183](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43558302183), and Dependency Review [43558302180](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43558302180) all completed with failure. Backend, frontend, iOS, CodeQL analyze, and Dependency Review jobs have no executed step records; explicit step lookup returned an empty list and job-log retrieval returned HTTP 404 `BlobNotFound`. No tests, native builds, scan upload, or dependency review executed on this exact HEAD. This is not a test pass or an application assertion failure. The exact GitHub dispatch/runner cause remains unverified. The P2 register-tally review finding remains resolved; the current 25-row table reconciles to 2 / 15 / 8.

The runbook and pilot-acceptance documents on this PR branch still carry the 05:42 CET checkpoint. This commit refreshes the authoritative backlog first; those two documents are intentionally left for a later sequential commit after this new exact-head CI gate is terminal.

### Mainline SSRF integration — PR #95

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. Draft PR [#95](https://github.com/milanradics89-beep/POS-Doctor/pull/95) is based directly on main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, exact HEAD `5971e4275c8263d5728910369dfd80d1f2b8b88f`, 1 commit, 5 files (+608 / -21). It carries DNS-pinned HTTPX/httpcore transport, fresh per-connection resolution, rejection of mixed public/private DNS answers, numeric-IP dialing while preserving original Host/TLS SNI, disabled environment proxies/keep-alive reuse, redirect-by-redirect URL validation, and post-connect peer verification, with deterministic transport/redirect/rebinding tests.

Its exact-head Validation [43561091697](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091697), CodeQL [43561091647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091647), and Dependency Review [43561091637](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561091637) all completed with failure. The three Validation jobs have no step records; job logs are unavailable. The added tests therefore have not been executed on this mainline integration HEAD. CodeQL and Dependency Review are also blocked by the repository capability issues tracked in #84. PR #95 has no human review submissions or inline review threads and remains draft/unmerged. Static review note: the custom transport rebuilds an httpcore pool using HTTPX private pool attributes; the narrow HTTPX/httpcore version constraints are therefore part of its compatibility contract and require exact-head CI plus human security review.

Earlier PRs #70 (DNS pinning) and #79 (redirect transport fix) passed their own exact-head three-check suites, but those results do not substitute for PR #95. PR #94's peer/mixed-DNS tests were not executed on its own failed exact-head Validation. Keep #64 open until the mainline integration receives executed CI, human review, and integration acceptance.

### Other mainline candidates

- Draft PR [#90](https://github.com/milanradics89-beep/POS-Doctor/pull/90), exact HEAD `3a1650649d99efdcde4e8f631d8c2466782b2eae`, adds the accessible USEIT design foundation (5 commits, 9 files, +407 / -26). Its exact-head Validation [43534946927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534946927) passed; CodeQL [43534947109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947109) and Dependency Review [43534947012](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43534947012) failed under the repository security-capability blocker.
- Draft PR [#96](https://github.com/milanradics89-beep/POS-Doctor/pull/96), exact HEAD `598735d45bcd34570b6fb1887cd380432c58bbf2`, adds 45 lines of Copilot repository guidance. Its exact-head Validation [43561261094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261094), CodeQL [43561261044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261044), and Dependency Review [43561261047](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561261047) failed.
- Draft PR [#97](https://github.com/milanradics89-beep/POS-Doctor/pull/97), exact HEAD `a2c02acfe4fa9861b765e80f88316c7060a97f59`, adds 116 lines of Redis readiness TTL regression tests. Its exact-head Validation [43561295099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295099), CodeQL [43561295147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295147), and Dependency Review [43561295126](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43561295126) failed. No passing result is inferred from parent commits.
- Draft PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains on the old `fix/release-blockers-2026-10` base (71 commits, 23 files). PR #90 is the separate main-based design-foundation candidate; do not merge or retarget #48 automatically.

### Governance, inventories, and release decision

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository is private; the latest recorded main branch metadata reports `protected: false`, and rulesets reads return HTTP 403 requiring a supported plan or public visibility. Current main enforcement is therefore unverified. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for this private-repository configuration. Code Scanning, Dependabot, and Secret Scanning alert inventories remain unavailable/unverified, not empty.

Current search inventory: 66 branches, 40 open PRs, and 7 open issues. The last recorded releases inventory returned 0 published releases; a releases-list read is not exposed by the current connected GitHub action set, so that count is not independently refreshed in this checkpoint.

**Authoritative 25-row tally: 2 Done / 15 In Progress / 8 Blocked.** Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The remaining 15 rows stay In Progress. Preserve all physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, and business-approval gates until their stated evidence exists. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest 25-point status checkpoint - 2026-11-14 05:42 CET

### Exact merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. PR #41 review: 52 conversation comments, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### Current documentation gate - PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open at exact HEAD `f05c85f85e5f38ee6c36f74e784dd3cbbfd38b78`, 9 commits ahead / 0 behind `main`, with 3 changed files (+533 / -8). Its exact-head Validation [43556921830](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921830), CodeQL [43556921835](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921835), and Dependency Review [43556921848](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43556921848) all failed before runner assignment. The three Validation jobs, CodeQL analyze, and Dependency Review each completed within 2-3 seconds with `runner_id: 0`, empty runner name, zero steps, and no downloadable logs. This is not an application test failure or pass; no validation, scan, or dependency review executed on this SHA. The exact GitHub-side dispatch/runner cause is unverified. Do not reuse parent or PR #41 results.

### Governance, security, and SSRF

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: repository is private, `main` reports `protected: false`, and the rulesets API returns HTTP 403 requiring a supported plan or public visibility. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) records Code Scanning disabled and Dependency Graph / GitHub Advanced Security unavailable or not enabled. Alert inventories for Code Scanning, Dependabot, and Secret Scanning remain unavailable/unverified, not empty.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs #70 and #79 have successful exact-head CI on their own branches. PR #94's mixed-DNS/peer tests were not executed because its Validation failed before runner assignment. Keep #64 open pending executed exact-head tests, human review, and integration.

The current releases API response is empty: no published GitHub release is recorded.

### Authoritative 25-row status tally

The row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2, #4, #5, #16, #18, #21, #22, and #25. The remaining 15 rows are In Progress. Preserve the existing 25 row-level entries below; do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot, or business-approval items from CI or simulator evidence. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest 25-point status checkpoint — 2026-11-14 05:25 CET

### Current merged application baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed and merged. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge/current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Validation frontend, backend, and iOS jobs passed; CodeQL analyze and Dependency Review jobs passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. PR #41 review: 108 timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### Current documentation gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open at exact HEAD `c1c85ad27bd43176f981516bbffd2676bbda452b`, 8 commits ahead / 0 behind `main`, changing the three release documents. Its exact-head Validation [43550836422](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836422), CodeQL [43550836413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836413), and Dependency Review [43550836406](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43550836406) all completed with failure before runner assignment. All five jobs had `runner_id: 0`, empty runner name, zero steps, and no downloadable logs; they did not execute tests/scans. The precise GitHub-side runner/dispatch cause is unverified. Do not attribute these failures to application code or report successful validation. PR #85 has 1/1 inline review thread resolved and one COMMENTED review submission anchored to older HEAD `74e0eea`; no human approval on current HEAD is recorded.

### Governance and security

The repository remains private. Current `main` metadata reports `protected: false`; rulesets and branch-protection endpoints return HTTP 403 requiring GitHub Pro or public visibility. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open; current enforcement is unverified. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) confirms Code Scanning is not enabled and Dependency Graph / GitHub Advanced Security is unavailable or not enabled for the current private-repository configuration. Do not remove or bypass CodeQL/Dependency Review.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PR #70 exact HEAD `935cb0a6b88810696849f93c61a336541ce50914` and PR #79 exact HEAD `109e77ba8ccd78d42d4c4dc9cc0d557c98c0d902` each passed their own Validation, CodeQL, and Dependency Review runs, but remain separate and unmerged. PR #94 exact HEAD `902d96b06fc033d3642192d429c69b940641d13d` adds peer/mixed-DNS tests; all three workflows failed before runner assignment and its tests were not executed. Keep #64 open until the tests execute on an exact head, receive review, and the full remediation is integrated.

### Repository inventory and release decision

The GitHub releases endpoint returned `[]`: **0 published releases**. Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected integration and remain **unavailable/unverified, not empty**. Current search returned 39 open PRs and 7 open issues. PR #48 remains open on `feature/useit-design-system`, based on the merged release branch; its comparison against `main` is 324 ahead / 3 behind. Reconcile before integration.

**Current tally: 2 Done / 15 In Progress / 8 Blocked.** The 25 row-level statuses below remain authoritative and reconcile to this total. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection and external acceptance items #4, #5, #16, #18, #21, #22, and #25. The remaining 15 are In Progress. Pilot/production acceptance remains **NOT GRANTED**. Do not promote external items based on CI, simulator, or emulator evidence alone.

---

## Latest 25-point status checkpoint — 2026-11-14 02:15 CET

PR #41 is merged: reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge/current main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. PR #41 review: 108 timeline records, 22/22 inline threads resolved, 26 submissions (25 COMMENTED, 1 human APPROVED).

### Current documentation branch gate — PR #85

PR #85 remains open at exact HEAD `e3d99b1f58b2133318d168ec4c20e58b515cf2c2`, 3 commits ahead / 0 behind main. Its exact-head Validation [43533470828](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533470828) was **cancelled**: backend and iOS passed, but frontend was cancelled during the Android native Release Gradle build; Android build completion, emulator smoke, and runtime dependency audit are not established. CodeQL [43533470808](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533470808) **failed** at workflow-run metadata access (`Resource not accessible by integration`), ending with `configuration error`. Dependency Review [43533471028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43533471028) **failed** because GitHub reports the feature unsupported on this repository and requires Dependency Graph plus GitHub Advanced Security. These are not passing checks and no parent CI is substituted. The single P2 tally thread is resolved; the one COMMENTED review submission is anchored to an earlier commit, with no approval on current HEAD.

### Current governance and SSRF evidence

The repository is private; current `main` reports `protected: false`. The rulesets API returns HTTP 403 requiring GitHub Pro or public visibility. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open; November 2 ruleset #26370589 evidence is historical, not current enforcement proof. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) passed their own exact-head three-check suites but remain separate, unmerged branches; their CI is not integrated SSRF acceptance.

Related design PRs remain separate from the release baseline: #88 Validation passed but CodeQL/Dependency Review failed; #90 Validation passed but CodeQL/Dependency Review failed and is stacked on #88; #91 Validation is still in progress while CodeQL/Dependency Review failed and is stacked on #90.

Releases API: **0 published releases**. Inventory: **63 branches, 37 open PRs, 7 open issues**. Code Scanning, Dependabot, and Secret Scanning inventories are **unavailable/unverified, not empty**. The 25-point register is **2 Done / 15 In Progress / 8 Blocked**; blocked items are #2, #4, #5, #16, #18, #21, #22, and #25. Pilot/production acceptance remains **NOT GRANTED**.

**Current tally: 2 Done / 15 In Progress / 8 Blocked.** The 25 row-level statuses below remain authoritative and reconcile to this total. Done: #1 iOS CI closure and #6 Redis multi-instance concurrency. Blocked: #2 main branch protection and external acceptance items #4, #5, #16, #18, #21, #22, and #25. Do not promote external items based on CI, simulator, or emulator evidence alone.

The PR #85 documentation branch is newer than `main`; the three release records on `main` remain at the older 2026-11-13 18:49 CET checkpoint until PR #85 is accepted and merged. Pilot/production acceptance remains **NOT GRANTED**.

---

## Latest 25-point status checkpoint — 2026-11-14 01:16 CET

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) is closed/merged. Reviewed exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Exact PR-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all passed. Review: 22/22 inline threads resolved; 26 submissions (25 COMMENTED, 1 APPROVED). Main push Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) also passed on the merge commit.

### Current tally: **2 Done / 15 In Progress / 8 Blocked**

The 25 row-level statuses below are authoritative and reconcile to this tally: #1 and #6 Done; #2, #4, #5, #16, #18, #21, #22, and #25 Blocked; the remaining 15 items In Progress. Item #2 remains Blocked because the private repository's current `main` branch object reports `protected: false` and the rulesets API returns HTTP 403 requiring GitHub Pro or public visibility. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is open. The prior 2026-11-02 ruleset evidence is historical and is not current enforcement proof.

### Documentation CI: previous PR #85 exact HEAD

Before this checkpoint commit, PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) was at exact HEAD `ab302518de26a798fc417b22a32bda10376fcf11`. Its three workflows all completed with failure:
- Validation [43520112435](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112435): backend and iOS passed; frontend failed while provisioning the Google APIs Intel x86_64 Atom System Image because the runner reported `No space left on device`. Emulator smoke and later runtime dependency audit did not complete.
- CodeQL [43520112498](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112498): scan processed 75/75 Python and 5/5 GitHub Actions files and exported SARIF, but the action failed because Code Scanning is not enabled and workflow-run metadata access returned `Resource not accessible by integration`.
- Dependency Review [43520112508](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43520112508): failed because Dependency Review is not supported on this private repository without the required Dependency Graph/GitHub Advanced Security capability.

PR [#87](https://github.com/milanradics89-beep/POS-Doctor/pull/87), exact HEAD `18eec1bda29d419d8e71958df895c14fac4de464`, is an unmerged permission candidate: Validation cancelled, CodeQL failed with Code Scanning not enabled, and Dependency Review failed with the same repository capability error. Do not mark CodeQL or Dependency Review as passed. This documentation update creates a new PR #85 exact-head gate; its checks must be evaluated on the resulting SHA, not inherited from PR #41, main, or the previous PR #85 head.

The PR #85 P2 register-tally finding is resolved: the current 25 row-level entries total 2 Done / 15 In Progress / 8 Blocked, and row #2 is Blocked. The older 2026-11-13 18:49 CET checkpoint's 3/15/7 tally is a historical pre-reopen snapshot, not the current register.

### Security, SSRF, and repository inventory

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PR #70 exact HEAD `935cb0a6b88810696849f93c61a336541ce50914` and PR #79 exact HEAD `109e77ba8ccd78d42d4c4dc9cc0d557c98c0d902` each passed all three required workflows on their own branches; both remain open/unmerged and are not integrated acceptance on `main`. PR #81's separate npm-audit candidate passed its own three workflows and reported 3 moderate, 0 high, and 0 critical findings; this result is not attributed to the merged main tree.

Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; its branch API reports `protected: false`, and the rulesets endpoint returns 403. The repository has 61 branches, 36 open PRs, 8 open issues, and 0 published GitHub releases. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because their endpoints are unavailable through the connected interface.

Physical-device, production-cloud, witnessed backup/restore, monitoring, staged rollout, and real-user/business approval remain external blockers. Pilot/production acceptance is **NOT GRANTED**.

## Latest 25-point status checkpoint — 2026-11-13 22:07 CET

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) was merged at 2026-11-13 20:40:35 UTC (21:40:35 CET). Reviewed exact PR HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; resulting `main` commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.

Exact PR-head checks:
- Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234): **success**; frontend [132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed.
- CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161): **success**.
- Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021): **success**.
Frontend log: 59 test files passed, Expo Doctor passed, Android Release build succeeded, and Android emulator smoke passed. iOS simulator smoke and backend job passed. Human review: 22/22 inline threads resolved; 26 submissions (25 COMMENTED, 1 APPROVED). PR #41 is closed/merged.

Post-merge exact-main push Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) both passed. The PR-head Dependency Review is the recorded dependency gate; no separate push Dependency Review is claimed.

### Current tally: **2 Done / 15 In Progress / 8 Blocked**

The row-level 25-point register below is authoritative. Item **#2 Main branch protection** has moved from Done to Blocked: the repository is private, the current main branch API reports `protected: false`, and the rulesets API returns HTTP 403 with a requirement to upgrade to GitHub Pro or make the repository public. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) was reopened. The 2026-11-02 ruleset verification is historical and must not be represented as current enforcement. Owner action and fresh verification are required.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs #70 and #79 remain open/unmerged despite all three required workflows passing on their own exact heads; integration and review remain outstanding.

PR #41 Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 Scorecard findings. Separate full npm audit PR [#81](https://github.com/milanradics89-beep/POS-Doctor/pull/81), exact HEAD `efe16ec11b3dcb3fb373431c0619093efa66db14`, passed its own Validation/CodeQL/Dependency Review and reported 3 moderate, 0 high, and 0 critical findings. That separate candidate is not merged into main. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**.

Repository inventory: **57 branches, 32 open PRs, 0 published GitHub releases**. Pilot/production acceptance remains **NOT GRANTED**.

The seven pre-existing external blockers remain **#4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 product-recognition benchmark/business acceptance, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval**. Item #2 adds the current plan/branch-protection blocker.


---

## Historical 25-point status checkpoint — 2026-11-13 18:49 CET (superseded)

Immediately before this integration commit, PR #41 exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92`. Validation [43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114) failed at Expo Doctor after 285/285 frontend unit tests passed; backend and iOS jobs passed. CodeQL [43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128) and Dependency Review [43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149) passed on that exact pre-integration HEAD.

Draft PR #65 candidate HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0` passed exact-head Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754). Its tested package/lockfile, Node 22 validation, App Attest workflow-contract, and deepmerge regression changes are integrated by this commit. This commit is a new PR #41 child and has its own exact-head CI gate; no parent or candidate green result is attributed to it. PR #65 remains draft/open and has not been merged.

PR #41 review inventory before integration: **22/22 inline threads resolved; 25 review submissions, 0 APPROVED**. Issue #47 is closed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) retains six strict checks, one human approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection, and no bypass. Issue #64 remains open; PR #70 and PR #79 passed all three required checks on their own exact heads, but human review/integration is still required.

Repository inventory: **57 branches, 33 open PRs, 0 published releases**. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero**.

**Historical tally at this checkpoint: 3 Done / 15 In Progress / 7 Blocked.** This snapshot predates the PR #41 merge and the later main-protection re-verification; it is not the current tally. The current authoritative row-level register and latest checkpoints report **2 Done / 15 In Progress / 8 Blocked**. Do not promote a row based on another branch's CI or on simulator/emulator evidence where physical-device, production, or business acceptance is specified.

External blockers remain **#4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring and alert delivery, #22 staged rollout/rollback approval, and #25 real-user pilot/business approval**.

---

## Latest 25-point status checkpoint — 2026-11-11 21:40 CET

PR #41 remains **open, unmerged, and non-draft** on fix/release-blockers-2026-10, targeting main. The fully validated parent immediately before this documentation repair is 4883c652d61b93236b7a604f124bf5708caa07e6. Exact-parent Validation [43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324), CodeQL [43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), and Dependency Review [43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397) all completed successfully. Validation jobs: backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957), frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800), and iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399), all success; CodeQL analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156) and Dependency Review [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843) also succeeded. This file is committed as a documentation-only child of that validated parent; the child has separate exact-head checks and must not inherit the parent's green result.

At the pre-write refresh: **512 ahead / 0 behind** main (7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0); this documentation-only child adds one linear commit. PR diff before this commit: 98 files. Review: **20 inline threads total, 18 resolved and 2 P2 documentation findings addressed by this update; 24 review submissions, 0 APPROVED** at pre-write capture. The two addressed threads are resolved after push; a fresh Codex review is requested for the child. Human approval and last-push approval remain mandatory. Issue #47 is closed; active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks, one approval, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection. Issues #62 and #63 are closed. Inventory: **32 branches, 19 open PRs, 4 open non-PR issues** (#46, #25, #24, #23). GitHub Releases API returns **0 published releases**. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero**.

The validated source/test baseline records 450 backend tests, 27 production-readiness checks, 78 security/privacy checks, 285 frontend tests across 58 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release simulator/smoke. Runtime npm audit reports four moderate transitive glob/minimatch findings, no high-or-higher finding at the configured high threshold. Dependency Review has no high-or-higher vulnerable package in the reviewed diff and no denied package; unknown license metadata remains for vendor/deepmerge@4.3.2, with below-threshold Scorecard findings for @expo/devcert (2.9) and is-mergeable-object (1.5). The full alert inventories remain unverified, not zero.

| # | Workstream | Status | Current evidence / remaining acceptance |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | Merged PR #41 exact-head iOS job [132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) passed; iOS simulator smoke passed. Physical iPhone App Attest remains separate blocked item #4. |
| 2 | Main branch protection | **Blocked** | Main is currently `protected:true` under active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589), with six strict checks, one approval, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass. Issue #47 is closed after direct verification. Keep this item Blocked only until the owner confirms the final public/private plan and the same enforcement is reverified after any visibility change. |
| 3 | Dependency Review warnings | **In Progress** | PR #107 exact HEAD `431d96a31beb523be31c109d81c7009d49357318` passed Validation [43746773703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703), CodeQL [43746773650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773650), and Dependency Review [43746773667](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773667). Full dependency-tree audit and artifact upload succeeded on this exact head. Artifact [14175052989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43746773703/artifacts/14175052989) reports **3 moderate / 0 high / 0 critical** (`@expo/fingerprint`, `expo`, `minimatch`). Fail-closed parser and run-after-runtime-failure workflow regression passed. The three moderate findings remain visible; Expo 52.0.49 is a breaking major downgrade and is rejected. No dependency change, override, threshold reduction or audit suppression. Complete security-alert inventories remain unavailable/unverified, not empty. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires Apple production App ID/capability and provisioning entitlement, a signed production build, and provider-backed enrollment/assertion verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing certificate identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Merged PR #41 backend Validation job [132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214) passed; post-merge main backend job [132155899849](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786/job/132155899849) also passed. Production Redis endpoint/TLS configuration still requires environment verification. |
| 7 | Attestation retry/network/expiry | **In Progress** | Automated expiry, missing/non-integer challenge, transport timeout/connect failure, and same-evidence retry coverage exists and passed in the backend/frontend suites. Physical provider-backed device/network verification remains open. |
| 8 | Backend production security audit | **In Progress** | PR #99 exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f` passed Validation [43684598555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598555), CodeQL [43684598557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598557), and Dependency Review [43684598448](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43684598448). Backend 509 tests, readiness 27, production-security 78; frontend 289 tests/59 files, Expo Doctor 21/21, Android Release/emulator and iOS Release/simulator smoke passed; pip-audit reported no known Python dependency vulnerabilities. Same-host DNS-rebinding regression rejects private second DNS answer `10.0.0.9` before a second TCP connection. Issue #64 remains open with 32 comments; independent human security review remains outstanding. Production secrets, ingress/CORS, provider identity, live Redis TLS/sysctl and host hardening still require environment evidence. |
| 9 | Privacy and logging audit | **In Progress** | Current pre-integration PR #41 backend job [132027276413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114/job/132027276413) passed. Production log sink, ingress/access logs, retention, and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #85 validated parent HEAD `2cd7198a111dc0937150d344bc7817418de0e227` passed Validation [43757893067](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893067), CodeQL [43757893059](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893059), and Dependency Review [43757893072](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43757893072). Backend, frontend/Android and iOS jobs passed; Android emulator and iOS simulator smoke passed. Runtime npm audit still reports 3 moderate minimatch findings. Review: 25 conversation comments, two automated COMMENTED submissions, one resolved thread and one unresolved P2 finding about a literal checklist-count expression; this documentation child corrects it, but the thread stays open until this child's checks and reviewer re-evaluation. No human APPROVED review; `tarlaci1984-sketch` remains requested. Signing/store distribution, staged rollout, rollback and external acceptance remain outstanding. |
| 11 | Mobile regression | **In Progress** | Merged PR #41 frontend log records 59 test files passed, Expo Doctor passed, Android Release build succeeded, and Android emulator smoke passed; iOS simulator smoke also passed. Physical-device regression and provider-backed device acceptance remain. |
| 12 | Camera/image processing | **In Progress** | Image-contract, permission-decision, and mobile regression tests exist. Representative physical capture, camera/gallery device flows, and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport failure tests exist. Real network interruption and reconnect recovery still need device/staging validation. |
| 14 | API timeout/retry | **In Progress** | Monotonic end-to-end request deadline, bounded session bootstrap, and explicit-auth POST retry regressions exist. Real network interruption and backend-enforced POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Guarded load-test harness exists. Execute only against owner-approved staging with agreed concurrency, duration, latency/error thresholds, and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis backup access and a witnessed restore/recovery drill with measured recovery-point and recovery-time evidence. |
| 17 | AI cost optimization | **In Progress** | Shared client, bounded retries, and validated token/model telemetry exist. Pricing inputs, per-session budgets, provider-cost reconciliation, and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation, and explicit business acceptance. No benchmark is claimed. |
| 19 | AI fallback | **In Progress** | Conservative scene/no-candidate fallback code and tests exist. Provider-outage behavior and fallback quality still need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | PR #90 current HEAD `05be357c1e46ecd134c4aaf5feaed05b2bad9878`: Validation [43760238641](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238641) is IN_PROGRESS; CodeQL [43760238628](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238628) and Dependency Review [43760238664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43760238664) succeeded. Backend passed; Android emulator smoke and iOS Release build/simulator steps were still running at the latest job read. PR #99 exact HEAD `0c66d9c3f0d6d3ba28db8020cd67eed04952c28f` passed its own three workflows and includes DNS-rebinding regression coverage. Physical-device validation, complete state-matrix coverage and representative real-photo coverage remain. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds, and a witnessed alert-delivery test. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds, and a named rollback owner with a tested rollback procedure. |
| 23 | Analytics | **In Progress** | Token/model usage telemetry exists; product funnel, retention, dashboard validation, and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #41 is merged with exact-head Validation, CodeQL and Dependency Review passed. PR #85 validated parent HEAD `2cd7198a111dc0937150d344bc7817418de0e227` passed all three required workflows (43757893067, 43757893059, 43757893072). PRs #96, #99, #106, #107 and #108 also passed their own exact-head three-workflow sets. PR #90 current HEAD `05be357c1e46ecd134c4aaf5feaed05b2bad9878` still has Validation 43760238641 in progress; CodeQL and Dependency Review passed. Main ruleset 26370589 is active. Human approvals, owner visibility decision, signing/store distribution, staged rollout, rollback ownership and external acceptance remain open. No published release is evidenced. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, documented success/stop thresholds, named business owner, participant safeguards, and explicit business/release approval. |

**Current count: 2 Done / 15 In Progress / 8 Blocked.** The 25 row-level statuses reconcile to this total. PR #41 exact-head CI passed; PR #85 exact HEAD `d68883`, PR #90 exact HEAD `49e1cf`, and PR #99 exact HEAD `0c66d9` each passed their own Validation, CodeQL, and Dependency Review workflows. These results establish automated CI only; human approval and external production/pilot acceptance remain separate gates.

---

## Superseded 25-point status checkpoint — 2026-11-11 11:00 CET

- Exact PR #41 HEAD at capture: [`9688f9378da0b26aaa53ce9ae8e663b92944b98d`](https://github.com/milanradics89-beep/POS-Doctor/commit/9688f9378da0b26aaa53ce9ae8e663b92944b98d); branch `fix/release-blockers-2026-10`, target `main`; PR remains open and unmerged. This documentation-only HEAD is a child of the previously validated `35fc1f3`.
- Exact-head Validation [42996529183](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42996529183) passed: backend **450 tests / 27 readiness / 78 security-privacy**, frontend/Android on **ubuntu-24.04** with **283 tests across 58 files**, Expo Doctor **21/21**, Android Release (**15m 20s**) and emulator smoke, and iOS Release simulator/smoke. CodeQL [42996529070](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42996529070) and Dependency Review [42996529232](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42996529232) also passed for the same exact SHA.
- The evidence-correction commit containing this checkpoint is a child of `9688f93`; its own exact-head Validation, CodeQL, and Dependency Review are a separate gate. Do not reuse the parent run IDs for the child.
- The Android runner regression in issue [#62](https://github.com/milanradics89-beep/POS-Doctor/issues/62) is fixed by [`f976b30`](https://github.com/milanradics89-beep/POS-Doctor/commit/f976b309e98fac4526cfe15308d5c9caa16403e6); #62 is closed. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks, one approval, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass.
- Branch comparison at capture: **503 ahead / 0 behind** main at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`; PR diff **98 files, 13,065 additions / 910 deletions**. Repository inventory: **32 branches, 19 open PRs, 4 open issues** (#46, #25, #24, #23). Last recorded Releases inventory: **0 published releases**; current release listing is not independently exposed in this run.
- Review at capture: **14 inline threads total, 12 resolved and 2 open P2 documentation findings**; **19 review submissions, 0 APPROVED**. Both findings are corrected in this evidence refresh and their threads are resolved after push. Human approval and last-push approval remain mandatory.
- Dependency Review passed with no high-or-higher vulnerable packages in the reviewed diff, but one unknown-license entry and two low Scorecard findings remain. The separate runtime npm audit still reports **four moderate** transitive `glob`/`minimatch` instances. Code Scanning, Dependabot, and Secret Scanning inventories are **unverified, not zero**.
- **Current tally: 3 Done / 15 In Progress / 7 Blocked.** The row-level table below remains authoritative; do not promote an item without its stated evidence.

### External blockers

- **#4:** physical iPhone App Attest with production entitlement.
- **#5:** Play-installed physical Android Play Integrity.
- **#16:** witnessed production backup/restore.
- **#18:** representative product-recognition benchmark and business acceptance.
- **#21:** production monitoring and alert delivery.
- **#22:** staged rollout and rollback approval.
- **#25:** real-user pilot and business approval.

Simulator/emulator CI is not physical-device or production acceptance. PR #41 remains unmerged pending the child checkpoint's own CI, human approval, and the external acceptance gates.
---

## Superseded 25-point status register — captured 2026-11-11 07:14 CET

- PR #41 is **open, unmerged, and non-draft** on `fix/release-blockers-2026-10`, targeting `main`.
- Current exact PR HEAD: [`09f421fe2bf9bae48c4cb0452a7138bf4a9a9642`](https://github.com/milanradics89-beep/POS-Doctor/commit/09f421fe2bf9bae48c4cb0452a7138bf4a9a9642), a documentation-only refresh. The validated application/source-test baseline remains [`537b53162d4ed6a6b9d77d81def76773b6012100`](https://github.com/milanradics89-beep/POS-Doctor/commit/537b53162d4ed6a6b9d77d81def76773b6012100).
- Current branch comparison: **497 commits ahead / 0 behind** `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. PR diff: **97 files, 12,995 additions, 909 deletions**. GitHub reports `mergeable: true`; required human review and release acceptance remain separate gates.
- Exact-head Validation [#42962428618](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428618) — **success**: backend [job 130331846913](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428618/job/130331846913), frontend/Android [job 130331846588](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428618/job/130331846588), iOS [job 130331846829](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428618/job/130331846829).
- Exact-head CodeQL [#42962428631](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428631), analyze [job 130331846703](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428631/job/130331846703): **success**.
- Exact-head Dependency Review [#42962428642](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428642), job [130331846579](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42962428642/job/130331846579): **success**. PR summary: 0 vulnerable packages in the reviewed diff, 1 unknown-license package, 2 OpenSSF Scorecard findings. Runtime npm audit still reports four moderate transitive `glob`/`minimatch` advisory instances.
- All three workflows passed for exact PR HEAD `09f421f`. The validated source/test baseline `537b531` separately passed Validation [#42950018548](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018548), CodeQL [#42950018544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018544), and Dependency Review [#42950018559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018559).
- Review: **12/12 inline threads resolved** (11 outdated), **18 COMMENTED submissions**, **0 APPROVED**. One human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Its resolution documents active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589), six strict required checks, one approval, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass actors. Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for historical CodeQL action-version mismatch analysis.
- Repository inventory: **32 branches, 19 open PRs, 4 open issues (#46, #25, #24, #23)**. The connected integration has no Releases-list action; the last recorded inventory was 0 published releases, but the current release list is not independently reverified.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because their alert endpoints are not exposed by the connected integration.
- Expo lock-refresh artifact from run [#42939371782](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939371782) was downloaded and verified on older workflow HEAD `6cb8cd3`: artifact ID `13819632595`, 76,729 bytes, ZIP SHA256 `6ef2bb2eb1eaec4f0c22bd406b3b5003abe5a0b3b5753cbeed3fc5c2c0622dfc`; both internal checksums passed. Its candidate lockfile still contains nested `glob@13.0.7` and `minimatch@10.2.6`.
- The Redis readiness-probe review finding is resolved: `PEXPIRE` is preflighted on both unique keys before the mutating Lua script; regression tests prove that a denied preflight prevents Lua execution.
 
### Status accounting

- **Done: 3**
- **In Progress: 15**
- **Blocked: 7**
- **Total: 25**

The seven blocked external gates are:
- **#4** physical iPhone App Attest with production entitlement.
- **#5** Play-installed physical Android Play Integrity.
- **#16** witnessed production backup/restore.
- **#18** representative product-recognition benchmark and business acceptance.
- **#21** production monitoring and alert delivery.
- **#22** staged rollout and rollback approval.
- **#25** real-user pilot and business approval.

Do not promote any of these to Done without the named evidence. Simulator/emulator CI is not physical-device or production acceptance. PR #41 remains unmerged pending human approval and external acceptance.

---

PR #41 remained open and unmerged on `fix/release-blockers-2026-10`, targeting `main`, at capture. The last fully validated application/source-test HEAD was [`537b531`](https://github.com/milanradics89-beep/POS-Doctor/commit/537b53162d4ed6a6b9d77d81def76773b6012100). It is a child of [`81dd353`](https://github.com/milanradics89-beep/POS-Doctor/commit/81dd35318fea4bc998a2b7c53f6ea436e64ecbf5). This checkpoint is exact-head evidence for `537b531`; any later documentation-only commit must receive its own exact-head Validation, CodeQL, and Dependency Review before it is called validated.

### Exact-head automated evidence for `537b531`

- Validation [#42950018548](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018548): **success**.
  - Backend job [130291861473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018548/job/130291861473): **450 tests**, **27 production-readiness checks**, and **78 security/privacy checks** passed. `pip-audit` reported no known Python vulnerabilities. Non-blocking warnings: Starlette/httpx TestClient deprecation and Redis CI service `vm.overcommit_memory` advisory; production host sysctl is not verified by this container run.
  - Frontend/Android job [130291861392](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018548/job/130291861392): **280 tests across 57 files**, Expo Doctor **21/21** checks, Android export, Release build **BUILD SUCCESSFUL in 17m 17s**, and emulator install/launch smoke passed for `com.useit.app`. The runtime npm audit still reports **four moderate** transitive `glob`/`minimatch` advisory instances; the thresholded high-severity gate passing is not a clean dependency audit.
  - iOS job [130291861212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018548/job/130291861212): Release simulator build and install/launch smoke passed for `com.useit.app`. This is simulator evidence, not physical iPhone App Attest acceptance.
- CodeQL [#42950018544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018544), analyze job [130291861306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018544/job/130291861306): **success**. Python (71/71) and GitHub Actions (4/4) analysis completed. SARIF merge emitted a non-fatal column-kind mismatch warning.
- Dependency Review [#42950018559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018559), job [130291861078](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42950018559/job/130291861078): **success**; no high-or-higher vulnerable package and no denied package. OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).

### Review, governance, and repository state

- PR #41 inline review threads: **12/12 resolved**; review submissions: **18**, approved reviews: **0**. One human approving review and last-push approval remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is **closed as completed** (2026-11-02).
- Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approving review, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass actors. The direct branch-protection endpoint is not accessible to the connected integration; the repository ruleset endpoint is readable and active.
- Main HEAD at capture: `7ef22a6`. The release branch is **495 commits ahead and 0 behind** main; PR diff: **97 files, 12,854 additions / 909 deletions**.
- Repository inventory: **32 branch names returned**, **19 open PRs**, **4 open issues**, and **0 published releases**.
- Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for historical CodeQL action-version mismatch investigation. PRs #43/#44 must not be merged independently; draft #49 still needs base reconciliation and full validation.
- Code Scanning, Dependabot, and Secret Scanning alert endpoints are not exposed by the connected integration: inventories are **unverified, not zero**.

### Expo lock-refresh artifact evidence

The artifact-only lock-refresh run [#42939371782](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939371782) completed successfully on workflow-run HEAD [`6cb8cd3`](https://github.com/milanradics89-beep/POS-Doctor/commit/6cb8cd33be9c6b6e6f17596268271b09c671365d), not on `537b531`. Artifact [13819632595](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939371782) (`expo-sdk57-lock-refresh-6cb8cd33be9c6b6e6f17596268271b09c671365d`, 76,729 bytes) was downloaded. ZIP SHA256: `6ef2bb2eb1eaec4f0c22bd406b3b5003abe5a0b3b5753cbeed3fc5c2c0622dfc`. The archive contains `package.json`, `package-lock.json`, and `SHA256SUMS`; both internal SHA256 checks passed. This proves artifact publication and integrity for that historical run. It does **not** remediate the dependency findings: the candidate lockfile still contains nested `glob@13.0.7` and `minimatch@10.2.6` entries. Item #24 remains In Progress.

### External release gates

The following remain blocked until the named external evidence exists: **#4** physical iPhone App Attest with production entitlement; **#5** Play-installed physical Android Play Integrity; **#16** witnessed production backup/restore; **#18** representative product-recognition benchmark and business acceptance; **#21** production monitoring and alert delivery; **#22** staged rollout and rollback approval; **#25** real-user pilot and business approval. Simulator/emulator CI does not satisfy these gates.

**Automated CI acceptance for `537b531`: PASSED. Pilot acceptance: NOT GRANTED. PR #41 remains open and must not be merged automatically.**

---

## Superseded checkpoint (captured 2026-11-11 02:58 CET; exact validated PR #41 HEAD `6cb8cd3`)

PR #41 remains open and unmerged on `fix/release-blockers-2026-10`, targeting `main`. The branch ref was refreshed against the PR metadata and is identical to exact HEAD [`6cb8cd3`](https://github.com/milanradics89-beep/POS-Doctor/commit/6cb8cd33be9c6b6e6f17596268271b09c671365d). It is **493 commits ahead and 0 behind** main at `7ef22a6`; the PR contains 97 changed files (12,814 additions / 909 deletions). The 25-point tally remains **3 Done / 15 In Progress / 7 Blocked**.

### Exact-head automated evidence for `6cb8cd3`

- Validation [#42939379902](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939379902): **success**.
  - Backend job [130257284386](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939379902/job/130257284386): **450 backend tests**, **27 production-readiness checks**, and **78 security/privacy checks** passed. `pip-audit`: no known Python vulnerabilities. One Starlette/httpx TestClient deprecation warning remains.
  - Frontend/Android job [130257284198](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939379902/job/130257284198): completed successfully; Android Release build **BUILD SUCCESSFUL in 22m 58s**, emulator install/launch smoke passed for `com.useit.app`. The runtime npm audit reports **four moderate** `glob`/`minimatch` advisory instances; no high-or-higher finding was reported by that thresholded audit.
  - iOS job [130257284449](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939379902/job/130257284449): Release simulator build and install/launch smoke passed for `com.useit.app`. This is simulator evidence, not physical-device App Attest acceptance.
- CodeQL [#42939380035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939380035), analyze job [130257284034](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939380035/job/130257284034): **success**. Python and GitHub Actions analysis completed; SARIF merge emitted a non-fatal column-kind mismatch warning.
- Dependency Review [#42939380029](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939380029), job [130257283885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42939380029/job/130257283885): **success**; no high-or-higher vulnerable package and no denied package. OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The separate runtime npm audit still has four moderate transitive advisory instances; a passing Dependency Review is not a zero-finding audit.

### Release pipeline change and remaining verification

Commits [`bc802a0`](https://github.com/milanradics89-beep/POS-Doctor/commit/bc802a0b3ff19ff4a770f7958cd43125fa04b75b) and [`6cb8cd3`](https://github.com/milanradics89-beep/POS-Doctor/commit/6cb8cd33be9c6b6e6f17596268271b09c671365d) add a regression assertion and fix the Expo SDK 57 lock-refresh artifact path from the hidden `.expo-sdk57-lock-refresh/` directory to the visible `expo-sdk57-lock-refresh/` directory. The workflow remains read-only (`contents: read`), uses non-persisted checkout credentials, and produces a checksum-bearing candidate artifact rather than pushing a branch commit. The PR Validation, CodeQL, and Dependency Review runs above passed for `6cb8cd3`. The separate push-triggered lock-refresh workflow's artifact receipt is not exposed by the connected run-listing action, so successful artifact publication is **not independently verified**; item #24 remains In Progress.

### Review, governance, and repository state

- PR #41 inline review threads: **12/12 resolved**; review submissions: **18**, approved reviews: **0**. One human approving review and last-push approval remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is **closed as completed**. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks, one approving review, last-push approval, resolved threads, deletion/non-fast-forward protection, and no bypass actors.
- Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL action-version mismatch and the pending atomic CodeQL update validation.
- Repository search returned 19 open PRs and 4 open issues. The branch inventory returned 33 branches across the paginated result. A release-list endpoint and the full Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected integration; release/security inventory is **unverified, not zero**.
- Do not merge automatically or bypass required checks. The 97-file / 493-commit PR history still requires human review.

### Current 25-point tally

**3 Done / 15 In Progress / 7 Blocked.** The row-level register below remains the authoritative per-item table; its statuses are unchanged. Blocked external gates remain #4 physical iPhone App Attest with production entitlement, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring and alert delivery, #22 staged rollout and rollback approval, and #25 real-user pilot and business approval. Simulator/emulator CI does not satisfy these gates.

---

## Previous 25-point status register (checkpoint captured 2026-11-11 01:18 CET; validated parent HEAD `3ef4c5f`)

The authoritative 25-row register totals **3 Done / 15 In Progress / 7 Blocked**. The exact validated parent PR #41 HEAD at capture is [`3ef4c5f`](https://github.com/milanradics89-beep/POS-Doctor/commit/3ef4c5ff75a1b14d286d46517accf7eec3933e24). The row-level evidence below remains anchored to the previously recorded source/test ancestry; no external acceptance gate is promoted based on simulator/emulator CI.

### Exact-head automated evidence for parent checkpoint `3ef4c5f`

- Validation [#42925661354](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661354):
  - Backend [job 130211363233](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661354/job/130211363233): **450 backend tests**, **27 production-readiness checks**, and **78 security/privacy checks** passed; `pip-audit` reported no known Python vulnerabilities.
  - Frontend/Android [job 130211362781](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661354/job/130211362781): **277 tests across 57 files** passed; Android Release build succeeded in **18m 47s** and emulator install/launch smoke passed for `com.useit.app`.
  - iOS [job 130211363287](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661354/job/130211363287): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [#42925661388](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661388), analyze [job 130211362473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661388/job/130211362473): passed; scanned **181 TypeScript**, **71 Python**, **4 GitHub Actions**, and **2 JavaScript** files. SARIF merge emitted a non-fatal column-kind mismatch warning.
- Dependency Review [#42925661324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661324), job [130211361986](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42925661324/job/130211361986): passed with no high-or-higher vulnerable packages and no denied packages. The separate frontend runtime audit still reports **four moderate** `glob`/`minimatch` advisory instances (GHSA-3g3m-2fjr-6pw4 and GHSA-g3hv-75wg-m249); this is not a zero-finding audit. Scorecard warnings include `@expo/devcert` **2.9** and `is-mergeable-object` **1.5**.

### Review, governance, and repository state

- PR #41 was open and unmerged at capture; its diff contains **97 files**.
- Inline review threads: **12/12 resolved**; review submissions: **18**; approved reviews: **0**. One human approving review and last-push approval remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed (2026-11-02).
- Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects `main`: six strict required checks, one approving review, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors.
- Main HEAD at capture: `7ef22a6`. The release branch was **490 commits ahead and 0 behind** main; this large history and 97-file diff still require human review.
- Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL action-version mismatch. PRs #43/#44 must not be merged independently; draft #49 still needs base reconciliation and full validation.
- GitHub Releases inventory returned **0 published releases**.
- Code Scanning, Dependabot, and Secret Scanning alert endpoints were denied by the connected GitHub integration. Their inventories are **unverified, not zero**.

### External release gates

The following remain blocked until the named external evidence exists: **#4** physical iPhone App Attest with production entitlement; **#5** Play-installed physical Android Play Integrity; **#16** witnessed production backup/restore; **#18** representative product-recognition benchmark and business acceptance; **#21** production monitoring and alert delivery; **#22** staged rollout and rollback approval; **#25** real-user pilot and business approval. Simulator/emulator CI does not satisfy these gates.

### Lock-refresh workflow hardening in this change

`.github/workflows/expo-sdk57-lock-refresh.yml` is changed to an artifact-only process: repository permissions are read-only, no GitHub CLI credential helper or branch commit/push is used, and the candidate contains `package.json`, `package-lock.json`, and `SHA256SUMS`. The artifact uses the immutable `actions/upload-artifact` v7.0.2 commit and a seven-day retention period. The artifact is only a candidate; applying it requires a normal reviewed commit followed by exact-head Validation, CodeQL, and Dependency Review. The parent runs above do **not** validate the child change in this snapshot.

The lock-refresh hardening in the child commit is part of release-pipeline workstream **#24 (In Progress)**. It removes automatic branch writes and publishes a checksum-verified candidate artifact only. Any later manifest commit must pass its own exact-head full Validation, CodeQL, and Dependency Review.

---

---

## Authoritative row-level 25-point status register (refreshed 2026-11-14 12:17 CET; merged PR #41 baseline)

The 25 rows below are the current authoritative register. PR #41 is closed/merged from `fix/release-blockers-2026-10`, exact reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge/current main commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Its own exact-head Validation, CodeQL, and Dependency Review all passed; 22/22 inline threads are resolved and 26 review submissions include one human APPROVED review. The current row-level distribution is **2 Done / 15 In Progress / 8 Blocked**. Item #2 is Blocked because live main metadata reports `protected:false` and required-status-check enforcement `off`; branch-protection and rulesets reads are unavailable (HTTP 403) under the current private-repository plan. The 2026-11-02 ruleset evidence is historical and is not current enforcement proof.

### Current exact-head evidence
- PR #41 exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed on the same SHA. Validation frontend/backend/iOS jobs passed. Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed; no separate post-merge Dependency Review is claimed.
- PR #85 current exact HEAD `71116d40a7e1a36bea015fc7c8da8d6043e911c9`: Validation [43586364962](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364962), CodeQL [43586364980](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364980), and Dependency Review [43586364929](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586364929) all failed before steps; five jobs have empty step lists and sampled logs return `BlobNotFound`. No tests or scans executed.
- PR #95 current exact HEAD `aec819f2c4ff321611ff7a4899e7d0666b0cd845` adds multicast/reserved/unspecified destination rejection and regression tests alongside DNS pinning, bounded DNS/connect timeout, and NAT64 embedded-address checks. Validation [43586519237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519237), CodeQL [43586519299](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519299), and Dependency Review [43586519266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43586519266) failed before steps; tests have not executed. Issue #64 remains open.
- PR #98 closed without merge because its minimatch 11 override violates Expo fingerprint's declared minimatch 10 range. PR #81's separate legacy-base full npm audit reports 3 moderate, 0 high, 0 critical; keep the build-tooling finding visible and In Progress.

The five job failures on PR #85/#95 are not evidence of application test failures or passes. Do not reuse parent CI. Physical-device, production, backup/restore, monitoring, rollout, pilot, and business acceptance remain separate gates.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | Exact validated-parent iOS job [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) passed Release simulator build and install/launch smoke. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection | **Blocked** | Live main branch metadata reports `protected:false` and required-status-check enforcement `off`; branch-protection and rulesets reads return HTTP 403 under the current private-repository plan. Issue #47 remains open. The 2026-11-02 ruleset verification is historical, not current enforcement proof. Owner must restore supported private-repository ruleset access and verify required checks, approvals, last-push approval, resolved threads, no bypass, and deletion/non-fast-forward protection. |
| 3 | Dependency Review warnings | **In Progress** | PR #81 full-tree npm audit [43463421519](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463421519) passed on its separate legacy release-remediation base and reports 3 moderate, 0 high, 0 critical findings. Advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) affects minimatch >=7.0.0 <11.0.1. PR #98 was closed without merge because its global 11.0.5 override violates @expo/fingerprint@0.20.16's declared ^10.2.6 range; Expo maintainers retain minimatch 10 due compatibility differences. Keep the moderate build-tooling finding visible; no clean-audit claim or forced override. Alert inventories remain unavailable/unverified, not empty. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Requires Apple Developer production App ID/capability and provisioning entitlement, a signed production build, and provider-backed App Attest enrollment/assertion verification on a supported physical iPhone. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Requires Play internal-track distribution, Play App Signing certificate identity, Google Cloud service-account/API permissions, and verification on a physical Android device installed from Play. |
| 6 | Redis multi-instance concurrency | **Done** | Exact validated-parent backend job [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957) passed. The unchanged source/test baseline records 450 backend tests with Redis; shared-Redis/multi-client and separate-worker challenge-consumption regression coverage remains in the suite. This does not establish production Redis host settings. |
| 7 | Attestation retry/network/expiry | **In Progress** | Expiry/missing/non-integer challenge cases are covered by [7e8097b](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1); provider transport `ConnectError`/`ReadTimeout` cases are added in [054111d](https://github.com/milanradics89-beep/POS-Doctor/commit/054111d3e2ce51f256ad8eaa4ac21c3e1a3fe8bd). Exact-head backend suite passed; physical provider-backed device verification remains open. |
| 8 | Backend production security audit | **In Progress** | PR #95 current main-based HEAD `f283a493714af28ca6bbaec7876bcffe8e680c87` adds actual TCP peer identity matching before TLS/request bytes: the transport reads socket peer metadata immediately after connect, compares normalized peer IP with the pinned numeric DNS address, closes mismatched streams, and raises `httpcore.ConnectError`. The new regression asserts no TLS and no HTTP writes on mismatch. Exact-head Validation [43591784615](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784615), CodeQL [43591784583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784583), and Dependency Review [43591784599](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43591784599) failed before steps; all five jobs have zero steps/no log URLs. Tests are not executed; issue #64 remains open. Production secrets, ingress/CORS, provider identity, live Redis TLS/sysctl, and host hardening still require environment verification. |
| 9 | Privacy and logging audit | **In Progress** | Exact validated-parent backend job [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957) passed; the unchanged source/test baseline records 78 security/privacy checks. Valid PNG image-data URI and private-intent redaction tests remain in the suite. Production log sink, ingress/access logs, retention, and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #41 is merged at exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1` and its own Validation, CodeQL, and Dependency Review passed. PR #85 current documentation HEAD `7c0fe83cfa513217c55e04d38cf9e77e5005a634` has exact-head Validation [43592013325](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592013325), CodeQL [43592013302](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592013302), and Dependency Review [43592013363](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43592013363) all failed before steps; five jobs have zero steps and no log URLs. Documentation is not accepted/integrated; no human approval is recorded. Pilot/production acceptance remains NOT GRANTED. |
| 11 | Mobile regression | **In Progress** | Exact validated-parent frontend/Android job [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800) and iOS job [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) passed Release build and emulator/simulator smoke. The unchanged source/test baseline recorded 285 tests across 58 files. Physical-device regression remains. |
| 12 | Camera/image processing | **In Progress** | Image-contract, permission-decision, and mobile regression tests exist. Representative physical capture, camera/gallery device flows, and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry and provider transport failure tests exist. Real network interruption and reconnect recovery still need device/staging validation. |
| 14 | API timeout/retry | **In Progress** | [ff16a0f](https://github.com/milanradics89-beep/POS-Doctor/commit/ff16a0fd879f2503dafcd762536b978ead3fdc21) enforces one monotonic end-to-end request deadline across upload and handler. Session-bootstrap and POST retry tests exist. Real network interruption and end-to-end POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | The guarded load-test harness requires explicit HTTPS target, origin, approval, and redirect protections. Execute only against owner-approved staging with agreed concurrency, duration, latency/error thresholds, and recorded results. |
| 16 | Backup/restore | **Blocked** | Requires production datastore/Redis backup access and a witnessed restore/recovery drill with measured recovery-point and recovery-time evidence. |
| 17 | AI cost optimization | **In Progress** | Shared OpenAI client and disabled hidden SDK retries avoid duplicate billed analysis attempts; `vision_usage` token/model telemetry exists. Pricing inputs, per-session budgets, provider-cost reconciliation, and production cost alerts remain. |
| 18 | Product-recognition accuracy | **Blocked** | Requires a representative labeled dataset, agreed accuracy metrics, human evaluation, and explicit acceptance. No benchmark is claimed. |
| 19 | AI fallback | **In Progress** | Conservative scene and no-candidate shopping fallback code/tests exist. Provider-outage behavior and fallback quality still need staging evidence. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Permanently denied camera/gallery permissions offer `Linking.openSettings()`; Error Boundary logging avoids raw Error objects. Full loading/empty/error/permission matrix and physical-device validation remain. |
| 21 | Monitoring/alerting | **Blocked** | Requires production monitoring workspace, alert destination, named on-call owner, configured thresholds, and a witnessed alert-delivery test. |
| 22 | Staged rollout | **Blocked** | Requires production approval, TestFlight/Play track access, documented rollout/stop thresholds, and a named rollback owner with a tested rollback procedure. |
| 23 | Analytics | **In Progress** | `vision_usage` token/model telemetry exists; product funnel, retention, dashboard validation, and production data-governance approval remain. |
| 24 | Release pipeline | **In Progress** | PR #41 exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) passed; post-merge main Validation and CodeQL passed. Main currently reports `protected:false` with required-status enforcement off; branch-protection/rulesets reads return HTTP 403. Issue #47 remains open. Signing/store distribution, supported branch protection, staged rollout, and rollback ownership remain open. |
| 25 | Pilot/business validation | **Blocked** | Requires a real pilot cohort, documented success/stop thresholds, named business owner, participant safeguards, and explicit business/release approval. |

**Current count: 2 Done / 15 In Progress / 8 Blocked.** Do not promote an item based only on code presence or simulator/emulator evidence.

---

## Superseded exact-head checkpoint (captured 2026-11-10 12:05 CET; validated source/test HEAD 8a66385)

PR #41 remains open and unmerged on `fix/release-blockers-2026-10`, targeting `main`. Validated source/test baseline at this historical checkpoint: [`8a66385`](https://github.com/milanradics89-beep/POS-Doctor/commit/8a66385820a89de1c25997e6ce75a3ed028f656a). The subsequent documentation-only PR HEAD was [`d515140`](https://github.com/milanradics89-beep/POS-Doctor/commit/d515140ec3e3c00f39b21d4111200251371110be), whose parent is `8a66385`; neither SHA is the current PR HEAD. Source/test commit: `test(privacy): align nested image redaction expectations`.

### Exact-head CI

All required workflows passed for this exact SHA:
- Validation [42795051588](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051588): backend job [129757975460](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051588/job/129757975460) passed **420 tests, 27 readiness checks, 56 security/privacy checks**; `pip-audit` found no known vulnerabilities. Frontend/Android job [129757975088](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051588/job/129757975088) passed **275 tests across 57 files**, Expo Doctor **21/21**, Android Release build and emulator install/launch smoke. iOS job [129757975569](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051588/job/129757975569) passed Release simulator build and smoke.
- CodeQL [42795051606](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051606): passed; scanned 71/71 Python and 4/4 GitHub Actions files. Non-fatal SARIF column-kind mismatch warning.
- Dependency Review [42795051644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42795051644): passed with no high-or-higher vulnerable packages or denied packages. Four moderate transitive npm `glob`/`minimatch` findings, Scorecard warnings for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), and vendored `deepmerge@4.3.2` license metadata remain open.

### Failure and review disposition

Validation [42790283351](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42790283351) failed only because the nested privacy test expected `[REDACTED_IMAGE]` for a sensitive `imageUri` key, which is intentionally redacted as `[REDACTED]`. Commit `8a66385` adds a separate image-payload field to test image-data redaction. Issue [#60](https://github.com/milanradics89-beep/POS-Doctor/issues/60) is closed after all three exact-head workflows passed.

The `vision_usage` privacy test uses a valid base64 image data URI. POST retry tests supply explicit `X-API-Key`; `sessionAuthEligible()` respects effective `Request.headers` and `Request.method`; the error boundary logs only the error name; permanently denied camera/gallery permissions offer `Linking.openSettings()`, covered by permission-decision tests.

All **11/11 review threads are resolved**; **15 reviews, 0 APPROVED**. The latest Codex receipt before this checkpoint reviewed `33d6a4a`, not this SHA; a fresh exact-head review is still required. Human approval and last-push approval remain required.

### Governance and release decision

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active with six strict required checks, one approval, last-push approval, resolved threads, no bypass actors, and deletion/non-fast-forward protection. Issue #46 remains open for the historical mixed-version CodeQL failure; keep PRs #43/#44 separate and PR #49 as the atomic update candidate.

Repository inventory: **31 branches, 19 open PRs, 4 open issues** after closing #60. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning inventories remain **unverified, not zero** because the integration does not expose those alert-list endpoints.

Backlog: **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, #25 real pilot/business approval.

Automated simulator/emulator CI is not physical-device, production, backup/restore, monitoring, rollout, pilot, or business acceptance. Do not merge automatically or bypass required checks.

---

## Superseded checkpoint (captured 2026-11-10 09:34 CET; source/test HEAD 1caff15)

PR #41 is open and unmerged on `fix/release-blockers-2026-10`. At evidence capture, exact source/test HEAD was [`1caff15`](https://github.com/milanradics89-beep/POS-Doctor/commit/1caff15c75f5ec45b101547809e38f8134ad7d0d), parent [`0a5701a`](https://github.com/milanradics89-beep/POS-Doctor/commit/0a5701af45285613668ca75b03c8a112fab75d0b). Exact-head Validation [42774383235](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383235), CodeQL [42774383619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383619), and Dependency Review [42774383276](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383276) all passed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real pilot/business approval.

Exact source/test evidence:
- Backend [job 129689358026](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383235/job/129689358026): 419 tests, 27 production-readiness checks, 55 security/privacy checks; pip-audit reported no known vulnerabilities.
- Frontend/Android [job 129689357594](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383235/job/129689357594): TypeScript passed, 57 test files passed, Expo Doctor passed, Android Release build and emulator smoke passed; npm audit still reports four moderate transitive glob/minimatch findings.
- iOS [job 129689357911](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383235/job/129689357911): Release simulator build and install/launch smoke passed.
- CodeQL [job 129689361301](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383619/job/129689361301): passed; non-fatal SARIF column-kind mismatch warning.
- Dependency Review [job 129689357308](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42774383276/job/129689357308): passed with no high-or-higher vulnerable packages or denied packages; deepmerge license metadata and two low Scorecard warnings remain.

Governance: issue #47 is closed; active main ruleset #26370589 is enforced with six strict required checks, one approving review, last-push approval, and resolved review threads. Current review inventory is 11/11 threads resolved, 15 submissions, and 0 approvals. Issue #46 remains open for the historical mixed-version CodeQL action failure; keep PRs #43/#44 separate and PR #49 draft until the atomic update is validated against the integrated release baseline. GitHub Releases is empty. Full Code Scanning, Dependabot, and Secret Scanning alert inventories remain unverified, not zero.

This checkpoint is automated exact-head evidence only. It does not satisfy physical-device, production, store, backup/restore, monitoring, rollout, pilot, or business acceptance. The documentation-only commit created by this refresh will be a new PR HEAD and must receive its own exact-head workflows.

---

## Superseded checkpoint (captured 2026-11-10 05:07 CET; source/test HEAD b74ce21)

PR #41 is open and unmerged on `fix/release-blockers-2026-10`. At evidence capture, exact source/test HEAD was [`b74ce21`](https://github.com/milanradics89-beep/POS-Doctor/commit/b74ce21920040bbde383f9cd13d207889fb0ad5c), parent [`4ab13ea`](https://github.com/milanradics89-beep/POS-Doctor/commit/4ab13ea284715fb00b66176236e44939509570dd). Exact-head Validation [42742728729](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728729), CodeQL [42742728752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728752), and Dependency Review [42742728525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728525) all passed. The new documentation-only commit created by this update will be a separate HEAD and must receive its own exact-head checks.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, #25 real pilot/business approval.

Exact source/test evidence:
- Validation: backend [419 tests, 27 readiness checks, 55 security/privacy checks](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728729/job/129587487624); frontend/Android [249 tests across 56 files, Android Release and emulator smoke](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728729/job/129587486517); iOS [Release simulator build and launch](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728729/job/129587487171).
- CodeQL [42742728752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728752) passed.
- Dependency Review [42742728525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42742728525) passed; moderate npm advisories and Scorecard/license metadata warnings remain.

Governance: issue #47 is closed; ruleset #26370589 is active; all 11 inline review threads are resolved; 15 review submissions and 0 approvals remain recorded. The PR requires one human approval and last-push approval. GitHub Releases is empty. Full Code Scanning, Dependabot, and Secret Scanning alert inventories remain unverified, not zero.

---
## Superseded checkpoint (2026-11-09 23:23 CET; PR HEAD f8c89c0)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. Current exact HEAD is documentation-only commit [`f8c89c0`](https://github.com/milanradics89-beep/POS-Doctor/commit/f8c89c0437d067640fc033a20df7b2cf56dfe85a), parent [`6301889`](https://github.com/milanradics89-beep/POS-Doctor/commit/6301889b918794816844fba5ad649e52c9b07964).

All three required workflows completed successfully for exact HEAD `f8c89c0`:
- Validation [42704554736](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554736):
  - Backend [job 129457815113](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554736/job/129457815113): **415 backend tests**, **27 production-readiness checks**, and **55 security/privacy checks** passed; `pip-audit` reported no known vulnerabilities. Non-blocking warnings include the Starlette/httpx TestClient deprecation and Redis test-container `vm.overcommit_memory` advisory.
  - Frontend/Android [job 129457815264](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554736/job/129457815264): typecheck, unit tests, Expo Doctor, Android Release build, and emulator install/launch smoke passed. Runtime npm audit still reports **four moderate** transitive `glob`/`minimatch` advisory instances.
  - iOS [job 129457814622](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554736/job/129457814622): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [42704554143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554143), analyze [job 129457808110](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554143/job/129457808110): passed; SARIF combination emitted a non-fatal column-kind mismatch warning.
- Dependency Review [42704554157](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554157), job [129457807122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42704554157/job/129457807122): passed with no high-or-higher vulnerable packages or denied packages. Below-threshold Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); scanner license metadata for vendored `deepmerge@4.3.2` remains unresolved although its manifest and LICENSE declare MIT.

The latest validated application/test change is [`cc81d76`](https://github.com/milanradics89-beep/POS-Doctor/commit/cc81d763b85b92ea97808c085512fe2e45677b2c), validated as part of successful descendant exact-head runs for `5c958b1`, `6301889`, and `f8c89c0`. It changes only `scripts/load-test.mjs` and `scripts/load-test.test.mjs`; the probe consumes the complete response body before recording latency, with a delayed-body regression test. Its direct workflow runs ended at run level with failure conclusions and zero jobs; GitHub rejected reruns with HTTP 403, so the cause remains unverified. The successful descendant Validation confirms the repository code/test tree, but item #15 remains In Progress until an owner-approved staging capacity test is executed with agreed thresholds.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback approval, and #25 real pilot/business approval.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, one approving review, last-push approval, and resolved review threads. All **11/11 inline review threads are resolved**; **15 review submissions and 0 APPROVED** remain recorded, so human approval is outstanding. Issue #46 remains open. PRs #43/#44 must not be merged independently; draft PR #49 remains the atomic CodeQL update candidate.

The repository currently has **31 branches, 19 open PRs, and 4 open issues**. The GitHub Releases endpoint returned an empty list. Full Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration rejects those alert endpoints.

Operational release guardrails:
- Keep PR #41 unmerged until exact-head checks, one human approving review, and last-push approval are satisfied.
- Run load tests only against owner-approved staging with recorded concurrency, duration, latency/error thresholds, and approval.
- Require a witnessed backup/restore drill, tested monitoring/alert delivery, a named rollback owner, and documented staged-rollout thresholds before production promotion.
- Keep the four moderate SDK57 transitive npm advisories visible; do not force incompatible dependency overrides, downgrade Expo, or reduce audit thresholds.
---

## Historical checkpoint (superseded by exact PR HEAD 6301889; captured 2026-11-09 15:58 CET)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The exact current HEAD is [`d6a2a1e`](https://github.com/milanradics89-beep/POS-Doctor/commit/d6a2a1e6e776dc5b20e27154258ce4a1df36ed44), a source-and-test commit that reuses the application-lifespan Redis client for Apple App Attest key registration, lookup, and assertion-counter updates. It adds two regression tests proving that the session endpoint passes the application-scoped Redis client to the verifier and that the verifier reuses that client without closing it. The shared Redis Lua counter update remains atomic.

All required pull-request workflows completed successfully for exact HEAD `d6a2a1e`:

- Validation [42630462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462263):
  - Backend [job 129205138334](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462263/job/129205138334): **415 tests passed**, **27 production-readiness checks passed**, and **55 production-security/privacy checks passed**; `pip-audit` reported **No known vulnerabilities found**. Non-failing warnings: Starlette/httpx TestClient deprecation and the Redis test-container `vm.overcommit_memory` advisory.
  - Frontend/Android [job 129205138054](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462263/job/129205138054): **243 tests across 56 files**, Expo Doctor **21/21**, Android Release build **BUILD SUCCESSFUL in 22m 10s**, and Android emulator install/launch smoke passed for `com.useit.app`. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but still reports **four moderate** transitive `glob`/`minimatch` advisory instances.
  - iOS [job 129205137616](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462263/job/129205137616): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [42630462259](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462259), analyze [job 129205137417](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462259/job/129205137417), passed. SARIF combination emitted a non-fatal column-kind mismatch warning.
- Dependency Review [42630462218](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462218), job [129205136792](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42630462218/job/129205136792), passed with no high-or-higher vulnerable packages and no denied packages. Warnings remain for OpenSSF Scorecard `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), plus unknown license scanner metadata for vendored `deepmerge@4.3.2` although its checked-in manifest and LICENSE declare MIT.

The four moderate `glob`/`minimatch` findings remain tracked pending an SDK57-compatible upstream fix or explicit owner risk disposition. Do not force incompatible major overrides, downgrade Expo, or reduce audit thresholds.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for a historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56, #57, and #58 are closed.

The repository has **31 branches, 19 open pull requests, and 4 open issues**. The GitHub Releases inventory is empty. The connected integration does not expose the complete Code Scanning, Dependabot, and Secret Scanning alert inventories; these remain **unverified, not zero**.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates, dependency-risk disposition, and human approval.

## 25-point status register

The detailed row-by-row status register below remains authoritative: **3 Done / 15 In Progress / 7 Blocked**. Do not change a point to Done without its stated evidence. In particular, simulator/emulator CI does not satisfy physical-device acceptance, and CI success does not satisfy production, pilot, or business sign-off.

---

## Historical checkpoint (superseded by d6a2a1e; captured 2026-11-09 13:35 CET)

PR #41 remains open and unmerged on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Exact PR HEAD [`0cd260f`](https://github.com/milanradics89-beep/POS-Doctor/commit/0cd260f069c4c243f07c3acde199d0d3c088967b) is a documentation-only child of [`a623abcd`](https://github.com/milanradics89-beep/POS-Doctor/commit/a623abcd2f9b1962dd784335f39d67394e8600f6); this commit updates only the three release-evidence documents. Application source, tests, dependencies, and workflow configuration are unchanged by this commit. Application source, tests, dependencies, and workflow configuration are unchanged. The latest validated application runtime source baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), and the latest validated CI regression-test baseline remains [`603789c`](https://github.com/milanradics89-beep/POS-Doctor/commit/603789c479c3411edbb013e960608ebaa7788f2f).

All three required workflows completed successfully for exact HEAD `0cd260f`:

- Validation [42607828478](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828478):
  - Backend [job 129128200174](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828478/job/129128200174): **413 tests passed**, **26 production-readiness checks passed**, and **55 production-security/privacy checks passed**; `pip-audit` reported no known vulnerabilities. Non-failing warnings include the Starlette/httpx TestClient deprecation and the Redis test-container `vm.overcommit_memory` advisory.
  - Frontend/Android [job 129128200144](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828478/job/129128200144): **243 tests across 56 files**, Expo Doctor **21/21**, Android Release build **BUILD SUCCESSFUL in 22m 13s**, and Android emulator install/launch smoke passed for `com.useit.app`. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but still reports **four moderate** transitive `glob`/`minimatch` advisory instances.
  - iOS [job 129128199672](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828478/job/129128199672): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [42607828331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828331), analyze [job 129128201258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828331/job/129128201258), passed. SARIF combination emitted a non-fatal column-kind mismatch warning.
- Dependency Review [42607828373](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828373), job [129128199068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42607828373/job/129128199068), passed. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); the scanner's unknown-license metadata for vendored `deepmerge@4.3.2` remains documented, while its checked-in manifest and LICENSE declare MIT.
The four moderate `glob`/`minimatch` findings remain tracked pending an SDK57-compatible upstream fix or explicit owner risk disposition. The Expo SDK57 dependency range does not accept the currently fixed major versions; do not force an incompatible override.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for the historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56, #57, and #58 are closed.

The repository has **31 branches, 19 open pull requests, and 4 open issues**. The GitHub Releases inventory is empty. The connected integration does not expose the complete Code Scanning, Dependabot, and Secret Scanning alert inventories; these remain **unverified, not zero**.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates, dependency-risk disposition, and human approval.

The P2 Redis readiness-probe review finding is resolved. The probe preflights `PEXPIRE` on both unique keys before the mutating Lua script; `backend/test_phase23_readiness.py::test_production_readiness_preflights_redis_pexpire_before_rate_limit_script` verifies denial on either key returns a generic 503, does not invoke Lua, and closes the client. Inline thread [discussion_r4464049813](https://github.com/milanradics89-beep/POS-Doctor/pull/41#discussion_r4464049813) is resolved.
---

## Historical checkpoint (superseded by exact-head 287aa18; captured 2026-11-09 07:54 CET)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The exact PR HEAD [`f4cfafe`](https://github.com/milanradics89-beep/POS-Doctor/commit/f4cfafef02573703307a64d778640f727f5f90e2) is a documentation-only child of [`0b31db9`](https://github.com/milanradics89-beep/POS-Doctor/commit/0b31db9ba17fbd5b76365acd718a745848a76fae); it updates only the three release-evidence documents. Application source, tests, dependencies, and workflow configuration are unchanged. The latest validated application runtime source baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), and the latest validated CI regression-test baseline remains [`603789c`](https://github.com/milanradics89-beep/POS-Doctor/commit/603789c479c3411edbb013e960608ebaa7788f2f).

All three required workflows completed successfully for exact HEAD `f4cfafe`:

- Validation [42568265630](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265630):
  - Backend [job 129010893527](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265630/job/129010893527): **413 tests passed**, **26 production-readiness checks passed**, and **55 production-security/privacy checks passed**; `pip-audit` reported **No known vulnerabilities found**. Non-failing warnings: Starlette/httpx TestClient deprecation and the Redis test-container `vm.overcommit_memory` advisory.
  - Frontend/Android [job 129010841116](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265630/job/129010841116): **243 tests across 56 files**, Expo Doctor **21/21**, Android Release build **BUILD SUCCESSFUL in 16m 42s**, and Android emulator install/launch smoke passed for `com.useit.app`. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but reported **four moderate** transitive `glob`/`minimatch` advisory instances. No forced Expo downgrade, incompatible override, or audit-threshold reduction was applied.
  - iOS [job 129010842304](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265630/job/129010842304): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [42568265537](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265537), analyze [job 128999482109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265537/job/128999482109), passed; SARIF combination emitted a non-fatal column-kind mismatch warning.
- Dependency Review [42568265593](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265593), job [128999481589](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42568265593/job/128999481589), passed. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); vendored `deepmerge@4.3.2` declares MIT in its manifest and LICENSE although the scanner reports unknown license metadata.

The first Android Release attempt hit an external HTTP 504 while Gradle downloaded `kotlin-compiler-embeddable-2.1.20.jar`. The failed job was rerun; the latest attempt completed the Android Release build and emulator smoke successfully without a source change. Issue [#58](https://github.com/milanradics89-beep/POS-Doctor/issues/58) was closed as completed after the exact-HEAD Validation succeeded.

### Dependency advisory disposition

The lockfile resolves `@expo/fingerprint` with nested `glob@13.0.7` and `minimatch@10.2.6`. GitHub's advisories list `glob` as affected through 14.0.1 (fixed in 14.0.2) and `minimatch` as affected below 11.0.1. The `@expo/fingerprint` dependency ranges do not accept those fixed major versions. Expo's maintainer stated on Nov 6 that these are build-tooling/resource-exhaustion findings, not vulnerabilities in shipped apps; SDK 57 and below will receive a separate compatible fix, and `@expo/fingerprint` retains `minimatch@^10` because of breaking changes. See [Expo issue #52735](https://github.com/expo/expo/issues/52735). Do not force a major override. Keep the four moderate audit instances visible until the SDK 57-compatible upstream patch is available or the owner records an explicit risk disposition.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for the historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56, #57, and #58 are closed; #58 was closed after the successful exact-head Validation retry.

The repository currently has **31 branches, 19 open pull requests, and 4 open issues**. The GitHub Releases inventory is empty. The connected integration does not expose the complete Code Scanning, Dependabot, and Secret Scanning alert inventories; these remain **unverified, not zero**.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates and human approval.

The child documentation commit `0b31db9` subsequently completed its own exact-head Validation, CodeQL, and Dependency Review successfully; the run and job evidence is recorded in the latest checkpoint above.

---

## Historical checkpoint (superseded by exact-head 0b31db9; captured 2026-11-09 05:36 CET)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. At that capture, exact PR HEAD [`4400246`](https://github.com/milanradics89-beep/POS-Doctor/commit/44002466f9b1d14e11bf424fccd23d0af7b48cbb) is a documentation-only child of [`c747a46`](https://github.com/milanradics89-beep/POS-Doctor/commit/c747a46b2830cb7ae79531e12a92272cb7d93762); it updates the three release-evidence documents only. Application source, tests, dependencies, and workflow configuration are unchanged. The latest validated application runtime source baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), and the latest validated CI regression-test baseline remains [`603789c`](https://github.com/milanradics89-beep/POS-Doctor/commit/603789c479c3411edbb013e960608ebaa7788f2f).

All three required workflows completed successfully for exact HEAD `4400246`:

- Validation [42553677397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677397):
  - Backend [job 128954562980](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677397/job/128954562980): **413 tests passed**, **26 production-readiness checks passed**, and **55 production-security/privacy checks passed**; `pip-audit` reported **No known vulnerabilities found**. Non-failing warnings: Starlette/httpx TestClient deprecation and Redis test-container `vm.overcommit_memory` advisory.
  - Frontend/Android [job 128954562672](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677397/job/128954562672): **243 tests across 56 files**, Expo Doctor **21/21**, Android Release build **BUILD SUCCESSFUL in 21m 41s**, and Android emulator install/launch smoke passed for `com.useit.app`. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but reported **four moderate** transitive `glob`/`minimatch` advisory instances: [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No forced Expo downgrade, incompatible override, or audit-threshold reduction was applied.
  - iOS [job 128954562896](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677397/job/128954562896): Release simulator build succeeded and install/launch smoke passed for `com.useit.app`.
- CodeQL [42553677417](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677417), analyze [job 128954562867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677417/job/128954562867), passed. SARIF combination emitted a non-fatal column-kind mismatch warning.
- Dependency Review [42553677400](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677400), job [128954562517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42553677400/job/128954562517), passed. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); vendored `deepmerge@4.3.2` declares MIT in its manifest and LICENSE although the scanner reports unknown license metadata.

### Dependency advisory disposition

The lockfile resolves `@expo/fingerprint` with nested `glob@13.0.7` and `minimatch@10.2.6`. GitHub's advisories list `glob` as affected through 14.0.1 (fixed in 14.0.2) and `minimatch` as affected below 11.0.1. The `@expo/fingerprint` dependency ranges do not accept those fixed major versions. Expo's maintainer stated on Nov 6 that these are build-tooling/resource-exhaustion findings, not vulnerabilities in shipped apps; SDK 57 and below will receive a separate compatible fix, and `@expo/fingerprint` retains `minimatch@^10` because of breaking changes. See [Expo issue #52735](https://github.com/expo/expo/issues/52735). Do not force a major override. Keep the four moderate audit instances visible until the SDK 57-compatible upstream patch is available or the owner records an explicit risk disposition.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for the historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56 and #57 are closed.

The repository currently has **31 branches, 19 open pull requests, and 4 open issues**. The GitHub Releases inventory is empty. The connected integration does not expose the complete Code Scanning, Dependabot, and Secret Scanning alert inventories; these remain **unverified, not zero**.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates and human approval.
---


The child documentation commit `0b31db9` subsequently completed its own exact-head Validation, CodeQL, and Dependency Review successfully; the run and job evidence is recorded in the latest checkpoint above.

## Historical checkpoint (superseded by exact-head 4400246; captured 2026-11-09 01:14 CET)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. At that capture, exact PR HEAD [`0719bab`](https://github.com/milanradics89-beep/POS-Doctor/commit/0719babf54e3b9990095ce4aa44fc1cc9ee277e5) is a documentation-only child of [`37aad53`](https://github.com/milanradics89-beep/POS-Doctor/commit/37aad530dafeca4007c273989775671a6d2d3ff5); it updates only `docs/25-POINT-RELEASE-BACKLOG.md`. Application source, tests, dependencies, and workflow configuration are unchanged. The latest validated application runtime source baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), and the latest validated CI regression-test baseline remains [`603789c`](https://github.com/milanradics89-beep/POS-Doctor/commit/603789c479c3411edbb013e960608ebaa7788f2f).

All three required workflows completed successfully for exact HEAD `0719bab`:
- Validation [42536557473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557473):
  - Backend [job 128902028123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557473/job/128902028123): completed successfully.
  - Frontend/Android [job 128902028049](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557473/job/128902028049): completed successfully, including Android Release and emulator validation.
  - iOS [job 128902027884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557473/job/128902027884): completed successfully, including Release simulator validation.
- CodeQL [42536557481](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557481), analyze [job 128902027649](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557481/job/128902027649), passed.
- Dependency Review [42536557519](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557519), job [128902027250](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42536557519/job/128902027250), passed.

The validated parent source/test baseline records 413 backend tests, 26 production-readiness checks, 55 production-security/privacy checks, 243 frontend tests across 56 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release simulator/install smoke. These counts are retained as parent/source-baseline evidence; the exact-head 0719bab job records above independently establish that all three workflows passed on the current documentation SHA.

Dependency caveats remain: runtime npm audit reports four moderate transitive `glob`/`minimatch` advisory instances; below-threshold Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); vendored `deepmerge@4.3.2` declares MIT in its manifest and LICENSE although the scanner reports unknown license metadata. No forced Expo downgrade, incompatible override, or audit-threshold reduction was applied.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for the historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56 and #57 are closed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert-collection endpoints. The GitHub Releases inventory is empty.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates and human approval.

## Historical checkpoint (superseded by exact-head 0719bab; captured 2026-11-09 00:40 CET)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The last fully validated exact PR HEAD is [`37aad53`](https://github.com/milanradics89-beep/POS-Doctor/commit/37aad530dafeca4007c273989775671a6d2d3ff5), parent [`497c865`](https://github.com/milanradics89-beep/POS-Doctor/commit/497c8650ce2da06f4c3d87b4533a05228533ce63). Commit `37aad53` is documentation-only and changes the three release evidence documents; application source, tests, dependencies, and workflow configuration are unchanged. The latest validated application runtime source baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), and the latest validated CI regression-test baseline remains [`603789c`](https://github.com/milanradics89-beep/POS-Doctor/commit/603789c479c3411edbb013e960608ebaa7788f2f).

All three required workflows completed successfully for exact HEAD `37aad53`:
- Validation [42529161080](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161080):
  - Backend [job 128879280885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161080/job/128879280885): **413 backend tests**, **26 production-readiness checks**, and **55 production-security/privacy checks** passed; `pip-audit` reported no known vulnerabilities.
  - Frontend/Android [job 128879280873](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161080/job/128879280873): **243 tests across 56 files**, Expo Doctor **21/21**, Android Release build (**BUILD SUCCESSFUL in 17m 23s**) and emulator install/launch smoke passed for `com.useit.app`. Runtime npm audit still reports **four moderate** transitive `glob`/`minimatch` findings; no forced downgrade, incompatible override, or threshold reduction was applied.
  - iOS [job 128879280582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161080/job/128879280582): Release simulator build and install/launch smoke passed for `com.useit.app`.
- CodeQL [42529161040](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161040), analyze [job 128879280490](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161040/job/128879280490), passed with a non-fatal SARIF column-kind mismatch warning.
- Dependency Review [42529161031](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161031), job [128879280239](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42529161031/job/128879280239), passed. Below-threshold Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); vendored `deepmerge@4.3.2` declares MIT in its manifest and LICENSE although the scanner reports an unknown license.

Governance: issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, one approving review, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked and no bypass actors are configured. All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and last-push approval remain outstanding. Issue #46 remains open for the historical CodeQL action failure; PRs #43/#44 must not be merged independently and draft PR #49 remains the atomic update candidate. Issues #56 and #57 are closed.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, and #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI is not physical-device or production acceptance. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert-collection endpoints. The GitHub Releases inventory was last recorded empty; it is not a production sign-off.

This checkpoint proves exact-head automated CI only, not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged pending external release gates and human approval.

---

# USEIT 25-point release backlog

## Historical checkpoint (superseded by exact-head 603789c; captured 2026-11-08 16:50 CET)

At capture, PR #41 was open and unmerged on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Exact PR HEAD `3a98e1e2474cccd8b8714fdb3d8c4bac3d36ef7f` (parent `e436004f4d61721e5f8750f1c6607c2d5fe379a2`) passed all three required workflows. Commit `3a98e1e` changes only `.github/workflows/expo-sdk57-lock-refresh.yml`: it adds `gh auth setup-git` and a credential-helper assertion immediately before the final lockfile push, while retaining `persist-credentials: false` during project code and tests. The actual lockfile-changing push path has not yet been exercised because generated manifests already match the branch. The latest validated application source/test baseline remains `323869a`.

Exact-head CI evidence for `3a98e1e`:
- [Validation 42493540344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540344): backend [job 128770814197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540344/job/128770814197) passed 413 backend tests, 26 production-readiness checks, and 55 production-security/privacy checks; pip-audit passed. Frontend/Android [job 128770814410](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540344/job/128770814410) passed 241 tests across 56 files, Expo Doctor 21/21, Android Release build, and emulator install/launch smoke. iOS [job 128770814452](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540344/job/128770814452) passed the Release simulator build and install/launch smoke.
- [CodeQL 42493540425](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540425), analyze [job 128770814624](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540425/job/128770814624), passed.
- [Dependency Review 42493540328](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540328), [job 128770814039](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42493540328/job/128770814039), passed with no high-or-higher vulnerable packages and no denied packages.

Dependency caveats remain: runtime npm audit reports four moderate transitive `glob`/`minimatch` advisory instances; Dependency Review has below-threshold Scorecard findings for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), plus an unknown scanner-license result for vendored `deepmerge@4.3.2` whose checked-in manifest and LICENSE declare MIT. No forced major override or audit-threshold reduction was applied. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero**, because the connected integration does not expose those alert collections.

Governance at capture: all 11 inline review threads are resolved; 15 review submissions exist and all are COMMENTED, with zero APPROVED reviews. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, one approving review, last-push approval, and resolved threads; deletion and non-fast-forward updates are blocked and there are no bypass actors. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Issue [#57](https://github.com/milanradics89-beep/POS-Doctor/issues/57) is closed after the exact-head Gradle timeout fix in `4580240`. Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical mixed-version CodeQL action failure; do not merge #43/#44 independently, and keep draft #49 as the atomic update candidate.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main branch protection, #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, and #25 real pilot/business approval. Simulator/emulator CI does not satisfy these external gates.

This section records the last fully validated parent before the documentation-only commit created by this refresh. **The new documentation commit has its own exact-HEAD Validation, CodeQL, and Dependency Review gates pending; it must not inherit the parent runs as its own evidence.** PR #41 remains open and unmerged pending those checks, external release gates, and human approval.

---


## Historical checkpoint (superseded by validated baseline 3a98e1e) (captured 2026-11-08T14:31:00+01:00; exact SHA `00133e4db6ef137b162d5307672e1370a2ce727f`)

At capture, PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` (base SHA `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`). The exact HEAD `00133e4` is documentation-only, parent `d6a75d9`; it changes the three release evidence documents and does not change application source, tests, dependencies, or workflow configuration. The PR metadata and release branch HEAD agree on this SHA.

All three required workflows completed successfully on this exact HEAD:

- [Validation 42480384966](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384966):
  - Backend [job 128730819440](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384966/job/128730819440): **413 tests passed**, **26 production-readiness checks passed**, **55 production-security/privacy checks passed**; `pip-audit` reported no known vulnerabilities. One non-failing warning was recorded.
  - Frontend/Android [job 128730819238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384966/job/128730819238): **241 tests across 56 files**, Expo Doctor **21/21**, Android Release build **BUILD SUCCESSFUL in 14m 34s**, and emulator install/launch smoke passed for `com.useit.app`. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold and reported **four moderate** transitive `glob`/`minimatch` findings; the threshold was not lowered and no forced override was applied.
  - iOS [job 128730819428](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384966/job/128730819428): Release simulator build succeeded and simulator install/launch smoke passed for `com.useit.app`.
- [CodeQL 42480385001](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480385001), analyze [job 128730819226](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480385001/job/128730819226), completed successfully.
- [Dependency Review 42480384862](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384862), [job 128730818544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42480384862/job/128730818544), completed successfully with no high-or-higher vulnerable packages and no denied packages. Below-threshold findings remain: unknown scanner license metadata for vendored `deepmerge` (the checked-in manifest and LICENSE declare MIT), and low OpenSSF Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).

The latest validated application source/test baseline remains [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f). Commit `4580240` is workflow-only (the Gradle wrapper download timeout was increased to 120 seconds and verified by a successful Android Release build); `d6a75d9` and `00133e4` are documentation-only. The source/test baseline has not been changed by these later commits.

Release, review, and external gates:

- The 25-point backlog remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance test coverage. Blocked: #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark, #21 production monitoring/alert delivery, #22 staged rollout/rollback, #25 real pilot and business approval.
- All **11/11 inline PR review threads are resolved**. There are **15 review submissions and 0 APPROVED**; one human approving review and last-push approval remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets `~DEFAULT_BRANCH`, is active with no bypass actors, and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved review threads; branch deletion and non-fast-forward updates are blocked. Main reports protected.
- Issues #56 and #57 are closed with exact evidence. Issue #46 remains open for the historical mixed-version CodeQL action failure on older Dependabot branches. PRs #43/#44 are separate one-sided CodeQL action updates and must not be merged independently; draft PR #49 is the atomic update candidate.
- Draft PRs #48/#52 remain separate design work and are not release acceptance evidence.
- GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert-collection endpoints.
- Production provider configuration, physical-device App Attest/Play Integrity, owner-approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.

This checkpoint proves automated CI only. It is not production, physical-device, store, pilot, or business sign-off. PR #41 remains open and unmerged. The documentation update created from this checkpoint is a child of `00133e4`; its own exact-HEAD workflows must pass before it can be described as validated.

---

## Latest validated application source/test baseline (captured 2026-11-08T08:23:33+01:00; exact SHA `323869a4c19d1aa1c101a4da97bc17564c44588f`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` (base SHA `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`). The exact source/test HEAD at this evidence checkpoint is [`323869a`](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f), parent [`aa15690`](https://github.com/milanradics89-beep/POS-Doctor/commit/aa15690bda34cc6c532d044d4f12ea0270368a68). The checkpoint includes the production session/attestation startup-readiness policy, the shared OpenAI client with a 35-second timeout and SDK retries disabled, production Redis TLS enforcement and port validation, and the negative-port parser regression correction.

Exact-HEAD automated CI evidence for `323869a`:
- [Validation 42452876349](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876349): backend [job 128645652615](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876349/job/128645652615) passed **413 backend tests**, then **26 API-auth regression tests** and **55 production-security/privacy tests** in the readiness script; `pip-audit` reported no known vulnerabilities. One non-failing Starlette/httpx TestClient deprecation warning and the Redis test-service `vm.overcommit_memory` advisory were logged. Frontend/Android [job 128645652848](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876349/job/128645652848) passed **241 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. Runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but reported **four moderate** `glob`/`minimatch` advisory instances ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)); no forced Expo downgrade or audit-threshold reduction was applied. iOS [job 128645652729](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876349/job/128645652729) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42452876365](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876365), analyze [job 128645652931](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876365/job/128645652931), succeeded. SARIF merging emitted a non-fatal column-kind mismatch warning.
- [Dependency Review 42452876475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876475), job [128645652851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42452876475/job/128645652851), succeeded with no high-or-higher vulnerable packages and no denied packages. The scanner could not detect a license for `vendor/deepmerge@4.3.2`, although its checked-in manifest and LICENSE declare MIT. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), below threshold 3.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, and #6 Redis multi-instance test coverage.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; one human approving review and approval of the last push remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured. The main branch reports protected.
- Issue [#56](https://github.com/milanradics89-beep/POS-Doctor/issues/56) is closed as completed after the `-1` Redis port test was correctly classified as malformed URL input; the production validator was not weakened.
- Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on an older Dependabot head; current exact-head CodeQL succeeded. PRs #43/#44 are separate CodeQL action updates, #49 is a draft atomic CodeQL update, and #48/#52 remain separate draft design work. Do not merge these independently.
- GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.
- Physical-device App Attest/Play Integrity, production provider configuration, owner-approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open. Simulator/emulator CI is not physical-device acceptance.

This is automated CI evidence only, not production, physical-device, store, pilot, or business sign-off. Previous exact PR #41 HEAD checkpoint (superseded by 4580240) was documentation-only commit [365dd80](https://github.com/milanradics89-beep/POS-Doctor/commit/365dd80605b57101c3293c55a2d9b9bad55167c8), child of the previous documentation checkpoint [0ff1def](https://github.com/milanradics89-beep/POS-Doctor/commit/0ff1def763fd7382ed1f1c0fa4640bc9ba96e64f), which is itself a child of the validated application source/test baseline [323869a](https://github.com/milanradics89-beep/POS-Doctor/commit/323869a4c19d1aa1c101a4da97bc17564c44588f). The PR branch ref and PR metadata agree on this exact HEAD. All required workflows completed successfully for **365dd80 itself** on 2026-11-08:
- [Validation 42462613196](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613196): backend [job 128674951221](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613196/job/128674951221), frontend/Android [job 128674951496](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613196/job/128674951496), and iOS [job 128674951470](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613196/job/128674951470) all passed.
- [CodeQL 42462613187](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613187), analyze [job 128674951001](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613187/job/128674951001), passed.
- [Dependency Review 42462613192](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613192), dependency-review [job 128674950774](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42462613192/job/128674950774), passed.

These are exact-head automated checks for the current documentation commit. Application source/test evidence remains attached to `323869a`; no source, physical-device, production, store, pilot, or business acceptance is implied.
---

## Previous validated PR #41 HEAD checkpoint (superseded by fa620d1) (captured 2026-11-07T18:40:40+01:00; exact SHA `e1f6046127d36522618d38567c630eda12130b73`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. This documentation-only HEAD follows the validated baseline `74b564462c9a6b56a589de9cb6f2e8075442fd65`; the latest application source/test baseline remains `7e8097b0927ca1b9f86457b559807fbf3965fde1`.

Exact-current-HEAD CI evidence for `e1f6046`:
- [Validation 42392162430](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162430): backend [job 128461812978](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162430/job/128461812978) passed **389 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` found no known vulnerabilities. One non-failing Starlette/httpx TestClient deprecation warning and the Redis test-service host `vm.overcommit_memory` advisory were recorded. Frontend/Android [job 128461812997](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162430/job/128461812997) passed typecheck and **56 test files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. The runtime npm audit passed its configured high-severity threshold but reported **four moderate** advisory instances affecting `glob`/`minimatch` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)); no forced Expo downgrade or audit-threshold reduction was applied. iOS [job 128461812805](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162430/job/128461812805) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42392162429](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162429), analyze [job 128461812922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162429/job/128461812922), succeeded. SARIF merging emitted the non-fatal column-kind mismatch warning.
- [Dependency Review 42392162444](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162444), job [128461812735](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42392162444/job/128461812735), succeeded with no high-or-higher vulnerable packages and no denied packages. The lockfile license detector still cannot identify `package-lock.json » vendor/deepmerge@4.3.2`, although its checked-in manifest and LICENSE declare MIT. Below-threshold OpenSSF Scorecard results remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), below threshold 3. Explicit dependency-risk acceptance or scanner-compatible packaging remains open.

Review and release gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, and #6 Redis multi-instance test coverage.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and approval of the last push remain required.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured.
- The five tracked request/privacy/permission findings remain covered by source/tests: explicit-auth POST retry fixtures; effective Fetch `Request`/init headers and method; valid base64 `vision_usage` privacy fixture; error-boundary logging limited to the error name; and Settings recovery for permanently denied camera/gallery permissions.
- GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert-collection endpoints.
- Physical-device App Attest/Play Integrity, production provider configuration, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open. Simulator/emulator CI is not physical-device acceptance.

This exact-head CI is automated evidence only. It is not production, physical-device, store, pilot, or business sign-off.


---


## Previous validated PR #41 HEAD baseline before `e1f6046` (captured 2026-11-07T17:31:00+01:00; exact SHA `74b564462c9a6b56a589de9cb6f2e8075442fd65`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. The validated documentation-only HEAD [`74b5644`](https://github.com/milanradics89-beep/POS-Doctor/commit/74b564462c9a6b56a589de9cb6f2e8075442fd65) (parent [`6e8f8c9`](https://github.com/milanradics89-beep/POS-Doctor/commit/6e8f8c99ca1fcaa25d8b91f68f6e0896ca5001eb)) updates the release evidence records. The latest application source/test baseline remains [`7e8097b`](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1); no source/test or external acceptance status is upgraded by this documentation commit.

Exact-head CI evidence for `74b5644`:
- [Validation 42388641839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641839): backend [job 128451318938](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641839/job/128451318938) passed **389 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` found no known vulnerabilities. One non-failing Starlette/httpx TestClient deprecation warning and the Redis test-service host `vm.overcommit_memory` advisory were recorded. Frontend/Android [job 128451318930](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641839/job/128451318930) passed **241 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. iOS [job 128451318728](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641839/job/128451318728) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42388641855](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641855), analyze [job 128451318784](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641855/job/128451318784), succeeded. SARIF merging emitted the non-fatal column-kind mismatch warning.
- [Dependency Review 42388641863](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641863), job [128451318674](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42388641863/job/128451318674), succeeded with no high-or-higher vulnerable packages and no denied packages. Remaining findings: unknown lockfile license metadata for local `vendor/deepmerge@4.3.2` (its checked-in manifest and LICENSE declare MIT), below-threshold OpenSSF Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), and **four moderate** runtime npm-audit advisory instances affecting `glob`/`minimatch`. The configured high-severity audit threshold passed; no forced Expo downgrade or threshold reduction was applied.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, and #6 Redis multi-instance test coverage.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; human approval and approval of the last push remain required.
- The five tracked request/privacy/permission findings remain covered by source/tests: explicit-auth POST retry fixtures; effective Fetch `Request`/init headers and method; valid base64 `vision_usage` privacy fixture; error-boundary logging limited to the error name; and Settings recovery for permanently denied camera/gallery permissions.
- Issue #46 remains open for a historical CodeQL failure on an older Dependabot head; current exact-head CodeQL succeeded. PRs #43/#44 are separate CodeQL action Dependabot updates, #49 is a draft atomic CodeQL update, and #48/#52 remain draft design work. Do not merge these independently.
- GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert-collection endpoints.
- Physical-device App Attest/Play Integrity, production provider configuration, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.

This is automated CI evidence for baseline `74b5644` only. The documentation commit created by this refresh becomes a new PR HEAD and must pass its own Validation, CodeQL, and Dependency Review before it is treated as validated.
---

## Previous validated PR #41 HEAD checkpoint (superseded by 6e8f8c99ca1fcaa25d8b91f68f6e0896ca5001eb) (workflow-only commit; captured 2026-11-07T14:42:44+01:00; exact SHA `1e013f87e765d179d78fa74af17ed19a9a5b3cc6`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. HEAD at that checkpoint [`1e013f8`](https://github.com/milanradics89-beep/POS-Doctor/commit/1e013f87e765d179d78fa74af17ed19a9a5b3cc6) (parent [`9e90130`](https://github.com/milanradics89-beep/POS-Doctor/commit/9e90130bb024a47192a097cf8866b6b61a445d2c)) hardens only `.github/workflows/expo-sdk57-lock-refresh.yml`, restricting execution and writes to the release branch. The last application source/test baseline remains [`7e8097b`](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1).

Exact-head at that checkpoint CI:
- [Validation 42372913196](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913196): backend [job 128404532893](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913196/job/128404532893) passed 389 tests, 24 production-readiness checks, and 43 production-security checks; `pip-audit` found no known vulnerabilities. Frontend/Android [job 128404532794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913196/job/128404532794) passed 241 tests across 56 files, Expo Doctor 21/21, Android Release build, and emulator install/launch smoke. iOS [job 128404532972](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913196/job/128404532972) passed the Release simulator build and install/launch smoke.
- [CodeQL 42372913195](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913195), analyze [job 128404532874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913195/job/128404532874), succeeded. SARIF merging emitted the non-fatal column-kind mismatch warning.
- [Dependency Review 42372913247](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913247), job [128404532927](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42372913247/job/128404532927), succeeded: no high-or-higher vulnerable packages and no denied packages. Remaining findings: unknown license metadata for `vendor/deepmerge@4.3.2`, below-threshold OpenSSF Scorecard warnings for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5), plus four moderate runtime npm-audit advisory instances affecting `glob`/`minimatch` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). The suggested `npm audit fix --force` would downgrade Expo to 53.0.11, a breaking change; it was not applied and no audit threshold was lowered.

The status register remains **3 Done / 15 In Progress / 7 Blocked**. All 11 inline review threads are resolved; 15 review submissions contain 0 APPROVED, so human approval and last-push approval remain open. Issue #47 is closed and main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active. Issue #46 remains open for a historical CodeQL failure on an older Dependabot head; current exact-head CodeQL succeeded. PRs #43/#44 are separate CodeQL action Dependabot updates, #49 is a draft atomic CodeQL update, and #48/#52 remain draft design work.

GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero**. Physical-device App Attest/Play Integrity, production provider configuration, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open. Automated CI is not production or business sign-off.


---


## Latest validated source/test checkpoint (captured 2026-11-07T10:54:51+01:00; exact source/test SHA `7e8097b0927ca1b9f86457b559807fbf3965fde1`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. The latest source/test commit is [`7e8097b`](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1), parent [`e705b73`](https://github.com/milanradics89-beep/POS-Doctor/commit/e705b733091cb41c4e93d498ed9a91b7a5e0ca82).

Exact source/test CI evidence:
- [Validation 42359047629](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047629): backend [job 128363303478](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047629/job/128363303478) passed 389 tests and 24 production-readiness checks; `pip-audit` found no known vulnerabilities. Frontend/Android [job 128363303380](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047629/job/128363303380) passed 241 tests across 56 files, Expo Doctor 21/21, Android Release build, and emulator install/launch smoke. iOS [job 128363303491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047629/job/128363303491) passed Release simulator build and install/launch smoke.
- [CodeQL 42359047651](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047651), analyze [job 128363303604](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047651/job/128363303604), succeeded with a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 42359047678](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047678), job [128363303401](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42359047678/job/128363303401), succeeded. One unknown-license vendored `deepmerge` entry and two below-threshold Scorecard warnings remain. Runtime npm audit reported four moderate `glob`/`minimatch` advisory instances; the configured high-severity threshold passed without override or threshold reduction.

Commit [`7e8097b`](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1) adds strict App Attest challenge validation and three regressions for expired, missing, and non-integer expiry values. Invalid challenges are rejected before native key creation or attestation. Item #7 remains In Progress pending real network-loss and provider-backed device verification.

## Previous exact PR #41 HEAD checkpoint (superseded by 1e013f87e765d179d78fa74af17ed19a9a5b3cc6) (documentation-only; captured 2026-11-07T11:51:33+01:00; exact SHA `2a277069aba66c907f29bccee7ea6df08d893059`)

The current PR HEAD [`2a27706`](https://github.com/milanradics89-beep/POS-Doctor/commit/2a277069aba66c907f29bccee7ea6df08d893059) is a documentation-only child of `7e8097b`. Its own exact-HEAD workflows all completed successfully:
- [Validation 42362002764](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002764): backend [job 128372174241](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002764/job/128372174241), frontend [job 128372174477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002764/job/128372174477), and iOS [job 128372174400](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002764/job/128372174400) all passed.
- [CodeQL 42362002765](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002765), analyze [job 128372174123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002765/job/128372174123), passed.
- [Dependency Review 42362002785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002785), job [128372174063](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42362002785/job/128372174063), passed.

These are exact-head checks for `2a27706`, not reused parent results. The documentation correction in this commit creates a new PR HEAD and must pass its own three workflows before that new SHA is considered validated.

## Release, review, and external gates

- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, and #6 Redis multi-instance test coverage. Simulator/emulator CI is not physical-device acceptance.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Main is marked protected and active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; PR review, one approval, last-push approval, and resolved review threads; it blocks deletion and non-fast-forward updates and has no bypass actors.
- All **11/11 inline review threads are resolved**. There are **15 review submissions, all COMMENTED and 0 APPROVED**; a human approving review and last-push approval remain required.
- The five tracked client/request/privacy findings remain covered by source/tests: explicit-auth POST retry fixtures; effective Fetch `Request`/init headers and method for session-auth eligibility; valid base64 `vision_usage` privacy fixture; error-boundary logging limited to the error name; and Settings recovery for permanently denied camera/gallery permissions.
- Physical-device App Attest and Play Integrity, production provider/configuration, approved staging load, witnessed backup/restore, production monitoring/alert delivery, staged rollout/rollback, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
- GitHub Releases contains no published releases. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because those alert collections are not exposed by the connected integration.
- Related open work: PR #52 is a Draft design-system integration targeting this release branch; PR #48 is a separate Draft redesign; PR #49 is a Draft atomic CodeQL action update. PRs #43 and #44 are separate CodeQL action bumps and must not be merged independently. Issue #46 remains open for a historical CodeQL failure; the current exact-head CodeQL run passed.

---

---

### Previous fully validated PR #41 checkpoint (superseded by 2026-11-07T04:36:38+01:00 checkpoint; exact PR head `ce31cc34df9e8d0744378df1359f679496cef3ed`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Checkpoint HEAD `ce31cc3` was a documentation-only child of `9383f32`; this commit changes only the three release evidence documents. All three required pull-request workflows completed successfully for this exact HEAD. Do not reuse earlier run IDs as evidence for this HEAD.

Exact-head CI evidence:
- [Validation 42311879833](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879833): backend [job 128215040421](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879833/job/128215040421) passed **385 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` reported no known vulnerabilities. One non-failing Starlette/httpx deprecation warning and the Redis test-container host `vm.overcommit_memory` advisory were recorded. Frontend/Android [job 128215040187](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879833/job/128215040187) passed **234 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. The runtime npm audit passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). iOS [job 128215039787](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879833/job/128215039787) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42311879855](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879855), analyze [job 128215040121](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879855/job/128215040121), completed successfully. SARIF merging emitted a non-fatal column-kind mismatch warning.
- [Dependency Review 42311879832](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879832), dependency-review [job 128215039221](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42311879832/job/128215039221), completed successfully: no high-or-higher vulnerable packages and no denied packages. One unknown-license entry remains for `vendor/deepmerge@4.3.2`; below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). No forced downgrade, dependency override, or audit-threshold reduction was applied.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance test coverage. Simulator/emulator CI is not physical-device acceptance.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, plus pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked, with no bypass actors.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; a human approving review and last-push approval remain required.
- The five previously identified client/request/privacy findings remain covered in source/tests: effective `Request`/`init` headers and method for session-auth eligibility; explicit API-key authentication in POST retry fixtures; valid base64 image data in the `vision_usage` privacy fixture; error-boundary logging limited to the error name; and Settings recovery for permanently denied camera/gallery permissions. Source tests do not replace physical permission testing.
- Physical-device App Attest and Play Integrity, production provider/configuration checks, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
- GitHub Releases currently contains no published releases. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected GitHub integration does not expose those alert collections.

This checkpoint establishes exact-head automated CI only. It is not production, physical-device, store, pilot, or business acceptance.

---

### Previous fully validated PR #41 checkpoint (superseded 2026-11-07T01:26:20+01:00; exact PR head `9383f32f998416e805f259456f1fbcbacac64fe6`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Checkpoint HEAD `9383f32` is a documentation-only child of `66f6739`; the one-commit comparison confirms that it changes only the three release evidence documents. All three required pull-request workflows completed successfully for this exact HEAD. Do not reuse earlier run IDs as evidence for this HEAD.

Exact-head CI evidence:
- [Validation 42307026939](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026939): backend [job 128198840049](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026939/job/128198840049) passed **385 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` reported no known vulnerabilities. The backend log has one non-failing test warning and the Redis test-container host `vm.overcommit_memory` advisory. Frontend/Android [job 128198839640](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026939/job/128198839640) passed **234 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. The runtime audit passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). iOS [job 128198839993](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026939/job/128198839993) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42307026698](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026698), analyze [job 128198838858](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026698/job/128198838858), completed successfully. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 42307026690](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026690), dependency-review [job 128198838296](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42307026690/job/128198838296), completed successfully: no high-or-higher vulnerable packages and no denied packages; **1 unknown-license package** remains for `vendor/deepmerge@4.3.2`, plus **2 below-threshold OpenSSF Scorecard warnings** for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). No forced downgrade, dependency override, or audit-threshold reduction was applied.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance test coverage. Simulator/emulator CI is not physical-device acceptance.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Main reports `protected: true`; active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, plus pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked, with no bypass actors.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; a human approving review and last-push approval remain required.
- The five previously identified client/request/privacy findings were rechecked in the current source: effective `Request`/`init` headers and method are used for session-auth eligibility; POST retry tests use explicit API-key authentication; the `vision_usage` privacy fixture uses a valid base64 image data URI; the error boundary logs only the error name; and permanently denied camera/gallery permissions expose an Open Settings action. These source checks do not replace physical permission testing.
- The Redis readiness probe preflights `PEXPIRE` on both unique keys before its mutating Lua script; production Play Integrity certificate-pin parsing fails closed. Neither source tests nor CI prove a live provider-backed device flow.
- Physical-device App Attest and Play Integrity, production provider/configuration checks, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
- GitHub Releases currently contains no published releases. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected GitHub integration does not expose those alert collections.

This checkpoint establishes exact-head automated CI only. It is not production, physical-device, store, pilot, or business acceptance.

### Previous fully validated PR #41 checkpoint (superseded 2026-11-07T00:21:29+01:00; exact PR head `66f67390d31def365230cb24824b4c5b439a6cc1`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Current head `66f6739` is a documentation-only child of `6bd2af5`; the one-commit comparison confirms that it changes only the three release evidence documents. All three required pull-request workflows completed successfully for this exact head. Do not reuse earlier run IDs as evidence for this head.

Exact-head CI evidence:
- [Validation 42298874785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874785): backend [job 128171140503](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874785/job/128171140503) passed **385 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` reported no known vulnerabilities. The backend log has one non-failing Starlette/httpx deprecation warning and the Redis test-container host `vm.overcommit_memory` advisory. Frontend/Android [job 128171140233](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874785/job/128171140233) passed typecheck, **234 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. The runtime audit passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). iOS [job 128171140644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874785/job/128171140644) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42298874581](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874581), analyze [job 128171139941](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874581/job/128171139941), completed successfully. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 42298874922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874922), dependency-review [job 128171141530](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42298874922/job/128171141530), completed successfully: **0 high-or-higher vulnerable packages**, **0 incompatible licenses**, **0 invalid SPDX definitions**, **1 unknown-license package**, and **2 below-threshold OpenSSF Scorecard warnings**. The low Scorecard results remain `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); the vendored `deepmerge@4.3.2` license metadata remains tracked. No forced downgrade, dependency override, or audit-threshold reduction was applied.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance test coverage. Simulator/emulator CI is not physical-device acceptance.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Main reports `protected: true`; active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, plus pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked, with no bypass actors.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; a human approving review and last-push approval remain required.
- The five previously identified client/request/privacy findings were rechecked in the current source: effective Request/init headers and method are used for session-auth eligibility; POST retry tests use explicit API-key authentication; the vision usage privacy fixture uses base64-encoded sentinel bytes; the error boundary logs only the error name; and permanently denied gallery permissions expose an Open Settings action. These source checks do not replace physical permission testing.
- Physical-device App Attest and Play Integrity, production provider/configuration checks, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
- GitHub Releases currently contains no published releases. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected GitHub integration does not expose those alert collections.

This checkpoint establishes exact-head automated CI only. It is not production, physical-device, store, pilot, or business acceptance.

---

### Previous fully validated PR #41 checkpoint (superseded 2026-11-06T23:42:12+01:00; exact PR head `6bd2af53a8beee276179c02f205512d0c1024e96`)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Current head `6bd2af5` is a documentation-only child of `57ef40e`; it changes only the three release evidence documents. All three required pull-request workflows have completed successfully for this exact head. Do not reuse earlier run IDs as evidence for this head.

Exact-head CI evidence:
- [Validation 42290653922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290653922): backend [job 128142898473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290653922/job/128142898473) passed **385 backend tests**, **24 production-readiness checks**, and **43 production-security checks**; the backend test log contains one non-failing Starlette/httpx deprecation warning. Frontend/Android [job 128142898888](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290653922/job/128142898888) passed typecheck, **234 tests across 56 files**, Expo Doctor **21/21**, Android Release build, and emulator install/launch smoke. iOS [job 128142898943](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290653922/job/128142898943) passed the Release simulator build and simulator install/launch smoke. The frontend runtime audit passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6`.
- [CodeQL 42290652674](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290652674), analyze [job 128142894557](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290652674/job/128142894557), completed successfully. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 42290652692](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290652692), dependency-review [job 128142894149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42290652692/job/128142894149), completed successfully: **0 high-or-higher vulnerable packages**, **0 incompatible licenses**, **0 invalid SPDX definitions**, **1 unknown-license package**, and **2 below-threshold OpenSSF Scorecard warnings**. The low Scorecard results remain `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); the vendored `deepmerge@4.3.2` license metadata remains tracked. No forced downgrade, dependency override, or audit-threshold reduction was applied.

Release and review gates:
- The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Done: #1 iOS simulator CI, #2 main ruleset, #6 Redis multi-instance test coverage. Simulator/emulator CI is not physical-device acceptance.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Main reports `protected: true`; active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, plus pull requests, one approval, last-push approval, and resolved review threads; deletion and non-fast-forward updates are blocked, with no bypass actors.
- All **11/11 inline review threads are resolved**. There are **15 review submissions and 0 APPROVED**; a human approving review and last-push approval remain required.
- Physical-device App Attest and Play Integrity, production provider/configuration checks, approved staging load test, witnessed backup/restore, production monitoring/alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
- GitHub Releases currently contains no published releases. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected GitHub integration does not expose those alert collections.

This checkpoint establishes exact-head automated CI only. It is not production, physical-device, store, pilot, or business acceptance.


---


---

### Previous fully validated PR #41 checkpoint (superseded 2026-11-06 21:40 CET) (captured 2026-11-06T19:04:07Z; PR head `776a636f4445e68e4be7a1e2110a78c700698f50`; tested PR merge ref `3b29438d209f2a5ca57271e0b9187348ed685c4a`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The fully validated baseline `776a636` is documentation-only and changed only the three release records. GitHub's pull-request workflows tested synthetic merge ref `3b29438d209f2a5ca57271e0b9187348ed685c4a`, combining that head with the current `main` base. The evidence below is for this exact validated baseline, not physical-device or deployed-production acceptance.

All three required PR workflows completed successfully for this exact head and merge ref:
- [Validation 42271616676](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616676): backend [job 128077327904](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616676/job/128077327904) passed **385 tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` found no known vulnerabilities. One non-failing Starlette/httpx deprecation warning and the Redis test-container host `vm.overcommit_memory` advisory remain. Frontend/Android [job 128077328344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616676/job/128077328344) passed typecheck, **234 tests across 56 files**, Expo Doctor **21/21**, Android export/Release build, and emulator install/launch smoke. The runtime audit passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6`. iOS [job 128077328293](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616676/job/128077328293) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42271616704](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616704), analyze [job 128077328413](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616704/job/128077328413), succeeded and uploaded results. A non-fatal SARIF column-kind mismatch warning remains.
- [Dependency Review 42271616804](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616804), dependency-review [job 128077327341](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42271616804/job/128077327341), succeeded with no high-or-higher vulnerable packages and no denied packages. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The local `vendor/deepmerge@4.3.2` license-metadata question remains tracked; its checked-in manifest and LICENSE both declare MIT.
- The current lock resolves `expo -> @expo/fingerprint@0.20.15`, which brings `glob@13.0.7` and `minimatch@10.2.6`. The npm registry still tags `0.20.15` as `sdk-57`, while `latest` is `0.21.9`; do not assume the latest tag is an SDK 57-compatible replacement without Expo compatibility evidence ([version history](https://www.npmjs.com/package/@expo/fingerprint?activeTab=versions)). The moderate advisories are [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No forced downgrade, major-version override, or audit-threshold reduction was applied.

The exact-head automated CI gate is green. Android and iOS evidence is emulator/simulator-only; it does not establish physical-device App Attest or Play Integrity acceptance. The CI run also does not establish deployed-production configuration, backup/restore, monitoring delivery, staged rollout, or pilot approval.

All **11/11 inline review threads are resolved**. There are **15 review submissions and none is `APPROVED`**; one human approval and last-push approval remain outstanding. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured. Issue [#54](https://github.com/milanradics89-beep/POS-Doctor/issues/54) is closed as completed. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Items #1 (iOS simulator CI), #2 (main ruleset), and #6 (Redis multi-instance test coverage) are Done. Physical-device App Attest/Play Integrity, production provider configuration, approved staging load/backup-restore, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.

This evidence refresh is a documentation-only child of the validated `776a636` baseline. Its own exact-head Validation, CodeQL, and Dependency Review runs must complete successfully before merge; do not reuse the baseline run IDs above as checks for this new documentation commit.

### Previous validated checkpoint (superseded; captured 2026-11-06 19:28 CET; PR #41 HEAD `ea0f3a2312f64ac054ea60deb62d2ce902c05e59`; tested merge ref `9f80724e74ba744d0686fee0095c0f8c143ba094`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. Current head `ea0f3a2` is a documentation-only commit (`docs(release): record current PR merge-ref validation`) that updates the three release records; it does not change application source or tests. GitHub's pull-request workflows checked out synthetic merge commit `9f80724e74ba744d0686fee0095c0f8c143ba094`, combining this PR head with the current `main` base. The CI evidence below is for that merge ref, not physical-device or deployed-production acceptance.

All three required PR workflows completed successfully:
- [Validation 42259362721](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362721): backend [job 128034935932](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362721/job/128034935932) passed **385 tests**, **24 production-readiness checks**, and **43 production-security checks**; one non-failing Starlette/httpx deprecation warning was reported and `pip-audit` found no known vulnerabilities. Frontend/Android [job 128034935911](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362721/job/128034935911) passed typecheck, **234 tests across 56 files**, Expo Doctor **21/21**, Android export/Release build, and emulator install/launch smoke. iOS [job 128034935606](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362721/job/128034935606) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42259362814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362814), analyze [job 128034935154](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362814/job/128034935154), succeeded. A non-fatal SARIF column-kind mismatch warning remains.
- [Dependency Review 42259362644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362644), dependency-review [job 128034934326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42259362644/job/128034934326), succeeded with no high-or-higher vulnerable packages or denied packages. One unknown-license metadata warning remains for `vendor/deepmerge@4.3.2`; below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- The frontend runtime `npm audit --omit=dev --audit-level=high` passed its configured high-severity threshold but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6` ([GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249)). No forced dependency change or audit-threshold reduction was applied.

The PR merge-ref automated CI gate is green. Backend logs also contain a non-fatal Redis test-container host `vm.overcommit_memory` advisory; Android build output contains upstream React Native/Expo deprecation warnings. iOS evidence is simulator-only and Android evidence is emulator-only; neither is physical-device acceptance.

All **11/11 inline review threads are resolved**. There are **15 review submissions and none is `APPROVED`**; one human approval and last-push approval remain outstanding. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured. Issue [#54](https://github.com/milanradics89-beep/POS-Doctor/issues/54) is closed as completed. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose those alert endpoints.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Items #1 (iOS simulator CI), #2 (main ruleset), and #6 (Redis multi-instance test coverage) are Done. Physical-device App Attest/Play Integrity, production provider configuration, approved staging load/backup-restore, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.
### Previous validated exact-head checkpoint (superseded; captured 2026-11-06 14:14 CET; PR #41 HEAD `1e06d49b16321a61b4a7a356c61d65ff4c3a4841`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. The exact HEAD `1e06d49` is a test-only repair commit whose only changed file is `src/core/intelligence/request.test.ts`. It restores the Request-body replay assertions, verifies the refreshed Authorization header on the replayed request, and restores the missing test-suite closure; no application runtime source changed in this commit.

All three required workflows completed successfully for this exact SHA:
- [Validation 42218150120](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150120): backend [127893238257](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150120/job/127893238257) passed **385 tests**, **24 production-readiness checks**, and **43 production-security checks**; `pip-audit` reported no known vulnerabilities. Frontend/Android [127893238495](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150120/job/127893238495) passed typecheck, **234 tests across 56 files**, Expo Doctor **21/21**, Android export, Release build, and emulator install/launch smoke. iOS [127893237699](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150120/job/127893237699) passed the Release simulator build and simulator install/launch smoke.
- [CodeQL 42218150171](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150171), analyze job [127893238465](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150171/job/127893238465), succeeded.
- [Dependency Review 42218150118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150118), dependency-review job [127893237752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42218150118/job/127893237752), succeeded. Below-threshold OpenSSF Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5); the vendored `vendor/deepmerge@4.3.2` license-metadata question remains tracked for explicit review/acceptance.
- The exact-head runtime `npm audit --omit=dev --audit-level=high` completed successfully but reported **4 moderate advisory instances** involving `glob@13.0.7` and `minimatch@10.2.6` (GHSA-3g3m-2fjr-6pw4 and GHSA-g3hv-75wg-m249). The audit passes its configured high-severity threshold; `npm audit fix --force` proposes the breaking Expo downgrade to `53.0.11` and was not run. Do not apply that forced downgrade without an SDK-compatible remediation and regression evidence.

The exact-head automated CI gate is green. Backend logs include a non-fatal Starlette/httpx deprecation warning; the test Redis container also emits the host `vm.overcommit_memory` advisory. Android native compilation emits upstream React Native/Expo deprecation warnings. These did not fail the jobs. This is not production or physical-device acceptance: iOS is simulator-only and Android is emulator-only.

All **11/11 inline review threads are resolved**. There are 15 review submissions and none is `APPROVED`; the required human approval and last-push approval remain outstanding. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured. Repeated CI issue [#54](https://github.com/milanradics89-beep/POS-Doctor/issues/54) is now closed as completed after the test repair and exact-HEAD CI pass. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** through the connected integration.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Items #1 (iOS simulator CI), #2 (main ruleset), and #6 (Redis multi-instance test coverage) are Done. Physical-device App Attest/Play Integrity, production provider configuration, approved staging load/backup-restore, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.

### Previous source/test checkpoint (superseded by the 14:14 CET exact-head CI checkpoint above; captured 2026-11-06 10:40 CET; assessed PR #41 HEAD `5ce8fd97ae9f49c13ffad47076fc0f37109ee8e5`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The assessed source/test HEAD `4c8c87c` is a child of `1eec24c`; it changes only `package.json` and `package-lock.json`. The Expo SDK 57 manifest and lock now align at `expo 57.0.32`, `expo-constants 57.0.23`, `expo-image-picker 57.0.21`, and `expo-router 57.0.30`.

Evidence for the lock refresh:
- [Temporary lock-refresh run 42174892046](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174892046), job [127750970948](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174892046/job/127750970948), succeeded. It regenerated and validated the manifests, completed reproducible `npm ci`, Expo Doctor, TypeScript typecheck, and **233 tests across 56 files**.
- The triggering parent HEAD `1eec24c` had [Validation 42174900478](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900478): backend [127754223145](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900478/job/127754223145) and iOS [127754264217](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900478/job/127754264217) passed; frontend [127754221034](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900478/job/127754221034) passed TypeScript and unit tests but failed Expo Doctor on the four SDK patch mismatches. Android export/build/emulator steps were skipped. Parent CodeQL [42174900435](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900435) and Dependency Review [42174900554](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42174900554) succeeded.
- The helper pushed `4c8c87c` only after the parent workflows completed and the branch still matched its expected SHA. The helper's Expo Doctor/tests are evidence for the regenerated manifest before the push, not a replacement for full exact-head CI.

Historical exact-head gate at the 09:34 CET capture for `4c8c87ce741269053fe6e4be7b2310461ded4070`:
- [Validation 42175997510](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42175997510)
- [CodeQL 42175997715](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42175997715)
- [Dependency Review 42175997505](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42175997505)

All three report `completed / action_required` and have **no jobs**. This is neither a pass nor a test failure; GitHub has not executed the checks. A repository admin must open each run and approve/authorize the workflow execution (or correct the repository Actions approval policy). Do not treat the parent runs or helper run as exact-head Validation, CodeQL, or Dependency Review.

New moderate transitive dependency findings in the refreshed lockfile:
- `expo -> @expo/fingerprint@0.20.15` resolves `glob@13.0.7` and `minimatch@10.2.6`; the lock entries are not marked dev-only.
- [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) affects glob versions `>=9.0.0 <14.0.2`; fixed in `14.0.2`. [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249) identifies minimatch `10.2.6` as affected; fixed in `11.0.1`.
- The exact-head runtime audit has not run. The advisory conditions require review of whether untrusted patterns or cancellation budgets reach these packages; no application exploit path is claimed. Do not add major-version overrides without compatibility tests. Prefer an SDK 57-compatible upstream fix; otherwise record an explicit owner risk decision.
- The temporary workflow `.github/workflows/expo-sdk57-lock-refresh.yml` remains write-capable and its regression test reads that file. Do not delete the workflow alone; any later retirement must refactor the test in the same reviewed change.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) retains strict required checks, PR/approval/last-push/thread-resolution rules, deletion and non-fast-forward protection, and no bypass actors. All **11/11 inline review threads are resolved**; 15 review submissions are recorded and none is `APPROVED`, so human approval and last-push approval remain outstanding.

At the 09:34 CET checkpoint the backlog was **2 Done / 16 In Progress / 7 Blocked**; after exact-head iOS simulator validation it is now **3 Done / 15 In Progress / 7 Blocked**: item #1 returns to In Progress until the changed Expo dependency graph passes exact-head iOS Release simulator build/install/launch. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** through the connected integration.

This documentation-only refresh is a child of assessed source/test HEAD `4c8c87c`. Its own exact-head Validation, CodeQL, and Dependency Review must be approved and completed before the new documentation SHA is treated as checked. Do not merge or release while these checks, dependency risk, external production/device gates, or human approvals remain open.

### Previous checkpoint (superseded; 2026-11-06 00:16 CET; PR #41 HEAD `561d29b96078ea2ad74aae23de0a2f072d7ed978`)

PR #41 is open and unmerged on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. This exact HEAD is **not release-green**:

- [Validation 42121378287](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378287): backend [job 127583308391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378287/job/127583308391) passed **385 tests**, **24 readiness checks**, and **43 production-security checks**; the pip-audit step completed successfully. iOS [job 127583227247](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378287/job/127583227247) passed the Release simulator build and install/launch smoke test. Frontend [job 127583225152](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378287/job/127583225152) passed the source-boundary guard, TypeScript, and **227 tests across 55 files**, then failed Expo Doctor (**20/21 checks**) because the lockfile resolves four SDK 57 packages below the expected patch versions: `expo` 57.0.31 vs 57.0.32, `expo-constants` 57.0.22 vs 57.0.23, `expo-image-picker` 57.0.20 vs 57.0.21, and `expo-router` 57.0.29 vs 57.0.30. Android export/build/emulator smoke and runtime npm audit were skipped.
- [CodeQL 42121378289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378289), analyze job [127574308620](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378289/job/127574308620), succeeded; the SARIF column-kind mismatch is non-fatal.
- [Dependency Review 42121378438](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378438), job [127574309170](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121378438/job/127574309170), succeeded with no high-or-higher vulnerable packages and no denied packages. Below-threshold Scorecard warnings remain for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The previously tracked unknown-license metadata for vendored `vendor/deepmerge@4.3.2` is not cleared; the runtime npm audit did not run on this HEAD, and the last successful runtime audit recorded 11 moderate transitive `glob`/`minimatch` advisories.
- Temporary lock-refresh run [42121369533](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121369533) successfully ran `npx expo install --fix` and uploaded artifact [13459080904](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42121369533/artifacts/13459080904) with the regenerated package manifests. Its next step failed because it added `expo-modules-core@57.0.25` as a direct root dependency; npm rejected that peer graph against `react-native-worklets@0.13.1`. The regenerated lockfile already contains Expo Modules Core nested under Expo, so the correction must not add the conflicting direct dependency. The revised helper will validate the generated manifests and wait for this HEAD's PR workflows to finish before any branch push.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, PR/one-approval/last-push-approval/thread-resolution requirements, deletion and non-fast-forward protection, and no bypass actors.
- All **11/11 inline review threads are resolved**. There are 15 review submissions and **zero APPROVED reviews**; human approval and last-push approval remain required. The five tracked request/privacy/client findings and the Redis readiness P2 fix remain present in source/tests.
- The backlog remains **3 Done / 15 In Progress / 7 Blocked**. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** through this integration.

This documentation/workflow update is a child of the observed HEAD above. Its own Validation, CodeQL, and Dependency Review must complete before it is treated as checked. Do not merge or release while the Expo Doctor blocker, external production/device gates, or human approvals remain open.


PR: [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41)

### Previous checkpoint (superseded; 2026-11-05; PR HEAD before this documentation refresh: `1c06415b85edb22af09150bd2b470274e4b51797`)

PR #41 remains open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. All three workflows for the observed HEAD completed, but the release gate is **not green**:

- [Validation 42083040107](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040107) failed in [frontend job 127454506603](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040107/job/127454506603). Source-boundary validation and TypeScript passed; **227 tests across 55 files passed**. Expo Doctor 1.21.6 then failed 20/21 checks because four SDK 57 packages are behind its expected patch versions: `expo` expected `~57.0.32` (found `57.0.31`), `expo-constants` expected `~57.0.23` (found `57.0.22`), `expo-image-picker` expected `~57.0.21` (found `57.0.20`), and `expo-router` expected `~57.0.30` (found `57.0.29`). Android export, native Release build, emulator smoke, and runtime npm audit were skipped.
- Backend [job 127454508529](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040107/job/127454508529) succeeded. The production-security suite passed **43 checks**, and `pip-audit` reported no known vulnerabilities. Production secrets, ingress/CORS, provider identity, and deployed-environment evidence remain external gates.
- iOS [job 127454510040](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040107/job/127454510040) passed the native Release simulator build and install/launch smoke. This is simulator evidence only, not physical-device App Attest acceptance.
- [CodeQL 42083040010](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040010), analyze job [127440795602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083040010/job/127440795602), succeeded and uploaded JavaScript/Python SARIF. The non-fatal SARIF column-kind mismatch warning remains.
- [Dependency Review 42083039985](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083039985), job [127440794922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42083039985/job/127440794922), succeeded with no denied packages. The report still cannot identify the license for vendored `vendor/deepmerge@4.3.2`; OpenSSF Scorecard remains below the repository threshold for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). Runtime npm audit was skipped on this HEAD; the last successful runtime audit recorded 11 moderate transitive `glob`/`minimatch` advisories.

The Expo Doctor failure is a dependency-alignment blocker, not a demonstrated application-test regression. The repository lockfile still resolves the four older versions shown above. No lockfile integrity values have been hand-edited and no package-manager regeneration has been claimed; regenerate and validate the lockfile through npm against the exact published SDK 57 artifacts before changing these dependencies. Do not exclude packages, skip Expo Doctor checks, or use an offline-mode workaround.

Issue [#54](https://github.com/milanradics89-beep/POS-Doctor/issues/54) tracks the repeated Validation blocker. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, stale-review dismissal, and resolved threads; deletion and non-fast-forward updates are blocked; no bypass actors are configured.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. All **11 inline PR #41 review threads are resolved**; 15 review submissions are recorded and none is `APPROVED`. The five tracked request/privacy/client findings remain covered by source/tests: explicit-auth POST retry fixtures; effective `Request.headers` and `Request.method`; valid base64 `vision_usage` fixture; no raw `Error` objects in the mobile error boundary; and Settings recovery for permanently denied camera/gallery permissions. Redis readiness preflights `PEXPIRE` before the mutating Lua probe, and Google Play Integrity certificate pins fail closed.

GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero**, because the connected integration does not expose those alert collections. Physical-device iPhone App Attest, Play-installed Android Play Integrity, production provider credentials/configuration, owner-approved staging load testing, witnessed backup/restore, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open.

**Important SHA boundary:** this evidence describes the observed parent HEAD `1c06415b85edb22af09150bd2b470274e4b51797`. This documentation-only refresh creates a new PR head; its own Validation, CodeQL, and Dependency Review runs must complete before anyone treats the new SHA as checked. Parent runs above must not be reused as checks for the new documentation commit. The release gate remains **not green**; do not merge or release.
### Previous PR #41 checkpoint (superseded; captured 2026-11-04 19:14 CET; automated CI only, not release approval)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The exact source/test HEAD at this evidence capture is [`b4fd973c26504eacc34a7802600b3ba7057ec213`](https://github.com/milanradics89-beep/POS-Doctor/commit/b4fd973c26504eacc34a7802600b3ba7057ec213).

All three required workflows completed successfully for this exact SHA:
- [Validation 41879055184](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184): backend [126746469896](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469896), frontend/Android [126746470124](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746470124), and iOS [126746469773](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469773) all succeeded.
- [CodeQL 41879055302](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302), analyze [126746469861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302/job/126746469861), succeeded.
- [Dependency Review 41879055228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228), job [126746469147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228/job/126746469147), succeeded.

The iOS Release simulator build and install/launch smoke test passed on the exact HEAD, so backlog item #1 is now Done. This does not satisfy physical-device App Attest acceptance (#4). Issue [#53](https://github.com/milanradics89-beep/POS-Doctor/issues/53) was closed as completed after this exact-head Validation passed.

The backlog is **3 Done / 15 In Progress / 7 Blocked**. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces strict required checks, PR/approval rules, resolved threads, deletion/non-fast-forward protection, and no bypass actors. All 11 inline PR #41 review threads are resolved; 15 review submissions are recorded and none is APPROVED. One human approval and last-push approval remain required.

Dependency Review reports zero vulnerable packages, zero incompatible licenses, and zero invalid SPDX definitions, but one unknown-license package and two low OpenSSF Scorecard results remain. Runtime npm audit still reports 11 moderate transitive glob/minimatch advisories. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected integration and remain **unverified**, not zero.

The evidence below is automated CI only. Production provider configuration, physical-device tests, approved staging load/restore drills, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open. The documentation-only commit created by this refresh is a new child of the validated source/test HEAD and must pass its own exact-HEAD Validation, CodeQL, and Dependency Review.

### Previous validated source/test baseline (superseded for exact-head CI by `e369011`; source/test HEAD `b4fd973c26504eacc34a7802600b3ba7057ec213`)

The validated source/test commit is [`b4fd973`](https://github.com/milanradics89-beep/POS-Doctor/commit/b4fd973c26504eacc34a7802600b3ba7057ec213), whose parent is [`ce96ec1`](https://github.com/milanradics89-beep/POS-Doctor/commit/ce96ec16da5278819b359f2e2ccd9cbb6f7b709f). All required workflows completed successfully for the exact SHA:

- [Validation 41879055184](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184):
  - Backend [126746469896](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469896): **377 tests passed**, **24 production-readiness checks passed**, **35 production-security checks passed**; `pip-audit` reported no known vulnerabilities. Pytest/readiness each emitted a non-blocking Starlette/httpx TestClient deprecation warning; Redis emitted the runner-host `vm.overcommit_memory` warning.
  - Frontend/Android [126746470124](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746470124): TypeScript/typecheck and **227 unit tests across 55 files** passed; Android Release build and emulator install/launch smoke test passed. Runtime `npm audit --omit=dev --audit-level=high` still reports **11 moderate** transitive `glob`/`minimatch` advisories; no forced dependency downgrade or audit-threshold reduction was applied.
  - iOS [126746469773](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469773): native project generation, CocoaPods installation, Release simulator build, simulator installation, and app launch smoke test passed. This is simulator evidence only, not physical-device App Attest acceptance.
- [CodeQL 41879055302](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302), analyze job [126746469861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302/job/126746469861), succeeded. The log includes a non-fatal SARIF column-kind mismatch warning; success is not a claim that the separate alert inventory is empty.
- [Dependency Review 41879055228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228), job [126746469147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228/job/126746469147), succeeded: **0 vulnerable packages**, **0 incompatible licenses**, **0 invalid SPDX definitions**, **1 unknown-license package** (vendored `vendor/deepmerge@4.3.2`; checked-in manifest/LICENSE declare MIT), and **2 below-threshold Scorecard results**: `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).

The source/test change [`b4fd973`](https://github.com/milanradics89-beep/POS-Doctor/commit/b4fd973c26504eacc34a7802600b3ba7057ec213) closes a production configuration fail-open edge case: production startup now validates the parsed Google Play signing-certificate pin list and rejects comma/whitespace-only values such as `,,,`. Regression tests cover malformed empty lists and the valid digest path; `backend/.env.example` now describes the pin as required when production Google Play Integrity is selected. This is not evidence of a Play-installed physical-device test.

All 11 inline PR #41 review threads are resolved. The five tracked client/request/privacy findings are verified in current source/tests: POST retry fixtures use explicit auth; `sessionAuthEligible` evaluates the effective `Request`/init headers and method; the `vision_usage` privacy test uses a valid base64 image data URI; the app error boundary logs only the error name rather than the raw Error object; and permanently denied camera/gallery permissions offer Settings recovery. The Redis readiness P2 finding is fixed by preflighting `PEXPIRE` on both probe keys before the mutating Lua probe, with regression tests that deny either preflight and assert the Lua script is not invoked.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, plus pull requests, one approval, last-push approval, and resolved review threads; deletion/non-fast-forward updates are blocked and bypass actors are empty. Issue [#53](https://github.com/milanradics89-beep/POS-Doctor/issues/53) is closed after the exact-head Validation pass.

The GitHub Releases endpoint is empty. Complete Code Scanning, Dependabot, and Secret Scanning inventories remain **unverified** because the connected integration does not expose them. This evidence does not satisfy physical-device App Attest/Play Integrity, production secrets/provider configuration, staging load/backup-restore, production monitoring, staged rollout, pilot/business approval, or the human PR approval gates.

### Previous validated exact-head CI baseline (superseded by b4fd973; historical evidence captured before 2026-11-04 19:14 CET)

At evidence capture, PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The latest fully validated commit is the documentation-only HEAD [`9b730a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9b730a9086b0b35cb5dd774119ec3115cb8c12b5), whose parent is [`bc2fef2`](https://github.com/milanradics89-beep/POS-Doctor/commit/bc2fef2f7ab9be39c0ae730c45d253b52b6aa47c). All three required workflows completed successfully for the exact SHA `9b730a9086b0b35cb5dd774119ec3115cb8c12b5`:

- [Validation 41817720466](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720466): backend [126532703223](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720466/job/126532703223), frontend/Android [126532647348](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720466/job/126532647348), and iOS [126532648321](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720466/job/126532648321) all completed successfully.
- [CodeQL 41817720556](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720556), analyze job [126532647549](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720556/job/126532647549), succeeded and uploaded combined JavaScript/Python SARIF. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 41817720467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720467), dependency-review job [126532647866](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41817720467/job/126532647866), succeeded.

Backend validation reported **374 tests passed**, **24 production-readiness checks passed**, and **32 production-security checks passed**. The backend test and readiness suites each emitted one non-blocking Starlette/httpx TestClient deprecation warning. Backend `pip-audit` reported no known vulnerabilities. Redis emitted a runner-host `vm.overcommit_memory` warning; the job still completed successfully.

Frontend validation passed the USEIT source-boundary guard, TypeScript typecheck, **219 unit tests across 54 test files**, Expo Doctor (**21/21 checks**), Android export/Release build, Android emulator install/launch smoke test, and the configured runtime dependency-audit threshold. The npm audit still reports **11 moderate** transitive `glob`/`minimatch` advisories: [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4) and [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249). No forced Expo downgrade or audit-threshold reduction was applied.

iOS native generation, CocoaPods installation, Release simulator build, and simulator install/launch smoke test passed. Simulator evidence is not physical-device App Attest acceptance. The build still emits non-blocking React Native/Hermes script-phase and JavaScript global-reference warnings.

Dependency Review found no vulnerable packages at severity high or higher and no denied packages. It still reports unknown lockfile license metadata for vendored `vendor/deepmerge@4.3.2` (the checked-in manifest and LICENSE declare MIT), plus below-threshold OpenSSF Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). These supply-chain warnings remain open for owner risk acceptance or a verified compatible remediation.

All **11 inline PR #41 review threads are resolved**. The **15 recorded review submissions contain no `APPROVED` review**; the required human approval and last-push approval gates remain outstanding. The five tracked client/request/privacy findings are covered by source/tests: explicit-auth POST retry fixtures; effective Fetch `Request`/init headers and method handling; valid base64 image data in the `vision_usage` privacy test; error-boundary logging without raw `Error` objects; and Settings recovery for permanently denied camera/gallery permissions. The Redis readiness P2 finding was fixed by preflighting `PEXPIRE` on both probe keys before the mutating Lua probe, with regression coverage for denial on either key; the fixture follow-up is included in this validated branch.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Main is protected by active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589), which requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved threads; it blocks deletion and non-fast-forward updates and has no bypass actors. The main branch API reports `protected: true`.

Issue [#50](https://github.com/milanradics89-beep/POS-Doctor/issues/50) is closed after the Redis readiness fixture repair. Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL action-version failure; the current exact-head CodeQL run succeeded. The GitHub Releases endpoint is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Physical-device iPhone App Attest with production entitlement, Play-installed Android Play Integrity, production provider secrets/configuration, an owner-approved staging load probe, witnessed backup/restore, production monitoring and alert delivery, staged rollout, pilot thresholds/business approval, the moderate npm-audit risk decision, and human PR approval remain outstanding. Do not infer completion from source presence, CI, simulators, or emulators.

The workflow runs above validate only `9b730a9086b0b35cb5dd774119ec3115cb8c12b5`. The documentation-only commit created from this baseline is not covered by these runs; its own Validation, CodeQL, and Dependency Review must complete successfully for its exact SHA before merge. This is automated CI evidence only, not production, physical-device, pilot, or business sign-off.
### Previous validated exact-head automated CI baseline (superseded by latest evidence above; 2026-11-04)

At evidence capture, PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main`. Validation, CodeQL, and Dependency Review all completed successfully for this exact commit. This is a documentation-only commit; the latest application source/test change remains [`a68af8c`](https://github.com/milanradics89-beep/POS-Doctor/commit/a68af8c62947ba5fd550c8111c347d0206043581).

- [Validation 41763663588](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663588): backend [126356906764](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663588/job/126356906764), frontend/Android [126356907059](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663588/job/126356907059), and iOS [126356907122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663588/job/126356907122) all succeeded.
- [CodeQL 41763663596](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663596), analyze job [126356906774](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663596/job/126356906774), succeeded and uploaded JavaScript/Python SARIF. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 41763663592](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663592), dependency-review job [126356906638](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41763663592/job/126356906638), succeeded.

Backend validation reported **363 tests passed**, **24 production-readiness checks passed**, and **26 production-security checks passed**. The backend test and readiness suites each emitted one non-blocking Starlette/httpx TestClient deprecation warning. Backend `pip-audit` reported **no known vulnerabilities**. Redis emitted a runner-host `vm.overcommit_memory` warning; the job still completed successfully.

Frontend validation passed the source-boundary guard, TypeScript typecheck, **219 unit tests across 54 test files**, Expo Doctor (**21/21 checks**), Android export/Release build, and Android emulator install/launch smoke test. The configured runtime npm audit threshold passed but still reports **11 moderate** transitive `glob`/`minimatch` advisories. No forced Expo upgrade or audit-threshold reduction was applied. iOS native generation, CocoaPods installation, Release simulator build, and simulator install/launch smoke test passed. Emulator/simulator evidence is not physical-device acceptance.

Dependency Review found **no vulnerable packages at severity high or higher** and **no denied packages**. It still reports unknown lockfile license metadata for vendored `vendor/deepmerge@4.3.2`, although its checked-in manifest and LICENSE declare MIT, plus low OpenSSF Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). No forced dependency downgrade, security-check weakening, or audit-threshold reduction was applied.

The five tracked source findings remain covered by source/tests: explicit-auth POST retry fixtures; effective Fetch `Request`/init headers and method handling; a valid base64 image data URI in the `vision_usage` privacy test; error-boundary logging without raw `Error` objects; and Settings recovery for permanently denied camera/gallery permissions. App Attest same-evidence recovery also has retry coverage.

All **10 inline PR #41 review threads are resolved**. The **12 recorded review submissions contain no `APPROVED` review**; the one-human-approval and last-push-approval gates remain outstanding. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is enforced and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull requests, one approval, last-push approval, and resolved threads; it blocks deletion and non-fast-forward updates and has no bypass actors.

Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL action-version failure; current exact-head CodeQL succeeded. Issue [#50](https://github.com/milanradics89-beep/POS-Doctor/issues/50) is closed after the Redis readiness fixture fix. PRs [#43](https://github.com/milanradics89-beep/POS-Doctor/pull/43) and [#44](https://github.com/milanradics89-beep/POS-Doctor/pull/44) must not be merged independently; draft PR [#49](https://github.com/milanradics89-beep/POS-Doctor/pull/49) contains the atomic update. Design PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains draft. The GitHub Releases endpoint is empty.

The connected GitHub integration does not expose complete Code Scanning, Dependabot, or Secret Scanning alert inventories. Their status remains **unverified**, not zero. The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Physical-device iPhone App Attest, Play-installed Android Play Integrity, production provider secrets/configuration, owner-approved staging load probe, witnessed backup/restore, production monitoring and alert delivery, staged rollout, pilot thresholds, moderate npm-audit risk acceptance, and human approval remain outstanding.

The run links above validate only `f2596072f77af2c9f3b390ca56175e6ea6111152`; they do not establish the status of a later descendant. At that earlier evidence capture, the documentation-only refresh was a child of this baseline and required its own exact-SHA checks. That historical gate is superseded by the newer validated evidence above. This is automated CI evidence only, not production, physical-device, pilot, or business sign-off.

## Previous validated release evidence
## Previous validated release evidence (superseded by current exact-head evidence) (2026-11-03; exact validated SHA: `45ac420857dfce396e0668732e91ed7301fd126e`; at that earlier evidence capture, PR HEAD `98e47ff` had failed/incomplete Validation; superseded by validated SHA `34c5328`; not production sign-off)

PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`. Exact parent HEAD [`45ac420`](https://github.com/milanradics89-beep/POS-Doctor/commit/45ac420857dfce396e0668732e91ed7301fd126e) passed all three required workflows. It is a documentation-only commit; the latest application-source/test change remains [`531463f`](https://github.com/milanradics89-beep/POS-Doctor/commit/531463f3d116aad3b62e184fcd83e2ff88d168f2).

- [Validation 41637571857](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857): backend [125922528423](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528423), frontend/Android [125922528813](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528813), and iOS [125922528824](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528824) succeeded.
- [CodeQL 41637571829](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571829), analyze job [125922529123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571829/job/125922529123), succeeded.
- [Dependency Review 41637571753](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571753), job [125922527983](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571753/job/125922527983), succeeded.

Backend reported 358 tests passed with one Starlette deprecation warning, 24 production-readiness checks passed with one warning, 24 security checks passed, and dependency audit passed. Frontend typecheck/unit tests, Expo health, Android export/Release build/emulator smoke test, runtime dependency audit, and iOS Release simulator build/smoke test passed. The runtime npm audit still reports 11 moderate transitive `glob`/`minimatch` advisories.

Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 Scorecard warnings. CodeQL succeeded with a non-fatal SARIF column-kind mismatch warning. No forced Expo downgrade or audit-threshold reduction was applied.

The source/test commit [`98e47ff`](https://github.com/milanradics89-beep/POS-Doctor/commit/98e47ffd876b890c36f383ae8f24a31a48b1d33d) enforces Redis-backed shared rate limiting in production. Its exact-head [Validation 41644216597](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597) failed: backend job [125959862517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959862517) failed on `test_production_allows_explicit_cors` because the shared `_production()` test helper did not set the newly required Redis rate-limit mode and URL; frontend job [125959865478](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959865478) passed; iOS job [125959863083](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959863083) failed because the simulator install/launch smoke-test step exceeded its 10-minute timeout after installation succeeded. Exact-head [CodeQL 41644216720](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216720), analyze job [125945163427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216720/job/125945163427), and [Dependency Review 41644216711](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216711), job [125945162610](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216711/job/125945162610), passed. GitHub opened issue [#50](https://github.com/milanradics89-beep/POS-Doctor/issues/50) for the repeated Validation failure.

The backend failure is a stale test fixture, not a production policy failure: `_production()` omitted `USEIT_RATE_LIMIT_MODE=redis` and `USEIT_REDIS_URL`. The iOS job failed at the simulator launch smoke test after the installation step; the 10-minute timeout is recorded separately and is not being masked by increasing the timeout without further evidence. This update fixes the fixture and closes a separate readiness gap: production `/ready` must require Redis rate-limit mode and ping the shared Redis dependency regardless of whether App Attest is enabled. The child commit [`a68af8c`](https://github.com/milanradics89-beep/POS-Doctor/commit/a68af8c62947ba5fd550c8111c347d0206043581) has now passed its own exact-HEAD Validation, CodeQL, and Dependency Review workflows; see the current evidence section above. This is automated CI evidence only, not production approval.

Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is verified; issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. All 10 inline PR #41 review threads are resolved, but no `APPROVED` review submission is recorded. Issue #46 remains open; PRs #43/#44 are one-sided CodeQL updates and must not be merged independently; draft PR #49 contains the atomic update. PR #48 remains draft. GitHub Releases is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories remain unverified.

## Previous verified release evidence (superseded by f0c937; exact PR HEAD at evidence capture: `40b79d4`)

- PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`. Exact HEAD [`40b79d4`](https://github.com/milanradics89-beep/POS-Doctor/commit/40b79d41d304fb949e3576447487377672845455) passed Validation, CodeQL, and Dependency Review. This is a documentation-only commit whose parent is [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303); latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). PR base and `main` HEAD were both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head [Validation 41552250326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326), [CodeQL 41552250336](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336), and [Dependency Review 41552250325](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325) all succeeded for `40b79d41d304fb949e3576447487377672845455`. Validation jobs: backend [125642452241](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452241), frontend/Android [125642452698](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452698), and iOS [125642452623](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452623). CodeQL analyze [125642453074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336/job/125642453074) and Dependency Review [125642452207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325/job/125642452207) also succeeded.
- Backend: 356 tests passed with one warning; production-readiness checks and backend dependency audit passed. Frontend typecheck, unit tests, Expo Doctor, Android export/Release build/emulator smoke test, and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build and install/launch smoke test passed.
- Dependency Review found no high-or-higher vulnerable packages and no denied packages. It flagged unknown license metadata for `vendor/deepmerge@4.3.2`, plus Scorecard scores below threshold 3 for `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The frontend runtime audit passed its high-severity threshold but still reported 11 moderate advisories. No forced Expo downgrade or audit-threshold reduction was applied. CodeQL succeeded and uploaded SARIF with a non-fatal column-kind mismatch warning.
- Current source/tests retain explicit-auth POST retry fixtures, effective Request/init header and method handling, a valid base64 vision privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest enrollment only after server acceptance with pending evidence persisted before network submission.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it requires PRs and one approval, dismisses stale approvals, requires last-push approval and resolved threads, blocks deletion/non-fast-forward updates, and has no bypass actors. The legacy branch-protection detail endpoint returned 403 to this integration during this run; the active ruleset itself was verified.
- PR #41 had nine inline review threads at capture: eight resolved and one open P2 thread on exact-head evidence wording. This update records the verified `40b79d4` baseline and leaves the new documentation-only child’s own CI gate explicit. No `APPROVED` review submission is currently recorded.
- [Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded. GitHub Releases is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.
- Backlog status remains **3 Done / 15 In Progress / 7 Blocked**. This is not production sign-off. Physical-device attestation, production provider configuration, approved staging load probe, backup/restore, production monitoring, staged rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain open. The documentation-only commit created by this refresh is a new child of `40b79d4`; its own Validation, CodeQL, and Dependency Review must pass before merge.

## Superseded 25-point status register (captured 2026-11-09 13:35 CET)

- PR #41 remains open, unmerged, and non-draft. Exact PR HEAD [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303) passed Validation, CodeQL, and Dependency Review. The latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f); `f79da96` is documentation-only. PR base and `main` HEAD both equal `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head [Validation 41541825237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237), [CodeQL 41541825206](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206), and [Dependency Review 41541825120](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120) all succeeded for `f79da966d0d6a257feebf37db05ad2cfe1ea6303`. Validation jobs: backend [125607650851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650851), frontend/Android [125607650527](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650527), and iOS [125607650926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650926) all completed successfully. CodeQL analyze [125607650491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206/job/125607650491) and Dependency Review [125607649545](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120/job/125607649545) also succeeded.
- Backend compilation, full tests, production-readiness checks and dependency audit passed. Frontend source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export/Release build/emulator smoke test and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build and install/launch smoke test passed.
- Dependency Review reported no vulnerable packages at severity high or higher and no denied packages; it flagged unknown license metadata for local `vendor/deepmerge@4.3.2`, plus two Scorecard scores below threshold 3: `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The frontend `npm audit --omit=dev --audit-level=high` step passed its configured threshold but still reported 11 moderate advisories. These warnings remain visible; no forced Expo downgrade or audit-threshold reduction was applied.
- All eight inline PR #41 review threads are resolved. The latest Codex code review for `f79da96` completed with no findings. Current source/tests retain explicit-auth POST retry fixtures, effective Request/init header and method handling, valid base64 privacy data, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest enrollment only after server acceptance.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it requires PRs and one approval, dismisses stale approvals, requires last-push approval and resolved threads, blocks deletion/non-fast-forward updates, and has no bypass actors. Main reports `protected: true`. No APPROVED review submission is currently recorded on PR #41.
- [Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on `9616867170b299797a699929b2939b5571266307`; the current exact-head CodeQL run succeeded, but the historical issue remains open. GitHub Releases is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.
- This CI evidence is not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring delivery, staged store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified. The documentation-only commit created by this evidence refresh must be judged by its own PR checks; the exact parent run IDs above must not be reused as checks for that new SHA.

| # | Workstream | Status | Evidence / next gate |
|---:|---|---|---|
| 1 | iOS CI closure | **Done** | Exact validated-parent iOS job [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) passed Release simulator build and install/launch smoke. Physical iPhone acceptance remains separate item #4. |
| 2 | Main branch protection | **Blocked** | The active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is verified while repository visibility is temporarily public. The owner has not confirmed whether the repository will remain public or return to private under a plan supporting rulesets. Reverify the active ruleset, six strict checks, approval/last-push requirements, resolved threads, no bypass, and deletion/non-fast-forward protection after the final visibility decision. Issue #47 remains open. |
| 3 | Dependency Review warnings | **In Progress** | PR #85 exact-head Dependency Review [43614974249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974249) passed on a documentation-only diff (no dependency files scanned). The current frontend runtime audit `npm audit --omit=dev --audit-level=high` reports **3 moderate** transitive vulnerabilities and no high-or-higher finding at the configured threshold. Expo fingerprint/minimatch compatibility prevents an unsafe global minimatch 11 override. Full Dependabot alert inventory remains unavailable/unverified, not empty. |
| 4 | Physical iPhone App Attest production entitlement | **Blocked** | Apple Developer production capability/App ID, production entitlement provisioning, and provider-backed verification on a supported physical iPhone are required. |
| 5 | Play-installed physical Android Play Integrity | **Blocked** | Play internal-track distribution, Play App Signing certificate identity, Google Cloud service-account permissions, and verification on a physical Android device installed from Play are required. |
| 6 | Redis multi-instance concurrency | **Done** | Exact validated-parent backend job [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957) passed. The unchanged source/test baseline records 450 backend tests with Redis; shared-Redis/multi-client and separate-worker challenge-consumption regression coverage remains in the suite. This does not establish production Redis host settings. |
| 7 | Attestation retry/network/expiry | **In Progress** | Commit [7e8097b](https://github.com/milanradics89-beep/POS-Doctor/commit/7e8097b0927ca1b9f86457b559807fbf3965fde1) adds three regressions for expired, missing, and non-integer challenge expiry before native key creation/attestation. Real network-loss and provider-backed device verification remain open. |
| 8 | Backend production security audit | **In Progress** | PR #85 exact-head backend job passed **450 tests, 27 readiness checks, and 78 security/privacy checks**; `pip-audit` found no known Python dependency vulnerabilities. SSRF source PR #99 exact HEAD `e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9` passed 508 backend tests plus 27/78 checks before retargeting to main; fresh post-retarget PR checks and human security review remain required. Parent #95 exact-head Validation remains 507 passed / 1 failed. Deployed secrets, ingress/CORS, provider identity, live Redis TLS/sysctl, and production host hardening remain environment-verification gates. |
| 9 | Privacy and logging audit | **In Progress** | Exact validated-parent backend job [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957) passed; the unchanged source/test baseline records 78 security/privacy checks. Valid PNG image-data URI and private-intent redaction tests remain in the suite. Production log sink, ingress/access logs, retention, and operator access remain unverified. |
| 10 | Release acceptance evidence | **In Progress** | PR #85 exact HEAD `7ad4ffe14637e2072e8656b461a27eb32085aa25` passed exact-head Validation [43614974247](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974247), CodeQL [43614974171](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974171), and Dependency Review [43614974249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974249). Backend, Android Release/emulator smoke, and iOS Release/simulator smoke passed; CodeQL SARIF upload completed. PR #85 remains open with no human APPROVED review. Final visibility decision, human approval, signing/store distribution, staged rollout, and external pilot/production acceptance remain outstanding. |
| 11 | Mobile regression | **In Progress** | Exact validated-parent frontend/Android job [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800) and iOS job [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399) passed Release build and emulator/simulator smoke. The unchanged source/test baseline recorded 285 tests across 58 files. Physical-device regression remains. |
| 12 | Camera/image processing | **In Progress** | Image-contract and permission tests exist; representative physical capture, camera/gallery flows, and real-photo coverage remain. |
| 13 | Offline/weak network | **In Progress** | Abort/deadline/retry tests exist; real network interruption and reconnect recovery still need device/staging validation. |
| 14 | API timeout/retry | **In Progress** | Commit [`3f6e2cd`](https://github.com/milanradics89-beep/POS-Doctor/commit/3f6e2cd554d1ceda25c8d6f8faa7eaf0ea87e2dc) reuses one AsyncOpenAI client across the FastAPI lifespan, applies a 35-second timeout, disables automatic SDK retries for analysis POSTs, and closes the client on shutdown; earlier request-control tests cover the separate 30-second session-bootstrap cap. Real network interruption and end-to-end POST idempotency remain unproven. |
| 15 | Backend load test | **In Progress** | Commit `c41bb74` adds the production HTTPS-only guard on top of explicit target/origin/approval and redirect guards. Execute only against owner-approved staging with agreed thresholds and recorded results. |
| 16 | Backup/restore | **Blocked** | Production datastore/Redis backup access and a witnessed restore/recovery drill are required. |
| 17 | AI cost optimization | **In Progress** | The shared OpenAI client and `max_retries=0` avoid hidden duplicate billed analysis requests; `vision_usage` token/model telemetry exists. Pricing inputs, per-session budgets, provider-cost reconciliation, and production cost alerts still need owner configuration and validation. |
| 18 | Product-recognition accuracy | **Blocked** | A representative labeled dataset, agreed accuracy metrics, and human evaluation/acceptance are required; no benchmark is claimed. |
| 19 | AI fallback | **In Progress** | Conservative scene and no-candidate shopping fallback code/tests exist; provider-outage and fallback-quality staging evidence remains. |
| 20 | UI loading/empty/error/permission regression | **In Progress** | Permanently denied camera/gallery permissions route to `Linking.openSettings()` and permission-decision tests cover the Settings path. `app/_layout.tsx` logs only the error name, not raw Error objects. Full loading/empty/error/permission matrix and physical-device validation remain. |
| 21 | Monitoring/alerting | **Blocked** | Production monitoring workspace, alert destination, named on-call owner, and alert-delivery tests are required. |
| 22 | Staged rollout | **Blocked** | Production approval, TestFlight/Play track access, rollout gates, and a named rollback owner are required. |
| 23 | Analytics | **In Progress** | `vision_usage` token/model telemetry exists; product funnel, retention, and dashboard validation remain. |
| 24 | Release pipeline | **In Progress** | PR #85 exact HEAD `7ad4ffe14637e2072e8656b461a27eb32085aa25` passed Validation [43614974247](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974247), CodeQL [43614974171](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974171), and Dependency Review [43614974249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43614974249). Android Release/emulator smoke and iOS Release/simulator smoke passed. Signing, store distribution, human approval, promotion, staged rollout, and rollback ownership remain open. |
| 25 | Pilot/business validation | **Blocked** | A real pilot cohort, success/stop thresholds, named business owner, and documented business/release approval are required. |

**Current count: 3 Done / 15 In Progress / 7 Blocked.** Source presence or simulator evidence alone does not satisfy an external acceptance gate.

## Required external hand-offs

- Repository administrator: main ruleset 26370589 is active and verified; issue #47 is closed. Preserve the exact required checks and no-bypass policy.
- Apple/Google owners: configure production attestation identities/permissions and provide store-distributed physical devices.
- Infrastructure owner: provide approved staging/production config, backup/restore, monitoring destination, and written load-test target/threshold approval.
- Product/business owner: provide labeled accuracy data, AI cost budgets, pilot cohort/thresholds, and release approval.



## Previous engineering update (2026-11-01; exact PR head 67f2d545; superseded by c87450df)

- PR #41 remains open and unmerged. Current head is [67f2d545](https://github.com/milanradics89-beep/POS-Doctor/commit/67f2d545247ea276b515a44d06473a466deacc85), a documentation-only evidence refresh whose parent is [dd864aa8](https://github.com/milanradics89-beep/POS-Doctor/commit/dd864aa8d829dbbb4bd60255ad7e0d3d269a94ff). Application source remains unchanged since [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- All required workflows completed successfully for exact head 67f2d545: [Validation 41277283112](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112), [CodeQL 41277282923](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923), and [Dependency Review 41277283456](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456).
- Validation jobs: [backend 124761921658](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921658), [frontend/Android 124761921517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921517), and [iOS 124761921455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283112/job/124761921455) all completed successfully. Backend reported 350 passed and one Starlette/httpx TestClient deprecation warning; the Redis 7.4.12 service emitted a runner-host `vm.overcommit_memory` warning, not a test failure. Android Release/emulator and iOS Release simulator build/install/launch checks passed.
- [CodeQL analyze job 124761921352](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277282923/job/124761921352) succeeded; its SARIF merge logged a column-kind mismatch warning. [Dependency Review job 124761922861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41277283456/job/124761922861) succeeded with no high-or-higher vulnerable packages and no denied packages. The unknown `vendor/deepmerge@4.3.2` license metadata, two low Scorecard findings, and 11 moderate transitive glob/minimatch npm-audit advisories remain. No forced Expo downgrade or threshold reduction was applied.
- Exact observed check-run names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. They are not enforced by a main-branch ruleset.
- All three inline PR #41 review threads are resolved. Source inspection confirms explicit-auth POST retry tests, effective Request/init headers and method selection, a valid base64 image data URI in the vision-usage privacy test, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. `main` reports `protected=false`, the rulesets endpoint is empty, and branch-protection detail reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. The connected integration does not expose complete code-scanning, Dependabot, or secret-scanning alert inventories; their full status remains unverified.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. Physical-device, production-environment, external administration, and human pilot gates remain open.

## Previous engineering update (2026-11-01; exact PR head 77fea7ab; superseded by dd864aa8)

- PR #41 remains open and unmerged. Its current head is `77fea7ab2df95d1baadfcf453afaa9e427e97096`, a documentation-only evidence refresh whose parent is `a5fdcdc0f3302ea12a169c7226c74a9ab2495e9e`; application source remains unchanged since `274fefb6390b2324dfb37b8201279675bf26b481`.
- [Validation 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350) completed successfully: backend, frontend/Android, and iOS jobs all passed. Backend job [124742385604](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385604) used Redis 7.4.12 and reported **350 passed, 1 Starlette/httpx TestClient deprecation warning**. Frontend job [124742385610](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385610) passed the source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124742385450](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385450) passed native project generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41270593270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593270) completed successfully and uploaded combined JavaScript/Python SARIF. The merge emitted a SARIF column-kind mismatch warning; the workflow nevertheless succeeded. The connected integration does not expose the complete code-scanning alert inventory.
- [Dependency Review 41270593238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593238) completed successfully with no high-or-higher vulnerable packages and no denied packages. Warnings remain for unknown license metadata on `package-lock.json » vendor/deepmerge@4.3.2` and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The runtime npm audit still reports 11 moderate transitive `glob`/`minimatch` advisories; the only suggested automatic fix downgrades Expo to 51.0.39, so no forced downgrade or audit-threshold reduction was applied.
- All three inline PR #41 review threads are resolved. The latest source still contains the App Attest enrollment recovery, effective Fetch Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. `main` reports `protected=false`, the rulesets endpoint is empty, and the branch-protection read returns HTTP 403 to the integration; repository-admin action is still required.
- The GitHub releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; their status remains unverified.

## Latest engineering update (2026-11-01; exact PR head 5086e378)

- PR #41 head [5086e37](https://github.com/milanradics89-beep/POS-Doctor/commit/5086e378c29e338bb1bdaaffcce53030e30c9902) is a documentation-only evidence refresh; application source remains unchanged since [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- Exact-head [validation 41257943934](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934) passed backend, frontend/Android, and iOS jobs. Backend job [124705008763](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008763) passed **350 tests with 1 Starlette deprecation warning** using Redis 7.4.12. Frontend job [124705008632](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008632) passed source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124705008758](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943934/job/124705008758) passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41257943925](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943925) and [Dependency Review 41257943924](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41257943924) completed successfully. Dependency Review found no high-or-higher vulnerable packages and no denied packages; the unknown-license metadata warning for `vendor/deepmerge@4.3.2` and two low Scorecard warnings (`@expo/devcert` 2.9, `is-mergeable-object` 1.5) remain. The separate npm audit continues to report 11 moderate transitive advisories.
- All three inline PR #41 review threads are resolved. Current source inspection confirms Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, Settings recovery, and App Attest enrollment recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: main is not protected, no ruleset is active, and the integration cannot read branch-protection details (HTTP 403); administrator action is required.
- The releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; no zero-alert claim is made.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. PR #41 remains open and unmerged; external production and physical-device gates remain open.

## Previous engineering update (2026-11-01; exact PR head 8de5eff)

- PR #41 head [8de5eff](https://github.com/milanradics89-beep/POS-Doctor/commit/8de5effdee8885170e4d80381fe043fb1838e575) is a documentation-only evidence refresh. Its parent [9bbfde2](https://github.com/milanradics89-beep/POS-Doctor/commit/9bbfde2cb2d4a9aef1e10119e01019a954cadf5a) adds the Google Auth Requests transport; application code last changed at [274fefb](https://github.com/milanradics89-beep/POS-Doctor/commit/274fefb6390b2324dfb37b8201279675bf26b481).
- Exact-head [validation 41253959559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559) passed backend, frontend/Android, and iOS jobs. Backend job [124693068128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068128) passed **350 tests with 1 Starlette deprecation warning** using Redis 7.4. Frontend job [124693068427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068427) passed source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS job [124693068327](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959559/job/124693068327) passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL 41253959541](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959541) and [Dependency Review 41253959551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41253959551) completed successfully. Dependency Review found no high-or-higher vulnerabilities or denied packages; one unknown-license entry (`vendor/deepmerge@4.3.2`) and two low Scorecard warnings (`@expo/devcert` 2.9, `is-mergeable-object` 1.5) remain. The separate npm audit continues to report 11 moderate transitive advisories.
- All three inline PR #41 review threads are resolved. The Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, Settings recovery, and App Attest enrollment recovery were rechecked in the current source.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The repository reports `main.protected=false`, no active rulesets, and HTTP 403 for branch-protection reads through the integration; administrator action is required.
- The releases endpoint is empty. Complete code-scanning and Dependabot alert inventories are not exposed by the connected integration; no zero-alert claim is made.
- Backlog remains **2 Done / 15 In Progress / 8 Blocked**. PR #41 remains open and unmerged; external production and physical-device gates remain open.



## Engineering update (2026-10-31; historical)

- Documentation-only commit `3756175afb93fc9886b97b99f1e44220173e9054` passed [validation 41228116353](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116353), [CodeQL 41228116244](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116244), and [Dependency Review 41228116350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41228116350). This is the latest fully validated PR head; application source code remains unchanged from `c95530f88254697704d45ba385cf0bb3d0ea5170`.

- Commit [`c95530f`](https://github.com/milanradics89-beep/POS-Doctor/commit/c95530f88254697704d45ba385cf0bb3d0ea5170) replaces Redis calendar-minute counters with an atomic Redis-server-time sliding 60-second window. The Lua operation prunes expired events, counts, admits/rejects, and updates TTLs atomically; the backend tests cover the minute-boundary case and 32 concurrent requests across independent clients. Backend, frontend, and iOS jobs passed in [validation run 41220026884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41220026884); CodeQL and Dependency Review also passed for this exact source SHA.
- Dependency Review still reports the known one unknown-license metadata warning and two low Scorecard warnings; the separate npm audit high threshold passes while 11 moderate transitive `glob` / `minimatch` advisories remain.
- Privacy hardening commit [`9da15a9`](https://github.com/milanradics89-beep/POS-Doctor/commit/9da15a95b2515339c050d1ab3b22cda10d0db8f7) masks memory capability IDs in request paths and adds success/error-path sentinel tests. Those tests remain in the current source tree and the exact-source backend/frontend jobs passed.
- All three inline PR #41 review threads are resolved; current source inspection confirms the previously identified request-auth, privacy fixture, error-boundary, and permission-recovery findings are addressed.
- No production log-sink or ingress/access-log configuration was available for verification; item 9 remains In Progress.

## Dependency and supply-chain investigation

The exact-head [Dependency Review run 42012930359](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42012930359), job [127196218199](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/42012930359/job/127196218199), reports no high-or-higher vulnerable packages and no denied packages. It still reports unknown license metadata for the local file dependency `vendor/deepmerge@4.3.2`, and OpenSSF Scorecard below the repository threshold for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).

- `vendor/deepmerge/package.json` declares MIT and `vendor/deepmerge/LICENSE` contains the MIT text. The lockfile represents it as a local file link, so Dependency Review still cannot associate the license metadata with the dependency node. Do not claim the warning is cleared.
- `@expo/devcert@1.2.2` declares MIT; its Scorecard result remains 2.9.
- `is-mergeable-object@1.1.1` declares MIT; its Scorecard result remains 1.5.

These are supply-chain metadata/posture warnings, not high-severity vulnerability findings. Keep them visible and record the project owner's risk decision or a verified upstream/remediation path. The connected integration does not expose complete Code Scanning, Dependabot, or Secret Scanning alert inventories; those inventories remain unverified, not zero.

### Previous npm audit findings (latest completed on parent HEAD 7568e29; not rerun on 9e3641)

The latest completed frontend runtime audit was on parent HEAD `7568e29773b347292624f303d33c0a9ddfe77ee4` in [Validation 41997774484](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41997774484). It ran `npm audit --omit=dev --audit-level=high` and exited successfully because the report contained 11 moderate advisories and no high/critical findings. The current exact-head `9e3641e` frontend job skipped this audit after Expo Doctor failed; do not describe the 11-advisory result as a fresh audit:

- `glob@13.0.6` is affected by [GHSA-3g3m-2fjr-6pw4](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4), a moderate AbortSignal cancellation-bypass issue.
- `minimatch@10.2.6` is affected by [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), a moderate globparts-amplification denial-of-service issue.
- Both are transitive in the npm non-dev dependency graph through Expo SDK 57 tooling. This classification does not prove that the packages are included in the shipped JavaScript bundle or reachable in the app's runtime paths.
- `npm audit fix --force` proposed installing Expo `51.0.39`, a breaking SDK downgrade. It was not run. Verify a compatible upstream patch or a tested override before changing the lockfile; otherwise record an explicit owner risk decision and retain the warnings.

Do not conflate the npm audit report with Dependency Review's vulnerable-package count, and do not lower the audit threshold to make the pipeline green.
## Engineering work started on 2026-10-30

- API retry safety: prevent duplicate billable/state-changing POST work by disabling automatic POST retries until the backend implements and tests idempotency-key enforcement; bound session bootstrap time; add regression tests.
- Attestation HTTP deadlines: each session bootstrap, challenge and evidence-submission fetch has a 10-second AbortController-backed deadline; abort and exact same-evidence retry regressions passed on `78402c8` in [validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523).
- Load testing: add a bounded, opt-in Node.js harness for staging with explicit POST opt-in and machine-readable latency/status metrics.
- AI cost observability: emit only validated token counts and model identifier from vision responses; add regression coverage that verifies image and user-intent sentinels never reach logs.
- Privacy: commit `78402c8` redacts prompt/user-prompt/user-intent aliases; sentinel regression tests prove user-intent and prompt values are absent from structured logs. Exact-head frontend/backend CI passed in [validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523). Production log-sink and retention review remain open.

## Remaining engineering actions

- Real-device network interruption and provider-backed attestation recovery still need physical-device verification; the automated 10-second deadline and same-evidence retry tests pass on the exact current head.
- Validate client cancellation and retry behavior under real network loss.
- Execute the load harness against an approved staging target and agree capacity thresholds before interpreting results.
- Continue the UI-state matrix, AI cost measurement, monitoring/alert wiring, and release artifact workflow where repository-only work is possible.

## Release decision

The PR remains open and must not be merged until all required checks pass for the exact final SHA and all externally verifiable release gates have recorded evidence. A blank or unverified acceptance item is not a pass.


## Exact-head refresh — 2026-11-14 02:56 CET

PR #85 current exact HEAD at this checkpoint: `599888db0015ce5de636d2ae81c472f793fa946f` (commit `docs(release): record current exact-head CI and release gates`). The immediately preceding PR #85 head `e3d99b1f58b2133318d168ec4c20e58b515cf2c2` and its workflow results are historical; they are not evidence for this SHA.

Exact-head workflows for `599888db0015ce5de636d2ae81c472f793fa946f`:
- Validation [43539914540](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43539914540): **failure**. The jobs endpoint reports backend, frontend, and iOS jobs as failed. The connected log-download endpoint returned `BlobNotFound` for these job logs, and the step endpoint returned no steps; the specific failure cause is therefore **unverified**, not inferred.
- CodeQL [43539914530](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43539914530): **failure**. This repository's Code Scanning feature is not enabled; the failure is recorded separately in issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84). Do not treat generated SARIF as a successful upload or weaken the workflow.
- Dependency Review [43539914663](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43539914663): **failure**. The job log explicitly reports that Dependency Review is unsupported until Dependency Graph and GitHub Advanced Security are enabled for this repository under a supported plan.

The current 25-row register and all current tally statements reconcile to **2 Done / 15 In Progress / 8 Blocked**. The main branch-protection row is Blocked; external production/device/pilot rows remain Blocked. The P2 tally review thread `PRRT_kwDOSkaDTM63ShCN` is resolved after verifying the current table/footer and historical 3/15/7 checkpoints.

Main remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. This documentation branch remains open and unmerged. No release/pilot acceptance is granted. Do not inherit PR #41 or main CI results for this PR #85 head.


## Latest 25-point status checkpoint — 2026-11-14 03:10 CET

### PR #41 merged release baseline

PR [#41](https://github.com/milanradics89-beep/POS-Doctor/pull/41) remains closed and merged. Reviewed source HEAD: `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit and current `main` baseline: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #41 exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all completed successfully. The review inventory is 108 timeline records, 22/22 inline threads resolved, and 26 review submissions (25 COMMENTED, 1 human APPROVED). Post-merge main Validation [43503743786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743786) and CodeQL [43503743752](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43503743752) passed. No separate post-merge Dependency Review run is claimed.

The merged source branch still exists. Its comparison with `main` is 517 commits ahead / 1 behind after the merge; do not treat the old source branch as the current development base or force-update it.

### Current documentation branch gate — PR #85

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) remains open and unmerged on `docs/post-merge-release-evidence-20261113`, targeting `main`. Current exact HEAD: `e77a6148e8e91f58eeb7b392dc0e164ff7454058`; base/main HEAD at this capture: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR has 5 commits and changes the three release-record files.

Exact-head workflows for `e77a6148e8e91f58eeb7b392dc0e164ff7454058` all completed with **failure**:
- Validation [43543607206](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607206): **failure**. The jobs endpoint reports backend [132290218849](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607206/job/132290218849), frontend [132290218450](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607206/job/132290218450), and iOS [132290218694](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607206/job/132290218694) as failed. The connected steps endpoint returned no steps and log downloads returned HTTP 404 `BlobNotFound`; the specific Validation failure cause is **unverified**.
- CodeQL [43543607212](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607212): **failure**; analyze job [132289579051](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607212/job/132289579051) failed. The current job steps/logs were unavailable through the connector (`BlobNotFound`), so the exact cause on this SHA is **unverified**. Issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84) separately records exact-head evidence on PRs #90/#91 that Code Scanning is not enabled for this private repository; PR #87's job-scoped `actions: read` permission did not resolve that repository-level blocker. Do not infer a successful CodeQL upload from SARIF generation.
- Dependency Review [43543607326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607326): **failure**; dependency-review job [132289579083](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43543607326/job/132289579083) failed. Current logs were unavailable through the connector (`BlobNotFound`), so the exact cause on this SHA is **unverified**. Prior PR #85 runs and issue #84 document the repository capability blocker: Dependency Graph / GitHub Advanced Security is unavailable or not enabled for the current private-repository plan. Do not remove or skip the check.

These results belong only to exact HEAD `e77a614`. Do not substitute PR #41 or main's successful CI. PR #85 currently has one resolved P2 review thread and one COMMENTED review submission anchored to an earlier head; no human approval for the current head is recorded.

### Governance, security and external acceptance

The repository remains private. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is open. The last observed main branch metadata reported `protected: false`; the rulesets API returned HTTP 403 requiring GitHub Pro or public visibility. This remains an owner action and current branch-protection enforcement is not verified. Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. PRs [#70](https://github.com/milanradics89-beep/POS-Doctor/pull/70) and [#79](https://github.com/milanradics89-beep/POS-Doctor/pull/79) passed their own exact-head CI but remain separate, unmerged branches; their results are not integrated SSRF acceptance on main.

The connected GitHub integration does not expose a current releases-list or security-alert inventory endpoint. The last recorded repository checkpoint reported 0 published releases, but that count is **not independently refreshed in this run**. Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**.

### Current register and release decision

The 25 row-level statuses remain **2 Done / 15 In Progress / 8 Blocked**: Done #1 and #6; Blocked #2, #4, #5, #16, #18, #21, #22, and #25; the remaining 15 are In Progress. Do not promote physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, real-user-pilot, or business-approval items based on CI, simulator, or emulator evidence. Pilot/production acceptance remains **NOT GRANTED**.

PR #85's current exact-head Validation, CodeQL, and Dependency Review are terminal failures, so no workflow is queued/running on this PR #85 SHA at this checkpoint. Any next commit must first refresh PR #41's exact head and required Actions states again, and must be followed by new exact-head CI evidence.


## Exact-head retry checkpoint — 2026-11-14 03:55 CET

PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) is open, unmerged, targets `main`, and currently contains 6 commits across the three release-record files. The current exact HEAD before this documentation update is `3e2c41a0743239cbaf1cb6b46083f7630e8c4e8f`; main/base HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.

Exact-head workflow evidence for `3e2c41a0743239cbaf1cb6b46083f7630e8c4e8f`:

- Validation [43545088697](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43545088697), retry attempt 2: **failure before runner assignment**. Backend job `132306003577`, frontend job `132306003276`, and iOS job `132306003548` each completed within approximately 2–4 seconds with empty `runner_name`, zero steps, and no downloadable log (`BlobNotFound`). This does not establish a test failure or pass; the validation code was not shown to execute.
- CodeQL [43545088627](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43545088627): **failure**. The exact-head job log was unavailable, so no run-specific failure cause is inferred. Repository-level Code Scanning configuration is separately confirmed as blocked in issue [#84](https://github.com/milanradics89-beep/POS-Doctor/issues/84).
- Dependency Review [43545088618](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43545088618): **failure**. The exact-head log was unavailable; the repository-level Dependency Graph / GitHub Advanced Security capability blocker is documented in issue #84. Do not skip or remove this check.

The P2 status-tally review thread `PRRT_kwDOSkaDTM63ShCN` remains resolved (1/1). The row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Historical 3/15/7 totals remain historical only.

The repository is private. Current main branch metadata reports `protected: false`, and the rulesets API returns HTTP 403 with the GitHub Pro/public-visibility requirement. This governance gate remains Blocked and requires repository-owner action. No branch-protection setting was changed in this run.

This checkpoint records failure and infrastructure evidence only. It does not grant release or pilot acceptance, and it does not substitute main's or PR #41's successful CI for this PR's exact-head checks. All physical-device, production, monitoring, staged-rollout, pilot, and business-approval gates remain open until independently evidenced.


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

## Verified repository checkpoint — 2026-11-14 22:59 CET

**Release decision: NOT READY. Pilot/production acceptance: NOT GRANTED.** This checkpoint supersedes the 22:08 CET repository checkpoint above. It records only the latest exact-head evidence and current GitHub configuration.

### Repository and main governance
- Repository visibility is currently **public**. Live inventory: **74 branches, 39 open PRs, 7 open non-PR issues, 0 published GitHub Releases**.
- Current main HEAD: \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`.
- The GitHub branch metadata endpoint reports \`protected: true\`. Active repository ruleset [Protect main, ID 26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and requires a pull request, one approval, stale-review dismissal, last-push approval, resolved review threads, and strict \`CodeQL\`, \`backend\`, \`frontend\`, \`ios\`, \`analyze\`, and \`dependency-review\` checks. Deletion and non-fast-forward updates are blocked; bypass actors are empty and current-user bypass is \`never\`.
- The legacy \`/branches/main/protection\` detail endpoint returns HTTP 403 to the connected integration and the branch payload's legacy \`protection.enabled\` field is false. This does **not** negate the separately readable active ruleset and \`protected: true\` branch metadata. No protection setting was changed.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed/completed after live ruleset verification. The repository's final public/private decision remains an owner decision; current public visibility is not treated as permanent authorization.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unavailable/unverified, not empty**. No zero-alert claim is made.

### PR #85 — exact-head release-documentation CI
- PR [#85](https://github.com/milanradics89-beep/POS-Doctor/pull/85) exact parent HEAD \`3268fb78da02f3c2f0843f8455ac065683712651\` completed all required workflows successfully:
  - Validation [43641492814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492814): SUCCESS.
  - CodeQL [43641492911](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492911): SUCCESS; Analyze completed.
  - Dependency Review [43641492818](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43641492818): SUCCESS.
- Exact Validation job logs: backend **450 passed**, readiness **27 passed**, production-security **78 passed**; cryptography **50.0.2**; pip-audit: **No known vulnerabilities found**. Frontend **289/289 tests across 59/59 files**, Expo Doctor **21/21**, Android Release build and emulator install/launch smoke passed, and iOS Release build and simulator install/launch smoke passed.
- Runtime npm audit reports **3 moderate** findings for \`minimatch 10.2.6\` via \`@expo/fingerprint 0.20.16\`, advisory [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249); no high/critical finding was reported at the configured \`--audit-level=high\` threshold. The advisory's patched version is \`11.0.1\`; the SDK 57 lock currently resolves \`@expo/fingerprint 0.20.16\` with \`minimatch ^10.2.6\`. \`npm audit fix --force\` proposes downgrading Expo to 52.0.49. Do not force a major override or downgrade without a tested SDK-compatible migration.
- The single P2 status-tally review thread is resolved/outdated. Human reviewer \`tarlaci1984-sketch\` was requested on PR #85; no human APPROVED review has yet been submitted. PR remains open and unmerged. The new documentation commit below requires its own exact-head CI.

### SSRF — PR #99 and issue #64
- PR [#99](https://github.com/milanradics89-beep/POS-Doctor/pull/99) remains draft, base \`main\` at \`f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1\`, exact source HEAD \`e15392a0dbb0c9bbcb8dd0d83e02d4c972a42cc9\`.
- Source-SHA Validation [43604802611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802611), CodeQL [43604802662](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802662), and Dependency Review [43604802669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43604802669) all succeeded **before** the base retarget to \`main\` at 2026-11-14 16:20:47 UTC. No post-retarget PR-triggered check set exists for this exact source SHA.
- Source Validation recorded 508 backend tests, 27 readiness checks, 78 production-security checks, real HTTPX 0.28.1/httpcore 1.0.9 TCP/TLS peer verification, numeric-IP pinning, original Host/SNI preservation, redirect-hop re-resolution, rebinding rejection, and bounded DNS/connect deadlines. These are source-SHA results, not post-retarget integration acceptance.
- Human reviewer \`tarlaci1984-sketch\` was requested for PR #99; no human review submission is recorded. Keep issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) open pending fresh post-retarget exact-head checks, independent security review, and authorized integration. No production security acceptance is claimed.

### Other active PRs and historical remediation
- PR #100 exact HEAD \`a91434c1669ad159fa50fd3526b6594f2c2f8ebd\`: Validation [43624487754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487754), CodeQL [43624487717](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487717), and Dependency Review [43624487726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43624487726) all SUCCESS. It remains draft and unmerged.
- PR #87 exact HEAD \`18eec1bda29d419d8e71958df895c14fac4de464\`: Validation, CodeQL, and Dependency Review all SUCCESS; CodeQL SARIF upload and Dependency Review are working in the current public repository state. Alert inventories remain unverified.
- PR #41 is merged; its exact-head three workflows succeeded, all **22/22** inline review threads are resolved, and human APPROVED review by \`tarlaci1984-sketch\` is recorded.
- PR #65 is closed/unmerged; its exact-head three workflows succeeded. Its \`package.json\` and \`package-lock.json\` blobs match main, including Expo SDK 57 alignment.
- PR #67 is closed/unmerged; its historical Validation failure was **175 passed / 2 failed** on stale App Attest fixtures. PR #68 is closed/unmerged; its historical backend validation recorded **177 passed**, cryptography 50.0.2, and clean pip-audit. PR #69 is closed/unmerged; its historical Node 22 Validation failure is not current-main evidence. Main now has the CommonJS \`app.plugin.js\` config-plugin entrypoint separated from the TypeScript \`index.ts\` runtime entrypoint; current Node 22 Validation on PR #85 passed.

### Release register and acceptance
- The 25-point register remains **2 Done / 15 In Progress / 8 Blocked**. Done: #1 and #6. Blocked: #2 final owner visibility/plan decision, #4 physical iPhone App Attest and production entitlement, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product benchmark and business acceptance, #21 production monitoring/verified alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off. The other 15 remain In Progress.
- CI, CodeQL, Dependency Review, simulator, and emulator evidence do not satisfy physical-device, production-cloud, witnessed recovery, monitoring, rollout, real-user pilot, or business-approval gates. **Pilot/production acceptance remains NOT GRANTED.**

## Latest dependency-risk disposition — 2026-11-15

- The current main runtime audit still reports **three moderate** `GHSA-g3hv-75wg-m249` findings through `@expo/fingerprint@0.20.16` / `minimatch@10.2.6`. The npm audit is **not clean**; the finding remains visible and item #3 stays In Progress.
- Expo maintainers closed [expo/expo#52735](https://github.com/expo/expo/issues/52735) on 2026-11-06 and merged [expo/expo#53091](https://github.com/expo/expo/pull/53091). The merged change deliberately retains `minimatch@^10`: the maintainer documents behavior differences in minimatch 11 / picomatch that could change `.fingerprintignore` matching. The same maintainer states that Expo fingerprint sets `dot: true`, leaves `optimizationLevel` at its default of 1, and does not expose the vulnerable preprocessing path, which requires `optimizationLevel >= 2`.
- This is an **upstream-scoped assessment of Expo fingerprint's build-tooling use**, not a blanket claim that every minimatch 10 use is unaffected or that the npm audit is clean. Keep the three moderate findings visible. Do not force a global minimatch 11 override or downgrade Expo.
- Experimental PR [#104](https://github.com/milanradics89-beep/POS-Doctor/pull/104) was closed without merge. The owner must still acknowledge the residual build-tooling advisory, and the complete Dependabot/security-alert inventory remains unavailable/unverified. No checklist or release-status promotion is justified by the upstream note alone.
- This documentation checkpoint is based on PR #85 exact HEAD `877a9279a85ef0472ca9cde2609e43d9b9bc1a52`, whose Validation [43680162719](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680162719), CodeQL [43680162746](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680162746), and Dependency Review [43680162713](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43680162713) all completed successfully. This new child commit must pass its own exact-head checks.

## Exact-head release reconciliation — 2026-11-15 09:23 CET

### PR #85 current release-documentation head

- Exact HEAD: 66dd30ef8cdc10702fa9d2ec3ff4062056c9d75d; base main at f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- Validation [43689326489](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43689326489): SUCCESS.
- CodeQL [43689326486](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43689326486): SUCCESS.
- Dependency Review [43689326524](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43689326524): SUCCESS.
- Validation job logs: backend 450 passed, readiness 27 passed, production-security 78 passed; cryptography 50.0.2; pip-audit reported no known vulnerabilities found.
- Frontend: 289/289 tests across 59/59 files; Expo Doctor 21/21; Android Release build and emulator install/launch smoke passed; iOS Release build and simulator install/launch smoke passed.
- Runtime npm audit still reports 3 moderate minimatch findings (GHSA-g3hv-75wg-m249). The audit is not clean; the configured high-severity threshold explains the successful workflow exit and does not erase the moderate findings.
- PR #85 remains open, ready for review and unmerged. Reviewer tarlaci1984-sketch is requested, but no human APPROVED review is recorded. The P2 status-tally thread is resolved.
- The 25-point register remains 2 Done / 15 In Progress / 8 Blocked. Release remains NOT READY; production/pilot acceptance remains NOT GRANTED.


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



## Exact-head 25-point register and release evidence — 2026-11-15 23:12 CET

This checkpoint supersedes the 22:07 CET snapshot above. Historical rows/checkpoints remain for audit history; the latest evidence below is authoritative.

### Current exact-head evidence
- **#41:** merged, reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; source branch ref matches. Validation 43492153234, CodeQL 43492153161, Dependency Review 43492153021 all SUCCESS. 52 conversation comments, 30 inline comments, 26 review submissions (one human APPROVED), 22/22 threads resolved. Three obsolete runs remain queued on `b46c5b8` with empty jobs; they are not current-head checks.
- **#85:** current documentation HEAD `c0d7c54ff4d94750415e92c9023bee5e917303e8`; Validation 43762241856, CodeQL 43762241890, Dependency Review 43762241889 all SUCCESS. Backend/frontend/iOS jobs passed, Android emulator and iOS simulator smoke passed. 28 conversation comments, 3 automated COMMENTED reviews, 2/2 threads resolved; no human approval.
- **#107:** HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation 43746773703, CodeQL 43746773650, Dependency Review 43746773667 all SUCCESS. Full npm audit artifact 14175052989: 3 moderate / 0 high / 0 critical / 0 low. Findings remain visible; no downgrade/override/suppression.
- **#90:** HEAD `606e57ddb86d869a8806aabce947e75857350018`; Validation 43766269840 IN_PROGRESS (backend/frontend passed, iOS running), CodeQL 43766269973 SUCCESS, Dependency Review 43766269879 SUCCESS. Two P2 threads open: shopping-only empty panel (implementation now gates through `shouldShowEmptyProductPanel`, pending validation/re-review) and VoiceOver announcement.
- **#99 / #64:** HEAD `f122e239da624a3d8d7e38bf80bd088433ae1f77`; Validation 43766380573 IN_PROGRESS, CodeQL 43766380577 SUCCESS, Dependency Review 43766380576 SUCCESS. Backend 535 passed / 1 failed at the well-known NAT64 connected-peer acceptance test; frontend/iOS still running. Two NAT64 P2 threads remain open. Issue #64 is open with 34 comments.

### Governance and inventories
- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; repository public; active Protect main ruleset 26370589 requires one approval, last-push approval, resolved threads and six strict checks, with deletion/non-fast-forward protection and no bypass actors. Issue #47 closed (10 comments). Item #2 remains Blocked for the owner's final visibility/plan decision, not for missing current ruleset enforcement.
- GitHub Releases API: 0 published releases. Code Scanning, Dependabot and Secret Scanning inventories: unavailable/unverified, not empty.
- Issue #74: 64 boxes, 31 checked / 33 open (81 comments).

### Authoritative register — unchanged
- **Done (2):** #1 iOS simulator CI closure; #6 Redis multi-instance concurrency.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 owner visibility/plan decision; #4 physical iPhone App Attest and production entitlement; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

No physical-device, production-cloud, witnessed backup/restore, monitoring, staged-rollout, pilot or business-approval item is promoted by CI. Release remains NOT READY; production/pilot acceptance remains NOT GRANTED.


## Exact-head 25-point register reconciliation — 2026-11-16 00:40 CET

This is the latest authoritative row-level checkpoint and supersedes the 2026-11-15 23:12 CET operational snapshot. Historical checkpoints remain for audit traceability.

### Current exact-head evidence
- **#41:** merged; reviewed HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; source branch ref matches. Validation 43492153234, CodeQL 43492153161, Dependency Review 43492153021 all SUCCESS. Review: 52 conversation comments, 30 inline comments, 26 submissions (one human APPROVED), 22/22 threads resolved.
- **#85:** documentation HEAD `fe33ed03f3c824babb2839c956bdfae9a31cdbbf`; Validation 43768435582, CodeQL 43768435606, Dependency Review 43768435651 all SUCCESS; backend, frontend/Android and iOS jobs passed. Two P2 documentation threads are resolved. No human approval.
- **#90:** design HEAD `27d7c201d3cc63f357af538abd8b89e0c80cca24`; Validation 43772776331, CodeQL 43772776342, Dependency Review 43772776343 all SUCCESS. Shopping-only empty-product panel and explicit iOS VoiceOver state announcement are implemented and regression-tested. All 3 inline threads resolved; human design/accessibility approval pending.
- **#99 / #64:** SSRF/NAT64 HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation 43772791089, CodeQL 43772791064, Dependency Review 43772791109 all SUCCESS. Well-known `64:ff9b::/96` public-IPv4 acceptance and configured RFC 6052 network-specific prefix/private-IPv4 rejection are covered by URL, DNS, peer and transport tests. Host/TLS SNI preservation is tested. Both NAT64 P2 threads are resolved. Issue #64 remains open (35 comments) pending production egress prefix inventory/configuration and independent human security approval.
- **#107:** exact HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation 43746773703, CodeQL 43746773650, Dependency Review 43746773667 all SUCCESS. Full npm audit artifact 14175052989 reports 3 moderate / 0 high / 0 critical / 0 low; findings remain visible and unsuppressed.
- **#96:** exact-head Validation 43747514393, CodeQL 43747514431, Dependency Review 43747514474 all SUCCESS.
- **#106:** exact-head Validation 43705947653, CodeQL 43705947633, Dependency Review 43705947631 all SUCCESS. Redis-py 8.1 client compatibility against Redis 7.4 is validated, not Redis server 8 production migration.
- **#108:** exact-head Validation 43730870752, CodeQL 43730870781, Dependency Review 43730870776 all SUCCESS.

### Governance and inventories
- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; public repository; active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires one approval, last-push approval, resolved threads and six strict checks; deletion/non-fast-forward protection is active and there are no bypass actors.
- Issue #47 is closed (10 comments), but its latest body/comment still requires the owner's final public/private and plan decision. Item #2 remains Blocked for that owner decision.
- Issue #64 is open (35 comments). Issue #74 is open (82 comments), with 64 checklist boxes: 31 checked / 33 open.
- Repository inventory: 78 branches, 38 open PRs, 6 open non-PR issues, 0 published releases.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable/unverified, not empty.

### Authoritative 25-point status register

**Done — 2**
| # | Workstream | Evidence |
|---:|---|---|
| 1 | iOS simulator CI closure | Exact-head Release build and simulator smoke evidence retained |
| 6 | Redis multi-instance concurrency | Concurrency regression coverage and Redis-backed CI evidence retained |

**In Progress — 15**
#3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.

**Blocked — 8**
| # | Workstream | Required acceptance evidence |
|---:|---|---|
| 2 | Repository visibility / GitHub plan decision | Owner's explicit public/private and plan decision |
| 4 | Apple App Attest | Production entitlement and witnessed physical iPhone validation |
| 5 | Google Play Integrity | Play-installed physical Android validation |
| 16 | Backup / restore | Witnessed production recovery |
| 18 | Product recognition | Representative benchmark and business acceptance |
| 21 | Monitoring | Production alert delivery and verified response |
| 22 | Staged rollout | Authorized approval and tested rollback |
| 25 | Real-user pilot | Real-user evidence and business sign-off |

The register contains exactly 25 numbered workstreams: **2 Done / 15 In Progress / 8 Blocked**. No external gate is promoted by simulator/emulator CI, code scans, dependency scans, documentation or resolved review threads.

**Release NOT READY. Production/pilot acceptance NOT GRANTED.**

This checkpoint is a documentation-only child of PR #85 HEAD `fe33ed03`. Its own exact-head Validation, CodeQL and Dependency Review must complete before the child is considered validated; the parent's green runs are not inherited.


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


## Authoritative release register — live checkpoint 2026-11-16 03:18 CET

This checkpoint supersedes the earlier 2026-11-16 01:20 evidence snapshot. The numbered register remains exactly 25 workstreams. Do not promote an external acceptance gate from automated CI alone.

### Exact-head evidence
- **PR #41 merged baseline:** source branch `fix/release-blockers-2026-10` exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit/current main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Validation 43492153234, CodeQL 43492153161, Dependency Review 43492153021 all SUCCESS. Review 52 conversation comments, 30 inline comments, 26 submissions (one human APPROVED), 22/22 threads resolved.
- **PR #85 documentation parent:** HEAD `89757fdd0b549c96447edb874a64d39d6f22cbb4`; Validation 43784170026, CodeQL 43784170040, Dependency Review 43784169985 all SUCCESS; backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed. Review 2/2 threads resolved; no human APPROVED. The documentation child being created by this checkpoint must run its own three workflows.
- **PR #90 design/accessibility:** HEAD `b85cbc7dd6b1d8109a22d2c6952a8d83ecf52367`; Validation 43788320357, CodeQL 43788320223, Dependency Review 43788320228 all SUCCESS; backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed. All 3/3 P2 threads resolved; human accessibility/design approval pending.
- **PR #99 / Issue #64 SSRF/NAT64:** HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation 43772791089, CodeQL 43772791064, Dependency Review 43772791109 all SUCCESS; backend, frontend/Android, iOS, CodeQL Analyze and Dependency Review jobs passed. NAT64 tests cover well-known `64:ff9b::/96`, configured RFC 6052 /32, /40, /48, /56, /64, /96, private embedded-IPv4 rejection, numeric-IP pinning, connected-peer verification, Host/TLS SNI and redirect-hop DNS re-resolution. Both P2 threads resolved; PR remains Draft; production prefix configuration and human security approval pending.
- **PR #107 full dependency audit:** HEAD `431d96a31beb523be31c109d81c7009d49357318`; Validation 43746773703, CodeQL 43746773650, Dependency Review 43746773667 all SUCCESS. Full npm audit artifact 14175052989: 3 moderate / 0 high / 0 critical / 0 low; findings remain visible and unsuppressed.
- PR #96 HEAD `15e9c9fbd0e605911d4618e2e9216ebf611ab33f`, PR #106 HEAD `8e7679de7dbf5bd68d6d0e5e38716fbe027f89c7`, and PR #108 HEAD `e565b9aa029072d88298d83de2c37f6c55f97f2e`: each has exact-head Validation, CodeQL and Dependency Review SUCCESS.

### Current repository and governance
- Public repository; 78 branches, 38 open PRs, 5 open non-PR issues (#74, #64, #25, #24, #23), 0 published releases.
- Main HEAD `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, protected=true. Active Protect main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589): one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward blocked, no bypass actors.
- Issue #47 is closed (10 comments), while its body retains a historical instruction to keep it open pending the owner's long-term public/private and plan decision. Current public visibility and active ruleset are verified; durable owner decision remains unconfirmed, so item #2 stays Blocked.
- Issue #64 is open (38 comments); production `USEIT_NAT64_PREFIXES` inventory/configuration and independent human security approval are required.
- Issue #74 is open (86 comments); persisted checklist: 64 boxes, 31 checked / 33 open.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the integration; status is unavailable/unverified, not zero.

### Authoritative 25-point status register

**Done — 2**
| # | Workstream | Evidence |
|---:|---|---|
| 1 | iOS simulator CI closure | Exact-head iOS Release build and simulator install/launch smoke evidence retained |
| 6 | Redis multi-instance concurrency | Concurrency regression coverage and Redis-backed CI evidence retained |

**In Progress — 15**
#3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.

**Blocked — 8**
| # | Workstream | Required acceptance evidence |
|---:|---|---|
| 2 | Repository visibility / GitHub plan decision | Owner's explicit durable public/private and plan decision |
| 4 | Apple App Attest | Production entitlement and witnessed physical iPhone validation |
| 5 | Google Play Integrity | Play-installed physical Android validation |
| 16 | Backup / restore | Witnessed production recovery |
| 18 | Product recognition | Representative benchmark and business acceptance |
| 21 | Monitoring | Production alert delivery and verified response |
| 22 | Staged rollout | Authorized approval and tested rollback |
| 25 | Real-user pilot | Real-user evidence and business sign-off |

The register contains exactly 25 numbered workstreams: **2 Done / 15 In Progress / 8 Blocked**. No physical-device, production-cloud/configuration, witnessed backup/restore, monitoring, staged-rollout, pilot or business-approval item is promoted by simulator/emulator CI, code scans, dependency scans or resolved review threads.

**Release NOT READY. Production/pilot acceptance NOT GRANTED.**

This checkpoint is a documentation-only child of PR #85 parent HEAD `89757fdd0b549c96447edb874a64d39d6f22cbb4`. The new child SHA must pass its own exact-head Validation, CodeQL and Dependency Review; the parent's green checks are not inherited.


## 2026-11-16 04:23 CET — Live evidence checkpoint and register reconciliation

PR #85 exact documentation HEAD `10597c75f4c3d0dd360e5df400dcd631f03e5f0a` now has terminal-success exact-head Validation, CodeQL and Dependency Review. The 25-point register is reconciled below and remains 2 / 15 / 8.


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

- PR #85 is OPEN/non-draft on base `main` at `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Branch `docs/post-merge-release-evidence-20261113`; current pre-write parent HEAD is `dcc6310694028c6eba21110a18b3d2b5fac11a2f`.
- These exact-head runs belong to PR #85 pre-write parent HEAD `dcc6310694028c6eba21110a18b3d2b5fac11a2f` only. All three are terminal SUCCESS:
  - Validation [44119805074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805074): SUCCESS. Backend, frontend and iOS jobs all succeeded. Frontend completed source-boundary validation, typecheck, **61 test files**, pinned Expo Doctor, Android export, native Android Release build and emulator install/launch smoke. The Android Release build completed with **BUILD SUCCESSFUL in 15m 47s**; the emulator smoke passed for `com.useit.app`.
  - CodeQL [44119805115](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805115): SUCCESS; analyze completed.
  - Dependency Review [44119805108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805108): SUCCESS.
- The PR #139 Gradle memory remediation is integrated into the #85 branch, not main. Its validated CI configuration writes `-Xmx4g -XX:MaxMetaspaceSize=1g`, limits Gradle to two workers and disables parallel execution before `assembleRelease`; R8/minification remains enabled. The current #85 Android Release build and emulator smoke now pass, superseding the earlier D8 `OutOfMemoryError`.
- iOS Release build and simulator install/launch smoke passed in the same Validation run. Backend dependency audit reports `No known vulnerabilities found`. Frontend `npm audit --omit=dev --audit-level=high` still reports **3 moderate minimatch findings**; the command passes its configured high-severity threshold, not a zero-vulnerability audit. No forced Expo downgrade or audit suppression was applied.
- PR #85 review inventory: **16 review submissions, all COMMENTED; 9/9 inline threads resolved; 0 human APPROVED**. Reviewer `tarlaci1984-sketch` remains requested. Human release approval is still required.
- PR #139 is CLOSED/MERGED into the #85 documentation branch only; it is not merged into main.

### Related exact-head work

- PR #140 is OPEN/DRAFT at exact HEAD `248c7c6fb4fbb289946f51ef504cc47f18365a77`, based on PR #90 exact HEAD `e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2`. Validation [44106927809](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927809), CodeQL [44106927918](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927918), and Dependency Review [44106927790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927790) are all terminal SUCCESS. Frontend reports 71 test files; Android Release/emulator smoke and iOS Release/simulator smoke succeeded. The shared `FadeIn` respects the OS reduced-motion preference and reacts to live changes. PR #140 has 0 review submissions and 0 inline review threads; human design/accessibility review remains pending.
- PR #146 is OPEN/DRAFT at exact HEAD `2fc02da739d6ada8d273959f6aa214bfb5451327`, based on PR #145 exact HEAD `259ad97ed7c5791f86d39cd231d7fc9e3ed1451a`. Validation [44107443069](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44107443069), CodeQL [44107443106](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44107443106), and Dependency Review [44107442917](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44107442917) are all terminal SUCCESS. Backend, frontend and iOS jobs passed; frontend reports 61 test files, Android Release/emulator smoke and iOS Release/simulator smoke passed. No review submission or inline thread exists. PR #143 and #145 remain open draft ancestors with historical Validation assertion failures; #146's own exact-head suite is green.
- PR #132 remains OPEN/DRAFT at exact HEAD `d463f924500b0b070f50c9c328b4078b83f6df08`. Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are terminal SUCCESS. Frontend evidence is 331/331 tests across 72 test files; Android Release/emulator smoke and iOS Release/simulator smoke passed. Human review remains pending.
- PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. HTTPX 0.28.1/httpcore 1.0.9 tests exercise per-hop DNS re-resolution, whole-answer public/global validation, numeric-IP pinning, actual peer verification before TLS/request bytes, original Host/TLS SNI preservation, redirect rebinding rejection and RFC 6052/NAT64 address handling. Issue #64 remains OPEN pending independent human security APPROVED review, production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES` and production egress evidence.
- PR #96 Copilot Free, #107 full npm audit, #116 App Attest/Node 22, #117 minimatch migration and #119 lockfile-wide minimatch tests retain their previously recorded exact-head 3/3 successes. PR #117/#119 do not constitute independent acceptance of the minimatch 11 override: Expo fingerprint declares `^10.2.6`; three moderate findings and compatibility/security approval remain visible.

### Historical priority audit

- PR #41 is CLOSED/MERGED at main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; its current exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161) and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are SUCCESS. Review: 22/22 threads resolved and one human APPROVED. Both Redis P2 runbook fixes are on main.
- PR #65 is CLOSED/unmerged; exact-head Validation [43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), Dependency Review [43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754) are SUCCESS. SDK 57 alignment and Redis runbook corrections are present on main.
- PR #67 is CLOSED/unmerged; historical Validation [43423727535](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727535) failed, while CodeQL [43423727559](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727559) and Dependency Review [43423727485](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43423727485) succeeded. Copilot Free successor #96 has 3/3 success.
- PR #68 is CLOSED/unmerged; Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) are SUCCESS. The separate Python audit used cryptography 50.0.2 and pip-audit reported no known vulnerabilities; this is distinct from npm/minimatch.
- PR #69 is CLOSED/unmerged; historical Validation [43432490009](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432490009) failed, while CodeQL [43432489904](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489904) and Dependency Review [43432489915](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432489915) succeeded. The main-based #116 successor separates the JavaScript Expo config plugin from the TypeScript runtime and validates Node 22 prebuild.

### Repository, governance and canonical registers

- Repository visibility: **public**. Main HEAD: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`.
- Branch pagination is exhausted: **105 branches** (100 + 5 + 0). Current inventory: **45 open PRs and 6 open non-PR issues** (#144, #64, #74, #25, #24, #23).
- Protect main ruleset [#26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is ACTIVE and unchanged: one required approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward protection and no bypass actors.
- Three obsolete PR #41 runs remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is required; these are not current-head checks.
- Issue #74 remains **64 checklist items / 42 checked / 22 open**. The separate 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. No checkbox changed in this checkpoint.
- External gates remain Blocked: owner visibility/plan decision; production Apple entitlement and physical iPhone; Play Integrity on Play-installed physical Android; witnessed production backup/restore; representative benchmark/business acceptance; production monitoring/alert delivery; staged rollout/rollback approval; real-user pilot and business sign-off. Code Scanning, Dependabot and Secret Scanning inventories remain unavailable/unverified, not empty.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.** CI, emulator/simulator smoke and documentation do not replace human approval or production evidence. No main-branch write occurred.


---



---

## Exact-head reconciliation — 2026-11-17 18:13 CET

This checkpoint supersedes the 17:21 CET snapshot. All PR, workflow, review, repository-inventory and release-gate facts below were refreshed from GitHub. The current parent evidence is explicitly separated from the new documentation child created by this checkpoint.

### PR #85 — current parent and Validation failure

- PR #85 is OPEN/non-draft, based on main at f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Branch docs/post-merge-release-evidence-20261113; PR #85 pre-write parent HEAD is 7f71bd957d3455b7649605099c466dd4d7a4e712. The parent has 109 commits and the PR changes 6 files.
- These exact-head runs belong to PR #85 pre-write parent HEAD 7f71bd957d3455b7649605099c466dd4d7a4e712 only. Parent runs are not presented as validation of the documentation commit created by this checkpoint.
  - Validation [44125620536](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44125620536): FAILURE. Backend passed; frontend failed; iOS passed. Frontend completed 293 passed / 3 failed across 61 test files (60 files passed; the release-checkpoint test file failed).
  - CodeQL [44125620555](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44125620555): SUCCESS; Analyze completed.
  - Dependency Review [44125620669](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44125620669): SUCCESS.
- The three frontend failures are isolated to scripts/release-doc-checkpoint.test.mjs. The parser expected the label “PR #85 pre-write parent HEAD is” while the 17:21 checkpoint used “current pre-write parent HEAD is”; the latest section omitted the recorded minimatch advisory identifier; and its PR #85 review wording omitted the word “reviews” after “0 human APPROVED”. These are checkpoint assertion/data-contract mismatches, not application-source failures.
- The frontend job stopped at Unit tests. Expo Doctor, Android export, native Android Release, Android emulator smoke and the runtime npm audit were skipped. The iOS native Release build and simulator smoke passed; backend compilation, tests, readiness checks and its dependency audit passed. Do not claim an Android build or a fresh frontend npm audit on 7f71bd.
- The immediately preceding parent dcc6310694028c6eba21110a18b3d2b5fac11a2f passed its own exact-head Validation [44119805074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805074), CodeQL [44119805115](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805115), and Dependency Review [44119805108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44119805108). That parent completed 61 test files, pinned Expo Doctor, Android Release/emulator smoke and iOS Release/simulator smoke. Those parent results do not validate 7f71bd or this documentation child.
- The last completed frontend npm audit evidence records 3 moderate minimatch findings, including GHSA-g3hv-75wg-m249. The proposed npm audit fix --force is not accepted because it can force incompatible dependency changes; no forced Expo downgrade or audit suppression was applied. The 7f71bd frontend job did not reach the runtime audit step.
- PR #85 review inventory: 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews. The timeline contains 63 conversation comments, 16 inline review comments and 16 review submissions. Reviewer tarlaci1984-sketch remains requested. Human approval is still required.

### Related exact-head records

- PR #90 remains OPEN/non-draft at exact HEAD e22c422fc3dd2bd0d7ebe5b783df7e7748660ab2. Validation [43981707087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707087), CodeQL [43981707068](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707068), and Dependency Review [43981707044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43981707044) are terminal SUCCESS. Its review inventory is 3 COMMENTED submissions, 3/3 inline threads resolved and 0 human APPROVED reviews.
- PR #140 is OPEN/DRAFT at exact HEAD 248c7c6fb4fbb289946f51ef504cc47f18365a77. Validation [44106927809](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927809), CodeQL [44106927918](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927918), and Dependency Review [44106927790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44106927790) are terminal SUCCESS. Its frontend evidence records 71 test files passed; Android Release/emulator and iOS Release/simulator smoke passed. PR #140 has 0 review submissions and 0 inline review threads.
- PR #132 remains OPEN/DRAFT at exact HEAD d463f924500b0b070f50c9c328b4078b83f6df08. Validation [44028244600](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244600), CodeQL [44028244408](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244408), and Dependency Review [44028244391](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44028244391) are terminal SUCCESS. Its recorded frontend evidence is 331/331 tests across 72 test files.
- PR #99 remains OPEN/DRAFT at exact HEAD f91c70d2636948e538f8e3559afc39cd93eb5139. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. PR #99 has 4 COMMENTED review submissions (including the two replies), 2/2 inline threads resolved and 0 human APPROVED reviews. Reviewer tarlaci1984-sketch is requested. Issue #64 remains OPEN / production acceptance BLOCKED pending independent human security approval, production DNS64/NAT64 prefix inventory, verified deployed USEIT_NAT64_PREFIXES and staging/production egress evidence.

### PR #41 — merged baseline and review evidence

- PR #41 is CLOSED/MERGED on branch fix/release-blockers-2026-10 at exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1. The source branch SHA matches the PR head. Merge commit and current main HEAD are f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on 68b380e.
- PR #41 has 52 conversation comments, 30 inline review comments and 26 review submissions (25 COMMENTED, 1 human APPROVED). All 22/22 inline review threads are resolved.
- Three obsolete PR #41 workflows remain QUEUED with zero jobs on historical SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks; administrator cancellation is required.

### Current remediation chain and repository inventory

- Issue #149 remains OPEN with 4 comments, tracking repeated release-checkpoint Validation failures. PR #151 is OPEN/DRAFT at exact HEAD 2192386f4e69d3ecda8a6fe7de916e85779fb2a4; its Validation [44133703922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44133703922) is QUEUED while CodeQL [44133703874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44133703874) and Dependency Review [44133704052](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44133704052) are SUCCESS.
- PR #152 is OPEN/DRAFT at exact HEAD f8675173b9a18c81504933301c6fe6a8a6ffe7a6. Its Validation [44134395466](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44134395466) is IN_PROGRESS; CodeQL [44134395218](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44134395218) and Dependency Review [44134395147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44134395147) are SUCCESS. Do not write to either child branch while its current-head Validation is queued/running.
- Repository visibility is currently **public**. Main branch API reports protected=true. Protect main ruleset #26370589 is ACTIVE, targets the default branch, requires one approval, stale-review dismissal, last-push approval, resolved review threads, six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward protection and no bypass actors. No protection setting was changed.
- Branch pagination is exhausted: 110 branches (100 + 10 + 0). Current inventory is 50 open PRs and 6 open non-PR issues: #149, #74, #64, #25, #24 and #23.
- Issue #47 is CLOSED with 10 comments; its original protection finding is resolved by the active ruleset and current protected main branch. Issue #64 is OPEN with 48 comments. Issue #74 has 156 comments and remains 64 items, 42 checked / 22 open. No Issue #74 checkbox changed.
- Published GitHub releases: 0. Code Scanning, Dependabot and Secret Scanning alert endpoints are not exposed through this integration; Security alert inventories are **unavailable/unverified, not empty**.

### Authoritative 25-point release register

The three release records remain synchronized at 2 Done / 15 In Progress / 8 Blocked.

- Done: #1, #6.
- In Progress: #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- Blocked: #2 (repository visibility/plan decision), #4 (production Apple entitlement and physical iPhone), #5 (Play Integrity on Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production monitoring and alert delivery), #22 (staged rollout and tested rollback approval), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists. No external acceptance gate is promoted to Done.

The resulting documentation child must pass its own exact-head Validation, CodeQL and Dependency Review. No main-branch write occurred. RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.


---


## Exact-head reconciliation — 2026-11-18 15:34 CET

This checkpoint supersedes earlier release-watch snapshots. Every workflow result below is tied to the exact SHA stated; no parent CI is reused as evidence for a child commit.

### PR #85 — exact pre-write parent and current CI

- PR #85 is OPEN on docs/post-merge-release-evidence-20261113, targeting main. The exact pre-write parent HEAD is `fd08077d7967c2f415853cb1e194c3983d1bff20`, whose parent is `ab44497b3a9e220b38cc2ec8ae7fb3533bc43cde`. It records 112 commits, 6 changed files, +8,873 additions and -944 deletions.
- These exact-head runs belong to PR #85 pre-write parent HEAD `fd08077d7967c2f415853cb1e194c3983d1bff20` only. Parent runs are not presented as validation of the documentation commit created by this checkpoint.
- Validation [44313934098](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44313934098): terminal FAILURE on the exact parent SHA. CodeQL [44313933984](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44313933984): terminal SUCCESS. Dependency Review [44313933991](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44313933991): terminal SUCCESS.
- Validation jobs: frontend FAILURE at the final runtime dependency audit; backend SUCCESS; iOS SUCCESS. Frontend TypeScript typecheck, unit tests, Expo Doctor, Android export, Android Release build and Android emulator smoke all passed. Backend compilation, tests, readiness checks and backend dependency audit passed. iOS native Release build and simulator smoke passed.
- The mandatory command npm audit --omit=dev --audit-level=high reports 28 vulnerability instances (2 moderate, 26 high dependency paths). Minimatch GHSA-g3hv-75wg-m249 is moderate; picomatch GHSA-fc5q-39xc-vjpf is high. Picomatch is present in the Expo/Metro and tinyglobby dependency paths. The audit is not waived. No forced Expo downgrade, unverified dependency pin, npm audit fix --force, or audit suppression was applied.
- PR #85 review inventory: 64 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews. Reviewer tarlaci1984-sketch remains requested.

### PR #41 — merged baseline, branch and complete review evidence

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Exact PR HEAD and source branch ref are both 68b380e73ca3c870048035197beef8febbf90ef1. Main and merge commit are f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The PR records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Comparison to main is 517 ahead / 1 behind, with merge base 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on 68b380e73ca3c870048035197beef8febbf90ef1. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- PR #41 review inventory: 53 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved.
- Three obsolete PR #41 workflows remain QUEUED with zero jobs on historical SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks. Repository-administrator cancellation is required.

### Governance, repository inventory and releases

- Repository visibility is public. Main HEAD is f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1; the branch endpoint reports protected: true. Active ruleset Protect main #26370589 is the enforcement evidence: one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward protection and no bypass actors. The legacy classic protection object reports disabled; do not mistake that for an absent active ruleset.
- Branch pagination is exhausted: 127 branches (100 + 27 + 0). Current inventory is 67 open PRs and 7 open non-PR issues: #155, #149, #74, #64, #25, #24 and #23.
- GitHub Releases API returned 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; they are unverified, not empty.

### Issue #47 — main protection

- Issue #47 is CLOSED with 11 comments. The current main branch and active ruleset verify the protection controls above. No branch-protection or ruleset setting was changed.

### Issue #64 — DNS-rebinding SSRF and production acceptance

- Issue #64 remains OPEN with 56 comments. PR #99 is OPEN/DRAFT on fix/ssrf-sorted-address-order-regression-20261114 at exact HEAD f91c70d2636948e538f8e3559afc39cd93eb5139, based on main f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- PR #99 exact-head Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS; backend, frontend, iOS, Analyze and Dependency Review jobs passed. Review inventory: 4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED; reviewer tarlaci1984-sketch is requested.
- Issue #64 remains OPEN / production acceptance BLOCKED pending independent human security APPROVED review, production DNS64/NAT64 translator-prefix inventory, verified deployed USEIT_NAT64_PREFIXES, and staging/production egress and deployment evidence. Source-level tests and CI do not establish production acceptance.

### Picomatch evidence and Issue #74 checklist

- PR #162 remains at exact HEAD 2b3414a954741e3149a96e37dc965fee84f575d0: Validation [44232687433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687433) failed at the same mandatory runtime audit; CodeQL [44232687360](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687360) and Dependency Review [44232687432](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44232687432) passed. Its 303 frontend tests, Android/iOS Release builds and emulator/simulator smoke tests passed. The SourceRoot-aware bundle scan found no picomatch package source in 2 production source maps / 2,634 source entries; this does not remediate the dependency graph.
- Issue #74's separate 168-hour checklist remains 64 items / 41 checked / 23 open (186 comments). No checkbox changed. This checklist is separate from the 25-point release register.

### Authoritative 25-point release register

- The evidence-based release register remains exactly 2 Done / 15 In Progress / 8 Blocked.
- Done (2): #1, #6.
- In Progress (15): #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- Blocked (8): #2 (durable repository visibility/plan decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Integrity on Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production monitoring and alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists. No external acceptance gate is promoted to Done.

RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED. This checkpoint is committed only to the PR #85 documentation branch. No main-branch write occurred. The new child commit must pass its own exact-head Validation, CodeQL and Dependency Review; the parent's failure/success results are not inherited.


---

## Exact-head release-watch checkpoint — 2026-11-18 20:02 CET

This checkpoint supersedes earlier snapshots. Every workflow result below is tied to the exact SHA stated. Parent CI is not reused as evidence for a child commit. This documentation update is being committed to the PR #85 branch only; its resulting child commit must pass its own exact-head Validation, CodeQL and Dependency Review.

### PR #41 — merged baseline, branch, commits, reviews and Actions

- PR #41 is CLOSED/MERGED. Source branch `fix/release-blockers-2026-10` and PR head both resolve to `68b380e73ca3c870048035197beef8febbf90ef1`. The PR records 517 commits, 100 changed files, +11,887 / -2,005. Main and merge commit are `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; comparison is 517 ahead / 1 behind, merge base `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Validation frontend, backend and iOS jobs passed; CodeQL Analyze and Dependency Review jobs passed. Temporary SDK lock-refresh run [43492142700](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492142700) also succeeded on the same SHA.
- PR #41 review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 20/22 outdated. The two Redis runbook P2 threads are resolved. The source branch endpoint reports `protected:false`; do not conflate this with main protection, which is enforced separately by active Protect main ruleset #26370589.
- Three historical workflows remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head evidence; repository-administrator cancellation is required.

### PR #85 — current release-documentation branch and exact-head CI

- PR #85 is OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Current pre-write HEAD is `88f5d9406eb5f9abcde4edb082f425396631697b`; it records 115 commits, 6 changed files, +9,052 / -946.
- Exact-head Validation [44364503514](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44364503514), CodeQL [44364503699](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44364503699), and Dependency Review [44364503554](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44364503554) are terminal SUCCESS on `88f5d9406eb5f9abcde4edb082f425396631697b`. Validation backend, frontend and iOS jobs passed; CodeQL Analyze and Dependency Review jobs passed. Frontend typecheck, unit tests, pinned Expo Doctor, Android export, native Android Release build, Android emulator smoke, iOS Release build and simulator smoke all passed.
- The exact-head frontend log confirms `npm audit --omit=dev --audit-level=high` completed successfully at its configured high threshold and reported **3 moderate minimatch findings** (`GHSA-g3hv-75wg-m249)); it did not report a picomatch finding. This is not a zero-finding audit and the three moderate findings remain recorded. The command's suggested `npm audit fix --force` would downgrade Expo to 52.0.49 and is not accepted.
- PR #85 review inventory: 65 conversation comments, 16 inline review comments, 16 review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED reviews. Reviewer `tarlaci1984-sketch` remains requested. Human approval is still required before main integration.
- The prior PR #85 parser/test failures on superseded SHAs are historical. The targeted parser correction is now present on this branch; the exact-head green runs above belong only to `88f5d9406eb5f9abcde4edb082f425396631697b`.

### Duplicate checkpoint-test child PRs

- PR #171 is OPEN/DRAFT at exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`; its Validation [44358862088](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862088), CodeQL [44358862249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862249), and Dependency Review [44358862085](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862085) are terminal SUCCESS.
- PR #172 is OPEN/DRAFT at exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`; its Validation [44350568289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568289), CodeQL [44350568525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568525), and Dependency Review [44350568368](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568368) are terminal SUCCESS.
- Both child commits have the same parent `c5faf4ca3ec9228dcde2b17ef5704d6199856792` and identical Git tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`. They are duplicate sibling PRs, not distinct fixes. PR #85 now contains the correction on its own branch. No child PR was merged or closed automatically; human reconciliation is required.

### Dependency advisory correction — Issue #155

- Issue #155 remains OPEN (33 comments) for product-level reachability and acceptance evidence, but the earlier characterization of `GHSA-fc5q-39xc-vjpf` as an active HIGH GitHub advisory is superseded. The official GitHub advisory was **WITHDRAWN on 2026-11-18**; OSV now records withdrawal at `2026-11-18T15:38:56Z`; Snyk marks the advisory revoked/deemed not a vulnerability. The previous 28-finding / 26-high-path PR #162 audit is historical and predates withdrawal.
- Official npm still lists picomatch 4.0.7 as latest; no 4.0.8 or patched release is published. Withdrawal is not a patched package release. Main lockfile retains picomatch 4.0.7 in Expo/Metro/tinyglobby production dependency paths and dev copies. Reviewed product entry points accept plain-text search or product URLs; no user-defined glob-pattern field or direct picomatch import was found in those reviewed paths. Prior mobile source-map scan found no picomatch package source in 2 production maps / 2,634 entries. This is partial reachability evidence, not repository-wide proof or dependency remediation.
- PR #85's current exact-head npm audit reports three moderate minimatch findings only and no picomatch finding. Keep Issue #155 OPEN for the documented product-level reachability/acceptance decision; do not label the withdrawn advisory an active HIGH finding, and do not claim the dependency inventory is vulnerability-free. No audit suppression, forced downgrade or unverified pin was introduced.

### Issue #47 — main protection

- Issue #47 is CLOSED with 11 comments. Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active Protect main ruleset #26370589 is the enforcement evidence: one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion/non-fast-forward protection and no bypass actors. The source branch for merged PR #41 is not itself protected; main ruleset enforcement is separate. No protection setting changed.

### Issue #64 — DNS-rebinding SSRF and production acceptance

- Issue #64 remains OPEN with 59 comments. PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), and Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS on that exact SHA. Review inventory: 4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED; reviewer `tarlaci1984-sketch` is requested.
- Production acceptance remains BLOCKED pending independent human security APPROVED review, production DNS64/NAT64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress and deployment evidence. Source tests and CI do not establish production acceptance.

### Repository inventory, releases, security-alert availability and Issue #74

- Repository visibility is public. Branch pagination is exhausted: **129 branches** (100 + 29 + 0). Current inventory: **69 open PRs**, **7 open non-PR issues** (#155, #149, #74, #64, #25, #24, #23), and **0 published GitHub releases**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; they are **unverified, not empty**.
- Issue #74 remains OPEN with 192 comments. Its separate 168-hour checklist remains **64 items / 41 checked / 23 open**. No checklist checkbox changed; this is separate from the release register.

### Authoritative 25-point release register

The three release records remain synchronized at **2 Done / 15 In Progress / 8 Blocked**.

- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2 (durable repository visibility/plan decision), #4 (production Apple App Attest entitlement and physical iPhone), #5 (Play Integrity on Play-installed physical Android), #16 (witnessed production backup/restore), #18 (representative product-recognition benchmark and business acceptance), #21 (production monitoring and alert delivery), #22 (approved staged rollout and tested rollback), #25 (real-user pilot and business sign-off).
- External console setup, physical-device tests, production cloud access, witnessed backup/restore, production monitoring, staged rollout approvals and real-user pilot/business approval remain BLOCKED until direct evidence exists. No external acceptance gate is promoted to Done.

**Decision:** PR #41 is merged and its exact-head CI is green. PR #85 pre-write parent `88f5d9406eb5f9abcde4edb082f425396631697b` has 3/3 exact-head workflows green, but PR #85 still needs human approval and the new documentation child must pass its own exact-head checks. No main-branch write or automatic merge occurred. RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.

## Exact-head reconciliation — 2026-11-18 21:35 CET

This checkpoint is a fresh pre-write snapshot. All parent workflow evidence below is tied only to the exact parent SHA; it does not validate the documentation commit created by this checkpoint.

### PR #85 — exact current parent and release validation

- PR #85 is OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The exact pre-write parent HEAD is `563db2b558206b5bab0700432a055bc13e7b2478`.
- Validation [44376829457](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829457) is terminal SUCCESS; CodeQL [44376829436](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829436) is terminal SUCCESS; Dependency Review [44376829434](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829434) is terminal SUCCESS. These exact-head runs belong to PR #85 pre-write parent HEAD `563db2b558206b5bab0700432a055bc13e7b2478` only.
- Frontend TypeScript typecheck, 298 tests across 61 test files, Expo Doctor 21/21, Android export, native Android Release build and Android emulator smoke all passed. Runtime `npm audit --omit=dev --audit-level=high` completed successfully at the configured high threshold and reported 3 moderate minimatch findings; no picomatch finding was reported. This is not a zero-finding audit.
- Backend: 450 tests passed, production readiness 27 passed, production-security 78 passed, cryptography 50.0.2, pip-audit clean. iOS native Release build and simulator smoke passed.
- PR #85 review inventory: 65 conversation comments, 16 inline review comments, 16 formal review submissions (all COMMENTED), 9/9 inline threads resolved, 0 human APPROVED. Reviewer `tarlaci1984-sketch` remains requested. Human approval is still required.
- Parent runs are not presented as validation of the documentation commit created by this checkpoint.

### Release parser child PR reconciliation

- PR #171 is OPEN/DRAFT at exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`: Validation [44358862088](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862088), CodeQL [44358862249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862249), Dependency Review [44358862085](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862085) all terminal SUCCESS.
- PR #172 is OPEN/DRAFT at exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`: Validation [44350568289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568289), CodeQL [44350568525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568525), Dependency Review [44350568368](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568368) all terminal SUCCESS.
- Both child PRs have 0 formal review submissions and 0 inline review threads. Their Git tree is identical: `cf955182d98cae2e19f10c0e08f8e12621cb5242`. PR #85 now contains the same parser/assertion correction on its own branch. They are redundant sibling PRs; no PR was closed or merged automatically.

### Release-checkpoint PRs #163–#170 — exact-head failure classes

All eight current heads have terminal CodeQL and Dependency Review SUCCESS. Each PR has 0 formal review submissions and 0 inline review threads. The Validation failures are not interchangeable:

| PR / exact HEAD | Validation run | Failed step | CodeQL / Dependency Review |
|---|---:|---|---|
| #163 `879a6392b3bcd248deca40916e15fd69a467df7b` | [44241274884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44241274884) | Unit tests: release-document assertion | [44241274855](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44241274855) / [44241274910](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44241274910) |
| #164 `f7dcfcf6ee85e3ee77e627f8d34776fd03b91cfe` | [44253605974](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253605974) | Unit tests: release-document assertion | [44253605853](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253605853) / [44253605842](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253605842) |
| #165 `84de0838284b50dc38bf8107aee15b046dd4cc6a` | [44253962999](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253962999) | Unit tests: closed-issue evidence assertion | [44253963066](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253963066) / [44253963144](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253963144) |
| #166 `205d39742a8c98e94453df44106ec83d5dba0ea0` | [44254136344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44254136344) | Unit tests: closed-issue evidence assertion | [44254136396](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44254136396) / [44254136318](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44254136318) |
| #167 `3177cfba1cbaee43a9feed2dd8b2010249a7d12f` | [44255156916](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44255156916) | Runtime dependency audit: 28 findings (2 moderate, 26 high) | [44255156921](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44255156921) / [44255156940](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44255156940) |
| #168 `a935803ac1c0b614fd3b49180da29b6bcd3f7b1e` | [44272119611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272119611) | Unit tests: release-review inventory assertion | [44272119580](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272119580) / [44272119594](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272119594) |
| #169 `0b6d97be460cabc24013b15d180cdf6d4180d42b` | [44272942930](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272942930) | Unit tests: release-review inventory assertion | [44272943096](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272943096) / [44272943019](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272943019) |
| #170 `6de7cedc9b1214f7bf819e8b76fd1d8986d8d085` | [44273476324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476324) | Runtime dependency audit: 28 findings (2 moderate, 26 high) | [44273476308](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476308) / [44273476354](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476354) |

The #167/#170 audit failures predate the GitHub advisory withdrawal. They remain historical exact-head failures, not current evidence of an active GitHub-reviewed picomatch HIGH advisory and not evidence that the lockfile was remediated.

### Priority work reconciliation

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10; source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. It records 517 commits, 100 changed files, +11,887 additions and -2,005 deletions. Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) all succeeded. Review inventory: 53 conversation comments, 30 inline review comments, 26 review submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved. The two Redis runbook P2 threads are resolved. Three obsolete zero-job workflows remain QUEUED with zero jobs on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Repository-admin cancellation is required; they are not current main checks.
- PR #65 is CLOSED/unmerged. Its Expo SDK 57 package/lockfile artifacts are byte-identical to main; the Redis runbook P2 fixes landed through #41, not by merging #65.
- PR #67 is CLOSED/unmerged. Mainline successor #96 exact HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0` has Validation [43800887062](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887062), CodeQL [43800886964](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800886964), Dependency Review [43800887028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887028) all SUCCESS. It has 2 COMMENTED reviews, 1/1 thread resolved, 0 human APPROVED.
- PR #68 is CLOSED/unmerged. Its validated backend used cryptography 50.0.2 and pip-audit was clean; this is separate from frontend npm audit.
- PR #69 is CLOSED/unmerged with the historical EC X-coordinate integer `len()` TypeError and unsupported `key_id` fixture argument. Its pip-audit did not run after pytest failed. Mainline successor #116 exact HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86` has Validation [43938664477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664477), CodeQL [43938664451](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664451), Dependency Review [43938664475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664475) all SUCCESS. The CommonJS `app.plugin.js` config entrypoint remains separate from the TypeScript runtime `index.ts`; app.json uses the JS plugin and expo-module.config.json handles iOS autolinking. Node 22 Android/iOS prebuild regression coverage passed. This does not make original PR #69 green.

### Issue #64 / PR #99 — SSRF transport versus production acceptance

- Issue #64 remains OPEN with 59 comments. PR #99 remains OPEN/DRAFT at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. Review inventory: 4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED.
- The exact-head HTTPX 0.28.1/httpcore 1.0.9 socket/TLS tests cover redirect-hop DNS re-resolution, all-answer public/global validation, numeric-IP connection pinning, peer check before TLS/request bytes, original Host/TLS SNI and disabled keep-alive reuse.
- Production acceptance remains BLOCKED on independent human security APPROVAL, production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress/deployment evidence. No deployment or production acceptance is claimed.

### Picomatch / Issue #155 — advisory status, reachability and candidates

- Issue #155 remains OPEN with 33 comments for product-level reachability/acceptance. The official [GitHub Advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) is explicitly WITHDRAWN on 2026-11-18; it preserves the historical affected range through 4.0.7 and “Patched versions: None”. This is not an active GitHub-reviewed HIGH advisory and not a patched npm release. [Snyk](https://security.snyk.io/vuln/SNYK-JS-PICOMATCH-21248802) marks it revoked/deemed not a vulnerability. The current [OSV record](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf) still shows HIGH and Modified 2026-11-17, without the GitHub 2026-11-18 withdrawal; treat OSV as stale relative to the official GitHub page.
- The official [npm picomatch version history](https://www.npmjs.com/package/picomatch?activeTab=versions) still lists 4.0.7 as latest; no 4.0.8 or patched release is published. The main lockfile still resolves picomatch 4.0.7 under Expo/Metro/tinyglobby paths and dev tooling. Reviewed product entry points accept plain-text search or product URLs; no untrusted user-defined glob-pattern input or direct picomatch import was found in those reviewed paths. This is partial reachability evidence, not repository-wide proof.
- Upstream picomatch PRs remain OPEN/unmerged at these exact heads: #264 `8144a1a22a8fa1766951411f220cc8c6228cb041` (0 reviews); #265 `dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c` (0); #254 `c63a5bf4e61dbdb81bc41e97dc2616c30acce337` (0); #257 `4e4892e0ac6c374ec3d9e4dc430101da9a20a37b` (1 APPROVED); #238 `44f192261f312ddf236cb7bdc05d8f22663f98f9` (6 submissions: 3 APPROVED, 3 COMMENTED); #246 `f03bec2c02e46f063fbfdc161aae1d0f854b2565` (0). Each exact head currently has zero GitHub check-runs and a pending combined status with zero status contexts. No upstream patch is accepted or released. The exact regression patterns requiring controlled tests are `+(*)`, `*(*)`, `+(a*)`, `+(*a)`, `*(a*|b)`, and `+(ab|abab)`; do not substitute similar strings.
- The non-upstream `ryotsu-kankichi/secured-picomatch` fork remains an unreviewed candidate: fork PR #1 is merged, but it has 0 formal reviews and 0 inline comments; master `3ab5a7627d480259e3d9ca67fbc14c125d374f0e` is unprotected; release commit `f9822e9514d490f3e3bc17f50a4d3cacff2056c2` is unsigned. Current master has 23/23 successful check-runs. Package `@ryotsu/picomatch@4.0.7-a` appears in third-party indexes, but npm registry provenance/integrity has not been verified; npm.io and Socket report conflicting download counts (0 versus 333 weekly). The patch changes capture-group semantics and `maxExtglobRecursion:false` disables the safeguard. No forced Expo downgrade, unverified dependency pin, `npm audit fix --force`, or audit suppression was applied. Do not import, pin or override it without independent security review, verified registry provenance/integrity, exact-pattern regression tests, full SDK 57 frontend/Android/iOS migration tests, exact-head CI and human approval.

### Repository governance, inventory and release register

- Main HEAD is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Active Protect main ruleset #26370589 requires one approval, stale-review dismissal, last-push approval, resolved review threads, six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), deletion and non-fast-forward protection, and has no bypass actors. No protection setting changed.
- Repository visibility is public. Fresh paginated inventory: 129 branches (100 + 29 + 0), 69 open PRs, 7 open non-PR issues, 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain unavailable through this integration: unverified, not zero.
- Issue #74 remains OPEN with 192 comments. Its separate 168-hour checklist remains 64 items / 41 checked / 23 open. This is separate from the 25-point release register, which remains exactly 2 Done / 15 In Progress / 8 Blocked: Done (2): #1, #6. In Progress (15): #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24. Blocked (8): #2, #4, #5, #16, #18, #21, #22, #25. External Apple/Google console setup, physical devices, production cloud, witnessed backup/restore, monitoring, staged rollout and pilot/business approval remain BLOCKED without direct evidence.
- No Issue #74 checkbox changed. No main-branch write occurred. No merge, force-push, audit suppression or security-gate weakening occurred.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**

---

## Exact-head reconciliation — 2026-11-18 22:34 CET

This checkpoint records the current repository state after the 21:35 CET documentation commit. It separates the exact pre-write parent evidence from the current child HEAD and does not treat skipped steps as successful.

### PR #85 — current exact-head Validation failure

- PR #85 is OPEN/non-draft on `docs/post-merge-release-evidence-20261113`, targeting main `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Current exact HEAD: `c1d2cfdfbaffbeb7a7e7586d57b3971a7d1a844a`.
- The exact pre-write parent HEAD is `563db2b558206b5bab0700432a055bc13e7b2478`. Parent Validation [44376829457](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829457), CodeQL [44376829436](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829436), and Dependency Review [44376829434](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44376829434) were terminal SUCCESS on that parent only. The parent frontend had 298 tests, Expo Doctor 21/21, Android export/Release/emulator smoke, and a runtime npm audit that exited successfully at the high threshold with 3 moderate minimatch findings. These parent results do not validate the current child.
- These exact-head runs belong to PR #85 pre-write parent HEAD `563db2b558206b5bab0700432a055bc13e7b2478` only.
- Current exact-head Validation [44393580609](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44393580609) is terminal FAILURE. CodeQL [44393580584](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44393580584) and Dependency Review [44393581143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44393581143) are terminal SUCCESS.
- Frontend job `135135598063` failed at Unit tests: **292 passed / 8 failed**. Typecheck passed. The eight failures are stale exact-wording/data-contract assertions in `scripts/release-doc-checkpoint.test.mjs`, not product runtime regressions. Expo Doctor, Android export, Android Release build, Android emulator smoke, and Runtime dependency audit were skipped after Unit tests failed. Runtime npm audit is **SKIPPED**, not passed or failed.
- Backend job `135135683613` succeeded: 450 tests, readiness 27, production-security 78, cryptography 50.0.2, pip-audit clean. iOS job `135135602431` succeeded, including Release build and simulator smoke. CodeQL job `135117414772` and Dependency Review job `135117415872` succeeded.
- Review inventory: 16 formal submissions, all COMMENTED; 9/9 inline threads resolved; 0 human APPROVED. Reviewer `tarlaci1984-sketch` remains requested.

### Parser child PRs #171 and #172

- PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`: Validation [44358862088](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862088), CodeQL [44358862249](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862249), Dependency Review [44358862085](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44358862085), all terminal SUCCESS.
- PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa`: Validation [44350568289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568289), CodeQL [44350568525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568525), Dependency Review [44350568368](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44350568368), all terminal SUCCESS.
- Both child PRs have the identical Git tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`; #172 is stacked on #171, not a sibling. Both have 0 formal review submissions and 0 inline review threads. Reviewer `tarlaci1984-sketch` remains requested. No PR was closed or merged automatically.

### Release-checkpoint PRs #163–#170 — exact-head failure classes

All eight PRs remain OPEN/DRAFT. Their exact heads are unchanged; every listed CodeQL and Dependency Review run is terminal SUCCESS. Each has 0 formal review submissions and 0 inline review threads.

| PR / exact HEAD | Validation run | Failed step / job |
|---|---:|---|
| #163 `879a6392b3bcd248deca40916e15fd69a467df7b` | [44241274884](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44241274884) | Frontend Unit-test assertions; job `134600983404` |
| #164 `f7dcfcf6ee85e3ee77e627f8d34776fd03b91cfe` | [44253605974](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253605974) | Frontend Unit-test assertions; job `134639430679` |
| #165 `84de0838284b50dc38bf8107aee15b046dd4cc6a` | [44253962999](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44253962999) | Frontend Unit-test assertion for Issue #136 closed evidence; job `134641326182` |
| #166 `205d39742a8c98e94453df44106ec83d5dba0ea0` | [44254136344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44254136344) | Frontend Unit-test assertion for Issue #142 closed evidence; job `134640042799` |
| #167 `3177cfba1cbaee43a9feed2dd8b2010249a7d12f` | [44255156916](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44255156916) | Runtime npm audit: 28 findings (2 moderate, 26 high); job `134646397900` |
| #168 `a935803ac1c0b614fd3b49180da29b6bcd3f7b1e` | [44272119611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272119611) | Frontend Unit-test review-inventory assertion; job `134709127439` |
| #169 `0b6d97be460cabc24013b15d180cdf6d4180d42b` | [44272942930](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44272942930) | Frontend Unit-test review-inventory assertion; job `134707115975` |
| #170 `6de7cedc9b1214f7bf819e8b76fd1d8986d8d085` | [44273476324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44273476324) | Runtime npm audit: 28 findings (2 moderate, 26 high); job `134710038578` |

The #167/#170 audit failures are historical exact-head findings from before the GitHub advisory withdrawal. They are not current evidence of an active GitHub-reviewed HIGH advisory and are not evidence that the lockfile was remediated. Unit-test assertion failures and runtime npm audit failures remain separate classes.

### PR #41 and historical remediation chain

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) succeeded. Review inventory: 26 submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved. Both P2 Redis runbook threads are resolved.
- Three obsolete zero-job workflows remain QUEUED on stale SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). Each has zero jobs and requires repository-admin cancellation; none is a current main check.
- PR #65 is CLOSED/unmerged. Its package.json blob `d91e6ff791d5c80a14fe056f7c19662ebf73bc9d` and package-lock blob `2bccc4107db8e2b4ac638215328677761d34374a` are byte-identical to main. The Redis P2 fixes landed through #41, not by merging #65.
- PR #67 is CLOSED/unmerged. Successor #96 exact HEAD `e06a3c3513244289169b705fa7b1e9ee381945e0` has Validation [43800887062](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887062), CodeQL [43800886964](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800886964), Dependency Review [43800887028](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43800887028), all SUCCESS. It has 2 COMMENTED reviews, 1/1 resolved inline thread, and 0 human APPROVED.
- PR #68 is CLOSED/unmerged at exact HEAD `a4324896a95aca621885ba89daa44f96bdcb636f`. Validation [43436750104](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750104), CodeQL [43436750094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750094), and Dependency Review [43436750108](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43436750108) succeeded. Backend used cryptography 50.0.2; pip-audit reported no known vulnerabilities. This is separate from frontend npm audit.
- PR #69 is CLOSED/unmerged at exact HEAD `a84fdf39792da4ce6c663d88b976861fa3c968be`. Validation [43432490009](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43432490009) failed in backend pytest (175 passed / 2 failed: EC X-coordinate integer `len()` TypeError and unsupported `key_id` argument) and frontend runtime npm audit (18 findings: 1 low, 8 moderate, 8 high, 1 critical). Backend pip-audit was skipped after pytest failed. This does not make original PR #69 green.
- Successor #116 exact HEAD `27fafece2783b11677bdd90e896a1c0e8551aa86` has Validation [43938664477](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664477), CodeQL [43938664451](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664451), Dependency Review [43938664475](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43938664475), all SUCCESS. app.json loads the CommonJS `modules/useit-app-attest/app.plugin.js`; runtime `index.ts` remains separate and `expo-module.config.json` supplies iOS autolinking. Node 22 Android/iOS prebuild coverage passed. It has 2 COMMENTED reviews, 1/1 resolved thread, 0 human APPROVED.

### Issue #64 / PR #99 — SSRF transport versus production acceptance

- PR #99 remains OPEN/DRAFT on base main at exact HEAD `f91c70d2636948e538f8e3559afc39cd93eb5139`. Validation [43772791089](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791089), CodeQL [43772791064](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791064), Dependency Review [43772791109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43772791109) are terminal SUCCESS. Review inventory: 4 COMMENTED submissions, 2/2 inline threads resolved, 0 human APPROVED.
- The HTTPX 0.28.1/httpcore 1.0.9 socket/TLS tests cover redirect-hop DNS re-resolution, all-answer public/global validation, numeric-IP connection pinning, peer check before TLS/request bytes, original Host/TLS SNI, and disabled keep-alive/proxy reuse.
- Production acceptance remains BLOCKED on independent human security approval, production NAT64/DNS64 translator-prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress/deployment evidence. No deployment or production acceptance is claimed.

### Picomatch / Issue #155 — advisory status and product reachability

- The official [GitHub Advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) is WITHDRAWN on 2026-11-18; it retains historical affected versions through 4.0.7 and lists no patched version. [Snyk](https://security.snyk.io/vuln/SNYK-JS-PICOMATCH-21248802) says revoked / deemed not a vulnerability. The [OSV record](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf) still reports HIGH with Modified 2026-11-17, so OSV is not synchronized with the GitHub withdrawal. Do not describe this as an active GitHub-reviewed HIGH advisory or as a patched npm release.
- The official [npm version history](https://www.npmjs.com/package/picomatch?activeTab=versions) still lists 4.0.7 as latest; there is no 4.0.8. The lockfile contains 4.0.7 under Expo/Metro/tinyglobby paths plus dev-only tooling. Reviewed product entry points accept plain-text search or product URLs; no untrusted user-defined glob-pattern input was found in those reviewed paths. This is partial reachability evidence, not repository-wide proof. Issue #155 remains OPEN for product-level reachability/acceptance review.
- Upstream PRs remain OPEN/unmerged: #264 HEAD `8144a1a22a8fa1766951411f220cc8c6228cb041`, 0 reviews, Tests run [44202778983](https://github.com/micromatch/picomatch/actions/runs/44202778983) ACTION_REQUIRED; #265 HEAD `dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c`, 0 reviews, Tests [44202787490](https://github.com/micromatch/picomatch/actions/runs/44202787490) and CodeQL [44202787411](https://github.com/micromatch/picomatch/actions/runs/44202787411) ACTION_REQUIRED; #254 HEAD `c63a5bf4e61dbdb81bc41e97dc2616c30acce337`, 0 reviews, Tests [44148748026](https://github.com/micromatch/picomatch/actions/runs/44148748026) ACTION_REQUIRED; #257 HEAD `4e4892e0ac6c374ec3d9e4dc430101da9a20a37b`, 1 APPROVED, Tests [44170126549](https://github.com/micromatch/picomatch/actions/runs/44170126549) ACTION_REQUIRED; #238 HEAD `44f192261f312ddf236cb7bdc05d8f22663f98f9`, 3 APPROVED / 3 COMMENTED, Tests [39833229778](https://github.com/micromatch/picomatch/actions/runs/39833229778) ACTION_REQUIRED; #246 HEAD `f03bec2c02e46f063fbfdc161aae1d0f854b2565`, 0 reviews, Tests [41234593564](https://github.com/micromatch/picomatch/actions/runs/41234593564) and CodeQL [41234593582](https://github.com/micromatch/picomatch/actions/runs/41234593582) ACTION_REQUIRED. No upstream patch is accepted or released.
- Exact regression patterns to preserve are `+(*)`, `*(*)`, `+(a*)`, `+(*a)`, `*(a*|b)`, and `+(ab|abab)`. PR #238 comments still report `+(*)` at 3063 ms for n=28, `*(*)` at 1216 ms for n=28, and `+(a*)` at about 1970 ms for n=26. This candidate does not close all observed cases.
- The non-upstream `ryotsu-kankichi/secured-picomatch` fork remains unaccepted: PR #1 merged release commit `f9822e9514d490f3e3bc17f50a4d3cacff2056c2`, whose run [40650811785](https://github.com/ryotsu-kankichi/secured-picomatch/actions/runs/40650811785) has 22/22 successful jobs. Current master is `3ab5a7627d480259e3d9ca67fbc14c125d374f0e`, unprotected, with no current check runs; PR #1 has 0 reviews and 0 inline threads. Package metadata says `@ryotsu/picomatch@4.0.7-a`; npm registry provenance/integrity is not verified. The patch changes capture-group semantics and `maxExtglobRecursion:false` disables the safeguard. Do not import, pin, alias or override it without independent review, provenance/integrity, exact-pattern tests, full SDK 57 frontend/Android/iOS migration tests, exact-head CI and human approval.

### Repository governance and canonical registers

- Main HEAD remains `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Protect main ruleset #26370589 is ACTIVE with one required approval, last-push approval, resolved review threads, six strict required checks, deletion/non-fast-forward protection and no bypass actors. Main is protected; no protection setting changed.
- Fresh inventory: 129 branches (100 + 29 + 0), 69 open PRs, 7 open non-PR issues, 0 published releases. Code Scanning, Dependabot and Secret Scanning alert inventories remain unverified through this integration, not zero.
- Issue #74 remains OPEN. The 168-hour checklist remains **64 items / 41 checked / 23 open**. The separate 25-point release register remains **2 Done / 15 In Progress / 8 Blocked**. No checkbox changed. External Apple/Google console setup, physical devices, production cloud, witnessed backup/restore, monitoring, staged rollout and pilot/business approval remain BLOCKED without direct evidence.
- No main-branch write occurred. No merge, force-push, audit suppression or security-gate weakening occurred.

**RELEASE NOT READY. PRODUCTION/PILOT ACCEPTANCE NOT GRANTED.**

---

