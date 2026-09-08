import type { ProductCandidate, ProductProvider, ShoppingDecision } from '../productCandidateCollector';
import type { ProductCatalogItem, ProductCatalogProvider, ProductCatalogQuery } from './productCatalog';

function mapAvailability(value: ProductCatalogItem['available']): ProductCandidate['availability'] {
  if (value === true) return 'in_stock';
  if (value === false) return 'out_of_stock';
  return 'unknown';
}

function toAttributes(item: ProductCatalogItem): ProductCandidate['attributes'] {
  return { ...(item.attributes ?? {}) };
}

function toCandidate(item: ProductCatalogItem): ProductCandidate | null {
  if (!item.id || !item.title || !item.retailer || !item.productUrl) return null;

  const attributes = toAttributes(item);
  const styleTags = Array.isArray(attributes.styleTags)
    ? attributes.styleTags.filter((value): value is string => typeof value === 'string')
    : typeof attributes.style === 'string'
      ? [attributes.style]
      : [];
  const colorTags = Array.isArray(attributes.colorTags)
    ? attributes.colorTags.filter((value): value is string => typeof value === 'string')
    : typeof attributes.color === 'string'
      ? [attributes.color]
      : [];

  const dimensions = {
    widthCm: typeof attributes.widthCm === 'number' ? attributes.widthCm : undefined,
    heightCm: typeof attributes.heightCm === 'number' ? attributes.heightCm : undefined,
    depthCm: typeof attributes.depthCm === 'number' ? attributes.depthCm : undefined,
  };
  const hasDimensions = Object.values(dimensions).some(value => value !== undefined);

  const uncertainty = item.currency && item.currency !== 'HUF' && item.price !== undefined
    ? [`price_currency:${item.currency}`]
    : [];

  return {
    id: item.id,
    title: item.title,
    url: item.productUrl,
    ...(item.currency === 'HUF' && typeof item.price === 'number' ? { priceHuf: item.price } : {}),
    category: item.category,
    attributes,
    availability: mapAvailability(item.available),
    source: item.retailer,
    ...(item.imageUrl ? { imageUrl: item.imageUrl } : {}),
    ...(styleTags.length ? { styleTags } : {}),
    ...(colorTags.length ? { colorTags } : {}),
    ...(hasDimensions ? { dimensions } : {}),
    ...(uncertainty.length ? { uncertainty } : {}),
  } as ProductCandidate;
}

function buildCatalogQuery(decision: ShoppingDecision): ProductCatalogQuery {
  return {
    query: decision.query,
    category: decision.categories[0],
    budgetMax: decision.budgetHuf,
    currency: 'HUF',
    locale: 'hu-HU',
  };
}

/**
 * Adapts the Phase 4 catalog boundary into the existing Phase 3 ProductProvider.
 * It does not replace or duplicate candidate ranking or solution intelligence.
 */
export class ProductCatalogCandidateProvider implements ProductProvider {
  readonly id: string;

  constructor(private readonly catalog: ProductCatalogProvider, id = 'phase4-catalog') {
    this.id = id;
  }

  async search(decision: ShoppingDecision): Promise<ProductCandidate[]> {
    const items = await this.catalog.search(buildCatalogQuery(decision));
    return items.map(toCandidate).filter((candidate): candidate is ProductCandidate => candidate !== null);
  }
}
