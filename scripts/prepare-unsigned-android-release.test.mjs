import { describe, expect, it } from 'vitest';
import { prepareUnsignedAndroidRelease } from './prepare-unsigned-android-release.mjs';

const expoGradleFixture = `android {
  signingConfigs {
    debug {
      storeFile file('debug.keystore')
    }
  }
  buildTypes {
    debug {
      signingConfig signingConfigs.debug
    }
    release {
      // Keep braces in comments from affecting block detection: { }
      signingConfig signingConfigs.debug
      minifyEnabled false
      proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
    }
  }
}`;

describe('prepareUnsignedAndroidRelease', () => {
  it('removes only the debug signing assignment from release', () => {
    const result = prepareUnsignedAndroidRelease(expoGradleFixture);
    const buildTypes = result.slice(result.indexOf('buildTypes {'));
    const release = buildTypes.slice(buildTypes.indexOf('release {'));

    expect(release).not.toMatch(/^\s*signingConfig\b/m);
    expect(release).toContain('Intentionally unsigned');
    expect(buildTypes).toContain('debug {\n      signingConfig signingConfigs.debug');
    expect(result).toContain('minifyEnabled false');
    expect(result).toContain('proguardFiles getDefaultProguardFile');
  });

  it('fails closed when the Expo release signing assignment is absent', () => {
    const source = expoGradleFixture.replace(
      '      signingConfig signingConfigs.debug\n      minifyEnabled false',
      '      minifyEnabled false',
    );

    expect(() => prepareUnsignedAndroidRelease(source)).toThrow(
      'Expected exactly one Expo debug signing assignment in release, found 0.',
    );
  });

  it('fails closed when release uses a different signing configuration', () => {
    const source = expoGradleFixture.replace(
      '      signingConfig signingConfigs.debug\n      minifyEnabled false',
      '      signingConfig signingConfigs.release\n      minifyEnabled false',
    );

    expect(() => prepareUnsignedAndroidRelease(source)).toThrow(
      'Expected exactly one Expo debug signing assignment in release, found 0.',
    );
  });

  it('fails closed when the release block contains multiple signing directives', () => {
    const source = expoGradleFixture.replace(
      '      signingConfig signingConfigs.debug\n      minifyEnabled false',
      '      signingConfig signingConfigs.debug\n      signingConfig signingConfigs.release\n      minifyEnabled false',
    );

    expect(() => prepareUnsignedAndroidRelease(source)).toThrow(
      'Unexpected release signing configuration; refusing to rewrite it.',
    );
  });

  it('does not modify the source when the release block cannot be located', () => {
    expect(() => prepareUnsignedAndroidRelease('android { buildTypes { debug {} } }')).toThrow(
      'Android release build type was not found inside buildTypes.',
    );
  });
});
