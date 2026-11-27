"""Optional, photo-grounded detail for the unified consumer endpoint."""
from copy import deepcopy

from backend.vision_contract import SCHEMA

MODE_DIRECTIONS = {
    "create": "Make a small project from visible materials. Separate needed tools or supplies from what is visible.",
    "improve": "Improve something already in the image. For a room, identify what should stay before changing layout or styling.",
    "fix": "Describe observed symptoms, not a diagnosis of hidden causes. Give only safe, non-invasive checks. For hazardous or uncertain repairs, leave steps empty and say when to stop and seek qualified help.",
    "cook": "Suggest a meal using identifiable ingredients. Give ordered preparation steps, separate missing ingredients and substitutions, and never infer food freshness or allergen safety from a photograph.",
    "shop": "Describe one visually supported shopping need. Use a generic item and relevant attributes for search, not a guessed brand, size, compatibility, or price. Do not include names of people, addresses or other personal data in search terms. Leave searchTerms empty if fit cannot be assessed from this photo.",
    "surprise": "Find an unexpected use or combination that depends on specific things visible in this photo. Give a small, practical way to try it.",
}

LIST = {"type": "array", "items": {"type": "string"}}
GUIDE_FIELDS = ("evidence", "steps", "alternatives", "limits", "keep")
ACTIONABLE_SCHEMA = deepcopy(SCHEMA)
opportunity = ACTIONABLE_SCHEMA["properties"]["opportunities"]["items"]
opportunity["properties"].update({field: LIST for field in GUIDE_FIELDS})
opportunity["required"].extend(GUIDE_FIELDS)
ACTIONABLE_SCHEMA["properties"]["shoppingNeed"] = {
    "type": "object",
    "additionalProperties": False,
    "properties": {"evidence": LIST, "summary": {"type": "string"}, "searchTerms": LIST},
    "required": ["evidence", "summary", "searchTerms"],
}
ACTIONABLE_SCHEMA["properties"]["clarification"] = {"type": "string"}
ACTIONABLE_SCHEMA["required"].extend(["shoppingNeed", "clarification"])


def instructions(mode: str) -> str:
    return (
        f"\nFor this request the selected mode is {mode}. {MODE_DIRECTIONS[mode]} "
        "Return at most three opportunities, all with kind equal to the selected mode; for shop return no opportunities "
        "and use shoppingNeed only. For other modes return empty shoppingNeed fields. Every evidence entry must be "
        "the exact name of a reasonably certain detected item. Each opportunity must use that evidence. "
        "Use up to five concise ordered steps, starting with a concrete action. List only necessary missing items "
        "and meaningful substitutions in alternatives. Use limits for uncertainty and stop conditions; "
        "keep describes specific existing items or structural features to preserve. Empty arrays mean not applicable. "
        "If the photo does not support a useful recommendation, omit unsupported opportunities and ask one "
        "specific clarification about the image or the goal. Otherwise clarification is an empty string."
    )


def _lines(raw, limit: int, width: int = 420) -> list[str]:
    if not isinstance(raw, list):
        return []
    return list(dict.fromkeys(v.strip()[:width] for v in raw if isinstance(v, str) and v.strip()))[:limit]


def _evidence(raw, observed: dict[str, str]) -> list[str]:
    return list(dict.fromkeys(observed[v.casefold()] for v in _lines(raw, 8) if v.casefold() in observed))


def attach_actionable_result(scene: dict, ranked: list[dict], mode: str) -> dict:
    """Keep IDs stable and discard plans with no surviving visual evidence."""
    observed = {i["name"].strip().casefold(): i["name"].strip() for i in scene["items"] if i.get("name")}
    clarification = scene.get("clarification")
    brief = scene.get("shoppingNeed")
    shopping = None
    if mode == "shop" and isinstance(brief, dict):
        evidence = _evidence(brief.get("evidence"), observed)
        terms = _lines(brief.get("searchTerms"), 4, 60)
        summary = brief.get("summary")
        if evidence and terms and isinstance(summary, str) and summary.strip():
            shopping = {"evidence": evidence, "searchTerms": terms, "summary": summary.strip()[:420]}

    guides = {}
    for item in ranked:
        evidence = _evidence(item.get("evidence"), observed)
        if item["kind"] != mode or not evidence:
            continue
        steps = _lines(item.get("steps"), 5)
        limits = _lines(item.get("limits"), 4)
        if not steps and not limits:
            continue
        guides[item["id"]] = {
            "evidence": evidence, "steps": steps, "limits": limits,
            "requiredItems": _lines(item.get("requiredItems"), 12),
            "missingItems": _lines(item.get("missingItems"), 12),
            "alternatives": _lines(item.get("alternatives"), 4),
            "keep": _lines(item.get("keep"), 8),
        }

    return {
        "guides": guides, "shoppingNeed": shopping,
        "clarification": clarification.strip()[:420] if isinstance(clarification, str) else "",
    }
