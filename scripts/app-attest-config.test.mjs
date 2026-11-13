import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

describe("App Attest config/runtime entrypoint separation", () => {
  it("loads the JavaScript config plugin, not the TypeScript runtime entrypoint", () => {
    const app = JSON.parse(read("app.json"));
    expect(app.expo.plugins).toContain("./modules/useit-app-attest/app.plugin.js");
    expect(app.expo.plugins).not.toContain("./modules/useit-app-attest");
  });

  it("keeps the native iOS module registered independently for autolinking", () => {
    const moduleConfig = JSON.parse(read("modules/useit-app-attest/expo-module.config.json"));
    expect(moduleConfig.platforms).toContain("ios");
    expect(moduleConfig.ios.modules).toContain("UseitAppAttestModule");
  });

  it("retains the TypeScript entrypoint only for runtime imports", () => {
    const modulePackage = JSON.parse(read("modules/useit-app-attest/package.json"));
    const plugin = read("modules/useit-app-attest/app.plugin.js");
    expect(modulePackage.main).toBe("index.ts");
    expect(plugin).toContain("withEntitlementsPlist");
    expect(plugin).not.toContain("expo-modules-core/src/index.ts");
  });
});
