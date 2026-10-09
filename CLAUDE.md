# CLAUDE.md : sveltekit-tailwind-query-boilerplate

Boilerplate personnel. Les conventions générales sont dans `~/.claude/CLAUDE.md` : ce fichier ne note que les choix propres au projet.

## Choix du projet

- **Type** : application SvelteKit 3, rendu serveur, `adapter-node`. Configuration dans `vite.config.ts` (SvelteKit 3 ne lit plus `svelte.config.js`).
- **Routage** : `src/routes/` ne contient que du câblage (`load`, `actions`, rendu d'une vue). Le serveur passe par `domains/<x>/index.server.ts`, le client par `domains/<x>/index.ts`.
- **Logique** : état et effets dans des modules `.svelte.ts` (`ui/hooks/useXxx.svelte.ts`), fonctions pures dans `common/models/`.
- **Design system** : Tailwind CSS 4, tokens en `@theme static` dans `src/core/theme/theme.css` (émis même inutilisés, pour que la charte les lise). Classes longues factorisées en `@layer components`. Variantes `js:` et `no-js:` selon la classe `js` posée sur `<html>` par `app.html`.
- **Primitives** : bits-ui, uniquement `Button` (lien ou bouton selon `href`) et `Dialog` (panneaux latéraux : filtres mobiles, menu mobile). Le menu de catégories desktop est un disclosure maison : `NavigationMenu` de bits-ui ouvre au survol et place son viewport sous toute la liste racine, la spec exige l'ouverture au clic et un panneau ancré au bouton.
- **Données client** : TanStack Svelte Query. Un `QueryClient` par instance du layout (donc par requête côté serveur), `enabled: browser` pour ne rien charger au rendu serveur. Devtools en développement seulement, par import dynamique.
- **Données serveur** : `load` serveur pour le blog de l'accueil et le catalogue (contenu SEO), avec dépendances (`depends`) pour la relance.
- **Formulaires** : sveltekit-superforms + zod (`zod4` / `zod4Client`), form action serveur, `use:enhance`. Le formulaire fonctionne sans JavaScript.
- **Catalogue** : état dans l'URL, seule source de vérité. Filtrage, comptage disjonctif, tri et pagination sont des fonctions pures testées (`domains/catalog/common/models/`).
- **Icônes** : `@lucide/svelte`, uniquement via `src/core/ui/ui-kit/Icon.svelte` (règle ESLint), import par icône (`@lucide/svelte/icons/<nom>`).
- **Carrousel** : Embla Carousel 8 et son adaptateur Svelte, uniquement dans `src/features/carousel/` (règle ESLint). Sans JS, la piste reste en `overflow-x: auto` + `scroll-snap`.
- **Police** : Inter variable via `@fontsource-variable/inter`, servie localement. Unité de police : `px`.
- **Environnement** : variables déclarées et validées par zod dans `src/env.ts` (`defineEnvVars`), lues via `$app/env/public` et `$app/env/private`.
- **Langue** : français uniquement. URLs en français.
- **API** : aucune. Les dépôts des domaines (`api/`) renvoient des données en mémoire avec latence. `make api-types` génère `src/core/api/schema.d.ts` quand `API_SCHEMA_URL` est renseigné.
- **Cibles tactiles** : 44 px minimum (token `--spacing-touch`).
- **Ports** : dev 5173, Playwright 3120 (3121 pour le test du build sans routes de dev), Lighthouse 3220. Imposés pour ne pas entrer en collision avec les autres boilerplates.
- **Dépendances** : toutes en `devDependencies`. `adapter-node` embarque tout ce qui n'est pas en `dependencies`, le dossier `build/` est autonome et l'image Docker n'a pas de `node_modules`.

## Versions épinglées, et pourquoi

| Paquet                    | Version | Raison                                                                         |
| ------------------------- | ------- | ------------------------------------------------------------------------------ |
| `typescript`              | `~6.0`  | typescript-eslint 8 (`<6.1`), svelte-check 4 et SvelteKit 3 (`^6.0.0`) en peer |
| `jsdom`                   | `^29`   | jsdom 30 exige Node ≥ 24.15, le projet vise 24.14                              |
| `@types/node`             | `^24`   | aligné sur la version de Node visée                                            |
| `@testing-library/dom`    | `^10`   | peer de `@testing-library/jest-dom` et `user-event`                            |
| `@internationalized/date` | `^3`    | peer obligatoire de bits-ui                                                    |
| `embla-carousel(-svelte)` | `^8.6`  | la 9 n'existe qu'en release candidate                                          |

## Dépendances ajoutées hors de la stack imposée

- `eslint-plugin-simple-import-sort` : impose l'ordre externes, `@/`, relatifs, types, que le modèle Next obtenait d'`eslint-plugin-import`. Léger, compatible ESLint 10 et fichiers `.svelte`.
- `@internationalized/date` et `@testing-library/dom` : peers, voir le tableau.

## Règles ESLint propres au projet

- `@typescript-eslint/no-namespace` avec `allowDeclarations` : les types de domaine sont en `export declare namespace Xxx {}`.
- `no-restricted-imports` :
  - import profond d'un domaine (`@/domains/x/...`) interdit depuis `routes/`, `core/` et `features/`, sauf `index.server` ;
  - `@lucide/svelte` interdit hors du wrapper `Icon.svelte` ;
  - `embla-carousel*` interdit hors de `features/carousel/` ;
  - chemins relatifs à plus d'un niveau interdits.
- `no-undef` désactivé : recommandation de typescript-eslint, TypeScript vérifie déjà les identifiants (et la règle ne connaît pas les globaux de Svelte).
- Désactivations ponctuelles, chacune justifiée sur place :
  - `svelte/no-at-html-tags` dans `SeoHead.svelte` : JSON-LD sérialisé, `<` échappé ;
  - `a11y_no_noninteractive_tabindex` sur la piste du carrousel : sans focus, elle ne se défile pas au clavier sans JS (règle axe `scrollable-region-focusable`) ;
  - `a11y_no_static_element_interactions` sur le panneau du menu de catégories : gestion des flèches entre liens ;
  - `state_referenced_locally` dans `ContactForm.svelte` : superforms s'initialise une fois depuis les données de la page.
- `svelte/no-navigation-without-resolve` reste actif. Les chemins dynamiques (catalogue, config) passent par `resolveHref` (`src/core/routing`), qui concentre la conversion de type nécessaire.

## Pièges connus

- **SvelteKit 3 n'a plus de variable `ORIGIN` dans adapter-node.** L'origine vient de `paths.origin`, figée au build. Sans elle, adapter-node suppose `https` et tout POST de formulaire en `http://localhost` répond 403 (vérifié). `vite.config.ts` lit `ORIGIN` pendant `vite build` uniquement (le serveur de dev l'ignore). Le `Makefile` l'exporte depuis `.env` (`-include .env` puis `export`), Playwright et le Dockerfile la fournissent eux-mêmes. Un `yarn build` lancé hors de `make` ne lit pas `.env`.
- **SvelteKit 3 rend des `href` relatifs** (`./catalogue`) par défaut au rendu serveur. `paths.relative: false` les rend absolus, ce que les tests et le SEO attendent.
- **`goto` n'accepte plus `keepFocus` ni `noScroll`** : c'est `reset: false`. Les types `Path` de `$app/types` sont sans `/` initial.
- **`handleError` reçoit `{ kind, error }`** (et non plus `status`), `Handle` se trouve dans `@sveltejs/kit/hooks`.
- **`$app/env/public` exige le serveur de Kit** : Vitest le simule dans `vitest.setup.ts`.
- **`message()` de superforms sur un formulaire non validé renvoie 400.** Le succès vide `form.data` au lieu de recréer un formulaire.
- **Lighthouse en HTTP/1.1** : le serveur Node limite la simulation à 6 connexions et l'image LCP attendait derrière 14 `modulepreload` (accueil à 0,84). `hooks.server.ts` ne précharge que le CSS, et l'image du hero est préchargée en AVIF avec `imagesrcset`. Derrière un proxy HTTP/2, ce réglage peut être réévalué.
- **Lighthouse : 3 passages, assertions en médiane** (`aggregationMethod: median`). Sans cela, Lighthouse CI retient le meilleur passage et masque les pages fragiles. La simulation mobile partage un débit réduit entre toutes les requêtes : l'image LCP souffre de chaque octet chargé en parallèle. D'où `content-visibility: auto` sur les diapositives (les hors champ ne se téléchargent plus), une priorité basse sur les images produits 2 à 4, et des variantes 960 du hero et des diapositives (un téléphone à DPR 1,75 demande environ 720 px, la 640 ne suffit pas et la 1280 pèse le double). Les variantes 960 sont réencodées depuis les fichiers partagés avec une qualité calibrée pour reproduire leur compression (AVIF 42 pour le hero, 56 pour les diapositives, WebP 80).
- Lighthouse CI lance Chrome avec `--no-sandbox` : Ubuntu restreint les user namespaces et le bac à sable de Chrome ne démarre pas. Il ne visite que `localhost`. Les rapports restent en local (`.lighthouseci/`).
- Playwright vide `test-results/` à chaque run : les captures de mise en page vont dans `screenshots/` (ignoré par git).
- Un `aria-label` sur un `div` sans rôle est une violation axe (`aria-prohibited-attr`) : squelettes en `role="status"`, carrousel en `role="region"`.
- `--color-border` doit garder 3:1 sur blanc (WCAG 1.4.11) : axe ne le vérifie pas, la charte l'affiche.
- Le mode renforcé n'applique les espacements WCAG 1.4.12 qu'au texte de `<main>` hors `nav` et `[data-ui-chrome]`. Les sélecteurs globaux déforment l'en-tête (test de non-régression dans `tests/e2e/layout.e2e.ts`).
- `pkill -f "node build"` tue aussi le shell qui le lance : arrêter le serveur par son PID.
