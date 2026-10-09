import { loadHomePage } from '@/domains/home/index.server'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = (event) => loadHomePage(event)
