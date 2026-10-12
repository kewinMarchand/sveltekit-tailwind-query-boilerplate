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
| Tailwind CSS 4                          | Styles, tokens dans `src/lib/shared/theme/theme.css`                    |
| bits-ui                                 | Primitives accessibles : `Button` et `Dialog` uniquement                |
| TanStack Svelte Query 6                 | Cache et synchronisation des données côté client                        |
| sveltekit-superforms 3 + zod 4          | Formulaires validés côté serveur et client, même schéma                 |
| Embla Carousel 8                        | Carrousel (glisser, swipe, molette), via `shared/ui/carousel`           |
| @lucide/svelte                          | Icônes, via le wrapper `Icon`                                           |
| @fontsource-variable/inter              | Police Inter servie localement                                          |
| ESLint 10, Prettier, Husky, lint-staged | Qualité du code et règles d’architecture, vérifiées à chaque commit     |
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

| Variable                                | Rôle                                                                                                        |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `PUBLIC_SITE_URL`                       | URL publique, utilisée pour les URL canoniques, Open Graph, le JSON-LD et le sitemap                        |
| `ORIGIN`                                | Origine servie par `make start`, figée par `make build` (protection CSRF des formulaires, voir `CLAUDE.md`) |
| `MAINTENANCE`                           | `1` : toutes les pages répondent 503 avec la page de maintenance statique                                   |
| `DEV_ROUTES`                            | `1` : expose `/charte-graphique` et `/_erreur-test` hors du serveur de développement                        |
| `GLITCHTIP_DSN`, `PUBLIC_GLITCHTIP_DSN` | Suivi des erreurs GlitchTip, côté serveur et navigateur. Vides : aucun SDK chargé, aucune requête           |
| `PUBLIC_GLITCHTIP_ENVIRONMENT`          | Environnement déclaré à GlitchTip (défaut : `development` ou `production`)                                  |
| `API_SCHEMA_URL`                        | Schéma OpenAPI de l'API consommée, lu par `make api-types`                                                  |

## Démarrer un projet à partir de ce dépôt

### Créer le dépôt

Voie recommandée : le dépôt est un modèle GitHub. Cliquer sur « Use this template », ou en ligne de commande :

```sh
gh repo create mon-projet --template kewinMarchand/sveltekit-tailwind-query-boilerplate --private --clone
```

Le nouveau dépôt part d'un historique neuf, sans lien avec celui-ci.

Voie du fork, pour suivre les évolutions du boilerplate ou y contribuer :

```sh
gh repo fork kewinMarchand/sveltekit-tailwind-query-boilerplate --clone --fork-name mon-projet
```

Le fork devient le dépôt `origin` et ce dépôt le dépôt `upstream`. GitHub refuse de forker un dépôt dans le compte qui le possède : dans ce cas, forker dans une organisation avec `--org`.

### Récupérer les mises à jour

Avec un fork, l'historique est commun :

```sh
git fetch upstream
git merge upstream/main
```

Avec un dépôt créé depuis le modèle, l'historique n'est pas commun : on reprend les commits utiles un par un.

```sh
git remote add boilerplate https://github.com/kewinMarchand/sveltekit-tailwind-query-boilerplate.git
git fetch boilerplate
git log --oneline boilerplate/main
git cherry-pick <sha>
```

### Personnaliser

| Sujet                      | Fichiers                                                                                                                                                                                                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Nom du paquet              | `package.json` (`name`, `description`)                                                                                                                                                                                                                            |
| Identité et config du site | `src/lib/shared/config/site.ts` (nom, description, éditeur, hébergeur, audit d'accessibilité), `.env.example` (`PUBLIC_SITE_URL`), `static/manifest.webmanifest`, `src/app.html` (`theme-color`), `LICENSE`                                                       |
| Navigation                 | `src/lib/shared/config/navigation.ts` (menu, pied de page, sitemap, plan du site)                                                                                                                                                                                 |
| Couleurs, police, tokens   | `src/lib/shared/theme/theme.css`                                                                                                                                                                                                                                  |
| Ports                      | développement : `package.json` (script `dev`) et `vite.config.ts` (5173). Tests : `playwright.config.ts` (3120), `tests/e2e/production.e2e.ts` (3121). Lighthouse : `.lighthouserc.json` (3220). Production : `Dockerfile`, `compose.yaml`, `.env.example` (3000) |
| Logo et favicons           | `static/logo-mark.svg`, `static/favicon.svg`, `static/favicon.ico`, `static/apple-touch-icon.png`, `static/icon-192.png`, `static/icon-512.png`, `static/og-image.jpg`                                                                                            |
| Pages légales              | `src/lib/views/legal/` (textes), alimentées par `site.ts`                                                                                                                                                                                                         |
| URL Lighthouse             | `.lighthouserc.json` (`collect.url`)                                                                                                                                                                                                                              |
| Intégration continue       | `.github/workflows/ci.yml`                                                                                                                                                                                                                                        |
| Documentation              | `README.md`, `CLAUDE.md`                                                                                                                                                                                                                                          |

Les tests e2e attendent les ports 3120 et 5173 en dur (`tests/e2e/seo.e2e.ts`, `tests/e2e/breadcrumb.e2e.ts`, `src/lib/shared/seo/breadcrumb.test.ts`, `vitest.setup.ts`) : les changer en même temps que les ports.

### Retirer les modules d'exemple

Le catalogue, le blog et les tâches sont des exemples. Le contact reste, c'est le seul module que la procédure garde. Elle a été déroulée sur une copie jusqu'à un `make qa` vert.

1. Supprimer les modules et leurs routes : `src/lib/modules/catalog/`, `src/lib/modules/blog/`, `src/lib/modules/task/`, `src/routes/catalogue/`, `src/routes/taches/`, `src/routes/+page.server.ts` (articles de l'accueil) et `src/routes/+layout.server.ts` (menu des catégories).
2. Retirer le catalogue du socle. Dans `src/lib/shared/config/navigation.ts` et son `index.ts`, supprimer `CATALOG_NAVIGATION`, le type `NavigationNode` et l'entrée `/taches`. Dans `src/lib/shared/ui/layout/`, retirer la propriété `categoryMenu` d'`AppShell.svelte` et de `Header.svelte`, retirer le menu de catégories du header, ramener `MobileMenu.svelte` à la liste de `MAIN_NAVIGATION`, puis supprimer `CategoryMenu.svelte` et les hooks `useCascadeMenu`, `useAnchoredPanel` et `useDrillDown`, devenus inutiles. Les classes `category-menu*` de `theme.css` peuvent partir aussi.
3. Mettre à jour les vues et les routes qui les rendent :
   - `src/lib/views/home/HomeView.svelte` : retirer la section des articles et la propriété `blog`, et `src/routes/+page.svelte` ne lui passe plus de données
   - `src/lib/views/home/Hero.svelte` : retirer le bouton vers `/taches`
   - `src/lib/views/styleguide/MediaSection.svelte` : retirer les cartes de blog et de produit
   - `src/lib/views/errors/ErrorView.svelte` : retirer le lien vers le catalogue
   - `src/lib/views/legal/SitemapView.svelte` : retirer l'arbre des catégories et supprimer `SitemapTree.svelte`, et `src/routes/plan-du-site/+page.svelte` rend la vue sans données
   - `src/routes/+layout.svelte` : rendre `AppShell` sans propriété
   - `src/routes/sitemap.xml/+server.ts` : appeler `buildSitemapXml()` sans les chemins du catalogue.
4. Adapter les tests. Supprimer `tests/e2e/catalogue.e2e.ts`, `tests/e2e/taches.e2e.ts` et `tests/e2e/category-menu.e2e.ts`. Retirer les routes `/taches`, `/catalogue` et `/catalogue/plantes-interieur/feuillages` de `tests/e2e/routes.ts`, et les cas du catalogue, du blog et des tâches dans `accueil.e2e.ts`, `breadcrumb.e2e.ts`, `errors.e2e.ts`, `seo.e2e.ts`, `layout.e2e.ts` et `tests/a11y/pages.a11y.ts`.
5. Retirer les URL `/taches` et `/catalogue...` de `.lighthouserc.json`.
6. Repointer l'auto-test d'architecture. `tools/archSelftest.ts` écrit ses violations dans les modules d'exemple : les déplacer vers `src/lib/modules/contact/` (domaine vers infrastructure par `../infrastructure/sendContactMessage`, domaine vers framework, interface vers un index de module, types générés hors infrastructure) et vers `#lib/modules/contact` pour le socle, la vue et le routage. Les deux cas qui demandent un module avec `application/` (application vers framework, interface vers infrastructure) n'ont plus de cible : les retirer, puis les rétablir au premier module en forme complète.
7. Lancer `make qa`, puis `make test-e2e`, `make test-a11y` et `make metrics`. Mettre à jour `README.md` et `CLAUDE.md`.

Les règles de dépendance n'ont rien à changer : `eslint.config.js` lit la liste des modules sur le disque.

## Commandes

`make help` liste toutes les commandes. Les principales :

| Commande                               | Effet                                                                                         |
| -------------------------------------- | --------------------------------------------------------------------------------------------- |
| `make up`                              | Serveur de développement (port 5173)                                                          |
| `make build` / `make start`            | Build de production, puis le servir                                                           |
| `make qa`                              | QA rapide : lint (dont architecture), auto-test des règles, format, types, tests unitaires    |
| `make arch-selftest`                   | Écrit une violation de chaque règle d'architecture, exige l'échec d'ESLint, puis la retire    |
| `make qa-full`                         | QA complète : QA rapide, e2e, accessibilité, Lighthouse                                       |
| `make test-unit`                       | Vitest                                                                                        |
| `make test-e2e`                        | Playwright, desktop et mobile (port 3120)                                                     |
| `make test-a11y`                       | axe-core, WCAG 2.1 AA, sur chaque page, mode standard et mode renforcé                        |
| `make metrics`                         | Lighthouse CI (port 3220) : échoue sous 90 en performance ou sous 100 en accessibilité et SEO |
| `make api-types`                       | Génère `src/lib/shared/api/schema.d.ts` depuis `API_SCHEMA_URL`                               |
| `make docker-build` / `make docker-up` | Image de production, sur le port `PORT` (3000 par défaut)                                     |

## Architecture

Le front est un seul contexte borné, découpé en **modules** par sous-domaine métier, et en **couches** à l'intérieur de chaque module (vocabulaire d'Evans et de Khononov, détaillé dans le document d'architecture commun aux boilerplates).

```
src/
  routes/                 routage uniquement : chaque route délègue à une vue ou à l'index d'un module
  lib/                    alias natif #lib (subpath imports de package.json)
    views/                pages sans métier ou qui composent des modules : home, legal, errors, styleguide
    modules/
      catalog/            forme complète
        domain/           types (namespace Catalog), value objects, règles pures, sans framework
        application/      cas d'utilisation côté serveur : chargement de page, menu, chemins du sitemap
        infrastructure/   accès aux données : catalogRepository.ts (signature stable au branchement de l'API)
          in-memory/      simulateur de l'API : jeu de données, filtre, comptage disjonctif, tri, pagination
        ui/               composants, hooks en runes (*.svelte.ts), vue rendue par la route
        index.ts          seul export public côté client
        index.server.ts   seul export public côté serveur (load, actions)
      blog/, contact/, task/   forme réduite : domain/, infrastructure/, ui/, sans application/
    shared/               socle sans métier : config, thème, SEO, routage, providers, erreurs,
                          ui/ (kit, layout, carousel, a11y-mode, hooks), api/ (types générés)
tests/
  e2e/                    un fichier par page ou par brique
  a11y/                   audit axe de chaque page, dans les deux modes
tools/
  archSelftest.ts         auto-test des règles d'architecture
```

Règles de dépendance, vérifiées par ESLint (`@boundaries/eslint-plugin`) :

- le routage importe les vues, l'index public des modules et le socle ;
- une vue importe l'index public des modules et le socle ;
- un module n'importe jamais un autre module, la composition se fait dans `views/` ;
- le socle n'importe ni module, ni vue, ni routage : il reçoit les données métier en propriétés (le menu de catégories est fourni par `+layout.server.ts`) ;
- dans un module, `domain/` n'importe que lui-même (et des types du socle), `application/` le domaine et l'infrastructure, `infrastructure/` le domaine et les types générés de l'API, `ui/` le domaine, l'application et l'interface (l'infrastructure seulement si le module n'a pas d'`application/`) ;
- les types générés de l'API (`shared/api/`) ne sont importés que par `infrastructure/`.

`make arch-selftest`, lancé par `make qa`, écrit une violation volontaire de chaque règle à son emplacement réel, exige l'échec d'ESLint, puis la retire.

Le `CLAUDE.md` de ce dépôt note les choix propres au projet, les versions épinglées et les pièges connus.

## Recettes

### Ajouter une page

1. Page sans métier : créer `src/lib/views/<nom>/` avec sa vue `<Nom>View.svelte` et son `index.ts`. Page d'un module : la vue va dans `ui/` du module et sort par son `index.ts`. La vue commence par `<PageHeader>` (titre, description, fil d'Ariane, métadonnées).
2. Créer `src/routes/<route>/+page.svelte`, qui rend la vue. Un chargement serveur passe par `+page.server.ts` et l'`index.server.ts` du module.
3. Ajouter la route à `src/lib/shared/config/navigation.ts` (menu, sitemap, plan du site) et à `tests/e2e/routes.ts` (réponse, SEO, débordement, accessibilité).
4. Écrire `tests/e2e/<route>.e2e.ts`.

### Charger des données avec TanStack Query

Le pattern est dans `src/lib/modules/task/` :

- `infrastructure/taskRepository.ts` fournit la donnée. Pour brancher une vraie API, remplacer son contenu par un appel typé, sans toucher à l'UI.
- `ui/hooks/useTasks.svelte.ts` encapsule `createQuery`, avec une clé de cache exportée et une erreur de chargement (`TasksLoadError`).
- `ui/TaskList.svelte` affiche les trois états à partir de props, ce qui le rend testable sans réseau.

### Ajouter un champ de formulaire

1. Ajouter le champ et son message d'erreur dans `src/lib/modules/contact/domain/contactSchema.ts`. Le type du formulaire en découle.
2. Ajouter le `TextField` dans `ContactForm.svelte` avec `errors={$errors.champ}` et `bind:value={$form.champ}`. Le message est relié au champ par `aria-describedby`.

### Ajouter une icône

Importer l'icône depuis `@lucide/svelte/icons/<nom>` dans `src/lib/shared/ui/kit/Icon.svelte` et l'ajouter à `ICONS`. Ne jamais importer `@lucide/svelte` ailleurs, ESLint le refuse.

## Tests

- **Unitaires et fonctionnels** : fichiers `*.test.ts` à côté du code testé.
- **End-to-end** : Playwright sert le build de production sur le port 3120, routes de développement activées. Les éléments sont ciblés par `data-testid`, préfixé par le domaine (`catalog-sort`, `contact-submit`). Chaque rendu conditionnel est testé présent et absent. Les captures de mise en page sont écrites dans `screenshots/`.
- **Accessibilité** : `tests/a11y/` passe axe-core sur chaque route, la 404, la 500, la charte et le menu ouvert, en mode standard et renforcé. Axe ne couvre qu'une partie du RGAA, un audit manuel reste nécessaire.

## Intégration continue

`.github/workflows/ci.yml` lance `make qa`, puis les tests e2e, accessibilité et Lighthouse, à chaque push sur `main` et sur chaque pull request. En cas d'échec, le rapport Playwright est joint au run.

## Licence

MIT
