import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const { configs: jsConfigs } = jsPlugin;
const { configs: tsConfigs } = tsPlugin;

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: ['node_modules', 'dist', 'build'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
    },
    ...jsConfigs.recommended,
    ...tsConfigs.recommended,
  },
];
