import { existsSync, readdirSync } from 'node:fs'
import boundaries from '@boundaries/eslint-plugin'
import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import prettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import svelte from 'eslint-plugin-svelte'
import globals from 'globals'
import ts from 'typescript-eslint'

const MODULES_ROOT = 'src/lib/modules'
const LAYERS = ['domain', 'application', 'infrastructure', 'ui']

const MODULES_WITHOUT_APPLICATION = readdirSync(MODULES_ROOT).filter(
  (module) => !existsSync(`${MODULES_ROOT}/${module}/application`),
)

const RELATIVE_DEPTH = {
  group: ['../../*'],
  message: 'Utiliser l’alias #lib/ au-delà d’un niveau.',
}
const ICONS_WRAPPER = {
  group: ['@lucide/svelte', '@lucide/svelte/*'],
  message: 'Les icônes passent par le wrapper #lib/shared/ui/kit/Icon.',
}
const CAROUSEL_WRAPPER = {
  group: ['embla-carousel', 'embla-carousel-*'],
  message: 'Embla passe par le wrapper #lib/shared/ui/carousel.',
}

const FRAMEWORK_PACKAGES = [
  'svelte',
  'svelte/*',
  '$app/*',
  '@sveltejs/*',
  '@tanstack/*',
  'bits-ui',
  'sveltekit-superforms',
  'sveltekit-superforms/*',
]
const FRAMEWORKS_IN_DOMAIN = {
  group: FRAMEWORK_PACKAGES,
  message: 'Le domaine ne dépend d’aucun framework : données immuables et fonctions pures.',
}
const FRAMEWORKS_IN_APPLICATION = {
  group: FRAMEWORK_PACKAGES,
  message:
    'L’application ne dépend d’aucun framework : elle renvoie une union que la route traduit.',
}

const OBSERVABILITY_WRAPPER = {
  group: ['@sentry/*'],
  message: 'Le SDK GlitchTip passe par le wrapper #lib/shared/observability.',
}

const sameModule = (type) => ({
  element: { type, captured: { module: '{{ from.element.captured.module }}' } },
})

const policy = (from, to, message, extra = {}) => ({
  from: { element: { type: from } },
  allow: { to: typeof to === 'string' ? { element: { type: to } } : to, ...extra },
  message,
})

const ARCHITECTURE_POLICIES = [
  policy('routes', 'views', 'Routage : vues, index public des modules et socle seulement.'),
  policy('routes', 'module', 'Routage : vues, index public des modules et socle seulement.'),
  policy('routes', 'shared', 'Routage : vues, index public des modules et socle seulement.'),
  policy('views', 'module', 'Vue : index public des modules et socle seulement.'),
  policy('views', 'shared', 'Vue : index public des modules et socle seulement.'),
  policy(
    'views',
    { element: { type: 'views', captured: { view: '{{ from.element.captured.view }}' } } },
    'Vue : index public des modules et socle seulement.',
  ),
  ...LAYERS.map((layer) =>
    policy('module', sameModule(layer), 'Index public : seulement les couches de son module.'),
  ),
  policy('domain', sameModule('domain'), 'Domaine : seulement le domaine de son module.'),
  policy('domain', 'shared', 'Domaine : seulement les types du socle.', {
    dependency: { kind: 'type' },
  }),
  policy('application', sameModule('domain'), 'Application : domaine et infrastructure du module.'),
  policy(
    'application',
    sameModule('infrastructure'),
    'Application : domaine et infrastructure du module.',
  ),
  policy('application', 'shared', 'Application : seulement les types du socle.', {
    dependency: { kind: 'type' },
  }),
  policy(
    'infrastructure',
    sameModule('domain'),
    'Infrastructure : domaine du module et client HTTP.',
  ),
  policy('infrastructure', 'shared-api', 'Infrastructure : domaine du module et client HTTP.'),
  policy('ui', sameModule('domain'), 'Interface : domaine, application et interface du module.'),
  policy(
    'ui',
    sameModule('application'),
    'Interface : domaine, application et interface du module.',
  ),
  policy('ui', sameModule('ui'), 'Interface : domaine, application et interface du module.'),
  policy('ui', 'shared', 'Interface : domaine, application et interface du module.'),
  ...MODULES_WITHOUT_APPLICATION.map((module) => ({
    from: { element: { type: 'ui', captured: { module } } },
    allow: { to: sameModule('infrastructure') },
  })),
  policy('shared', 'shared', 'Socle : n’importe ni module, ni vue, ni routage.'),
]

export default defineConfig(
  {
    ignores: [
      '.svelte-kit/**',
      'build/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
      '.lighthouseci/**',
      'src/lib/shared/api/schema.d.ts',
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
            ['^#lib/'],
            ['^\\.'],
            ['^.+\\u0000$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, CAROUSEL_WRAPPER, OBSERVABILITY_WRAPPER] },
      ],
    },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.svelte'],
    plugins: { boundaries },
    settings: {
      'import/resolver': { typescript: { alwaysTryTypes: true, project: './tsconfig.json' } },
      'boundaries/elements': [
        ...LAYERS.map((layer) => ({
          type: layer,
          pattern: `${MODULES_ROOT}/*/${layer}`,
          capture: ['module'],
          partialMatch: false,
          exclusive: true,
        })),
        { type: 'module', pattern: `${MODULES_ROOT}/*`, capture: ['module'], partialMatch: false },
        { type: 'shared-api', pattern: 'src/lib/shared/api', partialMatch: false, exclusive: true },
        { type: 'shared', pattern: 'src/lib/shared/*', capture: ['area'], partialMatch: false },
        { type: 'views', pattern: 'src/lib/views/*', capture: ['view'], partialMatch: false },
        { type: 'routes', pattern: 'src/routes', partialMatch: false },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          checkInternals: false,
          message:
            'Architecture : la couche « {{ from.element.type }} » ne peut pas importer « {{ to.element.type }} ».',
          policies: ARCHITECTURE_POLICIES,
        },
      ],
    },
  },
  {
    files: ['src/lib/modules/*/domain/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RELATIVE_DEPTH,
            ICONS_WRAPPER,
            CAROUSEL_WRAPPER,
            OBSERVABILITY_WRAPPER,
            FRAMEWORKS_IN_DOMAIN,
          ],
        },
      ],
    },
  },
  {
    files: ['src/lib/modules/*/application/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            RELATIVE_DEPTH,
            ICONS_WRAPPER,
            CAROUSEL_WRAPPER,
            OBSERVABILITY_WRAPPER,
            FRAMEWORKS_IN_APPLICATION,
          ],
        },
      ],
    },
  },
  {
    files: ['tools/**'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['src/lib/shared/observability/**'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER, CAROUSEL_WRAPPER] },
      ],
    },
  },
  {
    files: ['src/lib/shared/ui/kit/Icon.svelte'],
    rules: { 'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, CAROUSEL_WRAPPER] }] },
  },
  {
    files: ['src/lib/shared/ui/carousel/**'],
    rules: { 'no-restricted-imports': ['error', { patterns: [RELATIVE_DEPTH, ICONS_WRAPPER] }] },
  },
)
