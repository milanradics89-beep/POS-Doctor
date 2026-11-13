import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));

describe("App Attest Expo module registration", () => {
  it("does not load the runtime TypeScript entrypoint as an Expo config plugin", () => {
    const appConfig = readJson("app.json");
    expect(appConfig.expo.plugins).not.toContain("./modules/useit-app-attest");
  });

  it("keeps the native iOS module registered for Expo autolinking", () => {
    const moduleConfig = readJson("modules/useit-app-attest/expo-module.config.json");
    expect(moduleConfig.platforms).toContain("ios");
    expect(moduleConfig.ios.modules).toContain("UseitAppAttestModule");
  });

  it("keeps the JavaScript runtime entrypoint separate from config-plugin registration", () => {
    const modulePackage = readJson("modules/useit-app-attest/package.json");
    expect(modulePackage.main).toBe("index.ts");
  });
});
