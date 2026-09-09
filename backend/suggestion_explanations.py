from __future__ import annotations


def build_suggestion_reasons(
    opportunity: dict,
    intent: dict,
    scene: dict,
    context: dict | None = None,
) -> list[str]:
    """Return deterministic, user-safe reason codes for a ranked suggestion."""
    context = context or {}
    reasons: list[str] = []

    if str(opportunity.get("kind", "")) == str(intent.get("name", "explore")):
        reasons.append("intent_match")

    scene_type = str(scene.get("sceneType", "unknown")).lower()
    searchable = " ".join(str(opportunity.get(key, "")) for key in ("title", "description", "kind")).lower()
    if scene_type != "unknown" and scene_type in searchable:
        reasons.append("scene_match")

    preferred_styles = {str(value).strip().lower() for value in (context.get("preferredStyles") or []) if value and str(value).strip()}
    preferred_colors = {str(value).strip().lower() for value in (context.get("preferredColors") or []) if value and str(value).strip()}
    if preferred_styles and any(value in searchable for value in preferred_styles):
        reasons.append("style_preference")
    if preferred_colors and any(value in searchable for value in preferred_colors):
        reasons.append("color_preference")

    required = {str(value).strip().lower() for value in (opportunity.get("requiredItems") or []) if value and str(value).strip()}
    visible = {str(item.get("name", "")).strip().lower() for item in (scene.get("items") or []) if item.get("name")}
    if required:
        matched = sum(1 for item in required if any(item in candidate or candidate in item for candidate in visible if candidate))
        if matched == len(required):
            reasons.append("required_items_visible")
        elif matched:
            reasons.append("partial_item_evidence")
        elif opportunity.get("missingItems"):
            reasons.append("missing_items_declared")
        else:
            reasons.append("insufficient_item_evidence")

    if opportunity.get("visualizable"):
        reasons.append("visualizable")
    if opportunity.get("effort") == "easy":
        reasons.append("low_effort")

    return reasons or ["general_scene_relevance"]
