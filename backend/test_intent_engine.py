from backend.intent_engine import classify_intent, rank_opportunities


def test_empty_intent_is_explore_fallback() -> None:
    result = classify_intent(None)
    assert result == {"name": "explore", "confidence": 0.35, "source": "default"}


def test_hungarian_shopping_intent_is_classified() -> None:
    result = classify_intent("Szeretnék venni egy új bútort")
    assert result["name"] == "shop"
    assert result["confidence"] >= 0.90


def test_intent_can_use_prompt_when_user_intent_missing() -> None:
    result = classify_intent(None, "Adj egy receptet ebből")
    assert result["name"] == "cook"


def test_unmatched_text_uses_safe_fallback() -> None:
    result = classify_intent("Mit látsz ezen a képen?")
    assert result["name"] == "explore"
    assert result["source"] == "fallback"


def test_english_fix_term_does_not_match_inside_another_word() -> None:
    result = classify_intent("Show me a prefix example")
    assert result["name"] == "explore"
    assert result["source"] == "fallback"


def test_ambiguous_intent_is_marked_and_exposes_alternatives() -> None:
    result = classify_intent("repair és create")
    assert result["source"] == "ambiguous_user_text"
    assert result["name"] == "fix"
    assert result["alternatives"][0]["name"] == "create"
    assert result["confidence"] < 0.88


def test_opportunities_are_ranked_by_intent_fit() -> None:
    scene = {
        "sceneType": "room",
        "opportunities": [
            {"id": "a", "title": "Buy new furniture", "description": "shopping", "kind": "create", "effort": "advanced", "visualizable": True},
            {"id": "b", "title": "Improve layout", "description": "improve the room", "kind": "improve", "effort": "easy", "visualizable": True},
        ],
    }
    ranked = rank_opportunities(scene, {"name": "improve", "confidence": 0.82})
    assert ranked[0]["id"] == "b"
    assert ranked[0]["score"] > ranked[1]["score"]
    assert ranked[0]["rank"] == 1


def test_ranking_is_deterministic_for_equal_scores() -> None:
    scene = {
        "sceneType": "objects",
        "opportunities": [
            {"id": "z", "title": "One", "description": "", "kind": "create", "effort": "medium", "visualizable": False},
            {"id": "a", "title": "Two", "description": "", "kind": "create", "effort": "medium", "visualizable": False},
        ],
    }
    ranked = rank_opportunities(scene, {"name": "create", "confidence": 0.8})
    assert [item["id"] for item in ranked] == ["a", "z"]
