/* eslint-env node */
module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'plugin:vue/vue3-recommended',   // Vue-Best-Practices
    '@vue/eslint-config-standard',   // Standard-JS-Regeln
    '@vue/eslint-config-prettier',   // Konflikte mit Prettier ausschalten
  ],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  rules: {
    // Beispiel: Einwort-Komponenten wie <HomePage> erlauben
    'vue/multi-word-component-names': 'off',
  },
}
