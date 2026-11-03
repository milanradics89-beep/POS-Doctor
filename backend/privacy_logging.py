from __future__ import annotations

import json
import logging
import re
from typing import Any

# Compare canonical alphanumeric keys so camelCase, snake_case, kebab-case,
# and header-style spellings receive identical redaction.
_SENSITIVE_KEYS = frozenset({
    "imageuri",
    "authorization",
    "xapikey",
    "apikey",
    "token",
    "password",
    "secret",
    "content",
    "prompt",
    "userprompt",
    "userintent",
    "accesstoken",
    "refreshtoken",
    "sessiontoken",
    "clientsecret",
})
_DATA_URI_RE = re.compile(r"data:image/[^;,]+(?:;[^,]*)?,.*", re.IGNORECASE)
_MEMORY_PATH_RE = re.compile(r"(?i)(/v1/memory/)[^/?#]+")


def redact_value(key: str, value: Any) -> Any:
    normalized = re.sub(r"[^a-z0-9]", "", key.casefold())
    if normalized in _SENSITIVE_KEYS or ("image" in normalized and "uri" in normalized):
        return "[REDACTED]"
    if normalized == "path" and isinstance(value, str):
        # Memory IDs are bearer capabilities. Never put them in request logs.
        return _MEMORY_PATH_RE.sub(r"\1[REDACTED]", value)
    if isinstance(value, str) and _DATA_URI_RE.fullmatch(value):
        return "[REDACTED_IMAGE]"
    return value


def safe_event(fields: dict[str, Any]) -> dict[str, Any]:
    return {key: redact_value(key, value) for key, value in fields.items()}


def log_event(logger: logging.Logger, message: str, **fields: Any) -> None:
    safe_fields = safe_event(fields)
    logger.info("%s %s", message, json.dumps(safe_fields, ensure_ascii=False, sort_keys=True, default=str))
