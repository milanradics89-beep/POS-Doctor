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
  if (price === undefined || !Number.isFinite(price) || !/^[A-Z]{3}$/.test(code)) return 'Price unavailable';
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
    `Category: ${category}`,
    `Source: ${source}`,
  ];

  const formatted = formatProductPrice(price, currency);
  visibleDetails.push(formatted === 'Price unavailable' ? formatted : `Price: ${formatted}`);

  const details = visibleDetails.join('. ');
  return actionable
    ? `Open product page for ${title}. ${details}.`
    : `${title} product details unavailable. ${details}.`;
}
