import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(
  new URL('../.github/workflows/expo-sdk57-lock-refresh.yml', import.meta.url),
  'utf8',
);

describe('Expo SDK 57 lock refresh workflow', () => {
  it('writes a real JSON newline instead of a literal backslash-n suffix', () => {
    const writeLine = workflow
      .split(/\r?\n/)
      .find(line => line.includes("fs.writeFileSync('package.json'"));
    expect(writeLine).toMatch(/JSON\.stringify\(pkg, null, 2\) \+ '\\n'\);/);
    expect(writeLine).not.toMatch(/JSON\.stringify\(pkg, null, 2\) \+ '\\\\n'\););
  });

  it('regenerates manifests from the current checkout instead of a stale run artifact', () => {
    expect(workflow).toContain('npm install --package-lock-only --ignore-scripts --no-audit --no-fund');
    expect(workflow).not.toContain('gh run download 42121369533');
  });

  it('aligns the four Expo Doctor SDK 57 patch requirements exactly', () => {
    expect(workflow).toContain('expo: "~57.0.32"');
    expect(workflow).toContain('"expo-constants": "~57.0.23"');
    expect(workflow).toContain('"expo-image-picker": "~57.0.21"');
    expect(workflow).toContain('"expo-router": "~57.0.30"');
  });

  it('keeps expo-modules-core transitive to avoid the incompatible Worklets peer graph', () => {
    expect(workflow).not.toContain('npx expo install expo-modules-core');
    expect(workflow).toContain('expo-modules-core must remain a transitive Expo dependency');
  });

  it('runs reproducible install, Expo Doctor, typecheck and unit tests before any push', () => {
    expect(workflow).toContain('npm ci --ignore-scripts --no-audit --no-fund');
    expect(workflow).toContain('npx expo-doctor');
    expect(workflow).toContain('npm run typecheck');
    expect(workflow).toContain('npm test -- --passWithNoTests');
    expect(workflow).toContain('if [[ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]]');
    expect(workflow).toContain('git push origin "HEAD:refs/heads/$BRANCH"');
    expect(workflow).not.toContain('git push --force');
  });
});
