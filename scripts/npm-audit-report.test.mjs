import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { formatNpmAuditSummary, summarizeNpmAudit } from "./npm-audit-report.mjs";

const report = (counts, vulnerabilities = {}) => ({
  vulnerabilities,
  metadata: {
    vulnerabilities: {
      info: 0,
      low: 0,
      moderate: 0,
      high: 0,
      critical: 0,
      ...counts,
    },
  },
});

describe("full npm audit report", () => {
  it("records moderate findings without treating npm's advisory exit code as a clean audit", () => {
    const result = summarizeNpmAudit(report(
      { moderate: 1 },
      { minimatch: {
        severity: "moderate",
        isDirect: false,
        range: "10.2.6",
        fixAvailable: false,
        via: [{ name: "minimatch", title: "ReDoS advisory", url: "https://example.invalid/advisory" }],
      } },
    ), 1);

    expect(result.counts.moderate).toBe(1);
    expect(result.entries[0].package).toBe("minimatch");
    expect(result.entries[0].via).toEqual(["minimatch: ReDoS advisory"]);
    expect(result.blocking).toBe(0);
    expect(result.shouldFail).toBe(false);
    expect(formatNpmAuditSummary(result)).toContain('"package":"minimatch"');
  });

  it.each(["high", "critical"])("blocks %s findings", (severity) => {
    const result = summarizeNpmAudit(report(
      { [severity]: 1 },
      { vulnerable: { severity, isDirect: true, range: "*", via: ["GHSA-test"] } },
    ), 1);

    expect(result.blocking).toBe(1);
    expect(result.shouldFail).toBe(true);
  });

  it("rejects incomplete or failed network reports", () => {
    expect(() => summarizeNpmAudit({ error: { code: "ECONNRESET" } }, 1)).toThrow(/complete vulnerability report/);
    expect(() => summarizeNpmAudit({ vulnerabilities: {} }, 0)).toThrow(/complete vulnerability report/);
    expect(() => summarizeNpmAudit(report({}, {}), 1)).toThrow(/without reporting advisories/);
  });

  it("keeps the existing runtime high-severity gate and adds the full-tree report/artifact", () => {
    const workflow = readFileSync(new URL("../.github/workflows/validate.yml", import.meta.url), "utf8");
    expect(workflow).toContain("npm audit --omit=dev --audit-level=high");
    expect(workflow).toContain('node scripts/npm-audit-report.mjs "$REPORT" "$audit_status"');
    expect(workflow).toContain("npm-full-audit-report");
  });
});
