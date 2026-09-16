import { requireNativeModule } from 'expo-modules-core';

export type PlayIntegrityModule = {
  isAvailable(): boolean;
  requestIntegrityToken(cloudProjectNumber: number, requestHash: string): Promise<string>;
};

export default requireNativeModule<PlayIntegrityModule>('UseitPlayIntegrity');
