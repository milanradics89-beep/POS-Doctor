import asyncio
import ipaddress
import socket

import httpcore
import httpx

import pytest
from fastapi import HTTPException

from backend.security import (
    DNSPinnedAsyncHTTPTransport,
    DNSPinnedNetworkBackend,
    validate_public_http_url,
    validate_connected_peer,
)


def test_rejects_localhost():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("http://localhost/product")
    assert exc.value.status_code == 400


def test_rejects_private_ip():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("http://127.0.0.1/product")
    assert exc.value.status_code == 400


def test_rejects_non_http_scheme():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("file:///etc/passwd")
    assert exc.value.status_code == 400


def test_rejects_embedded_credentials():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://user:password@example.com/product")
    assert exc.value.status_code == 400


def test_rejects_non_standard_port():
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://example.com:8443/product")
    assert exc.value.status_code == 400


class _Stream:
    def __init__(self, address: str):
        self.address = address

    def get_extra_info(self, name: str):
        return (self.address, 443) if name in {"peername", "server_addr"} else None


class _Response:
    def __init__(self, address: str):
        self.extensions = {"network_stream": _Stream(address)}


def test_connected_peer_must_be_public():
    validate_connected_peer(_Response("8.8.8.8"))


def test_connected_peer_rejects_private_address():
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response("10.0.0.1"))
    assert exc.value.status_code == 400


def test_connected_peer_requires_network_metadata():
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(type("Response", (), {"extensions": {}})())
    assert exc.value.status_code == 502


@pytest.mark.parametrize("address", ["100.64.0.1", "192.0.2.1", "198.51.100.1", "203.0.113.1"])
def test_rejects_non_global_ip_ranges_during_url_validation(monkeypatch, address):
    monkeypatch.setattr(
        "backend.security.socket.getaddrinfo",
        lambda hostname, port, family, type: [
            (socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", (address, port))
        ],
    )
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url(f"https://{address}/product")
    assert exc.value.status_code == 400


@pytest.mark.parametrize("address", ["100.64.0.1", "192.0.2.1", "198.51.100.1", "203.0.113.1"])
def test_connected_peer_rejects_non_global_ip_ranges(address):
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response(address))
    assert exc.value.status_code == 400


@pytest.mark.parametrize(
    "url",
    [
        "https://[invalid-ipv6/product",
        "https://example.com:not-a-port/product",
        "https://example.com:99999/product",
    ],
)
def test_rejects_malformed_urls_as_client_errors(url):
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url(url)
    assert exc.value.status_code == 400


def test_connected_peer_accepts_httpcore_server_addr():
    validate_connected_peer(_Response("8.8.8.8"))


def test_url_preflight_rejects_mixed_public_and_private_dns_answers(monkeypatch):
    monkeypatch.setattr(
        "backend.security.socket.getaddrinfo",
        lambda hostname, port, family, type: [
            (socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", ("8.8.8.8", port)),
            (socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", ("10.0.0.8", port)),
        ],
    )
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://shop.example/product")
    assert exc.value.status_code == 400


class _RecordingStream(httpcore.AsyncNetworkStream):
    def __init__(self, peer_address: str):
        self.peer_address = peer_address
        self.writes: list[bytes] = []
        self.sni_hostname: str | None = None
        self._response_sent = False

    async def read(self, max_bytes: int, timeout: float | None = None) -> bytes:
        if self._response_sent:
            return b""
        self._response_sent = True
        return b"HTTP/1.1 200 OK\r\nContent-Length: 0\r\nConnection: close\r\n\r\n"

    async def write(self, buffer: bytes, timeout: float | None = None) -> None:
        self.writes.append(bytes(buffer))

    async def aclose(self) -> None:
        return None

    async def start_tls(
        self,
        ssl_context,
        server_hostname: str | None = None,
        timeout: float | None = None,
    ):
        self.sni_hostname = server_hostname
        return self

    def get_extra_info(self, info: str):
        if info in {"server_addr", "peername"}:
            return (self.peer_address, 443)
        return None


class _RecordingBackend(httpcore.AsyncNetworkBackend):
    def __init__(self):
        self.connected_hosts: list[tuple[str, int]] = []
        self.streams: list[_RecordingStream] = []
        self.stream: _RecordingStream | None = None

    async def connect_tcp(
        self,
        host: str,
        port: int,
        timeout: float | None = None,
        local_address: str | None = None,
        socket_options=None,
    ):
        self.connected_hosts.append((host, port))
        self.stream = _RecordingStream(host)
        self.streams.append(self.stream)
        return self.stream

    async def connect_unix_socket(self, path: str, timeout=None, socket_options=None):
        raise AssertionError("Unix sockets are not used for product-page requests")

    async def sleep(self, seconds: float) -> None:
        await asyncio.sleep(seconds)


@pytest.mark.asyncio
async def test_transport_pins_tcp_ip_and_preserves_original_host_and_tls_sni():
    backend = _RecordingBackend()

    async def resolver(hostname: str, port: int):
        assert hostname == "shop.example"
        assert port == 443
        return ["8.8.8.8"]

    transport = DNSPinnedAsyncHTTPTransport(
        resolver=resolver,
        network_backend=backend,
    )
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        response = await client.get("https://shop.example/product")
        validate_connected_peer(response)

    assert backend.connected_hosts == [("8.8.8.8", 443)]
    assert backend.stream.sni_hostname == "shop.example"
    request_bytes = b"".join(backend.stream.writes).lower()
    assert b"host: shop.example\r\n" in request_bytes


@pytest.mark.asyncio
async def test_dns_rebinding_to_private_ip_is_blocked_before_tcp_connect(monkeypatch):
    # The synchronous preflight sees a public answer. The transport's fresh
    # resolution then sees a private answer, which must never reach connect_tcp.
    monkeypatch.setattr(
        "backend.security.socket.getaddrinfo",
        lambda hostname, port, family, type: [
            (socket.AF_INET, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", ("8.8.8.8", port))
        ],
    )
    url = "https://shop.example/product"
    assert validate_public_http_url(url) == url

    backend = _RecordingBackend()

    async def rebound_resolver(hostname: str, port: int):
        return ["10.0.0.9"]

    transport = DNSPinnedAsyncHTTPTransport(
        resolver=rebound_resolver,
        network_backend=backend,
    )
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        with pytest.raises(httpx.ConnectError):
            await client.get(url)

    assert backend.connected_hosts == []
    assert backend.stream is None
    assert backend.streams == []


@pytest.mark.asyncio
async def test_transport_rejects_mixed_public_and_private_dns_answers(monkeypatch):
    backend = _RecordingBackend()

    async def mixed_resolver(hostname: str, port: int):
        return ["8.8.8.8", "10.0.0.9"]

    transport = DNSPinnedAsyncHTTPTransport(
        resolver=mixed_resolver,
        network_backend=backend,
    )
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        with pytest.raises(httpx.ConnectError):
            await client.get("https://shop.example/product")

    assert backend.connected_hosts == []
    assert backend.stream is None
    assert backend.streams == []

@pytest.mark.asyncio
async def test_transport_resolves_and_pins_a_fresh_ip_for_each_request():
    answers = ["8.8.8.8", "1.1.1.1"]
    resolutions: list[tuple[str, int]] = []

    async def resolver(hostname: str, port: int):
        resolutions.append((hostname, port))
        return [answers[len(resolutions) - 1]]

    backend = _RecordingBackend()
    transport = DNSPinnedAsyncHTTPTransport(
        resolver=resolver,
        network_backend=backend,
    )
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        await client.get("https://shop.example/first")
        await client.get("https://shop.example/redirected")

    # The product extractor follows redirects as separate requests. With
    # keep-alive disabled, every hop must resolve and pin a fresh TCP peer.
    assert transport._pool._max_keepalive_connections == 0
    assert transport._pool._keepalive_expiry == 0.0
    assert resolutions == [("shop.example", 443), ("shop.example", 443)]
    assert backend.connected_hosts == [("8.8.8.8", 443), ("1.1.1.1", 443)]
    assert len(backend.streams) == 2
    for stream in backend.streams:
        assert stream.sni_hostname == "shop.example"
        request_bytes = b"".join(stream.writes).lower()
        assert b"host: shop.example\r\n" in request_bytes

@pytest.mark.asyncio
async def test_dns_resolution_is_bounded_by_connect_timeout_before_any_tcp_attempt():
    resolver_started = asyncio.Event()
    release_resolver = asyncio.Event()

    async def slow_resolver(hostname: str, port: int):
        resolver_started.set()
        await release_resolver.wait()
        return ["8.8.8.8"]

    backend = _RecordingBackend()
    pinned_backend = DNSPinnedNetworkBackend(
        resolver=slow_resolver,
        backend=backend,
    )
    connect_task = asyncio.create_task(
        pinned_backend.connect_tcp("shop.example", 443, timeout=0.1)
    )

    # Prove the resolver actually started before observing the deadline. This
    # avoids passing merely because a cold thread-pool executor took >5 ms.
    await asyncio.wait_for(resolver_started.wait(), timeout=1.0)
    with pytest.raises(httpcore.ConnectTimeout, match="DNS resolution timed out"):
        await connect_task

    assert backend.connected_hosts == []


@pytest.mark.asyncio
async def test_dns_pinned_network_backend_shares_connect_budget_across_addresses():
    class _FirstAddressFailsBackend(_RecordingBackend):
        def __init__(self):
            super().__init__()
            self.attempted_hosts: list[str] = []
            self.timeouts: list[float | None] = []

        async def connect_tcp(
            self,
            host: str,
            port: int,
            timeout: float | None = None,
            local_address: str | None = None,
            socket_options=None,
        ):
            self.attempted_hosts.append(host)
            self.timeouts.append(timeout)
            if len(self.attempted_hosts) == 1:
                await asyncio.sleep(0.02)
                raise httpcore.ConnectError("First public address is unavailable.")
            return await super().connect_tcp(
                host,
                port,
                timeout,
                local_address,
                socket_options,
            )

    async def resolver(hostname: str, port: int):
        return ["8.8.8.8", "1.1.1.1"]

    backend = _FirstAddressFailsBackend()
    pinned_backend = DNSPinnedNetworkBackend(
        resolver=resolver,
        backend=backend,
    )

    await pinned_backend.connect_tcp("shop.example", 443, timeout=0.5)

    assert backend.attempted_hosts == ["8.8.8.8", "1.1.1.1"]
    assert backend.timeouts[0] is not None
    assert backend.timeouts[1] is not None
    assert backend.timeouts[1] < backend.timeouts[0]
    assert backend.connected_hosts == [("1.1.1.1", 443)]



def test_syntax_only_url_validation_does_not_resolve_dns(monkeypatch):
    def unexpected_dns_lookup(*args, **kwargs):
        raise AssertionError("Syntax-only validation must leave DNS to the bounded transport.")

    monkeypatch.setattr("backend.security.socket.getaddrinfo", unexpected_dns_lookup)
    url = "https://shop.example/product"
    assert validate_public_http_url(url, resolve_dns=False) == url


def test_syntax_only_url_validation_rejects_private_literal_without_dns(monkeypatch):
    def unexpected_dns_lookup(*args, **kwargs):
        raise AssertionError("Private literal IPs must be rejected without DNS.")

    monkeypatch.setattr("backend.security.socket.getaddrinfo", unexpected_dns_lookup)
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("http://127.0.0.1/product", resolve_dns=False)
    assert exc.value.status_code == 400


@pytest.mark.parametrize(
    "url",
    ["https://[64:ff9b::a00:9]/product"],
)
def test_syntax_only_validation_rejects_nat64_address_embedding_private_ipv4(url):
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url(url, resolve_dns=False)
    assert exc.value.status_code == 400


def test_url_preflight_rejects_nat64_dns_answer_embedding_private_ipv4(monkeypatch):
    monkeypatch.setattr(
        "backend.security.socket.getaddrinfo",
        lambda hostname, port, family, type: [
            (socket.AF_INET6, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", ("64:ff9b::a00:9", port, 0, 0))
        ],
    )
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://shop.example/product")
    assert exc.value.status_code == 400


def test_connected_peer_rejects_nat64_address_embedding_private_ipv4():
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response("64:ff9b::a00:9"))
    assert exc.value.status_code == 400


@pytest.mark.asyncio
async def test_transport_rejects_nat64_dns_answer_embedding_private_ipv4_before_tcp_connect():
    backend = _RecordingBackend()

    async def resolver(hostname: str, port: int):
        return ["64:ff9b::a00:9"]

    transport = DNSPinnedAsyncHTTPTransport(
        resolver=resolver,
        network_backend=backend,
    )
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        with pytest.raises(httpx.ConnectError):
            await client.get("https://shop.example/product")

    assert backend.connected_hosts == []
    assert backend.streams == []


def test_connected_peer_accepts_nat64_address_embedding_global_ipv4():
    validate_connected_peer(_Response("64:ff9b::808:808"))


@pytest.mark.parametrize(
    "address",
    ["224.0.0.1", "239.255.255.250", "ff02::1", "ff0e::1", "64:ff9b::e000:1"],
)
def test_syntax_only_validation_rejects_multicast_destinations(address):
    url = f"https://[{address}]/product" if ":" in address else f"https://{address}/product"
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url(url, resolve_dns=False)
    assert exc.value.status_code == 400


@pytest.mark.parametrize(
    "address,family",
    [
        ("224.0.0.1", socket.AF_INET),
        ("239.255.255.250", socket.AF_INET),
        ("ff02::1", socket.AF_INET6),
        ("ff0e::1", socket.AF_INET6),
        ("64:ff9b::e000:1", socket.AF_INET6),
    ],
)
def test_url_preflight_rejects_multicast_dns_answers(monkeypatch, address, family):
    def getaddrinfo(hostname, port, family, type):
        sockaddr = (address, port) if family == socket.AF_INET else (address, port, 0, 0)
        return [(family, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", sockaddr)]

    monkeypatch.setattr("backend.security.socket.getaddrinfo", getaddrinfo)
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://shop.example/product")
    assert exc.value.status_code == 400


@pytest.mark.parametrize("address", ["224.0.0.1", "239.255.255.250", "ff02::1", "ff0e::1", "64:ff9b::e000:1"])
def test_connected_peer_rejects_multicast_destinations(address):
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response(address))
    assert exc.value.status_code == 400


_PRIVATE_TRANSITION_IPV6_ADDRESSES = [
    "::ffff:10.0.0.9",
    "2002:0a00:0009::",
    "2001:0:808:808::f5ff:fff6",
]


@pytest.mark.parametrize("address", _PRIVATE_TRANSITION_IPV6_ADDRESSES)
def test_syntax_only_validation_rejects_private_ipv4_embedded_in_ipv6_transition_addresses(address):
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url(f"https://[{address}]/product", resolve_dns=False)
    assert exc.value.status_code == 400


@pytest.mark.parametrize("address", _PRIVATE_TRANSITION_IPV6_ADDRESSES)
def test_url_preflight_rejects_private_ipv4_embedded_in_ipv6_transition_dns_answers(monkeypatch, address):
    def getaddrinfo(hostname, port, family, type):
        return [
            (socket.AF_INET6, socket.SOCK_STREAM, socket.IPPROTO_TCP, "", (address, port, 0, 0))
        ]

    monkeypatch.setattr("backend.security.socket.getaddrinfo", getaddrinfo)
    with pytest.raises(HTTPException) as exc:
        validate_public_http_url("https://shop.example/product")
    assert exc.value.status_code == 400


@pytest.mark.parametrize("address", _PRIVATE_TRANSITION_IPV6_ADDRESSES)
def test_connected_peer_rejects_private_ipv4_embedded_in_ipv6_transition_addresses(address):
    with pytest.raises(HTTPException) as exc:
        validate_connected_peer(_Response(address))
    assert exc.value.status_code == 400


@pytest.mark.asyncio
@pytest.mark.parametrize("address", _PRIVATE_TRANSITION_IPV6_ADDRESSES)
async def test_transport_rejects_private_ipv4_embedded_in_ipv6_transition_dns_answers_before_tcp_connect(address):
    backend = _RecordingBackend()

    async def resolver(hostname: str, port: int):
        return [address]

    transport = DNSPinnedAsyncHTTPTransport(resolver=resolver, network_backend=backend)
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        with pytest.raises(httpx.ConnectError):
            await client.get("https://shop.example/product")

    assert backend.connected_hosts == []
    assert backend.streams == []


@pytest.mark.asyncio
@pytest.mark.parametrize("address", ["224.0.0.1", "ff0e::1", "64:ff9b::e000:1"])
async def test_transport_rejects_multicast_dns_answers_before_tcp_connect(address):
    backend = _RecordingBackend()

    async def resolver(hostname: str, port: int):
        return [address]

    transport = DNSPinnedAsyncHTTPTransport(resolver=resolver, network_backend=backend)
    async with httpx.AsyncClient(transport=transport, trust_env=False) as client:
        with pytest.raises(httpx.ConnectError):
            await client.get("https://shop.example/product")

    assert backend.connected_hosts == []
    assert backend.streams == []
