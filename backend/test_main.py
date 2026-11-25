import json
import os
from unittest.mock import AsyncMock, Mock, patch

import pytest
from fastapi.testclient import TestClient
from pydantic import ValidationError

from backend import main

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
    assert 'Analyze the whole room' in call['messages'][0]['content']
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
