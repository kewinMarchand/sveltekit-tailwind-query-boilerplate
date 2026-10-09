import { loadCatalogPage } from '@/domains/catalog/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (event) => loadCatalogPage(event)
