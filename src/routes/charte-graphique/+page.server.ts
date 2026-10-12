import { assertDevRoutesEnabled } from '#lib/shared/errors/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = () => {
  assertDevRoutesEnabled()
}
