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
        if any((ip.is_private, ip.is_loopback, ip.is_link_local, ip.is_multicast, ip.is_reserved, ip.is_unspecified)):
            raise HTTPException(400, "Product host is not publicly reachable.")
    return resolved


def validate_public_http_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.scheme not in {"http", "https"} or not parsed.hostname:
        raise HTTPException(400, "Only HTTP(S) product URLs are supported.")
    if parsed.username is not None or parsed.password is not None:
        raise HTTPException(400, "Product URLs must not contain embedded credentials.")
    hostname = parsed.hostname.rstrip(".").lower()
    if hostname in {"localhost", "localhost.localdomain"}:
        raise HTTPException(400, "Local product hosts are not allowed.")
    if parsed.port not in {None, 80, 443}:
        raise HTTPException(400, "Only standard HTTP(S) ports are allowed.")
    _public_addresses(hostname, parsed.port or (443 if parsed.scheme == "https" else 80))
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
    if any((ip.is_private, ip.is_loopback, ip.is_link_local, ip.is_multicast, ip.is_reserved, ip.is_unspecified)):
        raise HTTPException(400, "Product host is not publicly reachable.")
