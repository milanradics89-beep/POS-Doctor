import type { ProfilePreferences } from './profilePreferences';

export interface PreferencesStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

export function createPreferencesStore(storage: PreferencesStorage, key: string) {
  return {
    async read(): Promise<ProfilePreferences> {
      const raw = await storage.getItem(key);
      if (!raw) return { personalizedIdeas: true, productSuggestions: true, saveHistory: false };
      const parsed: unknown = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { personalizedIdeas: true, productSuggestions: true, saveHistory: false };
      }
      const value = parsed as Partial<ProfilePreferences>;
      return {
        personalizedIdeas: typeof value.personalizedIdeas === 'boolean' ? value.personalizedIdeas : true,
        productSuggestions: typeof value.productSuggestions === 'boolean' ? value.productSuggestions : true,
        saveHistory: typeof value.saveHistory === 'boolean' ? value.saveHistory : false,
      };
    },
    async write(preferences: ProfilePreferences): Promise<void> {
      await storage.setItem(key, JSON.stringify(preferences));
    },
  };
}
