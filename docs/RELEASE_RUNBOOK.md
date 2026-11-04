# USEIT release and production runbook

This runbook is the release gate for the USEIT mobile app and backend. A green unit-test run alone is not a production approval.

### Current PR #41 checkpoint (2026-11-04 19:14 CET; automated CI only, not release approval)

PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`, targeting `main` at `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The exact source/test HEAD at this evidence capture is [`b4fd973c26504eacc34a7802600b3ba7057ec213`](https://github.com/milanradics89-beep/POS-Doctor/commit/b4fd973c26504eacc34a7802600b3ba7057ec213).

All three required workflows completed successfully for this exact SHA:
- [Validation 41879055184](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184): backend [126746469896](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469896), frontend/Android [126746470124](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746470124), and iOS [126746469773](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055184/job/126746469773) all succeeded.
- [CodeQL 41879055302](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302), analyze [126746469861](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055302/job/126746469861), succeeded.
- [Dependency Review 41879055228](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228), job [126746469147](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41879055228/job/126746469147), succeeded.

The iOS Release simulator build and install/launch smoke test passed on the exact HEAD, so backlog item #1 is now Done. This does not satisfy physical-device App Attest acceptance (#4). Issue [#53](https://github.com/milanradics89-beep/POS-Doctor/issues/53) was closed as completed after this exact-head Validation passed.

The backlog is **3 Done / 15 In Progress / 7 Blocked**. Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed; active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) enforces strict required checks, PR/approval rules, resolved threads, deletion/non-fast-forward protection, and no bypass actors. All 11 inline PR #41 review threads are resolved; 15 review submissions are recorded and none is APPROVED. One human approval and last-push approval remain required.

Dependency Review reports zero vulnerable packages, zero incompatible licenses, and zero invalid SPDX definitions, but one unknown-license package and two low OpenSSF Scorecard results remain. Runtime npm audit still reports 11 moderate transitive glob/minimatch advisories. GitHub Releases is empty. Complete Code Scanning, Dependabot, and Secret Scanning alert inventories are not exposed by the connected integration and remain **unverified**, not zero.

The evidence below is automated CI only. Production provider configuration, physical-device tests, approved staging load/restore drills, production monitoring and alert delivery, staged rollout, pilot/business approval, dependency-risk acceptance, and human PR approval remain open. The documentation-only commit created by this refresh is a new child of the validated source/test HEAD and must pass its own exact-HEAD Validation, CodeQL, and Dependency Review.

### Latest fully validated exact-head CI baseline (2026-11-04; PR #41 source/test HEAD: `b4fd973c26504eacc34a7802600b3ba7057ec213`; automated CI only, not production sign-off)

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
## 1. Required CI evidence

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

### Previous validated automated CI baseline (superseded by current exact-head evidence) (2026-11-03; exact validated SHA: `45ac420857dfce396e0668732e91ed7301fd126e`; at that earlier evidence capture, PR HEAD `98e47ff` had failed/incomplete Validation; superseded by validated SHA `34c5328`; not production sign-off)

PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`. Exact parent HEAD [`45ac420`](https://github.com/milanradics89-beep/POS-Doctor/commit/45ac420857dfce396e0668732e91ed7301fd126e) is a documentation-only release-evidence refresh; its parent [`daaede9`](https://github.com/milanradics89-beep/POS-Doctor/commit/daaede906f120241bf78b4d28d227f5b3e2857db) is also documentation-only. The latest application-source/test change remains [`531463f`](https://github.com/milanradics89-beep/POS-Doctor/commit/531463f3d116aad3b62e184fcd83e2ff88d168f2), which hardens credential-key privacy redaction and tests actual logger output. PR base and `main` HEAD are `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

All three required workflows completed successfully for exact parent HEAD `45ac420`:
- [Validation 41637571857](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857): backend [125922528423](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528423), frontend/Android [125922528813](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528813), and iOS [125922528824](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571857/job/125922528824) all succeeded.
- [CodeQL 41637571829](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571829), analyze job [125922529123](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571829/job/125922529123), succeeded.
- [Dependency Review 41637571753](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571753), job [125922527983](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41637571753/job/125922527983), succeeded.

Backend validation: 358 tests passed with one Starlette deprecation warning; production-readiness checks reported 24 passed with one warning; security checks reported 24 passed; backend dependency audit passed. Frontend typecheck, unit tests, Expo health, Android export, native Android Release build, emulator install/launch smoke test, and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build, and simulator smoke test passed. The runtime npm audit still reports 11 moderate transitive `glob`/`minimatch` findings; its configured high-severity threshold passed.

CodeQL succeeded; its log contains a non-fatal SARIF column-kind mismatch warning. Dependency Review reported 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 Scorecard warnings: `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The vendored `vendor/deepmerge@4.3.2` manifest and LICENSE declare MIT, while GitHub still reports unknown lockfile license metadata. No forced Expo downgrade or audit-threshold reduction was applied.

The latest application-source change in this evidence chain is `531463f`; `daaede9` and `45ac420` are documentation-only commits. The source/test commit [`98e47ff`](https://github.com/milanradics89-beep/POS-Doctor/commit/98e47ffd876b890c36f383ae8f24a31a48b1d33d) enforces Redis-backed shared rate limiting in production. Its exact-head [Validation 41644216597](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597) failed: backend job [125959862517](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959862517) failed on `test_production_allows_explicit_cors` because the shared `_production()` test helper did not set the newly required Redis rate-limit mode and URL; frontend job [125959865478](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959865478) passed; iOS job [125959863083](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216597/job/125959863083) failed because the simulator install/launch smoke-test step exceeded its 10-minute timeout after installation succeeded. Exact-head [CodeQL 41644216720](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216720), analyze job [125945163427](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216720/job/125945163427), and [Dependency Review 41644216711](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216711), job [125945162610](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41644216711/job/125945162610), passed. GitHub opened issue [#50](https://github.com/milanradics89-beep/POS-Doctor/issues/50) for the repeated Validation failure.

The backend failure is a stale test fixture, not a production policy failure: `_production()` omitted `USEIT_RATE_LIMIT_MODE=redis` and `USEIT_REDIS_URL`. The iOS job failed at the simulator launch smoke test after the installation step; the 10-minute timeout is recorded separately and is not being masked by increasing the timeout without further evidence. This update fixes the fixture and closes a separate readiness gap: production `/ready` must require Redis rate-limit mode and ping the shared Redis dependency regardless of whether App Attest is enabled. The child commit [`a68af8c`](https://github.com/milanradics89-beep/POS-Doctor/commit/a68af8c62947ba5fd550c8111c347d0206043581) has now passed its own exact-HEAD Validation, CodeQL, and Dependency Review workflows; see the current evidence section above. This is automated CI evidence only, not production approval.

Active main ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) remains verified; issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. The ruleset requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, pull requests, one approval, last-push approval, resolved review threads, no deletion/non-fast-forward updates, and no bypass actors. All 10 inline PR #41 review threads are resolved. No `APPROVED` review submission is recorded, so the human approval gate remains outstanding.

Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL action failure. PRs [#43](https://github.com/milanradics89-beep/POS-Doctor/pull/43) and [#44](https://github.com/milanradics89-beep/POS-Doctor/pull/44) are separate one-sided CodeQL updates and must not be merged independently; draft PR [#49](https://github.com/milanradics89-beep/POS-Doctor/pull/49) contains the atomic update. Design PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains draft. GitHub Releases is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

Physical-device iPhone App Attest, Play-installed Android Play Integrity, production provider secrets/configuration, approved staging load probe, witnessed backup/restore, production monitoring and alert delivery, staged rollout, pilot thresholds, moderate npm-audit risk acceptance, and human approval remain outstanding. Do not treat simulator/emulator or CI results as physical-device/production acceptance.

### Previous verified automated CI baseline (superseded by f0c937; exact PR HEAD: `40b79d4`; not production sign-off)

At evidence capture, PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`. The exact HEAD [`40b79d4`](https://github.com/milanradics89-beep/POS-Doctor/commit/40b79d41d304fb949e3576447487377672845455) passed Validation, CodeQL, and Dependency Review. This is a documentation-only commit whose parent is [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303); the latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). PR base and `main` HEAD were both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

Exact-head workflow evidence:
- [Validation 41552250326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326): backend [125642452241](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452241), frontend/Android [125642452698](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452698), and iOS [125642452623](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452623) all completed successfully. The backend suite reported 356 passed and one warning; production-readiness checks and backend dependency audit passed. Frontend typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build, and simulator install/launch passed.
- [CodeQL 41552250336](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336), analyze job [125642453074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336/job/125642453074), succeeded and uploaded SARIF. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 41552250325](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325), job [125642452207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325/job/125642452207), succeeded. It found no vulnerable packages at severity high or higher and no denied packages. It flagged unknown license metadata for `vendor/deepmerge@4.3.2`, plus OpenSSF Scorecard results below threshold 3 for `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The frontend runtime `npm audit --omit=dev --audit-level=high` passed its configured threshold but still reported 11 moderate advisories; no forced Expo downgrade or audit-threshold reduction was applied.

Source/review checks at this baseline: explicit-auth POST retry fixtures; effective Fetch `Request`/init header replacement and method handling; valid base64 image data in the vision-usage privacy test; sanitized error-boundary logging; Settings recovery for permanently denied camera/gallery permissions; and App Attest enrollment marking only after the server accepts the attestation. The pending App Attest evidence is persisted before network submission for same-evidence recovery.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active repository ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it also requires pull requests and one approval, dismisses stale approvals, requires last-push approval and resolved threads, blocks deletion/non-fast-forward updates, and has no bypass actors. The legacy branch-protection detail endpoint returned 403 to this integration in this run; the active ruleset itself was readable and verified.

PR #41 had nine inline review threads at capture: eight resolved and one open P2 thread about recording the new exact-head CI evidence. This evidence refresh corrects that record; keep the thread open until the updated documentation and its own CI/review are confirmed. No `APPROVED` review submission is recorded on PR #41, so the one-approval merge gate remains outstanding.

Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL failure on `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded, but the historical issue is not closed. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

This evidence is not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring and alert delivery, staged store rollout, pilot thresholds, the moderate npm-audit risk decision, and human approvals remain unverified. **This documentation-only evidence refresh is a new child of `40b79d4`; the run IDs above do not validate that new child. Its own Validation, CodeQL, and Dependency Review must complete before merge.**

### Earlier validated automated CI baseline (superseded by 40b79d4; exact PR HEAD `f79da96`)

PR #41 remains open, unmerged, and non-draft. Exact PR HEAD [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303) passed all three required automated workflows. The latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f); `f79da96` is documentation-only. The PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

All three required workflows completed successfully for exact PR HEAD `f79da966d0d6a257feebf37db05ad2cfe1ea6303`:

- [Validation 41541825237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237): backend [125607650851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650851), frontend/Android [125607650527](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650527), and iOS [125607650926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650926) all succeeded. Backend compilation, full tests, production-readiness checks, and dependency audit passed. Frontend source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export, native Release build, emulator install/launch smoke test, and runtime dependency audit completed successfully. iOS native project generation, CocoaPods installation, Release simulator build, and simulator install/launch smoke test passed.
- [CodeQL 41541825206](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206), analyze job [125607650491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206/job/125607650491), succeeded.
- [Dependency Review 41541825120](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120), job [125607649545](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120/job/125607649545), succeeded. The log reports no vulnerable packages at severity high or higher and no denied packages. It reports unknown license metadata for local `vendor/deepmerge@4.3.2` and two OpenSSF Scorecard warnings below the configured threshold of 3: `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The frontend `npm audit --omit=dev --audit-level=high` step exited successfully but still reported 11 moderate advisories; a passing high-severity threshold is not a clean dependency tree. No forced Expo downgrade or audit-threshold reduction was applied.

The eight inline PR #41 review threads are all resolved. The latest Codex code review for `f79da96` completed with no findings. Current source/test inspection confirms explicit-auth POST retry fixtures, effective `Request`/`init` headers and method handling, valid base64 privacy data, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest enrollment only after server acceptance with recovery evidence persisted before submission.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active repository ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets main and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it requires pull requests and one approval, dismisses stale approvals, requires last-push approval and resolved review threads, blocks deletion and non-fast-forward updates, and has no bypass actors. The main branch API reports `protected: true`. PR #41 has no APPROVED review submission, so its one-approval merge gate remains outstanding.

[Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL failure on commit `9616867170b299797a699929b2939b5571266307`; the current exact-head CodeQL run succeeded, but the historical issue is not closed. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

This is automated CI evidence, not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified. PR #41 remains open and unmerged.

### Previous exact-head CI baseline (historical; superseded)

PR #41 head: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14`.

- [Validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523): completed successfully. [Frontend job 124508582653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582653) passed the source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export, Android Release APK build, emulator install/launch smoke test, and the configured runtime dependency audit. [iOS job 124508582705](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582705) passed native project generation, CocoaPods installation, iOS Release simulator build, and simulator install/launch. [Backend job 124508582430](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582430) passed compilation, the full backend test suite with Redis 7.4, production-readiness checks, and backend dependency audit.
- [CodeQL run 41191342553](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342553) completed successfully and uploaded the combined JavaScript/Python SARIF results. The connected API did not expose the repository alert inventory for this run, so this record does not claim a zero-alert result.
- [Dependency Review run 41191342726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342726) completed successfully. Its log reports no vulnerable packages at severity high or higher and no denied packages. It reports one license-metadata warning for the local `vendor/deepmerge@4.3.2` link and two highlighted low OpenSSF Scorecard results: `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The vendored package manifest and LICENSE declare MIT; the lockfile link omits license metadata.
- The frontend `npm audit --omit=dev --audit-level=high` step passed its configured threshold, but the report still contains 11 **moderate** advisories in transitive `glob@13.0.6` and `minimatch@10.2.6` paths through Expo SDK 57 tooling. No high/critical npm-audit findings were reported. This is separate from Dependency Review's high-or-higher threshold. The suggested `npm audit fix --force` would downgrade Expo to `51.0.39`; it was not applied.
- Commit `78402c8` adds redaction for `prompt`, `userPrompt`, `user_prompt`, `userIntent`, and `user_intent` fields. Sentinel tests verify that user-intent and prompt values do not appear in structured logs; frontend and backend jobs passed on this exact head.
- The three historical inline review threads are resolved. The latest Codex review receipts in the conversation found no major issues on commits `123c0c4` and `0ae7517`; commit `78402c8` has not yet received a newer review receipt.

These results validate automated CI for this exact SHA only. They do not prove production secrets/provider configuration, hardware-backed attestation, production hosting, backups, monitoring delivery, store rollout, or pilot approval.


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
- The shared USEIT_REDIS_URL service also stores persistent challenge and attestation-key state. Redis challenge operations use a 2-second connection timeout and a 5-second socket timeout; the production readiness endpoint performs a Redis ping when attestation is required, using 2-second connection and socket timeouts and closing the probe client. Treat a failed readiness check as a release blocker. The in-memory challenge store is capped at 10,000 unexpired challenges and fails closed at capacity; it is for tests/local development only.
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

For multi-instance deployments, use USEIT_RATE_LIMIT_MODE=redis and a shared Redis instance. Memory-mode rate limiting is process-local and is suitable only for development or a single-instance deployment. Redis rate limiting uses one Lua operation with Redis server time, a sorted-set sliding 60-second window, atomic pruning/count/admission, and TTL assignment for the event and sequence keys. Redis connections use explicit 2-second connect and 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

## 3. Mobile release configuration

- [ ] Verify the bundle identifier/package name and app version.
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
