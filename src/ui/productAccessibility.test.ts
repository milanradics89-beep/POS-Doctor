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

    expect(label).toContain('Open product page for Trail Runner');
    expect(label).toContain('Category: Shoes');
    expect(label).toContain('Source: Example Store');
    expect(label).toContain(`Price: ${price.toLocaleString('hu-HU')} Ft`);
  });

  it('distinguishes zero, foreign currency and absent pricing', () => {
    expect(formatProductPrice(0, 'HUF')).toBe('0 Ft');
    expect(formatProductPrice(99, 'EUR')).toBe('99 EUR');
    expect(formatProductPrice(99, '')).toBe('Price unavailable');
    expect(formatProductPrice(undefined)).toBe('Price unavailable');
  });

  it('announces unavailable pricing without inventing a value', () => {
    const label = productCardAccessibilityLabel({
      title: 'Desk Lamp',
      category: 'Lighting',
      source: 'Example Store',
      actionable: true,
    });

    expect(label).toContain('Desk Lamp');
    expect(label).toContain('Category: Lighting');
    expect(label).toContain('Source: Example Store');
    expect(label).toContain('Price unavailable');
  });

  it('keeps metadata available when product details are not actionable', () => {
    const label = productCardAccessibilityLabel({
      title: 'Unavailable Item',
      category: 'Home',
      source: 'Example Store',
      price: 5000,
      actionable: false,
    });

    expect(label).toContain('Unavailable Item product details unavailable');
    expect(label).toContain('Category: Home');
    expect(label).toContain('Source: Example Store');
    expect(label).toContain('Price:');
    expect(label).not.toContain('Open product page');
  });
});
