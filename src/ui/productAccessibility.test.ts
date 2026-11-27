import { describe, expect, it } from 'vitest';
import { formatProductPrice, productCardAccessibilityLabel } from './productAccessibility';

describe('ProductCard accessible name', () => {
  it('announces the title, category, source and visible price for actionable products', () => {
    const price = 12990;
    const label = productCardAccessibilityLabel({
      title: 'Trail Runner',
      category: 'Shoes',
      source: 'Example Store',
      price,
      actionable: true,
    });

    expect(label).toContain('Termékoldal megnyitása: Trail Runner');
    expect(label).toContain('Kategória: Shoes');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain(`Ár: ${price.toLocaleString('hu-HU')} Ft`);
  });

  it('distinguishes zero, foreign currency and absent pricing', () => {
    expect(formatProductPrice(0, 'HUF')).toBe('0 Ft');
    expect(formatProductPrice(99, 'EUR')).toBe('99 EUR');
    expect(formatProductPrice(99, '')).toBe('Az ár nem érhető el');
    expect(formatProductPrice(undefined)).toBe('Az ár nem érhető el');
  });

  it('announces unavailable pricing without inventing a value', () => {
    const label = productCardAccessibilityLabel({
      title: 'Desk Lamp',
      category: 'Lighting',
      source: 'Example Store',
      actionable: true,
    });

    expect(label).toContain('Desk Lamp');
    expect(label).toContain('Kategória: Lighting');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain('Az ár nem érhető el');
  });

  it('keeps metadata available when product details are not actionable', () => {
    const label = productCardAccessibilityLabel({
      title: 'Unavailable Item',
      category: 'Home',
      source: 'Example Store',
      price: 5000,
      actionable: false,
    });

    expect(label).toContain('A(z) Unavailable Item termék részletei nem érhetők el.');
    expect(label).toContain('Kategória: Home');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain('Ár:');
    expect(label).not.toContain('Termékoldal megnyitása');
  });
});
