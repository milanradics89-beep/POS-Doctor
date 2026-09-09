import json
import logging
import os
from typing import Optional
from urllib.parse import urlparse

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from pydantic import BaseModel, Field, field_validator

from backend.api_auth import configured_api_key, install_api_key_guard
from backend.google_search import router as google_search_router
from backend.product_discovery import ProductDiscoveryRequest, discover_products, router as product_discovery_router
from backend.product_extractor import router as product_extractor_router
from backend.redesign import router as redesign_router
from backend.rate_limit import install_rate_limit
from backend.request_controls import install_request_controls
from backend.scene_quality import quality_gate
from backend.security_headers import install_security_headers
from backend.vision_contract import BASE_SYSTEM, SCHEMA, SCENE_STRATEGIES

logger = logging.getLogger("useit")
logging.basicConfig(level=os.environ.get("USEIT_LOG_LEVEL", "INFO").upper())
app = FastAPI(title="USEIT Intelligence API", version="0.6.2")
origins = [x.strip() for x in os.environ.get("USEIT_CORS_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET", "POST", "OPTIONS"], allow_headers=["Content-Type", "Accept", "X-API-Key", "X-Request-ID"])
install_request_controls(app)
install_security_headers(app)
install_api_key_guard(app)
install_rate_limit(app)
MODEL = os.environ.get("USEIT_VISION_MODEL", "gpt-4.1")

class AnalyzeRequest(BaseModel):
    imageUri: str = Field(min_length=20, max_length=8_000_000)
    userIntent: Optional[str] = None
    prompt: Optional[str] = Field(default=None, max_length=20_000)
    locale: str = Field(default="hu-HU", max_length=20)
    responseFormat: str = Field(default="scene_analysis_v1", max_length=64)

    @field_validator("imageUri")
    @classmethod
    def validate_image_uri(cls, value: str) -> str:
        if value.startswith("data:image/"):
            header, separator, payload = value.partition(",")
            if not separator or not payload: raise ValueError("Invalid image data URI")
            mime = header[5:].split(";", 1)[0].lower()
            if mime not in {"image/jpeg", "image/png", "image/webp", "image/gif"}: raise ValueError("Unsupported image MIME type")
            return value
        parsed = urlparse(value)
        if parsed.scheme in {"https", "http"} and parsed.netloc: return value
        raise ValueError("imageUri must be an image data URI or HTTP(S) URL")

class UseItAnalyzeRequest(AnalyzeRequest):
    budgetHuf: int | None = Field(default=None, ge=0, le=100_000_000)
    preferredStyles: list[str] = Field(default_factory=list, max_length=12)
    preferredColors: list[str] = Field(default_factory=list, max_length=12)
    discoverProducts: bool = True
    productLimit: int = Field(default=8, ge=1, le=12)

def _get_client() -> AsyncOpenAI:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key: raise HTTPException(503, "Vision service is not configured.")
    return AsyncOpenAI(api_key=api_key)

async def _analyze(request: AnalyzeRequest):
    if request.responseFormat != "scene_analysis_v1": raise HTTPException(400, "Unsupported response format.")
    try:
        instructions = BASE_SYSTEM
        if request.prompt: instructions += f"\n\nUSEIT analysis policy:\n{request.prompt}"
        instructions += f"\n\nScene strategies:\n{json.dumps(SCENE_STRATEGIES, ensure_ascii=False)}"
        instructions += f"\n\nRespond with user-facing text in locale {request.locale}."
        user_text = "Analyze this image for USEIT. Classify the scene before generating opportunities."
        if request.userIntent: user_text += f" User intent: {request.userIntent}."
        response = await _get_client().chat.completions.create(
            model=MODEL,
            messages=[
                {"role":"system","content":instructions},
                {"role":"user","content":[{"type":"text","text":user_text},{"type":"image_url","image_url":{"url":request.imageUri,"detail":"high"}}]},
            ],
            response_format={"type":"json_schema","json_schema":{"name":"useit_scene_analysis","strict":True,"schema":SCHEMA}},
        )
        content = response.choices[0].message.content
        if not content: raise HTTPException(502, "Vision analysis returned no structured content.")
        return quality_gate(json.loads(content))
    except HTTPException: raise
    except Exception as exc:
        logger.exception("Vision analysis failed")
        raise HTTPException(502, "Vision analysis failed.") from exc

def _wants_shopping(text: str | None) -> bool:
    value = (text or "").lower()
    return any(token in value for token in ("venni", "vásárol", "shopping", "buy", "purchase", "termék", "bútor", "csere"))

def _build_discovery_query(scene: dict, request: UseItAnalyzeRequest) -> str:
    items = [str(item.get("category")) for item in scene.get("items", [])[:6] if item.get("category")]
    budget = f"under {request.budgetHuf} HUF" if request.budgetHuf else ""
    return " ".join([scene.get("sceneType", "objects"), *items, *request.preferredStyles, *request.preferredColors, budget]).strip()

@app.get("/health")
async def health(): return {"status":"ok","model":MODEL,"responseFormat":"scene_analysis_v1","version":"0.6.2","apiKeyRequired":bool(configured_api_key())}

@app.post("/v1/analyze")
async def analyze(request: AnalyzeRequest):
    logger.info("Analyze request received: imageUri_length=%s request_id=%s", len(request.imageUri), getattr(request.state, "request_id", "unknown"))
    return await _analyze(request)

@app.post("/v1/useit/analyze")
async def useit_analyze(request: UseItAnalyzeRequest):
    scene = await _analyze(request)
    intent = request.userIntent or request.prompt
    shopping = None
    if request.discoverProducts and _wants_shopping(intent):
        query = _build_discovery_query(scene, request)
        if query:
            shopping = await discover_products(ProductDiscoveryRequest(query=query, limit=request.productLimit, locale=request.locale, region="HU" if request.locale.lower().endswith("hu") else "US", max_resolve=request.productLimit))
    suggestions = [{"id":o["id"],"title":o["title"],"description":o["description"],"kind":o["kind"],"effort":o["effort"],"durationMinutes":o["durationMinutes"],"visualizable":o["visualizable"]} for o in scene.get("opportunities", [])]
    return {"scene":scene,"suggestions":suggestions,"shopping":shopping,"pipeline":["see","understand","suggest","shop" if shopping else "plan"]}

app.include_router(redesign_router)
app.include_router(google_search_router)
app.include_router(product_extractor_router)
app.include_router(product_discovery_router)
