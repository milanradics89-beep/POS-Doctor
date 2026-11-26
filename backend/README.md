# USEIT Intelligence API

Minimal production-oriented vision service for the mobile app.

## Run

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=...
export USEIT_VISION_MODEL=gpt-5.6-luna
uvicorn main:app --host 0.0.0.0 --port 8000
```

Health: `GET /health`

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
non-root user. The build does not receive, copy, or bake runtime secrets into the
image. The root `.dockerignore` excludes environment files and, under `backend/`,
credential/secret directories, JSON files, private keys, certificates,
and local database files, in addition to tests, local tooling, and frontend assets.
Keep runtime credentials outside the repository wherever possible.

A GitHub Actions workflow builds the image on pull requests and mainline changes
that affect the backend/container definition. It builds only and does not publish
to Artifact Registry or authenticate to Google Cloud.

## Cloud Run deployment gate

A successful container build is not deployment acceptance. The current production
backend still requires shared TLS Redis for distributed rate limiting and may use
Redis for one-time attestation challenges; personal memory currently uses encrypted
SQLite. These process/local-disk and shared-state dependencies must be migrated
and validated against the approved Firestore design before a stateless multi-instance
Cloud Run deployment. Do not set production to memory rate limiting, use local SQLite
as persistent storage, add Memorystore, or silently bypass production security checks.

The confirmed Google Cloud project is `useit-platform-2026` (display name
`USEIT`, project number `386862694550`). Staging deployment remains gated on
the Firestore adapter tests, least-privilege deployment IAM/WIF verification,
billing/region/cost approval, and a reviewed Cloud Run configuration.
