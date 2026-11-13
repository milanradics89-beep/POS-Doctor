import { describe, expect, it } from 'vitest';
import { permissionDecision } from './permissionDecision';

describe('permissionDecision', () => {
  it('allows the requested action when permission is granted', () => {
    expect(permissionDecision(true, true)).toBe('granted');
    expect(permissionDecision(true, false)).toBe('granted');
  });

  it('offers another permission request when the operating system allows it', () => {
    expect(permissionDecision(false, true)).toBe('request_again');
  });

  it('directs the user to Settings after permission requests are exhausted', () => {
    expect(permissionDecision(false, false)).toBe('open_settings');
  });
});
