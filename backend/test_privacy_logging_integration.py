import logging

from backend.privacy_logging import log_event


def test_log_event_does_not_leak_common_sensitive_headers(caplog):
    logger = logging.getLogger("privacy-integration")
    with caplog.at_level(logging.INFO):
        log_event(
            logger,
            "request.completed",
            authorization="Bearer TOP_SECRET",
            token="TOP_SECRET_TOKEN",
            password="TOP_SECRET_PASSWORD",
            image_uri="https://example.invalid/private-image.jpg",
            request_id="req-123",
            status_code=200,
        )

    assert "TOP_SECRET" not in caplog.text
    assert "TOP_SECRET_TOKEN" not in caplog.text
    assert "TOP_SECRET_PASSWORD" not in caplog.text
    assert "private-image" not in caplog.text
    assert "req-123" in caplog.text
    assert "200" in caplog.text
