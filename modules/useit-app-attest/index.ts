import { requireNativeModule } from 'expo-modules-core';

export type UseitAppAttestModule = {
  isAvailable(): boolean;
  getOrCreateKeyId(): Promise<string>;
  attest(challenge: string, keyId: string): Promise<string>;
  generateAssertion(challenge: string, keyId: string, clientData: string): Promise<string>;
};

export default requireNativeModule<UseitAppAttestModule>('UseitAppAttest');
