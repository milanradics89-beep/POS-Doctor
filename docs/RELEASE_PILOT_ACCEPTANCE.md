## Current release evidence checkpoint — 2026-11-20 21:13 CET

This checkpoint supersedes the 17:18 CET branch checkpoint and the 2026-11-13 main-branch checkpoint. Evidence was refreshed at 20:13 UTC. Current main is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266. PR #204 exact HEAD 7dbc4110b25ab3a879f8711f005d7876b1fbb74e has its own terminal-success Validation, CodeQL and Dependency Review; no parent-run result is transferred. This checkpoint does not grant production or pilot acceptance.

### PR #41 — merged baseline

- PR #41 is CLOSED/MERGED on fix/release-blockers-2026-10. Its live branch ref and PR head both equal 68b380e73ca3c870048035197beef8febbf90ef1. Merge commit: f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1. It contains 517 commits, 100 changed files, +11,887 additions and -2,005 deletions.
- Exact-head Validation [43492153234](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153234), CodeQL [43492153161](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153161), and Dependency Review [43492153021](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43492153021) are terminal SUCCESS. Job inventory: frontend, backend, iOS, CodeQL analyze and Dependency Review all succeeded. Review inventory: 53 conversation comments, 30 inline review comments, 26 formal submissions (25 COMMENTED, 1 human APPROVED), 22/22 inline threads resolved, 0 unresolved, 109 combined timeline records.
- Historical runs [43098210284](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210284), [43098210473](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210473), and [43098210255](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/43098210255) remain QUEUED on obsolete SHA b46c5b8082ecbebd263a86cd53b1321a86e570d1; each has zero jobs. They are historical queues, not successful or failed current-head checks. Administrator cancellation is required.

### Main governance

- Repository visibility is public; main HEAD is e12d6daca4cdb19c7c4bd0b0a1610e96e851b266 and the branch API reports protected: true.
- Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces six strict required checks (CodeQL, backend, frontend, ios, analyze, dependency-review), one approval, stale-approval dismissal, last-push approval, resolved review threads, deletion and non-fast-forward protection, with no bypass actors.

### Current-main remediation candidates

- **PR #193:** exact HEAD c1250400f5c6022483c967c8b79a42be0dc614fd; Validation [44743155619](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155619), CodeQL [44743155647](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155647), and Dependency Review [44743155582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44743155582) all SUCCESS. It is stacked on base 0b991f23856962a5164e63f864e3578130fee6ca, not directly on main. Its frontend audit still reports 3 moderate minimatch findings.
- **PR #200:** exact HEAD fd0424f1f1ba1b8aabefc3c5dabae6df59a3f67a; Validation [44735858583](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858583), CodeQL [44735858347](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858347), and Dependency Review [44735858455](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735858455) all SUCCESS. DNS-pinned outbound transport validates DNS answers and redirect hops, pins numeric-IP connections, verifies the connected peer, preserves Host/TLS SNI, and disables inherited proxies. Production DNS64/NAT64 prefix inventory, deployed USEIT_NAT64_PREFIXES verification and staging/production egress remain outstanding; independent security-owner approval is still required.
- **PR #201:** exact HEAD 776432e4e75327088034fa2f5448d96d7d71f068; Validation [44735892822](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735892822), CodeQL [44735893037](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893037), and Dependency Review [44735893258](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735893258) all SUCCESS. Its exact-head frontend npm audit explicitly reports found 0 vulnerabilities after the minimatch 11.0.5 override and lockfile update. This candidate remains unmerged and awaits human review.
- **PR #202:** exact HEAD 67eafbebd5f45724f2c97430fee4bc1a6d153746; Validation [44735931701](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931701), CodeQL [44735931794](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931794), and Dependency Review [44735931634](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44735931634) all SUCCESS. CodeQL init and analyze use the same immutable v4.39.4 revision.
- **PR #203:** exact HEAD a006fdb882bfb6989487e3faea77db23f183839f; Validation [44744190838](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190838), CodeQL [44744190840](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190840), and Dependency Review [44744190839](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44744190839) all SUCCESS. Its test-only change asserts Node 22 for Android and iOS native prebuild.
- **PR #204:** OPEN/DRAFT, 6 commits, 4 changed files, 6 commits ahead / 0 behind main. Exact HEAD 7dbc4110b25ab3a879f8711f005d7876b1fbb74e. Exact-head Validation [44794452919](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452919), CodeQL [44794452874](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452874), and Dependency Review [44794452833](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44794452833) are terminal SUCCESS. Validation backend, frontend and iOS jobs all passed. Frontend evidence: 72 test files passed; TypeScript, Expo Doctor, Android export, native Android Release, emulator smoke and runtime dependency audit steps succeeded. The frontend npm audit still reports 3 moderate severity vulnerabilities; do not describe it as zero. Backend evidence: 450 pytest passed (1 warning), 78 production-security checks passed, and pip-audit reported No known vulnerabilities found. Native iOS Release and simulator smoke passed. CodeQL Analyze and Dependency Review jobs passed on this exact SHA.
- PR #204 review inventory: 2 conversation comments, 0 inline review threads, 0 formal review submissions and 0 human approvals. One human status comment still references the older 62c3bf1 SHA and should be reconciled with the current exact-head success; reviewer tarlaci1984-sketch is requested. The Dependency Review bot comment says Scanned Files: None because no dependency manifest is in this PR diff; it is not a repository-wide dependency-alert inventory.

### Separate stacked documentation child

- **PR #205** is a separate OPEN/DRAFT child in the PR #85 documentation chain, not a current-main PR and not part of PR #204. Exact HEAD 9f275e853429de173975f87bf1bd3ea476e7b9ce; base ea1bf815d90d91026b24c46ec1869b8218211d80; 1 commit, 3 files, +3/-3. Exact-head Validation [44799071611](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071611), CodeQL [44799071582](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071582), and Dependency Review [44799071704](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/44799071704) all SUCCESS. It touches the same release records in a separate stack; reconcile overlapping documentation changes before integration. Its Dependency Review bot reports Scanned Files: None.

### Issues #47, #64 and #155

- Issue #47 is CLOSED with 11 comments. Current main branch protection is verified through branch metadata and active ruleset 26370589.
- Issue #64 remains OPEN with 82 comments. PR #200 is the current-main DNS-rebinding/SSRF successor. Older PR #99 remains based on f03d2390f5ee8a6c549e2466c2c1a5844e08fbc1, 17 commits ahead and 2 behind current main; its empty-body human approval is not explicit independent security sign-off. Production DNS64/NAT64 prefix inventory, deployed USEIT_NAT64_PREFIXES verification, and staging/production egress evidence remain missing.
- Issue #155 remains OPEN with 89 comments. The picomatch advisory was withdrawn, but six lockfile entries were identified and repository-wide runtime-call reachability assessment remains incomplete. Advisory withdrawal is not proof of remediation.

### Repository inventory and security alerts

- Paginated branches: 161 (100 + 61 + 0). Open pull requests: 97. Open non-PR issues: 8. published GitHub releases 0.
- Main release records remain stale at the 2026-11-13 checkpoint: RELEASE_RUNBOOK.md blob b7b848743edf8fb8c238ef3367b0e74b64e6d540; RELEASE_PILOT_ACCEPTANCE.md blob f6bd4f041f802d0286b209769621079e517bd3a1; 25-POINT-RELEASE-BACKLOG.md blob 891ec704b18bb1a59c9598b9fe2aedd0a9df9dae. This PR branch carries the synchronized current checkpoint; main has not been modified.
- Code Scanning, Dependabot and Secret Scanning alert inventories are unavailable through the connected GitHub integration: unverified, not empty. Do not infer an empty alert inventory from successful CI or Dependency Review.

### Canonical 25-point release register

- **2 Done:** #1, #6.
- **15 In Progress:** #3, #7–#15, #17, #19, #20, #23, #24.
- **8 Blocked:** #2, #4, #5, #16, #18, #21, #22, #25.
- Item #2 remains Blocked pending the owner's durable repository-visibility/release-plan decision, even though Issue #47 separately verifies active main protection. External blockers remain: #4 production Apple App Attest on a physical iPhone; #5 Play Integrity on Play-installed physical Android; #16 witnessed production backup/restore; #18 representative product-recognition benchmark and business acceptance; #21 production monitoring and verified alert delivery; #22 approved staged rollout and tested rollback; #25 real-user pilot and business sign-off.

Production/pilot acceptance is NOT GRANTED. This checkpoint does not grant production or pilot acceptance. Physical-device tests, external console setup, production cloud access, witnessed backup/restore, staged rollout approvals and real-user/business approval remain Blocked until direct evidence exists.

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
