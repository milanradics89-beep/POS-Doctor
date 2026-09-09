# Phase 15: Trust / Privacy / Security

## Security gate implemented

The production configuration boundary now fails closed when required credentials are missing, when CORS origins are absent or contain `*`, or when interactive API documentation is explicitly enabled. Development remains usable without production-only secrets.

## Acceptance evidence

- Required production secrets are validated before production operation.
- Production CORS must use an explicit origin allowlist.
- Wildcard CORS is rejected even when mixed with explicit origins.
- Interactive API documentation is opt-in and rejected by the production guard when enabled.
- Automated regression tests cover development, missing secrets, explicit origins, wildcard origins, and documentation exposure.

## Remaining Phase 15 work

This phase is not complete until the application wiring invokes the guard at startup, API authentication/authorization is verified end-to-end, sensitive data handling and logging are privacy-safe, and security regression tests cover the actual HTTP boundary rather than only helper functions.
