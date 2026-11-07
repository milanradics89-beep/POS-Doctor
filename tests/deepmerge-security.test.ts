import { describe, expect, it } from 'vitest';
import deepmerge from 'deepmerge';

describe('vendored deepmerge prototype-poisoning regression', () => {
  it('rejects __proto__ from a source merged into a null-prototype target', () => {
    const target = Object.create(null);
    target.debug = false;
    const source = JSON.parse('{"__proto__":{"isAdmin":true}}');
    const merged = deepmerge(target, source);
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
    expect((merged as Record<string, unknown>).isAdmin).toBeUndefined();
    expect(merged.debug).toBe(false);
  });

  it('rejects nested __proto__ values merged into null placeholders', () => {
    const source = JSON.parse('{"session":{"__proto__":{"isAdmin":true}}}');
    const merged = deepmerge({ session: null }, source);
    expect(Object.getPrototypeOf(merged.session)).toBe(Object.prototype);
    expect((merged.session as Record<string, unknown>).isAdmin).toBeUndefined();
  });

  it('does not copy an own __proto__ property from the target', () => {
    const target = JSON.parse('{"__proto__":{"isAdmin":true},"debug":false}');
    const merged = deepmerge(target, { verbose: true });
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
    expect((merged as Record<string, unknown>).isAdmin).toBeUndefined();
    expect(Object.prototype.hasOwnProperty.call(merged, '__proto__')).toBe(false);
    expect(merged.debug).toBe(false);
    expect(merged.verbose).toBe(true);
  });
});
