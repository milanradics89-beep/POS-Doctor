import type { UseitShopping } from '../core/intelligence/useitAnalyzeContract';

export function productResultsState(count: number, shopping: UseitShopping, hasNeed: boolean) {
  if (count > 0) return 'matches';
  if (shopping) {
    const searchFailed = shopping.errors?.some((error) => !error.url);
    return searchFailed ? 'unavailable' : 'empty';
  }
  return hasNeed ? 'unavailable' : 'needs-context';
}
