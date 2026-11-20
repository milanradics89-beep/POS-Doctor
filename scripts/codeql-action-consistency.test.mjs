import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

describe("CodeQL workflow action consistency", () => {
  it("pins init and analyze to the same immutable v4.39.4 revision", () => {
    const workflow = read(".github/workflows/codeql.yml");
    const revisions = [
      ...workflow.matchAll(/uses:\s*github\/codeql-action\/(?:init|analyze)@([0-9a-f]{40})/g),
    ].map(match => match[1]);

    expect(revisions).toHaveLength(2);
    expect(new Set(revisions).size).toBe(1);
    expect(revisions[0]).toBe("1bd86f2fdb4b86187fa4059f16f31a3202acc9ea");
  });

  it("groups CodeQL action updates atomically in Dependabot", () => {
    const dependabot = read(".github/dependabot.yml");
    expect(dependabot).toContain("codeql-action:");
    expect(dependabot).toContain('"github/codeql-action/*"');
  });
});
