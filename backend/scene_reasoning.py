from __future__ import annotations

from typing import Any

RELATION_CONFIDENCE_FLOOR = 0.55
MAX_RELATIONS = 40


def _key(value: Any) -> str:
    return str(value or "").strip().lower()


def normalize_relations(analysis: dict[str, Any]) -> list[dict[str, Any]]:
    """Return conservative, deduplicated scene relations from vision output."""
    items = analysis.get("items", []) or []
    visible = {_key(item.get("name")) for item in items if _key(item.get("name"))}
    relations = analysis.get("relations", []) or []
    seen: set[tuple[str, str, str]] = set()
    normalized: list[dict[str, Any]] = []

    for relation in relations:
        source = _key(relation.get("source"))
        target = _key(relation.get("target"))
        predicate = _key(relation.get("relation"))
        try:
            confidence = float(relation.get("confidence", 0))
        except (TypeError, ValueError):
            continue
        if not source or not target or not predicate or source == target:
            continue
        if source not in visible or target not in visible or confidence < RELATION_CONFIDENCE_FLOOR:
            continue
        key = (source, target, predicate)
        if key in seen:
            continue
        seen.add(key)
        normalized.append({"source": source, "target": target, "relation": predicate, "confidence": round(confidence, 3)})
        if len(normalized) >= MAX_RELATIONS:
            break
    return normalized


def derive_scene_facts(analysis: dict[str, Any]) -> list[dict[str, Any]]:
    """Derive bounded facts only from explicit, sufficiently confident relations."""
    facts: list[dict[str, Any]] = []
    for relation in normalize_relations(analysis):
        facts.append({
            "type": "relation",
            "subject": relation["source"],
            "predicate": relation["relation"],
            "object": relation["target"],
            "confidence": relation["confidence"],
        })
    return facts
