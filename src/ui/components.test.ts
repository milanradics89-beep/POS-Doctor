import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as ts from 'typescript';

const source = readFileSync(new URL('./components.tsx', import.meta.url), 'utf8');
const file = ts.createSourceFile('components.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

function collectPressables() {
  const results: Map<string, ts.JsxAttribute>[] = [];
  function visit(node: ts.Node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))
      && ts.isIdentifier(node.tagName)
      && node.tagName.text === 'Pressable'
    ) {
      const attributes = new Map<string, ts.JsxAttribute>();
      for (const property of node.attributes.properties) {
        if (ts.isJsxAttribute(property) && ts.isIdentifier(property.name)) {
          attributes.set(property.name.text, property);
        }
      }
      results.push(attributes);
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  return results;
}

describe('USEIT shared component accessibility', () => {
  it('gives every actionable Pressable a role, accessible name, and hint', () => {
    const pressables = collectPressables();
    expect(pressables).toHaveLength(2);
    for (const attributes of pressables) {
      expect(attributes.has('onPress')).toBe(true);
      expect(attributes.get('accessibilityRole')?.initializer).toBeDefined();
      expect(attributes.get('accessibilityLabel')?.initializer).toBeDefined();
      expect(attributes.get('accessibilityHint')?.initializer).toBeDefined();
    }
  });
  it('hides decorative marks from both VoiceOver and TalkBack', () => {
    expect(source.match(/accessibilityElementsHidden\s+importantForAccessibility="no-hide-descendants"/g)).toHaveLength(4);
  });

  it('uses one shared uncropped image owner for the source photo and generated comparison', () => {
    expect(source).toContain('export function PhotoFrame');
    expect(source).toContain('resizeMode="contain"');
    expect(source).toContain('accessibilityLabel={label}');
    expect(source).toContain('source={{ uri }}');
    const home = readFileSync(new URL('../../app/index.tsx', import.meta.url), 'utf8');
    const result = readFileSync(new URL('./PhotoResult.tsx', import.meta.url), 'utf8');
    expect(home).toContain('PhotoFrame uri={photo}');
    expect(result).toContain('<PhotoFrame');
  });

  it('does not automatically fetch untrusted remote product image URLs', () => {
    expect(source).not.toContain('<Image source={{ uri: imageUrl }}');
    expect(source).toContain('<View style={styles.productMark}');
  });
  it('does not announce unavailable product details as an actionable link', () => {
    expect(source).toContain("accessibilityRole={onPress ? 'link' : 'text'}");
    expect(source).toContain("import { formatProductPrice, productCardAccessibilityLabel } from './productAccessibility';");
    expect(source).toContain("import { hu } from '../i18n/hu';");
    expect(source).toContain('accessibilityLabel={productCardAccessibilityLabel({ title, category, source, price, currency, actionable: Boolean(onPress) })}');
    expect(source).toContain('accessibilityHint={onPress ? hu.common.productHint : hu.common.productUnavailableHint}');
  });
  it('supports loading, empty, error, offline and permission-denied states with accessible announcements', () => {
    expect(source).toContain("kind: 'loading' | 'empty' | 'error' | 'offline' | 'permission-denied' | 'success'");
    expect(source).toContain("accessibilityRole={kind === 'loading' ? 'progressbar' : isAlert ? 'alert' : 'summary'}");
    expect(source).toContain("accessibilityLiveRegion={kind === 'loading' ? 'polite' : isAlert ? 'assertive' : 'none'}");
    expect(source).toContain('<ActivityIndicator size="large" color={accent} />');
    expect(source).toContain("kind === 'offline' || kind === 'permission-denied'");
  });

  it('announces dynamic state panels to VoiceOver without grouping recovery actions', () => {
    expect(source).toContain("import { AccessibilityInfo, ActivityIndicator, Animated, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';");
    expect(source).toContain("if (Platform.OS === 'ios')");
    expect(source).toContain("AccessibilityInfo.announceForAccessibility(`${title}. ${description}`)");
    expect(source).toContain('}, [kind, title, description]);');
    expect(source).toContain('accessibilityRole="button"');
    expect(source).toContain('accessibilityLabel={actionLabel}');
    expect(source).not.toContain('accessible={true}');
  });

  it('keeps recovery action text readable at a minimum of 12sp', () => {
    expect(source).toContain('stateActionText: { color: theme.colors.surface, fontSize: 12, lineHeight: 16');
  });

  it('respects the system reduced-motion preference and live preference changes', () => {
    expect(source).toContain("useState<boolean | null>(null)");
    expect(source).toContain("AccessibilityInfo.isReduceMotionEnabled()");
    expect(source).toContain("AccessibilityInfo.addEventListener('reduceMotionChanged'");
    expect(source).toContain('if (reduceMotion === null) return;');
    expect(source).toContain('if (reduceMotion) {');
    expect(source).toContain('opacity.setValue(1);');
    expect(source).toContain('translateY.setValue(0);');
    expect(source).toContain('return () => animation.stop();');
  });

});
