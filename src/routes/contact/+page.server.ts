import { contactActions, loadContactPage } from '#lib/modules/contact/index.server'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = () => loadContactPage()

export const actions: Actions = contactActions
