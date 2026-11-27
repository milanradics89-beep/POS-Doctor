import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../../app/_layout.tsx', import.meta.url), 'utf8');

describe('cross-platform safe-area handling', () => {
  it('applies all native safe-area insets to the scrollable Home viewport', () => {
    expect(home).toContain("import { useSafeAreaInsets } from 'react-native-safe-area-context';");
    expect(home).toContain('const insets = useSafeAreaInsets();');
    expect(home).toContain('paddingTop: insets.top');
    expect(home).toContain('paddingRight: insets.right');
    expect(home).toContain('paddingBottom: insets.bottom');
    expect(home).toContain('paddingLeft: insets.left');
    expect(home).not.toMatch(/import\s*\{[^}]*\bSafeAreaView\b[^}]*\}\s*from\s*['"]react-native['"]/);
    expect(home).toContain('<ScrollView contentContainerStyle={s.page}>');
  });

  it('uses the cross-platform safe-area component for the global error fallback', () => {
    expect(layout).toContain("import { SafeAreaView } from 'react-native-safe-area-context';");
    expect(layout).not.toMatch(/import\s*\{[^}]*\bSafeAreaView\b[^}]*\}\s*from\s*['"]react-native['"]/);
  });
});
