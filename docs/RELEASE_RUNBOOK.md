## Current release evidence checkpoint — 2026-11-21 10:11 CET

This is a pre-update evidence snapshot prepared from live GitHub metadata at 09:11 UTC. The commit that adds this checkpoint will have its own exact-head Validation, CodeQL, and Dependency Review gate; no parent or child workflow result is attributed to that new commit. Main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch reference both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation frontend, backend, and iOS jobs passed; CodeQL Analyze and Dependency Review passed (five jobs total).
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, and 109 combined timeline records.
- The PR description still contains superseded historical text claiming exact HEAD `b46c5b8`; it is stale. Live PR metadata and the source branch reference are authoritative and agree on `68b380e`.
- Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks; a repository administrator must cancel them.

### PR #204 — earlier documentation candidate

- PR #204 remains OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, base `main`, exact HEAD `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`; 10 commits and four changed files.
- Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE: frontend 331 tests passed and one documentation assertion failed; backend and iOS jobs passed. CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on that same SHA. This is a wording assertion failure, not an application runtime failure. PR #204 remains separate and unmerged.

### PR #206 — clean-main documentation candidate

- PR #206 remains OPEN/DRAFT on `fix/release-evidence-checkpoint-assertion-20261120-run11`, targeting `main` at `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. Its pre-update exact HEAD is `108c251f65987f88053c89a3337187164d08c8d4`; it contains 16 commits and four changed files.
- On that exact pre-update HEAD, Validation [44874048568](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44874048568) is terminal FAILURE; CodeQL [44874048725](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44874048725) and Dependency Review [44874048701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44874048701) are terminal SUCCESS. Validation frontend recorded 332 passing tests and one failing checkpoint assertion; backend and iOS passed. The assertion expects obsolete PR #206 workflow ID `44859993370`. This is a documentation-test evidence mismatch, not a demonstrated app runtime regression.
- The PR #206 description is stale and still references `7dc73caf` and older workflow IDs. Do not use its body as current evidence. The commit adding this checkpoint will create a new PR #206 HEAD and must pass its own three exact-head workflows before another commit or integration.

### PR #210 / #211 — alternate correction path

- PR #210 remains OPEN/DRAFT at exact HEAD `8603fc3be80efcfb0c2a27efc1f13b37af1020b8`, base branch `fix/release-doc-pr207-stale-run-assertion-20261121` at `abb2ee310b6a842b22c970d364f7590553b8f76f`; three commits and one changed file.
- PR #210 exact-head Validation [44879889461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889461), CodeQL [44879889464](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889464), and Dependency Review [44879889445](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889445) are terminal SUCCESS on `8603fc3`. Frontend/Android, backend, and iOS jobs passed, including Android emulator smoke and runtime dependency audit plus iOS simulator smoke.
- PR #211 was merged into PR #210's branch, not main. Its source/merge commit is `50a41b13b2cb1f76040c8d16fdbae9e1135a2656`; its own exact-head Validation [44877258461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258461), CodeQL [44877258455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258455), and Dependency Review [44877258499](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258499) passed.
- This is a separate branch path; its green exact-head CI is not attributed to PR #206 or main.

### PR #212 — direct child correction candidate

- PR #212 remains OPEN/DRAFT at exact HEAD `2b767c68f7e81a054f8cd12b7ad38dd17f3288a7`, based directly on PR #206's pre-update HEAD `108c251f65987f88053c89a3337187164d08c8d4`; one commit and one changed file.
- Exact-head Validation [44883482260](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482260), CodeQL [44883482245](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482245), and Dependency Review [44883482182](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482182) are terminal SUCCESS on `2b767c68`. Frontend/Android, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- PR #212 is a test-only stacked child at exact HEAD 2b767c68f7e81a054f8cd12b7ad38dd17f3288a7. Validation 44883482260, CodeQL 44883482245, and Dependency Review 44883482182 passed, but its recorded base SHA 108c251f65987f88053c89a3337187164d08c8d4 is stale versus current PR #206 parent f7d61201f298817df3bf449b501b811fb6f97c4d; GitHub reports mergeable_state=dirty. It does not update the three release documents and remains OPEN/DRAFT with zero formal reviews and zero inline threads. Its green test-only result does not reconcile the release evidence.
- Do not merge the alternative correction solely because its reduced assertion set passes. The release documents and regression contract must be corrected against live evidence together.

### Issues, security, and repository inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active, has no bypass actors, and requires six strict checks, one approving review, stale-review dismissal, last-push approval, resolved review threads, and deletion/non-fast-forward protection.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 89 comments. DNS-rebinding SSRF production acceptance still requires independent security-owner approval, a complete production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 102 comments. The advisory withdrawal does not establish a patched npm release; product-level runtime reachability review remains incomplete. Do not import an unverified fork or suppress the audit.
- Repository visibility is public. Main exact HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. Branch pagination returned 169 branches (100 + 69; final page empty). GitHub issue search returned 103 open pull requests and eight open non-PR issues. The Releases API returned an empty array: zero published releases.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration; status remains **unverified, not empty**. Successful CodeQL and Dependency Review workflows are not alert-inventory queries.

### Release records and canonical 25-point register

- This 10:11 CET checkpoint is synchronized across `docs/RELEASE_RUNBOOK.md`, `docs/RELEASE_PILOT_ACCEPTANCE.md`, and `docs/25-POINT-RELEASE-BACKLOG.md` on the PR #206 branch only. Main's three release records remain on their older 2026-11-13 checkpoint; main is not changed.
- The candidate row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.
- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Active main branch protection is a separate verified fact and does not resolve that decision. Main's existing backlog still records 3 Done / 15 In Progress / 7 Blocked; this candidate register is not yet merged.
- External blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators, and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, rollout approvals, or real-user/business acceptance. **PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.**


---

## Current release evidence checkpoint — 2026-11-21 05:15 CET

This checkpoint supersedes the 2026-11-21 02:04 CET checkpoint. Evidence was refreshed at 04:15 UTC from live PR metadata, source-branch refs, exact-head Actions runs and jobs, issue metadata, paginated repository inventory, the releases API, and the active main ruleset. Current main is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`; exact source HEAD is `68b380e73ca3c870048035197beef8febbf90ef1`, and the source branch ref matches it. Merge commit: `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, 11,887 additions and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation jobs frontend, backend and iOS passed; CodeQL Analyze and Dependency Review passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED, one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, 109 combined timeline records. Twenty of the 22 threads are marked outdated.
- Three historical runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks; a repository administrator must cancel them.

### PR #204 — earlier documentation branch

- PR #204 remains OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, base `main`, exact HEAD `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`; 10 commits and four changed files.
- Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE: frontend 331 tests passed and one documentation assertion failed; backend and iOS jobs passed. CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on the same SHA. No parent result is substituted for these exact-head results.
- The failure was a checkpoint wording assertion in `scripts/release-evidence-checkpoint.test.mjs`, not an application runtime defect. PR #204 remains separate and unmerged.

### PR #206 and merged child PR #207 — current documentation candidate

- PR #207 was CLOSED/MERGED at 2026-11-21 03:13:25 UTC into PR #206's branch, not into `main`. Its exact merge commit and source HEAD are `d085930930d099888ab5ea7d7ba09c9a7bac4c7d`.
- PR #206 remains OPEN/DRAFT on `fix/release-evidence-checkpoint-assertion-20261120-run11`, targeting `main` at `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. Its current exact HEAD is `d085930930d099888ab5ea7d7ba09c9a7bac4c7d`; the branch ref matches. It contains 14 commits, four changed files, 874 additions and 12 deletions.
- PR #206 exact-head Validation [44859993370](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44859993370), CodeQL [44859993354](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44859993354), and Dependency Review [44859993364](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44859993364) are all terminal SUCCESS on `d085930`. Validation backend, frontend and iOS jobs passed; CodeQL Analyze and Dependency Review passed.
- Frontend step evidence includes 332 unit tests, source-boundary enforcement, TypeScript, Expo Doctor, Android export, native Android Release build, Android emulator smoke and runtime dependency audit, all successful. iOS Release build and simulator smoke passed. Backend compile, tests, production-readiness checks and dependency audit passed.
- PR #206 currently has one automated Dependency Review conversation comment, zero inline review threads, zero formal review submissions and no human APPROVED review. It remains draft and requires human review before integration. PR #207 itself had no human review submission; its merge only advanced PR #206's branch.

### Issues, security and repository inventory

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and is active. Main reports `protected: true`; six strict required checks, one approval, stale-review dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection and no bypass actors are configured.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 88 comments. The current-main DNS-pinning candidate is PR #200 at `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; its latest recorded Validation, CodeQL and Dependency Review runs (44735858583, 44735858347, 44735858455) succeeded. Production acceptance still requires independent security-owner approval, a complete production DNS64/NAT64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 98 comments. GHSA-fc5q-39xc-vjpf is withdrawn (2026-11-18); withdrawal is not a patched npm release. Six lockfile resolutions are recorded, while repository-wide runtime reachability review remains incomplete. No fork import or audit suppression is justified.
- Repository visibility is public. Main exact HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. Branch pagination returned 163 branches (100 + 63; next page empty). Open-PR pagination returned 98 pull requests (98; next page empty). Open non-PR issue pagination returned eight issues. Published GitHub releases: **0**.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub integration; status remains **unverified, not empty**. Successful CodeQL and Dependency Review workflows are not alert-inventory queries.

### Release records and canonical 25-point register

- This 05:15 CET checkpoint is being added identically to `docs/RELEASE_RUNBOOK.md`, `docs/RELEASE_PILOT_ACCEPTANCE.md`, and `docs/25-POINT-RELEASE-BACKLOG.md` on the PR #206 branch only. Main's three release records remain on their older 2026-11-13 checkpoint; main is not changed.
- The row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.
- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Active branch protection is a separate verified fact and does not resolve that decision.
- External blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review remains outstanding on PR #206 and the security/dependency candidates. No PR is merged automatically by this process; no security threshold, required check or test is weakened.

---

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

## Superseded release checkpoint — 2026-11-13 18:49 CET

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

---

## Current release evidence checkpoint — 2026-11-21 02:04 CET

Captured at 2026-11-21 01:04 UTC from live GitHub API evidence. Current `main` is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. This checkpoint is added on the PR #206 child branch, based on PR #204. It does not grant production or pilot acceptance. Every workflow result below is tied to the exact SHA stated; the new checkpoint commit created by this update requires its own exact-head Validation, CodeQL and Dependency Review.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The PR contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on that exact SHA. Validation frontend, backend and iOS jobs passed; CodeQL Analyze and Dependency Review jobs passed.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal review submissions (25 COMMENTED and one human APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, zero unresolved, and 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`; each jobs endpoint returns zero jobs. These are historical queues, not current-head successes or failures; repository-administrator cancellation is required.

### Main governance

- Repository visibility is public. Main reports `protected: true`. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors. The legacy branch-protection detail endpoint remains restricted to this integration; branch metadata and the active ruleset are the available evidence.

### Current-main remediation candidates

- **PR #200 — DNS-pinned product transport:** OPEN/DRAFT on current main, exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`. Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS on that exact SHA. The backend reports 539 tests, 27 production-readiness checks, 78 security/privacy checks, and pip-audit with no known vulnerabilities. The frontend reports 327 tests across 71 files, Expo Doctor 21/21, Android Release/emulator smoke, and iOS Release/simulator smoke. Runtime npm audit still reports 3 moderate minimatch findings. DNS answers and redirect hops are validated, connections are pinned to numeric IPs, the connected peer is checked before TLS/request bytes, Host/TLS SNI are preserved, and inherited proxies are disabled. Independent security approval, production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production egress evidence remain missing.
- **PR #201 — minimatch migration:** OPEN/DRAFT on current main, exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`. Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) are terminal SUCCESS on that exact SHA. Its exact-head runtime audit explicitly reports `found 0 vulnerabilities`; it remains an unmerged candidate requiring human review.
- **PR #202 — CodeQL action consistency:** OPEN/DRAFT on current main, exact HEAD `67eafbebd5f45724f2c97430fee4bc1a6d153746`. Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) are terminal SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203 — Node 22 native prebuild:** OPEN/DRAFT on current main, exact HEAD `a006fdb882bfb6989487e3faea77db23f183839f`. Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) are terminal SUCCESS. Android and iOS prebuild regression coverage remains test-only; physical-device acceptance is separate.

### PR #204 and PR #206 — documentation checkpoint correction

- **PR #204** is OPEN/DRAFT on `docs/release-evidence-current-main-20261120-run11`, based on current main `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`, with 10 commits and 4 changed files. Its pre-checkpoint exact HEAD was `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`. Exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE in the frontend job (331 tests passed, one failed; 71 other test files passed). Backend and iOS jobs passed. CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on that same SHA. PR #204 review inventory: 2 conversation comments, 0 inline review comments, 0 formal reviews.
- **PR #206 pre-checkpoint HEAD** was `42879b4d6e6b9f1b8646aa6bb8b1a71bbfd61d5e`, a one-commit child of PR #204. Its own Validation [44831372949](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44831372949), CodeQL [44831372936](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44831372936), and Dependency Review [44831372878](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44831372878) are terminal SUCCESS on that exact pre-checkpoint SHA; frontend, backend, iOS, CodeQL Analyze and Dependency Review jobs passed. That child test correction separated the PR state/branch assertion from the recorded PR #204 pre-checkpoint SHA. This checkpoint refreshes the three release records and aligns the test with the current PR #204 evidence. The new commit created by this update has its own CI gate; the pre-checkpoint runs above are not transferable to it. PR #206 had 1 conversation comment, 0 inline review comments, 0 formal reviews and no human approval at pre-write capture.

### Issues and security follow-up

- Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is CLOSED with 11 comments. Current main protection is verified through the active ruleset and branch metadata.
- Issue [#64](https://github.com/milanradics89-beep/POS-Doctor/issues/64) remains OPEN with 85 comments. The latest 2026-11-21 01:21 CET evidence reconfirms PR #200 exact-head CI and source-level DNS-pinning tests. Production acceptance remains BLOCKED pending independent security-owner approval, production NAT64/DNS64 prefix inventory, deployed `USEIT_NAT64_PREFIXES` verification, and staging/production DNS/egress/TCP-peer evidence. Historical PR #99 approval does not transfer to PR #200.
- Issue [#155](https://github.com/milanradics89-beep/POS-Doctor/issues/155) remains OPEN with 94 comments. Advisory GHSA-fc5q-39xc-vjpf was withdrawn on 2026-11-18; no patched picomatch release is listed. The inspected product-discovery call path did not expose user-defined glob patterns, but this is bounded source-path evidence, not a repository-wide reachability proof. The six inspected lockfile resolutions include production/transitive and dev-only entries. Reviewed upstream PR patches did not contain all six required adversarial patterns; the candidate fork release is unsigned and npm provenance/integrity is unverified. Do not import or pin the fork. Keep repository-wide reachability review and product/security-owner acceptance open.

### Repository inventory, releases and alert inventories

- Paginated branch inventory: **162** (100 + 62). Open pull requests: **98**. Open non-PR issues: **7**. Published GitHub releases: 0.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected integration; status remains **unverified, not empty**. Green CodeQL or Dependency Review workflows are not an alert-inventory query.
- Main's three release records remain on their 2026-11-13 checkpoint. The PR #204 branch still carried the 2026-11-20 23:18 CET checkpoint with stale inventory values (160 branches, 96 open PRs, 8 open non-PR issues); this new checkpoint supersedes that snapshot on the PR #206 child branch only. Main is not changed.

### Canonical 25-point release register

The row-level register remains **2 Done / 15 In Progress / 8 Blocked**. Done: **#1, #6**. In Progress: **#3, #7–#15, #17, #19, #20, #23, #24**. Blocked: **#2, #4, #5, #16, #18, #21, #22, #25**.

- **#2 remains Blocked** pending the owner's durable public/private repository-visibility and release-plan decision. Active branch protection does not resolve this separate decision.
- External acceptance blockers remain #4 physical iPhone App Attest, #5 Play-installed physical Android Play Integrity, #16 witnessed production backup/restore, #18 representative product-recognition benchmark/business acceptance, #21 production monitoring and alert delivery, #22 approved staged rollout and tested rollback, and #25 real-user pilot/business sign-off.
- CI, emulators and simulators do not satisfy production console setup, physical-device verification, production cloud access, witnessed backup/restore, staged rollout approval or real-user/business acceptance.

**Release decision: NOT READY. Production/pilot acceptance: NOT GRANTED.** No published release exists. Human review remains outstanding on the documentation and security/dependency candidates. No PR is merged automatically by this process; no security threshold or required check is weakened.

---

## Current release evidence checkpoint — 2026-11-21 11:27 CET

This is a pre-update evidence snapshot captured before one documentation/test-only child commit is added to PR #206. The parent is f7d61201f298817df3bf449b501b811fb6f97c4d. The next commit must pass its own exact-head Validation, CodeQL and Dependency Review; none of the parent results below are attributed to that child.

### Repository, checklist and main protection
- Main ref remains e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. Protect main ruleset 26370589 is ACTIVE, with six strict required contexts (CodeQL, backend, frontend, ios, analyze, dependency-review), one required approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection and no bypass actors. The direct branch-protection endpoint returned 403; the repository ruleset endpoint is the positive protection evidence.
- Paginated inventory: 170 branches (100 + 70), 103 open PRs (100 + 3), eight open non-PR issues (#198, #155, #149, #74, #64, #25, #24, #23), and zero published releases.
- The latest complete review/thread census covered 104 open PRs: 37 formal submissions (4 APPROVED, 33 COMMENTED) and 19/19 inline threads resolved. PR #214 had zero reviews and zero threads and has now been closed as superseded, so its closure does not change those totals. No review or thread was fabricated or auto-resolved.
- Issue #74 remains 64 checklist items: 41 checked and 23 open. The separate 25-point release register remains distinct: main 3 Done / 15 In Progress / 7 Blocked; this candidate 2 Done / 15 In Progress / 8 Blocked. No checkbox or status was cosmetically changed.
- At snapshot time Issue #74 had 319 comments and Issue #149 had 227 comments. Security-alert inventories remain unverified, not empty. No main required-check success is inferred from PR-triggered workflow records.

### Merged and historical baseline
- PR #41 is CLOSED/MERGED at exact head 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Validation 43492153234, CodeQL 43492153161 and Dependency Review 43492153021 all succeeded. Review inventory: 26 submissions (25 COMMENTED, 1 APPROVED); 22/22 inline threads resolved. The two Redis P2 runbook corrections remain in the merged baseline. The three historical queued runs 43098210284, 43098210473 and 43098210255 still have zero jobs and require repository-admin cancellation; they are not current main checks.
- PR #65 is CLOSED/unmerged at 678fe7fde32f4dc785288d5a8ac939f1ac6478f0; its own Validation 43452488602, CodeQL 43452493289 and Dependency Review 43452488754 succeeded. package.json and package-lock.json blob SHAs match main exactly (d91e6ff791d5c80a14fe056f7c19662ebf73bc9d and 2bccc4107db8e2b4ac638215328677761d34374a). The Redis runbook corrections are represented in merged #41; do not describe #65 itself as merged.
- PR #67 is CLOSED/unmerged; historical Validation 43423727535 failed while CodeQL 43423727559 and Dependency Review 43423727485 succeeded. Its mainline successor #96 is OPEN at e06a3c3513244289169b705fa7b1e9ee381945e0 with Validation 43800887062, CodeQL 43800886964 and Dependency Review 43800887028 all SUCCESS; 2 COMMENTED reviews, 1/1 resolved thread, and tarlaci1984-sketch requested.
- PR #68 is CLOSED/unmerged at a4324896a95aca621885ba89daa44f96bdcb636f; all three exact-head checks succeeded (Validation 43436750104, CodeQL 43436750094, Dependency Review 43436750108). Its backend log installs cryptography 50.0.2 and ends with pip-audit: No known vulnerabilities found. This is backend pip-audit evidence, not the frontend npm audit.
- PR #69 is CLOSED/unmerged at a84fdf39792da4ce6c663d88b976861fa3c968be. Validation 43432490009 failed; CodeQL 43432489904 and Dependency Review 43432489915 succeeded. Backend pytest reported 175 passed / 2 failed: EC public-key X coordinate integer len() TypeError and unsupported AttestationEvidence key_id argument. Backend pip-audit was skipped after pytest failure. The separate frontend runtime audit also failed; do not conflate it with backend pip-audit.
- PR #116 is OPEN/DRAFT at 27fafece2783b11677bdd90e896a1c0e8551aa86 with Validation 43938664477, CodeQL 43938664451 and Dependency Review 43938664475 all SUCCESS; 2 COMMENTED reviews and 1/1 resolved thread. Node 22 Android/iOS prebuild regressions are green. Main app.json uses the separate CommonJS modules/useit-app-attest/app.plugin.js; expo-module.config.json provides iOS autolinking, while the Play Integrity module config declares Android. This does not make original #69 green.

### Current release-documentation branch
- PR #206 is OPEN/DRAFT at pre-update parent HEAD f7d61201f298817df3bf449b501b811fb6f97c4d, 18 commits ahead of main and 0 behind, with four files changed. Exact-head Validation 44891058990, CodeQL 44891058987 and Dependency Review 44891058847 all SUCCESS. Validation jobs passed 334 frontend tests, Expo Doctor 21/21, Android Release plus emulator smoke, iOS Release plus simulator smoke, 450 backend tests, 27 readiness checks and 78 security checks. Backend cryptography is 50.0.2 and pip-audit is clean. Frontend npm audit reports three moderate minimatch findings and no picomatch finding; the configured HIGH threshold passed, not a zero-finding audit. PR #206 has zero formal reviews and zero inline threads; tarlaci1984-sketch is requested. It remains DRAFT and unmerged pending human review.
- PR #214 is CLOSED/unmerged as superseded. Its own exact head 3a28d3455e066cc0ab726af2a05421d0594118ad passed Validation 44889456793, CodeQL 44889456796 and Dependency Review 44889456777. The corrected assertion is already present on #206's current parent branch; #214 was a redundant sibling based on the older 771048dc... parent. No merge occurred.
- PR #212 remains OPEN/DRAFT at 2b767c68f7e81a054f8cd12b7ad38dd17f3288a7. Its three checks 44883482260, 44883482245 and 44883482182 passed, but GitHub reports mergeable_state=dirty because recorded base 108c251f... is stale versus #206's current parent f7d612...; it has zero formal reviews and zero inline threads and does not update the three release documents.
- PR #213 remains OPEN/DRAFT at f744702155aad6f8f7fc8423b15af8d7c4fbbf6c. Validation 44883818525, CodeQL 44883818524 and Dependency Review 44883818528 succeeded; zero formal reviews and zero inline threads, with tarlaci1984-sketch requested. It remains a separate stacked documentation candidate, not a main merge.
- PR #211's merge commit 8603fc3be80efcfb0c2a27efc1f13b37af1020b8 was merged into the #210 feature branch, not main. #209 and #210 have their own successful exact-head CI; no main merge is inferred.

### Release checkpoint chain #85 and #163–#172
- PR #85 current exact HEAD is ea1bf815d90d91026b24c46ec1869b8218211d80. Validation 44645305669 failed on a frontend documentation Unit-test assertion (299/300 tests; 60/61 files): the test expects inline-code formatting around the runtime npm audit command while the checkpoint text does not use backticks. CodeQL 44645305765 and Dependency Review 44645306118 succeeded. The runtime npm audit separately completed with three moderate minimatch findings and passed the configured HIGH threshold. Review inventory: 16 COMMENTED, 9/9 resolved threads, zero APPROVED.
- PR #163 exact HEAD 879a6392b3bcd248deca40916e15fd69a467df7b: Validation 44241274884 FAILURE, CodeQL 44241274855 SUCCESS, Dependency Review 44241274910 SUCCESS. PR #164 exact HEAD f7dcfcf6ee85e3ee77e627f8d34776fd03b91cfe: Validation 44253605974 FAILURE, CodeQL 44253605853 SUCCESS, Dependency Review 44253605842 SUCCESS. PR #165 exact HEAD 84de0838284b50dc38bf8107aee15b046dd4cc6a: Validation 44253962999 FAILURE, CodeQL 44253963066 SUCCESS, Dependency Review 44253963144 SUCCESS. PR #166 exact HEAD 205d39742a8c98e94453df44106ec83d5dba0ea0: Validation 44254136344 FAILURE, CodeQL 44254136396 SUCCESS, Dependency Review 44254136318 SUCCESS. Their Validation failures are frontend Unit-test/assertion failures.
- PR #167 exact HEAD 3177cfba1cbaee43a9feed2dd8b2010249a7d12f: Validation 44255156916 FAILURE, CodeQL 44255156921 SUCCESS, Dependency Review 44255156940 SUCCESS. PR #168 exact HEAD a935803ac1c0b614fd3b49180da29b6bcd3f7b1e: Validation 44272119611 FAILURE, CodeQL 44272119580 SUCCESS, Dependency Review 44272119594 SUCCESS. PR #169 exact HEAD 0b6d97be460cabc24013b15d180cdf6d4180d42b: Validation 44272942930 FAILURE, CodeQL 44272943096 SUCCESS, Dependency Review 44272943019 SUCCESS. PR #170 exact HEAD 6de7cedc9b1214f7bf819e8b76fd1d8986d8d085: Validation 44273476324 FAILURE, CodeQL 44273476308 SUCCESS, Dependency Review 44273476354 SUCCESS. #168/#169 are frontend Unit-test/assertion failures; #167/#170 are runtime npm-audit failures with 28 findings (2 moderate, 26 high) on historical pre-withdrawal snapshots.
- PR #171 exact HEAD cd3cd0e01f8dab9c1ac8e47c923a05134857d47d and PR #172 exact HEAD 5e0f0c000a3a3707e5565c32804e4d221a886caa share tree cf955182d98cae2e19f10c0e08f8e12621cb5242 but are sibling commits. #171 Validation 44358862088, CodeQL 44358862249, Dependency Review 44358862085 all SUCCESS. #172 Validation 44350568289, CodeQL 44350568525, Dependency Review 44350568368 all SUCCESS. Each has zero formal reviews and zero inline threads, with tarlaci1984-sketch requested. Do not close or merge either automatically.

### Picomatch / Issue #155
- GitHub Advisory GHSA-fc5q-39xc-vjpf was WITHDRAWN on 2026-11-18; the corresponding OSV GHSA record is also withdrawn. OSV's separate CVE-2026-112366 conversion still carries the original HIGH severity fields, so it must not be confused with the withdrawn GHSA record. Snyk marks the JavaScript advisory revoked / not a vulnerability. Official npm lists picomatch 4.0.7 as latest; there is no 4.0.8 release. Withdrawal is not a patched npm release.
- Upstream PR #238 exact HEAD 44f192261f312ddf236cb7bdc05d8f22663f98f9 has six review submissions (3 COMMENTED, 3 APPROVED), zero inline threads, and Tests run 39833229778 completed action_required with zero jobs.
- The six exact required no-space patterns are +(*), *(*), +(a*), +(*a), *(a*|b), +(ab|abab). #238 covers only +(*) , +(a*) and +(*a); it omits *(*) , *(a*|b) and +(ab|abab). Reviewers measured exponential growth for +(*) and +(a*) on adversarial inputs, and the patch currently asserts ordinary matching for those two cases.
- #264 and #265 current exact heads are 8144a1a22a8fa1766951411f220cc8c6228cb041 and dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c (5/6 each, missing +(ab|abab)); #254 c63a5bf4e61dbdb81bc41e97dc2616c30acce337 and #246 f03bec2c02e46f063fbfdc161aae1d0f854b2565 cover 3/6; #257 4e4892e0ac6c374ec3d9e4dc430101da9a20a37b covers 1/6. Their current exact-head workflow records are action_required with zero jobs; #257 has one APPROVED review, the others have zero reviews, and all six have zero inline threads.
- #264 and #265 current exact heads are 8144a1a22a8fa1766951411f220cc8c6228cb041 and dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c (5/6 each, missing +(ab|abab)); #254 c63a5bf4e61dbdb81bc41e97dc2616c30acce337 and #246 f03bec2c02e46f063fbfdc161aae1d0f854b2565 cover 3/6; #257 4e4892e0ac6c374ec3d9e4dc430101da9a20a37b covers 1/6. Their current exact-head workflow records are action_required with zero jobs; #257 has one APPROVED review, the others have zero reviews, and all six have zero inline threads.
- PR #235 is CLOSED/unmerged at 0150ed18b7971894bfd1824c8f96d6b63c70ad1f; Tests run 39425238918 failed, with one COMMENTED review and zero inline threads. The maintainer disputes the CVE and advises against allowing untrusted user-defined patterns.
- The secured fork master is 3ab5a7627d480259e3d9ca67fbc14c125d374f0e. Its rulesets list is empty; branch-protection lookup returned 403, so classic protection cannot be verified. Release commit f9822e9514d490f3e3bc17f50a4d3cacff2056c2 is unsigned; master has no exact-head workflow record. PR #1 is merged with zero reviews and zero inline threads; historical CI 40650811785 passed 22/22 jobs. Current master package.json names @ryotsu/picomatch 4.0.7-a. An independent PR comment reports a remaining repeated-wildcard timeout and compatibility differences; maxExtglobRecursion:false disables the safeguard. npm provenance/integrity remains unverified. Do not import, pin or override this fork.
- The current source/manifest review found no direct application import and no identified route accepting untrusted user-defined glob patterns. This is reachability evidence, not complete mobile-bundle proof or product acceptance. Issue #155 remains OPEN until product-level reachability/acceptance is documented.

### SSRF, Node 22 and external acceptance
- Issue #64 remains OPEN. PR #99 exact HEAD f91c70d2636948e538f8e3559afc39cd93eb5139 has Validation 43772791089, CodeQL 43772791064 and Dependency Review 43772791109 all SUCCESS; 1 APPROVED plus 4 COMMENTED reviews and 2/2 resolved threads. PR #200 exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a has all three checks SUCCESS but zero reviews and zero threads, with tarlaci1984-sketch requested.
- Production SSRF acceptance remains BLOCKED until independent security-owner approval of the exact diff/configuration, production NAT64/DNS64 prefix inventory, verified deployed USEIT_NAT64_PREFIXES, and staging plus production egress evidence are recorded. PR #203 Node 22 Android/iOS prebuild candidate is 3/3 green but has zero reviews and zero threads; CI is not physical-device or production acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout and business pilot approval remain outstanding.

## Current release evidence checkpoint — 2026-11-21 11:27 CET

This is a pre-update evidence snapshot captured before one documentation/test-only child commit is added to PR #206. The parent is f7d61201f298817df3bf449b501b811fb6f97c4d. The next commit must pass its own exact-head Validation, CodeQL and Dependency Review; none of the parent results below are attributed to that child.

### Repository, checklist and main protection
- Main ref remains e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. Protect main ruleset 26370589 is ACTIVE, with six strict required contexts (CodeQL, backend, frontend, ios, analyze, dependency-review), one required approval, last-push approval, resolved-thread enforcement, deletion/non-fast-forward protection and no bypass actors. The direct branch-protection endpoint returned 403; the repository ruleset endpoint is the positive protection evidence.
- Paginated inventory: 170 branches (100 + 70), 103 open PRs (100 + 3), eight open non-PR issues (#198, #155, #149, #74, #64, #25, #24, #23), and zero published releases.
- The latest complete review/thread census covered 104 open PRs: 37 formal submissions (4 APPROVED, 33 COMMENTED) and 19/19 inline threads resolved. PR #214 had zero reviews and zero threads and has now been closed as superseded, so its closure does not change those totals. No review or thread was fabricated or auto-resolved.
- Issue #74 remains 64 checklist items: 41 checked and 23 open. The separate 25-point release register remains distinct: main 3 Done / 15 In Progress / 7 Blocked; this candidate 2 Done / 15 In Progress / 8 Blocked. No checkbox or status was cosmetically changed.
- At snapshot time Issue #74 had 319 comments and Issue #149 had 227 comments. Security-alert inventories remain unverified, not empty. No main required-check success is inferred from PR-triggered workflow records.

### Merged and historical baseline
- PR #41 is CLOSED/MERGED at exact head 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. Validation 43492153234, CodeQL 43492153161 and Dependency Review 43492153021 all succeeded. Review inventory: 26 submissions (25 COMMENTED, 1 APPROVED); 22/22 inline threads resolved. The two Redis P2 runbook corrections remain in the merged baseline. The three historical queued runs 43098210284, 43098210473 and 43098210255 still have zero jobs and require repository-admin cancellation; they are not current main checks.
- PR #65 is CLOSED/unmerged at 678fe7fde32f4dc785288d5a8ac939f1ac6478f0; its own Validation 43452488602, CodeQL 43452493289 and Dependency Review 43452488754 succeeded. package.json and package-lock.json blob SHAs match main exactly (d91e6ff791d5c80a14fe056f7c19662ebf73bc9d and 2bccc4107db8e2b4ac638215328677761d34374a). The Redis runbook corrections are represented in merged #41; do not describe #65 itself as merged.
- PR #67 is CLOSED/unmerged; historical Validation 43423727535 failed while CodeQL 43423727559 and Dependency Review 43423727485 succeeded. Its mainline successor #96 is OPEN at e06a3c3513244289169b705fa7b1e9ee381945e0 with Validation 43800887062, CodeQL 43800886964 and Dependency Review 43800887028 all SUCCESS; 2 COMMENTED reviews, 1/1 resolved thread, and tarlaci1984-sketch requested.
- PR #68 is CLOSED/unmerged at a4324896a95aca621885ba89daa44f96bdcb636f; all three exact-head checks succeeded (Validation 43436750104, CodeQL 43436750094, Dependency Review 43436750108). Its backend log installs cryptography 50.0.2 and ends with pip-audit: No known vulnerabilities found. This is backend pip-audit evidence, not the frontend npm audit.
- PR #69 is CLOSED/unmerged at a84fdf39792da4ce6c663d88b976861fa3c968be. Validation 43432490009 failed; CodeQL 43432489904 and Dependency Review 43432489915 succeeded. Backend pytest reported 175 passed / 2 failed: EC public-key X coordinate integer len() TypeError and unsupported AttestationEvidence key_id argument. Backend pip-audit was skipped after pytest failure. The separate frontend runtime audit also failed; do not conflate it with backend pip-audit.
- PR #116 is OPEN/DRAFT at 27fafece2783b11677bdd90e896a1c0e8551aa86 with Validation 43938664477, CodeQL 43938664451 and Dependency Review 43938664475 all SUCCESS; 2 COMMENTED reviews and 1/1 resolved thread. Node 22 Android/iOS prebuild regressions are green. Main app.json uses the separate CommonJS modules/useit-app-attest/app.plugin.js; expo-module.config.json provides iOS autolinking, while the Play Integrity module config declares Android. This does not make original #69 green.

### Current release-documentation branch
- PR #206 is OPEN/DRAFT at pre-update parent HEAD f7d61201f298817df3bf449b501b811fb6f97c4d, 18 commits ahead of main and 0 behind, with four files changed. Exact-head Validation 44891058990, CodeQL 44891058987 and Dependency Review 44891058847 all SUCCESS. Validation jobs passed 334 frontend tests, Expo Doctor 21/21, Android Release plus emulator smoke, iOS Release plus simulator smoke, 450 backend tests, 27 readiness checks and 78 security checks. Backend cryptography is 50.0.2 and pip-audit is clean. Frontend npm audit reports three moderate minimatch findings and no picomatch finding; the configured HIGH threshold passed, not a zero-finding audit. PR #206 has zero formal reviews and zero inline threads; tarlaci1984-sketch is requested. It remains DRAFT and unmerged pending human review.
- PR #214 is CLOSED/unmerged as superseded. Its own exact head 3a28d3455e066cc0ab726af2a05421d0594118ad passed Validation 44889456793, CodeQL 44889456796 and Dependency Review 44889456777. The corrected assertion is already present on #206's current parent branch; #214 was a redundant sibling based on the older 771048dc... parent. No merge occurred.
- PR #212 remains OPEN/DRAFT at 2b767c68f7e81a054f8cd12b7ad38dd17f3288a7. Its three checks 44883482260, 44883482245 and 44883482182 passed, but GitHub reports mergeable_state=dirty because recorded base 108c251f... is stale versus #206's current parent f7d612...; it has zero formal reviews and zero inline threads and does not update the three release documents.
- PR #213 remains OPEN/DRAFT at f744702155aad6f8f7fc8423b15af8d7c4fbbf6c. Validation 44883818525, CodeQL 44883818524 and Dependency Review 44883818528 succeeded; zero formal reviews and zero inline threads, with tarlaci1984-sketch requested. It remains a separate stacked documentation candidate, not a main merge.
- PR #211's merge commit 8603fc3be80efcfb0c2a27efc1f13b37af1020b8 was merged into the #210 feature branch, not main. #209 and #210 have their own successful exact-head CI; no main merge is inferred.

### Release checkpoint chain #85 and #163–#172
- PR #85 current exact HEAD is ea1bf815d90d91026b24c46ec1869b8218211d80. Validation 44645305669 failed on a frontend documentation Unit-test assertion (299/300 tests; 60/61 files): the test expects inline-code formatting around the runtime npm audit command while the checkpoint text does not use backticks. CodeQL 44645305765 and Dependency Review 44645306118 succeeded. The runtime npm audit separately completed with three moderate minimatch findings and passed the configured HIGH threshold. Review inventory: 16 COMMENTED, 9/9 resolved threads, zero APPROVED.
- PR #163 exact HEAD 879a6392b3bcd248deca40916e15fd69a467df7b: Validation 44241274884 FAILURE, CodeQL 44241274855 SUCCESS, Dependency Review 44241274910 SUCCESS. PR #164 exact HEAD f7dcfcf6ee85e3ee77e627f8d34776fd03b91cfe: Validation 44253605974 FAILURE, CodeQL 44253605853 SUCCESS, Dependency Review 44253605842 SUCCESS. PR #165 exact HEAD 84de0838284b50dc38bf8107aee15b046dd4cc6a: Validation 44253962999 FAILURE, CodeQL 44253963066 SUCCESS, Dependency Review 44253963144 SUCCESS. PR #166 exact HEAD 205d39742a8c98e94453df44106ec83d5dba0ea0: Validation 44254136344 FAILURE, CodeQL 44254136396 SUCCESS, Dependency Review 44254136318 SUCCESS. Their Validation failures are frontend Unit-test/assertion failures.
- PR #167 exact HEAD 3177cfba1cbaee43a9feed2dd8b2010249a7d12f: Validation 44255156916 FAILURE, CodeQL 44255156921 SUCCESS, Dependency Review 44255156940 SUCCESS. PR #168 exact HEAD a935803ac1c0b614fd3b49180da29b6bcd3f7b1e: Validation 44272119611 FAILURE, CodeQL 44272119580 SUCCESS, Dependency Review 44272119594 SUCCESS. PR #169 exact HEAD 0b6d97be460cabc24013b15d180cdf6d4180d42b: Validation 44272942930 FAILURE, CodeQL 44272943096 SUCCESS, Dependency Review 44272943019 SUCCESS. PR #170 exact HEAD 6de7cedc9b1214f7bf819e8b76fd1d8986d8d085: Validation 44273476324 FAILURE, CodeQL 44273476308 SUCCESS, Dependency Review 44273476354 SUCCESS. #168/#169 are frontend Unit-test/assertion failures; #167/#170 are runtime npm-audit failures with 28 findings (2 moderate, 26 high) on historical pre-withdrawal snapshots.
- PR #171 exact HEAD cd3cd0e01f8dab9c1ac8e47c923a05134857d47d and PR #172 exact HEAD 5e0f0c000a3a3707e5565c32804e4d221a886caa share tree cf955182d98cae2e19f10c0e08f8e12621cb5242 but are sibling commits. #171 Validation 44358862088, CodeQL 44358862249, Dependency Review 44358862085 all SUCCESS. #172 Validation 44350568289, CodeQL 44350568525, Dependency Review 44350568368 all SUCCESS. Each has zero formal reviews and zero inline threads, with tarlaci1984-sketch requested. Do not close or merge either automatically.

### Picomatch / Issue #155
- GitHub Advisory GHSA-fc5q-39xc-vjpf was WITHDRAWN on 2026-11-18; the corresponding OSV GHSA record is also withdrawn. OSV's separate CVE-2026-112366 conversion still carries the original HIGH severity fields, so it must not be confused with the withdrawn GHSA record. Snyk marks the JavaScript advisory revoked / not a vulnerability. Official npm lists picomatch 4.0.7 as latest; there is no 4.0.8 release. Withdrawal is not a patched npm release.
- Upstream PR #238 exact HEAD 44f192261f312ddf236cb7bdc05d8f22663f98f9 has six review submissions (3 COMMENTED, 3 APPROVED), zero inline threads, and Tests run 39833229778 completed action_required with zero jobs.
- Required exact no-space patterns: +(*), *(*), +(a*), +(*a), *(a*|b), +(ab|abab).
- #264 and #265 current exact heads are 8144a1a22a8fa1766951411f220cc8c6228cb041 and dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c (5/6 each, missing +(ab|abab)); #254 c63a5bf4e61dbdb81bc41e97dc2616c30acce337 and #246 f03bec2c02e46f063fbfdc161aae1d0f854b2565 cover 3/6; #257 4e4892e0ac6c374ec3d9e4dc430101da9a20a37b covers 1/6. Their current exact-head workflow records are action_required with zero jobs; #257 has one APPROVED review, the others have zero reviews, and all six have zero inline threads.
- #264 and #265 current exact heads are 8144a1a22a8fa1766951411f220cc8c6228cb041 and dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c (5/6 each, missing +(ab|abab)); #254 c63a5bf4e61dbdb81bc41e97dc2616c30acce337 and #246 f03bec2c02e46f063fbfdc161aae1d0f854b2565 cover 3/6; #257 4e4892e0ac6c374ec3d9e4dc430101da9a20a37b covers 1/6. Their current exact-head workflow records are action_required with zero jobs; #257 has one APPROVED review, the others have zero reviews, and all six have zero inline threads.
- PR #235 is CLOSED/unmerged at 0150ed18b7971894bfd1824c8f96d6b63c70ad1f; Tests run 39425238918 failed, with one COMMENTED review and zero inline threads. The maintainer disputes the CVE and advises against allowing untrusted user-defined patterns.
- The secured fork master is 3ab5a7627d480259e3d9ca67fbc14c125d374f0e. Its rulesets list is empty; branch-protection lookup returned 403, so classic protection cannot be verified. Release commit f9822e9514d490f3e3bc17f50a4d3cacff2056c2 is unsigned; master has no exact-head workflow record. PR #1 is merged with zero reviews and zero inline threads; historical CI 40650811785 passed 22/22 jobs. Current master package.json names @ryotsu/picomatch 4.0.7-a. An independent PR comment reports a remaining repeated-wildcard timeout and compatibility differences; maxExtglobRecursion:false disables the safeguard. npm provenance/integrity remains unverified. Do not import, pin or override this fork.
- The current source/manifest review found no direct application import and no identified route accepting untrusted user-defined glob patterns. This is reachability evidence, not complete mobile-bundle proof or product acceptance. Issue #155 remains OPEN until product-level reachability/acceptance is documented.

### SSRF, Node 22 and external acceptance
- Issue #64 remains OPEN. PR #99 exact HEAD f91c70d2636948e538f8e3559afc39cd93eb5139 has Validation 43772791089, CodeQL 43772791064 and Dependency Review 43772791109 all SUCCESS; 1 APPROVED plus 4 COMMENTED reviews and 2/2 resolved threads. PR #200 exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a has all three checks SUCCESS but zero reviews and zero threads, with tarlaci1984-sketch requested.
- Production SSRF acceptance remains BLOCKED until independent security-owner approval of the exact diff/configuration, production NAT64/DNS64 prefix inventory, verified deployed USEIT_NAT64_PREFIXES, and staging plus production egress evidence are recorded. PR #203 Node 22 Android/iOS prebuild candidate is 3/3 green but has zero reviews and zero threads; CI is not physical-device or production acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout and business pilot approval remain outstanding.

---

## Current release evidence checkpoint — 2026-11-21 12:48 CET

Captured from live GitHub API evidence at 11:48 UTC. This checkpoint distinguishes each pull request's exact head from its own workflow results. No parent, sibling, or historical workflow result is attributed to a different SHA. This is a pre-update snapshot; the commit that adds it must pass its own exact-head Validation, CodeQL, and Dependency Review.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation frontend, backend, and iOS jobs passed; CodeQL Analyze and Dependency Review passed: five jobs total.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 submissions (25 COMMENTED, 1 APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, and 109 combined timeline records. There are zero unresolved inline threads.
- The PR description still contains superseded historical text claiming exact HEAD `b46c5b8082ecbebd263a86cd53b1321a86e570d1` and an open/unmerged state. It is stale; live metadata is authoritative.
- Three historical queued runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks. Repository administrator cancellation remains required.

### Main protection and repository inventory

- Main exact HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; main reports `protected: true`. Protect main ruleset 26370589 is ACTIVE, requires strict CodeQL/backend/frontend/ios/analyze/dependency-review checks, one approval, stale-review dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and has no bypass actors. Current-user bypass is never.
- Repository visibility is public. Paginated branch inventory is 172 branches (100 + 72). GitHub Search API reports 105 open PRs. There are eight open non-PR issues: #198, #155, #149, #74, #64, #25, #24, and #23. The Releases API returns an empty array: zero published releases.
- Issue #74 has 324 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 234 comments. Issue #155 has 107 comments. Issue #64 has 89 comments. Issue #47 is CLOSED with 11 comments.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration. Their state remains unverified, not empty. Successful CodeQL and Dependency Review workflow runs are not alert-inventory queries.

### PR #204 — separate failed documentation candidate

- PR #204 is OPEN/DRAFT at exact HEAD `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`, with 10 commits and four changed files.
- Its exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE: frontend 331 tests passed and one documentation assertion failed; backend and iOS jobs passed. CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on that same SHA. This is a separate candidate and its result is not attributed to PR #206.

### PR #206 — current clean-main release-documentation candidate

- PR #206 is OPEN/DRAFT at current exact HEAD `dae8b3f37eaf2c3f066a84050e28e16d265af1ce`, on `fix/release-evidence-checkpoint-assertion-20261120-run11`, targeting main at `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. It has 19 commits, four changed files, and compares 19 commits ahead / 0 behind main.
- Exact-head Validation [44895290673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290673) is terminal FAILURE. Its frontend job [136826547786](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290673/job/136826547786) completed with 331 frontend tests passed and 5 failed; 71/72 test files passed. Backend job [136826549208](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290673/job/136826549208) passed 450 tests, 27 readiness checks, 78 security checks, and backend pip-audit (`No known vulnerabilities found`). iOS job [136826548534](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290673/job/136826548534) passed the native Release build and simulator smoke.
- Exact-head CodeQL [44895290741](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290741) and Dependency Review [44895290701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44895290701) are terminal SUCCESS on `dae8b3f`. No Validation or security workflow is queued or running for this head.
- The five frontend failures are all release-evidence assertion mismatches in `scripts/release-evidence-checkpoint.test.mjs`, not demonstrated application runtime regressions: (1) the latest checkpoint omitted PR #204's exact-head failure evidence; (2) it omitted PR #211's source/merge commit `50a41b13b2cb1f76040c8d16fdbae9e1135a2656`; (3) the historical PR #171 SHA in the document was truncated and must be the exact 40-character `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`; (4) a case-sensitive assertion expected lowercase `do not` while the sentence correctly begins `Do not`; and (5) the checkpoint did not explicitly enumerate all blocked release item IDs, including #5. Preserve all nine tests and correct the evidence/assertions; do not delete or skip tests.
- PR #206 currently has one automated Dependency Review conversation comment, zero formal human review submissions, and zero inline review threads. Reviewer `tarlaci1984-sketch` is requested. The PR description still refers to older HEAD `7dc73caf` and obsolete workflow evidence; it requires later reconciliation after this exact-head gate.
- The validated parent was `f7d61201f298817df3bf449b501b811fb6f97c4d`. PR #206 is OPEN/DRAFT at pre-update parent HEAD f7d61201f298817df3bf449b501b811fb6f97c4d, 18 commits ahead of main and 0 behind. That parent's Validation [44891058990](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058990), CodeQL [44891058987](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058987), and Dependency Review [44891058847](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058847) all passed on the parent SHA only. Parent validation passed 334 frontend tests, Expo Doctor 21/21, Android Release/emulator smoke, iOS Release/simulator smoke, 450 backend tests, 27 readiness checks, and 78 security checks. Backend cryptography was 50.0.2 and backend pip-audit was clean. The frontend runtime npm audit still reported three moderate minimatch findings; the configured HIGH threshold passed, not a zero-finding audit. tarlaci1984-sketch is requested. Parent results are not reused for `dae8b3f`.

### Stacked documentation-correction candidates

- PR #210 remains OPEN/DRAFT at exact HEAD `8603fc3be80efcfb0c2a27efc1f13b37af1020b8`, based on the #208 branch at `abb2ee310b6a842b22c970d364f7590553b8f76f`. Its exact-head Validation [44879889461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889461), CodeQL [44879889464](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889464), and Dependency Review [44879889445](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889445) all passed.
- PR #211 is CLOSED/MERGED into the PR #210 feature branch, not main. Its exact source/merge commit is `50a41b13b2cb1f76040c8d16fdbae9e1135a2656`; its own Validation [44877258461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258461), CodeQL [44877258455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258455), and Dependency Review [44877258499](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258499) all passed. The merge is branch-level only.
- PR #212 remains OPEN/DRAFT at exact HEAD `2b767c68f7e81a054f8cd12b7ad38dd17f3288a7`, based on stale parent SHA `108c251f65987f88053c89a3337187164d08c8d4`, which is behind current PR #206 HEAD `dae8b3f37eaf2c3f066a84050e28e16d265af1ce`. GitHub currently reports mergeable=false because its base is stale. Its exact-head Validation [44883482260](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482260), CodeQL [44883482245](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482245), and Dependency Review [44883482182](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482182) all passed. It does not update the three release documents and is not a replacement for the current evidence correction.
- PR #213 remains OPEN/DRAFT at exact HEAD `f744702155aad6f8f7fc8423b15af8d7c4fbbf6c`; Validation [44883818525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818525), CodeQL [44883818524](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818524), and Dependency Review [44883818528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818528) all passed. It is a separate stacked documentation candidate, not a main merge.
- PR #214 is CLOSED/unmerged as superseded at exact HEAD `3a28d3455e066cc0ab726af2a05421d0594118ad`. Its Validation [44889456793](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456793), CodeQL [44889456796](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456796), and Dependency Review [44889456777](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456777) passed. No merge into main occurred.

### Historical release-evidence candidates

- PR #85 current exact HEAD is `ea1bf815d90d91026b24c46ec1869b8218211d80`. Validation 44645305669 failed on a frontend documentation Unit-test assertion (299/300 tests; 60/61 files); CodeQL 44645305765 and Dependency Review 44645306118 succeeded. Its runtime npm audit separately completed with three moderate minimatch findings and passed the configured HIGH threshold.
- PR #163 exact HEAD 879a6392b3bcd248deca40916e15fd69a467df7b had Validation 44241274884 FAILURE, CodeQL 44241274855 SUCCESS, and Dependency Review 44241274910 SUCCESS. PR #166 exact HEAD 205d39742a8c98e94453df44106ec83d5dba0ea0 had Validation 44254136344 FAILURE, CodeQL 44254136396 SUCCESS, and Dependency Review 44254136318 SUCCESS.
- PR #167 exact HEAD 3177cfba1cbaee43a9feed2dd8b2010249a7d12f had Validation 44255156916 FAILURE, CodeQL 44255156921 SUCCESS, and Dependency Review 44255156940 SUCCESS. PR #170 exact HEAD 6de7cedc9b1214f7bf819e8b76fd1d8986d8d085 had Validation 44273476324 FAILURE, CodeQL 44273476308 SUCCESS, and Dependency Review 44273476354 SUCCESS. Historical PR #167/#170 runtime npm-audit snapshots reported 28 findings (2 moderate, 26 high); do not transfer those historical results to the current branch.
- PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d` and PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa` share tree `cf955182d98cae2e19f10c0e08f8e12621cb5242` but are sibling commits. #171 Validation 44358862088, CodeQL 44358862249, Dependency Review 44358862085 all succeeded. #172 Validation 44350568289, CodeQL 44350568525, Dependency Review 44350568368 all succeeded. Both remain separate, unmerged candidates.

### Issues and security

- Issue #47 is CLOSED with 11 comments. The active Protect main ruleset 26370589 is the current positive evidence; no branch-protection setting was changed in this run.
- Issue #64 remains OPEN with 89 comments. Current-main PR #200 is OPEN/DRAFT at exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) succeeded. PR #200 has zero formal reviews and zero inline threads; `tarlaci1984-sketch` is requested. Backend evidence: 539 tests, 27 readiness checks, 78 security/privacy checks, cryptography 50.0.2, and pip-audit `No known vulnerabilities found`. Frontend runtime npm audit still reports three moderate minimatch findings; it is not clean.
- Production SSRF acceptance remains BLOCKED until an independent security-owner APPROVED review of the exact #200 diff/configuration, a complete production DNS64/NAT64 translator-prefix inventory, direct verification of deployed `USEIT_NAT64_PREFIXES`, and staging plus production egress evidence are recorded. No production configuration or egress evidence was available in this audit.
- Issue #155 remains OPEN with 107 comments. GitHub Advisory GHSA-fc5q-39xc-vjpf was WITHDRAWN on 2026-11-18; withdrawal is not a patched npm release. Snyk marks the JavaScript advisory revoked. Official npm lists picomatch 4.0.7 as latest; there is no 4.0.8 release. Upstream PR #238 exact HEAD `44f192261f312ddf236cb7bdc05d8f22663f98f9` has six review submissions (3 COMMENTED, 3 APPROVED), zero inline threads, and test run 39833229778 action_required with zero jobs. The six exact no-space regression patterns remain required; current reviewed candidates cover 3/6 or 5/6, not all six. PR #235 is CLOSED/unmerged. The third-party fork has no verified provenance, is unsigned, and has a reported remaining repeated-wildcard timeout/compatibility risk. Do not import, pin or override this fork. Issue #155 remains OPEN pending product-level reachability and acceptance evidence.

### Release records and canonical 25-point register

- This 12:48 CET checkpoint is synchronized across `docs/RELEASE_RUNBOOK.md`, `docs/RELEASE_PILOT_ACCEPTANCE.md`, and `docs/25-POINT-RELEASE-BACKLOG.md` on the PR #206 branch only. Main's three release records remain on their older 2026-11-13 checkpoint; main is unchanged.
- The candidate row-level register remains 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked IDs: #2, #4, #5, #16, #18, #21, #22, #25.
- #2 remains Blocked pending the owner's durable public/private repository-visibility and release-plan decision. Main's existing register remains 3 Done / 15 In Progress / 7 Blocked; the candidate register is not merged into main.
- External acceptance remains blocked for physical iPhone App Attest (#4), Play-installed Android Play Integrity (#5), witnessed production backup/restore (#16), product-recognition benchmark and business acceptance (#18), production monitoring and alert delivery (#21), approved staged rollout and tested rollback (#22), and real-user pilot/business sign-off (#25). Production console setup, physical-device verification, production cloud access, witnessed backup/restore, rollout approvals, and real-user/business approval require external evidence.
- Issue #74 remains 64 checklist items: 41 checked and 23 open. The separate 25-point release register is not conflated with that checklist. CI, emulators, and simulators do not satisfy physical-device, production, or business acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

## Current release evidence checkpoint — 2026-11-21 14:16 CET

Captured from live GitHub API evidence at 13:16 UTC. This checkpoint distinguishes each pull request's exact head from its own workflow results. No parent, sibling, or historical workflow result is attributed to a different SHA. This is a pre-update snapshot; the commit that adds it must pass its own exact-head Validation, CodeQL, and Dependency Review.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on `fix/release-blockers-2026-10`. Live PR metadata and the source branch ref both report exact HEAD `68b380e73ca3c870048035197beef8febbf90ef1`; merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation frontend, backend, and iOS jobs passed; CodeQL Analyze and Dependency Review passed: five jobs total.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 submissions (25 COMMENTED, 1 APPROVED by `tarlaci1984-sketch`), 22/22 inline threads resolved, and 109 combined timeline records. There are zero unresolved inline threads.
- The PR description still contains superseded historical text claiming exact HEAD `b46c5b8082ecbebd263a86cd53b1321a86e570d1` and an open/unmerged state. It is stale; live metadata is authoritative.
- Three historical queued runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks. Repository administrator cancellation remains required.

### Main protection and repository inventory

- Main exact HEAD is `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`; main reports `protected: true`. Protect main ruleset 26370589 is ACTIVE, requires strict CodeQL/backend/frontend/ios/analyze/dependency-review checks, one approval, stale-review dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and has no bypass actors. Current-user bypass is never.
- Repository visibility is public. Paginated branch inventory is 172 branches (100 + 72). GitHub Search API reports 104 open PRs. There are eight open non-PR issues: #198, #155, #149, #74, #64, #25, #24, and #23. The Releases API returns an empty array: zero published releases.
- Issue #74 has 327 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 240 comments. Issue #155 has 109 comments. Issue #64 has 90 comments. Issue #47 is CLOSED with 11 comments.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration. Their state remains unverified, not empty. Successful CodeQL and Dependency Review workflow runs are not alert-inventory queries.

### PR #204 — separate failed documentation candidate

- PR #204 is OPEN/DRAFT at exact HEAD `c3fd17a1029adb26962b8cb96b06ef87b5fee2a7`, with 10 commits and four changed files.
- Its exact-head Validation [44828340885](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340885) is terminal FAILURE: frontend 331 tests passed and one documentation assertion failed; backend and iOS jobs passed. CodeQL [44828340790](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828340790) and Dependency Review [44828341122](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44828341122) are terminal SUCCESS on that same SHA. This is a separate candidate and its result is not attributed to PR #206.

### PR #206 — current clean-main release-documentation candidate

- PR #206 is OPEN/DRAFT at current exact HEAD `c138a0cad3a427d906f48bfca2d4faf1928e6ac5`, on `fix/release-evidence-checkpoint-assertion-20261120-run11`, targeting main at `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`. It has 21 commits, four changed files, and compares 21 commits ahead / 0 behind main.
- Exact-head Validation [44902970962](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970962) is terminal FAILURE. Its frontend job [136849821199](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970962/job/136849821199) completed with 332 frontend tests passed and 4 failed; 71/72 test files passed. Backend job [136849822046](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970962/job/136849822046) passed 450 tests, 27 readiness checks, 78 security checks, and backend pip-audit (`No known vulnerabilities found`). iOS job [136849821905](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970962/job/136849821905) passed the native Release build and simulator smoke.
- Exact-head CodeQL [44902970838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970838) and Dependency Review [44902970850](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44902970850) are terminal SUCCESS on `c138a0c`. All three mandatory workflows are terminal for this exact HEAD; Validation failed, while CodeQL and Dependency Review passed.
- The four frontend failures are release-evidence assertion mismatches in `scripts/release-evidence-checkpoint.test.mjs`, not demonstrated application runtime regressions: (1) the test expects a lower-case queued-run summary that differs from the documented `Three historical runs remain QUEUED with zero jobs` wording; (2) the PR #212 mergeability assertion still names the previous PR #206 HEAD `dae8b3f`, while PR #206 is now `c138a0c` and PR #212's base remains `108c251`; (3) the PR #171 SHA assertion omits the Markdown code formatting used in the document; and (4) the candidate-register summary assertion does not match the documented `candidate row-level register remains **2 Done / 15 In Progress / 8 Blocked**` wording. Preserve all nine tests and correct the stale evidence/assertions; do not delete or skip tests.
- PR #206 currently has one automated Dependency Review conversation comment, zero formal human review submissions, and zero inline review threads. Reviewer `tarlaci1984-sketch` is requested. The PR description is stale: it still lists exact HEAD `dae8b3f37eaf2c3f066a84050e28e16d265af1ce` and workflow runs `44895290673`, `44895290741`, and `44895290701`, while live PR metadata reports `c138a0cad3a427d906f48bfca2d4faf1928e6ac5` and runs `44902970962`, `44902970838`, and `44902970850`. Reconcile the description after this exact-head gate.
- The validated parent was `f7d61201f298817df3bf449b501b811fb6f97c4d`. PR #206 is OPEN/DRAFT at pre-update parent HEAD f7d61201f298817df3bf449b501b811fb6f97c4d, 18 commits ahead of main and 0 behind. That parent's Validation [44891058990](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058990), CodeQL [44891058987](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058987), and Dependency Review [44891058847](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44891058847) all passed on the parent SHA only. Parent validation passed 334 frontend tests, Expo Doctor 21/21, Android Release/emulator smoke, iOS Release/simulator smoke, 450 backend tests, 27 readiness checks, and 78 security checks. Backend cryptography was 50.0.2 and backend pip-audit was clean. The frontend runtime npm audit still reported three moderate minimatch findings; the configured HIGH threshold passed, not a zero-finding audit. tarlaci1984-sketch is requested. Parent results are not reused for `dae8b3f`.

### Stacked documentation-correction candidates

- PR #210 remains OPEN/DRAFT at exact HEAD `8603fc3be80efcfb0c2a27efc1f13b37af1020b8`, based on the #208 branch at `abb2ee310b6a842b22c970d364f7590553b8f76f`. Its exact-head Validation [44879889461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889461), CodeQL [44879889464](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889464), and Dependency Review [44879889445](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44879889445) all passed.
- PR #211 is CLOSED/MERGED into the PR #210 feature branch, not main. Its exact source/merge commit is `50a41b13b2cb1f76040c8d16fdbae9e1135a2656`; its own Validation [44877258461](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258461), CodeQL [44877258455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258455), and Dependency Review [44877258499](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44877258499) all passed. The merge is branch-level only.
- PR #212 remains OPEN/DRAFT at exact HEAD `2b767c68f7e81a054f8cd12b7ad38dd17f3288a7`, based on stale parent SHA `108c251f65987f88053c89a3337187164d08c8d4`, which is behind current PR #206 HEAD `c138a0cad3a427d906f48bfca2d4faf1928e6ac5`. GitHub reports mergeable=false because its base SHA `108c251f65987f88053c89a3337187164d08c8d4` is stale against current PR #206 HEAD `c138a0cad3a427d906f48bfca2d4faf1928e6ac5`. Its exact-head Validation [44883482260](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482260), CodeQL [44883482245](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482245), and Dependency Review [44883482182](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883482182) all passed. It does not update the three release documents and is not a replacement for the current evidence correction.
- PR #213 remains OPEN/DRAFT at exact HEAD `f744702155aad6f8f7fc8423b15af8d7c4fbbf6c`; Validation [44883818525](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818525), CodeQL [44883818524](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818524), and Dependency Review [44883818528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44883818528) all passed. It is a separate stacked documentation candidate, not a main merge.
- PR #214 is CLOSED/unmerged as superseded at exact HEAD `3a28d3455e066cc0ab726af2a05421d0594118ad`. Its Validation [44889456793](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456793), CodeQL [44889456796](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456796), and Dependency Review [44889456777](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44889456777) passed. No merge into main occurred.

### Historical release-evidence candidates

- PR #85 current exact HEAD is `ea1bf815d90d91026b24c46ec1869b8218211d80`. Validation 44645305669 failed on a frontend documentation Unit-test assertion (299/300 tests; 60/61 files); CodeQL 44645305765 and Dependency Review 44645306118 succeeded. Its runtime npm audit separately completed with three moderate minimatch findings and passed the configured HIGH threshold.
- PR #163 exact HEAD 879a6392b3bcd248deca40916e15fd69a467df7b had Validation 44241274884 FAILURE, CodeQL 44241274855 SUCCESS, and Dependency Review 44241274910 SUCCESS. PR #166 exact HEAD 205d39742a8c98e94453df44106ec83d5dba0ea0 had Validation 44254136344 FAILURE, CodeQL 44254136396 SUCCESS, and Dependency Review 44254136318 SUCCESS.
- PR #167 exact HEAD 3177cfba1cbaee43a9feed2dd8b2010249a7d12f had Validation 44255156916 FAILURE, CodeQL 44255156921 SUCCESS, and Dependency Review 44255156940 SUCCESS. PR #170 exact HEAD 6de7cedc9b1214f7bf819e8b76fd1d8986d8d085 had Validation 44273476324 FAILURE, CodeQL 44273476308 SUCCESS, and Dependency Review 44273476354 SUCCESS. Historical PR #167/#170 runtime npm-audit snapshots reported 28 findings (2 moderate, 26 high); do not transfer those historical results to the current branch.
- PR #171 exact HEAD `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d` and PR #172 exact HEAD `5e0f0c000a3a3707e5565c32804e4d221a886caa` share tree `cf955182d98cae2e19f10c0e08f8e12621cb5242` but are sibling commits. #171 Validation 44358862088, CodeQL 44358862249, Dependency Review 44358862085 all succeeded. #172 Validation 44350568289, CodeQL 44350568525, Dependency Review 44350568368 all succeeded. Both remain separate, unmerged candidates.

### Issues and security

- Issue #47 is CLOSED with 11 comments. The active Protect main ruleset 26370589 is the current positive evidence; no branch-protection setting was changed in this run.
- Issue #64 remains OPEN with 89 comments. Current-main PR #200 is OPEN/DRAFT at exact HEAD `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) succeeded. PR #200 has zero formal reviews and zero inline threads; `tarlaci1984-sketch` is requested. Backend evidence: 539 tests, 27 readiness checks, 78 security/privacy checks, cryptography 50.0.2, and pip-audit `No known vulnerabilities found`. Frontend runtime npm audit still reports three moderate minimatch findings; it is not clean.
- Production SSRF acceptance remains BLOCKED until an independent security-owner APPROVED review of the exact #200 diff/configuration, a complete production DNS64/NAT64 translator-prefix inventory, direct verification of deployed `USEIT_NAT64_PREFIXES`, and staging plus production egress evidence are recorded. No production configuration or egress evidence was available in this audit.
- Issue #155 remains OPEN with 107 comments. GitHub Advisory GHSA-fc5q-39xc-vjpf was WITHDRAWN on 2026-11-18; withdrawal is not a patched npm release. Snyk marks the JavaScript advisory revoked. Official npm lists picomatch 4.0.7 as latest; there is no 4.0.8 release. Upstream PR #238 exact HEAD `44f192261f312ddf236cb7bdc05d8f22663f98f9` has six review submissions (3 COMMENTED, 3 APPROVED), zero inline threads, and test run 39833229778 action_required with zero jobs. The six exact no-space regression patterns remain required; current reviewed candidates cover 3/6 or 5/6, not all six. PR #235 is CLOSED/unmerged. The third-party fork has no verified provenance, is unsigned, and has a reported remaining repeated-wildcard timeout/compatibility risk. Do not import, pin or override this fork. Issue #155 remains OPEN pending product-level reachability and acceptance evidence.

### Release records and canonical 25-point register

- This 12:48 CET checkpoint is synchronized across `docs/RELEASE_RUNBOOK.md`, `docs/RELEASE_PILOT_ACCEPTANCE.md`, and `docs/25-POINT-RELEASE-BACKLOG.md` on the PR #206 branch only. Main's three release records remain on their older 2026-11-13 checkpoint; main is unchanged.
- The candidate row-level register remains 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked IDs: #2, #4, #5, #16, #18, #21, #22, #25.
- #2 remains Blocked pending the owner's durable public/private repository-visibility and release-plan decision. Main's existing register remains 3 Done / 15 In Progress / 7 Blocked; the candidate register is not merged into main.
- External acceptance remains blocked for physical iPhone App Attest (#4), Play-installed Android Play Integrity (#5), witnessed production backup/restore (#16), product-recognition benchmark and business acceptance (#18), production monitoring and alert delivery (#21), approved staged rollout and tested rollback (#22), and real-user pilot/business sign-off (#25). Production console setup, physical-device verification, production cloud access, witnessed backup/restore, rollout approvals, and real-user/business approval require external evidence.
- Issue #74 remains 64 checklist items: 41 checked and 23 open. The separate 25-point release register is not conflated with that checklist. CI, emulators, and simulators do not satisfy physical-device, production, or business acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

## Current release evidence checkpoint — 2026-11-21 15:16 CET

Captured from live GitHub API evidence at 14:16 UTC. This checkpoint records the verified parent candidate HEAD before this documentation refresh. The commit that adds this checkpoint must pass its own exact-head Validation, CodeQL, and Dependency Review; no result from parent d924ad0 is attributed to the new child.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the source branch ref both report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation frontend, backend, and iOS jobs passed; CodeQL Analyze and Dependency Review passed: five jobs total.
- Review inventory: 53 conversation comments, 30 inline review comments, 26 submissions (25 COMMENTED, 1 APPROVED by tarlaci1984-sketch), 22/22 inline threads resolved, and 109 combined timeline records. There are zero unresolved inline threads.
- The PR description still contains superseded historical text claiming exact HEAD b46c5b8082ecbebd263a86cd53b1321a86e570d1 and an open/unmerged state. Live metadata is authoritative.
- Three historical queued runs remain QUEUED with zero jobs on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). These are not current-head checks; an administrator must cancel them.

### PR #206 — current clean-main release-documentation candidate

- PR #206 is OPEN/DRAFT at exact HEAD d924ad080f04f765016821113210bc4634c3e8f2, on fix/release-evidence-checkpoint-assertion-20261120-run11, targeting main at e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. It has 22 commits and four changed files; compare reports 22 ahead / 0 behind main.
- Exact-head Validation [44908725950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950), CodeQL [44908725942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725942), and Dependency Review [44908726032](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908726032) are terminal SUCCESS on this exact SHA.
- Validation frontend job [136859741830](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950) passed 336 tests across 72 files, Expo Doctor 21/21, Android export validation, Android Release build, and Android emulator smoke. Backend job [136859742056](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950) passed 450 tests, 27 production-readiness checks, and 78 security/privacy checks; backend pip-audit reported "No known vulnerabilities found". iOS job [136859742094](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950) passed the native Release build and simulator smoke. CodeQL Analyze job [136859741852](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725942) and Dependency Review job [136859741619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908726032) both passed.
- Frontend runtime npm audit --omit=dev --audit-level=high reports 3 moderate minimatch vulnerabilities. The configured high threshold allows the job to pass; this is not evidence of zero frontend vulnerabilities. Do not force-upgrade Expo or suppress the audit. Keep the minimatch reachability/remediation work open.
- PR #206 has zero formal human reviews, zero inline review threads, and one automated Dependency Review comment. Reviewer tarlaci1984-sketch is requested. It remains draft pending human review and subsequent release gates.
- The previous PR #206 HEAD c138a0cad3a427d906f48bfca2d4faf1928e6ac5 had four release-evidence assertion failures (332 frontend tests passed); that result is historical and superseded by the successful exact-head runs on d924ad0.

### PR #215 — stale alternative documentation candidate

- PR #215 remains OPEN/DRAFT at exact HEAD 061bd79a581f5c98385bab58dc9d355ece2f3fce. Its recorded base SHA is the older PR #206 HEAD dae8b3f37eaf2c3f066a84050e28e16d265af1ce, while current PR #206 is at d924ad080f04f765016821113210bc4634c3e8f2; GitHub reports mergeable=false.
- PR #215's own Validation [44898489771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489771), CodeQL [44898489791](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489791), and Dependency Review [44898489815](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489815) are terminal SUCCESS on its own head. These results do not make its stale base suitable for integration. Do not merge or rebase it automatically.

### Issue #64 and PR #200 — SSRF remediation

- Issue #64 remains OPEN with 90 comments. Current-main successor PR #200 is OPEN/DRAFT at exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a, one commit ahead / zero behind main, with seven changed files.
- PR #200 exact-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Its recorded backend evidence is 539 tests, 27 readiness checks, 78 security/privacy checks, and clean pip-audit.
- PR #200 has zero formal reviews and zero inline review threads; tarlaci1984-sketch is requested. The approval on older PR #99 does not transfer to #200.
- Production SSRF acceptance remains BLOCKED until an independent security owner approves the exact diff/configuration, every production NAT64/DNS64 prefix is inventoried, deployed USEIT_NAT64_PREFIXES matches that inventory, and staging plus production egress tests prove private/reserved/translated-private destinations are rejected while approved public destinations work. No production deployment is inferred from CI.

### Main protection, repository inventory, and issue evidence

- Main exact HEAD is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266; the main branch API reports protected: true. Protect main ruleset 26370589 is ACTIVE, requires strict CodeQL/backend/frontend/ios/analyze/dependency-review checks, one approval, stale-review dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and has no bypass actors. Current-user bypass is never.
- Repository visibility is public. Paginated branch inventory is 172 branches (100 + 72; final page empty). GitHub Search API reports 104 open PRs and eight open non-PR issues. The Releases API returns an empty array: zero published releases.
- Issue #47 is CLOSED with 11 comments. Issue #74 has 328 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 241 comments. Issue #155 has 109 comments and remains OPEN; its third-party picomatch fork is not approved. Issue #64 has 90 comments and remains OPEN.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration. Their state remains unverified, not empty. Successful CodeQL and Dependency Review workflow runs are not alert-inventory queries.
- Main's three release documents remain on their older 2026-11-13 checkpoint. This candidate refresh applies only to the PR #206 branch; main has not been changed.

### Canonical 25-point release register

- The candidate backlog contains exactly 25 numbered rows: 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Main's existing register remains 3 Done / 15 In Progress / 7 Blocked; the candidate register is not merged into main. #2 remains Blocked pending the owner's durable public/private repository-visibility and release-plan decision.
- External acceptance remains Blocked for physical iPhone App Attest (#4), Play-installed Android Play Integrity (#5), witnessed production backup/restore (#16), product-recognition benchmark and business acceptance (#18), production monitoring and alert delivery (#21), approved staged rollout and tested rollback (#22), and real-user pilot/business sign-off (#25). CI, emulators, and simulators do not satisfy physical-device, production, or business acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

## Current release evidence checkpoint — 2026-11-21 16:11 CET

Captured from live GitHub API evidence at 15:11 UTC. This is a pre-update snapshot on the PR #206 branch. The commit that appends it must pass its own exact-head Validation, CodeQL, and Dependency Review; no parent result is attributed to that new commit. Main is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the source branch ref both report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, and iOS Validation jobs passed; CodeQL Analyze and Dependency Review passed (five jobs total).
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline threads resolved (20 outdated), and 109 combined timeline records.
- The PR description remains stale: it still describes the PR as open/unmerged and cites obsolete exact HEAD b46c5b8082ecbebd263a86cd53b1321a86e570d1. Live metadata and the source branch ref are authoritative.
- Three historical runs remain QUEUED with zero jobs on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). They are not current-head checks; a repository administrator must cancel them.

### PR #206 — current clean-main release-documentation candidate

- PR #206 is OPEN/DRAFT at exact HEAD a7a2033589a429609c6d62eea2f99684eba3731f, on fix/release-evidence-checkpoint-assertion-20261120-run11, targeting main at e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. It has 23 commits and four changed files. The source branch ref matches the PR head.
- Exact-head Validation [44913605303](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44913605303) is terminal FAILURE; CodeQL [44913605312](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44913605312) and Dependency Review [44913606044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44913606044) are terminal SUCCESS on the same SHA.
- Validation job results: frontend FAILED, backend SUCCESS, iOS SUCCESS. The frontend suite reported 335 frontend tests passed, 1 failed; 71/72 files. The sole failure is one release-evidence wording assertion in scripts/release-evidence-checkpoint.test.mjs: the assertion expected “Issue #74 remains a separate 64-item development checklist”, while the checkpoint includes the live comment count before that phrase. This is a documentation/test wording mismatch, not a demonstrated application runtime defect.
- The validated parent PR #206 HEAD d924ad080f04f765016821113210bc4634c3e8f2 passed its own exact-head Validation [44908725950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950), CodeQL [44908725942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725942), and Dependency Review [44908726032](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908726032). Parent evidence included 336 tests across 72 files, Expo Doctor 21/21, Android Release/emulator smoke, 450 tests, 27 production-readiness checks, and 78 security/privacy checks; backend pip-audit reported “No known vulnerabilities found”, and iOS passed native Release build and simulator smoke. These results are not attributed to current HEAD a7a2033589a429609c6d62eea2f99684eba3731f.
- Frontend runtime npm audit --omit=dev --audit-level=high reports 3 moderate minimatch vulnerabilities; the configured HIGH threshold passed. This is not evidence of zero frontend vulnerabilities.
- PR #206 has one automated Dependency Review conversation comment, zero formal human reviews, zero inline review threads, and tarlaci1984-sketch is requested. It remains draft pending human review.
- The PR #206 description is stale and still lists the earlier dae8b3f HEAD and previous workflow IDs. Do not use its body as current evidence; reconcile it only after this new checkpoint commit has passed its own exact-head CI.

### PR #215 — separate stale documentation candidate

- PR #215 remains OPEN/DRAFT at exact HEAD 061bd79a581f5c98385bab58dc9d355ece2f3fce, one commit and four changed files. Its base is PR #206's older HEAD dae8b3f37eaf2c3f066a84050e28e16d265af1ce, while current PR #206 is at a7a2033589a429609c6d62eea2f99684eba3731f; GitHub reports mergeable=false.
- PR #215's own exact-head Validation [44898489771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489771), CodeQL [44898489791](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489791), and Dependency Review [44898489815](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489815) are terminal SUCCESS on its own SHA. Its green checks do not fix the stale base; do not rebase or merge it automatically.

### Issue #64 and DNS-rebinding SSRF remediation

- Issue #64 remains OPEN with 91 comments. Current-main successor PR #200 is OPEN/DRAFT at exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a, based on main e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. PR #200 exact-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Recorded backend evidence is 539 tests, 27 readiness checks, 78 security/privacy checks, and clean pip-audit; frontend/iOS Release and emulator/simulator smoke passed.
- PR #200 has zero formal reviews and zero inline review threads; tarlaci1984-sketch is requested. The approval on legacy PR #99 does not transfer to #200. PR #99 remains open/draft on the older main base f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1.
- Production SSRF acceptance remains BLOCKED until an independent security owner approves the exact #200 diff/configuration, every production NAT64/DNS64 prefix is inventoried, deployed USEIT_NAT64_PREFIXES matches that inventory, and staging plus production egress tests verify private/reserved/translated-private destinations are rejected while approved public destinations work. No production deployment is inferred from CI.

### Main protection, repository inventory, and issue evidence

- Main exact HEAD is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. Protect main ruleset 26370589 is ACTIVE and requires strict CodeQL/backend/frontend/ios/analyze/dependency-review checks, one approval, stale-review dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors. The ruleset endpoint was readable; the separate branch-protection endpoint returned 403 to this integration.
- Repository visibility is public. Paginated branch inventory is 172 branches (100 + 72; final page empty). GitHub Search API reports 104 open PRs and eight open non-PR issues. The Releases API returns an empty array: zero published releases.
- Issue #47 is CLOSED with 11 comments. Issue #74 has 334 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 244 comments and remains OPEN. Issue #155 has 112 comments and remains OPEN; the picomatch advisory withdrawal is not a patched release, runtime reachability review remains incomplete, and the third-party fork is not approved. Issue #64 has 91 comments and remains OPEN.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration. Their state remains unverified, not empty. Successful CodeQL and Dependency Review workflow runs are not alert-inventory queries.
- Main's three release documents remain on their older 2026-11-13 checkpoint. This refresh applies only to the PR #206 branch; main has not been changed.

### Canonical 25-point release register

- The candidate backlog contains exactly 25 numbered rows: 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Main's existing register remains 3 Done / 15 In Progress / 7 Blocked; the candidate register is not merged into main. #2 remains Blocked pending the owner's durable public/private repository-visibility and release-plan decision.
- External acceptance remains Blocked for physical iPhone App Attest (#4), Play-installed Android Play Integrity (#5), witnessed production backup/restore (#16), product-recognition benchmark and business acceptance (#18), production monitoring and alert delivery (#21), approved staged rollout and tested rollback (#22), and real-user pilot/business sign-off (#25). CI, emulators, and simulators do not satisfy physical-device, production, or business acceptance.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

## Current release evidence checkpoint — 2026-11-21 17:32 CET

Captured from live GitHub API evidence at 16:32 UTC. This is a pre-update snapshot on the PR #217 child branch. The commit that appends it must pass its own exact-head Validation, CodeQL, and Dependency Review; no parent result is attributed to that new commit. Main is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the branch ref both report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Frontend, backend, and iOS Validation jobs passed; CodeQL Analyze and Dependency Review passed (five jobs total).
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline threads resolved (20 outdated), and 109 combined timeline records.
- The PR description remains stale: it still describes PR #41 as open/unmerged and cites obsolete exact HEAD b46c5b8082ecbebd263a86cd53b1321a86e570d1. Live metadata and the branch ref are authoritative.
- Three historical queued runs remain QUEUED with zero jobs on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). These are historical queues, not current-head checks; each has zero jobs. A repository administrator must cancel them.

### PR #206 — current clean-main documentation parent

- PR #206 is OPEN/DRAFT at exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720, on fix/release-evidence-checkpoint-assertion-20261120-run11, targeting main at e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. It has 24 commits and four changed files.
- Exact-head Validation [44918462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462263) is terminal FAILURE; CodeQL [44918462197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462197) and Dependency Review [44918462179](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462179) are terminal SUCCESS on the same SHA.
- Validation jobs: frontend FAILED, backend SUCCESS, iOS SUCCESS. The frontend suite reported 334 frontend tests passed, 2 failed; 71/72 files. The two failures are release-evidence assertions: the test's formal-review literal does not match the verified 26-formal-submission wording, and the checkpoint lacks the classification phrase “two release-evidence assertion mismatches”. These are documentation/test contract mismatches, not demonstrated application runtime defects.
- The validated parent PR #206 HEAD d924ad080f04f765016821113210bc4634c3e8f2 passed its own exact-head Validation [44908725950](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725950), CodeQL [44908725942](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908725942), and Dependency Review [44908726032](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44908726032). Its own evidence included 336 frontend tests across 72 files, Expo Doctor 21/21, Android Release/emulator smoke, 450 backend tests, 27 production-readiness checks, 78 security/privacy checks, clean backend pip-audit, and iOS native Release build and simulator smoke. Those results are not transferred to df0c26e.
- PR #206 has one automated Dependency Review comment, zero formal human reviews, zero inline review threads, and tarlaci1984-sketch is requested. The PR #206 description is stale and does not reflect the current exact HEAD and current workflow IDs.

### PR #217 — stacked wording-correction child

- PR #217 is OPEN/DRAFT at exact HEAD 4ee367797e748c1fc5d1e1614f4e4f766a9665ac, on fix/release-evidence-wording-assertion-20261121-run11-child, based on PR #206 exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720. It has two commits and four changed files.
- Exact-head Validation [44923441377](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44923441377) is terminal FAILURE; CodeQL [44923441358](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44923441358) and Dependency Review [44923441374](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44923441374) are terminal SUCCESS on the same child SHA.
- Validation jobs: frontend FAILED, backend SUCCESS, iOS SUCCESS. The frontend suite reported 335 frontend tests passed, 1 failed; 71/72 files. The sole failure is a wording mismatch in scripts/release-evidence-checkpoint.test.mjs: it expects “Three historical queued runs remain QUEUED with zero jobs”, while the checkpoint currently says “Three historical runs remain QUEUED with zero jobs”. The release records need the missing word “queued”; no application runtime defect is demonstrated.
- PR #217 has one automated Dependency Review comment, zero formal reviews, and zero inline review threads. PR #217 description is stale: it still says the parent PR #206 Validation is in progress, but that run is now terminal FAILURE. No human review or merge is inferred.

### PR #215 — separate stale candidate

- PR #215 remains OPEN/DRAFT at exact HEAD 061bd79a581f5c98385bab58dc9d355ece2f3fce. Its base is PR #206's older HEAD dae8b3f37eaf2c3f066a84050e28e16d265af1ce, while current PR #206 is at df0c26e7fb14b170b4f7cd80da570ce031480720; GitHub reports mergeable=false.
- PR #215's own exact-head Validation [44898489771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489771), CodeQL [44898489791](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489791), and Dependency Review [44898489815](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489815) are terminal SUCCESS on its own SHA. Its green checks do not fix the stale base; no automatic rebase or merge.

### Issue #64 and current-main SSRF remediation

- Issue #64 remains OPEN with 91 comments. Current-main successor PR #200 is OPEN/DRAFT at exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a, based on main e12d6daca4cdb19c7c4bd0b0a1610e96e851b266.
- PR #200 exact-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Recorded backend evidence: 539 tests, 27 production-readiness checks, 78 security/privacy checks, and pip-audit “No known vulnerabilities found”. Its frontend runtime npm audit still reports 3 moderate minimatch vulnerabilities; the configured HIGH threshold passing is not evidence of zero frontend vulnerabilities.
- PR #200 has zero formal reviews and zero inline review threads. The approval on legacy PR #99 does not transfer. Production SSRF acceptance remains BLOCKED until an independent security owner approves the exact #200 diff/configuration, every production NAT64/DNS64 prefix is inventoried, deployed USEIT_NAT64_PREFIXES matches that inventory, and staging plus production egress tests verify private/reserved/translated-private destinations are rejected while approved public destinations work.

### Main governance, repository inventory, and issues

- Repository visibility is public. Main HEAD is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. Protect main ruleset 26370589 is ACTIVE: six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion/non-fast-forward protection, and no bypass actors.
- Branch inventory is 173 branches (100 + 73; final page empty). GitHub Search reports 105 open PRs and eight open non-PR issues. GitHub Releases API returns zero published releases.
- Issue #47 is CLOSED with 11 comments. Issue #64 has 91 comments. Issue #74 has 338 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 249 comments. Issue #155 has 112 comments and remains OPEN.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected GitHub integration; they are unverified, not empty. Successful CodeQL/Dependency Review workflows do not establish zero alerts.
- Main still contains the older 2026-11-13 release records; the refreshed candidate records remain on the PR #217 child branch and are not merged into main.

### Canonical 25-point release register

The row-level candidate backlog contains exactly 25 numbered rows: 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
Main's existing register remains 3 Done / 15 In Progress / 7 Blocked. The candidate backlog remains 2 Done / 15 In Progress / 8 Blocked; rows #10 and #24 now cite the current PR #217 child HEAD and its own failed exact-head Validation rather than the superseded a7a2033 evidence.
- #2 remains Blocked pending the owner's durable repository-visibility and release-plan decision. Issue #47 verifies branch protection; it does not record that separate final decision.
- #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play Integrity on a physical Android installed from Play. #16 requires witnessed production backup/restore. #18 requires a representative product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

---

## Current release evidence checkpoint — 2026-11-21 19:41 CET

Captured at 18:41 UTC from live GitHub API evidence before this documentation refresh. This checkpoint is a pre-update snapshot on the PR #218 child branch. The commit that appends it must pass its own exact-head Validation, CodeQL, and Dependency Review; no earlier result is attributed to that new commit. Main is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged release-blocker baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Live PR metadata and the source branch ref report exact HEAD 68b380e73ca3c870048035197beef8febbf90ef1; merge commit f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. The merged PR contains 517 commits, 100 changed files, 11,887 additions, and 2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS on this exact SHA. Validation frontend, backend, and iOS jobs passed; CodeQL Analyze and Dependency Review passed (five jobs total).
- Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch), 22/22 inline threads resolved (20 outdated), and 109 combined timeline records.
- The PR description remains stale: it still describes PR #41 as open/unmerged and cites obsolete exact HEAD b46c5b8082ecbebd263a86cd53b1321a86e570d1. Live metadata and the branch ref are authoritative.
- Three historical queued runs remain QUEUED with zero jobs on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1: Validation [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), CodeQL [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and Dependency Review [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255). These are historical queues, not current-head checks; each has zero jobs. A repository administrator must cancel them.

### PR #206 — clean-main documentation parent

- PR #206 is OPEN/DRAFT at exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720, on fix/release-evidence-checkpoint-assertion-20261120-run11, targeting main at e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. It has 24 commits and four changed files.
- Exact-head Validation [44918462263](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462263) is terminal FAILURE; CodeQL [44918462197](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462197) and Dependency Review [44918462179](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44918462179) are terminal SUCCESS on the same SHA.
- Validation jobs: frontend FAILED, backend SUCCESS, iOS SUCCESS. The frontend suite reported 334 tests passed and 2 failed across 71/72 files. Both failures are release-evidence assertion mismatches in scripts/release-evidence-checkpoint.test.mjs, not demonstrated application runtime defects.
- PR #206 has one automated Dependency Review comment, zero formal human reviews, and zero inline review threads; tarlaci1984-sketch is requested. Its description is stale and does not reflect the latest exact-head history.

### PR #217 — stacked wording-correction parent

- PR #217 is OPEN/DRAFT at exact HEAD 1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a, on fix/release-evidence-wording-assertion-20261121-run11-child, based on PR #206 exact HEAD df0c26e7fb14b170b4f7cd80da570ce031480720. It has four commits and four changed files.
- Exact-head Validation [44930055117](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055117) is terminal FAILURE; CodeQL [44930055149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055149) and Dependency Review [44930055266](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44930055266) are terminal SUCCESS on that same SHA.
- Validation jobs: frontend FAILED, backend SUCCESS, iOS SUCCESS. Frontend reported 336 tests passed and 1 failed across 71/72 files. The sole failure is in scripts/release-evidence-checkpoint.test.mjs at the assertion expecting the exact phrase PR #217 description is stale. The checkpoint says Its PR description is stale. This is a documentation/test literal mismatch; no application runtime defect is demonstrated.
- PR #217 description is stale: it still says PR #206 Validation is in progress, while parent Validation run 44918462263 is terminal FAILURE. PR #217 has one automated Dependency Review comment, zero formal reviews, and zero inline review threads; no human reviewer is currently requested.

### PR #218 — exact-head wording correction

- PR #218 is OPEN/DRAFT at exact HEAD 8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776, on fix/release-evidence-pr217-description-assertion-20261121-run11-child, based on PR #217 exact HEAD 1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a. It has one commit and three changed files.
- Its exact-head Validation [44933475924](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44933475924), CodeQL [44933476051](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44933476051), and Dependency Review [44933475916](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44933475916) are terminal SUCCESS on 8698b2d. Frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed.
- The one-commit child changes only the exact PR #217 stale-description phrase in the three release records. It does not modify tests, application runtime code, dependencies, security checks, audit thresholds, or acceptance states.
- PR #218 has one automated Dependency Review comment, zero formal reviews, zero inline review threads, and no human reviewer requested. This 19:41 evidence-refresh commit is a new logical commit on the same branch; its own exact-head CI is a separate gate. After this commit, the PR #218 description's one-commit summary will be stale and must be reconciled only after the new checks are terminal.

### PR #215 — separate stale candidate

- PR #215 remains OPEN/DRAFT at exact HEAD 061bd79a581f5c98385bab58dc9d355ece2f3fce. Its base branch fix/release-evidence-checkpoint-assertion-20261120-run11 is at dae8b3f37eaf2c3f066a84050e28e16d265af1ce; GitHub reports mergeable=false.
- Its own exact-head Validation [44898489771](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489771), CodeQL [44898489791](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489791), and Dependency Review [44898489815](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44898489815) are terminal SUCCESS on its own SHA. These results do not fix its stale base; no automatic rebase or merge.

### Issue #64 — DNS-rebinding SSRF and current-main successor

- Issue #64 remains OPEN with 93 comments. Current-main remediation PR #200 is OPEN/DRAFT at exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a, based on main e12d6daca4cdb19c7c4bd0b0a1610e96e851b266.
- PR #200 exact-head Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) are terminal SUCCESS. Recorded backend evidence: 539 tests, 27 readiness checks, 78 security/privacy checks, and pip-audit reports No known vulnerabilities found. The frontend runtime audit separately reports 3 moderate minimatch findings; the configured high-severity threshold passing is not evidence of zero frontend vulnerabilities.
- PR #200 has zero formal reviews and zero inline review threads; tarlaci1984-sketch is requested. The approval on legacy PR #99 does not transfer.
- Production SSRF acceptance remains BLOCKED until an independent security owner approves the exact #200 diff/configuration, every production NAT64/DNS64 prefix is inventoried, deployed USEIT_NAT64_PREFIXES matches that inventory, and staging plus production egress tests verify private/reserved/translated-private destinations are rejected while approved public destinations work.

### Issues, main governance, and repository inventory

- Issue #47 is CLOSED with 11 comments. Main reports protected=true. Protect main ruleset 26370589 is ACTIVE and requires six strict checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approving review, stale-review dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, and no bypass actors.
- Main exact HEAD is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. Repository visibility is public.
- Branch inventory is 174 branches (100 + 74; page 3 empty). GitHub Search reports 106 open PRs and eight open non-PR issues. The Releases API returns an empty array: zero published releases.
- Issue #74 has 342 comments and remains a separate 64-item development checklist: 41 checked and 23 open. Issue #149 has 255 comments. Issue #155 has 114 comments and remains OPEN; the picomatch advisory withdrawal is not a patched npm release, runtime reachability review remains incomplete, and the third-party fork remains unapproved.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration; they are unverified, not empty. Successful CodeQL and Dependency Review workflows are not alert-inventory queries.
- Main's three release records remain on their older 2026-11-13 checkpoint. The refreshed candidate records remain on this PR #218 child branch and are not merged into main.

### Canonical 25-point release register

- The candidate backlog contains exactly 25 numbered rows: 2 Done / 15 In Progress / 8 Blocked. Done: #1, #6. In Progress: #3, #7–#15, #17, #19, #20, #23, #24. Blocked: #2, #4, #5, #16, #18, #21, #22, #25.
- Main's existing register remains 3 Done / 15 In Progress / 7 Blocked. The candidate register remains 2 Done / 15 In Progress / 8 Blocked; rows #10 and #24 cite the last fully validated PR #218 HEAD 8698b2d and its own 3/3 exact-head checks. The new evidence-refresh commit has a separate pending exact-head CI gate.
- #2 remains Blocked pending the owner's durable repository-visibility and release-plan decision. Issue #47 verifies branch protection; it does not record that separate final decision.
- #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play Integrity on a physical Android installed from Play. #16 requires witnessed production backup/restore. #18 requires a representative product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

---

## Current release evidence checkpoint — 2026-11-21 21:02 CET

Captured at 20:02 UTC from fresh GitHub API reads, before this documentation-only correction. The pre-write PR #219 HEAD is `5b152f27c5a44ac16a81af77e92ecfa50dd44f33`, parent `e638a5714481afbb08adc54877131d7152e5ab24`. This update corrects the checkpoint-section parser and reconciles the three release records with the same current evidence. No prior run is attributed to the new commit, and this checkpoint does not grant production or pilot acceptance.

### Repository, main protection, and canonical registers

- Main HEAD: `e12d6daca4cdb19c7c4bd0b0a1610e96e851b266`.
- Current paginated inventory: **175 branches (100 + 75; page 3 empty)**, **107 open PRs and five open non-PR issues** (#64, #74, #149, #155, #198), and **zero published releases**.
- Protect main ruleset 26370589 is ACTIVE and unchanged. It requires strict CodeQL, backend, frontend, ios, analyze, and dependency-review contexts; one approving review; last-push approval; resolved review threads; deletion/non-fast-forward protection; and zero bypass actors.
- The release-critical review census was refreshed per PR: #41 has 26 formal submissions (25 COMMENTED, one human APPROVED by tarlaci1984-sketch) and 22/22 resolved inline threads; #85 has 16 COMMENTED submissions, 9/9 resolved threads, and zero human approvals; #99 has five submissions (four COMMENTED, one APPROVED) and 2/2 resolved threads. #200, #201, #203, #206, #215, #217, #218, #219, #163–#172 each have zero formal reviews and zero inline threads except where separately stated below. Aggregate counts are not substituted for per-PR approval.
- Issue #74 has 344 comments at capture time and remains a separate 64-item development checklist: 41 checked and 23 open. No checkbox changed. The candidate backlog contains exactly 25 numbered rows: **2 Done / 15 In Progress / 8 Blocked**. Main's existing register remains **3 Done / 15 In Progress / 7 Blocked**. These are separate registers.
- Issue #149 has 261 comments at capture time; Issue #64 remains OPEN with 93 comments at capture time; Issue #155 has 115 comments at capture time; Issue #47 is CLOSED with 11 comments at capture time.
- Code Scanning, Dependabot, and Secret Scanning alert inventories are unavailable through the connected integration; they are **unverified, not empty**. Successful CodeQL/Dependency Review runs are not alert-inventory queries.
- The current main SHA has no queued/running workflow run. Its API run inventory contains terminal CI auto-recovery success/skipped runs; these are not substitutes for the six required PR merge contexts.

### PR #41, #65, #67, #68, and #69 baseline

- PR #41 is CLOSED/MERGED at exact source HEAD `68b380e73ca3c870048035197beef8febbf90ef1`, merge commit `f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1`. Validation #43492153234, CodeQL #43492153161, and Dependency Review #43492153021 succeeded on that exact head. It has 26 formal submissions (25 COMMENTED and one human APPROVED by tarlaci1984-sketch) and 22/22 inline threads resolved.
- The two Redis P2 runbook corrections are present on main: production always requires shared Redis, including single-instance production; memory mode is local/test only. The shared Redis client uses 2-second connect and 5-second socket timeouts and readiness must not close it; the temporary fallback client uses 2-second connect/socket timeouts and is closed after ping. These Redis-specific clauses are byte-identical between PR #65's head and main. Three historical queued runs remain QUEUED with zero jobs on obsolete SHA `b46c5b8082ecbebd263a86cd53b1321a86e570d1`: #43098210284, #43098210473, #43098210255. They are not current main checks; repository-admin cancellation is still required.
- PR #65 remains CLOSED/unmerged. Its package.json blob `d91e6ff791d5c80a14fe056f7c19662ebf73bc9d` and package-lock.json blob `2bccc4107db8e2b4ac638215328677761d34374a` are byte-identical to main. The entire RELEASE_RUNBOOK.md and workflow files are not byte-identical; only the Redis operational clauses match. Do not state that #65 itself merged.
- PR #67 remains CLOSED/unmerged with historical Validation failure. Its mainline successor PR #96 is OPEN at exact head `e06a3c3513244289169b705fa7b1e9ee381945e0`; Validation #43800887062, CodeQL #43800886964, and Dependency Review #43800887028 succeeded. The frontend job passed 290 tests and its runtime audit reported 3 moderate minimatch findings. #96 has two COMMENTED submissions, one resolved inline thread, and tarlaci1984-sketch requested; there is no human approval.
- PR #68 remains CLOSED/unmerged. Its exact head `a4324896a95aca621885ba89daa44f96bdcb636f` passed Validation #43436750104, CodeQL #43436750094, and Dependency Review #43436750108. The backend log installed cryptography **50.0.2** and pip-audit ended **No known vulnerabilities found**. This backend result is separate from frontend npm audit findings.
- PR #69 remains CLOSED/unmerged and its original Validation is not green. At exact head `a84fdf39792da4ce6c663d88b976861fa3c968be`, Validation #43432490009 failed, CodeQL #43432489904 and Dependency Review #43432489915 succeeded. Backend pytest failed on EC X-coordinate integer `len()` TypeError and unsupported `AttestationEvidence(key_id=...)`; pip-audit did not run after pytest failed. Its frontend runtime npm audit separately reported 18 findings (1 low, 8 moderate, 8 high, 1 critical). Do not conflate these.
- PR #116 is OPEN/DRAFT at exact head `27fafece2783b11677bdd90e896a1c0e8551aa86`; Validation #43938664477, CodeQL #43938664451, and Dependency Review #43938664475 succeeded. Its Node 22 Android/iOS prebuild, native release, and emulator/simulator smoke steps passed; frontend reported 290 tests and 3 moderate minimatch findings. The CommonJS config plugin `modules/useit-app-attest/app.plugin.js` is separate from runtime `index.ts`; app.json references the plugin and expo-module.config.json supplies iOS autolinking. #116 does not make original PR #69 green.
- Current-main successor PR #203 is OPEN/DRAFT at exact head `a006fdb882bfb6989487e3faea77db23f183839f`; Validation #44744190838, CodeQL #44744190840, and Dependency Review #44744190839 all succeeded. Frontend passed 327 tests and Expo Doctor 21/21; Android and iOS prebuild, native release builds, and emulator/simulator smoke passed. Its runtime npm audit still reports 3 moderate minimatch findings. It has zero formal reviews and zero inline threads; tarlaci1984-sketch is requested.
- PR #96 and #116 target main but are not used to claim a current-main replacement of their historical source PRs; #203 is the current-main Node 22 successor.

### PR #64 / SSRF and current mainline security work

- PR #99 is OPEN/DRAFT at exact head `f91c70d2636948e538f8e3559afc39cd93eb5139`; Validation #43772791089, CodeQL #43772791064, and Dependency Review #43772791109 all succeeded. It has five formal submissions (four COMMENTED, one APPROVED) and 2/2 resolved inline threads. The approval is not independent production security acceptance.
- PR #200 is the current-main SSRF successor at exact head `fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a`. PR #200 exact-head Validation #44735858583, CodeQL #44735858347, and Dependency Review #44735858455 all succeeded. Backend job passed 539 tests, 27 readiness checks, 78 production-security checks, installed cryptography 50.0.2, and pip-audit reported No known vulnerabilities found. Frontend runtime npm audit reports 3 moderate minimatch findings; this is not evidence of zero frontend vulnerabilities. PR #200 has zero formal reviews and zero inline review threads; tarlaci1984-sketch remains requested.
- The HTTPX/httpcore integration test uses a real local TCP/TLS server and checks pinned peer, original Host, and TLS SNI. Production SSRF acceptance remains BLOCKED pending independent security-owner approval, complete production NAT64/DNS64 prefix inventory, verified deployed `USEIT_NAT64_PREFIXES`, and staging/production egress evidence. Issue #64 remains OPEN.

### Release evidence PR chain

- PR #206 is OPEN/DRAFT at exact HEAD `df0c26e7fb14b170b4f7cd80da570ce031480720`, 24 commits and four changed files. Validation #44918462263 failed in frontend Unit tests (334 tests passed and 2 failed across 71/72 files); backend and iOS passed. CodeQL #44918462197 and Dependency Review #44918462179 passed. These are two failed assertions in the release-evidence test, not demonstrated application runtime defects. It has zero formal human reviews and zero inline review threads; tarlaci1984-sketch is requested.
- PR #217 is OPEN/DRAFT at exact HEAD `1ccbcd00ed02d2bad68bfc6bc3aaf2cb6c97845a`. Validation #44930055117 failed one frontend wording assertion (336 tests passed and 1 failed across 71/72 files); backend and iOS passed. CodeQL #44930055149 and Dependency Review #44930055266 succeeded. PR #217 description is stale: it still describes parent PR #206 Validation as in progress although that run is terminal failure. It has zero formal reviews and zero inline threads.
- PR #218 previously validated HEAD `8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776` had Validation #44933475924, CodeQL #44933476051, and Dependency Review #44933475916 all SUCCESS; frontend, backend, iOS, CodeQL Analyze, and Dependency Review jobs all passed. That is historical evidence for the prior SHA only.
- PR #218 current exact HEAD `e638a5714481afbb08adc54877131d7152e5ab24` is OPEN/DRAFT. Validation #44937218893 is terminal FAILURE: frontend job 136953842120 FAILED at Unit tests (334 frontend tests passed, 3 failed; 71/72 files), backend job 136953844090 SUCCESS, and iOS job 136953844817 SUCCESS. CodeQL #44937218873 and Dependency Review #44937218887 succeeded. PR #218 has zero formal reviews and zero inline threads. The failures are release-evidence documentation assertions, not a demonstrated application runtime defect.
- PR #219 is OPEN/DRAFT at exact HEAD `5b152f27c5a44ac16a81af77e92ecfa50dd44f33`, based on PR #218's exact HEAD `e638a5714481afbb08adc54877131d7152e5ab24`. Validation #44939390294 is terminal FAILURE: frontend job 136958490630 FAILED at Unit tests, backend job 136958534132 SUCCESS, and iOS job 136958492139 SUCCESS. CodeQL #44939390283 and Dependency Review #44939390318 succeeded. PR #219 has zero formal reviews and zero inline threads. The failed assertions identify a real test-harness boundary defect: the parser stopped at the first horizontal rule inside the checkpoint, so later evidence was excluded; the checkpoint also lacked the current PR #215 and #200 exact-head wording and used stale issue-comment counts. The correction below uses the final checkpoint separator and refreshes the evidence without dropping assertions. This new logical commit is a separate child-branch update; its own exact-head CI is a separate gate.
- PR #215 remains OPEN/DRAFT at exact HEAD `061bd79a581f5c98385bab58dc9d355ece2f3fce`, based on `fix/release-evidence-checkpoint-assertion-20261120-run11`, with mergeable=false. Validation #44898489771, CodeQL #44898489791, and Dependency Review #44898489815 all succeeded; frontend, backend, and iOS jobs all passed. It has zero formal reviews and zero inline review threads and is not a mainline release candidate.
- PR #85 current exact head is `ea1bf815d90d91026b24c46ec1869b8218211d80`, not the older f2c2... checkpoint. Validation #44645305669 failed at a frontend Unit-test assertion; backend and iOS passed, and runtime npm audit was skipped. CodeQL #44645305765 and Dependency Review #44645306118 succeeded. It has 16 COMMENTED submissions, 9/9 resolved inline threads, and zero human approvals. The backend job passed 450 tests, 27 readiness checks, and 78 production-security checks; cryptography 50.0.2 and pip-audit clean.
- PRs #163–#166 and #168–#169 have historical exact-head Validation failures at frontend Unit-test/assertion steps; their CodeQL and Dependency Review runs passed. Exact Validation run IDs: #44241274884, #44253605974, #44253962999, #44254136344, #44272119611, #44272942930. Each has zero formal reviews and zero inline threads. These are not npm audit failures.
- PR #167 exact-head Validation #44255156916 and PR #170 exact-head Validation #44273476324 failed at the runtime dependency audit step, with 28 findings (2 moderate, 26 high) on those 2026-11-18 snapshots. Their frontend test suites passed before the audit step; backend and iOS jobs passed. These are historical audit snapshots, not current picomatch HIGH findings.
- PR #171 exact head `cd3cd0e01f8dab9c1ac8e47c923a05134857d47d`: Validation #44358862088, CodeQL #44358862249, and Dependency Review #44358862085 all SUCCESS. PR #172 exact head `5e0f0c000a3a3707e5565c32804e4d221a886caa`: Validation #44350568289, CodeQL #44350568525, and Dependency Review #44350568368 all SUCCESS. #171/#172 are sibling commits on identical tree `cf955182d98cae2e19f10c0e08f8e12621cb5242`; both have zero formal reviews and zero inline threads, with tarlaci1984-sketch requested. Their runtime npm audit shows 3 moderate minimatch findings and no picomatch finding. This is not code remediation and is not evidence of zero frontend vulnerabilities.
- Current-main PR #201 is OPEN/DRAFT at exact HEAD `776432e4e75327088034fa2f5448d96d7d71f068`; Validation #44735892822, CodeQL #44735893037, and Dependency Review #44735893258 all SUCCESS. Its targeted minimatch 11 migration tests pass 7/7, and `npm audit --omit=dev --audit-level=high` reports 0 vulnerabilities. This is runtime-only audit evidence, not a full development-dependency audit. PR #201 has zero formal reviews and zero inline threads; tarlaci1984-sketch is requested. It remains unmerged pending human review.
- Current-main PR #203 is the Node 22 Android/iOS successor described above. Its runtime npm audit still reports 3 moderate minimatch findings; the green HIGH-threshold gate does not mean zero findings.

### Picomatch / Issue #155 current status and reachability

- GitHub Advisory GHSA-fc5q-39xc-vjpf / CVE-2026-112366 is WITHDRAWN (2026-11-18); OSV records withdrawn timestamp 2026-11-18T15:38:56Z; Snyk says the JS advisory is revoked and does not affect any picomatch version. Do not call it an active GitHub-reviewed HIGH advisory. Official npm still shows picomatch **4.0.7** as latest; no 4.0.8 patched release is evidenced. The withdrawal is not an npm patch release.
- Upstream PRs #264/#265/#254/#257/#238/#246 remain OPEN/unmerged at exact heads `8144a1a22a8fa1766951411f220cc8c6228cb041`, `dda1c43a8e9cae36ffb0407127ee64e17fbc1c2c`, `c63a5bf4e61dbdb81bc41e97dc2616c30acce337`, `4e4892e0ac6c374ec3d9e4dc430101da9a20a37b`, `44f192261f312ddf236cb7bdc05d8f22663f98f9`, `f03bec2c02e46f063fbfdc161aae1d0f854b2565`. #264 Tests run #44202778983, #254 Tests #44148748026, #257 Tests #44170126549, #265 Tests #44202787490 and CodeQL #44202787411, and #246 Tests #41234593564 and CodeQL #41234593582 all ended action_required with no executed jobs. #238 Tests run #39833229778 is FAILURE; the connected job listing returned zero jobs, so no successful test log is claimed. #257 has one APPROVED review; #238 has six submissions (three APPROVED, three COMMENTED); no inline threads were returned. #235 remains CLOSED/unmerged; the maintainer disputes the CVE and advises not to let untrusted users define glob patterns.
- The exact six required patterns are `+(*)`, `*(*)`, `+(a*)`, `+(*a)`, `*(a*|b)`, and `+(ab|abab)`. #238 contains only the first, third, and fourth; it does not contain `*(*)`, `*(a*|b)`, or `+(ab|abab)`. #264/#265 contain the first five but not `+(ab|abab)`; #254/#246 contain three of six; #257 contains only `+(*a)`. No complete six-pattern upstream test set is established.
- Current package-lock resolves picomatch 4.0.7 transitively under @expo/metro-config, Expo CLI and tinyglobby, plus dev-only Vite/Vitest copies; a separate picomatch 2.3.2 exists under micromatch/jest-util paths. No direct picomatch dependency exists in package.json. Reviewed app entry points and product-catalog code accept natural-language product query text, not glob patterns; no first-party picomatch import or user-defined glob-pattern path was found. GitHub code search is incomplete, so this is reachability evidence, not proof of runtime absence or remediation.
- The secured fork `ryotsu-kankichi/secured-picomatch` still has master `3ab5a7627d480259e3d9ca67fbc14c125d374f0e`; PR #1 is merged at release commit `f9822e9514d490f3e3bc17f50a4d3cacff2056c2`. The repository is public, default branch master, with master and 4.0.7.a refs. PR #1 has no independent review/thread evidence. Master protection and npm registry provenance/integrity are not verified by the available read path; the earlier CI #40650811785 22/22 success is historical evidence only. The patch changes capture-group semantics and `maxExtglobRecursion:false` disables the safeguard. Do not import, pin, or override it.

### Canonical release register and external acceptance

- The candidate backlog contains exactly 25 numbered rows: **2 Done / 15 In Progress / 8 Blocked**. Done: #1, #6. Blocked: #2, #4, #5, #16, #18, #21, #22, #25. Main's existing register remains **3 Done / 15 In Progress / 7 Blocked**. Rows #10 and #24 continue to cite the last fully validated PR #218 HEAD `8698b2d6bf7757b5b1ca7617dfd6eac1b14b7776`; the current #218 `e638a5714481afbb08adc54877131d7152e5ab24` and #219 `5b152f27c5a44ac16a81af77e92ecfa50dd44f33` heads failed frontend evidence assertions and have not replaced that validated baseline.
- #2 remains Blocked pending the owner's durable repository-visibility and release-plan decision. #4 requires production Apple App Attest entitlement and physical-iPhone verification. #5 requires Play Integrity on a physical Android installed from Play. #16 requires witnessed production backup/restore. #18 requires a representative product-recognition benchmark and business acceptance. #21 requires production monitoring and witnessed alert delivery. #22 requires approved staged rollout and tested rollback. #25 requires a real-user pilot and explicit business sign-off.
- No physical-device, production-cloud, backup/restore, monitoring, rollout, or business-acceptance item is promoted by CI, simulator, or emulator evidence.

**Release decision: NOT READY. PRODUCTION/PILOT ACCEPTANCE: NOT GRANTED.** No published release exists. Human review, production security evidence, external provider setup, physical-device validation, monitoring, witnessed backup/restore, staged rollout, and business pilot approval remain outstanding.

---

---
