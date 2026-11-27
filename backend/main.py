import base64
import binascii
import inspect
import json
import logging
import os
from contextlib import asynccontextmanager
from typing import Annotated, Optional
from urllib.parse import urlparse

from fastapi import FastAPI, Header, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from google.cloud.firestore_v1.async_client import AsyncClient
from openai import AsyncOpenAI
from pydantic import BaseModel, Field, field_validator
from redis import asyncio as redis_asyncio
from redis.exceptions import RedisError

from backend.ai_budget import daily_budget, reserve_units
from backend.security import validate_public_http_url
from google.api_core.exceptions import GoogleAPIError
from backend.firestore_state import FirestoreState
from backend.idempotency_store import FirestoreIdempotencyStore, IdempotencyDecision
from backend.privacy_logging import log_event

from backend.action_layer import router as action_router
from backend.api_auth import configured_api_key, configured_session_secret, issue_session_token, session_ttl_seconds
from backend.attestation import (
    AttestationEvidence,
    AttestationMode,
    AttestationProvider,
    attestation_challenge_ttl_seconds,
    configured_attestation_app_id,
    configured_attestation_mode,
    configured_attestation_provider,
    attestation_apps,
    configured_redis_url,
    check_redis_challenge_store_capability,
    evaluate_attestation,
    issue_challenge_async,
    validate_challenge_binding_async,
    verify_attestation_provider,
)
from backend.runtime_auth import install_runtime_auth_guard
from backend.google_search import router as google_search_router
from backend.knowledge_search import router as knowledge_search_router
from backend.personal_memory import router as personal_memory_router
from backend.product_discovery import ProductDiscoveryRequest, discover_products, router as product_discovery_router
from backend.product_extractor import router as product_extractor_router
from backend.redesign import router as redesign_router
from backend.rate_limit import install_rate_limit, rate_limit_mode, check_redis_rate_limit_capability
from backend.request_controls import install_request_controls
from backend.observability import install_observability
from backend.security_headers import install_security_headers
from backend.production_security import (
    production_mode,
    validate_production_security,
    validate_production_session_auth_configuration,
    validate_production_redis_transport,
)
from backend.scene_quality import quality_gate
from backend.scene_understanding import normalize_scene_understanding
from backend.scene_reasoning import derive_scene_facts, derive_scene_reasoning
from backend.vision_contract import BASE_SYSTEM, SCHEMA, SCENE_STRATEGIES
from backend.actionable_results import ACTIONABLE_SCHEMA, MODE_DIRECTIONS, attach_actionable_result, instructions as actionable_instructions
from backend.intent_engine import classify_intent, rank_opportunities
from backend.suggestion_explanations import build_suggestion_reasons
from backend.specialist_agents import build_specialist_context

logger = logging.getLogger("useit")
logging.basicConfig(level=os.environ.get("USEIT_LOG_LEVEL", "INFO").upper())

OPENAI_TIMEOUT_SECONDS = 35.0
MAX_IMAGE_DATA_URI_BYTES = 7_900_000
DEFAULT_VISION_MAX_COMPLETION_TOKENS = 4_096
MIN_VISION_MAX_COMPLETION_TOKENS = 256
MAX_VISION_MAX_COMPLETION_TOKENS = 8_192


def _load_vision_max_completion_tokens(raw: str | None = None) -> int:
    configured = os.environ.get("USEIT_VISION_MAX_COMPLETION_TOKENS", str(DEFAULT_VISION_MAX_COMPLETION_TOKENS)) if raw is None else raw
    try:
        value = int(configured)
    except (TypeError, ValueError) as exc:
        raise RuntimeError("USEIT_VISION_MAX_COMPLETION_TOKENS must be an integer.") from exc
    if not MIN_VISION_MAX_COMPLETION_TOKENS <= value <= MAX_VISION_MAX_COMPLETION_TOKENS:
        raise RuntimeError(
            f"USEIT_VISION_MAX_COMPLETION_TOKENS must be between {MIN_VISION_MAX_COMPLETION_TOKENS} "
            f"and {MAX_VISION_MAX_COMPLETION_TOKENS}."
        )
    return value


VISION_MAX_COMPLETION_TOKENS = _load_vision_max_completion_tokens()

if production_mode():
    validate_production_security()


@asynccontextmanager
async def lifespan(application: FastAPI):
    redis_client = None
    openai_client = None
    firestore_client = None
    idempotency_store = None
    application.state.redis_client = None
    application.state.openai_client = None
    application.state.idempotency_store = None
    try:
        redis_url = configured_redis_url()
        if redis_url:
            redis_client = redis_asyncio.Redis.from_url(
                redis_url,
                decode_responses=False,
                socket_connect_timeout=2.0,
                socket_timeout=5.0,
            )
        api_key = os.environ.get("OPENAI_API_KEY")
        if api_key:
            # Analysis requests are billable POSTs. Keep one bounded client per
            # application lifespan and disable implicit retries until requests
            # have an end-to-end idempotency contract.
            openai_client = AsyncOpenAI(
                api_key=api_key,
                timeout=OPENAI_TIMEOUT_SECONDS,
                max_retries=0,
            )
        idempotency_mode = os.environ.get("USEIT_IDEMPOTENCY_MODE", "disabled").strip().lower()
        if idempotency_mode not in {"disabled", "firestore"}:
            raise RuntimeError("USEIT_IDEMPOTENCY_MODE must be disabled or firestore.")

        if daily_budget() is not None and rate_limit_mode() != "firestore":
            raise RuntimeError("The shared daily AI budget requires Firestore rate limiting.")
        if rate_limit_mode() == "firestore" and idempotency_mode != "firestore":
            raise RuntimeError("Set USEIT_IDEMPOTENCY_MODE=firestore for Firestore security state.")
        if idempotency_mode == "firestore":
            idempotency_secret = os.environ.get("USEIT_IDEMPOTENCY_SECRET", "")
            firestore_project_id = (
                os.environ.get("USEIT_FIRESTORE_PROJECT_ID", "").strip()
                or os.environ.get("GOOGLE_CLOUD_PROJECT", "").strip()
            )
            if len(idempotency_secret.encode("utf-8")) < 32:
                raise RuntimeError("USEIT_IDEMPOTENCY_SECRET must contain at least 32 UTF-8 bytes.")
            if not firestore_project_id:
                raise RuntimeError("USEIT_FIRESTORE_PROJECT_ID or GOOGLE_CLOUD_PROJECT is required.")
            if production_mode() and os.getenv("FIRESTORE_EMULATOR_HOST"):
                raise RuntimeError("Production cannot use the Firestore emulator.")
            try:
                idempotency_ttl = int(os.environ.get("USEIT_IDEMPOTENCY_TTL_SECONDS", "600"))
            except ValueError as exc:
                raise RuntimeError("USEIT_IDEMPOTENCY_TTL_SECONDS must be an integer.") from exc
            firestore_client = AsyncClient(project=firestore_project_id)
            if rate_limit_mode() == "firestore":
                application.state.firestore_state = FirestoreState(firestore_client, idempotency_secret)
            idempotency_store = FirestoreIdempotencyStore(
                firestore_client,
                idempotency_secret,
                ttl_seconds=idempotency_ttl,
            )

        application.state.redis_client = redis_client
        application.state.openai_client = openai_client
        application.state.idempotency_store = idempotency_store
        yield
    finally:
        application.state.firestore_state = None
        application.state.redis_client = None
        application.state.openai_client = None
        application.state.idempotency_store = None
        if openai_client is not None:
            try:
                await openai_client.close()
            except Exception as exc:
                logger.warning(
                    "Application shutdown could not close the shared OpenAI client cleanly (exception_type=%s)",
                    type(exc).__name__,
                )
        if redis_client is not None:
            try:
                await redis_client.aclose()
            except (RedisError, TimeoutError, OSError):
                logger.warning("Application shutdown could not close the shared Redis client cleanly")
        if firestore_client is not None:
            try:
                close_result = firestore_client.close()
                if inspect.isawaitable(close_result):
                    await close_result
            except Exception as exc:
                logger.warning(
                    "Application shutdown could not close the Firestore client cleanly (exception_type=%s)",
                    type(exc).__name__,
                )


app = FastAPI(
    title="USEIT Intelligence API",
    version="0.8.0",
    docs_url=None if production_mode() else "/docs",
    redoc_url=None if production_mode() else "/redoc",
    openapi_url=None if production_mode() else "/openapi.json",
    lifespan=lifespan,
)
origins = [x.strip() for x in os.environ.get("USEIT_CORS_ORIGINS", "*").split(",") if x.strip()]
install_request_controls(app)
install_runtime_auth_guard(app)
install_rate_limit(app)
# Keep CORS, security headers, and observability outside short-circuiting
# auth/rate-limit middleware so 401/429/503 responses receive the same
# browser policy, security headers, request ID, and request-completion log.
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=False, allow_methods=["GET", "POST", "DELETE", "OPTIONS"], allow_headers=["Content-Type", "Accept", "Authorization", "X-API-Key", "X-Request-ID", "Idempotency-Key", "X-USEIT-Retry", "X-USEIT-Platform-Provider"])
@app.exception_handler(RequestValidationError)
async def invalid_request(_request, exc):
    # Do not echo image bytes, submitted preferences, capability IDs or free-text
    # dictionary keys through Pydantic input/ctx/loc on a rejected request.
    return JSONResponse(status_code=422, content={"detail": [
        {"type": err["type"], "loc": err["loc"][:1], "msg": "Invalid request field."}
        for err in exc.errors()[:16]
    ]})


install_security_headers(app)
install_observability(app, logger)
MODEL = os.environ.get("USEIT_VISION_MODEL", "gpt-4.1")

class AnalyzeRequest(BaseModel):
    imageUri: str = Field(min_length=20, max_length=MAX_IMAGE_DATA_URI_BYTES)
    userIntent: Optional[str] = Field(default=None, max_length=2_000)
    prompt: Optional[str] = Field(default=None, max_length=20_000)
    locale: str = Field(default="hu-HU", max_length=20)
    responseFormat: str = Field(default="scene_analysis_v1", max_length=64)

    @field_validator("imageUri")
    @classmethod
    def validate_image_uri(cls, value: str) -> str:
        if value.lower().startswith("data:image/"):
            if len(value.encode("utf-8")) > MAX_IMAGE_DATA_URI_BYTES:
                raise ValueError("Image data URI exceeds the maximum allowed size")
            header, separator, payload = value.partition(",")
            if not separator or not payload:
                raise ValueError("Invalid image data URI")
            parts = header[5:].split(";")
            mime = parts[0].lower()
            if mime not in {"image/jpeg", "image/png", "image/webp", "image/gif"}:
                raise ValueError("Unsupported image MIME type")
            if not any(part.strip().lower() == "base64" for part in parts[1:]):
                raise ValueError("Image data URI must use base64 encoding")
            try:
                decoded = base64.b64decode(payload, validate=True)
            except (binascii.Error, ValueError) as exc:
                raise ValueError("Image data URI contains invalid base64") from exc
            if not decoded:
                raise ValueError("Image data URI payload is empty")
            return value

        try:
            return validate_public_http_url(value)
        except HTTPException as exc:
            raise ValueError(exc.detail) from exc

class UseItAnalyzeRequest(AnalyzeRequest):
    budgetHuf: int | None = Field(default=None, ge=0, le=100_000_000)
    preferredStyles: list[str] = Field(default_factory=list, max_length=12)
    preferredColors: list[str] = Field(default_factory=list, max_length=12)
    discoverProducts: bool = True
    productLimit: int = Field(default=8, ge=1, le=12)
    actionable: bool = False
    refinement: str | None = Field(default=None, max_length=320)
    refinementTarget: str | None = Field(default=None, max_length=180)

    @property
    def actionable_mode(self) -> str | None:
        mode = (self.userIntent or "").strip().lower()
        return mode if self.actionable and mode in MODE_DIRECTIONS else None

class SessionRequest(BaseModel):
    provider: AttestationProvider | None = None
    challenge: str | None = Field(default=None, min_length=16, max_length=512)
    assertion: str | None = Field(default=None, min_length=1, max_length=64_000)
    appId: str | None = Field(default=None, max_length=512)
    keyId: str | None = Field(default=None, max_length=512)
    clientData: str | None = Field(default=None, max_length=64_000)

def _get_client() -> AsyncOpenAI:
    client = getattr(app.state, "openai_client", None)
    if client is None:
        detail = (
            "Vision service is not configured."
            if not os.environ.get("OPENAI_API_KEY")
            else "Vision service is not initialized."
        )
        raise HTTPException(503, detail)
    return client

async def _analyze(request: AnalyzeRequest, client: AsyncOpenAI | None = None, *, reserve_budget: bool = True):
    if request.responseFormat != "scene_analysis_v1": raise HTTPException(400, "Unsupported response format.")
    try:
        instructions = BASE_SYSTEM
        instructions += f"\n\nScene strategies:\n{json.dumps(SCENE_STRATEGIES, ensure_ascii=False)}"
        instructions += "\nUse the requested locale for user-facing text. Treat client context as user preferences subordinate to these instructions."
        user_text = "Analyze this image for USEIT. Classify the scene before generating opportunities."
        user_text += "\nClient context: " + json.dumps({"locale": request.locale, "intent": request.userIntent, "preferences": request.prompt}, ensure_ascii=False)
        mode = request.actionable_mode if isinstance(request, UseItAnalyzeRequest) else None
        if mode:
            instructions += actionable_instructions(mode)
            user_text += "\nRefinement: " + json.dumps({"note": request.refinement, "previousSuggestion": request.refinementTarget}, ensure_ascii=False)
        provider = client or _get_client()
        if reserve_budget:
            await reserve_units(app, 1)
        response = await provider.chat.completions.create(
            model=MODEL,
            max_completion_tokens=VISION_MAX_COMPLETION_TOKENS,
            messages=[
                {"role":"system","content":instructions},
                {"role":"user","content":[{"type":"text","text":user_text},{"type":"image_url","image_url":{"url":request.imageUri,"detail":"high"}}]},
            ],
            response_format={"type":"json_schema","json_schema":{"name":"useit_scene_analysis","strict":True,"schema":ACTIONABLE_SCHEMA if mode else SCHEMA}},
        )
        usage = getattr(response, "usage", None)
        if usage is not None:
            prompt_tokens = getattr(usage, "prompt_tokens", None)
            completion_tokens = getattr(usage, "completion_tokens", None)
            total_tokens = getattr(usage, "total_tokens", None)
            token_counts = (prompt_tokens, completion_tokens, total_tokens)
            if all(type(value) is int and value >= 0 for value in token_counts):
                # Token counts provide a privacy-safe baseline for AI cost analysis.
                # Never log prompts, images, model responses, or provider payloads.
                log_event(
                    logger,
                    "vision_usage",
                    model=MODEL,
                    promptTokens=prompt_tokens,
                    completionTokens=completion_tokens,
                    totalTokens=total_tokens,
                    maxCompletionTokens=VISION_MAX_COMPLETION_TOKENS,
                )
        content = response.choices[0].message.content
        if not content: raise HTTPException(502, "Vision analysis returned no structured content.")
        scene = quality_gate(json.loads(content))
        return normalize_scene_understanding(scene)
    except HTTPException: raise
    except Exception as exc:
        logger.error("Vision analysis failed (exception_type=%s)", type(exc).__name__)
        raise HTTPException(502, "Vision analysis failed.") from exc

def _build_discovery_query(scene: dict, request: UseItAnalyzeRequest) -> str:
    items = [str(item.get("category")) for item in scene.get("items", [])[:6] if item.get("category")]
    budget = f"under {request.budgetHuf} HUF" if request.budgetHuf is not None else ""
    return " ".join([scene.get("sceneType", "objects"), *items, *request.preferredStyles, *request.preferredColors, budget]).strip()

@app.get("/health")
async def health():
    return {"status":"ok","model":MODEL,"responseFormat":"scene_analysis_v1","version":"0.8.0","apiKeyConfigured":bool(configured_api_key()),"apiKeyRequired":bool(configured_api_key() or configured_session_secret()),"sessionAuthConfigured":bool(configured_session_secret()),"attestationMode":configured_attestation_mode().value,"attestationProvider":configured_attestation_provider().value,"attestationAppIdConfigured":bool(configured_attestation_app_id()),"attestationChallengeTtlSeconds":attestation_challenge_ttl_seconds(),"attestationSharedStorageConfigured":bool(configured_redis_url() or getattr(app.state, "firestore_state", None)),"analysisIdempotencyConfigured":bool(getattr(app.state, "idempotency_store", None))}

@app.get("/ready")
async def ready():
    dependencies_ready = bool(os.environ.get("OPENAI_API_KEY"))
    if production_mode():
        dependencies_ready = dependencies_ready and bool(configured_api_key() or configured_session_secret())
        attestation_mode = configured_attestation_mode()
        try:
            validate_production_session_auth_configuration()
            if rate_limit_mode() != "firestore":
                validate_production_redis_transport()
        except RuntimeError:
            # Readiness must not report healthy for a session/attestation
            # combination that startup validation would reject.
            dependencies_ready = False

        # Production rate limiting is shared across workers, so Redis is a
        # mandatory readiness dependency even when App Attest is disabled.
        dependencies_ready = (
            dependencies_ready
            and ((rate_limit_mode() == "redis" and bool(configured_redis_url()))
                 or (rate_limit_mode() == "firestore" and getattr(app.state, "firestore_state", None) is not None))
        )
        if dependencies_ready and rate_limit_mode() == "redis":
            redis_client = getattr(app.state, "redis_client", None)
            owns_redis_client = redis_client is None
            try:
                if redis_client is None:
                    redis_client = redis_asyncio.Redis.from_url(
                        configured_redis_url(),
                        socket_connect_timeout=2,
                        socket_timeout=2,
                    )
                await redis_client.ping()
                if not await check_redis_rate_limit_capability(redis_client):
                    logger.warning("Readiness check failed: Redis rate-limit commands are unavailable")
                    dependencies_ready = False
                elif configured_attestation_mode() is not AttestationMode.DISABLED:
                    if not await check_redis_challenge_store_capability(redis_client):
                        logger.warning("Readiness check failed: Redis attestation challenge commands are unavailable")
                        dependencies_ready = False
            except (RedisError, TimeoutError, OSError, ValueError):
                logger.warning("Readiness check failed: shared Redis is unavailable")
                dependencies_ready = False
            finally:
                if owns_redis_client and redis_client is not None:
                    try:
                        await redis_client.aclose()
                    except (RedisError, TimeoutError, OSError):
                        logger.warning("Readiness check could not close the temporary Redis client cleanly")
    if os.getenv("USEIT_IDEMPOTENCY_MODE", "disabled").strip().lower() == "firestore":
        idempotency_store = getattr(app.state, "idempotency_store", None)
        if idempotency_store is None:
            dependencies_ready = False
        else:
            try:
                await idempotency_store.check_connection()
                if rate_limit_mode() == "firestore":
                    await app.state.firestore_state.check_connection()
            except Exception as exc:
                logger.warning(
                    "Readiness check failed: analysis idempotency store unavailable (exception_type=%s)",
                    type(exc).__name__,
                )
                dependencies_ready = False
    if not dependencies_ready:
        raise HTTPException(status_code=503, detail="Service is not ready.")
    return {"status": "ready"}

def _verification_storage():
    if rate_limit_mode() == "firestore":
        store = getattr(app.state, "firestore_state", None)
        if store is None:
            raise HTTPException(503, "Attestation storage is not ready.")
        return {"state_store": store}
    return {"redis_client": getattr(app.state, "redis_client", None)}


@app.post("/v1/session/challenge")
async def create_attestation_challenge(response: Response, provider: Annotated[AttestationProvider | None, Header(alias="X-USEIT-Platform-Provider")] = None):
    if provider is not None and provider not in attestation_apps():
        raise HTTPException(400, "Platform attestation is not configured for this app.")
    if production_mode() and configured_attestation_mode() is AttestationMode.REQUIRED and rate_limit_mode() != "firestore" and not configured_redis_url():
        raise HTTPException(status_code=503, detail="Attestation shared storage is not configured.")
    try:
        challenge = await issue_challenge_async(provider=provider, **_verification_storage())
    except (RuntimeError, RedisError, GoogleAPIError, TimeoutError) as exc:
        logger.warning("Attestation challenge storage is unavailable")
        raise HTTPException(status_code=503, detail="Attestation challenge service is temporarily unavailable.") from exc
    response.headers["Cache-Control"] = "no-store"
    response.headers["Pragma"] = "no-cache"
    return {"challenge": challenge.challenge, "provider": challenge.provider.value, "appId": challenge.app_id, "expiresAt": challenge.expires_at}

@app.post("/v1/session")
async def create_session(request: SessionRequest | None = None, response: Response = None):
    if request is None:
        request = SessionRequest()
    if not configured_session_secret():
        raise HTTPException(status_code=503, detail="Session authentication is not configured.")

    mode = configured_attestation_mode()
    if mode is not AttestationMode.DISABLED:
        if production_mode() and mode is AttestationMode.REQUIRED and rate_limit_mode() != "firestore" and not configured_redis_url():
            raise HTTPException(status_code=503, detail="Attestation shared storage is not configured.")
        if request.provider is None or request.challenge is None or request.assertion is None or request.appId is None:
            result = evaluate_attestation(None, None, mode)
            raise HTTPException(status_code=401, detail=result.reason)
        evidence = AttestationEvidence(
            provider=request.provider,
            challenge=request.challenge,
            assertion=request.assertion,
            app_id=request.appId,
            key_id=request.keyId,
            client_data=request.clientData,
        )
        try:
            binding = await validate_challenge_binding_async(evidence, **_verification_storage())
        except (RedisError, GoogleAPIError, TimeoutError) as exc:
            logger.warning("Attestation challenge storage is unavailable")
            raise HTTPException(
                status_code=503,
                detail="Attestation challenge service is temporarily unavailable.",
            ) from exc
        if not binding.verified:
            raise HTTPException(status_code=401, detail=binding.reason)
        apps = attestation_apps()
        if evidence.provider not in apps:
            raise HTTPException(status_code=401, detail="wrong_provider")
        if apps[evidence.provider] and evidence.app_id != apps[evidence.provider]:
            raise HTTPException(status_code=401, detail="wrong_app")
        try:
            provider_result = await verify_attestation_provider(
                evidence,
                **_verification_storage(),
            )
        except (RedisError, GoogleAPIError, TimeoutError) as exc:
            logger.warning("App Attest verification storage is unavailable")
            raise HTTPException(
                status_code=503,
                detail="Attestation verification service is temporarily unavailable.",
            ) from exc
        result = evaluate_attestation(evidence, provider_result, mode)
        if not result.verified:
            status_code = 503 if result.reason == "provider_unavailable" else 401
            raise HTTPException(status_code=status_code, detail=result.reason)

    token, expires_at = issue_session_token()
    if response is not None:
        response.headers["Cache-Control"] = "no-store"
        response.headers["Pragma"] = "no-cache"
    return {"accessToken": token, "tokenType": "Bearer", "expiresAt": expires_at, "expiresIn": session_ttl_seconds()}

@app.post("/v1/analyze")
async def analyze(request: AnalyzeRequest):
    logger.info("Analyze request received: imageUri_length=%s", len(request.imageUri))
    return await _analyze(request)

@app.post("/v1/useit/analyze")
async def useit_analyze(
    request: UseItAnalyzeRequest,
    idempotency_key: Annotated[str | None, Header(alias="Idempotency-Key")] = None,
    retry_request: Annotated[bool, Header(alias="X-USEIT-Retry")] = False,
):
    if request.responseFormat != "scene_analysis_v1":
        raise HTTPException(status_code=400, detail="Unsupported response format.")

    store = getattr(app.state, "idempotency_store", None)
    if os.getenv("USEIT_IDEMPOTENCY_MODE", "disabled").strip().lower() == "firestore" and store is None:
        raise HTTPException(status_code=503, detail="Analysis request protection is not configured.")

    if retry_request and (store is None or idempotency_key is None):
        raise HTTPException(409, "A safe retry cannot be guaranteed for this request.")

    claim = None
    provider_client = None
    if store is not None and idempotency_key is not None:
        fingerprint = json.dumps(
            request.model_dump(mode="json"),
            sort_keys=True,
            separators=(",", ":"),
            ensure_ascii=False,
        ).encode("utf-8")
        try:
            claim_result = await store.claim(idempotency_key, fingerprint)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail="Invalid Idempotency-Key.") from exc
        except Exception as exc:
            logger.warning(
                "Analysis idempotency claim failed (exception_type=%s)",
                type(exc).__name__,
            )
            raise HTTPException(status_code=503, detail="Analysis request protection is temporarily unavailable.") from exc

        if claim_result.decision is IdempotencyDecision.DUPLICATE:
            raise HTTPException(status_code=409, detail="This analysis request has already been accepted.")
        if claim_result.decision is IdempotencyDecision.PAYLOAD_MISMATCH:
            raise HTTPException(status_code=409, detail="Idempotency-Key was already used for a different request.")
        claim = claim_result.claim
        if claim is None:
            raise HTTPException(status_code=503, detail="Analysis request protection could not claim this request.")

    try:
        # Resolve the provider before reserving budget so configuration failures
        # cannot consume the daily allowance or strand a keyed claim.
        provider_client = _get_client()
    except Exception as exc:
        if claim is not None:
            try:
                await store.release_before_provider_start(claim)
            except Exception as release_exc:
                logger.warning(
                    "Analysis idempotency pre-provider release failed (exception_type=%s)",
                    type(release_exc).__name__,
                )
        raise HTTPException(status_code=503, detail="Vision service is not configured.") from exc

    try:
        await reserve_units(app, 1)
    except Exception as exc:
        if claim is not None:
            try:
                await store.release_before_provider_start(claim)
            except Exception as release_exc:
                logger.warning(
                    "Analysis idempotency pre-provider release failed (exception_type=%s)",
                    type(release_exc).__name__,
                )
        if isinstance(exc, HTTPException):
            raise
        logger.warning(
            "Analysis budget reservation failed before provider start (exception_type=%s)",
            type(exc).__name__,
        )
        raise HTTPException(status_code=503, detail="AI budget protection is temporarily unavailable.") from exc

    try:
        scene = await _analyze(request, client=provider_client, reserve_budget=False)
        intent = classify_intent(request.userIntent, request.prompt)
        context = {"preferredStyles": request.preferredStyles, "preferredColors": request.preferredColors, "budgetHuf": request.budgetHuf}
        ranked = rank_opportunities(scene, intent, context=context)
        actionable = attach_actionable_result(scene, ranked, request.actionable_mode) if request.actionable_mode else None
        shopping = None
        if request.discoverProducts and intent["name"] == "shop":
            if actionable is None:
                query = _build_discovery_query(scene, request)
            elif need := actionable["shoppingNeed"]:
                query = " ".join([*need["searchTerms"], *request.preferredStyles, *request.preferredColors])
                if request.budgetHuf is not None:
                    query += f" under {request.budgetHuf} HUF"
            else:
                query = ""
            if query:
                try:
                    shopping = await discover_products(ProductDiscoveryRequest(query=query, limit=request.productLimit, locale=request.locale, region="HU" if request.locale.lower().endswith("hu") else "US", max_resolve=request.productLimit))
                except Exception as exc:
                    logger.error("Unified product discovery degraded (exception_type=%s)", type(exc).__name__)
                    shopping = {"query": query, "candidates": [], "errors": [{"url": "", "message": "product discovery unavailable"}]}
        suggestions = [{"id":o["id"],"title":o["title"],"description":o["description"],"kind":o["kind"],"effort":o["effort"],"durationMinutes":o["durationMinutes"],"visualizable":o["visualizable"],"score":o["score"],"preferenceScore":o.get("preferenceScore",0.0),"rank":o["rank"],"reasons":build_suggestion_reasons(o,intent,scene,context)} for o in ranked]
        scene["sceneFacts"] = derive_scene_facts(scene)
        scene["sceneReasoning"] = derive_scene_reasoning(scene)
        specialist = build_specialist_context(scene, intent)
        result = {"contractVersion":"useit_analyze_v1","scene":scene,"intent":intent,"specialist":specialist,"suggestions":suggestions,"shopping":shopping,"pipeline":["see","understand","reason","intent","specialist","suggest","shop" if shopping else "plan"]}
        if actionable is not None:
            result["actionable"] = actionable
        if claim is not None:
            try:
                completed = await store.mark_completed(claim)
            except Exception as exc:
                logger.warning(
                    "Analysis idempotency completion failed (exception_type=%s)",
                    type(exc).__name__,
                )
                raise HTTPException(status_code=503, detail="Analysis request state could not be finalized.") from exc
            if not completed:
                raise HTTPException(status_code=503, detail="Analysis request state could not be finalized.")
        return result
    except Exception:
        if claim is not None:
            try:
                # Once provider execution may have started, retain the claim:
                # an uncertain outcome must never trigger a second billable POST.
                await store.mark_outcome_unknown(claim)
            except Exception as exc:
                logger.warning(
                    "Analysis idempotency outcome could not be recorded (exception_type=%s)",
                    type(exc).__name__,
                )
        raise

# Cloud Run instances have disposable local filesystems. Keep capability-based
# personal data and actions off this deployment until a durable owner model exists.
if not os.getenv("K_SERVICE"):
    app.include_router(action_router)
    app.include_router(personal_memory_router)
app.include_router(redesign_router)
app.include_router(google_search_router)
app.include_router(knowledge_search_router)
app.include_router(product_extractor_router)
app.include_router(product_discovery_router)
