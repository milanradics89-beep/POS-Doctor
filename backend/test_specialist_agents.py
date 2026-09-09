from backend.specialist_agents import build_specialist_context, select_specialist


def test_cooking_intent_routes_to_cooking_specialist():
    scene = {"sceneType": "food", "items": [{"category": "ingredient", "name": "tomato"}]}
    assert select_specialist(scene, {"name": "cook"}).name == "cooking"


def test_fix_routes_to_repair_specialist():
    scene = {"sceneType": "object", "items": [{"category": "device", "name": "coffee machine"}]}
    assert select_specialist(scene, {"name": "fix"}).name == "repair"


def test_shop_room_routes_to_home_design_specialist():
    scene = {"sceneType": "room", "items": [{"category": "furniture", "name": "sofa"}]}
    assert select_specialist(scene, {"name": "shop"}).name == "home_design"


def test_shop_non_room_routes_to_shopping_specialist():
    scene = {"sceneType": "object", "items": [{"category": "product", "name": "headphones"}]}
    assert select_specialist(scene, {"name": "shop"}).name == "shopping"


def test_unknown_scene_has_safe_general_fallback():
    specialist = select_specialist({"sceneType": "unknown", "items": []}, {"name": "surprise"})
    assert specialist.name == "general"


def test_context_has_bounded_evidence_policy_and_safety():
    context = build_specialist_context(
        {"sceneType": "room", "items": [{"category": "furniture"}]},
        {"name": "improve"},
    )
    assert context["name"] == "home_design"
    assert context["focus"]
    assert "verified tool results" in context["evidencePolicy"]
    assert context["safety"]
