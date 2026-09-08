import { describe, expect, it } from 'vitest';
import { normalizeApiBaseUrl } from './apiConfig';

describe('normalizeApiBaseUrl', () => {
  it('normalizes a valid HTTPS endpoint', () => {
    expect(normalizeApiBaseUrl(' https://api.example.test/ ')).toBe('https://api.example.test');
  });

  it('rejects a missing endpoint', () => {
    expect(() => normalizeApiBaseUrl('   ')).toThrow('USEIT API base URL is required.');
  });

  it('rejects relative URLs', () => {
    expect(() => normalizeApiBaseUrl('/api')).toThrow('must be an absolute URL');
  });

  it('rejects insecure remote HTTP endpoints', () => {
    expect(() => normalizeApiBaseUrl('http://api.example.test')).toThrow('must use HTTPS outside local development');
  });

  it('allows HTTP for local development only', () => {
    expect(normalizeApiBaseUrl('http://localhost:8000/')).toBe('http://localhost:8000');
    expect(normalizeApiBaseUrl('http://127.0.0.1:8000/')).toBe('http://127.0.0.1:8000');
  });
});
