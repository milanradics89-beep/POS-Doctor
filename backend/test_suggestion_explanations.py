from backend.suggestion_explanations import build_suggestion_reasons


def test_reasons_capture_intent_preferences_and_visible_evidence() -> None:
    opportunity = {
        "kind": "improve",
        "title": "Improve room with modern blue furniture",
        "description": "Modern blue layout",
        "requiredItems": ["sofa"],
        "visualizable": True,
        "effort": "easy",
    }
    scene = {"sceneType": "room", "items": [{"name": "sofa", "confidence": 0.95}]}
    reasons = build_suggestion_reasons(
        opportunity,
        {"name": "improve"},
        scene,
        {"preferredStyles": ["modern"], "preferredColors": ["blue"]},
    )
    assert reasons == [
        "intent_match",
        "scene_match",
        "style_preference",
        "color_preference",
        "required_items_visible",
        "visualizable",
        "low_effort",
    ]


def test_missing_evidence_is_explicit() -> None:
    reasons = build_suggestion_reasons(
        {"kind": "create", "requiredItems": ["knife"], "missingItems": []},
        {"name": "create"},
        {"sceneType": "table", "items": [{"name": "plate"}]},
    )
    assert "insufficient_item_evidence" in reasons
