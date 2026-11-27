import { hu } from '../i18n/hu';

export type ProductAccessibilityDetails = {
  title: string;
  category: string;
  source: string;
  price?: number;
  currency?: string;
  actionable: boolean;
};

export function formatProductPrice(price?: number, currency = 'HUF'): string {
  const code = currency.trim().toUpperCase();
  if (price === undefined || !Number.isFinite(price) || !/^[A-Z]{3}$/.test(code)) return hu.product.unavailablePrice;
  return code === 'HUF' ? `${price.toLocaleString('hu-HU')} Ft` : `${price.toLocaleString('hu-HU')} ${code}`;
}

export function productCardAccessibilityLabel({
  title,
  category,
  source,
  price,
  currency,
  actionable,
}: ProductAccessibilityDetails): string {
  const visibleDetails = [
    `${hu.product.category}: ${category}`,
    `${hu.product.source}: ${source}`,
  ];

  const formatted = formatProductPrice(price, currency);
  visibleDetails.push(formatted === hu.product.unavailablePrice ? formatted : `${hu.product.price}: ${formatted}`);

  const details = visibleDetails.join('. ');
  return actionable
    ? `${hu.product.openPage}: ${title}. ${details}.`
    : `${hu.product.detailsUnavailable.replace('{title}', title)} ${details}.`;
}
