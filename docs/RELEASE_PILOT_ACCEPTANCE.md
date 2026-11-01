# Release pilot acceptance record

Complete this record before promoting a build beyond internal testing. Do not enter secrets, raw attestation payloads, personal data, or bearer tokens.

## Latest fully validated CI baseline before this documentation refresh (not a production sign-off)

PR #41 head: `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([commit](https://github.com/milanradics89-beep/POS-Doctor/commit/e6b234dbf093d06af7c8d7a19441fea3cd4116a6), documentation-only; parent `c87450dfc2005b87eebc11727cf18edf57abcc64`). All three required workflows completed successfully for this exact SHA. Application code last changed at `274fefb6390b2324dfb37b8201279675bf26b481`. The documentation-only follow-up in this commit must pass its own CI before PR #41 is merge-ready.

- [Validation run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518): backend [124870854902](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518/job/124870854902), frontend/Android [124870853035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518/job/124870853035), and iOS [124870854102](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518/job/124870854102) all passed. Backend completed 351 tests with one Starlette/httpx TestClient deprecation warning; Android Release build/emulator install-launch and iOS Release simulator build/install-launch passed.
- [CodeQL run 41312305644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305644), analyze job [124865047506](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305644/job/124865047506), completed successfully. SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review run 41312305528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305528), job [124865047386](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305528/job/124865047386), completed successfully: no high-or-higher vulnerable packages and no denied packages. The unknown `vendor/deepmerge@4.3.2` license metadata, low Scorecard findings (`@expo/devcert` 2.9 and `is-mergeable-object` 1.5), and 11 moderate transitive `glob`/`minimatch` npm-audit advisories remain documented. No forced Expo downgrade or audit-threshold reduction was applied.
- Exact observed check names are `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`; they are not enforced by a current `main` ruleset.
- All three inline PR #41 review threads are resolved. Source inspection confirms App Attest pending-enrollment recovery, verifier test updates, effective Request/init header and method semantics, explicit-auth POST retry tests, a valid base64 vision-usage privacy fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open: `main` is not protected, the rulesets endpoint is empty, and branch-protection detail reads return HTTP 403 to the integration. A repository administrator must create and verify the required `main` ruleset.
- The GitHub releases endpoint returned an empty list. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration, so their full status remains unverified.

This evidence is not production sign-off. Simulator/emulator results do not satisfy physical-device App Attest or Play Integrity. Production secrets/provider settings, staging deployment, backup/restore, monitoring/alert delivery, rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified.

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

- [x] Full CI validation passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518)).
- [x] CodeQL passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305644](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305644)).
- [x] Dependency Review passed for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6` ([run 41312305528](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305528)); known dependency warnings and moderate npm-audit advisories remain documented above.
- [ ] Review or remediate the 11 moderate npm-audit advisories in the Expo 57 transitive `glob` / `minimatch` dependency paths; do not apply the forced Expo 51 downgrade.
- [x] Automated production-readiness checks passed in [validation run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518); production environment configuration is still unverified.
- [ ] Staging readiness and health checks passed:
- [ ] Shared Redis is configured; challenge replay and multi-instance tests passed:
- [ ] EAS build environment contains the valid numeric `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` for Play Integrity:
- [ ] Google Play Integrity verified on a Play-installed physical Android device:
- [ ] Apple App Attest verified on a physical iPhone using the production entitlement:
- [ ] Camera permission grant/denial/recovery flows tested on both platforms:
- [ ] Network interruption and session recovery tested:
- [ ] Privacy review confirms production log sinks and retention contain no images, data URIs, secrets, bearer tokens, or raw provider responses. Code-level prompt/user-intent redaction and personal-memory capability path redaction remain in application source SHA `274fefb6390b2324dfb37b8201279675bf26b481` and passed in [validation run 41312305518](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41312305518) for PR head `e6b234dbf093d06af7c8d7a19441fea3cd4116a6`:
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
