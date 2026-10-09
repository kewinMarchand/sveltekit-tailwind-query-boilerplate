import { fileURLToPath } from 'node:url'
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
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    server: { port: 5173, strictPort: true },
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./vitest.setup.ts'],
      include: ['src/**/*.test.ts'],
    },
  }
})
