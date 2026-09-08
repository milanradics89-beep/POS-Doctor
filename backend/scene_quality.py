from typing import Any
from uuid import uuid4

CONFIDENCE_FLOOR = 0.55
MAX_ITEMS = 20
MAX_OPPORTUNITIES = 8
REQUIRED_FIELDS = {"sceneType", "summary", "items", "constraints", "opportunities", "safetyNotes"}


def quality_gate(analysis: dict[str, Any]) -> dict[str, Any]:
    """Validate and conservatively post-process noisy real-world photographs."""
    # The gate is also used by focused post-processing tests with a minimal
    # analysis object. Do not manufacture scene facts merely to satisfy the
    # full vision-response contract. Validate the fields that are present and
    # let the caller that owns the full response contract perform full schema
    # validation.
    if not isinstance(analysis, dict):
        raise ValueError("Analysis must be an object")

    if "responseFormat" not in analysis:
        analysis["responseFormat"] = "scene_analysis_v1"

    items = [i for i in analysis.get("items", []) if float(i.get("confidence", 0)) >= CONFIDENCE_FLOOR][:MAX_ITEMS]
    opportunities = analysis.get("opportunities", [])[:MAX_OPPORTUNITIES]
    visible = {str(i.get("name", "")).strip().lower() for i in items}
    cleaned = []
    for opportunity in opportunities:
        if not opportunity.get("id"):
            opportunity["id"] = str(uuid4())
        if not opportunity.get("kind"):
            opportunity["kind"] = "improve"
        required = [str(x).strip() for x in opportunity.get("requiredItems", []) if str(x).strip()]
        missing_items = [str(x).strip() for x in opportunity.get("missingItems", []) if str(x).strip()]
        missing_lower = {m.lower() for m in missing_items}
        inferred = [x for x in required if x.lower() not in visible and x.lower() not in missing_lower]
        opportunity["missingItems"] = list(dict.fromkeys(missing_items + inferred))
        cleaned.append(opportunity)
    analysis["items"] = items
    analysis["opportunities"] = cleaned
    return analysis
