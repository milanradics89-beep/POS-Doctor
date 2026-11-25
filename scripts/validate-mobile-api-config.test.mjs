import { describe, expect, it, vi } from 'vitest';
import { validateMobileApiConfig, verifyBackendReady } from './validate-mobile-api-config.mjs';

describe('remote mobile API build configuration', () => {
  it('accepts a deployed HTTPS backend URL', () => {
    expect(validateMobileApiConfig('https://api.useit.example/run/')).toBe('https://api.useit.example/run');
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

  it('probes both public health and production readiness before a remote build', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ready' }), { status: 200 }));
    await expect(verifyBackendReady('https://api.useit.example', fetchMock)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.useit.example/health');
    expect(String(fetchMock.mock.calls[1][0])).toBe('https://api.useit.example/ready');
  });

  it('preserves a configured backend path prefix during readiness probes', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ready' }), { status: 200 }));
    await expect(verifyBackendReady('https://api.useit.example/backend', fetchMock)).resolves.toBeUndefined();
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.useit.example/backend/health');
    expect(String(fetchMock.mock.calls[1][0])).toBe('https://api.useit.example/backend/ready');
  });

  it('blocks builds when the backend readiness endpoint is unavailable', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ status: 'ok' }), { status: 200 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ detail: 'Service is not ready.' }), { status: 503 }));
    await expect(verifyBackendReady('https://api.useit.example', fetchMock)).rejects.toThrow('/ready returned HTTP 503');
  });

  it('rejects embedded credentials and request-specific URL parts', () => {
    expect(() => validateMobileApiConfig('https://user:secret@api.useit.example')).toThrow('must not contain credentials');
    expect(() => validateMobileApiConfig('https://api.useit.example?key=value')).toThrow('must not contain credentials');
  });
});
