import { HttpIntelligenceProvider } from './providers/httpProvider';
import { MockIntelligenceProvider } from './providers/mockProvider';
import type { IntelligenceProvider } from './types';

// Production uses the server-side multimodal provider. Mock remains available for offline UI work.
const provider: IntelligenceProvider = process.env.EXPO_PUBLIC_USEIT_API_URL
  ? new HttpIntelligenceProvider()
  : new MockIntelligenceProvider();

export { provider as intelligence };
export * from './types';
