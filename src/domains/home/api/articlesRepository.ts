import type { Article } from '../common/models/article'

const ARTICLES: Article.Entity[] = [
  {
    id: '1',
    title: 'Pourquoi rendre le contenu côté serveur',
    excerpt: 'Le contenu éditorial arrive dans le HTML initial : meilleur référencement et LCP.',
    imageBasePath: '/images/blog-1',
    publishedAt: '2026-09-15',
  },
  {
    id: '2',
    title: 'Un carrousel accessible sans dépendance',
    excerpt: 'Défilement natif, boutons explicites, pas de lecture automatique.',
    imageBasePath: '/images/blog-2',
    publishedAt: '2026-09-22',
  },
  {
    id: '3',
    title: 'Le mode accessibilité renforcée',
    excerpt: 'Texte agrandi, espacements WCAG 1.4.12 et contraste AAA, sans logique dupliquée.',
    imageBasePath: '/images/blog-3',
    publishedAt: '2026-10-01',
  },
]

const LATENCY_MS = 300

export const findLatestArticles = (): Promise<Article.Entity[]> =>
  new Promise((resolve) => setTimeout(() => resolve(ARTICLES), LATENCY_MS))
