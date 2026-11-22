import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  new URL("../.github/workflows/codeql.yml", import.meta.url),
  "utf8",
);

describe("CodeQL workflow action consistency", () => {
  it("uses one immutable CodeQL action revision for init and analyze", () => {
    const revisions = [
      ...workflow.matchAll(/uses:\s*github\/codeql-action\/(?:init|analyze)@([0-9a-f]{40})/g),
    ].map((match) => match[1]);

    expect(revisions).toHaveLength(2);
    expect(new Set(revisions).size).toBe(1);
    expect(revisions[0]).toBe("9b3254085494b55a0f7c4c2b3d2d52cc712ce370");
  });
});
