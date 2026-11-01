# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated PR #41 head before this evidence refresh: `77fea7ab2df95d1baadfcf453afaa9e427e97096` (`docs(release): record exact-head CI evidence for 5086e37`, documentation-only). Its parent is `5086e378c29e338bb1bdaaffcce53030e30c9902`; application code last changed at `274fefb6390b2324dfb37b8201279675bf26b481`.

- [Validation run 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350): backend job [124742385604](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385604), frontend job [124742385610](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385610), and iOS job [124742385450](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350/job/124742385450) all passed for the exact PR head. Backend used Redis 7.4.12 and reported **350 passed, 1 Starlette deprecation warning**. Frontend passed source-boundary guard, typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit. iOS passed native generation, CocoaPods, Release simulator build, and simulator install/launch.
- [CodeQL run 41270593270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593270) completed successfully and uploaded combined JavaScript/Python SARIF. A SARIF column-kind mismatch warning appeared during merge; the workflow still completed successfully. The complete repository code-scanning alert inventory is not exposed by the connected integration, so no zero-open-alert claim is made.
- [Dependency Review run 41270593238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593238) completed successfully with no high-or-higher vulnerable packages and no denied packages. The log reports unknown license metadata for `package-lock.json » vendor/deepmerge@4.3.2` (the vendored manifest declares MIT and a LICENSE file is present) and two low Scorecard warnings (`@expo/devcert` 2.9; `is-mergeable-object` 1.5). The separate npm audit still reports 11 moderate transitive advisories: `glob` (GHSA-3g3m-2fjr-6pw4) and `minimatch` (GHSA-g3hv-75wg-m249); `npm audit fix --force` would downgrade Expo to 51.0.39 and was not applied.
- Observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`; they are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Source inspection confirms App Attest pending-enrollment recovery, verifier test updates, effective Request/init header semantics, explicit-auth POST retry tests, the valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: main branch protection is not active, the rulesets endpoint is empty, and branch-protection reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint is empty. The connected integration does not expose complete code-scanning/Dependabot alert inventories, so their full status remains unverified.

This evidence applies to the complete PR head `77fea7ab2df95d1baadfcf453afaa9e427e97096`; the documentation commit did not change application source. It is not a production sign-off: simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

## Release identity

- [ ] Release version:
- [ ] Source commit SHA:
- [ ] Backend deployment identifier:
- [ ] Hosting environment/region:
- [ ] Android artifact/build number and signing certificate digest:
- [ ] iOS artifact/build number and bundle identifier:
- [ ] Release owner:
- [ ] On-call owner:
- [ ] Rollback owner:

## Evidence gates

- [x] Full CI validation passed for PR head `5086e378c29e338bb1bdaaffcce53030e30c9902` ([run 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350)).
- [x] CodeQL passed for PR head `5086e378c29e338bb1bdaaffcce53030e30c9902` ([run 41270593270](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593270)).
- [x] Dependency Review passed for PR head `5086e378c29e338bb1bdaaffcce53030e30c9902` ([run 41270593238](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593238)); unknown-license metadata for vendor/deepmerge@4.3.2 and 2 low Scorecard warnings remain visible.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `274fefb6390b2324dfb37b8201279675bf26b481` and passed in [validation run 41270593350](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41270593350) for PR head `5086e378c29e338bb1bdaaffcce53030e30c9902`:
- [ ] Backup and restore procedure verified:

## Pilot acceptance criteria

Agree and record thresholds before the pilot starts. Do not infer thresholds from CI results.

| Metric | Agreed threshold | Observed result | Evidence link | Pass |
|---|---|---|---|---|
| Crash-free sessions | | | | [ ] |
| API 5xx rate | | | | [ ] |
| API 429 rate | | | | [ ] |
| p95 API latency | | | | [ ] |
| Attestation success/failure rate | | | | [ ] |
| Product-resolution success rate | | | | [ ] |
| AI cost per session | | | | [ ] |
| Readiness failures | | | | [ ] |

- Pilot start (UTC):
- Pilot end (UTC):
- Cohort/eligible user count:
- Known issues accepted by owner:
- Expansion decision and rationale:

## Rollback rehearsal

- [ ] Previous known-good backend artifact is identified and retrievable.
- [ ] Previous mobile store release is identified.
- [ ] Backend rollback/configuration restoration was rehearsed.
- [ ] Readiness and smoke tests passed after rollback.
- [ ] Mobile staged rollout halt procedure was verified.
- [ ] Backend remains compatible with already-installed mobile clients.
- [ ] Incident escalation and alert destination were tested.

## Sign-off

- Engineering approver:
- Security approver:
- Product/business approver:
- Approval timestamp (UTC):
- Approved source SHA:

A blank or unverified item is not a pass. Simulator/emulator smoke tests do not replace physical-device attestation evidence.
