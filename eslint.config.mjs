import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: {
      globals: {
        ...globals.node, // Enable Node.js globals (including process)
        ...globals.browser, // If you also need browser globals, include them
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-undef': 'warn', // Warn about undefined variables
    },
  },
];
