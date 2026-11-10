import { describe, expect, it } from 'vitest';
import { isSafeExternalHttpUrl } from './externalLink';

describe('isSafeExternalHttpUrl', () => {
  it.each([
    'https://shop.example.test/item',
    'http://shop.example.test/item',
    'https://shop.example.test:443/item',
    'http://shop.example.test:80/item',
    'https://xn--bcher-kva.example/item',
  ])('accepts a public HTTP(S) DNS URL: %s', url => {
    expect(isSafeExternalHttpUrl(url)).toBe(true);
  });

  it.each([
    'javascript:alert(1)',
    'file:///etc/passwd',
    '//shop.example.test/item',
    '/relative/item',
    'https://user:secret@shop.example.test/item',
    'https://shop.example.test:8443/item',
    'http://localhost/item',
    'http://printer.local/item',
    'http://service.internal/item',
    'http://192.168.1.10/item',
    'http://127.1/item',
    'http://[::1]/item',
    'http://intranet/item',
    ' https://shop.example.test/item',
    'https://shop.example.test\\@evil.example/item',
    'https://shop.example.test/item\n',
  ])('rejects an unsafe external URL: %s', url => {
    expect(isSafeExternalHttpUrl(url)).toBe(false);
  });
});
