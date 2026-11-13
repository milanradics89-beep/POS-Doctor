import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const workflow = readFileSync(
  new URL("../.github/workflows/expo-sdk57-lock-refresh.yml", import.meta.url),
  "utf8",
);

describe("Expo SDK 57 dependency refresh workflow", () => {
  it("is restricted to the isolated refresh branch and supports a manual retry", () => {
    expect(workflow).toContain("workflow_dispatch:");
    expect(workflow).toContain("TARGET_REF: refs/heads/automation/expo-sdk57-lock-refresh-run-20261113b");
    expect(workflow).toContain('if ! is_allowed_ref "$GITHUB_REF"');
    expect(workflow).toContain("Main must never be a lockfile-refresh target.");
  });

  it("aligns all five Expo SDK 57 bundled package versions", () => {
    for (const version of [
      'expo: "~57.0.33"',
      '"expo-constants": "~57.0.24"',
      '"expo-image-picker": "~57.0.21"',
      '"expo-linking": "~57.0.14"',
      '"expo-router": "~57.0.31"',
    ]) {
      expect(workflow).toContain(version);
    }
  });

  it("applies only non-forced security updates and verifies the runtime audit", () => {
    expect(workflow).toContain("npm audit fix --ignore-scripts --no-fund || npm audit --audit-level=high");
    expect(workflow).toContain("npm audit --audit-level=high");
    expect(workflow).not.toContain("npm audit fix --force");
    expect(workflow).toContain('pkg.overrides.deepmerge = "$deepmerge";');
    expect(workflow).toContain('pkg.devDependencies.vitest = "^5.1.0";');
    expect(workflow).toContain("npm audit --audit-level=high");
  });

  it("keeps expo-modules-core transitive and verifies the lockfile before reproducible install", () => {
    expect(workflow).toContain("expo-modules-core must remain a transitive Expo dependency");
    const lockRefresh = workflow.indexOf("npm install --package-lock-only");
    const auditFix = workflow.indexOf("npm audit fix --ignore-scripts --no-fund");
    const verify = workflow.indexOf("Verify generated SDK 57 manifest and lockfile");
    const reproducibleInstall = workflow.indexOf("Verify reproducible installation");
    expect([lockRefresh, auditFix, verify, reproducibleInstall].every(index => index >= 0)).toBe(true);
    expect(lockRefresh).toBeLessThan(auditFix);
    expect(auditFix).toBeLessThan(verify);
    expect(verify).toBeLessThan(reproducibleInstall);
  });

  it("runs Expo Doctor, typecheck, tests and runtime audit before artifact publication", () => {
    const expoDoctor = workflow.indexOf("node node_modules/expo-doctor/bin/expo-doctor.js");
    const typecheck = workflow.indexOf("npm run typecheck");
    const tests = workflow.indexOf("npm test -- --passWithNoTests");
    const audit = workflow.indexOf("npm audit --audit-level=high");
    const artifact = workflow.indexOf("uses: actions/upload-artifact@cf430e030ddbb5b0abf93d22962f4752f3646cd9");
    expect([expoDoctor, typecheck, tests, audit, artifact].every(index => index >= 0)).toBe(true);
    expect(expoDoctor).toBeLessThan(typecheck);
    expect(typecheck).toBeLessThan(tests);
    expect(tests).toBeLessThan(audit);
    expect(audit).toBeLessThan(artifact);
  });

  it("keeps the workflow read-only and publishes checksum-verified manifest files", () => {
    expect(workflow).toMatch(/^permissions:\s*\n\s+contents:\s+read\s*$/m);
    expect(workflow).toContain("persist-credentials: false");
    expect(workflow).toContain("sha256sum package.json package-lock.json > SHA256SUMS");
    expect(workflow).toContain("if-no-files-found: error");
    expect(workflow).not.toContain("contents: write");
    expect(workflow).not.toContain("git push");
    expect(workflow).not.toContain("git commit");
  });
});
