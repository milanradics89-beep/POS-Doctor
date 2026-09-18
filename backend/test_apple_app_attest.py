import base64

import cbor2
from cryptography import x509

from backend.apple_app_attest import (
    APPLE_APP_ATTEST_ROOT_PEM,
    APPLE_APP_ATTEST_ROOT_SHA256,
    _parse_auth_data,
    root_certificate_fingerprint,
)


def test_pinned_apple_root_is_parseable_and_pinned():
    cert = x509.load_pem_x509_certificate(APPLE_APP_ATTEST_ROOT_PEM.encode())
    assert cert.subject == cert.issuer
    assert root_certificate_fingerprint() == APPLE_APP_ATTEST_ROOT_SHA256
    assert len(cert.public_key().public_numbers().x) > 0


def test_authenticator_data_parser_rejects_truncated_data():
    try:
        _parse_auth_data(b"\x00" * 54)
    except ValueError as exc:
        assert "too short" in str(exc)
    else:
        raise AssertionError("truncated authenticatorData must be rejected")


def test_authenticator_data_parser_extracts_counter_and_credential_id():
    rp = b"\x01" * 32
    flags = b"\x01"
    counter = (7).to_bytes(4, "big")
    aaguid = b"appattest" + b"\x00" * 7
    credential = b"\x02" * 32
    payload = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential
    parsed_rp, parsed_counter, parsed_credential = _parse_auth_data(payload)
    assert parsed_rp == rp
    assert parsed_counter == 7
    assert parsed_credential == credential
