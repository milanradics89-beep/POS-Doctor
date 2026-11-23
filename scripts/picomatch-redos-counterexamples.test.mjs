import { describe, expect, it } from "vitest";
import { spawnSync } from "node:child_process";

// These exact upstream counterexample patterns are disputed. This test records
// bounded runtime behavior only; it does not assert that the withdrawn CVE is valid.
// Each matcher runs in a child process so a pathological regex cannot block Vitest.
const cases = [
  { pattern: "+(*)", input: `${"a".repeat(30)}/` },
  { pattern: "*(*)", input: `${"a".repeat(30)}/` },
  { pattern: "+(a*)", input: `${"a".repeat(30)}/` },
  { pattern: "+(*a)", input: `${"a".repeat(30)}!` },
  { pattern: "*(a*|b)", input: `${"a".repeat(30)}!` },
  { pattern: "+(ab|abab)", input: `${"ab".repeat(30)}!` },
];

describe("picomatch exact upstream ReDoS counterexamples", () => {
  it.each(cases)("completes the exact pattern $pattern within the bounded child timeout", ({ pattern, input }) => {
    const source = [
      'const picomatch = require("picomatch");',
      "const [pattern, input] = process.argv.slice(1);",
      "process.stdout.write(String(picomatch(pattern)(input)));",
    ].join("\n");
    const child = spawnSync(process.execPath, ["-e", source, pattern, input], {
      encoding: "utf8",
      timeout: 2500,
      maxBuffer: 1024,
    });

    expect(child.error, `pattern ${pattern} exceeded the 2500ms child timeout`).toBeUndefined();
    expect(child.status, `pattern ${pattern} child process failed: ${child.stderr}`).toBe(0);
    expect(["true", "false"]).toContain(child.stdout);
  });
});
