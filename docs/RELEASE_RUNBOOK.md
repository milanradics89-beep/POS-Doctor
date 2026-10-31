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

### Latest fully validated PR #41 head (2026-10-31)

Exact fully validated PR #41 head SHA: `caff9a7f31ff799e274b27b24647bfe57097c2ea` (documentation-only follow-up; the latest application-code commit remains `c95530f88254697704d45ba385cf0bb3d0ea5170`).

- [Validation run 41226044551](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551): all three jobs completed successfully for this exact PR head. Backend job [124610291326](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551/job/124610291326), iOS job [124610291531](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551/job/124610291531), and frontend job [124610291586](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044551/job/124610291586) all passed.
- [CodeQL run 41226044719](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044719): completed successfully. The exact check-run names are `CodeQL` and `analyze`.
- [Dependency Review run 41226044603](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41226044603): completed successfully. Its PR summary reports 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license metadata warning, and 2 low OpenSSF Scorecard warnings. The known items remain the local `vendor/deepmerge@4.3.2` lockfile license-metadata entry, `@expo/devcert@1.2.2` (Scorecard 2.9), and `is-mergeable-object@1.1.1` (Scorecard 1.5).
- Exact check-run names observed on this head: `CodeQL`, `analyze`, `backend`, `frontend`, `ios`, and `dependency-review`. These names are evidence for an administrator's ruleset picker, not proof that branch protection enforces them.
- The separate frontend `npm audit --omit=dev --audit-level=high` gate passed, but the known 11 moderate transitive `glob@13.0.6` / `minimatch@10.2.6` advisories remain visible. No forced Expo downgrade or audit-threshold reduction was applied.
- All three historical inline PR #41 review threads are resolved. Current source inspection confirms App Attest pending-enrollment recovery, updated invalid-provider test expectations, effective Fetch `Request` / `init` header semantics, explicit-auth POST retry tests, the valid base64 vision-usage fixture, sanitized error-boundary logging, and Settings recovery for permanently denied camera/gallery permissions.
- [Issue #47](https://github.com/milanradics89-beep/POS-Doctor/issues/47) remains open. The rulesets endpoint is empty; reading `main` branch protection returns HTTP 403 to the integration. A repository administrator must create and verify the `main` ruleset using the observed check names in GitHub's available-check picker.
- The GitHub releases endpoint returned an empty list. The connected integration cannot read code-scanning or Dependabot alert inventories; no zero-alert claim is made.

These results validate the complete PR head `caff9a7f31ff799e274b27b24647bfe57097c2ea`, including the documentation follow-up. The application code in this tree is unchanged from `c95530f88254697704d45ba385cf0bb3d0ea5170`. This is automated CI evidence, not a production sign-off: production secrets/provider configuration, physical-device attestation, staging deployment, backups, monitoring delivery, store rollout, pilot thresholds, and human approvals remain unverified. PR #41 remains open and unmerged.

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
