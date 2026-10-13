import { getRequestEvent } from '$app/server'

import { createApiClient } from './client'

/** Client de la requête en cours : `fetch` de SvelteKit et `X-Scenario` reçu relayé à l'API. */
export const serverApiClient = () => {
  const { fetch, request } = getRequestEvent()
  return createApiClient(fetch, request.headers.get('X-Scenario'))
}
