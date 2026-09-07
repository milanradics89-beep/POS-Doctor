from pydantic import BaseModel, Field
from typing import Literal

SceneType = Literal["object", "room", "mixed", "food", "materials", "unknown"]

class DetectedObject(BaseModel):
    name: str
    confidence: float = Field(ge=0, le=1)
    quantity: int | None = Field(default=None, ge=1)

class Opportunity(BaseModel):
    title: str
    summary: str
    category: Literal["create", "improve", "fix", "cook", "play", "reuse", "wear", "other"]
    effort_minutes: int | None = Field(default=None, ge=1)

class Analysis(BaseModel):
    scene_type: SceneType
    summary: str
    objects: list[DetectedObject] = []
    context: list[str] = []
    opportunities: list[Opportunity] = []
    cautions: list[str] = []

class AnalyzeResponse(BaseModel):
    analysis: Analysis
    provider: str
    model: str
