import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as ts from 'typescript';

const screenPaths = ['../app/index.tsx', '../app/_layout.tsx'] as const;

function pressableAttributes(relativePath: string) {
  const source = readFileSync(new URL(relativePath, import.meta.url), 'utf8');
  const file = ts.createSourceFile(relativePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const results: Map<string, ts.JsxAttribute> [] = [];

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

describe('USEIT screen accessibility semantics', () => {
  it('gives every actionable Pressable a role, accessible name, and hint', () => {
    let total = 0;

    for (const path of screenPaths) {
      const pressables = pressableAttributes(path);
      total += pressables.length;

      for (const attributes of pressables) {
        expect(attributes.has('onPress'), path).toBe(true);
        expect(attributes.get('accessibilityRole')?.initializer, path).toBeDefined();
        expect(attributes.get('accessibilityLabel')?.initializer, path).toBeDefined();
        expect(attributes.get('accessibilityHint')?.initializer, path).toBeDefined();

        const role = attributes.get('accessibilityRole')?.initializer;
        expect(role && ts.isStringLiteral(role) ? role.text : '').toMatch(/^(button|link)$/);
      }
    }

    expect(total).toBeGreaterThan(0);
  });
});
