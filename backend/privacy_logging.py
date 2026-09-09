from __future__ import annotations

import logging
import re
from typing import Any

_SENSITIVE_KEYS = frozenset({"imageuri", "image_uri", "authorization", "x-api-key", "apikey", "api_key", "token", "password", "secret", "content"})
_DATA_URI_RE = re.compile(r"data:image/[^;,]+(?:;[^,]*)?,.*", re.IGNORECASE)


def redact_value(key: str, value: Any) -> Any:
    normalized = key.lower().replace("-", "_")
    if normalized in _SENSITIVE_KEYS or "image" in normalized and "uri" in normalized:
        return "[REDACTED]"
    if isinstance(value, str) and _DATA_URI_RE.fullmatch(value):
        return "[REDACTED_IMAGE]"
    return value


def safe_event(fields: dict[str, Any]) -> dict[str, Any]:
    return {key: redact_value(key, value) for key, value in fields.items()}


def log_event(logger: logging.Logger, message: str, **fields: Any) -> None:
    logger.info(message, extra={"useit": safe_event(fields)})
