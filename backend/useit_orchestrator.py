from __future__ import annotations

import asyncio
from typing import Any

import httpx
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from google_search import ProductSearchRequest, product_search
from product_extractor import resolve_product
from main import AnalyzeRequest, _analyze

router = APIRouter(prefix="/v1/useit", tags=["useit"])


class UseItAnalyzeRequest(AnalyzeRequest):
    budgetHuf: int | None = Field(default=None, ge=0, le=100_000_000)
    preferredStyles: list[str] = Field(default_factory=list, max_length=12)
    preferredColors: list[str] = Field(default_factory=list, max_length=12)
    discoverProducts: bool = True
    productLimit: int = Field(default=8, ge=1, le=12)


def _shopping_intent(text: str | None) -> bool:
    value = (text or "").lower()
    return any(token in value for token in ("venni", "vásárol", "shopping", "buy", "purchase", "termék", "bútor"))


def _build_product_query(scene: dict[str, Any], request: UseItAnalyzeRequest) -> str:
    scene_type = scene.get("sceneType", "objects")
    item_terms = [str(item.get("category", "")) for item in scene.get("items", [])[:5] if item.get("category")]
    style_terms = request.preferredStyles
    color_terms = request.preferredColors
    budget = f"under {request.budgetHuf} HUF" if request.budgetHuf else ""
    return " ".join([scene_type, *item_terms, *style_terms, *color_terms, budget]).strip()


async def _discover(query: str, request: UseItAnalyzeRequest) -> dict[str, Any]:
    search = await product_search(ProductSearchRequest(
        query=query,
        limit=request.productLimit,
        locale=request.locale,
        region="HU" if request.locale.lower().endswith("hu") else "US",
    ))
    async def resolve(item: dict[str, Any]):
        try:
            return await resolve_product(type("Resolve", (), {"url": item["url"]})())
        except (HTTPException, httpx.HTTPError, ValueError):
            return None

    resolved = await asyncio.gather(*(resolve(item) for item in search.get("results", [])))
    candidates = []
    for result in resolved:
        if result and result.get("availability") != "out_of_stock":
            candidates.append(result)
    candidates.sort(key=lambda item: -float(item.get("qualityScore", 0)))
    return {"query": query, "candidates": candidates[:request.productLimit]}


@router.post("/analyze")
async def useit_analyze(request: UseItAnalyzeRequest):
    scene = _analyze(request)
    shopping = None
    intent_text = request.userIntent or request.prompt
    if request.discoverProducts and _shopping_intent(intent_text):
        query = _build_product_query(scene, request)
        if query:
            shopping = await _discover(query, request)
    opportunities = scene.get("opportunities", [])
    suggestions = [
        {
            "id": item.get("id"),
            "title": item.get("title"),
            "description": item.get("description"),
            "kind": item.get("kind"),
            "effort": item.get("effort"),
            "durationMinutes": item.get("durationMinutes"),
            "visualizable": item.get("visualizable", False),
        }
        for item in opportunities
    ]
    return {
        "scene": scene,
        "suggestions": suggestions,
        "shopping": shopping,
        "pipeline": ["see", "understand", "suggest", "shop" if shopping else "plan"],
    }
