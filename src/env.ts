import { defineEnvVars } from '@sveltejs/kit/env'
import { z } from 'zod'

const flag = z.enum(['0', '1']).default('0')

export const variables = defineEnvVars({
  PUBLIC_SITE_URL: {
    public: true,
    schema: z.url().default('http://localhost:5173'),
    description: 'URL publique du site, pour les URL canoniques, Open Graph et le sitemap',
  },
  MAINTENANCE: {
    schema: flag,
    description: 'À 1, toutes les pages répondent 503 avec la page de maintenance statique',
  },
  DEV_ROUTES: {
    schema: flag,
    description: 'À 1, expose les routes de développement (charte graphique, erreur de test)',
  },
})
