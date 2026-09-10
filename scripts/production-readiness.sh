#!/usr/bin/env bash
set -euo pipefail

export USEIT_ENV=production
export OPENAI_API_KEY="${OPENAI_API_KEY:-ci-placeholder}"
unset USEIT_API_KEY
export USEIT_SESSION_SECRET="${USEIT_SESSION_SECRET:-ci-session-secret-please-replace-32-chars}"
export USEIT_CORS_ORIGINS="${USEIT_CORS_ORIGINS:-https://useit.example.com}"
export USEIT_ALLOW_DOCS="false"
export USEIT_RATE_LIMIT_MODE="memory"

python -m compileall -q backend
python -m pytest -q backend/test_api_auth.py backend/test_production_security.py backend/test_production_security_additional.py backend/test_privacy_logging.py
