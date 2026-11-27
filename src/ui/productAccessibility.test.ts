import { describe, expect, it } from 'vitest';
import { formatProductPrice, localizeProductCategory, productCardAccessibilityLabel } from './productAccessibility';

describe('ProductCard accessible name', () => {
  it('announces the title, category, source and visible price for actionable products', () => {
    const price = 12990;
    const label = productCardAccessibilityLabel({
      title: 'Trail Runner',
      category: 'Cipők',
      source: 'Example Store',
      price,
      actionable: true,
    });

    expect(label).toContain('Trail Runner termékoldal megnyitása');
    expect(label).toContain('Kategória: Cipők');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain(`Ár: ${price.toLocaleString('hu-HU')} Ft`);
  });

  it('distinguishes zero, foreign currency and absent pricing', () => {
    expect(formatProductPrice(0, 'HUF')).toBe('0 Ft');
    expect(formatProductPrice(99, 'EUR')).toBe('99 EUR');
    expect(formatProductPrice(99, '')).toBe('Ár nem érhető el');
    expect(formatProductPrice(undefined)).toBe('Ár nem érhető el');
  });

  it('announces unavailable pricing without inventing a value', () => {
    const label = productCardAccessibilityLabel({
      title: 'Desk Lamp',
      category: 'Világítás',
      source: 'Example Store',
      actionable: true,
    });

    expect(label).toContain('Desk Lamp');
    expect(label).toContain('Kategória: Világítás');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain('Ár nem érhető el');
  });

  it('keeps metadata available when product details are not actionable', () => {
    const label = productCardAccessibilityLabel({
      title: 'Unavailable Item',
      category: 'Otthon',
      source: 'Example Store',
      price: 5000,
      actionable: false,
    });

    expect(label).toContain('Unavailable Item: a termék adatai nem érhetők el.');
    expect(label).toContain('Kategória: Otthon');
    expect(label).toContain('Forrás: Example Store');
    expect(label).toContain('Ár:');
    expect(label).not.toContain('termékoldal megnyitása');
  });
});


describe('Hungarian product categories', () => {
  it.each([
    ['Shoes', 'Cipők'],
    ['sofa', 'Kanapé'],
    ['coffee_table', 'Dohányzóasztal'],
    ['ingredient', 'Hozzávalók'],
    ['top', 'Felsők'],
    ['bottom', 'Nadrágok és szoknyák'],
    ['accessory', 'Kiegészítők'],
    ['repair_part', 'Pótalkatrészek'],
    ['replacement', 'Cserelehetőségek'],
    ['Lighting', 'Világítás'],
    ['Home & Kitchen', 'Otthon és konyha'],
    ['Kerti eszközök', 'Kerti eszközök'],
    ['Otthon', 'Otthon'],
    ['Kert', 'Kert'],
    ['Iroda', 'Iroda'],
    ['Sport', 'Sport'],
    ['Unmapped provider category', 'Egyéb'],
  ])('localizes %s as %s', (input, expected) => {
    expect(localizeProductCategory(input)).toBe(expected);
  });
});
