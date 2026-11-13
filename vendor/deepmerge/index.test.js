import { describe, expect, it } from "vitest";
import deepmerge from "./index.js";

describe("patched deepmerge prototype-pollution regression", () => {
  it("ignores an own __proto__ payload key", () => {
    const payload = JSON.parse('{"__proto__":{"polluted":true}}');
    const result = deepmerge({}, payload);

    expect(Object.prototype).not.toHaveProperty("polluted");
    expect(Object.hasOwn(result, "__proto__")).toBe(false);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
  });

  it("does not merge inherited constructor.prototype payloads", () => {
    const payload = JSON.parse('{"constructor":{"prototype":{"polluted":true}}}');
    const result = deepmerge({}, payload);

    expect(Object.prototype).not.toHaveProperty("polluted");
    expect(Object.hasOwn(result, "constructor")).toBe(false);
  });

  it("continues to merge safe own enumerable properties", () => {
    expect(
      deepmerge(
        { nested: { left: true }, list: [1] },
        { nested: { right: true }, list: [2] },
      ),
    ).toEqual({ nested: { left: true, right: true }, list: [1, 2] });
  });
});
