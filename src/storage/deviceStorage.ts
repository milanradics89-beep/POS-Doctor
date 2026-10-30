import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type StorageAdapter = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
};

let adapter: StorageAdapter | null = null;

function getAdapter(): StorageAdapter | null {
  if (adapter) return adapter;
  try {
    if (Platform.OS !== 'web') {
      adapter = AsyncStorage;
      return adapter;
    }
    if (typeof globalThis.localStorage !== 'undefined') {
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
