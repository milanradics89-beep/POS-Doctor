import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const register = readFileSync(new URL("../docs/RELEASE-REGISTER.md", import.meta.url), "utf8");

describe("Firestore idempotency TTL migration release gate", () => {
  const start = register.indexOf("## Existing Firestore idempotency collection: TTL migration gate");
  const end = register.indexOf("\n\nThe migration command is dry-run by default.", start);
  const gate = register.slice(start, end);
  const numberedSteps = [...gate.matchAll(/^(\d+)\.\s+(.+)$/gm)];
  const steps = new Map(numberedSteps.map((match) => [Number(match[1]), match[2]]));

  it("keeps the new writer non-serving until historical claim outcomes are reconciled", () => {
    expect(start).toBeGreaterThanOrEqual(0);
    expect(end).toBeGreaterThan(start);
    expect([...steps.keys()]).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(steps.get(2)).toContain("disable it before any writer drain or deployment");
    expect(steps.get(3)).toContain("no old writer can create claims");
    expect(steps.get(4)).toContain("zero traffic");
    expect(steps.get(8)).toContain(
      "If per-request evidence cannot establish every affected claim outcome, keep traffic at zero, keep TTL disabled, and keep this release gate blocked.",
    );
    expect(steps.get(8)).toContain(
      "independent, per-request provider-dispatch and terminal-outcome evidence",
    );
    expect(steps.get(9)).toContain("Only after steps 1-8 pass, re-enable TTL");
    expect(steps.get(10)).toContain("Route traffic to the new version only after steps 1-9 pass");
    expect(gate).toContain("Do not infer safety from aggregate provider usage or an empty scan.");
  });
});
