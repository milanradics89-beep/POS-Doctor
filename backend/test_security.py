import pytest
from fastapi import HTTPException

from backend.security import validate_public_http_url


def test_rejects_localhost():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("http://localhost/product")
    assert exc.value.status_code == 400


def test_rejects_private_ip():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("http://127.0.0.1/product")
    assert exc.value.status_code == 400


def test_rejects_non_http_scheme():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("file:///etc/passwd")
    assert exc.value.status_code == 400


def test_rejects_embedded_credentials():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://user:password@example.com/product")
    assert exc.value.status_code == 400


def test_rejects_non_standard_port():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://example.com:8443/product")
    assert exc.value.status_code == 400
