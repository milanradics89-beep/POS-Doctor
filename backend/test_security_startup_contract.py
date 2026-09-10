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
