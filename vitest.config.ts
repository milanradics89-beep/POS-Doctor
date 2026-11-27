import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'scripts/**/*.test.mjs', 'tests/**/*.test.ts', 'vendor/**/*.test.js'],
  },
});
