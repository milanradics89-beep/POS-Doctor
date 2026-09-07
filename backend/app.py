from __future__ import annotations

import base64
import json
from typing import Literal

from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel, Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    openai_api_key: str
    vision_model: str = "gpt-5.6-luna"

    class Config:
        env_file = ".env"
        extra = "ignore"


class AnalyzeRequest(BaseModel):
    image_base64: str = Field(min_length=16)
    mime_type: Literal["image/jpeg", "image/png", "image/webp"] = "image/jpeg"
    mode: str | None = None


class Analysis(BaseModel):
    scene_type: Literal["object", "room", "food", "material", "mixed", "unknown"]
    summary: str
    objects: list[str]
    context: list[str]
    opportunities: list[str]
    cautions: list[str]
    confidence: float = Field(ge=0, le=1)


app = FastAPI(title="USEIT Intelligence API", version="0.2.0")


def _client() -> tuple[OpenAI, Settings]:
    settings = Settings()
    return OpenAI(api_key=settings.openai_api_key), settings


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "useit-intelligence"}


@app.post("/v1/analyze", response_model=Analysis)
def analyze(request: AnalyzeRequest) -> Analysis:
    try:
        client, settings = _client()
        image_data = base64.b64decode(request.image_base64, validate=True)
        encoded = base64.b64encode(image_data).decode("ascii")
        prompt = """You are USEIT's visual intelligence engine. Analyze the image for practical possibilities.
Return JSON only with these fields: scene_type, summary, objects, context, opportunities, cautions, confidence.
scene_type must be one of object, room, food, material, mixed, unknown.
Be concrete, useful and grounded in visible evidence. Never invent hidden facts.
"""
        if request.mode:
            prompt += f"The user's selected intent is: {request.mode}. Prioritize that intent."

        response = client.responses.create(
            model=settings.vision_model,
            input=[{
                "role": "user",
                "content": [
                    {"type": "input_text", "text": prompt},
                    {"type": "input_image", "image_url": f"data:{request.mime_type};base64,{encoded}"},
                ],
            }],
        )
        raw = response.output_text
        data = json.loads(raw)
        return Analysis.model_validate(data)
    except (ValueError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=422, detail=f"Invalid vision response: {exc}") from exc
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Vision provider error: {exc}") from exc
