import js from '@eslint/js';
import globals from 'globals';
import pluginSecurity from 'eslint-plugin-security';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      // The server code uses CommonJS (require/module.exports)
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.es2024 },
    },
    plugins: { security: pluginSecurity, prettier: pluginPrettier },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-constant-condition': ['error', { checkLoops: false }],
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-eval-with-expression': 'error',
      // Warn when accessing object properties using variables which can lead to injection
      'security/detect-object-injection': 'warn',
      'prettier/prettier': 'warn',
    },
  },
  prettierConfig,
  { ignores: ['node_modules/', 'dist/', 'coverage/', '.env'] },
];
