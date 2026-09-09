from __future__ import annotations

from typing import Any

MAX_RELATIONS = 40
MIN_RELATION_CONFIDENCE = 0.55


def _confidence(value: Any) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def normalize_scene_understanding(analysis: dict[str, Any]) -> dict[str, Any]:
    """Normalize explicit visual relationships without inventing scene facts."""
    if not isinstance(analysis, dict):
        raise ValueError("Analysis must be an object")

    items = analysis.get("items", [])
    known = {
        str(item.get("name", "")).strip().lower()
        for item in items
        if isinstance(item, dict) and _confidence(item.get("confidence")) >= MIN_RELATION_CONFIDENCE
    }

    relations: list[dict[str, Any]] = []
    for relation in analysis.get("relations", []) or []:
        if not isinstance(relation, dict):
            continue
        source = str(relation.get("source", "")).strip()
        target = str(relation.get("target", "")).strip()
        relation_type = str(relation.get("type", "")).strip().lower()
        confidence = _confidence(relation.get("confidence"))
        if not source or not target or source.lower() == target.lower() or not relation_type:
            continue
        if source.lower() not in known or target.lower() not in known:
            continue
        if not 0 <= confidence <= 1 or confidence < MIN_RELATION_CONFIDENCE:
            continue
        relations.append({"source": source, "target": target, "type": relation_type, "confidence": round(confidence, 3)})

    deduped: list[dict[str, Any]] = []
    seen: set[tuple[str, str, str]] = set()
    for relation in sorted(relations, key=lambda r: (-r["confidence"], r["source"].lower(), r["target"].lower(), r["type"])):
        key = (relation["source"].lower(), relation["target"].lower(), relation["type"])
        if key not in seen:
            seen.add(key)
            deduped.append(relation)

    analysis["relations"] = deduped[:MAX_RELATIONS]
    analysis["sceneFacts"] = [
        {"subject": r["source"], "predicate": r["type"], "object": r["target"], "confidence": r["confidence"]}
        for r in deduped[:MAX_RELATIONS]
    ]
    return analysis
