# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline (not a production sign-off)

Latest fully validated PR #41 head: `caff9a7f31ff799e274b27b24647bfe57097c2ea` (documentation-only follow-up, 2026-10-31). Latest application-code commit in this tree: `c95530f88254697704d45ba385cf0bb3d0ea5170`.

- [Validation run 41226044551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551): all three jobs passed for the exact PR head. Backend, frontend, and iOS completed successfully; frontend included Android Release build/emulator install-launch, while iOS included native generation, CocoaPods, Release simulator build, and install/launch.
- [CodeQL run 41226044719](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044719): completed successfully for the exact PR head. The connected API does not expose the repository alert inventory, so no zero-alert claim is made.
- [Dependency Review run 41226044603](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044603): completed successfully with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low Scorecard warnings. The separate npm audit report still records 11 moderate transitive `glob` / `minimatch` advisories; no high/critical npm-audit findings were reported.
- Exact check-run names observed on this head are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. They are not currently enforced by a `main` ruleset.
- All three historical inline PR #41 review threads are resolved. Current source inspection confirms App Attest pending-enrollment recovery, updated invalid-provider test expectations, effective Request/init header semantics, explicit-auth POST retry tests, valid base64 privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: the rulesets endpoint is empty and branch-protection reads return HTTP 403 to the integration. The GitHub releases endpoint is empty. Code-scanning and Dependabot alert inventories are not exposed by the connected integration, so their status remains unverified.

This evidence applies to the complete PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea`; the application source code in that tree last changed at `c95530f88254697704d45ba385cf0bb3d0ea5170`. It is not a production sign-off: simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

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

- [x] Full CI validation passed for PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea` ([run 41226044551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551)).
- [x] CodeQL passed for PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea` ([run 41226044719](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044719)).
- [x] Dependency Review passed for PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea` ([run 41226044603](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044603)); 1 unknown-license metadata warning and 2 highlighted low Scorecard results remain visible.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41226044551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `c95530f88254697704d45ba385cf0bb3d0ea5170` and passed in [validation run 41226044551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551) for PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea`:
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
