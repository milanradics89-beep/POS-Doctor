import json
from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from fastapi.testclient import TestClient

from backend import main
from backend.actionable_results import ACTIONABLE_SCHEMA, MODE_DIRECTIONS
from backend.vision_contract import SCHEMA

IMAGE = "data:image/png;base64,c3ludGhldGljLXBob3Rv"


def observed(name):
    return {"name": name, "category": "ingredient", "confidence": 0.93, "attributes": []}


def opportunity(mode, evidence, opportunity_id):
    return {
        "id": opportunity_id, "title": "A grounded idea", "description": "Start with the visible item.",
        "kind": mode, "effort": "easy", "durationMinutes": 10, "requiredItems": evidence,
        "missingItems": [], "visualizable": mode == "improve", "evidence": evidence,
        "steps": ["Set aside the visible item."], "alternatives": [], "limits": [], "keep": [],
    }


def connect_model(monkeypatch, mode, visible):
    payload = {
        "sceneType": "room", "summary": "A test scene with an identifiable everyday item.",
        "items": [observed(visible)], "relations": [], "constraints": [],
        "opportunities": [
            opportunity(mode, ["tomato"], "grounded"),
            opportunity(mode, ["imagined item"], "unsupported"),
        ],
        "safetyNotes": ["Check before use."], "clarification": "",
        "shoppingNeed": {"summary": "Find a tray for the tomato.", "evidence": ["tomato"], "searchTerms": ["produce tray", "low rim"]},
    }
    create = AsyncMock(return_value=SimpleNamespace(choices=[SimpleNamespace(message=SimpleNamespace(content=json.dumps(payload)))]))
    monkeypatch.setattr(main, "_get_client", lambda: SimpleNamespace(chat=SimpleNamespace(completions=SimpleNamespace(create=create))))
    return create


@pytest.mark.parametrize("mode", MODE_DIRECTIONS)
def test_each_mode_gets_image_mode_policy_and_grounded_result(monkeypatch, mode):
    create = connect_model(monkeypatch, mode, "tomato")
    discover = AsyncMock(return_value={"query": "produce tray low rim", "candidates": [], "errors": []})
    monkeypatch.setattr(main, "discover_products", discover)
    response = TestClient(main.app).post("/v1/useit/analyze", json={
        "imageUri": IMAGE, "userIntent": mode, "actionable": True,
        "refinement": "Use only what is visible.", "locale": "en-HU",
    })
    assert response.status_code == 200
    result = response.json()
    assert result["contractVersion"] == "useit_analyze_v1"
    assert result["intent"]["name"] == mode
    assert result["scene"]["safetyNotes"] == ["Check before use."]
    call = create.await_args.kwargs
    assert call["response_format"]["json_schema"]["schema"] == ACTIONABLE_SCHEMA
    assert "evidence" not in SCHEMA["properties"]["opportunities"]["items"]["properties"]
    assert MODE_DIRECTIONS[mode] in call["messages"][0]["content"]
    assert "Use only what is visible." not in call["messages"][0]["content"]
    assert "Use only what is visible." in call["messages"][1]["content"][0]["text"]
    assert call["messages"][1]["content"][1]["image_url"]["url"] == IMAGE
    details = result["actionable"]
    assert list(details["guides"]) == ["grounded"]
    assert details["guides"]["grounded"]["steps"] == ["Set aside the visible item."]
    assert details["shoppingNeed"]["evidence"] == ["tomato"]
    assert details["shoppingNeed"]["searchTerms"] == ["produce tray", "low rim"]
    discover.assert_not_called()


@pytest.mark.parametrize("mode", ["cook", "improve"])
def test_missing_evidence_does_not_unlock_steps_or_search(monkeypatch, mode):
    connect_model(monkeypatch, mode, "apple")
    discover = AsyncMock()
    monkeypatch.setattr(main, "discover_products", discover)
    result = TestClient(main.app).post("/v1/useit/analyze", json={
        "imageUri": IMAGE, "userIntent": mode, "actionable": True,
    }).json()
    assert result["actionable"]["guides"] == {}
    assert result["actionable"]["shoppingNeed"] is None
    discover.assert_not_called()


def test_retry_without_a_claim_store_does_not_call_openai(monkeypatch):
    create = connect_model(monkeypatch, "cook", "tomato")
    monkeypatch.setattr(main.app.state, "idempotency_store", None, raising=False)
    r = TestClient(main.app).post("/v1/useit/analyze", headers={
        "Idempotency-Key": "retry-a-single-request", "X-USEIT-Retry": "true",
    }, json={"imageUri": IMAGE, "userIntent": "cook", "actionable": True})
    assert r.status_code == 409
    create.assert_not_called()
