from enum import Enum
from typing import Any
from pydantic import BaseModel, Field


class SceneType(str, Enum):
    room = "room"
    table = "table"
    fridge = "fridge"
    wardrobe = "wardrobe"
    garage = "garage"
    garden = "garden"
    objects = "objects"
    food = "food"
    mixed = "mixed"
    unknown = "unknown"


class UserMode(str, Enum):
    keep = "keep"
    replace = "replace"
    buy = "buy"
    organize = "organize"
    cook = "cook"
    outfit = "outfit"
    explore = "explore"


class DomainIntent(BaseModel):
    scene_type: SceneType
    mode: UserMode = UserMode.explore
    budget_huf: int | None = Field(default=None, ge=0)
    preserve_existing: bool = True
    preferred_styles: list[str] = Field(default_factory=list)
    preferred_colors: list[str] = Field(default_factory=list)


class Action(BaseModel):
    id: str
    title: str
    description: str
    kind: str
    priority: int = Field(ge=1, le=5)
    requires_shopping: bool = False
    product_categories: list[str] = Field(default_factory=list)
    estimated_budget_huf: int | None = Field(default=None, ge=0)
    visualizable: bool = False
    metadata: dict[str, Any] = Field(default_factory=dict)


def build_actions(scene: dict[str, Any], intent: DomainIntent) -> list[Action]:
    opportunities = scene.get("opportunities") or []
    actions: list[Action] = []
    for index, item in enumerate(opportunities[:8], start=1):
        missing = item.get("missingItems") or []
        actions.append(Action(
            id=str(item.get("id") or f"action-{index}"),
            title=str(item.get("title") or "USEIT recommendation"),
            description=str(item.get("description") or ""),
            kind=str(item.get("kind") or "improve"),
            priority=max(1, 6 - index),
            requires_shopping=bool(missing),
            product_categories=missing,
            visualizable=bool(item.get("visualizable")),
            metadata={"sceneType": intent.scene_type.value, "mode": intent.mode.value},
        ))
    return actions
