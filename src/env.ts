import { defineEnvVars } from '@sveltejs/kit/env'
import { z } from 'zod'

const flag = z.enum(['0', '1']).default('0')
const optionalUrl = z
  .union([z.literal(''), z.url()])
  .optional()
  .transform((value) => value || undefined)
const optionalText = z
  .string()
  .optional()
  .transform((value) => value || undefined)

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
  GLITCHTIP_DSN: {
    schema: optionalUrl,
    description: 'DSN GlitchTip du serveur. Vide : aucun suivi des erreurs côté serveur',
  },
  PUBLIC_GLITCHTIP_DSN: {
    public: true,
    schema: optionalUrl,
    description: 'DSN GlitchTip du navigateur. Vide : aucun SDK chargé, aucune requête',
  },
  PUBLIC_GLITCHTIP_ENVIRONMENT: {
    public: true,
    schema: optionalText,
    description: 'Environnement déclaré à GlitchTip (défaut : development ou production)',
  },
  DEV_ROUTES: {
    schema: flag,
    description: 'À 1, expose les routes de développement (charte graphique, erreur de test)',
  },
})
