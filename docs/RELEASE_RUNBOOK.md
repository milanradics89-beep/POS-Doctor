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

### Latest exact-head CI record (2026-10-31)

PR #41 head: `8f082f4839cfb86ee055980bb64eb74c151e4dc1`.

- [Validation run 41183600664](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600664): completed successfully. [Frontend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600664/job/124485886411) passed the source-boundary guard, TypeScript typecheck, unit tests, Expo Doctor, Android export, Android Release APK build, emulator install/launch smoke test, and the configured runtime dependency audit. [iOS job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600664/job/124485886469) passed native project generation, CocoaPods installation, iOS Release simulator build, and simulator install/launch. [Backend job](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600664/job/124485886721) passed compilation, the full backend test suite with Redis 7.4, production-readiness checks, and the backend dependency audit.
- [CodeQL run 41183600663](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600663): completed successfully; the exact-head CodeQL check reports no new alerts in code changed by this pull request.
- [Dependency Review run 41183600708](https://github.com/milanradics89-beep/POS-Doctor/actions/runs/41183600708): completed successfully with 0 vulnerable packages, 0 incompatible licenses, 0 invalid SPDX definitions, 1 unknown-license package, and 2 OpenSSF Scorecard warnings. Keep these warnings visible; a successful workflow is not an owner risk acceptance.
- The historical inline review findings for App Attest enrollment persistence, backend verifier test expectations, and effective Fetch `Request` / `init` header semantics are resolved. The current branch also covers valid-base64 privacy logging, sanitized error-boundary logging, and permanent camera/gallery permission recovery through Settings.
- The frontend command `npm audit --omit=dev --audit-level=high` exited successfully at its configured high-severity threshold, but its report contains 11 **moderate** advisories in the transitive `glob@13.0.6` and `minimatch@10.2.6` dependency paths pulled through Expo SDK 57 tooling. No high/critical npm-audit findings were reported on this head. These npm-audit findings are separate from Dependency Review's 0 vulnerable-package summary and remain open under backlog item 3. The suggested `npm audit fix --force` would downgrade Expo to `51.0.39` (a breaking SDK change); do not apply that suggestion. Verify a compatible upstream fix or record an explicit owner risk decision.
- Dependency Review's unknown-license entry is the local `deepmerge@4.3.2` link: its vendored package manifest and LICENSE declare MIT, while the lockfile link record omits license metadata. The two Scorecard warnings are `@expo/devcert@1.2.2` (2.9) and `is-mergeable-object@1.1.1` (1.5).

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

For multi-instance deployments, use USEIT_RATE_LIMIT_MODE=redis and a shared Redis instance. Memory-mode rate limiting is process-local and is suitable only for development or a single-instance deployment. Redis rate-limit increments must be atomic with their TTL assignment; the current implementation uses one Lua operation and explicit 2-second connection / 5-second socket timeouts. If Redis is unavailable, rate limiting fails closed with HTTP 503. Set explicit rate limits and request timeouts based on observed traffic and cost.

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
