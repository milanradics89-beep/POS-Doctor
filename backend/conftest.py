"""Shared pytest fixtures for isolated backend tests."""

import pytest


@pytest.fixture(autouse=True)
def isolate_default_rate_limits(monkeypatch):
    # The application object is imported once per test process, so its in-memory
    # buckets persist across TestClient instances. Give ordinary tests a high
    # baseline; rate-limit tests set explicit low limits and remain meaningful.
    monkeypatch.setenv("USEIT_RATE_LIMIT_PER_MINUTE", "10000")
    monkeypatch.setenv("USEIT_SESSION_RATE_LIMIT_PER_MINUTE", "10000")
