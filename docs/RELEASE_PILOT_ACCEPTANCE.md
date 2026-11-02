# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (2026-11-02 03:12 CET; not a production sign-off)

PR #41 head [`c41bb74d6ca8a8e1d40fd05534bf6f1ec03848dd`](https://github.com/milanradics89-beep/POS-Doctor/commit/c41bb74d6ca8a8e1d40fd05534bf6f1ec03848dd) is the current application-code commit. It enforces HTTPS for production load probes even with explicit capacity approval and adds a regression test for the HTTP rejection.

- [Validation run 41374273828](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273828): backend [125051035763](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273828/job/125051035763), frontend/Android [125051035816](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273828/job/125051035816), and iOS [125051035618](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273828/job/125051035618) all passed. Backend completed **354 tests with one Starlette/httpx TestClient deprecation warning**, plus production-readiness suites of 24 and 22 passing tests, using Redis 7.4.12 / redis-py 7.4.1. The Redis container logged a non-fatal runner-host `vm.overcommit_memory` warning. Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed.
- [CodeQL run 41374273769](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273769), analyze job [125051035578](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273769/job/125051035578), completed successfully and uploaded combined JavaScript/Python SARIF; the SARIF merge logged a column-kind mismatch warning.
- [Dependency Review run 41374273777](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273777), job [125051035523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273777/job/125051035523), completed successfully with no high-or-higher vulnerable packages and no denied packages. Remaining warnings: unknown license metadata for `package-lock.json » vendor/deepmerge@4.3.2`, and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- The frontend `npm audit --omit=dev --audit-level=high` step passed the configured threshold, but still reports **11 moderate transitive `glob`/`minimatch` advisories**. The dependency tree is not clean; no forced Expo downgrade or threshold reduction was applied.
- Exact observed check names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. Android is included in `frontend`.
- All three inline PR #41 review threads are resolved (two are outdated). Current source/tests verify explicit-auth POST retries, effective Request/init headers and method selection, valid base64 `vision_usage` privacy fixture, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest pending-enrollment/evidence recovery.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The rulesets endpoint is empty and the connected integration receives HTTP 403 for branch-protection details; a repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Full CI validation passed for exact PR head `c41bb74d6ca8a8e1d40fd05534bf6f1ec03848dd` ([run 41374273828](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273828)).
- [x] CodeQL passed for the exact head ([run 41374273769](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273769)); SARIF merge warning recorded above.
- [x] Dependency Review passed for the exact head ([run 41374273777](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41374273777)); unknown license metadata and two low Scorecard warnings remain.
- [x] Production load-probe guard now rejects HTTP even with explicit production approval; targeted regression test is in `scripts/load-test.test.mjs`. This does **not** mean a real staging load test has been executed.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade or lower the audit threshold.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
