import base64
import asyncio
import json

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


from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.serialization import Encoding, PrivateFormat, NoEncryption, PublicFormat
from cryptography.x509 import NameOID
from cryptography import x509
from datetime import datetime, timedelta, timezone

from backend.apple_app_attest import AppleAppAttestVerifier, _MEMORY_KEYS
from backend.attestation import AttestationEvidence, AttestationProvider


def test_assertion_verification_and_counter_replay():
    key = ec.generate_private_key(ec.SECP256R1())
    subject = issuer = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "USEIT test")])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(1)
        .not_valid_before(datetime.now(timezone.utc) - timedelta(minutes=1))
        .not_valid_after(datetime.now(timezone.utc) + timedelta(minutes=10))
        .sign(key, hashes.SHA256())
    )
    key_id = "test-apple-key"
    app_id = "TEAM123456.com.useit.app"
    challenge = "challenge-for-assertion"
    client_data = json.dumps({"challenge": challenge, "action": "session"}, separators=(",", ":")).encode()
    auth_data = (
        __import__("hashlib").sha256(app_id.encode()).digest()
        + b"\x01"
        + (1).to_bytes(4, "big")
    )
    nonce = __import__("hashlib").sha256(auth_data + __import__("hashlib").sha256(client_data).digest()).digest()
    signature = key.sign(nonce, ec.ECDSA(hashes.SHA256()))
    assertion = cbor2.dumps({"authenticatorData": auth_data, "signature": signature})
    asyncio.run(_MEMORY_KEYS.put(key_id, cert.public_bytes(Encoding.DER), app_id))

    evidence = AttestationEvidence(
        provider=AttestationProvider.APP_ATTEST,
        challenge=challenge,
        assertion=base64.b64encode(assertion).decode(),
        app_id=app_id,
        key_id=key_id,
        client_data=client_data.decode(),
    )
    result = asyncio.run(AppleAppAttestVerifier().verify(evidence))
    assert result.verified is True
    stored = asyncio.run(_MEMORY_KEYS.get(key_id))
    assert stored is not None and stored[1] == 1

    replay = asyncio.run(AppleAppAttestVerifier().verify(evidence))
    assert replay.verified is False
