from __future__ import annotations

from typing import Any

RELATION_CONFIDENCE_FLOOR = 0.55
MAX_RELATIONS = 40
MAX_FACTS = 40


def _key(value: Any) -> str:
    return str(value or "").strip().lower()


def normalize_relations(analysis: dict[str, Any]) -> list[dict[str, Any]]:
    """Return conservative, deduplicated scene relations from vision output."""
    items = analysis.get("items", []) or []
    visible = {_key(item.get("name")) for item in items if isinstance(item, dict) and _key(item.get("name"))}
    relations = analysis.get("relations", []) or []
    seen: set[tuple[str, str, str]] = set()
    normalized: list[dict[str, Any]] = []

    for relation in relations:
        if not isinstance(relation, dict):
            continue
        source = _key(relation.get("source"))
        target = _key(relation.get("target"))
        predicate = _key(relation.get("relation") or relation.get("type"))
        try:
            confidence = float(relation.get("confidence", 0))
        except (TypeError, ValueError):
            continue
        if not source or not target or not predicate or source == target:
            continue
        if source not in visible or target not in visible or not 0 <= confidence <= 1 or confidence < RELATION_CONFIDENCE_FLOOR:
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
    return [
        {
            "type": "relation",
            "subject": relation["source"],
            "predicate": relation["relation"],
            "object": relation["target"],
            "confidence": relation["confidence"],
        }
        for relation in normalize_relations(analysis)[:MAX_FACTS]
    ]


def derive_scene_reasoning(analysis: dict[str, Any]) -> list[dict[str, Any]]:
    """Produce bounded, evidence-backed higher-level scene signals.

    These are intentionally conservative: no new object is invented and no
    transitive conclusion is emitted unless the relation itself is explicit.
    """
    relations = normalize_relations(analysis)
    reasoning: list[dict[str, Any]] = []
    for relation in relations:
        predicate = relation["relation"]
        if predicate in {"inside", "contains", "on", "attached_to", "part_of"}:
            reasoning.append({
                "type": "context",
                "subject": relation["source"],
                "context": relation["target"],
                "relation": predicate,
                "confidence": relation["confidence"],
            })
        elif predicate in {"near", "aligned_with"}:
            reasoning.append({
                "type": "proximity",
                "subject": relation["source"],
                "relatedTo": relation["target"],
                "relation": predicate,
                "confidence": relation["confidence"],
            })
    return reasoning[:MAX_FACTS]
