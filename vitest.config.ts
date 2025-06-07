// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  // ─ Alias "@/…" überall (Vitest, Vite, IDE) ─
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  test: {
    environment: 'jsdom',   // JSDOM-Browser-Stub
    globals: true,          // describe/it/expect ohne Import

    // 👉 Setup-Datei mit IntersectionObserver-Mock & Router-Stubs
    setupFiles: 'tests/setupVitest.ts',

    // 👉 E2E-Specs NICHT mit Vitest ausführen
    exclude: [
      '**/e2e/**',
      'node_modules/**',
    ],

    // ─ Coverage ─
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
