# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest exact-head automated evidence (2026-11-02; not a production sign-off)

PR #41 remains open and unmerged. The exact PR HEAD is [d7aeb212fbd3c47009edbb981540a09e3c431a3f](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). All three required workflows completed successfully for this exact SHA:

- [Validation run 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424): backend [125272796054](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272796054), frontend/Android [125272796035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272796035), and iOS [125272795628](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272795628) all passed. Backend: **356 passed, 1 warning**; production-readiness suites: **24 passed, 1 warning** and **22 passed**. The warning is the Starlette/httpx TestClient deprecation. Redis 7.4 logged a runner-host `vm.overcommit_memory` warning. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL run 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), analyze job [125272795044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433/job/125272795044), passed. It scanned 181 TypeScript, 2 JavaScript, 71 Python, and 4 GitHub Actions files; SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review run 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673), job [125272795920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673/job/125272795920), passed with no high-or-higher vulnerable packages. The PR summary reports one unknown-license metadata warning for `vendor/deepmerge@4.3.2` and two low Scorecard warnings (`@expo/devcert` 2.9, `is-mergeable-object` 1.5).
- The runtime npm audit passed its configured high threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. No forced Expo downgrade or audit-threshold reduction was applied.
- Exact observed check/job names: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. Android is included in `frontend`.
- Commit d7aeb212 fixes middleware ordering/request-ID propagation for early 429 and 503 responses; the targeted observability regression tests passed in the exact-head backend job.
- All five inline PR #41 review threads are resolved; four are outdated. The latest Codex review of d7aeb212 found no major issues. The five previously tracked auth/retry, Request semantics, privacy fixture, error logging, and permission recovery findings remain covered by current source/tests.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main` is unprotected, rulesets are empty, and branch-protection detail reads return HTTP 403 to the connected integration. Repository administrator action is required.
- The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Exact-head full CI validation passed on `d7aeb212fbd3c47009edbb981540a09e3c431a3f` ([run 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424)); backend, frontend/Android, and iOS jobs all succeeded.
- [x] CodeQL passed on exact HEAD d7aeb212 ([run 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), job [125272795044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433/job/125272795044)); SARIF merge warning recorded above.
- [x] Dependency Review passed on exact HEAD d7aeb212 ([run 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673), job [125272795920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673/job/125272795920)); unknown license metadata and two low Scorecard warnings remain.
- [x] Early 429 rate-limit and 503 Redis-failure responses receive request IDs, CORS/security policies, and completion logging; targeted regression tests passed in the exact-head backend job.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob`/`minimatch` dependency paths; do not apply the forced Expo downgrade or lower the audit threshold.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
