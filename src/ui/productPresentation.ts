export type ProductPriceInput = {
  price?: number | null;
  priceHuf?: number | null;
  currency?: string | null;
};

export function productPriceDisplay(candidate: ProductPriceInput): { price: number | undefined; currency: string } {
  const currency = candidate.currency?.toUpperCase() ?? "";
  const displayCurrency = currency || (candidate.priceHuf != null ? "HUF" : "");
  const price = displayCurrency === "HUF"
    ? candidate.priceHuf ?? candidate.price ?? undefined
    : candidate.price ?? undefined;
  return { price, currency: displayCurrency };
}
