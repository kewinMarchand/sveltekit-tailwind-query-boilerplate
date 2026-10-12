import { error } from '@sveltejs/kit'
import { dev } from '$app/env'
import { DEV_ROUTES } from '$app/env/private'

export const assertDevRoutesEnabled = () => {
  if (!dev && DEV_ROUTES !== '1') error(404, 'Page introuvable')
}
