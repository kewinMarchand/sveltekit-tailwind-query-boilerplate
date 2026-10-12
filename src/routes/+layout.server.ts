import { loadCategoryMenu } from '#lib/modules/catalog/index.server'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = () => ({ categoryMenu: loadCategoryMenu() })
