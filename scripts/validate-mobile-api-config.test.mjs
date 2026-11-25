import { describe, expect, it } from 'vitest';
import { validateMobileApiConfig } from './validate-mobile-api-config.mjs';

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

  it('rejects embedded credentials and request-specific URL parts', () => {
    expect(() => validateMobileApiConfig('https://user:secret@api.useit.example')).toThrow('must not contain credentials');
    expect(() => validateMobileApiConfig('https://api.useit.example?key=value')).toThrow('must not contain credentials');
  });
});
