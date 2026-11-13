import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readJson = (path) => JSON.parse(
  readFileSync(new URL(path, import.meta.url), "utf8"),
);

const app = readJson("../app.json").expo;
const modulePackage = readJson("../modules/useit-app-attest/package.json");
const nativeModule = readJson("../modules/useit-app-attest/expo-module.config.json");
const runtimeEntry = readFileSync(
  new URL("../modules/useit-app-attest/index.ts", import.meta.url),
  "utf8",
);
const pluginEntry = readFileSync(
  new URL("../modules/useit-app-attest/app.plugin.js", import.meta.url),
  "utf8",
);
const workflow = readFileSync(
  new URL("../.github/workflows/validate.yml", import.meta.url),
  "utf8",
);
const iosJob = workflow.split("\n  ios:\n")[1]?.split("\n  backend:\n")[0] ?? "";

describe("App Attest Expo module registration", () => {
  it("loads the JavaScript config plugin, never the runtime TypeScript package root", () => {
    expect(app.plugins).toContain("./modules/useit-app-attest/app.plugin.js");
    expect(app.plugins).not.toContain("./modules/useit-app-attest");
    expect(modulePackage.main).toBe("index.ts");
    expect(pluginEntry).toContain("require('@expo/config-plugins')");
    expect(pluginEntry).not.toContain("expo-modules-core");
    expect(runtimeEntry).toContain("requireNativeModule");
    expect(runtimeEntry).toContain("expo-modules-core");
  });

  it("keeps native iOS autolinking independent from config-plugin loading", () => {
    expect(nativeModule.platforms).toContain("ios");
    expect(nativeModule.ios.modules).toContain("UseitAppAttestModule");
  });

  it("runs iOS prebuild on Node 22 in the validation workflow", () => {
    expect(iosJob).toMatch(/node-version:\s*22/);
    expect(iosJob).toContain("npx expo prebuild --platform ios --no-install");
  });
});
