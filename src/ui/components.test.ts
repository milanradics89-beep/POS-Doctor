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
    expect(source.match(/accessibilityElementsHidden\\s+importantForAccessibility="no-hide-descendants"/g)).toHaveLength(3);
  });

  it('does not announce unavailable product details as an actionable link', () => {
    expect(source).toContain("accessibilityRole={onPress ? 'link' : 'text'}");
    expect(source).toContain("accessibilityLabel={onPress ? `Open product page for ${title}` : `${title} product details unavailable`}");
    expect(source).toContain("accessibilityHint={onPress ? 'Opens the product page in your browser.' : 'Product details are not available for this item.'}");
  });
});