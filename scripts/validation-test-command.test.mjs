import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("CI unit-test command", () => {
  it("runs Vitest without allowing an empty test discovery to pass", () => {
    const workflow = readFileSync(new URL("../.github/workflows/validate.yml", import.meta.url), "utf8");
    const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
    const lines = workflow.split(/\r?\n/);
    const start = lines.indexOf("      - name: Unit tests");
    expect(start).toBeGreaterThanOrEqual(0);
    const next = lines.findIndex((line, index) => index > start && line.startsWith("      - name: "));
    const step = lines.slice(start, next < 0 ? undefined : next).join("\n");

    expect(step).toContain("run: npm test");
    expect(step).not.toContain("--passWithNoTests");
    expect(workflow).not.toContain("--passWithNoTests");
    expect(packageJson.scripts.test).toBe("vitest run");
  });
});
