import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest', // Use the latest ECMAScript version
      sourceType: 'module' // Set source type to 'module' for ES modules
    }
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'warn', // Warn about unused variables
      'no-undef': 'warn' // Warn about undefined variables
    }
  }
];

// import globals from "globals";
// import pluginJs from "@eslint/js";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
// ];
