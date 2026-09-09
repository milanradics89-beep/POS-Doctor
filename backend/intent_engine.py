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

_ENGLISH_SINGLE_WORD_TERMS = {
    "fix", "buy", "purchase", "shopping", "improve", "upgrade", "better", "repair",
    "cook", "recipe", "organize", "storage", "declutter", "reuse", "upcycle", "create",
    "build", "make", "project", "play", "game",
}


def _tokens(text: str) -> set[str]:
    return set(re.findall(r"[\wáéíóöőúüű]+", text.lower()))


def _match_term(term: str, text: str, tokens: set[str]) -> bool:
    normalized = term.lower()
    if " " in normalized:
        return normalized in text
    if normalized in _ENGLISH_SINGLE_WORD_TERMS:
        return normalized in tokens
    return normalized in text


def _intent_candidates(text: str) -> list[tuple[int, float, IntentProfile]]:
    tokens = _tokens(text)
    candidates: list[tuple[int, float, IntentProfile]] = []
    for profile in _INTENTS:
        hits = sum(1 for term in profile.terms if _match_term(term, text, tokens))
        if hits:
            candidates.append((hits, profile.confidence, profile))
    return sorted(candidates, key=lambda item: (-item[0], -item[1], item[2].name))


def classify_intent(user_intent: str | None, prompt: str | None = None) -> dict:
    text = " ".join(part for part in (user_intent, prompt) if part).strip()
    if not text:
        return {"name": "explore", "confidence": 0.35, "source": "default"}

    candidates = _intent_candidates(text)
    if not candidates:
        return {"name": "explore", "confidence": 0.35, "source": "fallback"}

    hits, base_confidence, profile = candidates[0]
    confidence = min(0.99, base_confidence + max(0, hits - 1) * 0.04)
    confidence_gap = round(abs(candidates[1][1] - base_confidence), 2) if len(candidates) > 1 else None
    if len(candidates) > 1 and candidates[1][0] == hits and confidence_gap is not None and confidence_gap <= 0.08:
        confidence = max(0.45, confidence - 0.12)
        source = "ambiguous_user_text"
    else:
        source = "user_text"

    alternatives = [
        {"name": candidate[2].name, "confidence": round(min(0.99, candidate[1] + max(0, candidate[0] - 1) * 0.04), 2)}
        for candidate in candidates[1:3]
    ]
    result = {"name": profile.name, "confidence": round(confidence, 2), "source": source}
    if alternatives:
        result["alternatives"] = alternatives
    return result


def _normalise_terms(values: list[str] | tuple[str, ...] | None) -> set[str]:
    return {value.strip().lower() for value in (values or []) if value and value.strip()}


def _scene_evidence_score(scene: dict) -> float:
    items = scene.get("items") or []
    confidences = [float(item.get("confidence", 0.0)) for item in items if item.get("confidence") is not None]
    if not confidences:
        return 0.5
    return sum(confidences) / len(confidences)


def _preference_score(opportunity: dict, context: dict | None = None) -> float:
    context = context or {}
    searchable = " ".join(str(opportunity.get(key, "")) for key in ("title", "description", "kind")).lower()
    preferred_styles = _normalise_terms(context.get("preferredStyles"))
    preferred_colors = _normalise_terms(context.get("preferredColors"))
    score = 0.0
    if preferred_styles and any(term in searchable for term in preferred_styles):
        score += 0.07
    if preferred_colors and any(term in searchable for term in preferred_colors):
        score += 0.05
    return round(score, 3)


def _score_opportunity(opportunity: dict, intent: dict, scene: dict, context: dict | None = None) -> float:
    context = context or {}
    score = 0.50
    kind = str(opportunity.get("kind", ""))
    intent_name = intent.get("name", "explore")

    if intent_name == kind:
        score += 0.35
    elif intent_name == "shop" and opportunity.get("missingItems"):
        score += 0.20
    elif intent_name == "explore":
        score += 0.05 if opportunity.get("visualizable") else 0.0

    searchable = " ".join(str(opportunity.get(key, "")) for key in ("title", "description", "kind")).lower()
    scene_type = str(scene.get("sceneType", "unknown")).lower()
    if scene_type != "unknown" and scene_type in searchable:
        score += 0.05

    score += _preference_score(opportunity, context)

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
    score += {"easy": 0.06, "medium": 0.03, "advanced": 0.0}.get(opportunity.get("effort"), 0.0)
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
        item["preferenceScore"] = _preference_score(item, context)
        ranked.append(item)
    ranked.sort(key=lambda item: (-item["score"], -item["preferenceScore"], str(item.get("id", ""))))
    for rank, item in enumerate(ranked[:limit], start=1):
        item["rank"] = rank
    return ranked[:limit]
