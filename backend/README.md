# USEIT Intelligence API

Minimal production-oriented vision service for the mobile app.

<!-- coderabbit-ai-generated:v1 -->

<!-- coderabbit-ai-generated-section:v1:bef4a908374f87b694a32f7a06a520be69b60f38e4dd685dcd13dd1aab08f048 -->

## Run locally

From the repository root, use Python 3.12 and Node 22. Run `bash setup.sh`, activate `backend/.venv`, then:

```bash
export USEIT_ENV=development
# Configure OPENAI_API_KEY in your local environment before using real analysis.
python -m uvicorn backend.main:app --host 127.0.0.1 --port 8000 --no-access-log
```

The default vision model is `gpt-4.1`; set `USEIT_VISION_MODEL` to override it. Liveness: `GET /health`. Dependency readiness: `GET /ready`.

For a client on the same machine, set `EXPO_PUBLIC_USEIT_API_URL=https://YOUR-APPROVED-API-HOST` to the reachable HTTPS API; do not embed provider credentials in the client. See [the release register](../docs/RELEASE-REGISTER.md) for durable state, verification and deployment settings.

<!-- /coderabbit-ai-generated:v1 -->

Vision: `POST /v1/analyze`

The API key stays server-side. The mobile app only receives structured scene analysis.

## Outbound product-page networking

Product-page requests use a DNS-pinned HTTPX/httpcore transport. If the deployment network
uses DNS64/NAT64 with a network-specific RFC 6052 translator prefix, configure every
translator prefix in `USEIT_NAT64_PREFIXES` as a comma-separated CIDR. Supported prefix
lengths are `/32`, `/40`, `/48`, `/56`, `/64`, and `/96`; the well-known
`64:ff9b::/96` prefix is checked automatically. Private, reserved, or otherwise
non-global embedded IPv4 destinations are rejected before TCP connection and again
during connected-peer validation. Malformed, non-global, unsupported, or invalid
`/96` prefix configuration fails closed for IPv6 destinations.

Every network-specific translator prefix used by production egress must be listed.
Do not enable DNS64/NAT64 for product-page egress until this setting has been verified
against the deployment's actual translator configuration.


## Container image

Build the backend image from the repository root so Docker can copy the complete
`backend` Python package:

```bash
docker build --pull --file backend/Dockerfile --tag useit-backend:local .
```

The image runs Uvicorn on the Cloud Run-provided `PORT` (default `8080`) as a
non-root user. The root `.dockerignore` excludes common secret-bearing patterns,
including environment files, credential/secret directories, JSON credential files,
private keys, certificates, token/credential text files, and local database files.
These exclusions are a defence-in-depth filter, not a guarantee that arbitrary
secret files are detected. **Never place runtime credentials anywhere inside the
Docker build context or repository.** Supply them at runtime through the approved
secret manager; inspect the build context before any local image is shared.

A GitHub Actions workflow builds the image on pull requests and mainline changes
that affect the backend/container definition. It builds only and does not publish
to Artifact Registry or authenticate to Google Cloud.

## Cloud Run production configuration

A successful local or GitHub Actions container build is **not** deployment acceptance.
The Cloud Run path is designed for stateless, multi-instance operation and uses Firestore
for shared security state. The current code enforces this when `K_SERVICE` is present.

For a new Cloud Run deployment, configure the following through the approved runtime
configuration and Secret Manager path. Never commit secret values or expose them in
`EXPO_PUBLIC_*` variables.

Required Cloud Run state configuration:

- `USEIT_ENV=production`
- `USEIT_RATE_LIMIT_MODE=firestore`
- `USEIT_IDEMPOTENCY_MODE=firestore`
- No Cloud Run project ID is currently usable under the owner instruction. The only
  specified literal is `useit`, which is not a valid Google Cloud project ID (five
  characters; the minimum is six). Do not set `USEIT_FIRESTORE_PROJECT_ID` or
  `GOOGLE_CLOUD_PROJECT` to a different project ID, and do not infer an ID from a
  display name. Cloud Run remains blocked.
- `USEIT_IDEMPOTENCY_SECRET` containing at least 32 UTF-8 bytes, stable across all
  Cloud Run instances and stored server-side only.
- `USEIT_IDEMPOTENCY_TTL_SECONDS` within the supported 60–3600 second range
  (default 600) where a non-default policy is approved.
- `USEIT_AI_DAILY_UNITS` explicitly set to an owner-approved integer from 0 to
  1,000,000 before Cloud Run startup. `0` pauses paid provider work; reservations are
  consumed before dispatch (one unit per vision request and five per image edit).
- `USEIT_REDIS_URL` unset for the Firestore deployment path.
- `FIRESTORE_EMULATOR_HOST` unset in production.

The production security gate also requires a real `OPENAI_API_KEY`, either a valid
server-side `USEIT_API_KEY` or `USEIT_SESSION_SECRET`, explicit HTTPS origins in
`USEIT_CORS_ORIGINS`, and `USEIT_ALLOW_DOCS=false`. When session authentication is
enabled, configure `USEIT_ATTESTATION_MODE=required`, the correct provider and app ID,
and the provider-specific production identity material. For Google Play Integrity this
includes the Play package name and the production Play signing certificate digest pins.
A provider selection alone is not proof of device identity.

### Firestore collections and TTL

The shared Firestore state uses these collections:

- `analysis_idempotency_v1`: billable analysis request claims and terminal outcomes.
- `useit_state_v1`: cross-instance rate-limit/budget state, attestation challenges and
  Apple App Attest key/counter state.

Configure TTL on `expires_at` for `useit_state_v1` only. For an existing
`analysis_idempotency_v1` collection, keep TTL **disabled** until the release-register
migration gate is complete: disable any existing policy before deploying the new
version, drain every old writer, deploy the new code, run the metadata-only migration
dry-run, apply only after explicit operator confirmation, rerun dry-run and require
zero candidates, then re-enable TTL. Only `completed` (and bounded `health_probe`)
records may carry `expires_at`; `processing`, `outcome_unknown`, and unknown/corrupt
claims must never expire automatically. Follow the exact steps in the
[release register](../docs/RELEASE-REGISTER.md). Apple enrollment records have no TTL.
Database creation, TTL policy changes, IAM, billing and paid API enablement are
owner-approved cloud operations, not side effects of this repository or CI.

### SQLite-backed capabilities

The local-host API mounts personal-memory and action routers, which use SQLite.
When `K_SERVICE` is set, `backend/main.py` deliberately does **not** mount those
routers because Cloud Run instances have disposable local filesystems and these
capabilities do not yet have the required durable owner model and hosted-user lifecycle
controls. Do not enable them on Cloud Run by mounting SQLite or treating container
storage as persistent. The Release Register lists the remaining ownership, retention,
migration and export/delete acceptance requirements.

Redis remains supported for compatible non-Cloud-Run or legacy deployments. It is not
the Cloud Run rate-limit/idempotency configuration described above. Do not perform a
rolling Redis-to-Firestore cutover on an existing installation: the release register
requires a separately tested migration/re-enrollment plan, drain, rollback and owner.

### GCP project selection and deployment gate

The only owner-specified GCP project ID is the literal `useit`. Google Cloud rejects
that five-character value because project IDs must be at least six characters. Do not
search for a project by display name, infer a different ID, or use a historical project
ID. The read-only preflight deliberately stops before invoking `gcloud`; GCP inventory,
Cloud Run staging, and deployment remain blocked until the owner explicitly changes
the project-ID instruction. Do not create a replacement project or change IAM, billing,
services, secrets, or deployments.

Staging remains gated on exact project identity, approved billing/SKU eligibility,
region and cost limits, least-privilege WIF/runtime IAM, Firestore database and TTL
readiness, exact-head CI, physical-device App Attest and Play Integrity verification,
backup/restore evidence, monitored alert delivery, rollback rehearsal, representative
AI quality evaluation, and pilot/business approval. See the
[release register](../docs/RELEASE-REGISTER.md) and
[release runbook](../docs/RELEASE_RUNBOOK.md).
