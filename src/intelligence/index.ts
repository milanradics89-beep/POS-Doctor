import { MockIntelligenceProvider } from './providers/mockProvider';
import type { IntelligenceProvider } from './types';

// Keep provider selection behind one boundary so the mobile UI never owns API keys
// or becomes coupled to a specific AI vendor.
const provider: IntelligenceProvider = new MockIntelligenceProvider();

export { provider as intelligence };
export * from './types';
