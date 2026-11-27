import { EventEmitter } from 'node:events';
import { PassThrough } from 'node:stream';
import { describe, expect, it, vi } from 'vitest';
import {
  isPublicAddress,
  resolvePublicAddresses,
  validateMobileApiConfig,
  verifyBackendReady,
} from './validate-mobile-api-config.mjs';

function emitMockRequestError(request, error) {
  if (error) {
    queueMicrotask(function emitError() {
      request.emit('error', error);
    });
  }
}

function finishMockResponse(response, next) {
  if (next?.leaveOpen) {
    if (next.partialBody) response.write(next.partialBody);
    return;
  }
  response.end(next?.body ?? JSON.stringify(next?.payload ?? { status: 'ok' }));
}

function createRequestMock(responses) {
  const requests = [];
  const requestImpl = vi.fn(function mockRequest(options, onResponse) {
    const request = new EventEmitter();
    request.setTimeout = vi.fn();
    request.destroy = vi.fn(function mockDestroy(error) {
      emitMockRequestError(request, error);
    });
    request.end = vi.fn(function mockEnd() {
      const next = responses.shift();
      const response = new PassThrough();
      response.statusCode = next?.statusCode ?? 200;
      onResponse(response);
      finishMockResponse(response, next);
    });
    requests.push({ options, request });
    return request;
  });
  return { requestImpl, requests };
}

function createResolverFactory({
  ipv4 = [],
  ipv6 = [],
  errors = {},
  pending = false,
  cancelRejects = false,
} = {}) {
  const instances = [];
  const resolverFactory = vi.fn(function createResolver() {
    const pendingRejectors = [];
    const resolve = (family) => {
      if (pending) {
        return new Promise((resolvePending, rejectPending) => {
          pendingRejectors.push(rejectPending);
        });
      }
      if (errors[family]) return Promise.reject(errors[family]);
      return Promise.resolve(family === 'ipv4' ? ipv4 : ipv6);
    };
    const resolver = {
      resolve4: vi.fn(() => resolve('ipv4')),
      resolve6: vi.fn(() => resolve('ipv6')),
      cancel: vi.fn(function cancelPendingQueries() {
        if (!cancelRejects) return;
        const cancellation = Object.assign(new Error('query cancelled'), { code: 'ECANCELLED' });
        pendingRejectors.splice(0).forEach((rejectPending) => rejectPending(cancellation));
      }),
    };
    instances.push(resolver);
    return resolver;
  });
  return { resolverFactory, instances };
}

function resolvePinned(options, lookupOptions = { all: true }) {
  return new Promise((resolve, reject) => {
    options.lookup(options.hostname, lookupOptions, (error, address, family) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(lookupOptions.all ? address : { address, family });
    });
  });
}

describe('remote mobile API build configuration', () => {
  it('accepts a deployed HTTPS backend URL', () => {
    expect(validateMobileApiConfig('https://api.useit.com/run/')).toBe('https://api.useit.com/run');
  });

  it('rejects a missing API URL', () => {
    expect(() => validateMobileApiConfig('')).toThrow('is required for remote mobile builds');
  });

  it('rejects localhost and local IP addresses', () => {
    expect(() => validateMobileApiConfig('https://localhost:8000')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://127.0.0.1:8000')).toThrow('deployed public hostname');
  });

  it('rejects plain HTTP', () => {
    expect(() => validateMobileApiConfig('http://api.useit.example')).toThrow('must use HTTPS');
  });

  it('rejects private and internal DNS suffixes', () => {
    expect(() => validateMobileApiConfig('https://backend.internal')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://backend.local')).toThrow('deployed public hostname');
  });

  it('rejects reserved example/test names and trailing-dot local hostnames', () => {
    expect(() => validateMobileApiConfig('https://api.useit.example')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://backend.test')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://backend.invalid')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://localhost.:8000')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://backend.internal.')).toThrow('deployed public hostname');
    expect(() => validateMobileApiConfig('https://backend')).toThrow('deployed public hostname');
  });

  it('rejects embedded credentials and request-specific URL parts', () => {
    expect(() => validateMobileApiConfig('https://user:secret@api.useit.example')).toThrow('must not contain credentials');
    expect(() => validateMobileApiConfig('https://api.useit.com?key=value')).toThrow('must not contain credentials');
    expect(() => validateMobileApiConfig('https://api.useit.com/#fragment')).toThrow('must not contain credentials');
  });
});

describe('public DNS address validation', () => {
  it.each([
    '0.0.0.0',
    '10.0.0.1',
    '100.64.0.1',
    '127.0.0.1',
    '169.254.169.254',
    '172.16.0.1',
    '192.0.2.1',
    '192.168.1.1',
    '198.18.0.1',
    '198.51.100.1',
    '203.0.113.1',
    '224.0.0.1',
    '240.0.0.1',
    '::',
    '::1',
    '::ffff:127.0.0.1',
    '64:ff9b::a9fe:a9fe',
    '64:ff9b:1::1',
    '100::1',
    '100:0:0:1::1',
    '2001:db8::1',
    '2001:1::1',
    '2001:2::1',
    '2002:0808:0808::1',
    '2003:400::1',
    '2004::1',
    '2200::1',
    '2d00::1',
    '2e00::1',
    '3000::1',
    '3800::1',
    '3c00::1',
    '3e00::1',
    '3f00::1',
    '3ffe::1',
    '3fff:1000::1',
    'fc00::1',
    'fd00::1',
    'fe80::1',
    'ff02::1',
  ])('rejects non-public address %s', (address) => {
    expect(isPublicAddress(address)).toBe(false);
  });

  it.each([
    '8.8.8.8',
    '93.184.216.34',
    '2606:4700:4700::1111',
    '2001:4860:4860::8888',
    '2003:3ff::1',
    '2611::1',
    '2621::1',
    '2404:6800::1',
    '2412:abcd::1',
    '263a::1',
    '2801::1',
    '2a02::1',
    '2a12::1',
    '2c0f::1',
    '2620:4f:8000::1',
  ])('accepts public address %s', (address) => {
    expect(isPublicAddress(address)).toBe(true);
  });

  it('rejects the whole DNS answer if any A or AAAA result is non-public', async () => {
    const { resolverFactory, instances } = createResolverFactory({
      ipv4: ['93.184.216.34'],
      ipv6: ['fe80::1'],
    });
    await expect(resolvePublicAddresses('api.useit.com', resolverFactory))
      .rejects.toThrow('exclusively to public');
    expect(resolverFactory).toHaveBeenCalledTimes(1);
    expect(instances[0].resolve4).toHaveBeenCalledWith('api.useit.com.');
    expect(instances[0].resolve6).toHaveBeenCalledWith('api.useit.com.');
    expect(instances[0].cancel).toHaveBeenCalledTimes(1);
  });

  it('fails closed when DNS returns no addresses or a malformed answer', async () => {
    const empty = createResolverFactory();
    await expect(resolvePublicAddresses('api.useit.com', empty.resolverFactory))
      .rejects.toThrow('did not resolve');

    const malformed = createResolverFactory({ ipv4: ['not-an-ip-address'] });
    await expect(resolvePublicAddresses('api.useit.com', malformed.resolverFactory))
      .rejects.toThrow('exclusively to public');
  });

  it('fails closed on NXDOMAIN even when the other record family returns an address', async () => {
    const nxdomain = Object.assign(new Error('DNS name does not exist'), { code: 'ENOTFOUND' });
    const factory = createResolverFactory({
      ipv4: ['93.184.216.34'],
      errors: { ipv6: nxdomain },
    });
    await expect(resolvePublicAddresses('api.useit.com', factory.resolverFactory))
      .rejects.toThrow('could not be resolved');
    expect(factory.instances[0].cancel).toHaveBeenCalledTimes(1);
  });

  it('treats an absent address family as empty while requiring at least one valid public answer', async () => {
    const noIpv6 = Object.assign(new Error('no AAAA records'), { code: 'ENODATA' });
    const factory = createResolverFactory({
      ipv4: ['93.184.216.34'],
      errors: { ipv6: noIpv6 },
    });
    await expect(resolvePublicAddresses('api.useit.com', factory.resolverFactory))
      .resolves.toEqual([{ address: '93.184.216.34', family: 4 }]);
  });

  it('cancels outstanding DNS queries when the DNS deadline expires', async () => {
    const { resolverFactory, instances } = createResolverFactory({ pending: true, cancelRejects: true });
    await expect(resolvePublicAddresses('api.useit.com', resolverFactory, 25))
      .rejects.toThrow('DNS resolution exceeded its total time limit.');
    expect(instances).toHaveLength(1);
    expect(instances[0].cancel).toHaveBeenCalledTimes(1);
  });
});

describe('pinned backend readiness probes', () => {
  it('pins both readiness probes to the same public DNS answer without a second resolution', async () => {
    const dns = createResolverFactory({
      ipv4: ['93.184.216.34'],
      ipv6: ['2606:4700:4700::1111'],
    });
    const { requestImpl, requests } = createRequestMock([
      { payload: { status: 'ok' } },
      { payload: { status: 'ready' } },
    ]);

    await expect(verifyBackendReady('https://api.useit.com/backend', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
    })).resolves.toBeUndefined();

    expect(dns.resolverFactory).toHaveBeenCalledTimes(1);
    expect(dns.instances[0].resolve4).toHaveBeenCalledWith('api.useit.com.');
    expect(dns.instances[0].resolve6).toHaveBeenCalledWith('api.useit.com.');
    expect(requests).toHaveLength(2);
    expect(requests.map(({ options }) => options.path)).toEqual(['/backend/health', '/backend/ready']);
    expect(requests.map(({ options }) => options.method)).toEqual(['GET', 'GET']);
    expect(requests.map(({ options }) => options.servername)).toEqual(['api.useit.com', 'api.useit.com']);

    const firstResolved = await resolvePinned(requests[0].options);
    const secondResolved = await resolvePinned(requests[1].options);
    expect(firstResolved).toEqual([
      { address: '93.184.216.34', family: 4 },
      { address: '2606:4700:4700::1111', family: 6 },
    ]);
    expect(secondResolved).toEqual(firstResolved);
    expect(await resolvePinned(requests[0].options, { family: 4 }))
      .toEqual({ address: '93.184.216.34', family: 4 });
    expect(await resolvePinned(requests[0].options, { family: 6 }))
      .toEqual({ address: '2606:4700:4700::1111', family: 6 });

    await expect(new Promise((resolve, reject) => {
      requests[0].options.lookup('attacker.example.com', { all: true }, (error, records) => {
        if (error) reject(error);
        else resolve(records);
      });
    })).rejects.toThrow('Unexpected hostname');

    await expect(new Promise((resolve, reject) => {
      requests[0].options.lookup('api.useit.com', { family: 5 }, (error, address) => {
        if (error) reject(error);
        else resolve(address);
      });
    })).rejects.toThrow('No validated DNS address');
  });

  it('never sends readiness requests when DNS resolves to a private or mixed address set', async () => {
    const dns = createResolverFactory({
      ipv4: ['93.184.216.34', '10.20.30.40'],
    });
    const { requestImpl } = createRequestMock([]);

    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
    })).rejects.toThrow('exclusively to public');

    expect(dns.instances[0].cancel).toHaveBeenCalledTimes(1);
    expect(requestImpl).not.toHaveBeenCalled();
  });

  it('rejects redirects and non-success responses', async () => {
    const dns = createResolverFactory({ ipv4: ['93.184.216.34'] });
    const { requestImpl } = createRequestMock([
      { statusCode: 302, payload: { status: 'ok' } },
    ]);
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
    })).rejects.toThrow('/health returned HTTP 302');
    expect(requestImpl).toHaveBeenCalledTimes(1);
  });

  it('enforces a total deadline when partial response data keeps the socket active', async () => {
    const dns = createResolverFactory({ ipv4: ['93.184.216.34'] });
    const { requestImpl, requests } = createRequestMock([
      { partialBody: '{"status":', leaveOpen: true },
    ]);

    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
      timeoutMs: 25,
    })).rejects.toThrow('/health is unreachable');

    expect(requests).toHaveLength(1);
    expect(requests[0].request.destroy).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'USEIT backend readiness request exceeded its total time limit.' }),
    );
  });

  it('rejects invalid JSON and an incorrect readiness state', async () => {
    const dns = createResolverFactory({ ipv4: ['93.184.216.34'] });
    const invalidJson = createRequestMock([{ body: 'not-json' }]);
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl: invalidJson.requestImpl,
    })).rejects.toThrow('/health returned invalid JSON');

    const incorrectStatus = createRequestMock([
      { payload: { status: 'not-ready' } },
    ]);
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl: incorrectStatus.requestImpl,
    })).rejects.toThrow('did not report status "ok"');
  });

  it('blocks builds when backend readiness is unavailable', async () => {
    const dns = createResolverFactory({ ipv4: ['93.184.216.34'] });
    const { requestImpl } = createRequestMock([
      { payload: { status: 'ok' } },
      { statusCode: 503, payload: { detail: 'Service is not ready.' } },
    ]);
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
    })).rejects.toThrow('/ready returned HTTP 503');
  });

  it('fails closed when DNS resolution fails', async () => {
    const failure = Object.assign(new Error('DNS unavailable'), { code: 'ESERVFAIL' });
    const dns = createResolverFactory({ errors: { ipv4: failure, ipv6: failure } });
    const requestImpl = vi.fn();
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      requestImpl,
    })).rejects.toThrow('could not be resolved');
    expect(dns.instances[0].cancel).toHaveBeenCalledTimes(1);
    expect(requestImpl).not.toHaveBeenCalled();
  });

  it('applies the DNS deadline before any HTTPS readiness probe', async () => {
    const dns = createResolverFactory({ pending: true });
    const requestImpl = vi.fn();
    await expect(verifyBackendReady('https://api.useit.com', {
      resolverFactory: dns.resolverFactory,
      dnsTimeoutMs: 25,
      requestImpl,
    })).rejects.toThrow('DNS resolution exceeded its total time limit');
    expect(dns.instances[0].cancel).toHaveBeenCalledTimes(1);
    expect(requestImpl).not.toHaveBeenCalled();
  });
});
