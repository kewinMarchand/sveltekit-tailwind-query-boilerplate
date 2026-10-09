import { contactActions, loadContactPage } from '@/domains/contact/index.server'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = () => loadContactPage()

export const actions: Actions = contactActions
