import base64
import io
import os
from typing import Optional
from urllib.parse import urlparse
from fastapi import APIRouter, HTTPException
from openai import OpenAI
from pydantic import BaseModel, Field, field_validator

router = APIRouter()
IMAGE_MODEL = os.environ.get("USEIT_IMAGE_MODEL", "gpt-image-2")

class ProductRef(BaseModel):
    title: str
    category: str
    priceHuf: Optional[float] = None
    url: str

class RedesignRequest(BaseModel):
    imageUri: str = Field(min_length=20, max_length=8_000_000)
    prompt: str = Field(min_length=20, max_length=20_000)
    products: list[ProductRef] = Field(default_factory=list, max_length=20)

    @field_validator("imageUri")
    @classmethod
    def validate_image_uri(cls, value: str) -> str:
        if value.startswith("data:image/"):
            header, separator, payload = value.partition(",")
            if not separator or not payload:
                raise ValueError("Invalid image data URI")
            mime = header[5:].split(";", 1)[0].lower()
            if mime not in {"image/jpeg", "image/png", "image/webp"}:
                raise ValueError("Unsupported image MIME type for redesign")
            return value
        parsed = urlparse(value)
        if parsed.scheme in {"https", "http"} and parsed.netloc:
            return value
        raise ValueError("imageUri must be an image data URI or HTTP(S) URL")

def _client() -> OpenAI:
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        raise HTTPException(503, "AI image service is not configured.")
    return OpenAI(api_key=key)

def _image_file(image_uri: str) -> tuple[io.BytesIO, str]:
    if not image_uri.startswith("data:image/"):
        raise HTTPException(400, "Redesign currently requires a data image URI.")
    header, _, payload = image_uri.partition(",")
    mime = header[5:].split(";", 1)[0].lower()
    try:
        raw = base64.b64decode(payload, validate=True)
    except Exception as exc:
        raise HTTPException(400, "Invalid image data.") from exc
    extension = {"image/jpeg": "jpg", "image/png": "png", "image/webp": "webp"}.get(mime)
    if not extension:
        raise HTTPException(400, "Unsupported redesign image type.")
    return io.BytesIO(raw), extension

@router.post("/v1/redesign")
def redesign(request: RedesignRequest):
    try:
        image_file, extension = _image_file(request.imageUri)
        selected = "\n".join(f"- {p.title} | category={p.category}" for p in request.products)
        prompt = (
            "Edit the supplied room photograph into a photorealistic redesign. "
            "Preserve the original camera viewpoint, architecture, room geometry and all existing items "
            "unless the plan explicitly says they are replaced. Integrate selected products naturally, "
            "with realistic scale, perspective, lighting and shadows. Do not add unrelated objects. "
            "Do not invent product logos or text.\n\n"
            f"REDESIGN PLAN:\n{request.prompt}\n\nSELECTED PRODUCTS:\n{selected or 'None'}"
        )
        result = _client().images.edit(
            model=IMAGE_MODEL,
            image=(f"source.{extension}", image_file, f"image/{extension}"),
            prompt=prompt,
        )
        if not result.data or not getattr(result.data[0], "b64_json", None):
            raise HTTPException(502, "Image generation returned no image.")
        return {
            "imageDataUrl": f"data:image/png;base64,{result.data[0].b64_json}",
            "disclosure": "AI-generated visualization. Product appearance, scale, color and placement may differ from the real item. Verify product details on the linked retailer page.",
        }
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(502, "Redesign generation failed.") from exc
