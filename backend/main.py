import json
import os
from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from openai import OpenAI
from scene_quality import quality_gate

app = FastAPI(title="USEIT Intelligence API", version="0.4.0")
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
MODEL = os.environ.get("USEIT_VISION_MODEL", "gpt-5.6-luna")

SCHEMA = {"type":"object","additionalProperties":False,"properties":{"sceneType":{"type":"string","enum":["room","table","fridge","wardrobe","garage","garden","objects","food","mixed","unknown"]},"summary":{"type":"string"},"items":{"type":"array","items":{"type":"object","additionalProperties":False,"properties":{"name":{"type":"string"},"category":{"type":"string"},"confidence":{"type":"number","minimum":0,"maximum":1},"attributes":{"type":"array","items":{"type":"string"}}},"required":["name","category","confidence","attributes"]}},"constraints":{"type":"array","items":{"type":"string"}},"opportunities":{"type":"array","items":{"type":"object","additionalProperties":False,"properties":{"id":{"type":"string"},"title":{"type":"string"},"description":{"type":"string"},"kind":{"type":"string","enum":["create","improve","fix","cook","reuse","play","organize","surprise"]},"effort":{"type":"string","enum":["easy","medium","advanced"]},"durationMinutes":{"type":"integer","minimum":1},"requiredItems":{"type":"array","items":{"type":"string"}},"missingItems":{"type":"array","items":{"type":"string"}},"visualizable":{"type":"boolean"}},"required":["id","title","description","kind","effort","durationMinutes","requiredItems","missingItems","visualizable"]}},"safetyNotes":{"type":"array","items":{"type":"string"}}},"required":["sceneType","summary","items","constraints","opportunities","safetyNotes"]}

class AnalyzeRequest(BaseModel):
    imageUri:str=Field(min_length=20,max_length=8_000_000)
    userIntent:Optional[str]=None
    prompt:Optional[str]=Field(default=None,max_length=20_000)
    locale:str=Field(default="hu-HU",max_length=20)
    responseFormat:str=Field(default="scene_analysis_v1",max_length=64)

SCENE_STRATEGIES={"room":"Inspect layout, circulation, focal points, lighting, furniture scale, empty wall/floor areas, clutter and visible style. Prefer concrete improvements.","table":"Inventory objects and group them by material, function and relationships. Look for combinations, reuse, repair and organization without inventing unseen supplies.","fridge":"Identify only reasonably visible ingredients. Separate certain from uncertain items. Prefer practical recipes using several visible ingredients and make missing assumptions explicit.","food":"Treat visible food conservatively. Suggest realistic combinations and preparation ideas grounded in what is visible.","objects":"Consider practical uses, repair, reuse and combinations. Do not recommend disposal or replacement before considering specialist uses.","wardrobe":"Consider garments, available storage and combinations. Prefer realistic outfit, organization and reuse ideas grounded in visible items.","garage":"Consider tools, materials and repair/reuse possibilities. Respect visible safety constraints.","garden":"Consider layout, plants, tools and usable outdoor space. Prefer achievable improvements.","mixed":"First determine the dominant useful context, then apply the most relevant reasoning strategy."}
BASE_SYSTEM="""You are USEIT. Understand the entire photographed scene before proposing anything. Scene context beats isolated object labels. Visible evidence beats assumptions. Never invent objects, ingredients, brands, measurements or conditions. Confidence represents visual certainty, not usefulness. Generate specific, achievable opportunities and preserve safety constraints. Prefer one excellent recommendation over generic lists. The result must be useful even when the image is cluttered or imperfect."""

def _analyze(request:AnalyzeRequest):
    if request.responseFormat!="scene_analysis_v1": raise HTTPException(400,"Unsupported response format.")
    if not os.environ.get("OPENAI_API_KEY"): raise HTTPException(503,"Vision service is not configured.")
    try:
        instructions=BASE_SYSTEM
        if request.prompt: instructions+=f"\n\nUSEIT analysis policy:\n{request.prompt}"
        instructions+=f"\n\nScene strategies:\n{json.dumps(SCENE_STRATEGIES,ensure_ascii=False)}"
        instructions+=f"\n\nRespond with user-facing text in locale {request.locale}."
        user_text="Analyze this image for USEIT. Classify the scene before generating opportunities."
        if request.userIntent: user_text+=f" User intent: {request.userIntent}."
        response=client.responses.create(model=MODEL,input=[{"role":"user","content":[{"type":"input_text","text":user_text},{"type":"input_image","image_url":request.imageUri,"detail":"high"}]}],instructions=instructions,text={"format":{"type":"json_schema","name":"useit_scene_analysis","strict":True,"schema":SCHEMA}})
        return quality_gate(json.loads(response.output_text))
    except Exception as exc: raise HTTPException(502,"Vision analysis failed.") from exc

@app.get("/health")
def health(): return {"status":"ok","model":MODEL,"responseFormat":"scene_analysis_v1","version":"0.4.0"}

@app.post("/v1/analyze")
def analyze(request:AnalyzeRequest):
    return _analyze(request)
