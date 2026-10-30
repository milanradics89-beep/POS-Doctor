import { createPreferencesStore, type PreferencesStorage } from './profilePreferencesStore';
import { DEFAULT_PROFILE_PREFERENCES, type ProfilePreferences } from './profilePreferences';

export type ProfilePreferencesSnapshot = {
  preferences: ProfilePreferences;
  hydrated: boolean;
  error: string | null;
};

export function createProfilePreferencesController(storage: PreferencesStorage, key: string) {
  const store = createPreferencesStore(storage, key);
  let snapshot: ProfilePreferencesSnapshot = {
    preferences: DEFAULT_PROFILE_PREFERENCES,
    hydrated: false,
    error: null,
  };
  const listeners = new Set<() => void>();
  let hydration: Promise<void> | null = null;
  let writeQueue: Promise<void> = Promise.resolve();

  const getSnapshot = () => snapshot;
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  function publish(next: ProfilePreferencesSnapshot) {
    snapshot = next;
    listeners.forEach((listener) => listener());
  }

  function hydrate(): Promise<void> {
    if (!hydration) {
      hydration = store.read()
        .then((preferences) => {
          publish({ preferences, hydrated: true, error: null });
        })
        .catch(() => {
          publish({
            ...snapshot,
            hydrated: true,
            error: 'Device storage is unavailable. Changes may not persist.',
          });
        });
    }
    return hydration;
  }

  function updatePreference(key: keyof ProfilePreferences, value: boolean): void {
    if (!snapshot.hydrated || snapshot.preferences[key] === value) return;
    const preferences = { ...snapshot.preferences, [key]: value };
    publish({ ...snapshot, preferences });
    writeQueue = writeQueue
      .catch(() => undefined)
      .then(async () => {
        await store.write(preferences);
        if (snapshot.error) publish({ ...snapshot, error: null });
      })
      .catch(() => {
        publish({ ...snapshot, error: 'Preferences could not be saved on this device.' });
      });
  }

  function flush(): Promise<void> {
    return writeQueue;
  }

  return { getSnapshot, subscribe, hydrate, updatePreference, flush };
}
