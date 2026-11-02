import { describe, expect, it } from 'vitest';

import { createPreferencesStore, type PreferencesStorage } from './profilePreferencesStore';
import { createProfilePreferencesController } from './profilePreferencesController';
import { DEFAULT_PROFILE_PREFERENCES, type ProfilePreferences } from './profilePreferences';

function createMemoryStorage(): PreferencesStorage {
  const values = new Map<string, string>();
  return {
    async getItem(key) { return values.get(key) ?? null; },
    async setItem(key, value) { values.set(key, value); },
  };
}

describe('profile preferences store', () => {
  it('returns defaults when the device has no saved preferences', async () => {
    const store = createPreferencesStore(createMemoryStorage(), 'prefs');
    await expect(store.read()).resolves.toEqual(DEFAULT_PROFILE_PREFERENCES);
  });

  it('round-trips the supported preference fields', async () => {
    const store = createPreferencesStore(createMemoryStorage(), 'prefs');
    const value: ProfilePreferences = { personalizedIdeas: false, productSuggestions: true, saveHistory: true };
    await store.write(value);
    await expect(store.read()).resolves.toEqual(value);
  });


  it('publishes preference changes to every mounted screen and persists them', async () => {
    const storage = createMemoryStorage();
    const controller = createProfilePreferencesController(storage, 'prefs');
    let observed = controller.getSnapshot();
    const unsubscribe = controller.subscribe(() => {
      observed = controller.getSnapshot();
    });

    await controller.hydrate();
    controller.updatePreference('productSuggestions', false);
    expect(observed.preferences.productSuggestions).toBe(false);
    await controller.flush();

    const saved = JSON.parse((await storage.getItem('prefs')) || '{}') as ProfilePreferences;
    expect(saved.productSuggestions).toBe(false);
    unsubscribe();
  });

  it('serializes rapid preference changes without losing earlier fields', async () => {
    const storage = createMemoryStorage();
    const controller = createProfilePreferencesController(storage, 'prefs');
    await controller.hydrate();

    controller.updatePreference('personalizedIdeas', false);
    controller.updatePreference('productSuggestions', false);
    await controller.flush();

    const saved = JSON.parse((await storage.getItem('prefs')) || '{}') as ProfilePreferences;
    expect(saved.personalizedIdeas).toBe(false);
    expect(saved.productSuggestions).toBe(false);
  });

  it('fails closed when storage cannot be read and retries successfully', async () => {
    let reads = 0;
    let writes = 0;
    const storage: PreferencesStorage = {
      async getItem() {
        reads += 1;
        if (reads === 1) throw new Error('storage unavailable');
        return JSON.stringify({ ...DEFAULT_PROFILE_PREFERENCES, personalizedIdeas: false });
      },
      async setItem() { writes += 1; },
    };
    const controller = createProfilePreferencesController(storage, 'prefs');

    await controller.hydrate();
    expect(controller.getSnapshot().hydrated).toBe(false);
    expect(controller.getSnapshot().error).toContain('storage is unavailable');

    controller.updatePreference('personalizedIdeas', true);
    await controller.flush();
    expect(writes).toBe(0);

    await controller.retryHydration();
    expect(controller.getSnapshot()).toEqual({
      preferences: { ...DEFAULT_PROFILE_PREFERENCES, personalizedIdeas: false },
      hydrated: true,
      error: null,
    });

    controller.updatePreference('productSuggestions', false);
    await controller.flush();
    expect(writes).toBe(1);
  });

  it('does not accept non-boolean values for preference flags', async () => {
    const storage = createMemoryStorage();
    await storage.setItem('prefs', JSON.stringify({ personalizedIdeas: 'false', productSuggestions: 0, saveHistory: true }));
    const store = createPreferencesStore(storage, 'prefs');
    await expect(store.read()).resolves.toEqual({ personalizedIdeas: true, productSuggestions: true, saveHistory: true });
  });
});
