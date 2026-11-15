export type ProductAccessibilityDetails = {
  title: string;
  category: string;
  source: string;
  price?: number;
  actionable: boolean;
};

export function productCardAccessibilityLabel({
  title,
  category,
  source,
  price,
  actionable,
}: ProductAccessibilityDetails): string {
  const visibleDetails = [
    `Category: ${category}`,
    `Source: ${source}`,
  ];

  if (price !== undefined) {
    visibleDetails.push(`Price: ${price.toLocaleString('hu-HU')} Ft`);
  }

  const details = visibleDetails.join('. ');
  return actionable
    ? `Open product page for ${title}. ${details}.`
    : `${title} product details unavailable. ${details}.`;
}
