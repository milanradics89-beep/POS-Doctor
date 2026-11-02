# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest verified automated evidence (2026-11-02; exact PR HEAD; not a production sign-off)

PR #41 remains open, unmerged, and non-draft. The current PR HEAD is [`d629811709a8305bbf19583b7bb413c080709c84`](https://github.com/milanradics89-beep/POS-Doctor/commit/d629811709a8305bbf19583b7bb413c080709c84). This is a two-parent ancestry-sync merge commit; the PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`. The latest application-source change remains [`d7aeb212fbd3c47009edbb981540a09e3c431a3f`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f).

All required workflows passed on the exact current PR HEAD:
- [Validation 41491240015](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491240015): backend [125448714243](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491240015/job/125448714243), frontend/Android [125448800066](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491240015/job/125448800066), and iOS [125448711635](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491240015/job/125448711635) all succeeded. Backend reported **356 passed, 1 warning**; production-readiness suites reported **24 passed, 1 warning** and **22 passed**. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL 41491239492](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491239492), analyze job [125434467218](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491239492/job/125434467218), passed; 181 TypeScript, 2 JavaScript, 71 Python, and 4 GitHub Actions files were scanned. SARIF merge warning recorded; upload succeeded.
- [Dependency Review 41491239570](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491239570), job [125434466395](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41491239570/job/125434466395), passed with no high-or-higher vulnerable packages and no denied packages. Missing local deepmerge license metadata and two low Scorecard warnings remain.

The frontend runtime npm audit passed its configured high threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. No forced Expo downgrade or audit-threshold reduction was applied. The backend has one Starlette/httpx TestClient deprecation warning and Redis emitted a runner-host `vm.overcommit_memory` warning.

Seven inline PR #41 review threads exist; **all seven are resolved**. The previously tracked App Attest recovery, verifier test contract, effective Request/init headers, exact-HEAD documentation, CI links, and backlog tally findings are resolved. Explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions remain covered by source/tests.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with the six exact required checks, PR and one-approval rules, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward protection, and no bypass actors. Main reports `protected: true`. PR #41 base SHA equals main HEAD; branch ancestry is synchronized. No approving review is currently recorded on PR #41, so the one-approval gate is still outstanding.

The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.
## Evidence gates

- [x] All required workflows passed on exact current PR HEAD d629811709a8305bbf19583b7bb413c080709c84: Validation 41491240015, CodeQL 41491239492, and Dependency Review 41491239570; backend, frontend/Android, iOS, analyze, and dependency-review jobs all succeeded. See the exact job links above.
- [x] Exact-SHA source validation passed on d7aeb212 ([Validation 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424)); backend, frontend/Android, and iOS jobs all succeeded.
- [x] CodeQL and Dependency Review passed on exact source SHA d7aeb212 ([CodeQL 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), [Dependency Review 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673)); SARIF, license metadata, and low Scorecard warnings are recorded above.
- [x] The subsequent documentation-only baseline ba0ffaccbb2ac18a61088196f1a5ba7790c489ee also passed exact-SHA Validation 41468731627, CodeQL 41468731317, and Dependency Review 41468731369; this refresh must independently pass the live PR checks before merge.
- [x] Early 429 rate-limit and 503 Redis-failure responses receive request IDs, CORS/security policies, and completion logging; targeted regression tests passed in the exact-head backend job.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob`/`minimatch` dependency paths; do not apply the forced Expo downgrade or lower the audit threshold.
- [x] Main branch protection: active ruleset 26370589 verified; issue #47 closed. The six exact required checks, PR/approval rules, deletion/non-fast-forward protection, and no-bypass policy are confirmed.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
