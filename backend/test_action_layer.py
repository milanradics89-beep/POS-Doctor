from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def _configure(monkeypatch, tmp_path):
    monkeypatch.setenv("USEIT_ACTION_DB", str(tmp_path / "actions.sqlite3"))
    monkeypatch.delenv("USEIT_ACTION_ADAPTERS", raising=False)


def test_action_plan_is_deterministic_and_allowlisted(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    payload = {
        "actionType": "shop",
        "title": "Find matching options",
        "candidateIds": ["candidate-1", "candidate-2"],
        "payload": {"comparePrices": True},
        "metadata": {"source": "scene"},
    }
    first = client.post("/v1/actions/plan", json=payload)
    second = client.post("/v1/actions/plan", json=payload)
    assert first.status_code == 200
    assert second.status_code == 200
    assert first.json()["planId"] == second.json()["planId"]
    assert first.json()["requiresConfirmation"] is True

    arbitrary = {**payload, "payload": {"command": "rm -rf /"}}
    assert client.post("/v1/actions/plan", json=arbitrary).status_code == 422


def test_action_payloads_are_typed_and_candidates_are_opaque(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    base = {"actionType": "shop", "title": "Compare", "candidateIds": ["candidate-1"]}
    wrong_type = {**base, "payload": {"comparePrices": "https://example.com"}}
    assert client.post("/v1/actions/plan", json=wrong_type).status_code == 422

    url_candidate = {**base, "candidateIds": ["https://example.com/item"]}
    assert client.post("/v1/actions/plan", json=url_candidate).status_code == 422


def test_action_execution_requires_confirmation_and_fails_closed(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    plan = client.post(
        "/v1/actions/plan",
        json={"actionType": "shop", "title": "Buy item", "candidateIds": ["x"], "payload": {"comparePrices": True}},
    ).json()
    path = f"/v1/actions/{plan['planId']}/execute"

    no_confirmation = client.post(path, json={"idempotencyKey": "idem-12345"})
    assert no_confirmation.status_code == 428

    not_configured = client.post(path, json={"idempotencyKey": "idem-12345", "confirmation": True})
    assert not_configured.status_code == 503


def test_action_idempotency_key_cannot_cross_bind(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    monkeypatch.setenv("USEIT_ACTION_ADAPTERS", "recommend")
    first = client.post(
        "/v1/actions/plan",
        json={"actionType": "recommend", "title": "Recommend", "candidateIds": ["a"]},
    ).json()
    second = client.post(
        "/v1/actions/plan",
        json={"actionType": "recommend", "title": "Recommend", "candidateIds": ["b"]},
    ).json()
    key = "idem-shared-1"
    first_run = client.post(f"/v1/actions/{first['planId']}/execute", json={"idempotencyKey": key})
    replay = client.post(f"/v1/actions/{first['planId']}/execute", json={"idempotencyKey": key})
    cross = client.post(f"/v1/actions/{second['planId']}/execute", json={"idempotencyKey": key})
    assert first_run.status_code == 200
    assert first_run.json()["idempotent"] is False
    assert replay.status_code == 200
    assert replay.json()["idempotent"] is True
    assert cross.status_code == 409
