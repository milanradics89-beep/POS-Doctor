#!/usr/bin/env bash
set -euo pipefail

export USEIT_ENV=production
export OPENAI_API_KEY="${OPENAI_API_KEY:-ci-placeholder}"
export USEIT_API_KEY="${USEIT_API_KEY:-ci-placeholder}"
export USEIT_CORS_ORIGINS="${USEIT_CORS_ORIGINS:-https://useit.example.com}"
export USEIT_ALLOW_DOCS="false"

python -m compileall -q backend
python -m pytest -q backend/test_production_security.py backend/test_production_security_additional.py backend/test_privacy_logging.py
