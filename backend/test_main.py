import json
import os
from unittest.mock import AsyncMock, Mock, patch

from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


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


def test_invalid_image_uri_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri':'not-an-image'})
    assert r.status_code == 422


def test_unsupported_image_mime_is_rejected():
    r = client.post('/v1/analyze', json={'imageUri':'data:text/plain;base64,' + 'a' * 32})
    assert r.status_code == 422


def test_oversized_prompt_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri':'data:image/jpeg;base64,' + 'a' * 32,'prompt':'x' * 20_001})
    assert r.status_code == 422
