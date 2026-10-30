import { DEFAULT_PROFILE_PREFERENCES, parsePreferences, type ProfilePreferences } from './profilePreferences';

export interface PreferencesStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
}

export function createPreferencesStore(storage: PreferencesStorage, key: string) {
  return {
    async read(): Promise<ProfilePreferences> {
      return parsePreferences(await storage.getItem(key));
    },
    async write(preferences: ProfilePreferences): Promise<void> {
      await storage.setItem(key, JSON.stringify(preferences));
    },
  };
}
