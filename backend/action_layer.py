from __future__ import annotations

import hashlib
import json
import os
import sqlite3
from datetime import datetime, timezone
from enum import Enum
from pathlib import Path
from typing import Any

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, field_validator

router = APIRouter(prefix="/v1/actions", tags=["actions"])

MAX_CANDIDATES = 10
MAX_METADATA_KEYS = 12
MAX_METADATA_VALUE = 500
MAX_PAYLOAD_KEYS = 8
MAX_PAYLOAD_VALUE = 1000
PLAN_VERSION = "action_plan_v1"


class ActionType(str, Enum):
    VISUALIZE = "visualize"
    SHOP = "shop"
    RECIPE = "recipe"
    STYLE = "style"
    REPAIR_GUIDE = "repair_guide"
    RECOMMEND = "recommend"
    EXPLAIN = "explain"


PAYLOAD_KEYS = {
    ActionType.VISUALIZE: {"preserveSource"},
    ActionType.SHOP: {"comparePrices"},
    ActionType.RECIPE: {"includeMissingIngredients"},
    ActionType.STYLE: {"showAlternatives"},
    ActionType.REPAIR_GUIDE: {"safetyFirst"},
    ActionType.RECOMMEND: set(),
    ActionType.EXPLAIN: set(),
}

CONFIRMATION_REQUIRED = {
    ActionType.VISUALIZE,
    ActionType.SHOP,
    ActionType.STYLE,
    ActionType.REPAIR_GUIDE,
}


def _enabled_adapters() -> set[str]:
    """Read adapter configuration at execution time, avoiding stale import-time state."""
    return {
        name.strip()
        for name in os.environ.get("USEIT_ACTION_ADAPTERS", "").split(",")
        if name.strip()
    }


class ActionRequest(BaseModel):
    actionType: ActionType
    title: str = Field(min_length=1, max_length=160)
    candidateIds: list[str] = Field(default_factory=list, max_length=MAX_CANDIDATES)
    payload: dict[str, Any] = Field(default_factory=dict, max_length=MAX_PAYLOAD_KEYS)
    metadata: dict[str, str] = Field(default_factory=dict, max_length=MAX_METADATA_KEYS)

    @field_validator("candidateIds")
    @classmethod
    def validate_candidates(cls, values: list[str]) -> list[str]:
        if len(set(values)) != len(values):
            raise ValueError("candidateIds must be unique")
        for value in values:
            if not 1 <= len(value) <= 128:
                raise ValueError("candidateIds contain an invalid identifier")
        return values

    @field_validator("payload")
    @classmethod
    def validate_payload(cls, values: dict[str, Any]) -> dict[str, Any]:
        for key, value in values.items():
            if not 1 <= len(str(key)) <= 64:
                raise ValueError("payload key is invalid")
            if isinstance(value, str) and len(value) > MAX_PAYLOAD_VALUE:
                raise ValueError("payload value is too long")
            if isinstance(value, (dict, list)):
                raise ValueError("nested payload values are not supported")
        return values

    @field_validator("metadata")
    @classmethod
    def validate_metadata(cls, values: dict[str, str]) -> dict[str, str]:
        for key, value in values.items():
            if not 1 <= len(key) <= 64 or len(value) > MAX_METADATA_VALUE:
                raise ValueError("metadata exceeds the supported bounds")
        return values


class PlanResponse(BaseModel):
    planId: str
    planVersion: str
    actionType: ActionType
    title: str
    candidateIds: list[str]
    payload: dict[str, Any]
    requiresConfirmation: bool
    state: str


class ExecuteRequest(BaseModel):
    idempotencyKey: str = Field(min_length=8, max_length=128)
    confirmation: bool = False

    @field_validator("idempotencyKey")
    @classmethod
    def validate_key(cls, value: str) -> str:
        if any(ord(char) < 32 for char in value):
            raise ValueError("Invalid idempotency key")
        return value


class ExecutionResponse(BaseModel):
    planId: str
    state: str
    idempotent: bool
    message: str


def _db_path() -> Path:
    return Path(os.environ.get("USEIT_ACTION_DB", "data/useit_actions.sqlite3"))


def _connect() -> sqlite3.Connection:
    path = _db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    connection.execute(
        """CREATE TABLE IF NOT EXISTS action_plans (
            plan_id TEXT PRIMARY KEY,
            plan_json TEXT NOT NULL,
            created_at TEXT NOT NULL
        )"""
    )
    connection.execute(
        """CREATE TABLE IF NOT EXISTS action_executions (
            idempotency_key TEXT PRIMARY KEY,
            plan_id TEXT NOT NULL,
            state TEXT NOT NULL,
            created_at TEXT NOT NULL
        )"""
    )
    return connection


def _validate_payload_for_action(request: ActionRequest) -> None:
    unknown = set(request.payload) - PAYLOAD_KEYS[request.actionType]
    if unknown:
        raise HTTPException(422, "Payload contains unsupported action fields.")


def _stable_plan_id(request: ActionRequest) -> str:
    canonical = json.dumps(
        {
            "version": PLAN_VERSION,
            "actionType": request.actionType.value,
            "title": request.title.strip(),
            "candidateIds": request.candidateIds,
            "payload": request.payload,
            "metadata": request.metadata,
        },
        sort_keys=True,
        separators=(",", ":"),
        ensure_ascii=False,
    )
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()[:32]


def _plan(request: ActionRequest) -> PlanResponse:
    _validate_payload_for_action(request)
    plan = PlanResponse(
        planId=_stable_plan_id(request),
        planVersion=PLAN_VERSION,
        actionType=request.actionType,
        title=request.title.strip(),
        candidateIds=request.candidateIds,
        payload=request.payload,
        requiresConfirmation=request.actionType in CONFIRMATION_REQUIRED,
        state="planned",
    )
    connection = _connect()
    try:
        connection.execute(
            "INSERT OR IGNORE INTO action_plans(plan_id, plan_json, created_at) VALUES (?, ?, ?)",
            (plan.planId, plan.model_dump_json(), datetime.now(timezone.utc).isoformat()),
        )
        connection.commit()
    finally:
        connection.close()
    return plan


def _load_plan(plan_id: str) -> PlanResponse:
    connection = _connect()
    try:
        row = connection.execute(
            "SELECT plan_json FROM action_plans WHERE plan_id = ?", (plan_id,)
        ).fetchone()
    finally:
        connection.close()
    if not row:
        raise HTTPException(404, "Action plan was not found.")
    return PlanResponse.model_validate_json(row[0])


@router.post("/plan", response_model=PlanResponse)
async def plan_action(request: ActionRequest) -> PlanResponse:
    return _plan(request)


@router.post("/{plan_id}/execute", response_model=ExecutionResponse)
async def execute_action(plan_id: str, request: ExecuteRequest) -> ExecutionResponse:
    if len(plan_id) != 32:
        raise HTTPException(422, "Invalid action plan identifier.")
    plan = _load_plan(plan_id)
    connection = _connect()
    try:
        existing = connection.execute(
            "SELECT plan_id, state FROM action_executions WHERE idempotency_key = ?",
            (request.idempotencyKey,),
        ).fetchone()
        if existing:
            if existing[0] != plan.planId:
                raise HTTPException(409, "Idempotency key is already bound to another action plan.")
            return ExecutionResponse(planId=plan.planId, state=existing[1], idempotent=True, message="Action was already accepted for this idempotency key.")
        if plan.requiresConfirmation and request.confirmation is not True:
            raise HTTPException(428, "Explicit confirmation is required before executing this action.")
        if plan.actionType.value not in _enabled_adapters():
            raise HTTPException(503, "Action adapter is not configured; execution failed closed.")
        connection.execute(
            "INSERT INTO action_executions(idempotency_key, plan_id, state, created_at) VALUES (?, ?, ?, ?)",
            (request.idempotencyKey, plan.planId, "accepted", datetime.now(timezone.utc).isoformat()),
        )
        connection.commit()
        return ExecutionResponse(planId=plan.planId, state="accepted", idempotent=False, message="Action accepted by the configured adapter boundary.")
    finally:
        connection.close()
