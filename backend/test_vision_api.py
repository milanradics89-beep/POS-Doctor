import json

import pytest
from fastapi import HTTPException

from backend import main
from backend.main import AnalyzeRequest, _analyze


class FakeCompletions:
    def __init__(self, content):
        self.content = content
        self.calls = []

    async def create(self, **kwargs):
        self.calls.append(kwargs)
        return type(
            "Response",
            (),
            {"choices": [type("Choice", (), {"message": type("Message", (), {"content": self.content})()})()]},
        )()


class FakeClient:
    def __init__(self, content):
        self.chat = type("Chat", (), {"completions": FakeCompletions(content)})()


def valid_scene():
    return {
        "sceneType": "objects",
        "summary": "A visible lamp on a table.",
        "items": [
            {
                "name": "lamp",
                "category": "lighting",
                "confidence": 0.96,
                "attributes": ["black"],
            }
        ],
        "constraints": [],
        "opportunities": [
            {
                "id": "o1",
                "title": "Improve the lighting",
                "description": "Use the lamp as a focused light source.",
                "kind": "improve",
                "effort": "easy",
                "durationMinutes": 5,
                "requiredItems": ["lamp"],
                "missingItems": [],
                "visualizable": False,
            }
        ],
        "safetyNotes": [],
    }


def test_image_request_accepts_supported_data_uri():
    request = AnalyzeRequest(imageUri="data:image/jpeg;base64," + ("A" * 32))
    assert request.imageUri.startswith("data:image/jpeg;base64,")


def test_image_request_rejects_unsupported_scheme():
    with pytest.raises(ValueError):
        AnalyzeRequest(imageUri="file:///tmp/image.jpg")


@pytest.mark.asyncio
async def test_analyze_uses_real_multimodal_message_and_strict_schema(monkeypatch):
    fake = FakeClient(json.dumps(valid_scene()))
    monkeypatch.setattr(main, "_get_client", lambda: fake)

    result = await _analyze(
        AnalyzeRequest(
            imageUri="data:image/jpeg;base64," + ("A" * 32),
            userIntent="improve",
            locale="hu-HU",
        )
    )

    call = fake.chat.completions.calls[0]
    user_content = call["messages"][1]["content"]
    assert any(part.get("type") == "image_url" for part in user_content)
    assert call["response_format"]["type"] == "json_schema"
    assert call["response_format"]["json_schema"]["strict"] is True
    assert result["sceneType"] == "objects"
    assert result["responseFormat"] == "scene_analysis_v1"


@pytest.mark.asyncio
async def test_analyze_rejects_unsupported_response_format_before_model_call(monkeypatch):
    called = False

    async def fail_if_called(**kwargs):
        nonlocal called
        called = True
        raise AssertionError("model must not be called")

    fake = FakeClient(json.dumps(valid_scene()))
    fake.chat.completions.create = fail_if_called
    monkeypatch.setattr(main, "_get_client", lambda: fake)

    with pytest.raises(HTTPException) as exc:
        await _analyze(
            AnalyzeRequest(
                imageUri="data:image/jpeg;base64," + ("A" * 32),
                responseFormat="unknown",
            )
        )

    assert exc.value.status_code == 400
    assert called is False


@pytest.mark.asyncio
async def test_analyze_surfaces_missing_vision_configuration(monkeypatch):
    def unavailable_client():
        raise HTTPException(503, "Vision service is not configured.")

    monkeypatch.setattr(main, "_get_client", unavailable_client)

    with pytest.raises(HTTPException) as exc:
        await _analyze(AnalyzeRequest(imageUri="data:image/jpeg;base64," + ("A" * 32)))

    assert exc.value.status_code == 503
