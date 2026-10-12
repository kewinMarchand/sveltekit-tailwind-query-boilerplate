import { loadLatestArticles } from '#lib/modules/blog/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (event) => loadLatestArticles(event)
