# sveltekit-tailwind-query-boilerplate

Point de départ pour une application **SvelteKit 3** (Svelte 5, runes) avec **Tailwind CSS 4**, **TanStack Query**, **superforms + zod**, et toute la chaîne qualité : lint, format, types, tests unitaires, end-to-end, accessibilité et Lighthouse.

Les pages de démonstration montrent chaque brique en situation :

| Page                                 | Ce qu'elle montre                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `/`                                  | Hero plein écran (image LCP préchargée), carrousel Embla, articles rendus côté serveur avec leurs trois états             |
| `/taches`                            | Chargement côté client avec TanStack Query : chargement, erreur avec relance, liste vide                                  |
| `/contact`                           | Formulaire superforms + zod, action serveur, erreurs liées aux champs, fonctionne sans JavaScript                         |
| `/catalogue/...`                     | Catalogue à facettes : état dans l'URL, comptage disjonctif, tri, pagination, vue grille ou liste, formulaire GET sans JS |
| Pages légales                        | Mentions légales, données personnelles, déclaration d'accessibilité calculée depuis la config, plan du site               |
| `/charte-graphique` (dev uniquement) | Tokens, typographie, composants et états, avec ratios de contraste calculés                                               |

S'y ajoutent : menu de catégories en cascade (desktop) et en niveaux (mobile), fil d'Ariane et JSON-LD, métadonnées SEO rendues côté serveur, mode accessibilité renforcée, pages d'erreur 404, 500 et 503.

## Stack

| Brique                                  | Rôle                                                                    |
| --------------------------------------- | ----------------------------------------------------------------------- |
| SvelteKit 3, adapter-node               | Routage, rendu serveur, form actions, endpoints `robots.txt` et sitemap |
| Svelte 5 (runes), TypeScript 6 (strict) | UI et typage                                                            |
| Tailwind CSS 4                          | Styles, tokens dans `src/core/theme/theme.css`                          |
| bits-ui                                 | Primitives accessibles : `Button` et `Dialog` uniquement                |
| TanStack Svelte Query 6                 | Cache et synchronisation des données côté client                        |
| sveltekit-superforms 3 + zod 4          | Formulaires validés côté serveur et client, même schéma                 |
| Embla Carousel 8                        | Carrousel (glisser, swipe, molette), via `features/carousel`            |
| @lucide/svelte                          | Icônes, via le wrapper `Icon`                                           |
| @fontsource-variable/inter              | Police Inter servie localement                                          |
| ESLint 10, Prettier, Husky, lint-staged | Qualité du code, vérifiée à chaque commit                               |
| Vitest 5 + Testing Library              | Tests unitaires et fonctionnels                                         |
| Playwright + axe-core                   | Tests end-to-end et accessibilité, desktop et mobile, deux modes        |
| Lighthouse CI                           | Performance, accessibilité, SEO, bonnes pratiques                       |

## Prérequis

- Node.js 24.14 ou plus (`.nvmrc`)
- Yarn 1
- Docker, pour l'image de production (optionnel)

## Démarrage

```sh
git clone https://github.com/kewinMarchand/sveltekit-tailwind-query-boilerplate.git
cd sveltekit-tailwind-query-boilerplate
cp .env.example .env
make install   # dépendances + navigateur Chromium des tests e2e
make up        # http://localhost:5173
```

Variables d'environnement (`.env`, déclarées et validées dans `src/env.ts`). Le `Makefile` charge `.env` et l'exporte vers chaque commande, `make start` le relit aussi :

| Variable          | Rôle                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_URL` | URL publique, utilisée pour les URL canoniques, Open Graph, le JSON-LD et le sitemap                        |
| `ORIGIN`          | Origine servie par `make start`, figée par `make build` (protection CSRF des formulaires, voir `CLAUDE.md`) |
| `MAINTENANCE`     | `1` : toutes les pages répondent 503 avec la page de maintenance statique                                   |
| `DEV_ROUTES`      | `1` : expose `/charte-graphique` et `/_erreur-test` hors du serveur de développement                        |
| `API_SCHEMA_URL`  | Schéma OpenAPI de l'API consommée, lu par `make api-types`                                                  |

## Commandes

`make help` liste toutes les commandes. Les principales :

| Commande                               | Effet                                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `make up`                              | Serveur de développement (port 5173)                                                          |
| `make build` / `make start`            | Build de production, puis le servir                                                           |
| `make qa`                              | QA rapide : lint, format, types, tests unitaires                                              |
| `make qa-full`                         | QA complète : QA rapide, e2e, accessibilité, Lighthouse                                       |
| `make test-unit`                       | Vitest                                                                                        |
| `make test-e2e`                        | Playwright, desktop et mobile (port 3120)                                                     |
| `make test-a11y`                       | axe-core, WCAG 2.1 AA, sur chaque page, mode standard et mode renforcé                        |
| `make metrics`                         | Lighthouse CI (port 3220) : échoue sous 90 en performance ou sous 100 en accessibilité et SEO |
| `make api-types`                       | Génère `src/core/api/schema.d.ts` depuis `API_SCHEMA_URL`                                     |
| `make docker-build` / `make docker-up` | Image de production, sur le port `PORT` (3000 par défaut)                                     |

## Architecture

```
src/
  routes/      routage uniquement : chaque route délègue à une vue de domains/
  domains/     un dossier par domaine de page, avec sa logique métier
    catalog/
      api/             accès aux données (ici en mémoire, avec latence)
      common/models/   types, schémas et fonctions pures (filtres, tri, pagination)
      common/exceptions/
      services/        chargement serveur (*.server.ts)
      ui/              composants, dont la vue rendue par la route
      ui/hooks/        état et effets en runes (*.svelte.ts)
      index.ts         export public du domaine
      index.server.ts  export public côté serveur (load, actions)
  features/    briques réutilisables sans entité métier (carousel)
  core/        socle : config, thème, SEO, routage, mode renforcé, erreurs, layouts, ui-kit
tests/
  e2e/         un fichier par page ou par brique
  a11y/        audit axe de chaque page, dans les deux modes
```

Le sens des dépendances est `domains/` vers `features/` vers `core/`, jamais l'inverse. Hors de son propre dossier, un domaine ne s'importe que par son `index.ts` (ou `index.server.ts` côté serveur), et une règle ESLint le vérifie.

Le `CLAUDE.md` de ce dépôt note les choix propres au projet, les versions épinglées et les pièges connus.

## Recettes

### Ajouter une page

1. Créer le domaine `src/domains/<nom>/` avec sa vue `ui/<Nom>View.svelte` et son `index.ts`. La vue commence par `<PageHeader>` (titre, description, fil d'Ariane, métadonnées).
2. Créer `src/routes/<route>/+page.svelte`, qui rend la vue. Un chargement serveur passe par `+page.server.ts` et un `index.server.ts` du domaine.
3. Ajouter la route à `src/core/config/navigation.ts` (menu, sitemap, plan du site) et à `tests/e2e/routes.ts` (réponse, SEO, débordement, accessibilité).
4. Écrire `tests/e2e/<route>.e2e.ts`.

### Charger des données avec TanStack Query

Le pattern est dans `src/domains/tasks/` :

- `api/tasksRepository.ts` fournit la donnée. Pour brancher une vraie API, remplacer son contenu par un appel typé, sans toucher à l'UI.
- `ui/hooks/useTasks.svelte.ts` encapsule `createQuery`, avec une clé de cache exportée et une erreur métier (`TasksLoadError`).
- `ui/TaskList.svelte` affiche les trois états à partir de props, ce qui le rend testable sans réseau.

### Ajouter un champ de formulaire

1. Ajouter le champ et son message d'erreur dans `src/domains/contact/common/models/contactSchema.ts`. Le type du formulaire en découle.
2. Ajouter le `TextField` dans `ContactForm.svelte` avec `errors={$errors.champ}` et `bind:value={$form.champ}`. Le message est relié au champ par `aria-describedby`.

### Ajouter une icône

Importer l'icône depuis `@lucide/svelte/icons/<nom>` dans `src/core/ui/ui-kit/Icon.svelte` et l'ajouter à `ICONS`. Ne jamais importer `@lucide/svelte` ailleurs, ESLint le refuse.

## Tests

- **Unitaires et fonctionnels** : fichiers `*.test.ts` à côté du code testé.
- **End-to-end** : Playwright sert le build de production sur le port 3120, routes de développement activées. Les éléments sont ciblés par `data-testid`, préfixé par le domaine (`catalog-sort`, `contact-submit`). Chaque rendu conditionnel est testé présent et absent. Les captures de mise en page sont écrites dans `screenshots/`.
- **Accessibilité** : `tests/a11y/` passe axe-core sur chaque route, la 404, la 500, la charte et le menu ouvert, en mode standard et renforcé. Axe ne couvre qu'une partie du RGAA, un audit manuel reste nécessaire.

## Intégration continue

`.github/workflows/ci.yml` lance `make qa`, puis les tests e2e, accessibilité et Lighthouse, à chaque push sur `main` et sur chaque pull request. En cas d'échec, le rapport Playwright est joint au run.

## Licence

MIT
