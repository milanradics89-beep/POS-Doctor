#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

python3 -m venv backend/.venv
source backend/.venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r backend/requirements.txt

if command -v npm >/dev/null 2>&1; then
  npm install
else
  echo "npm is required for the Expo frontend." >&2
  exit 1
fi

echo "USEIT setup complete. Configure backend/.env and .env before running the app."
