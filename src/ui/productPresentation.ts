export type ProductPriceInput = {
  price?: number | null;
  priceHuf?: number | null;
  currency?: string | null;
};

export function productPriceDisplay(candidate: ProductPriceInput): { price: number | undefined; currency: string } {
  const currency = candidate.currency?.trim().toUpperCase() ?? "";
  // Prefer a source-currency amount only when that amount is actually present.
  // Otherwise retain the available HUF fallback, including a valid zero value.
  if (candidate.price != null && currency) {
    return { price: candidate.price, currency };
  }
  if (candidate.priceHuf != null) {
    return { price: candidate.priceHuf, currency: "HUF" };
  }
  return { price: candidate.price ?? undefined, currency };
}
