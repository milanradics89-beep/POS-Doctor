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
        "accessToken": "access-token-sentinel",
        "refreshToken": "refresh-token-sentinel",
        "sessionToken": "session-token-sentinel",
        "clientSecret": "client-secret-sentinel",
        "client_secret": "client-secret-snake-sentinel",
        "X-API-Key": "header-api-key-sentinel",
    })
    assert fields["imageUri"] == "[REDACTED]"
    assert fields["api_key"] == "[REDACTED]"
    assert fields["userIntent"] == "[REDACTED]"
    assert fields["user_intent"] == "[REDACTED]"
    assert fields["prompt"] == "[REDACTED]"
    assert fields["userPrompt"] == "[REDACTED]"
    assert fields["user-prompt"] == "[REDACTED]"
    assert fields["accessToken"] == "[REDACTED]"
    assert fields["refreshToken"] == "[REDACTED]"
    assert fields["sessionToken"] == "[REDACTED]"
    assert fields["clientSecret"] == "[REDACTED]"
    assert fields["client_secret"] == "[REDACTED]"
    assert fields["X-API-Key"] == "[REDACTED]"


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



def test_token_usage_metrics_are_not_mistaken_for_credentials():
    fields = safe_event({
        "promptTokens": 12,
        "completionTokens": 8,
        "totalTokens": 20,
    })

    assert fields == {
        "promptTokens": 12,
        "completionTokens": 8,
        "totalTokens": 20,
    }


def test_log_event_redacts_camel_case_credentials(caplog):
    logger = logging.getLogger("privacy-camel-case-test")
    with caplog.at_level(logging.INFO):
        log_event(
            logger,
            "auth_response",
            accessToken="access-token-sentinel",
            refreshToken="refresh-token-sentinel",
            sessionToken="session-token-sentinel",
            clientSecret="client-secret-sentinel",
        )

    for sentinel in (
        "access-token-sentinel",
        "refresh-token-sentinel",
        "session-token-sentinel",
        "client-secret-sentinel",
    ):
        assert sentinel not in caplog.text
    assert caplog.text.count("[REDACTED]") == 4

def test_log_event_recursively_redacts_nested_structured_fields(caplog):
    logger = logging.getLogger("privacy-nested-structured-test")
    with caplog.at_level(logging.INFO):
        log_event(
            logger,
            "request_context",
            context={
                "Authorization": "Bearer nested-auth-sentinel",
                "profile": {
                    "session_token": "nested-session-sentinel",
                    "imageUri": "data:image/png;base64,NESTED_IMAGE_SENTINEL",
                },
                "events": [
                    {
                        "userPrompt": "nested prompt sentinel",
                        "path": "/v1/memory/nested-memory-capability",
                    }
                ],
                "usage": {"promptTokens": 12, "completionTokens": 8},
            },
            headers=[{"X-API-Key": "nested-api-key-sentinel"}],
        )

    for sentinel in (
        "nested-auth-sentinel",
        "nested-session-sentinel",
        "NESTED_IMAGE_SENTINEL",
        "nested prompt sentinel",
        "nested-memory-capability",
        "nested-api-key-sentinel",
    ):
        assert sentinel not in caplog.text

    assert "[REDACTED]" in caplog.text
    assert "[REDACTED_IMAGE]" in caplog.text
    assert '"promptTokens": 12' in caplog.text
    assert '"/v1/memory/[REDACTED]"' in caplog.text
