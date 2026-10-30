import { Platform } from 'react-native';

type StorageAdapter = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
};

let adapter: StorageAdapter | null = null;

function getAdapter(): StorageAdapter | null {
  if (adapter) return adapter;
  try {
    // Keep the web build usable while the native storage dependency is absent.
    if (Platform.OS === 'web' && typeof globalThis.localStorage !== 'undefined') {
      adapter = {
        getItem: async (key) => globalThis.localStorage.getItem(key),
        setItem: async (key, value) => { globalThis.localStorage.setItem(key, value); },
      };
      return adapter;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getItem(key: string): Promise<string | null> {
  const storage = getAdapter();
  if (!storage) throw new Error('Persistent device storage is not configured.');
  return storage.getItem(key);
}

export async function setItem(key: string, value: string): Promise<void> {
  const storage = getAdapter();
  if (!storage) throw new Error('Persistent device storage is not configured.');
  await storage.setItem(key, value);
}
