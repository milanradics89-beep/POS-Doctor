from dataclasses import dataclass
from datetime import datetime, timezone


@dataclass(frozen=True)
class SecurityAuditEvent:
    event: str
    path: str
    method: str
    status_code: int
    recorded_at: str


def create_security_audit_event(event: str, path: str, method: str, status_code: int) -> SecurityAuditEvent:
    if not event.strip():
        raise ValueError("event must not be empty")
    if not path.startswith("/"):
        raise ValueError("path must start with '/'")
    return SecurityAuditEvent(
        event=event,
        path=path,
        method=method.upper(),
        status_code=status_code,
        recorded_at=datetime.now(timezone.utc).isoformat(),
    )
