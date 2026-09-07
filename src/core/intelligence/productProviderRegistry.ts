import type { ProductProvider } from './productCandidateCollector';

export class ProductProviderRegistry {
  private providers = new Map<string, ProductProvider>();

  register(provider: ProductProvider): void {
    if (!provider.id.trim()) throw new Error('Product provider id is required');
    this.providers.set(provider.id, provider);
  }

  unregister(id: string): boolean { return this.providers.delete(id); }
  get(id: string): ProductProvider | undefined { return this.providers.get(id); }
  list(): ProductProvider[] { return [...this.providers.values()]; }
}

export function createProductProviderRegistry(providers: ProductProvider[] = []): ProductProviderRegistry {
  const registry = new ProductProviderRegistry();
  providers.forEach(provider => registry.register(provider));
  return registry;
}
