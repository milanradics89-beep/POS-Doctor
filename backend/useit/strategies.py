from typing import Any
from .domain import DomainIntent, SceneType, UserMode, Action


def derive_intent(scene: dict[str, Any], mode: str | None = None, budget_huf: int | None = None, preserve_existing: bool = True, preferred_styles: list[str] | None = None, preferred_colors: list[str] | None = None) -> DomainIntent:
    scene_type = SceneType(scene.get("sceneType", "unknown")) if scene.get("sceneType") in {x.value for x in SceneType} else SceneType.unknown
    requested = mode if mode in {x.value for x in UserMode} else "explore"
    return DomainIntent(scene_type=scene_type, mode=UserMode(requested), budget_huf=budget_huf, preserve_existing=preserve_existing, preferred_styles=preferred_styles or [], preferred_colors=preferred_colors or [])


def strategy_actions(scene: dict[str, Any], intent: DomainIntent) -> list[Action]:
    if intent.scene_type == SceneType.room:
        return [
            Action(id="room-layout", title="Improve the layout", description="Identify the highest-impact layout improvement using only visible furniture and space.", kind="improve", priority=5, visualizable=True),
            Action(id="room-style", title="Create a cohesive look", description="Use the visible room style and preferences to define a practical design direction.", kind="create", priority=4, requires_shopping=intent.mode in {UserMode.buy, UserMode.replace}, product_categories=["lighting", "rug", "decor"], visualizable=True),
        ]
    if intent.scene_type == SceneType.fridge:
        return [Action(id="fridge-meal", title="Build a meal from what is visible", description="Use visible ingredients first and explicitly separate uncertain ingredients from confirmed ones.", kind="cook", priority=5)]
    if intent.scene_type == SceneType.wardrobe:
        return [Action(id="wardrobe-outfit", title="Build an outfit", description="Combine visible garments into a coherent outfit and identify only the missing pieces needed to complete it.", kind="create", priority=5, requires_shopping=True, product_categories=["accessory", "shoe", "top"])]
    if intent.scene_type == SceneType.table:
        return [Action(id="table-organize", title="Organize the surface", description="Group visible objects by function and identify the smallest useful change.", kind="organize", priority=5)]
    if intent.scene_type in {SceneType.objects, SceneType.garage, SceneType.garden}:
        return [Action(id="reuse", title="Find a practical use", description="Look for a useful reuse, repair or improvement grounded in visible evidence.", kind="reuse", priority=5)]
    return [Action(id="explore", title="Find the best next action", description="Determine the dominant context and suggest the most useful achievable action.", kind="improve", priority=5)]
