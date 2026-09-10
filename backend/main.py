import json
import logging
import os
from typing import Optional
from urllib.parse import urlparse

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import AsyncOpenAI
from pydantic import BaseModel, Field, field_validator

from backend.action_layer import router as action_router
from backend.api_auth import configured_api_key, configured_session_secret, issue_session_token, install_api_key_guard, session_ttl_seconds
from backend.google_search import router as google_search_router
from backend.knowledge_search import router as knowledge_search_router
from backend.personal_memory import router as personal_memory_router
from backend.product_discovery import ProductDiscoveryRequest, discover_products, router as product_discovery_router
from backend.product_extractor import router as product_extractor_router
from backend.redesign import router as redesign_router
from backend.rate_limit import install_rate_limit
from backend.request_controls import install_request_controls
from backend.observability import install_observability
from backend.security_headers import install_security_headers
from backend.production_security import production_mode, validate_production_security
from backend.scene_quality import quality_gate
from backend.scene_understanding import normalize_scene_understanding
from backend.scene_reasoning import derive_scene_facts, derive_scene_reasoning
from backend.vision_contract import BASE_SYSTEM, SCHEMA, SCENE_STRATEGIES
from backend.intent_engine import classify_intent, rank_opportunities
from backend.suggestion_explanations import build_suggestion_reasons
from backend.specialist_agents import build_specialist_context

logger = logging.getLogger("useit")
logging.basicConfig(level=os.environ.get("USEIT_LOG_LEVEL", "INFO").upper())

if production_mode():
    validate_production_security()

app = FastAPI(
    title="USEIT Intelligence API",
    version="0.8.0",
    docs_url=None if production_mode() else "/docs",
    redoc_url=None if production_mode() else "/redoc",
    openapi_url=None if production_mode() else "/openapi.json",
)
origins = [x.strip() for x in os.environ.get("USEIT_CORS_ORIGINS", "*").split(",") if x.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET", "POST", "DELETE", "OPTIONS"], allow_headers=["Content-Type", "Accept", "Authorization", "X-API-Key", "X-Request-ID"])
install_request_controls(app)
install_observability(app, logger)
install_security_headers(app)
if configured_api_key() or configured_session_secret():
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
        scene = quality_gate(json.loads(content))
        return normalize_scene_understanding(scene)
    except HTTPException: raise
    except Exception as exc:
        logger.exception("Vision analysis failed")
        raise HTTPException(502, "Vision analysis failed.") from exc

def _build_discovery_query(scene: dict, request: UseItAnalyzeRequest) -> str:
    items = [str(item.get("category")) for item in scene.get("items", [])[:6] if item.get("category")]
    budget = f"under {request.budgetHuf} HUF" if request.budgetHuf else ""
    return " ".join([scene.get("sceneType", "objects"), *items, *request.preferredStyles, *request.preferredColors, budget]).strip()

@app.get("/health")
async def health():
    return {"status":"ok","model":MODEL,"responseFormat":"scene_analysis_v1","version":"0.8.0","apiKeyConfigured":bool(configured_api_key()),"apiKeyRequired":bool(configured_api_key() or configured_session_secret()),"sessionAuthConfigured":bool(configured_session_secret())}

@app.get("/ready")
async def ready():
    dependencies_ready = bool(os.environ.get("OPENAI_API_KEY"))
    if production_mode():
        dependencies_ready = dependencies_ready and bool(configured_api_key() or configured_session_secret())
    if not dependencies_ready:
        raise HTTPException(status_code=503, detail="Service is not ready.")
    return {"status": "ready"}

@app.post("/v1/session")
async def create_session():
    if not configured_session_secret():
        raise HTTPException(status_code=503, detail="Session authentication is not configured.")
    token, expires_at = issue_session_token()
    return {"accessToken": token, "tokenType": "Bearer", "expiresAt": expires_at, "expiresIn": session_ttl_seconds()}

@app.post("/v1/analyze")
async def analyze(request: AnalyzeRequest):
    logger.info("Analyze request received: imageUri_length=%s", len(request.imageUri))
    return await _analyze(request)

@app.post("/v1/useit/analyze")
async def useit_analyze(request: UseItAnalyzeRequest):
    scene = await _analyze(request)
    intent = classify_intent(request.userIntent, request.prompt)
    context = {"preferredStyles": request.preferredStyles, "preferredColors": request.preferredColors, "budgetHuf": request.budgetHuf}
    ranked = rank_opportunities(scene, intent, context=context)
    shopping = None
    if request.discoverProducts and intent["name"] == "shop":
        query = _build_discovery_query(scene, request)
        if query:
            try:
                shopping = await discover_products(ProductDiscoveryRequest(query=query, limit=request.productLimit, locale=request.locale, region="HU" if request.locale.lower().endswith("hu") else "US", max_resolve=request.productLimit))
            except Exception:
                logger.exception("Unified product discovery degraded")
                shopping = {"query": query, "candidates": [], "errors": [{"url": "", "message": "product discovery unavailable"}]}
    suggestions = [{"id":o["id"],"title":o["title"],"description":o["description"],"kind":o["kind"],"effort":o["effort"],"durationMinutes":o["durationMinutes"],"visualizable":o["visualizable"],"score":o["score"],"preferenceScore":o.get("preferenceScore",0.0),"rank":o["rank"],"reasons":build_suggestion_reasons(o,intent,scene,context)} for o in ranked]
    scene["sceneFacts"] = derive_scene_facts(scene)
    scene["sceneReasoning"] = derive_scene_reasoning(scene)
    specialist = build_specialist_context(scene, intent)
    return {"contractVersion":"useit_analyze_v1","scene":scene,"intent":intent,"specialist":specialist,"suggestions":suggestions,"shopping":shopping,"pipeline":["see","understand","reason","intent","specialist","suggest","shop" if shopping else "plan"]}

app.include_router(action_router)
app.include_router(redesign_router)
app.include_router(google_search_router)
app.include_router(knowledge_search_router)
app.include_router(personal_memory_router)
app.include_router(product_extractor_router)
app.include_router(product_discovery_router)
