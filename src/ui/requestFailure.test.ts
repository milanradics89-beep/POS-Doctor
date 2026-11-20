import { describe, expect, it } from 'vitest';
import { requestFailureKind } from './requestFailure';

describe('requestFailureKind', () => {
  it('maps common React Native and Fetch network failures to the offline state', () => {
    expect(requestFailureKind(new TypeError('Network request failed'))).toBe('offline');
    expect(requestFailureKind(new TypeError('Failed to fetch'))).toBe('offline');
    expect(requestFailureKind(new TypeError('NetworkError when attempting to fetch resource'))).toBe('offline');
  });

  it('does not mislabel timeouts, aborts, HTTP responses, or malformed payloads as offline', () => {
    const aborted = new Error('The operation was aborted.');
    aborted.name = 'AbortError';
    expect(requestFailureKind(aborted)).toBe('error');
    expect(requestFailureKind(new TypeError('Invalid JSON response'))).toBe('error');
    expect(requestFailureKind(new Error('USEIT API request failed (503).'))).toBe('error');
  });
});
