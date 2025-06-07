import vueParser from 'vue-eslint-parser';
import vuePlugin from 'eslint-plugin-vue';
import js from '@eslint/js';
import globals from 'globals';

export default [
  // Vue configuration
  {
    files: ['**/*.vue'],
    plugins: {
      vue: vuePlugin
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: {
          js: '@babel/eslint-parser',
          jsx: '@babel/eslint-parser',
          ts: '@typescript-eslint/parser',
        },
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']  // Important for Vue SFC recognition
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    processor: vuePlugin.processors['.vue'],  // Add Vue processor
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/comment-directive': 'off'  // Disable if causing issues
    }
  },
  
  // JavaScript configuration
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    }
  },
  
  // Ignore coverage files
  {
    ignores: ['coverage/**']
  }
];