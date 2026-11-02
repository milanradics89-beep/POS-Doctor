# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest exact-head automated evidence (2026-11-02 09:44 CET; not a production sign-off)

PR #41 remains open and unmerged. Current head [`20aec8c2dbf5ba376103e18a32e0a07d1d1f35dd`](https://github.com/milanradics89-beep/POS-Doctor/commit/20aec8c2dbf5ba376103e18a32e0a07d1d1f35dd) has parent [`b9187adb51766c69f9173549351e32c1125a9a5a`](https://github.com/milanradics89-beep/POS-Doctor/commit/b9187adb51766c69f9173549351e32c1125a9a5a). Commit `20aec8c` hardens streaming request-body size enforcement by checking remaining capacity before copying a chunk into the request buffer. The existing targeted streaming-limit test and the full backend suite passed on this exact SHA.

- [Validation run 41407992109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992109): backend [125154301354](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992109/job/125154301354), frontend/Android [125154301651](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992109/job/125154301651), and iOS [125154301761](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992109/job/125154301761) all passed. Backend completed **354 tests**, plus production-readiness suites of **24** and **22** passing tests, using Redis 7.4.12 / redis-py 7.4.1. One Starlette/httpx TestClient deprecation warning and a non-fatal Redis runner-host `vm.overcommit_memory` warning were recorded. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL run 41407992170](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992170), analyze job [125154301569](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992170/job/125154301569), completed successfully and uploaded combined JavaScript/Python SARIF. The SARIF merge logged a column-kind mismatch warning; the workflow succeeded.
- [Dependency Review run 41407992130](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992130), job [125154301087](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992130/job/125154301087), completed successfully with zero vulnerable packages, zero incompatible licenses, and zero invalid SPDX definitions. Remaining warnings: unknown license metadata for `vendor/deepmerge@4.3.2`, and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- The frontend `npm audit --omit=dev --audit-level=high` step passed its configured threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. The dependency tree is not clean; no forced Expo downgrade or audit-threshold reduction was applied.
- Exact observed check names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. Android is included in `frontend`.
- All three inline PR #41 review threads are resolved (two outdated). Current source/tests verify explicit-auth POST retry fixtures, effective `Request`/`init` headers and method selection, valid base64 `vision_usage` fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, App Attest enrollment recovery, and Request-body replay after session refresh.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main` is unprotected, rulesets are empty, and branch-protection detail reads return HTTP 403 to the connected integration. A repository administrator must configure and verify the `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for exact PR head `20aec8c2dbf5ba376103e18a32e0a07d1d1f35dd` ([run 41407992109](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992109)).
- [x] CodeQL passed for the exact head ([run 41407992170](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992170)); SARIF merge warning recorded above.
- [x] Dependency Review passed for the exact head ([run 41407992130](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41407992130)); unknown license metadata and two low Scorecard warnings remain.
- [x] Streaming request-body limit guard checks remaining capacity before copying each chunk; targeted test is included in the passing backend suite.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo downgrade or lower the audit threshold.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
