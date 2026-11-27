import json
import os
from unittest.mock import AsyncMock, Mock, patch

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from backend import main
from backend.idempotency_store import IdempotencyClaim, IdempotencyClaimResult, IdempotencyDecision

client = TestClient(main.app)


def valid_output():
    return {'sceneType':'room','summary':'A living room.','items':[{'name':'sofa','category':'furniture','confidence':0.98,'attributes':['grey']}],'constraints':[],'opportunities':[{'id':'room-1','title':'Improve layout','description':'Open the walking path.','kind':'improve','effort':'easy','durationMinutes':15,'requiredItems':['sofa'],'missingItems':[],'visualizable':True}],'safetyNotes':[]}


def test_health():
    r = client.get('/health')
    assert r.status_code == 200
    assert r.json()['responseFormat'] == 'scene_analysis_v1'


def test_rejects_wrong_response_format():
    r = client.post('/v1/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32,'responseFormat':'old'})
    assert r.status_code == 400


def test_requires_api_key():
    with patch.dict(os.environ, {}, clear=True):
        r = client.post('/v1/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32})
    assert r.status_code == 503


def test_analyze_passes_image_and_policy():
    mock_client = Mock()
    mock_client.chat.completions.create = AsyncMock(return_value=Mock(choices=[Mock(message=Mock(content=json.dumps(valid_output())))]))
    with patch.dict(os.environ, {'OPENAI_API_KEY':'test-key'}, clear=False), patch('backend.main._get_client', return_value=mock_client):
        r = client.post('/v1/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32,'userIntent':'improve','prompt':'Analyze the whole room.','locale':'hu-HU','responseFormat':'scene_analysis_v1'})
    assert r.status_code == 200
    call = mock_client.chat.completions.create.call_args.kwargs
    assert call['messages'][1]['content'][1]['type'] == 'image_url'
    assert 'Analyze the whole room' not in call['messages'][0]['content']
    assert 'Analyze the whole room' in call['messages'][1]['content'][0]['text']
    assert call['response_format']['json_schema']['name'] == 'useit_scene_analysis'
    assert call['max_completion_tokens'] == main.VISION_MAX_COMPLETION_TOKENS



def test_vision_completion_token_budget_is_bounded():
    assert main._load_vision_max_completion_tokens("256") == 256
    assert main._load_vision_max_completion_tokens("8192") == 8192
    for invalid in ("not-an-integer", "255", "8193", "0"):
        with pytest.raises(RuntimeError):
            main._load_vision_max_completion_tokens(invalid)


def test_oversized_image_data_uri_is_rejected_by_validation():
    prefix = "data:image/jpeg;base64,"
    uri = prefix + "A" * (main.MAX_IMAGE_DATA_URI_BYTES - len(prefix) + 1)
    with pytest.raises(ValidationError):
        main.AnalyzeRequest.model_validate({"imageUri": uri})


def test_useit_analyze_returns_versioned_contract():
    scene = valid_output()
    intent = {'name': 'improve', 'confidence': 0.9}
    with patch('backend.main._analyze', new=AsyncMock(return_value=scene)), \
         patch('backend.main.classify_intent', return_value=intent), \
         patch('backend.main.rank_opportunities', return_value=[]), \
         patch('backend.main.derive_scene_facts', return_value=[]), \
         patch('backend.main.derive_scene_reasoning', return_value=[]), \
         patch('backend.main.build_specialist_context', return_value={'profile':'home-design'}):
        r = client.post('/v1/useit/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32,'userIntent':'improve'})
    assert r.status_code == 200
    assert r.json()['contractVersion'] == 'useit_analyze_v1'
    assert r.json()['intent'] == intent
    assert r.json()['pipeline'][-1] == 'plan'


def test_invalid_image_uri_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri':'not-an-image'})
    assert r.status_code == 422


def test_unsupported_image_mime_is_rejected():
    r = client.post('/v1/analyze', json={'imageUri':'data:text/plain;base64,' + 'a' * 32})
    assert r.status_code == 422


def test_oversized_prompt_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32,'prompt':'x' * 20_001})
    assert r.status_code == 422



def test_user_intent_length_is_bounded():
    r = client.post('/v1/analyze', json={
        'imageUri': 'data:image/jpeg;base64,' + 'a' * 32,
        'userIntent': 'x' * 2_001,
    })
    assert r.status_code == 422


def test_malformed_image_base64_is_rejected():
    r = client.post('/v1/analyze', json={'imageUri': 'data:image/jpeg;base64,not valid base64!!!'})
    assert r.status_code == 422


def test_image_url_rejects_localhost_before_model_call():
    r = client.post('/v1/analyze', json={'imageUri': 'http://localhost:8000/image.jpg'})
    assert r.status_code == 422



class FakeIdempotencyStore:
    def __init__(self, decision=IdempotencyDecision.CLAIMED, *, completed=True, claim_error=None):
        claim = IdempotencyClaim(document_id="a" * 64, lease_token="test-lease-token") if decision is IdempotencyDecision.CLAIMED else None
        self.claim = AsyncMock(
            return_value=IdempotencyClaimResult(decision=decision, claim=claim),
            side_effect=claim_error,
        )
        self.mark_completed = AsyncMock(return_value=completed)
        self.mark_outcome_unknown = AsyncMock(return_value=True)
        self.release_before_provider_start = AsyncMock(return_value=True)


def _patch_useit_response(monkeypatch, scene=None):
    scene = scene or valid_output()
    monkeypatch.setattr(main, "_get_client", lambda: Mock())
    monkeypatch.setattr(main, "_analyze", AsyncMock(return_value=scene))
    monkeypatch.setattr(main, "classify_intent", lambda *_: {"name": "improve", "confidence": 0.9})
    monkeypatch.setattr(main, "rank_opportunities", lambda *_args, **_kwargs: [])
    monkeypatch.setattr(main, "derive_scene_facts", lambda *_: [])
    monkeypatch.setattr(main, "derive_scene_reasoning", lambda *_: [])
    monkeypatch.setattr(main, "build_specialist_context", lambda *_: {"profile": "home-design"})
    monkeypatch.setattr(main, "reserve_units", AsyncMock(return_value=None))


def _idempotent_analysis_request():
    return {"imageUri": "data:image/jpeg;base64," + "a" * 32, "userIntent": "improve"}


def test_legacy_unkeyed_client_remains_compatible_with_firestore_enabled(monkeypatch):
    store = FakeIdempotencyStore()
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    _patch_useit_response(monkeypatch)
    response = client.post("/v1/useit/analyze", json=_idempotent_analysis_request())
    assert response.status_code == 200
    store.claim.assert_not_awaited()


def test_useit_analyze_claims_and_completes_same_request_key(monkeypatch):
    store = FakeIdempotencyStore()
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    _patch_useit_response(monkeypatch)
    key = "analysis-test-key-123456"
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": key},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 200
    assert response.json()["contractVersion"] == "useit_analyze_v1"
    store.claim.assert_awaited_once()
    claimed_key, fingerprint = store.claim.await_args.args
    assert claimed_key == key
    assert b"data:image/jpeg" in fingerprint
    store.mark_completed.assert_awaited_once()
    store.mark_outcome_unknown.assert_not_awaited()


def test_useit_analyze_duplicate_does_not_call_openai(monkeypatch):
    store = FakeIdempotencyStore(IdempotencyDecision.DUPLICATE)
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    analyze = AsyncMock()
    monkeypatch.setattr(main, "_analyze", analyze)
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 409
    analyze.assert_not_awaited()
    store.mark_completed.assert_not_awaited()


def test_useit_analyze_payload_mismatch_does_not_call_openai(monkeypatch):
    store = FakeIdempotencyStore(IdempotencyDecision.PAYLOAD_MISMATCH)
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    analyze = AsyncMock()
    monkeypatch.setattr(main, "_analyze", analyze)
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 409
    analyze.assert_not_awaited()


def test_useit_analyze_releases_claim_when_openai_client_is_not_configured(monkeypatch):
    store = FakeIdempotencyStore()
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    monkeypatch.setattr(main, "_get_client", Mock(side_effect=RuntimeError("not configured")))
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 503
    store.release_before_provider_start.assert_awaited_once()
    store.mark_outcome_unknown.assert_not_awaited()


@pytest.mark.parametrize("status_code", [429, 503])
def test_useit_analyze_releases_claim_when_budget_reservation_fails(monkeypatch, status_code):
    from fastapi import HTTPException

    store = FakeIdempotencyStore()
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    monkeypatch.setattr(main, "_get_client", lambda: Mock())
    reserve = AsyncMock(side_effect=HTTPException(status_code=status_code, detail="budget unavailable"))
    monkeypatch.setattr(main, "reserve_units", reserve)
    analyze = AsyncMock()
    monkeypatch.setattr(main, "_analyze", analyze)

    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )

    assert response.status_code == status_code
    reserve.assert_awaited_once_with(main.app, 1)
    analyze.assert_not_awaited()
    store.release_before_provider_start.assert_awaited_once()
    store.mark_outcome_unknown.assert_not_awaited()


def test_useit_analyze_marks_provider_outcome_unknown_after_failure(monkeypatch):
    from fastapi import HTTPException

    store = FakeIdempotencyStore()
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    monkeypatch.setattr(main, "_get_client", lambda: Mock())
    monkeypatch.setattr(main, "_analyze", AsyncMock(side_effect=HTTPException(status_code=502, detail="Vision analysis failed.")))
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 502
    store.mark_outcome_unknown.assert_awaited_once()
    store.mark_completed.assert_not_awaited()


def test_useit_analyze_fails_closed_when_firestore_claim_is_unavailable(monkeypatch):
    store = FakeIdempotencyStore(claim_error=RuntimeError("emulator unavailable"))
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    analyze = AsyncMock()
    monkeypatch.setattr(main, "_analyze", analyze)
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 503
    analyze.assert_not_awaited()


def test_useit_analyze_fails_closed_when_claim_completion_cannot_be_confirmed(monkeypatch):
    store = FakeIdempotencyStore(completed=False)
    monkeypatch.setattr(main.app.state, "idempotency_store", store, raising=False)
    _patch_useit_response(monkeypatch)
    response = client.post(
        "/v1/useit/analyze",
        headers={"Idempotency-Key": "analysis-test-key-123456"},
        json=_idempotent_analysis_request(),
    )
    assert response.status_code == 503
    store.mark_completed.assert_awaited_once()
    store.mark_outcome_unknown.assert_awaited_once()
