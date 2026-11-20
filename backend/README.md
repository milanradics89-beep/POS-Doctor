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
