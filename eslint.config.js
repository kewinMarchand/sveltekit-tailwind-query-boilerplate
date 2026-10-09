import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

const RELATIVE_DEPTH = { group: ['../../*'], message: 'Utiliser l’alias @/ au-delà d’un niveau.' }
const ICONS_WRAPPER = {
  group: ['@lucide/svelte', '@lucide/svelte/*'],
  message: 'Les icônes passent par le wrapper @/core/ui/ui-kit/Icon.',
}
const CAROUSEL_WRAPPER = {
  group: ['embla-carousel', 'embla-carousel-*'],
  message: 'Embla passe par la feature @/features/carousel.',
}
const DOMAIN_PUBLIC_API = {
  group: ['@/domains/*/*', '!@/domains/*/index.server'],
  message: "Un domaine s'importe uniquement via son index.ts (ou index.server.ts) public.",
}

export default defineConfig(
  {
    ignores: [
      '.svelte-kit/**',
      'build/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
      'src/core/api/schema.d.ts',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
      },
    },
  },
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\u0000'],
            ['^node:', '^@?\\w', '^\\$app(?![\\w-])'],
            ['^@/'],
            ['^\\.'],
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, CAROUSEL_WRAPPER] },
      ],
    },
  },
  {
    files: ['src/routes/**', 'src/core/**', 'src/features/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, CAROUSEL_WRAPPER, DOMAIN_PUBLIC_API] },
      ],
    },
  },
  {
    files: ['src/core/ui/ui-kit/Icon.svelte'],
    rules: { 'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, CAROUSEL_WRAPPER] }] },
  },
  {
    files: ['src/features/carousel/**'],
    rules: { 'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER] }] },
  },
)
