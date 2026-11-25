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

## Firestore idempotency adapter integration tests

The Firestore-backed idempotency store is exercised against the local Firestore emulator; it does not require a Google Cloud project or credentials.

```bash
gcloud --project=useit-test emulators firestore start --host-port=127.0.0.1:8080
```

In another terminal:

```bash
export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
export GOOGLE_CLOUD_PROJECT=useit-test
python -m pytest -q backend/test_idempotency_store.py
```

The adapter persists only HMAC digests and lifecycle metadata. It never stores the raw idempotency key, request body, image, prompt or model response. The emulator tests use two independent clients to exercise concurrent transactional claims. The canonical `POST /v1/useit/analyze` route uses this store when `USEIT_IDEMPOTENCY_MODE=firestore`; callers must send a 16–128 character `Idempotency-Key`. An active/completed duplicate returns HTTP 409, and reusing a key with a different request fingerprint also returns HTTP 409. The client generates a key for each new analysis and accepts a caller-supplied key so a controlled retry can reuse it. POST retries remain disabled. If the provider outcome is uncertain, the claim is retained until its application-checked expiry; responses are not cached. Production startup fails closed unless Firestore mode, a Secret Manager-injected `USEIT_IDEMPOTENCY_SECRET` (at least 32 UTF-8 bytes), a Firestore project ID and a reachable Firestore store are available through the Cloud Run runtime identity. There is no process-local fallback. This change does not replace the existing Redis rate-limit or attestation adapters; those remain separate migration work and still block the agreed all-Firestore production architecture.
