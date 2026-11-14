from __future__ import annotations

import asyncio
import ipaddress
import socket
from collections.abc import Awaitable, Callable, Iterable
from urllib.parse import urlparse

import httpcore
import httpx
from fastapi import HTTPException


AddressResolver = Callable[[str, int], Awaitable[Iterable[str]] | Iterable[str]]


def _public_addresses(hostname: str, port: int) -> set[str]:
    """Resolve a URL host and reject the whole answer if any address is non-global."""
    try:
        records = socket.getaddrinfo(
            hostname,
            port,
            family=socket.AF_UNSPEC,
            type=socket.SOCK_STREAM,
        )
        resolved = {record[4][0].split("%", 1)[0] for record in records}
        if not resolved:
            raise ValueError("empty DNS response")
        normalized: set[str] = set()
        for address in resolved:
            ip = ipaddress.ip_address(address)
            if not ip.is_global:
                raise HTTPException(400, "Product host is not publicly reachable.")
            normalized.add(ip.compressed)
        return normalized
    except HTTPException:
        raise
    except (OSError, ValueError, IndexError, TypeError) as exc:
        raise HTTPException(400, "Product host could not be resolved safely.") from exc


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


async def _resolve_addresses(hostname: str, port: int) -> list[str]:
    loop = asyncio.get_running_loop()
    records = await loop.getaddrinfo(
        hostname,
        port,
        family=socket.AF_UNSPEC,
        type=socket.SOCK_STREAM,
    )
    return [record[4][0] for record in records]


class DNSPinnedNetworkBackend(httpcore.AsyncNetworkBackend):
    """Resolve and validate every address, then dial the numeric IP directly.

    HTTPCore retains the original request origin, so its Host header and TLS SNI
    remain the URL hostname while this backend pins the TCP destination.
    """

    def __init__(
        self,
        resolver: AddressResolver | None = None,
        backend: httpcore.AsyncNetworkBackend | None = None,
    ) -> None:
        self._resolver = resolver or _resolve_addresses
        self._backend = backend or httpcore.AnyIOBackend()

    async def _validated_ips(self, hostname: str, port: int) -> list[str]:
        try:
            result = self._resolver(hostname, port)
            if hasattr(result, "__await__"):
                result = await result  # type: ignore[assignment]
            addresses = set()
            for value in result:
                address = str(value).split("%", 1)[0]
                ip = ipaddress.ip_address(address)
                if not ip.is_global:
                    raise httpcore.ConnectError(
                        "Product host resolved to a non-public IP address."
                    )
                addresses.add(ip.compressed)
            if not addresses:
                raise httpcore.ConnectError("Product host DNS response was empty.")
            return sorted(
                addresses,
                key=lambda address: (
                    ipaddress.ip_address(address).version != 4,
                    address,
                ),
            )
        except httpcore.ConnectError:
            raise
        except (OSError, ValueError, TypeError, IndexError) as exc:
            raise httpcore.ConnectError(
                "Product host could not be resolved safely."
            ) from exc

    async def connect_tcp(
        self,
        host: str,
        port: int,
        timeout: float | None = None,
        local_address: str | None = None,
        socket_options: Iterable[httpcore.SOCKET_OPTION] | None = None,
    ) -> httpcore.AsyncNetworkStream:
        addresses = await self._validated_ips(host, port)
        last_error: Exception | None = None
        for address in addresses:
            try:
                return await self._backend.connect_tcp(
                    address,
                    port,
                    timeout=timeout,
                    local_address=local_address,
                    socket_options=socket_options,
                )
            except (httpcore.ConnectError, httpcore.ConnectTimeout) as exc:
                last_error = exc
        if last_error is not None:
            raise last_error
        raise httpcore.ConnectError("No public product host address was available.")

    async def connect_unix_socket(
        self,
        path: str,
        timeout: float | None = None,
        socket_options: Iterable[httpcore.SOCKET_OPTION] | None = None,
    ) -> httpcore.AsyncNetworkStream:
        return await self._backend.connect_unix_socket(
            path,
            timeout=timeout,
            socket_options=socket_options,
        )

    async def sleep(self, seconds: float) -> None:
        await self._backend.sleep(seconds)


class DNSPinnedAsyncHTTPTransport(httpx.AsyncHTTPTransport):
    """HTTPX transport with a DNS-validating, IP-pinning httpcore backend."""

    def __init__(
        self,
        *,
        resolver: AddressResolver | None = None,
        network_backend: httpcore.AsyncNetworkBackend | None = None,
    ) -> None:
        # No proxy is permitted here: the TCP peer must be the pinned product host.
        super().__init__(
            verify=True,
            trust_env=False,
            http1=True,
            http2=False,
            limits=httpx.Limits(
                max_connections=5,
                max_keepalive_connections=0,
                keepalive_expiry=0.0,
            ),
            retries=0,
        )
        original_pool = self._pool
        # HTTPX 0.28.x does not expose httpcore's network_backend argument.
        # Keep its verified SSL context and pool limits, replacing only the
        # backend. requirements.txt constrains the compatible HTTPX/httpcore API.
        self._pool = httpcore.AsyncConnectionPool(
            ssl_context=original_pool._ssl_context,
            max_connections=original_pool._max_connections,
            max_keepalive_connections=original_pool._max_keepalive_connections,
            keepalive_expiry=original_pool._keepalive_expiry,
            http1=original_pool._http1,
            http2=original_pool._http2,
            retries=original_pool._retries,
            local_address=original_pool._local_address,
            uds=original_pool._uds,
            network_backend=DNSPinnedNetworkBackend(
                resolver=resolver,
                backend=network_backend,
            ),
            socket_options=original_pool._socket_options,
        )


def validate_connected_peer(response: object) -> None:
    """Fail closed if the established HTTP connection reached a non-public IP."""
    extensions = getattr(response, "extensions", {})
    stream = extensions.get("network_stream") if isinstance(extensions, dict) else None
    if stream is None or not hasattr(stream, "get_extra_info"):
        raise HTTPException(502, "Product host connection could not be verified.")
    # httpcore's AnyIO stream exposes "server_addr"; retain "peername" for
    # compatible custom transports and existing test doubles.
    peer = stream.get_extra_info("server_addr") or stream.get_extra_info("peername")
    if not peer:
        raise HTTPException(502, "Product host connection could not be verified.")
    address = peer[0] if isinstance(peer, tuple) else peer
    try:
        ip = ipaddress.ip_address(str(address).split("%", 1)[0])
    except ValueError as exc:
        raise HTTPException(502, "Product host connection could not be verified.") from exc
    if not ip.is_global:
        raise HTTPException(400, "Product host is not publicly reachable.")
