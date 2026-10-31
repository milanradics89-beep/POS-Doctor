import logging

from backend.privacy_logging import log_event, redact_value, safe_event


def test_sensitive_values_are_redacted():
    fields = safe_event({
        "imageUri": "data:image/png;base64,SECRET",
        "api_key": "SECRET",
        "userIntent": "private shopping intent",
        "user_intent": "private alternate intent",
        "prompt": "private model prompt",
        "userPrompt": "private camel-case prompt",
        "user-prompt": "private hyphenated prompt",
    })
    assert fields["imageUri"] == "[REDACTED]"
    assert fields["api_key"] == "[REDACTED]"
    assert fields["userIntent"] == "[REDACTED]"
    assert fields["user_intent"] == "[REDACTED]"
    assert fields["prompt"] == "[REDACTED]"
    assert fields["userPrompt"] == "[REDACTED]"
    assert fields["user-prompt"] == "[REDACTED]"


def test_data_uri_is_never_logged():
    assert redact_value("payload", "data:image/jpeg;base64,SECRET") == "[REDACTED_IMAGE]"


def test_log_event_uses_redacted_structured_fields(caplog):
    logger = logging.getLogger("privacy-test")
    with caplog.at_level(logging.INFO):
        log_event(
            logger,
            "analysis",
            imageUri="data:image/png;base64,SECRET",
            userIntent="private intent sentinel",
            prompt="private prompt sentinel",
        )
    assert "SECRET" not in caplog.text
    assert "private intent sentinel" not in caplog.text
    assert "private prompt sentinel" not in caplog.text
    assert "[REDACTED]" in caplog.text


def test_log_event_redacts_memory_capability_from_path(caplog):
    logger = logging.getLogger("privacy-memory-path-test")
    memory_id = "MEMORY_CAPABILITY_SENTINEL_0123456789"
    with caplog.at_level(logging.INFO):
        log_event(
            logger,
            "request_completed",
            path=f"/v1/memory/{memory_id}",
            statusCode=200,
        )

    assert memory_id not in caplog.text
    assert "/v1/memory/[REDACTED]" in caplog.text
