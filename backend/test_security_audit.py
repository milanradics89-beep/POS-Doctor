from backend.security_audit import create_security_audit_event


def test_security_audit_event_normalizes_method():
    event = create_security_audit_event("rate_limit", "/v1/analyze", "post", 429)
    assert event.event == "rate_limit"
    assert event.path == "/v1/analyze"
    assert event.method == "POST"
    assert event.status_code == 429
    assert event.recorded_at.endswith("+00:00")


def test_security_audit_event_rejects_invalid_values():
    try:
        create_security_audit_event("", "/v1/analyze", "POST", 401)
        assert False
    except ValueError as exc:
        assert str(exc) == "event must not be empty"

    try:
        create_security_audit_event("auth", "v1/analyze", "POST", 401)
        assert False
    except ValueError as exc:
        assert str(exc) == "path must start with '/'"
