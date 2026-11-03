# USEIT release and production runbook

This runbook is the release gate for the USEIT mobile app and backend. A green unit-test run alone is not a production approval.

## 1. Required CI evidence

### Latest verified automated CI baseline (2026-11-03; exact PR #41 HEAD at evidence capture: `88e477f82785b356caf1b9af6d91d35fe1653e00`; not production sign-off)

At evidence capture, PR #41 is open, unmerged, and non-draft on `fix/release-blockers-2026-10`. Exact HEAD [`88e477f`](https://github.com/milanradics89-beep/POS-Doctor/commit/88e477f82785b356caf1b9af6d91d35fe1653e00) passed Validation, CodeQL, and Dependency Review. It is a documentation-only child of [`f0c937a`](https://github.com/milanradics89-beep/POS-Doctor/commit/f0c937adaf2714e3888c6ca58848a3c55ea9df46); latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

Exact-head workflow evidence:
- [Validation 41590178683](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178683): backend [125764870026](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178683/job/125764870026), frontend/Android [125764870236](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178683/job/125764870236), and iOS [125764870237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178683/job/125764870237) succeeded. Backend: 356 tests passed, plus 24 production-readiness and 22 security tests; dependency audit found no known vulnerabilities. Frontend typecheck, unit tests, Expo Doctor, Android Release build/emulator smoke test, and iOS Release simulator build/install/launch passed. npm audit still reports 11 moderate transitive `glob`/`minimatch` findings. Redis emitted a runner-host `vm.overcommit_memory` warning.
- [CodeQL 41590178680](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178680), analyze job [125764870194](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178680/job/125764870194), succeeded and uploaded SARIF; a non-fatal column-kind mismatch warning remains.
- [Dependency Review 41590178748](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178748), job [125764870664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41590178748/job/125764870664), succeeded with no high-or-higher vulnerable packages. Warnings remain for unknown license metadata on `vendor/deepmerge@4.3.2` (vendored MIT manifest/LICENSE), and Scorecard scores `@expo/devcert` 2.9 and `is-mergeable-object` 1.5. No forced Expo downgrade or audit-threshold reduction was applied.

Current source review confirms explicit-auth POST retry fixtures, effective Request/init header and method handling, a valid base64 image fixture for `vision_usage` privacy coverage, error-boundary logging without raw Error objects, Settings recovery for permanently denied camera/gallery permissions, and Apple App Attest enrollment remaining pending until server acceptance. The P1 backend test expectation finding is corrected; invalid evidence returns 401, replay is rejected, and the exact-head backend suite passed.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed. Active ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets main and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it also requires PRs, one approval, last-push approval and resolved threads, blocks deletion/non-fast-forward updates, and has no bypass actors. `main.protected` is true.

No `APPROVED` review is recorded on PR #41. Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for a historical CodeQL failure. PRs [#43](https://github.com/milanradics89-beep/POS-Doctor/pull/43) and [#44](https://github.com/milanradics89-beep/POS-Doctor/pull/44) are one-sided CodeQL updates and must not be merged independently; draft PR [#49](https://github.com/milanradics89-beep/POS-Doctor/pull/49) contains the atomic update. Design PR [#48](https://github.com/milanradics89-beep/POS-Doctor/pull/48) remains draft with its recorded CI checks passing. GitHub Releases returns an empty list. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the integration and remain unverified.

This is automated CI evidence, not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring/alert delivery, staged rollout, pilot thresholds, moderate npm-audit risk acceptance, and human approval remain unverified. This documentation-only evidence refresh is a child of `88e477f`; evaluate its own exact-HEAD checks separately and do not reuse the parent run IDs.

For the exact commit intended for release, require all of the following to pass:

- [ ] Source-boundary guard, TypeScript typecheck, and frontend unit tests.
- [ ] Expo Doctor and Android export.
- [ ] Android native release APK build and emulator install/launch smoke test.
- [ ] iOS native project generation, CocoaPods installation, simulator build, and launch smoke test.
- [ ] Backend compilation, full backend test suite, production-readiness checks, and dependency audit.
- [ ] Runtime JavaScript dependency audit at high severity or above; record moderate findings separately and do not equate a passing high threshold with a clean dependency tree.
- [ ] Client automatic retries are restricted to safe HTTP methods; do not enable POST retries until the backend provides and tests idempotency-key enforcement.
- [ ] Client attestation session/challenge/submission requests use a 10-second AbortController-backed deadline, with regression tests for aborts and exact same-evidence recovery after a timed-out submission.
- [ ] CodeQL and dependency-review checks.
- [ ] Review all remaining PR comments and verify that each security finding is fixed or explicitly accepted by the project owner.

Do not merge a commit whose CI is still running, cancelled, or failed. A cancelled run is not a pass.

### Previous verified automated CI baseline (superseded by f0c937; exact PR HEAD: `40b79d4`; not production sign-off)

At evidence capture, PR #41 was open, unmerged, and non-draft on `fix/release-blockers-2026-10`. The exact HEAD [`40b79d4`](https://github.com/milanradics89-beep/POS-Doctor/commit/40b79d41d304fb949e3576447487377672845455) passed Validation, CodeQL, and Dependency Review. This is a documentation-only commit whose parent is [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303); the latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f). PR base and `main` HEAD were both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

Exact-head workflow evidence:
- [Validation 41552250326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326): backend [125642452241](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452241), frontend/Android [125642452698](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452698), and iOS [125642452623](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250326/job/125642452623) all completed successfully. The backend suite reported 356 passed and one warning; production-readiness checks and backend dependency audit passed. Frontend typecheck, unit tests, Expo Doctor, Android export/Release build, emulator install/launch, and runtime dependency audit passed. iOS native generation, CocoaPods, Release simulator build, and simulator install/launch passed.
- [CodeQL 41552250336](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336), analyze job [125642453074](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250336/job/125642453074), succeeded and uploaded SARIF. The log contains a non-fatal SARIF column-kind mismatch warning.
- [Dependency Review 41552250325](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325), job [125642452207](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41552250325/job/125642452207), succeeded. It found no vulnerable packages at severity high or higher and no denied packages. It flagged unknown license metadata for `vendor/deepmerge@4.3.2`, plus OpenSSF Scorecard results below threshold 3 for `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The frontend runtime `npm audit --omit=dev --audit-level=high` passed its configured threshold but still reported 11 moderate advisories; no forced Expo downgrade or audit-threshold reduction was applied.

Source/review checks at this baseline: explicit-auth POST retry fixtures; effective Fetch `Request`/init header replacement and method handling; valid base64 image data in the vision-usage privacy test; sanitized error-boundary logging; Settings recovery for permanently denied camera/gallery permissions; and App Attest enrollment marking only after the server accepts the attestation. The pending App Attest evidence is persisted before network submission for same-evidence recovery.

Issue [#47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active repository ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets the default branch and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it also requires pull requests and one approval, dismisses stale approvals, requires last-push approval and resolved threads, blocks deletion/non-fast-forward updates, and has no bypass actors. The legacy branch-protection detail endpoint returned 403 to this integration in this run; the active ruleset itself was readable and verified.

PR #41 had nine inline review threads at capture: eight resolved and one open P2 thread about recording the new exact-head CI evidence. This evidence refresh corrects that record; keep the thread open until the updated documentation and its own CI/review are confirmed. No `APPROVED` review submission is recorded on PR #41, so the one-approval merge gate remains outstanding.

Issue [#46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL failure on `9616867170b299797a699929b2939b5571266307`; current exact-head CodeQL succeeded, but the historical issue is not closed. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

This evidence is not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring and alert delivery, staged store rollout, pilot thresholds, the moderate npm-audit risk decision, and human approvals remain unverified. **This documentation-only evidence refresh is a new child of `40b79d4`; the run IDs above do not validate that new child. Its own Validation, CodeQL, and Dependency Review must complete before merge.**

### Earlier validated automated CI baseline (superseded by 40b79d4; exact PR HEAD `f79da96`)

PR #41 remains open, unmerged, and non-draft. Exact PR HEAD [`f79da96`](https://github.com/milanradics89-beep/POS-Doctor/commit/f79da966d0d6a257feebf37db05ad2cfe1ea6303) passed all three required automated workflows. The latest application-source change remains [`d7aeb21`](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f); `f79da96` is documentation-only. The PR base and `main` HEAD are both `7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0`.

All three required workflows completed successfully for exact PR HEAD `f79da966d0d6a257feebf37db05ad2cfe1ea6303`:

- [Validation 41541825237](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237): backend [125607650851](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650851), frontend/Android [125607650527](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650527), and iOS [125607650926](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825237/job/125607650926) all succeeded. Backend compilation, full tests, production-readiness checks, and dependency audit passed. Frontend source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export, native Release build, emulator install/launch smoke test, and runtime dependency audit completed successfully. iOS native project generation, CocoaPods installation, Release simulator build, and simulator install/launch smoke test passed.
- [CodeQL 41541825206](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206), analyze job [125607650491](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825206/job/125607650491), succeeded.
- [Dependency Review 41541825120](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120), job [125607649545](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41541825120/job/125607649545), succeeded. The log reports no vulnerable packages at severity high or higher and no denied packages. It reports unknown license metadata for local `vendor/deepmerge@4.3.2` and two OpenSSF Scorecard warnings below the configured threshold of 3: `@expo/devcert` (2.9) and `is-mergeable-object` (1.5). The frontend `npm audit --omit=dev --audit-level=high` step exited successfully but still reported 11 moderate advisories; a passing high-severity threshold is not a clean dependency tree. No forced Expo downgrade or audit-threshold reduction was applied.

The eight inline PR #41 review threads are all resolved. The latest Codex code review for `f79da96` completed with no findings. Current source/test inspection confirms explicit-auth POST retry fixtures, effective `Request`/`init` headers and method handling, valid base64 privacy data, sanitized error-boundary logging, Settings recovery for permanently denied camera/gallery permissions, and App Attest enrollment only after server acceptance with recovery evidence persisted before submission.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is closed as completed. Active repository ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) targets main and requires strict checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`; it requires pull requests and one approval, dismisses stale approvals, requires last-push approval and resolved review threads, blocks deletion and non-fast-forward updates, and has no bypass actors. The main branch API reports `protected: true`. PR #41 has no APPROVED review submission, so its one-approval merge gate remains outstanding.

[Issue #46](https://github.com/milanradics89-beep/POS-Doctor/issues/46) remains open for the historical CodeQL failure on commit `9616867170b299797a699929b2939b5571266307`; the current exact-head CodeQL run succeeded, but the historical issue is not closed. The GitHub Releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their status remains **unverified**, not zero.

This is automated CI evidence, not production sign-off. Physical-device App Attest/Play Integrity, production provider secrets/configuration, approved staging load probe, backup/restore, production monitoring delivery, store rollout, pilot thresholds, moderate npm-audit risk decision, and human approvals remain unverified. PR #41 remains open and unmerged.

### Previous exact-head CI baseline (historical; superseded)

PR #41 head: `78402c8f35c2aad4717ae0ae5ba307dfae2b7c14`.

- [Validation run 41191342523](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523): completed successfully. [Frontend job 124508582653](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582653) passed the source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export, Android Release APK build, emulator install/launch smoke test, and the configured runtime dependency audit. [iOS job 124508582705](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582705) passed native project generation, CocoaPods installation, iOS Release simulator build, and simulator install/launch. [Backend job 124508582430](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342523/job/124508582430) passed compilation, the full backend test suite with Redis 7.4, production-readiness checks, and backend dependency audit.
- [CodeQL run 41191342553](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342553) completed successfully and uploaded the combined JavaScript/Python SARIF results. The connected API did not expose the repository alert inventory for this run, so this record does not claim a zero-alert result.
- [Dependency Review run 41191342726](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41191342726) completed successfully. Its log reports no vulnerable packages at severity high or higher and no denied packages. It reports one license-metadata warning for the local `vendor/deepmerge@4.3.2` link and two highlighted low OpenSSF Scorecard results: `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5). The vendored package manifest and LICENSE declare MIT; the lockfile link omits license metadata.
- The frontend `npm audit --omit=dev --audit-level=high` step passed its configured threshold, but the report still contains 11 **moderate** advisories in transitive `glob@13.0.6` and `minimatch@10.2.6` paths through Expo SDK 57 tooling. No high/critical npm-audit findings were reported. This is separate from Dependency Review's high-or-higher threshold. The suggested `npm audit fix --force` would downgrade Expo to `51.0.39`; it was not applied.
- Commit `78402c8` adds redaction for `prompt`, `userPrompt`, `user_prompt`, `userIntent`, and `user_intent` fields. Sentinel tests verify that user-intent and prompt values do not appear in structured logs; frontend and backend jobs passed on this exact head.
- The three historical inline review threads are resolved. The latest Codex review receipts in the conversation found no major issues on commits `123c0c4` and `0ae7517`; commit `78402c8` has not yet received a newer review receipt.

These results validate automated CI for this exact SHA only. They do not prove production secrets/provider configuration, hardware-backed attestation, production hosting, backups, monitoring delivery, store rollout, or pilot approval.


## 2. Production backend configuration

Configure secrets in the hosting platform's secret manager, never in source control, committed app config, logs, or client-side EXPO_PUBLIC variables.

Required:
- USEIT_ENV=production
- OPENAI_API_KEY
- Either USEIT_API_KEY for server-to-server/legacy access or USEIT_SESSION_SECRET for server-issued sessions. Session secrets must be at least 32 characters and randomly generated.
- USEIT_CORS_ORIGINS containing explicit trusted origins; wildcard CORS is forbidden.
- USEIT_ALLOW_DOCS=false

When session authentication is enabled:
- USEIT_ATTESTATION_MODE=required
- USEIT_ATTESTATION_APP_ID set to the platform's real app identity.
- USEIT_REDIS_URL for shared, persistent challenge and attestation-key state. Redis challenge operations use a 2-second connection timeout and a 5-second socket timeout; the production readiness endpoint performs a Redis ping when attestation is required, using 2-second connection and socket timeouts and closing the probe client. Treat a failed readiness check as a release blocker. The in-memory challenge store is capped at 10,000 unexpired challenges and fails closed at capacity; it is for tests/local development only.
- Select USEIT_ATTESTATION_PROVIDER=apple_app_attest or google_play_integrity to match the released platform and backend deployment.

For Google Play Integrity:
- Set `EXPO_PUBLIC_GOOGLE_CLOUD_PROJECT_NUMBER` in the EAS build environment to the numeric Google Cloud project number associated with the Play Integrity API. This identifier is embedded in the client build and is not a secret; the Android client fails closed if it is missing or invalid.
- USEIT_GOOGLE_PLAY_PACKAGE_NAME must match the Android package.
- USEIT_GOOGLE_PLAY_CERT_SHA256 must contain the production Play signing certificate digest(s) returned in the Play Integrity payload.
- Set `USEIT_GOOGLE_PLAY_DEVICE_INTEGRITY` to the explicitly approved comma-separated device verdicts. The default is `MEETS_DEVICE_INTEGRITY`; do not weaken it without a documented risk decision.
- Confirm the Google service account has the required Play Integrity permission and that the production app is published through the expected Play track.

For Apple App Attest:
- The bundle identifier and team-prefixed App Attest app ID must match the Apple Developer configuration.
- Production builds must use the production App Attest entitlement and production AAGUID.
- Confirm the production Apple Developer capability is enabled for the correct App ID.

For multi-instance deployments, use USEIT_RATE_LIMIT_MODE=redis and a shared Redis instance. Memory-mode rate limiting is process-local and is suitable only for development or a single-instance deployment. Redis rate limiting uses one Lua operation with Redis server time, a sorted-set sliding 60-second window, atomic pruning/count/admission, and TTL assignment for the event and sequence keys. Redis connections use explicit 2-second connect and 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

## 3. Mobile release configuration

- [ ] Verify the bundle identifier/package name and app version.
- [ ] Use the EAS production build profile for store artifacts.
- [ ] Confirm Apple App Attest entitlement is production in production builds; never ship a production build with development attestation.
- [ ] Confirm the Android application is signed with the intended Play App Signing certificate.
- [ ] Keep provider credentials and backend secrets out of the mobile bundle.
- [ ] Test camera permission grant, denial, recovery through Settings, image capture, analysis failure, retry, product discovery, and no-results states on physical devices.
- [ ] Test on at least one supported physical iOS device and one supported physical Android device. Simulator/emulator tests do not validate hardware-backed attestation.


### Bounded staging load probe

The repository includes `scripts/load-test.mjs` for a controlled HTTP load probe. Run it only against an approved staging environment after agreeing request volume and expected thresholds with the service owner.

Example health/readiness probe:

```bash
USEIT_LOAD_BASE_URL=https://staging-api.example.com \
USEIT_LOAD_TARGET_ENV=staging \
USEIT_LOAD_APPROVED_ORIGIN=https://staging-api.example.com \
USEIT_LOAD_PATH=/ready \
USEIT_LOAD_REQUESTS=100 \
USEIT_LOAD_CONCURRENCY=5 \
node scripts/load-test.mjs
```

For POST endpoints, explicitly set `USEIT_LOAD_TEST_ALLOW_POST=YES`, provide `USEIT_LOAD_BODY_JSON`, and configure `USEIT_LOAD_API_KEY` if required. POST tests can trigger billable AI calls or state changes. The harness caps each run at 1,000 requests and concurrency at 20, reports status counts, throughput and p50/p95/max latency, and exits non-zero on any failed request. Do not treat a health-endpoint probe as evidence of AI-analysis capacity; use an approved representative payload and a cost ceiling for analysis tests.

## 4. Staged rollout

1. Deploy the exact reviewed backend commit to staging.
2. Apply required environment variables and verify the readiness endpoint.
3. Smoke-test health/readiness, authentication, attestation, image analysis, product discovery, rate limiting, and timeout/error handling.
4. Release mobile builds to internal TestFlight and Google Play internal testing first.
5. Validate sign-in/session creation, attestation on real devices, camera permissions, analysis, shopping results, and recovery after network loss.
6. Run a limited pilot. Track crash-free sessions, API error rates, p95 latency, provider failures, product-resolution success rate, rate-limit events, and per-session AI cost.
7. Expand rollout only after the pilot meets the agreed quality, reliability, and cost thresholds. Record the approval and released commit SHA.

## 5. Monitoring, privacy, and rollback

- [ ] Confirm structured logs include request IDs and status/latency but do not contain images, data URIs, API keys, bearer tokens, or raw provider responses.
- [ ] Confirm `vision_usage` events contain only the model identifier and validated prompt/completion/total token counts; establish model-specific pricing and per-session budget alerts outside the application rather than hard-coding mutable provider prices.
- [ ] Alert on sustained 5xx/429 rates, provider outages, readiness failures, unusual cost spikes, and repeated attestation failures.
- [ ] Verify backups and recovery procedures for the production datastore and shared Redis state where applicable.
- [ ] Document the on-call owner, hosting provider, alert destination, and incident escalation path before public launch.
- [ ] Keep the previous known-good backend artifact and mobile store release available for rollback.
- [ ] For a backend regression, roll back to the previous known-good artifact/configuration and verify readiness and smoke tests. Use a reviewed revert commit for source rollback; do not force-push shared release branches.
- [ ] For a mobile regression, halt staged rollout and use the store's release controls. Mobile clients generally cannot be remotely downgraded, so restore service compatibility on the backend and publish a fixed version.
- [ ] After release, review metrics and crash reports at 24 hours and 7 days; turn findings into tracked issues with owners and acceptance criteria.

## 6. Release record

Record before release:
- Release version and Git commit SHA
- CI run URLs for validation and security workflows
- Backend deployment identifier and environment
- Mobile artifact identifiers and signing/build profiles
- Attestation provider and configuration verification (never record secrets)
- Pilot start/end, acceptance results, approver, and rollback owner

This repository does not itself prove that cloud secrets, Apple/Google console settings, store signing, production hosting, monitoring, backups, or physical-device validation are configured. Those items require verification in the relevant external systems before public release.


## Repository settings required for CI

The dependency-review workflow uses GitHub's dependency graph and must not be bypassed. If it reports that dependency review is unsupported, enable **Settings → Advanced Security → Dependency graph** for this repository, then rerun the workflow for the exact release commit. Lockfile-based npm and Python audits are additional checks, not a substitute for this gate.


## Personal memory security

- Set `USEIT_MEMORY_SECRET` to a randomly generated secret of at least 32 bytes before enabling the memory API.
- Treat memory IDs as bearer capabilities: clients must generate an unpredictable URL-safe token of at least 32 characters and store it privately. Guessable IDs such as usernames are rejected.
- Personal-memory writes require a literal JSON boolean `consent: true`; coerced values such as `1` or `"true"` are not consent.


## Personal memory encryption at rest

Personal-memory values are encrypted with AES-256-GCM before SQLite persistence. The encryption key is derived with domain separation from `USEIT_MEMORY_SECRET`; keep that secret in the host's secret manager and back up the database and secret together. Existing plaintext rows are migrated transactionally on first access after upgrading. If the secret is missing/weak or ciphertext authentication fails, the memory API fails closed rather than returning plaintext or corrupt data.
