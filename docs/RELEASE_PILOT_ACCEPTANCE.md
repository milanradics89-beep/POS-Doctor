# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest verified automated evidence (2026-11-02; exact PR HEAD; not a production sign-off)

PR #41 remains open, unmerged, and non-draft. The exact current PR HEAD [`17aed26c517290b804e9ea33118912654811bcb9`](https://github.com/milanradics89-beep/POS-Doctor/commit/17aed26c517290b804e9ea33118912654811bcb9) has passed all three required automated workflows. This is a documentation-only commit; the latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). The PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

All required workflows passed on exact PR HEAD `17aed26c517290b804e9ea33118912654811bcb9`:
- [Validation 41528591597](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591597): backend [125562640685](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591597/job/125562640685), frontend/Android [125562640772](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591597/job/125562640772), and iOS [125562640335](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591597/job/125562640335) all succeeded. Backend compilation, tests, production-readiness checks and dependency audit passed. Frontend typecheck/unit tests, Expo Doctor, Android export/Release build/emulator smoke test passed. iOS native generation, CocoaPods, Release simulator build and launch smoke test passed.
- [CodeQL 41528591544](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591544), analyze job [125562640202](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591544/job/125562640202), succeeded.
- [Dependency Review 41528591560](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591560), job [125562639957](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41528591560/job/125562639957), succeeded. Previously recorded findings remain open: one unknown license-metadata entry for local `vendor/deepmerge@4.3.2`, two low OpenSSF Scorecard findings, and 11 moderate transitive `glob`/`minimatch` npm-audit advisories. No forced Expo downgrade or threshold reduction was applied.

Seven inline PR #41 review threads exist; **all seven are resolved**. The latest Codex review receipt is for exact HEAD `17aed26c51` and reports no major issues. The tracked App Attest recovery, verifier test contract, effective Request/init headers, exact-HEAD documentation, CI links, and backlog tally findings are resolved. Explicit-auth POST retry tests, the valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions are confirmed in current source/tests.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; PR and one-approval rules, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward protection, and no bypass actors. Main reports `protected: true`. No approving review is currently recorded on PR #41, so the one-approval merge gate remains outstanding.

[Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure on SHA `9616867170b299797a699929b2939b5571266307`; the current exact-head CodeQL run succeeded, but the historical issue remains open. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] All required workflows passed on exact PR HEAD 17aed26c517290b804e9ea33118912654811bcb9: Validation 41528591597 (backend 125562640685, frontend 125562640772, iOS 125562640335), CodeQL 41528591544 (analyze 125562640202), and Dependency Review 41528591560 (125562639957).
- [x] Exact-SHA source validation passed on d7aeb212 ([Validation 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424)); backend, frontend/Android, and iOS jobs all succeeded.
- [x] CodeQL and Dependency Review passed on exact source SHA d7aeb212 ([CodeQL 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), [Dependency Review 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673)); SARIF, license metadata, and low Scorecard warnings are recorded above.
- [x] Previous ancestry-sync baseline d629811709a8305bbf19583b7bb413c080709c84 passed exact-SHA Validation 41491240015, CodeQL 41491239492, and Dependency Review 41491239570; the later exact baseline 7e71f621b583012d57c63fa589ce85556f4ab97f independently passed all three workflows above.
- [x] Early 429 rate-limit and 503 Redis-failure responses receive request IDs, CORS/security policies, and completion logging; targeted regression tests passed in the exact-head backend job.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob`/`minimatch` dependency paths; do not apply the forced Expo downgrade or lower the audit threshold.
- [x] Main branch protection: active ruleset 26370589 verified; issue #47 closed. The six exact required checks, PR/approval rules, deletion/non-fast-forward protection, and no-bypass policy are confirmed.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests, backup/restore, monitoring delivery, staged store rollout, and pilot/business approval.
