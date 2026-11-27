import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// Expo aliases React Native to this renderer on web. Render the real card
// so an absent renderer or a mismatch between visible and spoken prices fails.
vi.mock('react-native', () => import('react-native-web'));
import { ProductCard } from '../src/ui/components';

describe('product prices in Expo web output', () => {
  it('declares both runtime renderers for production-only installs', () => {
    const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
    for (const name of ['react-dom', 'react-native-web']) {
      expect(manifest.dependencies[name]).toEqual(expect.any(String));
    }
  });

  it('keeps the price but omits the shopping link when details are unavailable', () => {
    const html = renderToStaticMarkup(React.createElement(ProductCard, {
      title: 'Long linen lampshade with an adjustable reading arm',
      category: 'Lighting', source: 'Studio Example', price: 0, currency: 'HUF',
    }));
    expect(html).toContain('>0 Ft</');
    expect(html).not.toContain('role="link"');
    expect(html).not.toContain('View product');
  });

  it.each([[99, 'EUR', '99 EUR'], [0, 'HUF', '0 Ft'], [undefined, '', 'Az ár nem érhető el']])(
    'renders and announces the source price %s %s', (price, currency, expected) => {
      const html = renderToStaticMarkup(React.createElement(ProductCard, {
        title: 'Lamp', category: 'Lighting', source: 'Retailer', price, currency,
        onPress() {},
      }));
      expect(html).toContain('>' + expected + '</');
      expect(html).toMatch(new RegExp('aria-label="[^"]*' + expected));
    },
  );
});
