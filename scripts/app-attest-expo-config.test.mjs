import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const readJson = (path) => JSON.parse(
  readFileSync(new URL(path, import.meta.url), "utf8"),
);

const app = readJson("../app.json").expo;
const nativeModule = readJson("../modules/useit-app-attest/expo-module.config.json");
const runtimeEntry = readFileSync(
  new URL("../modules/useit-app-attest/index.ts", import.meta.url),
  "utf8",
);
const workflow = readFileSync(
  new URL("../.github/workflows/validate.yml", import.meta.url),
  "utf8",
);
const iosJob = workflow.split("\n  ios:\n")[1]?.split("\n  backend:\n")[0] ?? "";

describe("App Attest Expo module registration", () => {
  it("does not load the runtime TypeScript entrypoint as a config plugin", () => {
    expect(app.plugins).toEqual(expect.arrayContaining(["expo-router", "expo-image-picker"]));
    expect(app.plugins).not.toContain("./modules/useit-app-attest");
    expect(app.ios.entitlements[
      "com.apple.developer.devicecheck.appattest-environment"
    ]).toBe("development");
  });

  it("keeps native iOS autolinking independent from config plugins", () => {
    expect(nativeModule.platforms).toContain("ios");
    expect(nativeModule.ios.modules).toContain("UseitAppAttestModule");
    expect(runtimeEntry).toContain("requireNativeModule");
    expect(runtimeEntry).toContain("expo-modules-core");
  });

  it("runs iOS prebuild on Node 22 in the validation workflow", () => {
    expect(iosJob).toMatch(/node-version:\s*22/);
    expect(iosJob).toContain("npx expo prebuild --platform ios --no-install");
  });
});
