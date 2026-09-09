import logging

from backend.privacy_logging import log_event, redact_value, safe_event


def test_sensitive_values_are_redacted():
    fields = safe_event({"imageUri": "data:image/png;base64,SECRET", "api_key": "SECRET", "userIntent": "shop"})
    assert fields["imageUri"] == "[REDACTED]"
    assert fields["api_key"] == "[REDACTED]"
    assert fields["userIntent"] == "shop"


def test_data_uri_is_never_logged():
    assert redact_value("payload", "data:image/jpeg;base64,SECRET") == "[REDACTED_IMAGE]"


def test_log_event_uses_redacted_structured_fields(caplog):
    logger = logging.getLogger("privacy-test")
    with caplog.at_level(logging.INFO):
        log_event(logger, "analysis", imageUri="data:image/png;base64,SECRET", userIntent="decorate")
    assert "SECRET" not in caplog.text
    assert "decorate" in caplog.text
