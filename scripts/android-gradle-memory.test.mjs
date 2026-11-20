import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const workflow = readFileSync(new URL('../.github/workflows/validate.yml', import.meta.url), 'utf8');
const start = workflow.indexOf('      - name: Validate native Android release build');
const end = workflow.indexOf('      - name: Enable KVM for Android emulator', start);
const androidReleaseStep = start >= 0 && end > start ? workflow.slice(start, end) : '';

describe('Android release build memory guard', () => {
  it('writes bounded Gradle heap and worker settings before D8/R8 runs', () => {
    expect(androidReleaseStep).not.toBe('');
    expect(androidReleaseStep).toContain('Path("android/gradle.properties")');
    expect(androidReleaseStep).toContain('"org.gradle.jvmargs": "-Xmx4g -XX:MaxMetaspaceSize=1g -Dfile.encoding=UTF-8"');
    expect(androidReleaseStep).toContain('"org.gradle.workers.max": "2"');
    expect(androidReleaseStep).toContain('"org.gradle.parallel": "false"');
    expect(androidReleaseStep.indexOf('properties_file.write_text')).toBeLessThan(
      androidReleaseStep.indexOf('./gradlew assembleRelease'),
    );
    expect(androidReleaseStep).toContain('./gradlew assembleRelease --no-daemon --max-workers=2');
  });

  it('does not disable R8, minification, or release shrinking to bypass the failure', () => {
    expect(androidReleaseStep).not.toMatch(/minifyEnabled\s+false|android\.enableR8\s*=\s*false|shrinkResources\s+false/i);
  });
});
