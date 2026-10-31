from __future__ import annotations

import ipaddress
import socket
from urllib.parse import urlparse

from fastapi import HTTPException


def _public_addresses(hostname: str, port: int) -> set[str]:
    try:
        addresses = socket.getaddrinfo(hostname, port, type=socket.SOCK_STREAM)
    except (socket.gaierror, ValueError) as exc:
        raise HTTPException(400, "Product host could not be resolved.") from exc
    resolved = {item[4][0] for item in addresses}
    if not resolved:
        raise HTTPException(400, "Product host could not be resolved.")
    for address in resolved:
        ip = ipaddress.ip_address(address)
        if not ip.is_global:
            raise HTTPException(400, "Product host is not publicly reachable.")
    return resolved


def validate_public_http_url(url: str) -> str:
    try:
        parsed = urlparse(url)
        hostname_value = parsed.hostname
        port = parsed.port
    except (TypeError, ValueError) as exc:
        raise HTTPException(400, "Invalid product URL.") from exc
    if parsed.scheme.lower() not in {"http", "https"} or not hostname_value:
        raise HTTPException(400, "Only HTTP(S) product URLs are supported.")
    if parsed.username is not None or parsed.password is not None:
        raise HTTPException(400, "Product URLs must not contain embedded credentials.")
    hostname = hostname_value.rstrip(".").lower()
    if hostname in {"localhost", "localhost.localdomain"}:
        raise HTTPException(400, "Local product hosts are not allowed.")
    if port is not None and port != (443 if parsed.scheme.lower() == "https" else 80):
        raise HTTPException(400, "Only standard HTTP(S) ports are allowed.")
    _public_addresses(hostname, port or (443 if parsed.scheme.lower() == "https" else 80))
    return url


def validate_connected_peer(response: object) -> None:
    """Fail closed if the established HTTP connection reached a non-public IP."""
    extensions = getattr(response, "extensions", {})
    stream = extensions.get("network_stream") if isinstance(extensions, dict) else None
    if stream is None or not hasattr(stream, "get_extra_info"):
        raise HTTPException(502, "Product host connection could not be verified.")
    peer = stream.get_extra_info("peername")
    if not peer:
        raise HTTPException(502, "Product host connection could not be verified.")
    address = peer[0] if isinstance(peer, tuple) else peer
    try:
        ip = ipaddress.ip_address(address)
    except ValueError as exc:
        raise HTTPException(502, "Product host connection could not be verified.") from exc
    if not ip.is_global:
        raise HTTPException(400, "Product host is not publicly reachable.")
