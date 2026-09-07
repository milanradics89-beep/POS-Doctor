from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from .models import AnalyzeResponse, Analysis

app = FastAPI(title="USEIT Intelligence API", version="0.2.0")

@app.get("/health")
def health():
    return {"status": "ok", "service": "useit-intelligence"}

@app.post("/v1/analyze", response_model=AnalyzeResponse)
async def analyze(image: UploadFile = File(...), intent: str | None = Form(default=None)):
    if not image.content_type or not image.content_type.startswith("image/"):
        raise HTTPException(status_code=415, detail="An image upload is required")
    data = await image.read()
    if not data:
        raise HTTPException(status_code=400, detail="Image is empty")
    if len(data) > 12 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image is too large")

    # Provider wiring is deliberately isolated behind this endpoint.
    # Until credentials are configured, return a deterministic development response.
    analysis = Analysis(
        scene_type="unknown",
        summary="Image received. Vision provider is not configured yet.",
        objects=[], context=[f"intent:{intent}"] if intent else [], opportunities=[], cautions=[]
    )
    return AnalyzeResponse(analysis=analysis, provider="development", model="none")
