import ipaddress

import pytest
from fastapi import HTTPException

from backend.security import validate_public_http_url, validate_connected_peer


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


class _Stream:
    def __init__(self, address: str):
        self.address = address

    def get_extra_info(self, name: str):
        return (self.address, 443) if name == "peername" else None


class _Response:
    def __init__(self, address: str):
        self.extensions = {"network_stream": _Stream(address)}


def test_connected_peer_must_be_public():
    validate_connected_peer(_Response("8.8.8.8"))


def test_connected_peer_rejects_private_address():
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response("10.0.0.1"))
    assert exc.value.status_code == 400


def test_connected_peer_requires_network_metadata():
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(type("Response", (), {"extensions": {}})())
    assert exc.value.status_code == 502
