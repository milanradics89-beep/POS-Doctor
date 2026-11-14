import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as ts from 'typescript';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

function collectTsxFiles(directory: string): string[] {
  return readdirSync(directory)
    .flatMap((name) => {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) return collectTsxFiles(path);
      return path.endsWith('.tsx') ? [path] : [];
    });
}

function unwrapExpression(expression: ts.Expression): ts.Expression {
  let current = expression;
  while (
    ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isTypeAssertionExpression(current)
    || ts.isNonNullExpression(current)
    || ts.isSatisfiesExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function hasAccessibleExpression(expression: ts.Expression): boolean {
  const value = unwrapExpression(expression);

  if (ts.isStringLiteralLike(value) || ts.isNoSubstitutionTemplateLiteral(value)) {
    return value.text.trim().length > 0;
  }

  if (ts.isTemplateExpression(value)) {
    return value.head.text.trim().length > 0
      || value.templateSpans.some((span) =>
        span.literal.text.trim().length > 0 || hasAccessibleExpression(span.expression),
      );
  }

  if (ts.isConditionalExpression(value)) {
    return hasAccessibleExpression(value.whenTrue)
      && hasAccessibleExpression(value.whenFalse);
  }

  if (ts.isBinaryExpression(value)) {
    if (value.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      return hasAccessibleExpression(value.left) || hasAccessibleExpression(value.right);
    }
    if (value.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      return hasAccessibleExpression(value.left) && hasAccessibleExpression(value.right);
    }
    if (value.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      return hasAccessibleExpression(value.left) || hasAccessibleExpression(value.right);
    }
  }

  if (
    ts.isIdentifier(value)
    || ts.isPropertyAccessExpression(value)
    || ts.isElementAccessExpression(value)
    || ts.isCallExpression(value)
  ) {
    return true;
  }

  return false;
}

function hasAccessibleValue(attribute: ts.JsxAttribute | undefined): boolean {
  const initializer = attribute?.initializer;
  if (!initializer) return false;

  if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
    return initializer.text.trim().length > 0;
  }

  return ts.isJsxExpression(initializer)
    && initializer.expression !== undefined
    && hasAccessibleExpression(initializer.expression);
}

function parseExpression(expression: string): ts.Expression {
  const source = ts.createSourceFile(
    'accessibility-expression.tsx',
    `const label = (${expression});`,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const statement = source.statements[0];
  if (!statement || !ts.isVariableStatement(statement)) {
    throw new Error('Could not parse accessibility expression fixture.');
  }
  const initializer = statement.declarationList.declarations[0]?.initializer;
  if (!initializer) throw new Error('Accessibility expression fixture has no initializer.');
  return initializer;
}

function findPressables(path: string) {
  const source = readFileSync(path, 'utf8');
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const found: Array<{ line: number; attributes: Map<string, ts.JsxAttribute> }> = [];

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
      if (attributes.has('onPress')) {
        found.push({
          line: file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1,
          attributes,
        });
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(file);
  return found;
}

describe('USEIT screen-level accessibility contract', () => {
  it('rejects statically empty expression values instead of accepting any JSX expression', () => {
    expect(hasAccessibleExpression(parseExpression("''"))).toBe(false);
    expect(hasAccessibleExpression(parseExpression("'   '"))).toBe(false);
    expect(hasAccessibleExpression(parseExpression('undefined'))).toBe(false);
    expect(hasAccessibleExpression(parseExpression('null'))).toBe(false);
    expect(hasAccessibleExpression(parseExpression("condition ? 'Retry' : ''"))).toBe(false);
    expect(hasAccessibleExpression(parseExpression("condition ? '' : 'Retry'"))).toBe(false);
  });

  it('accepts non-empty dynamic labels and expressions with a non-empty fallback', () => {
    expect(hasAccessibleExpression(parseExpression('label'))).toBe(true);
    expect(hasAccessibleExpression(parseExpression('`Open ${productTitle} product page`'))).toBe(true);
    expect(hasAccessibleExpression(parseExpression("hint || 'Use the available action.'"))).toBe(true);
    expect(hasAccessibleExpression(parseExpression("hint ?? 'Use the available action.'"))).toBe(true);
  });

  it('gives every actionable Pressable in app screens and shared UI a role, non-empty name, and hint', () => {
    const files = [
      ...collectTsxFiles(resolve(repositoryRoot, 'app')),
      ...collectTsxFiles(resolve(repositoryRoot, 'src/ui')).filter((path) => !path.endsWith('.test.tsx')),
    ];
    const pressables = files.flatMap((path) =>
      findPressables(path).map((item) => ({ path: relative(repositoryRoot, path), ...item })),
    );

    expect(pressables.length, 'the screen audit must inspect at least one actionable Pressable').toBeGreaterThan(0);

    const violations = pressables.flatMap(({ path, line, attributes }) => {
      const missing = [
        !hasAccessibleValue(attributes.get('accessibilityRole')) && 'accessibilityRole',
        !hasAccessibleValue(attributes.get('accessibilityLabel')) && 'accessibilityLabel',
        !hasAccessibleValue(attributes.get('accessibilityHint')) && 'accessibilityHint',
      ].filter(Boolean);
      return missing.length > 0 ? [`${path}:${line} missing ${missing.join(', ')}`] : [];
    });

    expect(violations).toEqual([]);
  });
});
