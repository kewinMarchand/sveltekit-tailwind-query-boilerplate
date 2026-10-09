export const STATIC_ROUTES = [
  '/',
  '/taches',
  '/contact',
  '/catalogue',
  '/mentions-legales',
  '/donnees-personnelles',
  '/accessibilite',
  '/plan-du-site',
] as const

export const ROUTES = [...STATIC_ROUTES, '/catalogue/plantes-interieur/feuillages'] as const

export const MODES = ['standard', 'enhanced'] as const

export type Mode = (typeof MODES)[number]
