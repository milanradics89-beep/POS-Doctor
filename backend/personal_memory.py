from __future__ import annotations

import base64
import hashlib
import hmac
import os
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from cryptography.exceptions import InvalidTag
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, StrictBool, field_validator

router = APIRouter(prefix="/v1/memory", tags=["memory"])

MAX_ENTRIES = 100
MEMORY_ID_MAX = 128
MEMORY_KEY_MAX = 80
MEMORY_VALUE_MAX = 1000
MIN_MEMORY_SECRET_LENGTH = 32
_MEMORY_ID_RE = re.compile(r"^[A-Za-z0-9_-]{32,128}$")
_MEMORY_CIPHER_PREFIX = "enc:v1:"
_MEMORY_NONCE_BYTES = 12


def _db_path() -> Path:
    return Path(os.environ.get("USEIT_MEMORY_DB", "data/useit_memory.sqlite3"))


def _memory_secret() -> bytes | None:
    value = os.environ.get("USEIT_MEMORY_SECRET")
    if not value or len(value.encode("utf-8")) < MIN_MEMORY_SECRET_LENGTH:
        return None
    return value.encode("utf-8")


def _identity_hash(memory_id: str) -> str:
    secret = _memory_secret()
    if not secret:
        raise HTTPException(503, "Personal memory is not configured.")
    return hmac.new(secret, memory_id.encode("utf-8"), hashlib.sha256).hexdigest()


def _encryption_key() -> bytes:
    secret = _memory_secret()
    if not secret:
        raise HTTPException(503, "Personal memory is not configured.")
    # Domain separation prevents the identity-HMAC key from being reused directly.
    return hashlib.sha256(b"useit:personal-memory-encryption:v1\0" + secret).digest()


def _associated_data(identity_hash: str, key: str, category: str) -> bytes:
    return f"{identity_hash}\0{key}\0{category}\0v1".encode("utf-8")


def _encrypt_value(identity_hash: str, key: str, category: str, value: str) -> str:
    nonce = os.urandom(_MEMORY_NONCE_BYTES)
    ciphertext = AESGCM(_encryption_key()).encrypt(
        nonce,
        value.encode("utf-8"),
        _associated_data(identity_hash, key, category),
    )
    encoded = base64.urlsafe_b64encode(nonce + ciphertext).decode("ascii").rstrip("=")
    return _MEMORY_CIPHER_PREFIX + encoded


def _decrypt_value(identity_hash: str, key: str, category: str, stored: str) -> str:
    if not stored.startswith(_MEMORY_CIPHER_PREFIX):
        raise HTTPException(503, "Personal memory data is not encrypted.")
    encoded = stored[len(_MEMORY_CIPHER_PREFIX):]
    if not encoded or not re.fullmatch(r"[A-Za-z0-9_-]+", encoded):
        raise HTTPException(503, "Personal memory data could not be decrypted.")
    try:
        payload = base64.urlsafe_b64decode(encoded + "=" * (-len(encoded) % 4))
        if base64.urlsafe_b64encode(payload).decode("ascii").rstrip("=") != encoded:
            raise ValueError("Non-canonical ciphertext encoding")
        if len(payload) < _MEMORY_NONCE_BYTES + 16:
            raise ValueError("Ciphertext is too short")
        nonce, ciphertext = payload[:_MEMORY_NONCE_BYTES], payload[_MEMORY_NONCE_BYTES:]
        plaintext = AESGCM(_encryption_key()).decrypt(
            nonce,
            ciphertext,
            _associated_data(identity_hash, key, category),
        )
        return plaintext.decode("utf-8")
    except (InvalidTag, ValueError, UnicodeDecodeError) as exc:
        raise HTTPException(503, "Personal memory data could not be decrypted.") from exc


def _connect() -> sqlite3.Connection:
    path = _db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    connection.execute(
        """CREATE TABLE IF NOT EXISTS memories (
            identity_hash TEXT NOT NULL,
            memory_key TEXT NOT NULL,
            category TEXT NOT NULL,
            value TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            PRIMARY KEY (identity_hash, memory_key)
        )"""
    )
    connection.execute("CREATE INDEX IF NOT EXISTS idx_memories_identity ON memories(identity_hash)")
    connection.execute(
        "CREATE TABLE IF NOT EXISTS memory_metadata (metadata_key TEXT PRIMARY KEY, metadata_value TEXT NOT NULL)"
    )
    try:
        version = connection.execute(
            "SELECT metadata_value FROM memory_metadata WHERE metadata_key = 'encryption_version'"
        ).fetchone()
        if version is None:
            if not _memory_secret():
                raise HTTPException(503, "Personal memory is not configured.")
            # Acquire the write lock before re-checking the version. Concurrent
            # first requests must not both attempt the one-time migration.
            connection.execute("BEGIN IMMEDIATE")
            version = connection.execute(
                "SELECT metadata_value FROM memory_metadata WHERE metadata_key = 'encryption_version'"
            ).fetchone()
            if version is None:
                # One-time migration of legacy plaintext rows. The transaction
                # prevents partially migrated records from being marked encrypted.
                rows = connection.execute(
                    "SELECT identity_hash, memory_key, category, value FROM memories"
                ).fetchall()
                for identity_hash, key, category, stored in rows:
                    if stored.startswith(_MEMORY_CIPHER_PREFIX):
                        continue
                    if stored.startswith("enc:"):
                        raise HTTPException(503, "Personal memory uses an unsupported encryption version.")
                    connection.execute(
                        "UPDATE memories SET value = ? WHERE identity_hash = ? AND memory_key = ?",
                        (_encrypt_value(identity_hash, key, category, stored), identity_hash, key),
                    )
                connection.execute(
                    "INSERT INTO memory_metadata(metadata_key, metadata_value) VALUES ('encryption_version', '1')"
                )
            elif version[0] != "1":
                raise HTTPException(503, "Personal memory uses an unsupported encryption version.")
            connection.commit()
        elif version[0] != "1":
            raise HTTPException(503, "Personal memory uses an unsupported encryption version.")
    except Exception:
        connection.close()
        raise
    return connection


class MemoryEntry(BaseModel):
    key: str = Field(min_length=1, max_length=MEMORY_KEY_MAX)
    value: str = Field(min_length=1, max_length=MEMORY_VALUE_MAX)
    category: Literal["preference", "profile", "routine", "constraint"]

    @field_validator("key", "value")
    @classmethod
    def validate_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Memory text cannot be empty")
        if value.lower().startswith("data:image/"):
            raise ValueError("Raw image data cannot be stored as personal memory")
        if any(ord(char) < 32 and char not in "\t\n" for char in value):
            raise ValueError("Memory text contains unsupported control characters")
        return value


class MemoryWriteRequest(BaseModel):
    consent: StrictBool
    entries: list[MemoryEntry] = Field(min_length=1, max_length=20)

    @field_validator("consent")
    @classmethod
    def require_consent(cls, value: bool) -> bool:
        if value is not True:
            raise ValueError("Explicit consent is required to write personal memory")
        return value


class MemoryReadResponse(BaseModel):
    memoryId: str
    entries: list[MemoryEntry]
    sourcePolicy: str


def _validate_memory_id(memory_id: str) -> str:
    # The ID acts as a capability for a memory record, so it must be an opaque,
    # high-entropy URL-safe token rather than a guessable username or profile ID.
    if not _MEMORY_ID_RE.fullmatch(memory_id):
        raise HTTPException(422, "Memory identity must be an opaque URL-safe token of at least 32 characters.")
    return memory_id


def _upsert(identity_hash: str, entries: list[MemoryEntry]) -> int:
    connection = _connect()
    try:
        # Serialize the capacity check and writes so concurrent requests cannot
        # both observe spare capacity and exceed MAX_ENTRIES.
        connection.execute("BEGIN IMMEDIATE")
        existing = connection.execute("SELECT COUNT(*) FROM memories WHERE identity_hash = ?", (identity_hash,)).fetchone()[0]
        unique_new = {entry.key for entry in entries}
        existing_keys = {row[0] for row in connection.execute("SELECT memory_key FROM memories WHERE identity_hash = ?", (identity_hash,))}
        if existing + len(unique_new - existing_keys) > MAX_ENTRIES:
            raise HTTPException(422, f"Personal memory is limited to {MAX_ENTRIES} entries.")
        now = datetime.now(timezone.utc).isoformat()
        for entry in entries:
            connection.execute(
                """INSERT INTO memories(identity_hash, memory_key, category, value, created_at, updated_at)
                   VALUES (?, ?, ?, ?, ?, ?)
                   ON CONFLICT(identity_hash, memory_key) DO UPDATE SET
                     category = excluded.category, value = excluded.value, updated_at = excluded.updated_at""",
                (identity_hash, entry.key, entry.category, _encrypt_value(identity_hash, entry.key, entry.category, entry.value), now, now),
            )
        connection.commit()
        return len(entries)
    finally:
        connection.close()


def _read(identity_hash: str) -> list[MemoryEntry]:
    connection = _connect()
    try:
        rows = connection.execute(
            "SELECT memory_key, category, value FROM memories WHERE identity_hash = ? ORDER BY memory_key",
            (identity_hash,),
        ).fetchall()
        return [
            MemoryEntry(
                key=key,
                value=_decrypt_value(identity_hash, key, category, stored),
                category=category,
            )
            for key, category, stored in rows
        ]
    finally:
        connection.close()


def _delete(identity_hash: str) -> int:
    connection = _connect()
    try:
        cursor = connection.execute("DELETE FROM memories WHERE identity_hash = ?", (identity_hash,))
        connection.commit()
        return cursor.rowcount
    finally:
        connection.close()


@router.post("/{memory_id}")
async def write_memory(memory_id: str, request: MemoryWriteRequest):
    memory_id = _validate_memory_id(memory_id)
    count = _upsert(_identity_hash(memory_id), request.entries)
    return {"memoryId": memory_id, "stored": count, "sourcePolicy": "Only explicit user-provided memory is stored. Scene observations and model inferences are not memory."}


@router.get("/{memory_id}", response_model=MemoryReadResponse)
async def read_memory(memory_id: str):
    memory_id = _validate_memory_id(memory_id)
    return MemoryReadResponse(memoryId=memory_id, entries=_read(_identity_hash(memory_id)), sourcePolicy="Only explicit user-provided memory is stored. Scene observations and model inferences are not memory.")


@router.delete("/{memory_id}")
async def delete_memory(memory_id: str):
    memory_id = _validate_memory_id(memory_id)
    return {"memoryId": memory_id, "deleted": _delete(_identity_hash(memory_id))}
