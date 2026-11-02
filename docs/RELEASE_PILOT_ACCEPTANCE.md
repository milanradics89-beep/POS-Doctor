# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (2026-11-02 07:01 CET; not a production sign-off)

PR #41 head [`72219cc9a024ae6ecd104fb563bc8277898ddd64`](https://github.com/milanradics89-beep/POS-Doctor/commit/72219cc9a024ae6ecd104fb563bc8277898ddd64) is the latest fully validated commit; its parent is [`4af4d1b4bff0a301eb37bd4701d7241a6fc8e4f3`](https://github.com/milanradics89-beep/POS-Doctor/commit/4af4d1b4bff0a301eb37bd4701d7241a6fc8e4f3). The application-code fix [`4af4d1b`](https://github.com/milanradics89-beep/POS-Doctor/commit/4af4d1b4bff0a301eb37bd4701d7241a6fc8e4f3) preserves a Request body clone for the single 401 session-refresh replay; head `72219cc` adds the regression test that verifies exact body replay. Automatic transient retries remain restricted to safe methods.

- [Validation run 41395088388](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088388): backend [125114565176](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088388/job/125114565176), frontend/Android [125114564902](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088388/job/125114564902), and iOS [125114565149](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088388/job/125114565149) all passed. Backend completed **354 tests**, plus production-readiness suites of **24** and **22** passing tests, using Redis 7.4.12 / redis-py 7.4.1. One Starlette/httpx TestClient deprecation warning and a non-fatal Redis runner-host `vm.overcommit_memory` warning were recorded. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL run 41395088421](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088421), analyze job [125114564989](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088421/job/125114564989), completed successfully and uploaded combined JavaScript/Python SARIF; the SARIF merge logged a column-kind mismatch warning.
- [Dependency Review run 41395088407](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088407), job [125114564725](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088407/job/125114564725), completed successfully with no high-or-higher vulnerable packages and no denied packages. Remaining warnings: unknown license metadata for `vendor/deepmerge@4.3.2`, and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- The frontend `npm audit --omit=dev --audit-level=high` step passed the configured threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. The dependency tree is not clean; no forced Expo downgrade or threshold reduction was applied.
- Exact observed check names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. Android is included in `frontend`.
- All three inline PR #41 review threads are resolved (two outdated). Current source/tests verify explicit-auth POST retry fixtures, effective Request/init headers and method selection, valid base64 `vision_usage` privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, App Attest enrollment recovery, and Request-body replay after session refresh.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main` is unprotected, rulesets are empty, and the connected integration receives HTTP 403 for branch-protection details. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for exact PR head `72219cc9a024ae6ecd104fb563bc8277898ddd64` ([run 41395088388](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088388)).
- [x] CodeQL passed for the exact head ([run 41395088421](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088421)); SARIF merge warning recorded above.
- [x] Dependency Review passed for the exact head ([run 41395088407](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41395088407)); unknown license metadata and two low Scorecard warnings remain.
- [x] Production load-probe guard now rejects HTTP even with explicit production approval; targeted regression test is in `scripts/load-test.test.mjs`. This does **not** mean a real staging load test has been executed.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade or lower the audit threshold.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
