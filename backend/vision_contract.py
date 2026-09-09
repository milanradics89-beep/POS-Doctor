SCHEMA = {
    "type": "object",
    "additionalProperties": False,
    "properties": {
        "sceneType": {"type": "string", "enum": ["room", "table", "fridge", "wardrobe", "garage", "garden", "objects", "food", "mixed", "unknown"]},
        "summary": {"type": "string"},
        "items": {"type": "array", "items": {"type": "object", "additionalProperties": False, "properties": {
            "name": {"type": "string"}, "category": {"type": "string"}, "confidence": {"type": "number", "minimum": 0, "maximum": 1}, "attributes": {"type": "array", "items": {"type": "string"}}
        }, "required": ["name", "category", "confidence", "attributes"]}},
        "relations": {"type": "array", "items": {"type": "object", "additionalProperties": False, "properties": {
            "source": {"type": "string"}, "target": {"type": "string"}, "type": {"type": "string"}, "confidence": {"type": "number", "minimum": 0, "maximum": 1}
        }, "required": ["source", "target", "type", "confidence"]}},
        "constraints": {"type": "array", "items": {"type": "string"}},
        "opportunities": {"type": "array", "items": {"type": "object", "additionalProperties": False, "properties": {
            "id": {"type": "string"}, "title": {"type": "string"}, "description": {"type": "string"},
            "kind": {"type": "string", "enum": ["create", "improve", "fix", "cook", "reuse", "play", "organize", "surprise"]},
            "effort": {"type": "string", "enum": ["easy", "medium", "advanced"]}, "durationMinutes": {"type": "integer", "minimum": 1},
            "requiredItems": {"type": "array", "items": {"type": "string"}}, "missingItems": {"type": "array", "items": {"type": "string"}}, "visualizable": {"type": "boolean"}
        }, "required": ["id", "title", "description", "kind", "effort", "durationMinutes", "requiredItems", "missingItems", "visualizable"]}},
        "safetyNotes": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["sceneType", "summary", "items", "relations", "constraints", "opportunities", "safetyNotes"],
}

SCENE_STRATEGIES = {
    "room": "Inspect layout, circulation, focal points, lighting, furniture scale, empty wall/floor areas, clutter and visible style. Prefer concrete improvements.",
    "table": "Inventory objects and group them by material, function and relationships. Look for combinations, reuse, repair and organization without inventing unseen supplies.",
    "fridge": "Identify only reasonably visible ingredients. Separate certain from uncertain items. Prefer practical recipes using several visible ingredients and make missing assumptions explicit.",
    "food": "Treat visible food conservatively. Suggest realistic combinations and preparation ideas grounded in what is visible.",
    "objects": "Consider practical uses, repair, reuse and combinations. Do not recommend disposal or replacement before considering specialist uses.",
    "wardrobe": "Consider garments, available storage and combinations. Prefer realistic outfit, organization and reuse ideas grounded in visible items.",
    "garage": "Consider tools, materials and repair/reuse possibilities. Respect visible safety constraints.",
    "garden": "Consider layout, plants, tools and usable outdoor space. Prefer achievable improvements.",
    "mixed": "First determine the dominant useful context, then apply the most relevant reasoning strategy.",
}

BASE_SYSTEM = """You are USEIT. Understand the entire photographed scene before proposing anything. Scene context beats isolated object labels. Visible evidence beats assumptions. Never invent objects, ingredients, brands, measurements or conditions. Confidence represents visual certainty, not usefulness. Generate explicit relationships only when both endpoints are visibly supported. A relation describes a useful observable relationship such as near, inside, on, attached_to, part_of, contains or aligned_with. Generate specific, achievable opportunities and preserve safety constraints. Prefer one excellent recommendation over generic lists. The result must be useful even when the image is cluttered or imperfect."""
