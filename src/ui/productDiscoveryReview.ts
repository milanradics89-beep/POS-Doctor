export const MAX_REVIEWED_PRODUCT_QUERY_LENGTH = 200;

export function normalizeReviewedProductSearchQuery(value: string): string {
  return value.trim().replace(/\s+/g, " ").slice(0, MAX_REVIEWED_PRODUCT_QUERY_LENGTH);
}

export function canDiscoverReviewedProductQuery(value: string): boolean {
  return normalizeReviewedProductSearchQuery(value).length >= 2;
}

export function isCurrentProductDiscoveryResult(query: string, submittedQuery: string | null): boolean {
  return submittedQuery !== null
    && normalizeReviewedProductSearchQuery(query) === submittedQuery;
}
