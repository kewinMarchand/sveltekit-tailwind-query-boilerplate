import createClient from 'openapi-fetch'
import { API_URL } from '$app/env/public'

import type { paths } from './schema'

export type { components } from './schema'

/**
 * Client typé de l'API. `X-Scenario` (error, empty) n'a d'effet qu'en dev et en test côté API :
 * le relayer permet aux tests e2e de provoquer les états d'erreur et de liste vide.
 */
export const createApiClient = (fetch: typeof globalThis.fetch, scenario?: string | null) =>
  createClient<paths>({
    baseUrl: API_URL,
    fetch,
    headers: scenario ? { 'X-Scenario': scenario } : {},
  })
