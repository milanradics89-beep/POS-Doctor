import { describe, expect, it, vi } from 'vitest';
import { validateMobileApiConfig, verifyBackendReady } from './validate-mobile-api-config.mjs';

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

  it('probes both public health and production readiness before a remote build', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ready' }), { status: 200 }));
    await expect(verifyBackendReady('https://api.useit.com', fetchMock)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][1]).toMatchObject({ redirect: 'error' });
    expect(fetchMock.mock.calls[1][1]).toMatchObject({ redirect: 'error' });
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.useit.com/health');
    expect(String(fetchMock.mock.calls[1][0])).toBe('https://api.useit.com/ready');
  });

  it('preserves a configured backend path prefix during readiness probes', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ready' }), { status: 200 }));
    await expect(verifyBackendReady('https://api.useit.com/backend', fetchMock)).resolves.toBeUndefined();
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.useit.com/backend/health');
    expect(String(fetchMock.mock.calls[1][0])).toBe('https://api.useit.com/backend/ready');
  });

  it('blocks builds when the backend readiness endpoint is unavailable', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ detail: 'Service is not ready.' }), { status: 503 }));
    await expect(verifyBackendReady('https://api.useit.com', fetchMock)).rejects.toThrow('/ready returned HTTP 503');
  });

  it('rejects embedded credentials and request-specific URL parts', () => {
    expect(() => validateMobileApiConfig('https://user:secret@api.useit.example')).toThrow('must not contain credentials');
    expect(() => validateMobileApiConfig('https://api.useit.com?key=value')).toThrow('must not contain credentials');
  });
});
