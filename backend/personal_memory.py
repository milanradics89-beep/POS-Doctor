from __future__ import annotations

import hashlib
import hmac
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

router = APIRouter(prefix="/v1/memory", tags=["memory"])

MAX_ENTRIES = 100
MEMORY_ID_MAX = 128
MEMORY_KEY_MAX = 80
MEMORY_VALUE_MAX = 1000


def _db_path() -> Path:
    return Path(os.environ.get("USEIT_MEMORY_DB", "data/useit_memory.sqlite3"))


def _memory_secret() -> bytes | None:
    value = os.environ.get("USEIT_MEMORY_SECRET")
    return value.encode("utf-8") if value else None


def _identity_hash(memory_id: str) -> str:
    secret = _memory_secret()
    if not secret:
        raise HTTPException(503, "Personal memory is not configured.")
    return hmac.new(secret, memory_id.encode("utf-8"), hashlib.sha256).hexdigest()


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
        if value.startswith("data:image/"):
            raise ValueError("Raw image data cannot be stored as personal memory")
        if any(ord(char) < 32 and char not in "\t\n" for char in value):
            raise ValueError("Memory text contains unsupported control characters")
        return value


class MemoryWriteRequest(BaseModel):
    consent: bool
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
    if not 1 <= len(memory_id) <= MEMORY_ID_MAX or any(ord(char) < 32 for char in memory_id):
        raise HTTPException(422, "Invalid memory identity.")
    return memory_id


def _upsert(identity_hash: str, entries: list[MemoryEntry]) -> int:
    connection = _connect()
    try:
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
                (identity_hash, entry.key, entry.category, entry.value, now, now),
            )
        connection.commit()
        return len(entries)
    finally:
        connection.close()


def _read(identity_hash: str) -> list[MemoryEntry]:
    connection = _connect()
    try:
        rows = connection.execute("SELECT memory_key, value, category FROM memories WHERE identity_hash = ? ORDER BY memory_key", (identity_hash,)).fetchall()
        return [MemoryEntry(key=key, value=value, category=category) for key, value, category in rows]
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
