import base64
import asyncio
import json

import pytest
import cbor2
from cryptography import x509

from backend.apple_app_attest import (
    APPLE_APP_ATTEST_ROOT_PEM,
    APPLE_APP_ATTEST_ROOT_SHA256,
    DEV_AAGUID,
    OID_NONCE,
    PROD_AAGUID,
    _b64decode,
    _key_id_bytes,
    _extension_nonce,
    _parse_auth_data,
    _validate_cose_public_key,
    _validate_aaguid,
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
    flags = b"\x41"
    counter = (7).to_bytes(4, "big")
    aaguid = b"appattest" + b"\x00" * 7
    credential = b"\x02" * 32
    cose_key = {1: 2, 3: -7, -1: 1, -2: b"x" * 32, -3: b"y" * 32}
    payload = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential + cbor2.dumps(cose_key)
    parsed_rp, parsed_counter, parsed_credential, parsed_cose_key = _parse_auth_data(payload)
    assert parsed_rp == rp
    assert parsed_counter == 7
    assert parsed_credential == credential
    assert parsed_cose_key == cose_key


def test_authenticator_data_parser_rejects_missing_attested_credential_flag():
    rp = b"\x01" * 32
    flags = b"\x01"
    counter = (0).to_bytes(4, "big")
    aaguid = b"appattest" + b"\x00" * 7
    credential = b"\x02" * 32
    payload = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential + b"\xa1\x01\x02"
    with pytest.raises(ValueError, match="attested credential data flag"):
        _parse_auth_data(payload)


def test_authenticator_data_parser_rejects_missing_credential_public_key():
    rp = b"\x01" * 32
    flags = b"\x41"
    counter = (0).to_bytes(4, "big")
    aaguid = b"appattest" + b"\x00" * 7
    credential = b"\x02" * 32
    payload = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential
    with pytest.raises(ValueError, match="credential public key"):
        _parse_auth_data(payload)


@pytest.mark.parametrize("flags", [b"\\x41", b"\\xC1"])
def test_authenticator_data_parser_accepts_extension_map_after_cose_key(flags):
    rp = b"\\x01" * 32
    counter = (0).to_bytes(4, "big")
    aaguid = b"appattest" + b"\\x00" * 7
    credential = b"\\x02" * 32
    prefix = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential
    cose_key = {1: 2, 3: -7, -1: 1, -2: b"x" * 32, -3: b"y" * 32}
    extensions = {
        "apple_bundle_version_01": "1",
        "apple_validation_category_01": b"\\x01\\x00\\x00\\x00",
    }

    parsed = _parse_auth_data(prefix + cbor2.dumps(cose_key) + cbor2.dumps(extensions))
    assert parsed[3] == cose_key


def test_authenticator_data_parser_accepts_apple_published_sample_extensions():
    # Apple's published validation vector contains an extensions map after the
    # COSE key while the authenticator flags byte is 0x40 (AT without ED).
    auth_data = base64.b64decode(
        "9EZtaPketsEGIMt+Y8coMkRoXuHWRntUFg51MXIFfwNAAAAAAGFwcGF0dGVzdAAAAAAAAAAA"
        "IM4EmPWEg/u02g17LGOlpTj1UtSty5pPqRYZXElhPmVdpQECAyYgASFYIEMyVErPMj23dEQ8"
        "qvM59W5+lcck+sLBQlnzZeJEVlCyIlggtfsoW89Um8tgWUQS52gqJCfuran7Ut/tCxqxftCf"
        "qb2id2FwcGxlX2J1bmRsZV92ZXJzaW9uXzAxYTF4HGFwcGxlX3ZhbGlkYXRpb25fY2F0ZWdv"
        "cnlfMDFEAQAAAA=="
    )

    assert auth_data[32] == 0x40
    rp_id_hash, counter, credential_id, cose_key = _parse_auth_data(auth_data)
    assert rp_id_hash == base64.b64decode("9EZtaPketsEGIMt+Y8coMkRoXuHWRntUFg51MXIFfwM=")
    assert counter == 0
    assert len(credential_id) == 32
    assert cose_key[1] == 2
    assert cose_key[3] == -7

def test_authenticator_data_parser_requires_extensions_when_ed_flag_is_set():
    rp = b"\\x01" * 32
    flags = b"\\xC1"
    counter = (0).to_bytes(4, "big")
    aaguid = b"appattest" + b"\\x00" * 7
    credential = b"\\x02" * 32
    prefix = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential
    cose_key = {1: 2, 3: -7, -1: 1, -2: b"x" * 32, -3: b"y" * 32}

    with pytest.raises(ValueError, match="ED flag"):
        _parse_auth_data(prefix + cbor2.dumps(cose_key))


def test_authenticator_data_parser_rejects_malformed_or_trailing_cose_data():
    rp = b"\\x01" * 32
    flags = b"\\x41"
    counter = (0).to_bytes(4, "big")
    aaguid = b"appattest" + b"\\x00" * 7
    credential = b"\\x02" * 32
    prefix = rp + flags + counter + aaguid + len(credential).to_bytes(2, "big") + credential
    valid_cose_key = cbor2.dumps({1: 2, 3: -7, -1: 1, -2: b"x" * 32, -3: b"y" * 32})

    with pytest.raises(ValueError, match="invalid credential public key"):
        _parse_auth_data(prefix + cbor2.dumps([1, 2]))
    with pytest.raises(ValueError, match="authenticator extensions"):
        _parse_auth_data(prefix + valid_cose_key + cbor2.dumps(["not a map"]))
    with pytest.raises(ValueError, match="trailing"):
        _parse_auth_data(prefix + valid_cose_key + cbor2.dumps({"valid": True}) + b"\\x00")



from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.serialization import Encoding, PrivateFormat, NoEncryption, PublicFormat
from cryptography.x509 import NameOID
from cryptography import x509
from datetime import datetime, timedelta, timezone

from backend.apple_app_attest import AppleAppAttestVerifier, _MEMORY_KEYS


def test_cose_public_key_must_match_attestation_certificate_key():
    private_key = ec.generate_private_key(ec.SECP256R1())
    raw_public_key = private_key.public_key().public_bytes(
        Encoding.X962,
        PublicFormat.UncompressedPoint,
    )
    cose_key = {
        1: 2,
        3: -7,
        -1: 1,
        -2: raw_public_key[1:33],
        -3: raw_public_key[33:65],
    }

    _validate_cose_public_key(cose_key, raw_public_key)

    other_key = ec.generate_private_key(ec.SECP256R1()).public_key().public_bytes(
        Encoding.X962,
        PublicFormat.UncompressedPoint,
    )
    with pytest.raises(ValueError, match="does not match"):
        _validate_cose_public_key(cose_key, other_key)


@pytest.mark.parametrize(
    "invalid_cose_key",
    [
        {1: 3, 3: -7, -1: 1, -2: b"x" * 32, -3: b"y" * 32},
        {1: 2, 3: -8, -1: 1, -2: b"x" * 32, -3: b"y" * 32},
        {1: 2, 3: -7, -1: 2, -2: b"x" * 32, -3: b"y" * 32},
        {1: 2, 3: -7, -1: 1, -2: b"x" * 31, -3: b"y" * 32},
        {1: 2, 3: -7, -1: 1, -2: b"x" * 32, -3: "not-bytes"},
    ],
)
def test_cose_public_key_rejects_invalid_parameters(invalid_cose_key):
    with pytest.raises(ValueError):
        _validate_cose_public_key(invalid_cose_key, b"\x04" + b"\x00" * 64)


from backend.attestation import AttestationEvidence, AttestationProvider


def test_nonce_extension_parser_reads_der_wrapped_octet_string():
    nonce = b"n" * 32
    key = ec.generate_private_key(ec.SECP256R1())
    name = x509.Name([x509.NameAttribute(NameOID.COMMON_NAME, "USEIT nonce extension test")])
    encoded_nonce = b"\x30\x24\xa1\x22\x04\x20" + nonce
    cert = (
        x509.CertificateBuilder()
        .subject_name(name)
        .issuer_name(name)
        .public_key(key.public_key())
        .serial_number(3)
        .not_valid_before(datetime.now(timezone.utc) - timedelta(minutes=1))
        .not_valid_after(datetime.now(timezone.utc) + timedelta(minutes=10))
        .add_extension(x509.UnrecognizedExtension(OID_NONCE, encoded_nonce), critical=False)
        .sign(key, hashes.SHA256())
    )
    assert _extension_nonce(cert) == nonce


def test_production_app_attest_rejects_development_aaguid(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "production")
    _validate_aaguid(PROD_AAGUID)
    with pytest.raises(ValueError, match="not allowed in production"):
        _validate_aaguid(DEV_AAGUID)


def test_development_app_attest_accepts_development_aaguid(monkeypatch):
    monkeypatch.setenv("USEIT_ENV", "development")
    _validate_aaguid(DEV_AAGUID)



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
    signed_data = auth_data + __import__("hashlib").sha256(client_data).digest()
    signature = key.sign(signed_data, ec.ECDSA(hashes.SHA256()))
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

    # A correctly signed assertion for a different action must not authenticate a session.
    wrong_action_data = json.dumps(
        {"challenge": challenge, "action": "product_discovery"},
        separators=(",", ":"),
    ).encode()
    wrong_action_auth_data = (
        __import__("hashlib").sha256(app_id.encode()).digest()
        + b"\x01"
        + (2).to_bytes(4, "big")
    )
    wrong_action_signature = key.sign(
        wrong_action_auth_data + __import__("hashlib").sha256(wrong_action_data).digest(),
        ec.ECDSA(hashes.SHA256()),
    )
    wrong_action_assertion = cbor2.dumps({
        "authenticatorData": wrong_action_auth_data,
        "signature": wrong_action_signature,
    })
    wrong_action_evidence = AttestationEvidence(
        provider=AttestationProvider.APP_ATTEST,
        challenge=challenge,
        assertion=base64.b64encode(wrong_action_assertion).decode(),
        app_id=app_id,
        key_id=key_id,
        client_data=wrong_action_data.decode(),
    )
    wrong_action_result = asyncio.run(AppleAppAttestVerifier().verify(wrong_action_evidence))
    assert wrong_action_result.verified is False
    stored_after_wrong_action = asyncio.run(_MEMORY_KEYS.get(key_id))
    assert stored_after_wrong_action is not None and stored_after_wrong_action[1] == 1

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
    client_data = json.dumps({"challenge": challenge, "action": "session"}, separators=(",", ":")).encode()
    rp_id_hash = __import__("hashlib").sha256(app_id.encode()).digest()
    original_auth_data = rp_id_hash + b"\x01" + (1).to_bytes(4, "big")
    tampered_auth_data = rp_id_hash + b"\x01" + (2).to_bytes(4, "big")
    original_signed_data = original_auth_data + __import__("hashlib").sha256(client_data).digest()
    signature = key.sign(original_signed_data, ec.ECDSA(hashes.SHA256()))
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



@pytest.mark.parametrize(
    ("encoded", "expected"),
    [
        (base64.b64encode(b"\xfb\xff\xff").decode("ascii"), b"\xfb\xff\xff"),
        (base64.urlsafe_b64encode(b"\xfb\xff\xff").decode("ascii").rstrip("="), b"\xfb\xff\xff"),
        (base64.b64encode(b"payload").decode("ascii"), b"payload"),
        (base64.urlsafe_b64encode(b"payload").decode("ascii").rstrip("="), b"payload"),
    ],
)
def test_base64_decoder_accepts_canonical_standard_and_urlsafe_values(encoded, expected):
    assert _b64decode(encoded) == expected


@pytest.mark.parametrize(
    "encoded",
    [
        "YQ==!!!!",  # ignored characters were previously accepted by the URL-safe fallback
        "YQ=",
        "YQ===",
        "A",  # impossible Base64 length
        "+_8=",  # mixed standard and URL-safe alphabets
        "Y Q==",
        "YQ==\n",
        "YR==",  # non-canonical unused pad bits
    ],
)
def test_base64_decoder_rejects_malformed_or_noncanonical_values(encoded):
    with pytest.raises(ValueError):
        _b64decode(encoded)

@pytest.mark.parametrize("encoding", ["hex", "base64"])
@pytest.mark.parametrize("position", ["prefix", "suffix", "embedded"])
def test_key_id_bytes_rejects_noncanonical_whitespace(encoding, position):
    key_bytes = bytes(range(32))
    key_id = key_bytes.hex() if encoding == "hex" else base64.b64encode(key_bytes).decode("ascii")
    if position == "prefix":
        malformed = f" {key_id}"
    elif position == "suffix":
        malformed = f"{key_id} "
    else:
        malformed = f"{key_id[:32]} {key_id[32:]}"
    with pytest.raises(ValueError, match="Invalid Apple App Attest key ID|Invalid Base64 encoding"):
        _key_id_bytes(malformed)


def test_key_id_bytes_accepts_supported_canonical_encodings():
    key_bytes = bytes(range(32))
    assert _key_id_bytes(key_bytes.hex()) == key_bytes
    assert _key_id_bytes(base64.b64encode(key_bytes).decode("ascii")) == key_bytes




def test_apple_key_store_redis_client_uses_bounded_timeouts(monkeypatch):
    from backend import apple_app_attest as apple_attest_module

    monkeypatch.setenv("USEIT_REDIS_URL", "redis://redis.internal:6379/0")
    captured = {}
    sentinel = object()

    def fake_from_url(url, **kwargs):
        captured.update(url=url, **kwargs)
        return sentinel

    monkeypatch.setattr(apple_attest_module.Redis, "from_url", fake_from_url)

    assert apple_attest_module._redis() is sentinel
    assert captured == {
        "url": "redis://redis.internal:6379/0",
        "decode_responses": False,
        "socket_connect_timeout": 2.0,
        "socket_timeout": 5.0,
    }
