# USEIT release and production runbook

This runbook is the release gate for the USEIT mobile app and backend. A green unit-test run alone is not a production approval.

## 1. Required CI evidence

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

### Latest verified release evidence (2026-11-02; PR #41)

PR #41 remains open and unmerged. Separate the latest application-source validation from the documentation-only evidence snapshot; neither parent SHA should be mislabeled as a later commit current HEAD.

The latest source-changing commit is [d7aeb212fbd3c47009edbb981540a09e3c431a3f](https://github.com/milanradics89-beep/POS-Doctor/commit/d7aeb212fbd3c47009edbb981540a09e3c431a3f), which fixes middleware ordering and request-ID propagation for early 429 rate-limit and 503 Redis-failure responses. Its exact-SHA checks all passed:
- [Validation 41444092424](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424): backend [125272796054](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272796054), frontend/Android [125272796035](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272796035), and iOS [125272795628](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092424/job/125272795628) succeeded. Backend: **356 passed, 1 warning**; production-readiness suites: **24 passed, 1 warning** and **22 passed**. The warning is the Starlette/httpx TestClient deprecation. Redis 7.4 emitted a runner-host `vm.overcommit_memory` warning. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL 41444092433](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433), analyze job [125272795044](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092433/job/125272795044), succeeded. It scanned 181/181 TypeScript, 2/2 JavaScript, 71/71 Python, and 4/4 GitHub Actions files; SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review 41444092673](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673), job [125272795920](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41444092673/job/125272795920), succeeded with no high-or-higher vulnerable packages. Warnings remain for unknown license metadata on `vendor/deepmerge@4.3.2` and low Scorecard results for `@expo/devcert` (2.9) and `is-mergeable-object` (1.5).
- The frontend runtime audit passed its configured high threshold but still reports **11 moderate transitive `glob`/`minimatch` advisories**. No forced Expo downgrade or threshold reduction was applied.

The last fully validated documentation-only snapshot before this refresh was [ba0ffaccbb2ac18a61088196f1a5ba7790c489ee](https://github.com/milanradics89-beep/POS-Doctor/commit/ba0ffaccbb2ac18a61088196f1a5ba7790c489ee). Its exact-SHA workflows all succeeded:
- [Validation 41468731627](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731627): backend [125373668529](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731627/job/125373668529), frontend/Android [125373581344](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731627/job/125373581344), and iOS [125373584201](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731627/job/125373584201) succeeded. Backend again reported 356 passed, 1 Starlette/httpx deprecation warning; production-readiness suites reported 24 passed, 1 warning and 22 passed. Android Release/emulator and iOS Release simulator build/install/launch passed.
- [CodeQL 41468731317](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731317), analyze job [125356384036](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731317/job/125356384036), succeeded and scanned 181 TypeScript, 2 JavaScript, 71 Python, and 4 GitHub Actions files. SARIF merge emitted a column-kind mismatch warning.
- [Dependency Review 41468731369](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731369), job [125356383361](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41468731369/job/125356383361), succeeded with no high-or-higher vulnerable packages and no denied packages. The PR summary reports the same unknown-license metadata warning and two low Scorecard warnings.

This documentation refresh does not change application code. Its own commit must independently pass the PR checks before merge; use the live PR #41 check results for that commit rather than treating either parent SHA above as the current PR HEAD.

Exact observed check contexts are `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`. Android Release/emulator validation is included in `frontend`.

Seven inline PR #41 review threads exist: six are resolved and one P2 finding about the 25-point status tally remains open. This refresh corrects the tally to 3 Done / 15 In Progress / 7 Blocked; resolve that thread only after this commit is reviewed and its CI is complete. The previously tracked POST retry/auth, Request headers/method, valid base64 privacy fixture, sanitized error logging, and Settings recovery findings remain covered by source/tests.

[Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) is now closed as completed. Repository ruleset [26370589](https://github.com/milanradics89-beep/POS-Doctor/rules/26370589) is active for `~DEFAULT_BRANCH` (main), requires strict status checks `CodeQL`, `backend`, `frontend`, `ios`, `analyze`, and `dependency-review`, requires a PR and one approval, dismisses stale approvals, requires last-push approval and review-thread resolution, blocks deletion/non-fast-forward updates, and has no bypass actors. The main branch API reports `protected: true`. The GitHub compare shows this release branch is 2 commits behind main (main HEAD 7ef22a6114d88c4a7e7aff7f9ab48544c7d18bf0); the two commits after PR base cfa52e0573bb4b9af8cb7e1e818e2075f13d56aa have no net file-level changes. Synchronize branch ancestry before merge to satisfy the strict up-to-date ruleset. The legacy branch-protection detail endpoint still returns HTTP 403 to the connected integration; the active ruleset itself was readable and verified.

The GitHub releases endpoint is empty. Complete code-scanning, Dependabot, and secret-scanning alert inventories are not exposed by the connected integration; their full status remains **unverified**.

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
