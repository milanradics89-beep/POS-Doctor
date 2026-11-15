import fs from "node:fs";
import { pathToFileURL } from "node:url";

/**
 * Validate and normalize the complete npm audit JSON report.
 * Moderate/low findings remain visible in logs and the artifact; high/critical
 * findings fail this gate. The separate runtime-only audit remains unchanged.
 */
export function summarizeNpmAudit(report, npmExitCode) {
  if (!report || typeof report !== "object" || report.error ||
      !report.vulnerabilities || typeof report.vulnerabilities !== "object" ||
      !report.metadata?.vulnerabilities || typeof report.metadata.vulnerabilities !== "object") {
    throw new Error("npm audit did not return a complete vulnerability report.");
  }
  if (!Number.isInteger(npmExitCode) || npmExitCode < 0) {
    throw new Error("npm audit exit code must be a non-negative integer.");
  }

  const entries = Object.entries(report.vulnerabilities)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, item]) => ({
      package: name,
      severity: item.severity,
      direct: Boolean(item.isDirect),
      range: item.range ?? null,
      fixAvailable: item.fixAvailable ?? false,
      via: (item.via ?? []).map((entry) =>
        typeof entry === "string"
          ? entry
          : `${entry.name || "advisory"}: ${entry.title || entry.url || "details unavailable"}`,
      ),
    }));

  const counts = report.metadata.vulnerabilities;
  const high = Number(counts.high ?? 0);
  const critical = Number(counts.critical ?? 0);
  if (![high, critical].every(Number.isFinite)) {
    throw new Error("npm audit returned invalid high/critical vulnerability counts.");
  }
  if (npmExitCode !== 0 && entries.length === 0) {
    throw new Error("npm audit exited non-zero without reporting advisories.");
  }

  const blocking = high + critical;
  return { counts, entries, blocking, shouldFail: blocking > 0 };
}

export function formatNpmAuditSummary(summary) {
  return [
    `Full dependency audit counts: ${JSON.stringify(summary.counts)}`,
    ...summary.entries.map((entry) => JSON.stringify(entry)),
    summary.shouldFail
      ? `Blocking high/critical npm advisories: ${summary.blocking}`
      : "No high or critical npm advisories found in the full dependency tree.",
  ].join("\n");
}

function main() {
  const [reportPath, exitCodeText] = process.argv.slice(2);
  const npmExitCode = Number(exitCodeText);
  if (!reportPath || !Number.isInteger(npmExitCode)) {
    throw new Error("Usage: node scripts/npm-audit-report.mjs <report.json> <npm-exit-code>");
  }
  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const summary = summarizeNpmAudit(report, npmExitCode);
  console.log(formatNpmAuditSummary(summary));
  if (summary.shouldFail) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    main();
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
