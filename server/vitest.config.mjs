import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.js'],
    exclude: ['tests/setup.test.js'],
    setupFiles: ['tests/setup.js'],
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
