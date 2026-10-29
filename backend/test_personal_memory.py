import sqlite3
from concurrent.futures import ThreadPoolExecutor
from threading import Barrier

from fastapi import HTTPException
from fastapi.testclient import TestClient

from backend.main import app
from backend import personal_memory as memory

client = TestClient(app)

MEMORY_A = "A" * 43
MEMORY_B = "B" * 43


def _configure(monkeypatch, tmp_path):
    monkeypatch.setenv("USEIT_MEMORY_SECRET", "test-memory-secret-that-is-long-enough-32")
    monkeypatch.setenv("USEIT_MEMORY_DB", str(tmp_path / "memory.sqlite3"))


def test_memory_requires_explicit_consent(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    response = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": False, "entries": [{"key": "favorite_color", "value": "blue", "category": "preference"}]},
    )
    assert response.status_code == 422


def test_memory_requires_opaque_memory_id(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    response = client.get("/v1/memory/user-a")
    assert response.status_code == 422


def test_memory_rejects_coerced_consent(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    for consent in (1, "true"):
        response = client.post(
            f"/v1/memory/{MEMORY_A}",
            json={"consent": consent, "entries": [{"key": "favorite_color", "value": "blue", "category": "preference"}]},
        )
        assert response.status_code == 422


def test_memory_rejects_case_insensitive_image_data_uri(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    response = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "image", "value": "DATA:IMAGE/PNG;base64,AAAA", "category": "profile"}]},
    )
    assert response.status_code == 422


def test_memory_validates_shape_and_bounds(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    bad_category = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "x", "value": "y", "category": "inference"}]},
    )
    oversized = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "x", "value": "v" * 1001, "category": "preference"}]},
    )
    assert bad_category.status_code == 422
    assert oversized.status_code == 422


def test_memory_persists_and_upserts_without_cross_user_leak(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    write = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "favorite_color", "value": "blue", "category": "preference"}]},
    )
    assert write.status_code == 200

    update = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "favorite_color", "value": "green", "category": "preference"}]},
    )
    assert update.status_code == 200

    own = client.get(f"/v1/memory/{MEMORY_A}")
    other = client.get(f"/v1/memory/{MEMORY_B}")
    assert own.status_code == 200
    assert own.json()["entries"] == [{"key": "favorite_color", "value": "green", "category": "preference"}]
    assert other.json()["entries"] == []


def test_memory_delete_all_is_complete(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "diet", "value": "vegetarian", "category": "constraint"}]},
    )
    deleted = client.delete(f"/v1/memory/{MEMORY_A}")
    assert deleted.status_code == 200
    assert deleted.json()["deleted"] == 1
    assert client.get(f"/v1/memory/{MEMORY_A}").json()["entries"] == []


def test_memory_fails_closed_without_secret(monkeypatch, tmp_path):
    monkeypatch.delenv("USEIT_MEMORY_SECRET", raising=False)
    monkeypatch.setenv("USEIT_MEMORY_DB", str(tmp_path / "memory.sqlite3"))
    response = client.get(f"/v1/memory/{MEMORY_A}")
    assert response.status_code == 503


def test_memory_fails_closed_with_weak_secret(monkeypatch, tmp_path):
    monkeypatch.setenv("USEIT_MEMORY_SECRET", "too-short")
    monkeypatch.setenv("USEIT_MEMORY_DB", str(tmp_path / "memory.sqlite3"))
    response = client.get(f"/v1/memory/{MEMORY_A}")
    assert response.status_code == 503


def test_memory_capacity_check_takes_write_lock_before_count(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    statements = []
    original_connect = memory._connect

    class RecordingConnection:
        def __init__(self, connection):
            self.connection = connection

        def execute(self, sql, parameters=()):
            statements.append(" ".join(sql.split()).upper())
            return self.connection.execute(sql, parameters)

        def commit(self):
            return self.connection.commit()

        def close(self):
            return self.connection.close()

    monkeypatch.setattr(memory, "_connect", lambda: RecordingConnection(original_connect()))
    identity_hash = memory._identity_hash(MEMORY_A)
    memory._upsert(identity_hash, [memory.MemoryEntry(key="first", value="value", category="profile")])

    begin_index = statements.index("BEGIN IMMEDIATE")
    count_index = next(i for i, statement in enumerate(statements) if statement.startswith("SELECT COUNT(*)"))
    assert begin_index < count_index


def test_memory_capacity_limit_holds_under_concurrent_writes(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    identity_hash = memory._identity_hash(MEMORY_A)

    # Leave exactly one slot. Separate batches keep setup realistic while
    # avoiding the API's per-request limit of 20 entries.
    for start in range(0, memory.MAX_ENTRIES - 1, 20):
        entries = [
            memory.MemoryEntry(key=f"seed_{index}", value="value", category="profile")
            for index in range(start, min(start + 20, memory.MAX_ENTRIES - 1))
        ]
        memory._upsert(identity_hash, entries)

    barrier = Barrier(2)

    def insert(key: str) -> str:
        barrier.wait(timeout=5)
        try:
            memory._upsert(identity_hash, [memory.MemoryEntry(key=key, value="value", category="profile")])
            return "stored"
        except HTTPException as exc:
            if exc.status_code == 422:
                return "capacity"
            raise

    with ThreadPoolExecutor(max_workers=2) as executor:
        outcomes = [
            executor.submit(insert, "concurrent_a"),
            executor.submit(insert, "concurrent_b"),
        ]
        results = [future.result(timeout=10) for future in outcomes]

    assert sorted(results) == ["capacity", "stored"]
    assert len(memory._read(identity_hash)) == memory.MAX_ENTRIES



def test_memory_values_are_encrypted_at_rest(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    response = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "favorite_color", "value": "private-blue-value", "category": "preference"}]},
    )
    assert response.status_code == 200

    with sqlite3.connect(tmp_path / "memory.sqlite3") as connection:
        stored = connection.execute(
            "SELECT value FROM memories WHERE memory_key = 'favorite_color'"
        ).fetchone()[0]
    assert stored.startswith(memory._MEMORY_CIPHER_PREFIX)
    assert "private-blue-value" not in stored

    read = client.get(f"/v1/memory/{MEMORY_A}")
    assert read.status_code == 200
    assert read.json()["entries"][0]["value"] == "private-blue-value"


def test_memory_migrates_legacy_plaintext_rows_once(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    identity_hash = memory._identity_hash(MEMORY_A)
    db_path = tmp_path / "memory.sqlite3"
    with sqlite3.connect(db_path) as connection:
        connection.execute(
            """CREATE TABLE memories (
                identity_hash TEXT NOT NULL,
                memory_key TEXT NOT NULL,
                category TEXT NOT NULL,
                value TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                PRIMARY KEY (identity_hash, memory_key)
            )"""
        )
        connection.execute(
            "INSERT INTO memories VALUES (?, ?, ?, ?, ?, ?)",
            (identity_hash, "legacy_note", "profile", "legacy-private-value", "2026-01-01T00:00:00+00:00", "2026-01-01T00:00:00+00:00"),
        )

    entries = memory._read(identity_hash)
    assert entries[0].value == "legacy-private-value"

    with sqlite3.connect(db_path) as connection:
        stored = connection.execute("SELECT value FROM memories WHERE memory_key = 'legacy_note'").fetchone()[0]
        version = connection.execute(
            "SELECT metadata_value FROM memory_metadata WHERE metadata_key = 'encryption_version'"
        ).fetchone()[0]
    assert stored.startswith(memory._MEMORY_CIPHER_PREFIX)
    assert "legacy-private-value" not in stored
    assert version == "1"



def test_memory_ciphertext_tampering_fails_closed(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    written = client.post(
        f"/v1/memory/{MEMORY_A}",
        json={"consent": True, "entries": [{"key": "private_note", "value": "do-not-leak", "category": "profile"}]},
    )
    assert written.status_code == 200

    with sqlite3.connect(tmp_path / "memory.sqlite3") as connection:
        connection.execute(
            "UPDATE memories SET value = ? WHERE memory_key = 'private_note'",
            (memory._MEMORY_CIPHER_PREFIX + "A" * 40,),
        )

    read = client.get(f"/v1/memory/{MEMORY_A}")
    assert read.status_code == 503
    assert "do-not-leak" not in read.text



def test_memory_legacy_migration_is_safe_under_concurrent_reads(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    identity_hash = memory._identity_hash(MEMORY_A)
    db_path = tmp_path / "memory.sqlite3"
    with sqlite3.connect(db_path) as connection:
        connection.execute(
            """CREATE TABLE memories (
                identity_hash TEXT NOT NULL,
                memory_key TEXT NOT NULL,
                category TEXT NOT NULL,
                value TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                PRIMARY KEY (identity_hash, memory_key)
            )"""
        )
        connection.execute(
            "INSERT INTO memories VALUES (?, ?, ?, ?, ?, ?)",
            (identity_hash, "legacy_note", "profile", "legacy-private-value", "2026-01-01T00:00:00+00:00", "2026-01-01T00:00:00+00:00"),
        )

    with ThreadPoolExecutor(max_workers=2) as executor:
        results = list(executor.map(lambda _: memory._read(identity_hash), range(2)))

    assert all(entries[0].value == "legacy-private-value" for entries in results)
    with sqlite3.connect(db_path) as connection:
        version = connection.execute(
            "SELECT metadata_value FROM memory_metadata WHERE metadata_key = 'encryption_version'"
        ).fetchone()[0]
    assert version == "1"



def test_memory_migrates_legacy_values_that_start_with_enc_prefix(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    identity_hash = memory._identity_hash(MEMORY_A)
    db_path = tmp_path / "memory.sqlite3"
    legacy_value = "enc: this is ordinary user text"
    with sqlite3.connect(db_path) as connection:
        connection.execute(
            """CREATE TABLE memories (
                identity_hash TEXT NOT NULL,
                memory_key TEXT NOT NULL,
                category TEXT NOT NULL,
                value TEXT NOT NULL,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL,
                PRIMARY KEY (identity_hash, memory_key)
            )"""
        )
        connection.execute(
            "INSERT INTO memories VALUES (?, ?, ?, ?, ?, ?)",
            (identity_hash, "legacy_note", "profile", legacy_value, "2026-01-01T00:00:00+00:00", "2026-01-01T00:00:00+00:00"),
        )

    entries = memory._read(identity_hash)
    assert entries[0].value == legacy_value
