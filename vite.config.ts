import adapter from '@sveltejs/adapter-node'
import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { svelteTesting } from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig(({ command }) => {
  const origin = command === 'build' ? process.env.ORIGIN : undefined

  return {
    plugins: [
      tailwindcss(),
      sveltekit({
        adapter: adapter(),
        paths: { relative: false, ...(origin && { origin }) },
      }),
      svelteTesting(),
    ],
    server: { port: 5173, strictPort: true },
    define: { __SENTRY_TRACING__: false, __SENTRY_DEBUG__: false },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      include: ['src/**/*.test.ts'],
    },
  }
})
