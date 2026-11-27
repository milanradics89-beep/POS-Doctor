import type { UseitShopping } from '../core/intelligence/useitAnalyzeContract';

export function productResultsState(count: number, shopping: UseitShopping, hasNeed: boolean) {
  if (count > 0) return 'matches';
  if (shopping) {
    // When every candidate resolution fails, preserve the retry path even if
    // the provider identifies individual failures with a product URL.
    return shopping.errors?.length ? 'unavailable' : 'empty';
  }
  return hasNeed ? 'unavailable' : 'needs-context';
}
