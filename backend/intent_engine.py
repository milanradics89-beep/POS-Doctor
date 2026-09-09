from __future__ import annotations

from dataclasses import dataclass
import re


@dataclass(frozen=True)
class IntentProfile:
    name: str
    confidence: float
    terms: tuple[str, ...]


_INTENTS: tuple[IntentProfile, ...] = (
    IntentProfile("shop", 0.90, ("venni", "vásárol", "shopping", "buy", "purchase", "termék", "csere")),
    IntentProfile("improve", 0.82, ("javítani", "fejleszteni", "szebb", "improve", "upgrade", "better", "átalakítani", "átalakítás")),
    IntentProfile("fix", 0.88, ("javítás", "javíts", "szerel", "repair", "fix", "hibás", "rossz")),
    IntentProfile("cook", 0.90, ("főzni", "recept", "recipe", "cook", "vacsora", "ebéd", "reggeli")),
    IntentProfile("organize", 0.86, ("rendez", "rendet", "pakol", "tárol", "organize", "storage", "declutter")),
    IntentProfile("reuse", 0.84, ("újrahasznos", "újrahasznál", "reuse", "upcycle", "hasznosítani")),
    IntentProfile("create", 0.80, ("készíteni", "csinálni", "create", "build", "make", "projekt")),
    IntentProfile("play", 0.80, ("játék", "játszani", "play", "game", "gyerek")),
)


def _tokens(text: str) -> set[str]:
    return set(re.findall(r"[\wáéíóöőúüű]+", text.lower()))


def classify_intent(user_intent: str | None, prompt: str | None = None) -> dict:
    text = " ".join(part for part in (user_intent, prompt) if part).strip()
    if not text:
        return {"name": "explore", "confidence": 0.35, "source": "default"}

    tokens = _tokens(text)
    candidates: list[tuple[int, float, IntentProfile]] = []
    for profile in _INTENTS:
        hits = sum(1 for term in profile.terms if term in text.lower() or term in tokens)
        if hits:
            candidates.append((hits, profile.confidence, profile))

    if not candidates:
        return {"name": "explore", "confidence": 0.35, "source": "fallback"}

    hits, base_confidence, profile = max(candidates, key=lambda item: (item[0], item[1]))
    confidence = min(0.99, base_confidence + max(0, hits - 1) * 0.04)
    return {"name": profile.name, "confidence": round(confidence, 2), "source": "user_text"}


def _normalise_terms(values: list[str] | tuple[str, ...] | None) -> set[str]:
    return {value.strip().lower() for value in (values or []) if value and value.strip()}


def _scene_evidence_score(scene: dict) -> float:
    items = scene.get("items") or []
    confidences = [float(item.get("confidence", 0.0)) for item in items if item.get("confidence") is not None]
    if not confidences:
        return 0.5
    return sum(confidences) / len(confidences)


def _score_opportunity(opportunity: dict, intent: dict, scene: dict, context: dict | None = None) -> float:
    context = context or {}
    score = 0.50
    kind = str(opportunity.get("kind", ""))
    searchable = " ".join(str(opportunity.get(key, "")) for key in ("title", "description", "kind")).lower()
    intent_name = intent.get("name", "explore")

    if intent_name == kind:
        score += 0.35
    elif intent_name == "shop" and opportunity.get("missingItems"):
        score += 0.20
    elif intent_name == "explore":
        score += 0.05 if opportunity.get("visualizable") else 0.0

    scene_type = str(scene.get("sceneType", "unknown")).lower()
    if scene_type != "unknown" and scene_type in searchable:
        score += 0.05

    preferred_styles = _normalise_terms(context.get("preferredStyles"))
    preferred_colors = _normalise_terms(context.get("preferredColors"))
    if preferred_styles and any(term in searchable for term in preferred_styles):
        score += 0.07
    if preferred_colors and any(term in searchable for term in preferred_colors):
        score += 0.05

    required_items = {str(item).lower() for item in (opportunity.get("requiredItems") or [])}
    visible_items = {str(item.get("name", "")).lower() for item in (scene.get("items") or [])}
    if required_items:
        matched = sum(1 for item in required_items if any(item in visible or visible in item for visible in visible_items if visible))
        coverage = matched / len(required_items)
        score += 0.10 * coverage
        if coverage == 0 and not opportunity.get("missingItems"):
            score -= 0.05

    evidence = _scene_evidence_score(scene)
    score += (evidence - 0.5) * 0.10

    effort_bonus = {"easy": 0.06, "medium": 0.03, "advanced": 0.0}.get(opportunity.get("effort"), 0.0)
    score += effort_bonus
    if opportunity.get("visualizable"):
        score += 0.04
    return round(max(0.0, min(score, 1.0)), 3)


def rank_opportunities(scene: dict, intent: dict, limit: int = 6, context: dict | None = None) -> list[dict]:
    if limit < 1:
        return []
    opportunities = scene.get("opportunities") or []
    ranked = []
    for opportunity in opportunities:
        item = dict(opportunity)
        item["score"] = _score_opportunity(item, intent, scene, context)
        ranked.append(item)
    ranked.sort(key=lambda item: (-item["score"], str(item.get("id", ""))))
    for rank, item in enumerate(ranked[:limit], start=1):
        item["rank"] = rank
    return ranked[:limit]
