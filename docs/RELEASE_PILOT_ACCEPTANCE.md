## Current release evidence checkpoint — 2026-11-20 23:18 CET

This checkpoint supersedes the 21:41 CET checkpoint. Evidence was refreshed at 22:18 UTC against live PR metadata, branch refs, exact-head Actions runs/jobs, issues, and release records. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and 1 human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) are still QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not current-head successes or failures. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors. The legacy branch-protection detail endpoint remains restricted to this integration; the active ruleset and branch metadata are the available evidence.

### Current-main remediation candidates

- **PR #193:** OPEN/DRAFT, 5 commits, 4 changed files, stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS on that SHA. Its frontend runtime audit reports 3 moderate minimatch findings.
- **PR #200:** OPEN/DRAFT on current main, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates complete DNS answers and redirect hops, pins numeric-IP TCP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its frontend runtime audit still reports 3 moderate minimatch findings; a passing high-severity threshold is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence, and independent security-owner approval remain outstanding.
- **PR #201:** OPEN/DRAFT on current main, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 migration. It is unmerged and awaits human review.
- **PR #202:** OPEN/DRAFT on current main, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** OPEN/DRAFT on current main, exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change protects Node 22 for Android and iOS native prebuild. PRs #200–203 are based on current main; all remain unmerged and require human review.

### PR #204 — current documentation branch

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 9 commits and 4 changed files. Current exact HEAD is `cbdb625f775acb0267069b2405972b4d2ea380f8`.
- Current exact-head Validation [44821276883](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883) is terminal FAILURE. Frontend job [136596379668](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596379668) failed in `scripts/release-evidence-checkpoint.test.mjs`: 330 tests passed and 2 failed; 71 other test files passed. The two failures are stale test expectations: the test expects `450 pytest` although the current checkpoint does not assert that backend test count, and its regex `/published GitHub releases\s+0/i` omits the colon in the documented text `Published GitHub releases: 0`. This is a regression-test assertion defect, not an application failure.
- The frontend source-boundary check and TypeScript passed. Android export, Android Release/emulator smoke, Expo Doctor, and frontend runtime audit were skipped after the unit-test failure; no Android or frontend runtime-audit pass is claimed for this HEAD.
- Backend job [136596381544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596381544) SUCCESS; its readiness suite reported 27 passed and production-security suite 78 passed, and the backend dependency-audit step completed successfully. iOS job [136596463771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276883/job/136596463771) SUCCESS, including native iOS Release build and simulator smoke.
- Exact-head CodeQL [44821276876](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876), Analyze job [136582473058](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276876/job/136582473058), terminal SUCCESS. Exact-head Dependency Review [44821276864](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864), job [136582472196](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44821276864/job/136582472196), terminal SUCCESS. Its bot comment reports `Scanned Files: None`; this is not a repository-wide dependency or alert inventory.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to the older `62c3bf1` HEAD and should be reconciled after the next exact-head validation.

### Issues and security

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 84 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on the merged PR #41 commit, 17 commits ahead and 2 behind current main; its empty-body approval is not explicit independent security-owner sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 92 comments. The picomatch advisory was withdrawn, but this does not constitute a patched package or complete runtime reachability assessment. Six lockfile resolutions remain; security-owner acceptance is incomplete.

### Repository inventory and security alert limitations

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unverified, not empty: the connected GitHub integration does not expose those alert endpoint families. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- Main still contains the older 2026-11-13 release records: `RELEASE_RUNBOOK.md` blob `b7b848743edf8fb8c238ef3367b0e74b64e6d540`, `RELEASE_PILOT_ACCEPTANCE.md` blob `f6bd4f041f802d0286b209769621079e517bd3a1`, and `25-POINT-RELEASE-BACKLOG.md` blob `891ec704b18bb1a59c9598b9fe2aedd0a9df9dae`. The refreshed records remain on this PR branch and are not yet integrated into main.

### Canonical 25-point release register

The row-level register contains 25 items and independently parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision. Issue #47 verifies branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed only in the documentation regression-test file; CodeQL and Dependency Review passed. Correct the two stale assertions with a targeted test-only change, then verify all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. This checkpoint does not grant production or pilot acceptance.

---

## Current release evidence checkpoint — 2026-11-20 21:41 CET

This checkpoint supersedes the 21:13 CET checkpoint. Evidence was refreshed at 20:41 UTC against current GitHub refs and exact-head workflow runs. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. PR #204 current exact HEAD is `2182ef09fb32f061780552df20a52aadae6770e5`; its own Validation is terminal FAILURE, while its own CodeQL and Dependency Review are terminal SUCCESS. No parent-run result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all succeeded.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. They are historical queues, not successful or failed current-head checks. Repository administrator cancellation is required.

### Main governance

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch metadata reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, with no bypass actors.
- The legacy branch-protection detail endpoint is restricted to this integration; the active ruleset and branch metadata are the available protection evidence.

### Current-main remediation candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all terminal SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend runtime audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. DNS-pinned outbound transport validates DNS answers and redirect hops, pins numeric-IP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Its runtime audit still reports 3 moderate minimatch findings; the high-severity threshold passing is not a zero-finding audit. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, staging/production egress evidence and independent security-owner approval remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities` after the minimatch 11.0.5 override and lockfile update. This candidate remains OPEN/DRAFT and unmerged pending human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild. These four current-main candidates remain OPEN/DRAFT and await human review; no candidate is merged by this automation.

### PR #204 — current documentation branch

- **PR #204:** OPEN/DRAFT on current main, 7 commits and 4 changed files. Branch `docs/release-evidence-current-main-20261120-run11`; exact HEAD `2182ef09fb32f061780552df20a52aadae6770e5`.
- PR #204 current exact-head Validation [44810024178](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178): terminal FAILURE. Backend job [136556435007](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556435007) SUCCESS; iOS job [136556511770](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556511770) SUCCESS, including native iOS Release build and simulator smoke; frontend job [136556433414](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024178/job/136556433414) FAILURE at Unit tests. The suite reported 331 passed and 1 failed, with 71 other test files passed. The failing regression assertion expected the obsolete literal `PR #204 exact-head Validation`; the checkpoint uses the label `**PR #204:**`. This is a test expectation/documentation-label mismatch, not an application defect. Android export/Release/emulator and frontend runtime-audit steps were skipped after the unit-test failure.
- PR #204 current exact-head CodeQL [44810024440](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440), Analyze job [136543878467](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024440/job/136543878467): terminal SUCCESS. Dependency Review [44810024188](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188), job [136543875977](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44810024188/job/136543875977): terminal SUCCESS.
- Validated parent `7dbc4110b25ab3a879f8711f005d7876b1fbb74e` independently passed its own Validation [44794452919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452919), CodeQL [44794452874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452874), and Dependency Review [44794452833](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452833). Those parent results are not transferred to current HEAD `2182ef0`.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. One human status comment still refers to older SHA `62c3bf1` and needs reconciliation after the next exact-head validation.

### Separate stacked documentation child

- **PR #205** is a separate OPEN/DRAFT child in the PR #85 documentation chain, not a current-main PR and not part of PR #204. Exact HEAD `9f275e853429de173975f87bf1bd3ea476e7b9ce`, base `ea1bf815d90d91026b24c46ec1869b8218211d80`. Exact-head Validation [44799071611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071611), CodeQL [44799071582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071582), and Dependency Review [44799071704](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071704) all terminal SUCCESS. It changes the same three release records; reconcile overlapping documentation before integration. Its Dependency Review bot reports `Scanned Files: None`, not a repository-wide alert inventory.

### Issues #47, #64 and #155

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main branch protection is verified through branch metadata and active ruleset 26370589.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 83 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`, 17 commits ahead and 2 behind current main; its empty-body human approval is not explicit independent security sign-off. Production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 90 comments. The picomatch advisory was withdrawn on 2026-11-18 by GitHub and OSV; this is not a patched npm release. Six lockfile resolutions remain and product-level runtime reachability/security-owner acceptance is incomplete. Do not import the unreviewed fork or suppress the audit.

### Repository inventory and security alerts

- Repository is public. Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. Published GitHub releases: 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Successful CodeQL/Dependency Review workflows and bot comments with `Scanned Files: None` do not establish empty alert inventories.
- The three release records on this PR branch carry identical checkpoint sections. Main still has the older 2026-11-13 records; this PR has not been merged.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies active branch protection; it does not record that separate final decision. Reverify the ruleset after any visibility change.
- **#4** requires production Apple App Attest entitlement and verification on a physical iPhone. **#5** requires Play Integrity on a physical Android installed from Play. **#16** requires witnessed production backup/restore. **#18** requires a representative product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- The row-level table contains 25 items and independently parses to 2 Done / 15 In Progress / 8 Blocked. No physical-device, production, backup/restore, monitoring, rollout or business-acceptance item is promoted by CI, simulator or emulator evidence.

**Release decision:** PR #204 current exact-head Validation failed on a documentation regression-test assertion; CodeQL and Dependency Review passed. Fix the targeted test assertion, then rerun all mandatory workflows on the resulting exact HEAD. No parent CI is substituted. No production or pilot acceptance is granted.

---

## Current release evidence checkpoint — 2026-11-20 17:18 CET

This checkpoint supersedes the 15:07 CET branch checkpoint and the 2026-11-13 main-branch checkpoint. Evidence was refreshed at 16:18 UTC. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. The validated PR #204 parent is `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`; all three workflows for that exact SHA are terminal SUCCESS. This documentation-only child must pass its own exact-head CI; no parent result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; its live branch ref and PR head both equal `68b380e73ca3c870048035197beef8febbf90ef1`. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that SHA. Review inventory: 53 conversation comments, 30 inline comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each has zero jobs. Administrator cancellation is required.

### Main governance

- Repository visibility is public; main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and the branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved threads, deletion and non-fast-forward protection, with no bypass actors.

### Current-main candidates

- **PR #193:** exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all SUCCESS. It is stacked on base `0b991f23856962a5164e63f864e3578130fee6ca`, not directly on main. Its frontend audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all SUCCESS. DNS-pinned transport is validated in CI; production prefix inventory, deployed `USEIT_NAT64_PREFIXES` and staging/production egress remain outstanding.
- **PR #201:** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all SUCCESS. Its exact-head frontend npm audit explicitly reports `found 0 vulnerabilities`; the minimatch 11.0.5 candidate is not merged and awaits human review.
- **PR #202:** exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all SUCCESS. CodeQL init/analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild.
- **PR #204:** OPEN/DRAFT, 2 commits, 4 files, validated parent HEAD `b375c6608cbdd3436fa1893d2d118b2cab9f3d73`. Validation [44754308331](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331), CodeQL [44754308313](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313), Dependency Review [44754308298](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298) all SUCCESS on that exact SHA. Validation backend [136349905143](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905143), frontend [136349905785](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905785), and iOS [136349905872](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308331/job/136349905872) passed; CodeQL analyze [136349905207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308313/job/136349905207) and Dependency Review [136349905003](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44754308298/job/136349905003) passed. Frontend: 332 tests across 72 files, Expo Doctor 21/21, Android Release/emulator smoke; runtime npm audit still reports 3 moderate minimatch findings. Backend: 450 pytest, 27 readiness checks, 78 production-security checks; pip-audit reports no known vulnerabilities. iOS Release/simulator smoke passed. Dependency Review scanned no manifest files. PR #204 has 1 bot comment, 0 inline threads, 0 formal reviews, no human approval; `tarlaci1984-sketch` is requested.

### Issues #47 and #64

- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments; main protection is independently verified above.
- [Issue #64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 79 comments. Older PR #99 is OPEN/DRAFT at `f91c70d2636948e538f8e3559afc39cd93eb5139`; comparison with current main is DIVERGED, 17 commits ahead and 2 behind. It has one human APPROVED review from `milanzoltanics`, but the empty review body is not explicit security sign-off. PR #200 is the current-main successor. Production acceptance still requires independent security-owner approval, production DNS64/NAT64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification and staging/production egress evidence.

### Repository inventory and security alerts

- Paginated branches: 160 (100 + 60 + 0). Open pull requests: 96. Open non-PR issues: 8. published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; status remains **unverified, not empty**. Green CI is not an alert-inventory query.
- PR #193/#204 runtime npm audit: 3 moderate minimatch findings. PR #201's separate exact-head audit: `found 0 vulnerabilities`. Backend pip-audit on PR #204: no known Python vulnerabilities.

### Canonical 25-point release register

- **Done (2):** #1, #6.
- **In Progress (15):** #3, #7, #8, #9, #10, #11, #12, #13, #14, #15, #17, #19, #20, #23, #24.
- **Blocked (8):** #2, #4, #5, #16, #18, #21, #22, #25.
- #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision. #4 requires production Apple App Attest and a physical iPhone; #5 requires Play Integrity on Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring/alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

Production/pilot acceptance remains **NOT GRANTED**. External console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout/rollback approvals and real-user/business approval remain blocked until direct evidence exists. No PR is merged automatically; no security threshold or required check is weakened.

---

## Current release evidence checkpoint — 2026-11-20 15:07 CET

This checkpoint supersedes the 2026-11-13 18:49 CET main-branch checkpoint and the earlier 2026-11-20 13:09 CET stacked-branch snapshot. It is based on current `main` HEAD `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266` and fresh GitHub evidence captured at 2026-11-20 14:07 UTC. CI results apply only to the exact SHA named beside each run. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on source branch `fix/release-blockers-2026-10`; its exact source-branch ref and PR head are both `68b380e73ca3c870048035197beef8febbf90ef1`. The merge commit is `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`; current `main` has advanced to `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- PR #41 contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on `68b380e73ca3c870048035197beef8febbf90ef1`. Validation frontend [132115828836](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115828836), backend [132115829214](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829214), and iOS [132115829399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234/job/132115829399) all passed; CodeQL analyze [132115827817](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161/job/132115827817) and Dependency Review [132115827187](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021/job/132115827187) also passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, and 109 combined timeline records.
- Historical PR #41 runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head failures; repository administrator cancellation is required.

### Current-main remediation candidates

- **PR #193 — release-document regression correction:** OPEN/DRAFT, stacked on `fix/release-doc-checkpoint-inventory-case-20261120-run11` at base SHA `0b991f23856962a5164e63f864e3578130fee6ca`, not based directly on current main. Exact HEAD `c1250400f5c6022483c967c8b79a42be0dc614fd`; 5 commits, 4 changed files, +653/-0 relative to its base. Its own Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) are terminal SUCCESS on that exact HEAD. Validation frontend [136311632814](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311632814), backend [136311633349](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633349), and iOS [136311633065](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619/job/136311633065) passed; CodeQL analyze [136311632689](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647/job/136311632689) and Dependency Review [136311632118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582/job/136311632118) passed. Frontend: 307 tests across 61 files, TypeScript, Expo Doctor 21/21, Android Release and emulator smoke passed. Backend: 450 tests, 27 readiness checks, 78 production-security checks and pip-audit passed; pip-audit reported no known Python vulnerabilities. iOS Release and simulator smoke passed. The frontend runtime npm audit still reports 3 moderate minimatch findings; it is not clean. PR #193 has 1 conversation comment, 0 inline threads, 0 formal review submissions and no human approval. This stacked PR's evidence is not substituted for a current-main documentation commit.
- **PR #200 — DNS-pinned product-page transport:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`. Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 327 tests and Android Release/emulator plus iOS Release/simulator smoke passed; backend tests and pip-audit passed. The patch pins outbound TCP connections to validated numeric DNS answers, revalidates each redirect hop, checks the connected peer, preserves original Host/TLS SNI, disables environment proxy inheritance and requires explicit network-specific `USEIT_NAT64_PREFIXES`. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded. Production prefix inventory, deployed configuration and staging/production egress evidence remain outstanding.
- **PR #201 — minimatch migration:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`. Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS on that exact HEAD; frontend, backend and iOS jobs passed. Frontend reported 334 tests, Android/iOS Release and smoke passed, and `npm audit --omit=dev --audit-level=high` explicitly reported **found 0 vulnerabilities**. The candidate pins all lockfile minimatch resolutions to 11.0.5 and adds regression coverage. It remains draft/open with reviewer `tarlaci1984-sketch` requested and no formal human approval. This is a candidate, not a merged-main audit result.
- **PR #202 — CodeQL action consistency:** OPEN/DRAFT on current main base `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`. Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) are terminal SUCCESS on that exact HEAD. Frontend reported 329 tests; backend and iOS jobs passed. CodeQL init and analyze use the same immutable v4.39.4 commit `1bd86f2fdb4b86187fa4059f16f31a3202acc9ea`, guarded by a regression test. Reviewer `tarlaci1984-sketch` is requested; no formal human approval or inline review thread is recorded.
- PR #99 remains an older DNS-pinning branch at `f91c70d2636948e538f8e3559afc39cd93eb5139`. Compared with current main it is DIVERGED: 17 commits ahead / 2 behind, merge base `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. PR #200 is the current-main successor; do not use PR #99's old green runs as current-main integration evidence.

### Issues, branch protection and release inventory

- Issue #47 is CLOSED with 11 comments. Main is protected and active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approving review, stale-review dismissal, last-push approval and resolved review threads; deletion and non-fast-forward are blocked; no bypass actors are configured.
- Issue #64 remains OPEN with 76 comments. Its current-main successor PR #200 has passed exact-head CI, but independent human security approval, a production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence are still missing. Production acceptance remains BLOCKED.
- Issue #155 remains OPEN with 83 comments. Advisory `GHSA-fc5q-39xc-vjpf` is WITHDRAWN (2026-11-18); the lockfile has six picomatch entries and repository-wide runtime-call reachability review remains incomplete. Withdrawal is not a patched-release claim.
- Repository visibility is PUBLIC. Current `main` is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; branch inventory is 159 (100 + 59, third page empty), open pull requests 95, open non-PR issues 8, and published GitHub releases 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub interface. Their status is **unverified, not empty**. Green CodeQL or Dependency Review workflows do not establish an empty alert inventory.

### Canonical 25-point release register

The current row-level register is **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Issue #47 verifies that branch protection is active and is correctly closed; that does not record the separate final visibility decision. Reverify the ruleset after any visibility change.
- External acceptance blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark and business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No published release exists. Human review remains outstanding on PRs #193, #200, #201 and #202; no PR is merged automatically by this process.

---

## Superseded acceptance checkpoint — 2026-11-13 18:49 CET

**Pilot/production acceptance: NOT GRANTED.**

Immediately before the current integration commit, PR #41 exact HEAD was `b793a47f8f0a84155d1200fc797f191701f4eb92`. Its exact-head Validation [#43463804114](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804114) failed in the frontend job after 285/285 unit tests passed. Expo Doctor passed 20/21 checks but reported four Expo SDK 57 patch mismatches. Backend and iOS Validation jobs passed; CodeQL [#43463804128](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804128) and Dependency Review [#43463804149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43463804149) passed on that exact pre-integration HEAD.

The remediation candidate in draft PR [#65](https://github.com/milanradics89-beep/POS-Doctor/pull/65), exact HEAD `678fe7fde32f4dc785288d5a8ac939f1ac6478f0`, passed its own Validation [#43452488602](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488602), CodeQL [#43452493289](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452493289), and Dependency Review [#43452488754](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43452488754). Its tested dependency, workflow, and regression-test changes are included in this integration commit. **The integration commit has a new exact-head CI gate and is not accepted until all required checks pass for that resulting SHA.** Parent and candidate CI results are not substituted for the integration commit's own results. PR #65 remains draft/open and has not been merged.

PR #41 remains open and unmerged. Its current review inventory before this integration was 22/22 inline threads resolved, 25 review submissions, and **0 human APPROVED**. The active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) requires six strict status checks, one approving review, approval of the last push, and resolved review threads. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed.

Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains open. DNS-pinning PR #70 and redirect-chain fix PR #79 each passed their own exact-head Validation, CodeQL, and Dependency Review. Human review and integration are still required; no production deployment or exploit is claimed.

The repository has **0 published GitHub releases**. Code Scanning, Dependabot, and Secret Scanning alert inventories are **unverified, not zero** because the connected integration does not expose those endpoints.

### External acceptance requirements remain blocked

- **#4 App Attest:** production Apple App ID/capability and provisioning entitlement, signed production build, and provider-backed enrollment/assertion test on a supported physical iPhone.
- **#5 Play Integrity:** Play internal-track distribution, Play App Signing identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play.
- **#16 Backup/restore:** witnessed production backup and restore with measured recovery point and recovery time.
- **#18 Product accuracy:** representative labelled dataset, measured accuracy, human evaluation, and business acceptance.
- **#21 Monitoring:** production metrics/log pipeline, named on-call owner, and verified alert delivery/acknowledgement.
- **#22 Rollout:** approved staged rollout gates, monitoring thresholds, named rollback owner, and tested rollback.
- **#25 Pilot:** real-user cohort, measured acceptance criteria, participant safeguards, and business sign-off.

The 25-point register remains **3 Done / 15 In Progress / 7 Blocked**. Simulator/emulator evidence does not satisfy physical-device, production, backup/restore, monitoring, rollout, pilot, or business acceptance.

---

## Latest acceptance checkpoint — 2026-11-11 21:40 CET

**Automated CI acceptance for validated parent PR #41 HEAD 4883c652d61b93236b7a604f124bf5708caa07e6: PASSED. The documentation-only child created by this checkpoint has its own exact-head CI gate. Pilot/production acceptance: NOT GRANTED.**

PR #41 remains open, unmerged, and non-draft on fix/release-blockers-2026-10, targeting main.

### Exact-head automated evidence for parent 4883c65

All three required workflows completed successfully for the same exact SHA:

- Validation [#43090044324](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324):
  - Backend [130764391957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391957): success.
  - Frontend/Android [130764391800](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391800): success, including unit tests, pinned Expo Doctor, Android export/Release build, emulator install/launch smoke, and runtime dependency audit.
  - iOS [130764391399](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044324/job/130764391399): Release simulator build and install/launch smoke passed.
- CodeQL [#43090044306](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306), analyze [130764391156](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044306/job/130764391156): success.
- Dependency Review [#43090044397](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397), job [130764390843](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43090044397/job/130764390843): success; no high-or-higher vulnerable package in the reviewed diff and no denied package.

The unchanged validated source/test baseline 2faa49c records 450 backend tests, 27 production-readiness checks, 78 security/privacy checks, 285 frontend tests across 58 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release simulator/smoke. Those detailed counts belong to the unchanged source/test baseline; the exact 4883c65 documentation descendant independently reran all three workflows successfully.

### Remaining dependency and security findings

- Runtime npm audit: four moderate transitive glob/minimatch findings; no high-or-higher finding at the configured high threshold.
- Dependency Review metadata: unknown license metadata for vendor/deepmerge@4.3.2; Scorecard results below threshold for @expo/devcert (2.9) and is-mergeable-object (1.5).
- CodeQL succeeded with a previously observed non-fatal SARIF column-kind mismatch warning.
- Code Scanning, Dependabot, and Secret Scanning alert inventories remain **unverified, not zero** because the connected integration does not expose their alert endpoints.

### Review and governance

- The Codex review of 4883c65 raised two P2 documentation findings. This child restores the operational release procedures and distinguishes the validated parent from the new documentation HEAD; both corresponding threads are resolved after the push.
- At pre-write capture: 20 inline threads total, 18 resolved and 2 open; 24 review submissions, 0 APPROVED. A fresh Codex review is requested for this documentation child. Human approving review and last-push approval remain mandatory.
- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks, one approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection, and no bypass actors.
- Main HEAD: 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0. The release branch was 512 commits ahead and 0 behind immediately before this documentation-only child.
- Repository inventory: 32 branches, 19 open PRs, 4 open non-PR issues (#46, #25, #24, #23). GitHub Releases API returns 0 published releases.

### External acceptance requirements

- **#4 App Attest:** Apple production App ID/capability and provisioning entitlement, signed production build, and supported physical iPhone enrollment/assertion test.
- **#5 Play Integrity:** Google Play internal-track distribution, Play App Signing certificate identity, Google Cloud service-account/API permissions, and verification on a physical Android installed from Play.
- **#16 Backup/restore:** witnessed production backup and restore with documented recovery point and recovery time.
- **#18 Product accuracy:** representative labelled image dataset, measured accuracy, human evaluation, and business acceptance.
- **#21 Monitoring:** production metrics/log pipeline, named on-call owner, and verified alert delivery/acknowledgement.
- **#22 Rollout:** approved staged rollout gates, monitoring thresholds, named rollback owner, and tested rollback.
- **#25 Pilot:** real-user pilot cohort, measured acceptance criteria, participant safeguards, and business sign-off.

The repository currently has no eas.json; a reviewed EAS production build profile and external store-signing configuration must be created before store artifacts can be treated as ready. Simulator/emulator evidence does not satisfy physical-device, production, backup/restore, monitoring, rollout, pilot, or business acceptance.

**Automated CI acceptance for exact parent 4883c65: PASSED. The new documentation child remains a separate CI gate. Pilot/production acceptance: NOT GRANTED. Do not merge automatically or bypass required checks.**

---

## Current release evidence checkpoint — 2026-11-22 01:21 CET

Evidence refreshed at 2026-11-22 00:21 UTC from live PR metadata, branch refs, exact-head Actions runs/jobs, issue records, ruleset metadata, and release inventory. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, +11,887 additions, and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- Complete review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 0 unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; all three jobs endpoints return zero jobs. They are historical queues, not current-head failures. Repository administrator cancellation is required.

### PR #204 — clean-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 10 commits and 4 changed files. PR metadata and branch ref agree: PR #204 current exact HEAD is `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`.
- Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE. Frontend job [136618168236](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618168236) failed one assertion in `scripts/release-evidence-checkpoint.test.mjs`: the test expects the obsolete phrase/head `PR #204 current exact HEAD is cbdb625...`, while the checkpoint uses a different sentence and records the prior head. This is a release-evidence/test-contract defect, not a demonstrated application runtime defect. Backend job [136618171118](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618171118) and iOS job [136618170211](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885/job/136618170211) passed.
- Exact-head CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on the same SHA.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The current candidate remains unapproved and unmerged.

### Other release-evidence candidates

- PR #206 exact HEAD `df0c26e7fb14b170b4f7cd80da570ce031480720`: Validation [44918462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462263) terminal FAILURE; CodeQL [44918462197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462197) and Dependency Review [44918462179](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462179) SUCCESS.
- PR #217 exact HEAD `1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a`: Validation [44930055117](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055117) terminal FAILURE; CodeQL [44930055149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055149) and Dependency Review [44930055266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055266) SUCCESS.
- PR #218 exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) SUCCESS.
- PR #219 exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while its live base branch (PR #218) is `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. Its CodeQL inefficient-regex thread remains unresolved/outdated. The iterative parser correction in commit `6909afe` is not verified on current HEAD.
- PR #215 exact HEAD `061bd79a581f5c98385bab58dc9d355ece2f3fce` has 3/3 exact-head workflows SUCCESS, but is DIVERGED from the current PR #206 base (1 ahead / 5 behind) and is not mergeable.
- PR #220 exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11`, a separate PR #85 test-only correction, has exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) all terminal SUCCESS. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs passed. This does not validate PR #204 or PR #219.

### Issues, security, and current-main remediation

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with six strict required checks, one approving review, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. Repository visibility is public. The separate durable visibility/release-plan decision is not recorded; backlog item #2 remains Blocked.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 96 comments. Current-main PR #200 exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a` has Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. Backend evidence: 539 tests, 27 production-readiness checks, 78 security/privacy checks, and a local TCP/TLS integration test. PR #200 has 0 formal reviews and 0 inline threads. Production remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- Current-main PR #201 exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068` has Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS; its frontend runtime audit reports found 0 vulnerabilities. PR #201 remains an unmerged draft pending human review and does not make repository-wide security-alert inventories available.
- Current-main PR #203 exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f` has Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS.
- Issue #74 has 356 comments; issue #149 has 275; issue #155 has 120. The separate 64-item development checklist remains 41 checked / 23 open. The earlier frontend runtime audit reported 3 moderate minimatch findings; PR #201's separate exact-head audit reports 0 vulnerabilities, but it remains unmerged and full alert inventories remain unavailable.

### Release records and 25-point register

- Main's three release records remain on the 2026-11-13 checkpoint. Main `RELEASE_PILOT_ACCEPTANCE.md` still incorrectly says PR #41 is open/unmerged and had zero human approvals; live GitHub shows it is merged with one human approval. This is a real documentation defect and must be integrated through a reviewed candidate, not a direct main edit.
- The three PR #204 candidate documents are synchronized but their previous checkpoint is stale. This commit appends the current exact-head evidence section to all three and updates register rows #10 and #24 without changing any status.
- The candidate row-level 25-point register contains exactly 25 rows: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's older register remains 3 Done / 15 In Progress / 7 Blocked; the two registers are not silently merged.
- #2 remains Blocked pending the owner's durable visibility/release-plan decision. #4 physical iPhone App Attest; #5 Play-installed physical Android Play Integrity; #16 witnessed production backup/restore; #18 representative product-recognition benchmark/business acceptance; #21 production monitoring and witnessed alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off remain Blocked.
- Published GitHub releases: 0. Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. No simulator, emulator, or automated test result is promoted into physical-device, production, backup/restore, monitoring, rollout, or business acceptance.

---

---

## Current release evidence checkpoint — 2026-11-22 02:12 CET

Evidence refreshed at 2026-11-22 01:12 UTC from live PR metadata, exact branch refs, exact-head Actions runs and jobs, issue records, ruleset metadata, and the GitHub Releases endpoint. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs all passed.
- Review inventory: 109 combined timeline records; 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), and 22/22 inline review threads resolved (0 unresolved).
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head successes or failures. Repository administrator cancellation is required.

### Main governance and repository inventory

- Repository visibility is public. Main HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; the main branch API reports `protected: true`.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and enforces six strict required checks (`CodeQL`, `backend`, `frontend`, `ios`, `analyze`, `dependency-review`), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors. The legacy branch-protection subresource reports checks disabled; the active ruleset is the enforcement source.
- The release-branch search returned 80 matching branch names and pagination is exhausted. The release-evidence chain includes PR #204 on `docs/release-evidence-current-main-20261120-run11`, PR #218 on `fix/release-evidence-pr217-description-assertion-20261121-run11-child`, PR #219 on `fix/release-evidence-pr218-current-ci-20261121-child`, and PR #220 on `fix/pr85-audit-evidence-assertion-format-20261121-child`.
- GitHub Releases API returned an empty array: **Published GitHub releases: 0**.

### PR #204 — current-main release-documentation candidate

- PR #204 is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 11 commits and 4 changed files. PR metadata and the branch ref agree: PR #204 exact HEAD is `ef8b92b63ce3449b061728f56c351671f46ffe14`.
- Exact-head Validation [44966643867](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643867), CodeQL [44966643883](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643883), and Dependency Review [44966643922](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643922) are terminal SUCCESS on this exact SHA. No parent-run result is reused.
- Frontend job [137037068238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643867/job/137037068238) passed source-boundary checks, typecheck, **332 tests across 72 test files**, pinned Expo Doctor, Android export, native Android Release build, Android emulator install/launch smoke, and the runtime dependency audit.
- The same frontend runtime npm audit reports **3 moderate severity vulnerabilities** in transitive minimatch via `@expo/fingerprint`; the available `npm audit fix --force` proposes a breaking Expo downgrade to 52.0.49 and was not run. Do not call this audit clean and do not weaken its threshold.
- Backend job [137037068463](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643867/job/137037068463) passed **450 pytest tests**, **27 production-readiness checks**, and **78 security/privacy checks**; pip-audit reported **No known vulnerabilities found**.
- iOS job [137037068383](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643867/job/137037068383) passed native Release build and simulator install/launch smoke. CodeQL Analyze job [137037068272](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643883/job/137037068272) passed and scanned 75/75 Python files and 5/5 GitHub Actions files. Dependency Review job [137037068377](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44966643922/job/137037068377) passed.
- PR #204 review inventory: 2 conversation comments, 0 inline threads, 0 formal review submissions, and 0 human approvals. Reviewer `tarlaci1984-sketch` is requested. The candidate remains unapproved and unmerged.
- Main's three release records remain on the older 2026-11-13 checkpoint; this PR branch carries the refreshed candidate records. The candidate is not merged into main.

### Other release and security candidates

- **PR #218** exact HEAD `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`: Validation [44945232153](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232153) terminal FAILURE (frontend 333 passed / 4 failed; backend and iOS passed); CodeQL [44945232175](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232175) and Dependency Review [44945232099](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44945232099) terminal SUCCESS on that same SHA.
- **PR #219** exact HEAD `3ba1c4f20f7aab6dafa774bb8c2d11cb21c59735` has zero exact-head workflow runs, zero check-runs, and zero status contexts. Its recorded base SHA is `e638a5714481afbb08adc54877131d7152e5ab24`, while its current base branch (PR #218) is at `c01fef68d1a33f5ca60f3cd8ed62781c4e59cb6e`; comparison is DIVERGED, 4 commits ahead / 1 behind. The CodeQL inefficient-regex review thread remains unresolved/outdated. The iterative parser and assertion corrections are present but unverified on this exact HEAD. Do not overwrite or force-push this concurrent branch.
- **PR #220** exact HEAD `1adf04eb3b17f91873ab7724a0d946ad7343ae11), a separate PR #85 test-only correction, has exact-head Validation [44955675733](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675733), CodeQL [44955675682](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675682), and Dependency Review [44955675650](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44955675650) all terminal SUCCESS. This does not validate PR #204 or #219.
- **PR #200** current-main DNS-rebinding SSRF candidate exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`: Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all terminal SUCCESS. Recorded backend evidence is 539 tests, 27 readiness checks, 78 security/privacy checks and clean pip-audit; its frontend runtime audit still reports 3 moderate minimatch findings. PR #200 has 0 formal reviews and 0 inline threads; reviewer `tarlaci1984-sketch` is requested. Production acceptance remains BLOCKED pending independent security-owner approval, full production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence.
- **PR #201** exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`: Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all terminal SUCCESS. Its exact-head frontend npm audit reports **found 0 vulnerabilities** after the minimatch 11.0.5 migration. PR #201 remains OPEN/DRAFT and unmerged pending human review; this is not repository-wide alert inventory evidence.
- **PR #203** exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`: Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all terminal SUCCESS.

### Issues and security inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. The active ruleset above is the current main-protection evidence.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 97 comments. Its current-main SSRF remediation is PR #200; CI is not production acceptance.
- Issue #74 has 357 comments; issue #149 has 276; issue #155 has 121. Issue #155's latest evidence says the picomatch advisory GHSA-fc5q-39xc-vjpf was withdrawn as not a security issue; withdrawal is not a patched release, and upstream npm still lists 4.0.7 as latest.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration: **unverified, not empty**. Successful CodeQL and Dependency Review workflows do not prove the repository-wide alert inventories are empty.

### Canonical 25-point release register

The candidate row-level register contains exactly 25 items and parses to **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**. Main's separate older register remains **3 Done / 15 In Progress / 7 Blocked**; the two registers are not silently merged.

- **#2 remains Blocked** pending the owner's durable repository-visibility and release-plan decision; active branch protection alone does not record that separate decision.
- **#4** requires production Apple App Attest entitlement and physical-iPhone verification. **#5** requires Play-installed physical Android Play Integrity. **#16** requires witnessed production backup/restore. **#18** requires a representative labeled product-recognition benchmark and business acceptance. **#21** requires production monitoring and witnessed alert delivery. **#22** requires approved staged rollout and tested rollback. **#25** requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No CI result from a parent commit is attributed to a child SHA. The latest PR #204 exact HEAD has 3/3 mandatory workflows passed, but human review and external release acceptance remain outstanding.

---

