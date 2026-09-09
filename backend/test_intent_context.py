from backend.intent_engine import rank_opportunities


def test_preferred_style_and_color_increase_matching_suggestion() -> None:
    scene = {
        "sceneType": "room",
        "items": [{"name": "sofa", "confidence": 0.95}],
        "opportunities": [
            {
                "id": "plain",
                "title": "Improve room layout",
                "description": "Rearrange the furniture",
                "kind": "improve",
                "effort": "medium",
                "visualizable": True,
                "requiredItems": ["sofa"],
                "missingItems": [],
            },
            {
                "id": "styled",
                "title": "Improve room with modern blue furniture",
                "description": "Modern blue layout",
                "kind": "improve",
                "effort": "medium",
                "visualizable": True,
                "requiredItems": ["sofa"],
                "missingItems": [],
            },
        ],
    }
    intent = {"name": "improve", "confidence": 0.82}
    ranked = rank_opportunities(
        scene,
        intent,
        context={"preferredStyles": ["modern"], "preferredColors": ["blue"]},
    )
    assert ranked[0]["id"] == "styled"


def test_missing_required_evidence_does_not_get_free_score() -> None:
    scene = {
        "sceneType": "table",
        "items": [{"name": "plate", "confidence": 0.95}],
        "opportunities": [
            {
                "id": "missing",
                "title": "Create a dinner",
                "description": "Use the visible items",
                "kind": "create",
                "effort": "easy",
                "visualizable": False,
                "requiredItems": ["knife"],
                "missingItems": [],
            },
            {
                "id": "present",
                "title": "Create a plate setup",
                "description": "Use the visible plate",
                "kind": "create",
                "effort": "medium",
                "visualizable": False,
                "requiredItems": ["plate"],
                "missingItems": [],
            },
        ],
    }
    ranked = rank_opportunities(scene, {"name": "create", "confidence": 0.8})
    assert ranked[0]["id"] == "present"


def test_limit_zero_returns_no_suggestions() -> None:
    assert rank_opportunities({"opportunities": [{"id": "a"}]}, {"name": "explore"}, limit=0) == []
