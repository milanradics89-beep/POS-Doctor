from fastapi.testclient import TestClient

from backend.main import app

client = TestClient(app)


def _configure(monkeypatch, tmp_path):
    monkeypatch.setenv("USEIT_MEMORY_SECRET", "test-memory-secret")
    monkeypatch.setenv("USEIT_MEMORY_DB", str(tmp_path / "memory.sqlite3"))


def test_memory_requires_explicit_consent(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    response = client.post(
        "/v1/memory/user-a",
        json={"consent": False, "entries": [{"key": "favorite_color", "value": "blue", "category": "preference"}]},
    )
    assert response.status_code == 422


def test_memory_persists_and_upserts_without_cross_user_leak(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    write = client.post(
        "/v1/memory/user-a",
        json={"consent": True, "entries": [{"key": "favorite_color", "value": "blue", "category": "preference"}]},
    )
    assert write.status_code == 200

    update = client.post(
        "/v1/memory/user-a",
        json={"consent": True, "entries": [{"key": "favorite_color", "value": "green", "category": "preference"}]},
    )
    assert update.status_code == 200

    own = client.get("/v1/memory/user-a")
    other = client.get("/v1/memory/user-b")
    assert own.status_code == 200
    assert own.json()["entries"] == [{"key": "favorite_color", "value": "green", "category": "preference"}]
    assert other.json()["entries"] == []


def test_memory_delete_all_is_complete(monkeypatch, tmp_path):
    _configure(monkeypatch, tmp_path)
    client.post(
        "/v1/memory/user-a",
        json={"consent": True, "entries": [{"key": "diet", "value": "vegetarian", "category": "constraint"}]},
    )
    deleted = client.delete("/v1/memory/user-a")
    assert deleted.status_code == 200
    assert deleted.json()["deleted"] == 1
    assert client.get("/v1/memory/user-a").json()["entries"] == []


def test_memory_fails_closed_without_secret(monkeypatch, tmp_path):
    monkeypatch.delenv("USEIT_MEMORY_SECRET", raising=False)
    monkeypatch.setenv("USEIT_MEMORY_DB", str(tmp_path / "memory.sqlite3"))
    response = client.get("/v1/memory/user-a")
    assert response.status_code == 503
