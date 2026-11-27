import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const register = readFileSync(new URL("../docs/RELEASE-REGISTER.md", import.meta.url), "utf8");

describe("Firestore idempotency TTL migration release gate", () => {
  it("does not treat an empty scan as proof after a historical TTL policy", () => {
    const start = register.indexOf("## Existing Firestore idempotency collection: TTL migration gate");
    const end = register.indexOf("\n## Verification and release evidence", start);
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);

    const gate = register.slice(start, end);
    expect(gate).toContain("whether the `analysis_idempotency_v1` TTL policy was ever enabled");
    expect(gate).toContain("A zero-candidate scan cannot reveal claims already deleted by TTL.");
    expect(gate).toContain("independent, per-request provider-dispatch and terminal-outcome evidence");
    expect(gate).toContain("keep TTL disabled");
    expect(gate).toContain("Do not infer safety from aggregate provider usage or an empty scan.");
  });
});
