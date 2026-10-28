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
    AppleAttestKey,
    _store_key,
)


def test_pinned_apple_root_is_parseable_and_pinned():
    cert = x509.load_pem_x509_certificate(APPLE_APP_ATTEST_ROOT_PEM.encode())
    assert cert.subject == cert.issuer
    assert root_certificate_fingerprint() == APPLE_APP_ATTEST_ROOT_SHA256
    assert __import__("hashlib").sha256(cert.public_bytes(Encoding.DER)).hexdigest() == APPLE_APP_ATTEST_ROOT_SHA256
    assert cert.public_key().public_numbers().x > 0


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


from cryptography.hazmat.primitives import hashes
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

    # A valid signature must not be accepted when clientData binds a different challenge.
    wrong_challenge = AttestationEvidence(
        provider=AttestationProvider.APP_ATTEST,
        challenge="different-challenge",
        assertion=base64.b64encode(assertion).decode(),
        app_id=app_id,
        key_id=key_id,
        client_data=client_data.decode(),
    )
    wrong_challenge_result = asyncio.run(AppleAppAttestVerifier().verify(wrong_challenge))
    assert wrong_challenge_result.verified is False

    # The registered key must also remain bound to its original app identity.
    wrong_app = AttestationEvidence(
        provider=AttestationProvider.APP_ATTEST,
        challenge=challenge,
        assertion=base64.b64encode(assertion).decode(),
        app_id="TEAM123456.com.other.app",
        key_id=key_id,
        client_data=client_data.decode(),
    )
    wrong_app_result = asyncio.run(AppleAppAttestVerifier().verify(wrong_app))
    assert wrong_app_result.verified is False

    stored = asyncio.run(_MEMORY_KEYS.get(key_id))
    assert stored is not None and stored[1] == 1

    replay = asyncio.run(AppleAppAttestVerifier().verify(evidence))
    assert replay.verified is False

def test_assertion_rejects_tampered_authenticator_data_without_advancing_counter():
    key = ec.generate_private_key(ec.SECP256R1())
    subject = issuer = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "USEIT tamper test")])
    cert = (
        x509.CertificateBuilder()
        .subject_name(subject)
        .issuer_name(issuer)
        .public_key(key.public_key())
        .serial_number(2)
        .not_valid_before(datetime.now(timezone.utc) - timedelta(minutes=1))
        .not_valid_after(datetime.now(timezone.utc) + timedelta(minutes=10))
        .sign(key, hashes.SHA256())
    )
    key_id = "test-apple-key-tamper"
    app_id = "TEAM123456.com.useit.app"
    challenge = "challenge-for-tamper-test"
    client_data = json.dumps({"challenge": challenge}, separators=(",", ":")).encode()
    rp_id_hash = __import__("hashlib").sha256(app_id.encode()).digest()
    original_auth_data = rp_id_hash + b"\x01" + (1).to_bytes(4, "big")
    tampered_auth_data = rp_id_hash + b"\x01" + (2).to_bytes(4, "big")
    original_nonce = __import__("hashlib").sha256(
        original_auth_data + __import__("hashlib").sha256(client_data).digest()
    ).digest()
    signature = key.sign(original_nonce, ec.ECDSA(hashes.SHA256()))
    assertion = cbor2.dumps({
        "authenticatorData": tampered_auth_data,
        "signature": signature,
    })
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

    assert result.verified is False
    stored = asyncio.run(_MEMORY_KEYS.get(key_id))
    assert stored is not None and stored[1] == 0



def test_registered_app_attest_key_cannot_be_replaced_or_reset(monkeypatch):
    monkeypatch.delenv("USEIT_REDIS_URL", raising=False)
    key_id = "test-immutable-apple-key"
    original = AppleAttestKey(key_id, b"original-public-key", 0)
    replacement = AppleAttestKey(key_id, b"replacement-public-key", 0)

    asyncio.run(_store_key(original, "TEAM123456.com.useit.app"))
    try:
        try:
            asyncio.run(_store_key(replacement, "TEAM123456.com.useit.app"))
        except ValueError as exc:
            assert "already registered" in str(exc)
        else:
            raise AssertionError("re-registering a key must be rejected")

        stored = asyncio.run(_MEMORY_KEYS.get(key_id))
        assert stored == (b"original-public-key", 0, "TEAM123456.com.useit.app")
    finally:
        _MEMORY_KEYS._keys.pop(key_id, None)
