import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

// Expo aliases React Native to this renderer on web. Render the real card
// so an absent renderer or a mismatch between visible and spoken prices fails.
vi.mock('react-native', () => import('react-native-web'));
import { ProductCard } from '../src/ui/components';

describe('product prices in Expo web output', () => {
  it.each([[99, 'EUR', '99 EUR'], [0, 'HUF', '0 Ft'], [undefined, '', 'Price unavailable']])(
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
