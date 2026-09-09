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
PLAN_VERSION = "action_plan_v1"


class ActionType(str, Enum):
    VISUALIZE = "visualize"
    SHOP = "shop"
    RECIPE = "recipe"
    STYLE = "style"
    REPAIR_GUIDE = "repair_guide"
    RECOMMEND = "recommend"
    EXPLAIN = "explain"


class ActionRequest(BaseModel):
    actionType: ActionType
    title: str = Field(min_length=1, max_length=160)
    candidateIds: list[str] = Field(default_factory=list, max_length=MAX_CANDIDATES)
    payload: dict[str, Any] = Field(default_factory=dict)
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


CONFIRMATION_REQUIRED = {
    ActionType.VISUALIZE,
    ActionType.SHOP,
    ActionType.STYLE,
    ActionType.REPAIR_GUIDE,
}

# External side effects remain disabled until explicit adapters are configured.
ENABLED_ADAPTERS = {
    name.strip()
    for name in os.environ.get("USEIT_ACTION_ADAPTERS", "").split(",")
    if name.strip()
}


def _db_path() -> Path:
    return Path(os.environ.get("USEIT_ACTION_DB", "data/useit_actions.sqlite3"))


def _connect() -> sqlite3.Connection:
    path = _db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(path)
    connection.execute(
        """CREATE TABLE IF NOT EXISTS action_executions (
            idempotency_key TEXT PRIMARY KEY,
            plan_id TEXT NOT NULL,
            state TEXT NOT NULL,
            created_at TEXT NOT NULL
        )"""
    )
    return connection


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
    plan_id = _stable_plan_id(request)
    return PlanResponse(
        planId=plan_id,
        planVersion=PLAN_VERSION,
        actionType=request.actionType,
        title=request.title.strip(),
        candidateIds=request.candidateIds,
        payload=request.payload,
        requiresConfirmation=request.actionType in CONFIRMATION_REQUIRED,
        state="planned",
    )


def _execute(plan: PlanResponse, request: ExecuteRequest) -> ExecutionResponse:
    connection = _connect()
    try:
        existing = connection.execute(
            "SELECT plan_id, state FROM action_executions WHERE idempotency_key = ?",
            (request.idempotencyKey,),
        ).fetchone()
        if existing:
            if existing[0] != plan.planId:
                raise HTTPException(409, "Idempotency key is already bound to another action plan.")
            return ExecutionResponse(
                planId=plan.planId,
                state=existing[1],
                idempotent=True,
                message="Action was already accepted for this idempotency key.",
            )

        if plan.requiresConfirmation and request.confirmation is not True:
            raise HTTPException(428, "Explicit confirmation is required before executing this action.")

        adapter = plan.actionType.value
        if adapter not in ENABLED_ADAPTERS:
            raise HTTPException(503, "Action adapter is not configured; execution failed closed.")

        now = datetime.now(timezone.utc).isoformat()
        connection.execute(
            "INSERT INTO action_executions(idempotency_key, plan_id, state, created_at) VALUES (?, ?, ?, ?)",
            (request.idempotencyKey, plan.planId, "accepted", now),
        )
        connection.commit()
        return ExecutionResponse(
            planId=plan.planId,
            state="accepted",
            idempotent=False,
            message="Action accepted by the configured adapter boundary.",
        )
    finally:
        connection.close()


@router.post("/plan", response_model=PlanResponse)
async def plan_action(request: ActionRequest) -> PlanResponse:
    return _plan(request)


@router.post("/{plan_id}/execute", response_model=ExecutionResponse)
async def execute_action(plan_id: str, request: ExecuteRequest) -> ExecutionResponse:
    if not 1 <= len(plan_id) <= 64:
        raise HTTPException(422, "Invalid action plan identifier.")
    # Execution is intentionally bound to the immutable plan identifier. The client cannot
    # smuggle a new payload into execution, because the full plan must have been planned first.
    plan = PlanResponse(
        planId=plan_id,
        planVersion=PLAN_VERSION,
        actionType=ActionType.EXPLAIN,
        title="Existing action plan",
        candidateIds=[],
        payload={},
        requiresConfirmation=False,
        state="planned",
    )
    connection = _connect()
    try:
        existing = connection.execute(
            "SELECT state FROM action_executions WHERE idempotency_key = ? AND plan_id = ?",
            (request.idempotencyKey, plan_id),
        ).fetchone()
        if existing:
            return ExecutionResponse(
                planId=plan_id,
                state=existing[0],
                idempotent=True,
                message="Action was already accepted for this idempotency key.",
            )
    finally:
        connection.close()
    raise HTTPException(409, "Plan must be revalidated before execution; use a supported action plan reference.")
