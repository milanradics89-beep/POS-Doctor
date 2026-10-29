from __future__ import annotations

import base64
import hashlib
import os
import time
from dataclasses import dataclass
from typing import Any

from redis.asyncio import Redis

import cbor2
from cryptography import x509
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat

from backend.attestation import AttestationEvidence, AttestationResult, AttestationVerifier

APPLE_APP_ATTEST_ROOT_PEM = """-----BEGIN CERTIFICATE-----
MIICITCCAaegAwIBAgIQC/O+DvHN0uD7jG5yH2IXmDAKBggqhkjOPQQDAzBSMSYw
JAYDVQQDDB1BcHBsZSBBcHAgQXR0ZXN0YXRpb24gUm9vdCBDQTETMBEGA1UECgwK
QXBwbGUgSW5jLjETMBEGA1UECAwKQ2FsaWZvcm5pYTAeFw0yMDAzMTgxODMyNTNa
Fw00NTAzMTUwMDAwMDBaMFIxJjAkBgNVBAMMHUFwcGxlIEFwcCBBdHRlc3RhdGlv
biBSb290IENBMRMwEQYDVQQKDApBcHBsZSBJbmMuMRMwEQYDVQQIDApDYWxpZm9y
bmlhMHYwEAYHKoZIzj0CAQYFK4EEACIDYgAERTHhmLW07ATaFQIEVwTtT4dyctdh
NbJhFs/Ii2FdCgAHGbpphY3+d8qjuDngIN3WVhQUBHAoMeQ/cLiP1sOUtgjqK9au
Yen1mMEvRq9Sk3Jm5X8U62H+xTD3FE9TgS41o0IwQDAPBgNVHRMBAf8EBTADAQH/
MB0GA1UdDgQWBBSskRBTM72+aEH/pwyp5frq5eWKoTAOBgNVHQ8BAf8EBAMCAQYw
CgYIKoZIzj0EAwMDaAAwZQIwQgFGnByvsiVbpTKwSga0kP0e8EeDS4+sQmTvb7vn
53O5+FRXgeLhpJ06ysC5PrOyAjEAp5U4xDgEgllF7En3VcE3iexZZtKeYnpqtijV
oyFraWVIyd/dganmrduC1bmTBGwD
-----END CERTIFICATE-----"""

# Apple publishes the authoritative root at:
# https://www.apple.com/certificateauthority/Apple_App_Attestation_Root_CA.pem
# The runtime fingerprint check below prevents accidental substitution.
APPLE_APP_ATTEST_ROOT_SHA256 = "1cb9823ba28ba6ad2d33a006941de2ae4f513ef1d4e831b9f7e0fa7b6242c932"

OID_NONCE = x509.ObjectIdentifier("1.2.840.113635.100.8.2")
PROD_AAGUID = b"appattest" + b"\x00" * 7
DEV_AAGUID = b"appattestdevelop"
MAX_ASSERTION_CLIENT_DATA = 64_000


@dataclass(frozen=True)
class AppleAttestKey:
    key_id: str
    public_key_der: bytes
    counter: int


def _b64decode(value: str) -> bytes:
    # Attestation payloads and key IDs may use standard or URL-safe Base64,
    # but accepting ignored characters or mixed alphabets makes their textual
    # representation malleable. Require one canonical encoding.
    if not isinstance(value, str) or not value or value != value.strip():
        raise ValueError("Invalid Base64 encoding")
    if any(character.isspace() for character in value):
        raise ValueError("Invalid Base64 encoding")

    has_standard_symbols = "+" in value or "/" in value
    has_urlsafe_symbols = "-" in value or "_" in value
    if has_standard_symbols and has_urlsafe_symbols:
        raise ValueError("Mixed Base64 alphabets are not allowed")

    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    alphabet += "-_" if has_urlsafe_symbols else "+/"
    unpadded = value.rstrip("=")
    padding = len(value) - len(unpadded)
    if padding > 2 or "=" in unpadded or (padding and len(value) % 4 != 0):
        raise ValueError("Invalid Base64 padding")
    if len(unpadded) % 4 == 1:
        raise ValueError("Invalid Base64 length")
    if any(character not in alphabet for character in unpadded):
        raise ValueError("Invalid Base64 character")

    padded = unpadded + "=" * (-len(unpadded) % 4)
    decoded = base64.b64decode(
        padded,
        altchars=b"-_" if has_urlsafe_symbols else None,
        validate=True,
    )
    canonical = base64.b64encode(decoded).decode("ascii")
    if has_urlsafe_symbols:
        canonical = canonical.translate(str.maketrans("+/", "-_"))
    expected = canonical if padding else canonical.rstrip("=")
    if value != expected:
        raise ValueError("Non-canonical Base64 encoding")
    return decoded


def _key_id_bytes(key_id: str) -> bytes:
    # Key IDs are opaque identifiers. Do not trim or otherwise normalize
    # caller input: a non-canonical spelling must not become a second key.
    if not isinstance(key_id, str) or not key_id or key_id != key_id.strip():
        raise ValueError("Invalid Apple App Attest key ID")

    # Keep the legacy 64-character hex form, but validate it before calling
    # bytes.fromhex(), which otherwise silently ignores embedded whitespace.
    if len(key_id) == 64 and all(character in "0123456789abcdefABCDEF" for character in key_id):
        return bytes.fromhex(key_id)
    return _b64decode(key_id)


def _parse_auth_data(auth_data: bytes) -> tuple[bytes, int, bytes]:
    if len(auth_data) < 55:
        raise ValueError("authenticatorData too short")
    # App Attest attestation data must carry the WebAuthn AT (attested
    # credential data) flag before the AAGUID and credential ID fields.
    if not (auth_data[32] & 0x40):
        raise ValueError("authenticatorData is missing the attested credential data flag")
    rp_id_hash = auth_data[:32]
    counter = int.from_bytes(auth_data[33:37], "big")
    credential_len = int.from_bytes(auth_data[53:55], "big")
    end = 55 + credential_len
    if credential_len <= 0 or end > len(auth_data):
        raise ValueError("invalid credentialId length")
    if end == len(auth_data):
        raise ValueError("authenticatorData is missing the credential public key")
    return rp_id_hash, counter, auth_data[55:end]


def _extension_nonce(cert: x509.Certificate) -> bytes:
    extension = cert.extensions.get_extension_for_oid(OID_NONCE).value
    if not isinstance(extension, x509.UnrecognizedExtension):
        raise ValueError("App Attest nonce extension has an unexpected encoding")
    # Apple encodes the nonce as a DER structure containing a context-specific
    # [1] wrapper and an OCTET STRING. Walk the DER payload defensively.
    def walk(data: bytes) -> bytes | None:
        i = 0
        while i + 2 <= len(data):
            tag = data[i]
            i += 1
            first = data[i]
            i += 1
            if first & 0x80:
                count = first & 0x7F
                if count == 0 or i + count > len(data):
                    return None
                length = int.from_bytes(data[i:i + count], "big")
                i += count
            else:
                length = first
            if i + length > len(data):
                return None
            value = data[i:i + length]
            i += length
            if tag == 0x04 and len(value) == 32:
                return value
            nested = walk(value) if tag & 0x20 else None
            if nested is not None:
                return nested
        return None

    nonce = walk(extension.value)
    if nonce is None:
        raise ValueError("App Attest nonce extension is malformed")
    return nonce


def _verify_signature(cert: x509.Certificate, issuer: x509.Certificate) -> None:
    public_key = issuer.public_key()
    if not isinstance(public_key, ec.EllipticCurvePublicKey):
        raise ValueError("Apple App Attest issuer key is not EC")
    public_key.verify(
        cert.signature,
        cert.tbs_certificate_bytes,
        ec.ECDSA(cert.signature_hash_algorithm),
    )


def _verify_chain(certs: list[x509.Certificate]) -> None:
    if len(certs) < 2:
        raise ValueError("App Attest certificate chain is incomplete")
    root = x509.load_pem_x509_certificate(APPLE_APP_ATTEST_ROOT_PEM.encode())
    if hashlib.sha256(root.public_bytes(Encoding.DER)).hexdigest() != APPLE_APP_ATTEST_ROOT_SHA256:
        raise ValueError("pinned Apple App Attest root fingerprint mismatch")
    now = time.time()
    chain = certs + [root]
    for cert in chain:
        if cert.not_valid_before.timestamp() > now or cert.not_valid_after.timestamp() < now:
            raise ValueError("App Attest certificate is outside its validity period")
    for child, issuer in zip(chain, chain[1:]):
        if child.issuer != issuer.subject:
            raise ValueError("App Attest certificate issuer mismatch")
        _verify_signature(child, issuer)
    if not root.subject == root.issuer:
        raise ValueError("Apple App Attest root is not self-issued")
    root.public_key().verify(root.signature, root.tbs_certificate_bytes, ec.ECDSA(root.signature_hash_algorithm))


def _raw_public_key(cert: x509.Certificate) -> bytes:
    key = cert.public_key()
    if not isinstance(key, ec.EllipticCurvePublicKey) or key.curve.name != "secp256r1":
        raise ValueError("App Attest credential key must be P-256")
    return key.public_bytes(Encoding.X962, PublicFormat.UncompressedPoint)


def _validate_aaguid(aaguid: bytes) -> None:
    if aaguid not in (PROD_AAGUID, DEV_AAGUID):
        raise ValueError("unsupported App Attest AAGUID")
    environment = os.environ.get("USEIT_ENV", "development").strip().lower()
    if environment in {"production", "prod"} and aaguid != PROD_AAGUID:
        raise ValueError("development App Attest keys are not allowed in production")


def _verify_attestation(evidence: AttestationEvidence) -> AppleAttestKey:
    payload = _b64decode(evidence.assertion)
    obj = cbor2.loads(payload)
    if not isinstance(obj, dict) or obj.get("fmt") != "apple-appattest":
        raise ValueError("invalid Apple App Attest format")
    stmt = obj.get("attStmt")
    auth_data = obj.get("authData")
    if not isinstance(stmt, dict) or not isinstance(auth_data, bytes):
        raise ValueError("malformed Apple App Attest object")
    x5c = stmt.get("x5c")
    if not isinstance(x5c, list) or len(x5c) < 2 or not all(isinstance(x, bytes) for x in x5c):
        raise ValueError("missing Apple App Attest certificate chain")
    certs = [x509.load_der_x509_certificate(x) for x in x5c]
    _verify_chain(certs)
    leaf = certs[0]

    client_data_hash = hashlib.sha256(evidence.challenge.encode()).digest()
    nonce = hashlib.sha256(auth_data + client_data_hash).digest()
    if _extension_nonce(leaf) != nonce:
        raise ValueError("Apple App Attest nonce mismatch")

    rp_id_hash, counter, credential_id = _parse_auth_data(auth_data)
    expected_rp = hashlib.sha256(evidence.app_id.encode()).digest()
    if rp_id_hash != expected_rp:
        raise ValueError("Apple App Attest RP ID mismatch")
    if counter != 0:
        raise ValueError("Apple App Attest initial counter must be zero")
    if not evidence.key_id:
        raise ValueError("Apple App Attest keyId is missing")
    if credential_id != _key_id_bytes(evidence.key_id):
        raise ValueError("Apple App Attest credential ID mismatch")

    public_key = _raw_public_key(leaf)
    if hashlib.sha256(public_key).digest() != credential_id:
        raise ValueError("Apple App Attest public key hash mismatch")
    _validate_aaguid(auth_data[37:53])
    return AppleAttestKey(key_id=evidence.key_id, public_key_der=leaf.public_bytes(Encoding.DER), counter=counter)


class _AppleKeyStore:
    def __init__(self) -> None:
        self._keys: dict[str, tuple[bytes, int, str]] = {}

    async def put(self, key_id: str, public_key_der: bytes, app_id: str) -> None:
        self._keys[key_id] = (public_key_der, 0, app_id)

    async def create(self, key_id: str, public_key_der: bytes, app_id: str) -> bool:
        if key_id in self._keys:
            return False
        self._keys[key_id] = (public_key_der, 0, app_id)
        return True

    async def get(self, key_id: str) -> tuple[bytes, int, str] | None:
        return self._keys.get(key_id)

    async def advance(self, key_id: str, counter: int) -> bool:
        record = self._keys.get(key_id)
        if record is None or counter <= record[1]:
            return False
        self._keys[key_id] = (record[0], counter, record[2])
        return True


_MEMORY_KEYS = _AppleKeyStore()


def _redis() -> Redis:
    return Redis.from_url(os.environ["USEIT_REDIS_URL"], decode_responses=False)


async def _store_key(key: AppleAttestKey, app_id: str) -> None:
    redis_url = os.environ.get("USEIT_REDIS_URL", "").strip()
    if not redis_url:
        if not await _MEMORY_KEYS.create(key.key_id, key.public_key_der, app_id):
            raise ValueError("Apple App Attest key is already registered")
        return
    client = _redis()
    try:
        redis_key = f"useit:app-attest:key:{hashlib.sha256(key.key_id.encode()).hexdigest()}"
        script = (
            "if redis.call('EXISTS', KEYS[1]) == 1 then return 0 end "
            "redis.call('HSET', KEYS[1], 'public_key', ARGV[1], 'counter', '0', 'app_id', ARGV[2]) "
            "return 1"
        )
        created = await client.eval(script, 1, redis_key, key.public_key_der, app_id)
        if not created:
            raise ValueError("Apple App Attest key is already registered")
    finally:
        await client.aclose()


async def _load_key(key_id: str) -> tuple[bytes, int, str] | None:
    redis_url = os.environ.get("USEIT_REDIS_URL", "").strip()
    if not redis_url:
        return await _MEMORY_KEYS.get(key_id)
    client = _redis()
    try:
        data = await client.hgetall(f"useit:app-attest:key:{hashlib.sha256(key_id.encode()).hexdigest()}")
        if not data:
            return None
        return data[b"public_key"], int(data[b"counter"]), data[b"app_id"].decode()
    finally:
        await client.aclose()


async def _advance_key(key_id: str, counter: int) -> bool:
    redis_url = os.environ.get("USEIT_REDIS_URL", "").strip()
    if not redis_url:
        return await _MEMORY_KEYS.advance(key_id, counter)
    client = _redis()
    try:
        script = "local current = redis.call('HGET', KEYS[1], 'counter') if not current then return 0 end if tonumber(ARGV[1]) <= tonumber(current) then return 0 end redis.call('HSET', KEYS[1], 'counter', ARGV[1]) return 1"
        key = f"useit:app-attest:key:{hashlib.sha256(key_id.encode()).hexdigest()}"
        return bool(await client.eval(script, 1, key, str(counter)))
    finally:
        await client.aclose()


def _verify_assertion(key: tuple[bytes, int, str], evidence: AttestationEvidence) -> int:
    public_key_der, previous_counter, app_id = key
    if app_id != evidence.app_id:
        raise ValueError("Apple App Attest app binding mismatch")
    if not evidence.client_data or len(evidence.client_data) > MAX_ASSERTION_CLIENT_DATA:
        raise ValueError("Apple App Attest clientData is missing or too large")
    try:
        import json
        client_data_bytes = evidence.client_data.encode("utf-8")
        client_obj = json.loads(client_data_bytes)
    except Exception as exc:
        raise ValueError("Apple App Attest clientData is not valid JSON") from exc
    if not isinstance(client_obj, dict) or client_obj.get("challenge") != evidence.challenge:
        raise ValueError("Apple App Attest challenge is not bound to clientData")
    assertion = cbor2.loads(_b64decode(evidence.assertion))
    if not isinstance(assertion, dict):
        raise ValueError("Apple App Attest assertion is malformed")
    auth_data = assertion.get("authenticatorData")
    signature = assertion.get("signature")
    if not isinstance(auth_data, bytes) or not isinstance(signature, bytes):
        raise ValueError("Apple App Attest assertion fields are missing")
    if len(auth_data) < 37:
        raise ValueError("Apple App Attest assertion authenticatorData is too short")
    rp_id_hash = auth_data[:32]
    counter = int.from_bytes(auth_data[33:37], "big")
    if rp_id_hash != hashlib.sha256(app_id.encode()).digest():
        raise ValueError("Apple App Attest assertion RP ID mismatch")
    if counter <= previous_counter:
        raise ValueError("Apple App Attest assertion counter did not increase")
    public_key = x509.load_der_x509_certificate(public_key_der).public_key()
    if not isinstance(public_key, ec.EllipticCurvePublicKey):
        raise ValueError("stored App Attest key is not EC")
    client_hash = hashlib.sha256(client_data_bytes).digest()
    # App Attest signs authenticatorData || clientDataHash using ECDSA-SHA256.
    # Do not pre-hash this concatenation: ECDSA(SHA256) performs that hash itself.
    signed_data = auth_data + client_hash
    public_key.verify(signature, signed_data, ec.ECDSA(hashes.SHA256()))
    return counter


class AppleAppAttestVerifier(AttestationVerifier):
    async def verify(self, evidence: AttestationEvidence) -> AttestationResult:
        try:
            if evidence.client_data is None:
                key = _verify_attestation(evidence)
                await _store_key(key, evidence.app_id)
                return AttestationResult(True, "provider_verified")
            if not evidence.key_id:
                return AttestationResult(False, "attestation_invalid")
            stored = await _load_key(evidence.key_id)
            if stored is None:
                return AttestationResult(False, "attestation_invalid")
            counter = _verify_assertion(stored, evidence)
            if not await _advance_key(evidence.key_id, counter):
                return AttestationResult(False, "attestation_replayed")
            return AttestationResult(True, "provider_verified")
        except (ValueError, TypeError, cbor2.CBORDecodeError, x509.ExtensionNotFound, InvalidSignature):
            return AttestationResult(False, "attestation_invalid")

def root_certificate_fingerprint() -> str:
    root = x509.load_pem_x509_certificate(APPLE_APP_ATTEST_ROOT_PEM.encode())
    return hashlib.sha256(root.public_bytes(Encoding.DER)).hexdigest()
