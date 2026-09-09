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


def _score_opportunity(opportunity: dict, intent: dict, scene: dict) -> float:
    score = 0.50
    kind = str(opportunity.get("kind", ""))
    title = str(opportunity.get("title", "")).lower()
    description = str(opportunity.get("description", "")).lower()
    intent_name = intent["name"]

    if intent_name == kind:
        score += 0.35
    elif intent_name == "shop" and opportunity.get("missingItems"):
        score += 0.20
    elif intent_name == "explore":
        score += 0.05 if opportunity.get("visualizable") else 0.0

    scene_type = str(scene.get("sceneType", "unknown"))
    if scene_type in title or scene_type in description:
        score += 0.05

    effort_bonus = {"easy": 0.06, "medium": 0.03, "advanced": 0.0}.get(opportunity.get("effort"), 0.0)
    score += effort_bonus
    if opportunity.get("visualizable"):
        score += 0.04
    return round(min(score, 1.0), 3)


def rank_opportunities(scene: dict, intent: dict, limit: int = 6) -> list[dict]:
    opportunities = scene.get("opportunities") or []
    ranked = []
    for index, opportunity in enumerate(opportunities):
        item = dict(opportunity)
        item["score"] = _score_opportunity(item, intent, scene)
        item["rank"] = index + 1
        ranked.append(item)
    ranked.sort(key=lambda item: (-item["score"], item["id"]))
    for rank, item in enumerate(ranked[:limit], start=1):
        item["rank"] = rank
    return ranked[:limit]
