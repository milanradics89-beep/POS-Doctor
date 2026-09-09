from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True)
class SpecialistProfile:
    name: str
    label: str
    domains: tuple[str, ...]
    focus: tuple[str, ...]
    safety: str


SPECIALISTS: tuple[SpecialistProfile, ...] = (
    SpecialistProfile(
        name="home_design",
        label="Home & Space Specialist",
        domains=("room", "interior", "furniture", "decor", "workspace"),
        focus=("layout", "proportion", "style", "lighting", "product fit"),
        safety="Avoid structural, electrical, or construction instructions unless explicitly supported by evidence.",
    ),
    SpecialistProfile(
        name="repair",
        label="Repair Specialist",
        domains=("device", "tool", "appliance", "hardware", "damage"),
        focus=("diagnosis", "safe checks", "repair options", "replacement decision"),
        safety="Do not recommend opening mains-powered, pressurized, heated, or otherwise hazardous equipment without appropriate safety context.",
    ),
    SpecialistProfile(
        name="cooking",
        label="Cooking Specialist",
        domains=("food", "meal", "ingredient", "kitchen"),
        focus=("ingredients", "technique", "substitutions", "timing", "food safety"),
        safety="Flag uncertain food identification and avoid unsafe handling or consumption advice.",
    ),
    SpecialistProfile(
        name="shopping",
        label="Shopping Specialist",
        domains=("product", "retail", "furniture", "accessory", "equipment"),
        focus=("requirements", "compatibility", "value", "alternatives", "product evidence"),
        safety="Never invent product specifications, prices, availability, or compatibility.",
    ),
    SpecialistProfile(
        name="general",
        label="General Discovery Specialist",
        domains=(),
        focus=("identify", "explain", "prioritize", "next action"),
        safety="Prefer clarification when uncertainty could materially change the recommendation.",
    ),
)


def _tokens(scene: dict[str, Any]) -> set[str]:
    values: list[str] = []
    values.append(str(scene.get("sceneType", "")))
    values.append(str(scene.get("category", "")))
    for item in scene.get("items", [])[:12]:
        if isinstance(item, dict):
            values.extend(str(item.get(k, "")) for k in ("category", "name", "type"))
    return {token.strip().lower() for value in values for token in value.replace("/", " ").replace("_", " ").split() if token.strip()}


def _intent_name(intent: dict[str, Any] | None) -> str:
    return str((intent or {}).get("name", "")).lower()


def select_specialist(scene: dict[str, Any], intent: dict[str, Any] | None = None) -> SpecialistProfile:
    """Select exactly one primary specialist using bounded, deterministic evidence.

    Specialist selection is deliberately deterministic at this layer. It gives later
    agent implementations a stable contract instead of letting an LLM freely invent
    routing decisions from unbounded scene text.
    """
    tokens = _tokens(scene)
    intent_name = _intent_name(intent)

    if intent_name == "cook" or {"food", "ingredient", "meal"} & tokens:
        return SPECIALISTS[2]
    if intent_name == "shop":
        if {"room", "interior", "furniture", "decor"} & tokens:
            return SPECIALISTS[0]
        return SPECIALISTS[3]
    if intent_name == "fix" or {"device", "tool", "appliance", "hardware", "damage"} & tokens:
        return SPECIALISTS[1]
    if {"room", "interior", "furniture", "decor", "workspace"} & tokens:
        return SPECIALISTS[0]
    return SPECIALISTS[4]


def build_specialist_context(
    scene: dict[str, Any], intent: dict[str, Any] | None = None
) -> dict[str, Any]:
    specialist = select_specialist(scene, intent)
    return {
        "name": specialist.name,
        "label": specialist.label,
        "focus": list(specialist.focus),
        "safety": specialist.safety,
        "evidencePolicy": "Use only normalized scene facts, explicit user intent, and verified tool results. Do not infer hidden attributes as facts.",
    }
