import json
import os
from typing import Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from openai import OpenAI

app = FastAPI(title="USEIT Intelligence API", version="0.2.0")
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
MODEL = os.environ.get("USEIT_VISION_MODEL", "gpt-5.6-luna")

SCHEMA = {
    "type": "object", "additionalProperties": False,
    "properties": {
        "sceneType": {"type": "string", "enum": ["room","table","fridge","wardrobe","garage","garden","objects","food","mixed","unknown"]},
        "summary": {"type": "string"},
        "items": {"type": "array", "items": {"type": "object", "additionalProperties": False, "properties": {
            "name": {"type": "string"}, "category": {"type": "string"}, "confidence": {"type": "number", "minimum": 0, "maximum": 1}, "attributes": {"type": "array", "items": {"type": "string"}}
        }, "required": ["name","category","confidence","attributes"]}},
        "constraints": {"type": "array", "items": {"type": "string"}},
        "opportunities": {"type": "array", "items": {"type": "object", "additionalProperties": False, "properties": {
            "id": {"type": "string"}, "title": {"type": "string"}, "description": {"type": "string"},
            "kind": {"type": "string", "enum": ["create","improve","fix","cook","reuse","play","organize","surprise"]},
            "effort": {"type": "string", "enum": ["easy","medium","advanced"]}, "durationMinutes": {"type": "integer", "minimum": 1},
            "requiredItems": {"type": "array", "items": {"type": "string"}}, "missingItems": {"type": "array", "items": {"type": "string"}}, "visualizable": {"type": "boolean"}
        }, "required": ["id","title","description","kind","effort","durationMinutes","requiredItems","missingItems","visualizable"]}},
        "safetyNotes": {"type": "array", "items": {"type": "string"}}
    },
    "required": ["sceneType","summary","items","constraints","opportunities","safetyNotes"]
}

class AnalyzeRequest(BaseModel):
    imageUri: str = Field(min_length=20, max_length=8_000_000)
    userIntent: Optional[str] = None
    prompt: Optional[str] = Field(default=None, max_length=20_000)
    locale: str = Field(default="hu-HU", max_length=20)
    responseFormat: str = Field(default="scene_analysis_v1", max_length=64)

BASE_SYSTEM = """You are USEIT, a practical multimodal assistant. Understand the whole photographed scene before proposing anything. Identify visible objects, materials, food, furniture, spatial relationships, constraints and uncertainty. Generate useful opportunities grounded in what is actually visible. Never invent an object merely to make an idea work. For rooms think like an interior designer; for loose materials like a creative maker; for food like a practical cook; for broken objects like a troubleshooter. Be concise, concrete and visually describable. Confidence reflects visual certainty, not usefulness. Never claim an item is present when it is only guessed. If uncertainty materially affects a recommendation, state it in constraints or safetyNotes."""

@app.get("/health")
def health():
    return {"status": "ok", "model": MODEL, "responseFormat": "scene_analysis_v1"}

@app.post("/v1/analyze")
def analyze(request: AnalyzeRequest):
    if request.responseFormat != "scene_analysis_v1":
        raise HTTPException(status_code=400, detail="Unsupported response format.")
    if not os.environ.get("OPENAI_API_KEY"):
        raise HTTPException(status_code=503, detail="Vision service is not configured.")
    try:
        instructions = BASE_SYSTEM
        if request.prompt:
            instructions += f"\n\nUSEIT analysis policy:\n{request.prompt}"
        instructions += f"\n\nRespond with user-facing text in locale {request.locale}."
        prompt = "Analyze this image for USEIT."
        if request.userIntent:
            prompt += f" User intent: {request.userIntent}."
        response = client.responses.create(
            model=MODEL,
            input=[{"role":"user","content":[{"type":"input_text","text":prompt},{"type":"input_image","image_url":request.imageUri,"detail":"high"}]}],
            instructions=instructions,
            text={"format":{"type":"json_schema","name":"useit_scene_analysis","strict":True,"schema":SCHEMA}}
        )
        return json.loads(response.output_text)
    except Exception as exc:
        raise HTTPException(status_code=502, detail="Vision analysis failed.") from exc
