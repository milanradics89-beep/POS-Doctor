import json
import os
from unittest.mock import Mock, patch
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def valid_output():
    return {
        'sceneType': 'room',
        'summary': 'A living room.',
        'items': [{'name': 'sofa', 'category': 'furniture', 'confidence': 0.98, 'attributes': ['grey']}],
        'constraints': [],
        'opportunities': [{'id': 'room-1', 'title': 'Improve layout', 'description': 'Open the walking path.', 'kind': 'improve', 'effort': 'easy', 'durationMinutes': 15, 'requiredItems': ['sofa'], 'missingItems': [], 'visualizable': True}],
        'safetyNotes': [],
    }


def test_health():
    r = client.get('/health')
    assert r.status_code == 200
    assert r.json()['responseFormat'] == 'scene_analysis_v1'


def test_rejects_wrong_response_format():
    r = client.post('/v1/analyze', json={'imageUri': 'data:image/jpeg;base64,' + 'a' * 32, 'responseFormat': 'old'})
    assert r.status_code == 400


def test_requires_api_key():
    with patch.dict(os.environ, {}, clear=True):
        r = client.post('/v1/analyze', json={'imageUri': 'data:image/jpeg;base64,' + 'a' * 32})
    assert r.status_code == 503


def test_analyze_passes_image_and_policy():
    mock = Mock()
    mock.responses.create.return_value = Mock(output_text=json.dumps(valid_output()))
    with patch.dict(os.environ, {'OPENAI_API_KEY': 'test-key'}, clear=False), patch('main.client', mock):
        r = client.post('/v1/analyze', json={'imageUri': 'data:image/jpeg;base64,' + 'a' * 32, 'userIntent': 'improve', 'prompt': 'Analyze the whole room.', 'locale': 'hu-HU', 'responseFormat': 'scene_analysis_v1'})
    assert r.status_code == 200
    call = mock.responses.create.call_args.kwargs
    assert call['input'][0]['content'][1]['type'] == 'input_image'
    assert 'Analyze the whole room' in call['instructions']
    assert call['text']['format']['name'] == 'useit_scene_analysis'


def test_invalid_image_uri_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri': 'not-an-image'})
    assert r.status_code == 422


def test_oversized_prompt_is_rejected_by_validation():
    r = client.post('/v1/analyze', json={'imageUri': 'data:image/jpeg;base64,' + 'a' * 32, 'prompt': 'x' * 20_001})
    assert r.status_code == 422
