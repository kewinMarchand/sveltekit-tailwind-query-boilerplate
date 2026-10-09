import { assertDevRoutesEnabled } from '@/core/errors/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  assertDevRoutesEnabled()
  throw new Error('Erreur volontaire de la route de test')
}
