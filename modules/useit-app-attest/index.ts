import { requireNativeModule } from 'expo-modules-core';

export type UseitAppAttestModule = {
  isAvailable(): boolean;
  isKeyAttested(keyId: string): boolean;
  isKeyAttestationPending(keyId: string): boolean;
  markKeyAttestationPending(keyId: string): void;
  markKeyAttested(keyId: string): void;
  getOrCreateKeyId(): Promise<string>;
  createNewKeyId(): Promise<string>;
  attest(challenge: string, keyId: string): Promise<string>;
  generateAssertion(challenge: string, keyId: string, clientData: string): Promise<string>;
};

export default requireNativeModule<UseitAppAttestModule>('UseitAppAttest');
