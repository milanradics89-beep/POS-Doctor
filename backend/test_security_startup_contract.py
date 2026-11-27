import os
import subprocess
import sys


def test_production_main_fails_closed_without_required_configuration():
    env = os.environ.copy()
    env["USEIT_ENV"] = "production"
    env.pop("OPENAI_API_KEY", None)
    env.pop("USEIT_API_KEY", None)
    env["USEIT_CORS_ORIGINS"] = "https://useit.example.com"

    result = subprocess.run(
        [sys.executable, "-c", "import backend.main"],
        env=env,
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode != 0
    assert "Missing required production secrets" in (result.stderr + result.stdout)


def test_cloud_run_cannot_select_development_mode(monkeypatch):
    import pytest
    from backend.production_security import production_mode
    monkeypatch.setenv("K_SERVICE", "test-service")
    for mode in ("development", "prodution", ""):
        monkeypatch.setenv("USEIT_ENV", mode)
        with pytest.raises(RuntimeError, match="USEIT_ENV"):
            production_mode()


def test_cloud_run_production_omits_sqlite_routers():
    env = dict(os.environ, USEIT_ENV="production", K_SERVICE="test-service",
               USEIT_RATE_LIMIT_MODE="firestore", USEIT_IDEMPOTENCY_MODE="firestore",
               USEIT_ATTESTATION_MODE="disabled", USEIT_CORS_ORIGINS="https://useit.example",
               OPENAI_API_KEY="synthetic-vision", USEIT_API_KEY="k" * 32)
    for name in ("USEIT_REDIS_URL", "USEIT_SESSION_SECRET", "FIRESTORE_EMULATOR_HOST"):
        env.pop(name, None)
    script = ("from backend.main import app; paths = app.openapi()['paths']; "
              "assert '/v1/useit/analyze' in paths and '/v1/analyze' in paths; "
              "assert not any(p.startswith(('/v1/actions/', '/v1/memory/')) for p in paths)")
    subprocess.run([sys.executable, "-c", script], env=env, check=True)
