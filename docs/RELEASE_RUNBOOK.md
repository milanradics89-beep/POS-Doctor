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
