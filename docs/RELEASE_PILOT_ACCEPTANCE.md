# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest verified automated evidence (2026-11-02; exact PR HEAD; not a production sign-off)

PR #41 remains open, unmerged, and non-draft. The current PR HEAD is [`ae60939a43d7eaed13f5344521de6abb2d077ec9`](https://github.com/milanradics89-beep/POS-Doctor/commit/ae60939a43d7eaed13f5344521de6abb2d077ec9), a documentation-only commit whose parent is the ancestry-sync commit [`d629811709a8305bbf19583b7bb413c080709c84`](https://github.com/milanradics89-beep/POS-Doctor/commit/d629811709a8305bbf19583b7bb413c080709c84). The PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The latest application-source change remains [`d7aeb212fbd3c47009edbb981540a09e3c431a3f`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f).

All required workflows passed on the exact current PR HEAD:
- [Validation 41502496967](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496967): backend [125473260195](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496967/job/125473260195), frontend/Android [125473260357](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496967/job/125473260357), and iOS [125473259809](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496967/job/125473259809) all succeeded. Backend reported **356 passed, 1 warning**; production-readiness suites reported **24 passed, 1 warning** and **22 passed**. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL 41502496889](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496889), analyze job [125473261207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496889/job/125473261207), passed; combined SARIF uploaded successfully with a column-kind mismatch warning.
- [Dependency Review 41502496753](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496753), job [125473259515](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41502496753/job/125473259515), passed with no high-or-higher vulnerable packages and no denied packages. The local deepmerge license-metadata warning and two low Scorecard warnings remain.

The frontend runtime npm audit passed its configured high threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. No forced Expo downgrade or audit-threshold reduction was applied. The backend has one Starlette/httpx TestClient deprecation warning; Redis emitted a runner-host `vm.overcommit_memory` warning.

Seven inline PR #41 review threads exist; **all seven are resolved**. The latest recorded Codex review receipt is for `bd92d080`; a review of current HEAD `ae60939` is still pending. The tracked App Attest recovery, verifier test contract, effective Request/init headers, exact-HEAD documentation, CI links, and backlog tally findings are resolved. Explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions remain covered by source/tests.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; PR and one-approval rules, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward protection, and no bypass actors. Main reports `protected: true`. No approving review is currently recorded on PR #41, so the one-approval merge gate remains outstanding.

[Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on SHA `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded, but the old issue has not been closed. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates## Evidence gates

- [x] All required workflows passed on exact current PR HEAD ae60939a43d7eaed13f5344521de6abb2d077ec9: Validation 41502496967 (backend 125473260195, frontend 125473260357, iOS 125473259809), CodeQL 41502496889 (analyze 125473261207), and Dependency Review 41502496753 (125473259515).
- [x] Exact-SHA source validation passed on d7aeb212 ([Validation 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424)); backend, frontend/Android, and iOS jobs all succeeded.
- [x] CodeQL and Dependency Review passed on exact source SHA d7aeb212 ([CodeQL 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), [Dependency Review 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673)); SARIF, license metadata, and low Scorecard warnings are recorded above.
- [x] Previous ancestry-sync baseline d629811709a8305bbf19583b7bb413c080709c84 passed exact-SHA Validation 41491240015, CodeQL 41491239492, and Dependency Review 41491239570; current documentation-only HEAD ae60939 independently passed all three workflows above.
- [x] Early 429 rate-limit and 503 Redis-failure responses receive request IDs, CORS/security policies, and completion logging; targeted regression tests passed in the exact-head backend job.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob`/`minimatch` dependency paths; do not apply the forced Expo downgrade or lower the audit threshold.
- [x] Main branch protection: active ruleset 26370589 verified; issue #47 closed. The six exact required checks, PR/approval rules, deletion/non-fast-forward protection, and no-bypass policy are confirmed.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
