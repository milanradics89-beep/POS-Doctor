from typing import Any

CONFIDENCE_FLOOR = 0.55
MAX_ITEMS = 20
MAX_OPPORTUNITIES = 8


def quality_gate(analysis: dict[str, Any]) -> dict[str, Any]:
    """Conservative post-processing for noisy real-world photographs."""
    items = [i for i in analysis.get("items", []) if float(i.get("confidence", 0)) >= CONFIDENCE_FLOOR][:MAX_ITEMS]
    opportunities = analysis.get("opportunities", [])[:MAX_OPPORTUNITIES]
    visible = {str(i.get("name", "")).strip().lower() for i in items}
    cleaned = []
    for opportunity in opportunities:
        required = [str(x).strip() for x in opportunity.get("requiredItems", []) if str(x).strip()]
        missing = [str(x).strip() for x in opportunity.get("missingItems", []) if str(x).strip()]
        missing_lower = {m.lower() for m in missing}
        inferred = [x for x in required if x.lower() not in visible and x.lower() not in missing_lower]
        opportunity["missingItems"] = list(dict.fromkeys(missing + inferred))
        cleaned.append(opportunity)
    analysis["items"] = items
    analysis["opportunities"] = cleaned
    return analysis
