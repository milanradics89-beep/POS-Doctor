import { hu } from '../i18n/hu';

const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  shoe: 'Cipő',
  shoes: 'Cipők',
  lighting: 'Világítás',
  home: 'Otthon',
  'home & kitchen': 'Otthon és konyha',
  furniture: 'Bútorok',
  kitchen: 'Konyha',
  electronics: 'Elektronika',
  computers: 'Számítástechnika',
  fashion: 'Divat',
  apparel: 'Ruházat',
  clothing: 'Ruházat',
  beauty: 'Szépségápolás',
  sports: 'Sport',
  'sports & outdoors': 'Sport és szabadtér',
  toys: 'Játékok',
  appliances: 'Háztartási gépek',
  garden: 'Kert',
  decor: 'Lakberendezés',
  office: 'Iroda',
  outdoor: 'Kültér',
  automotive: 'Autó',
  baby: 'Baba',
  'pet supplies': 'Kisállat',
  food: 'Élelmiszer',
  books: 'Könyvek',
  art: 'Művészet',
  crafts: 'Kézműves termékek',
  tools: 'Szerszámok',
  stationery: 'Irodaszerek',
  health: 'Egészség',
  jewelry: 'Ékszerek',
  bags: 'Táskák',
  accessories: 'Kiegészítők',
};

export function localizeProductCategory(category: string): string {
  const value = category.trim();
  if (!value) return 'Egyéb';
  const normalized = value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  return PRODUCT_CATEGORY_LABELS[normalized] ?? (/[áéíóöőúüű]/i.test(value) ? value : 'Egyéb');
}

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
  if (price === undefined || !Number.isFinite(price) || !/^[A-Z]{3}$/.test(code)) return hu.common.priceUnavailable;
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
    `Kategória: ${category}`,
    `Forrás: ${source}`,
  ];

  const formatted = formatProductPrice(price, currency);
  visibleDetails.push(formatted === hu.common.priceUnavailable ? formatted : `Ár: ${formatted}`);

  const details = visibleDetails.join('. ');
  return actionable
    ? `${title} termékoldal megnyitása. ${details}.`
    : `${title}: a termék adatai nem érhetők el. ${details}.`;
}
