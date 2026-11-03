# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest verified automated evidence (2026-11-03; exact PR HEAD: `f79da966d0d6a257feebf37db05ad2cfe1ea6303`; not a production sign-off)

PR #41 remains open, unmerged, and non-draft. Exact PR HEAD [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303) passed Validation, CodeQL, and Dependency Review. The latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f); the current SHA is a documentation-only evidence update. The PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

All required workflows passed on exact PR HEAD `f79da966d0d6a257feebf37db05ad2cfe1ea6303`:
- [Validation 41541825237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237): backend [125607650851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650851), frontend/Android [125607650527](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650527), and iOS [125607650926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650926) all succeeded. Backend compilation, tests, production-readiness checks and dependency audit passed. Frontend source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build/emulator smoke test and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build and install/launch smoke test passed.
- [CodeQL 41541825206](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206), analyze job [125607650491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206/job/125607650491), succeeded.
- [Dependency Review 41541825120](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120), job [125607649545](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120/job/125607649545), succeeded. It found no vulnerable packages at severity high or higher and no denied packages. It reported unknown license metadata for `vendor/deepmerge@4.3.2`, plus Scorecard scores below threshold for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The frontend runtime audit passed its high-severity threshold but still reported 11 moderate advisories. No forced Expo downgrade or audit-threshold reduction was applied.

All eight inline PR #41 review threads are resolved. The latest Codex review for `f79da96` completed with no findings. The tracked App Attest recovery, verifier test contract, effective Request/init headers and method, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions are confirmed in current source/tests.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) protects main with strict required checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; pull-request and one-approval rules, stale-review dismissal, last-push approval, thread resolution, deletion/non-fast-forward protection, and no bypass actors. Main reports `protected: true`. No approving review is currently recorded on PR #41, so the one-approval merge gate remains outstanding.

[Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL failure on SHA `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded, but the historical issue remains open. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, approved staging load probe, backup/restore, monitoring/alert delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Evidence gates

- [x] Exact-head Validation, CodeQL, and Dependency Review passed on PR HEAD `f79da966d0d6a257feebf37db05ad2cfe1ea6303`: Validation 41541825237 (backend 125607650851, frontend 125607650527, iOS 125607650926), CodeQL 41541825206 (analyze 125607650491), Dependency Review 41541825120 (125607649545).
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive dependency graph; do not apply a forced Expo downgrade or lower the audit threshold.
- [x] Main branch protection: active ruleset 26370589 verified; issue #47 closed. Exact required checks, PR/approval rules, deletion/non-fast-forward protection, and no-bypass policy are confirmed.
- [ ] Verify production environment secrets, provider identity/configuration, and readiness in the deployed environment.
- [ ] Complete physical-device App Attest and Play Integrity tests.
- [ ] Execute an approved staging load probe and witnessed backup/restore drill.
- [ ] Verify production monitoring and alert delivery, staged store rollout, pilot thresholds, and business approval.
- [ ] Obtain the required approving review on PR #41; no APPROVED review is currently recorded.

