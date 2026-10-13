import { getCategoryMenu } from '#lib/modules/catalog/index.server'

import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async () => ({ categoryMenu: await getCategoryMenu() })
