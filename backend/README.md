# USEIT Intelligence API

Minimal production-oriented vision service for the mobile app.

## Run

```bash
pip install -r requirements.txt
export OPENAI_API_KEY=...
export USEIT_VISION_MODEL=gpt-4.1
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


## Billable analysis idempotency

Production `POST /v1/useit/analyze` requires an `Idempotency-Key` header and a Firestore-backed transactional claim. The mobile client reuses the same key when retrying the same photo and intent. A duplicate or mismatched key returns HTTP 409; the API does not cache or replay image/model responses. If provider execution may have started but the outcome is uncertain, the claim remains blocked until expiry. Only a failure proven to occur before provider start may release it.

Configure `USEIT_IDEMPOTENCY_MODE=firestore`, the fixed project `fresh-weft-447913-u6`, a 32-byte-or-longer `USEIT_IDEMPOTENCY_SECRET`, and a 60-3600 second TTL. In Cloud Run, inject the secret from Secret Manager using the backend runtime service identity. The raw key, request body, image, prompt and model response are never stored; Firestore stores only HMAC digests and lifecycle metadata.

Local emulator tests:

```bash
docker run --rm -p 8080:8080 gcr.io/google.com/cloudsdktool/google-cloud-cli:emulators \
  gcloud --project=useit-test emulators firestore start --host-port=0.0.0.0:8080 --quiet
```

In another terminal:

```bash
export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080
export GOOGLE_CLOUD_PROJECT=useit-test
python -m pytest -q backend/test_idempotency_store.py
```

Firestore TTL is asynchronous cleanup only. Application-side expiry checks remain authoritative. Enable the `expires_at` TTL policy only after project/billing approval; no TTL policy or GCP resource is created by this repository change.
