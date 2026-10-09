import { assertDevRoutesEnabled } from '@/core/errors/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  assertDevRoutesEnabled()
}
