import { dev } from '$app/env'
import { GLITCHTIP_DSN } from '$app/env/private'
import { PUBLIC_GLITCHTIP_ENVIRONMENT } from '$app/env/public'

import { errorReportingConfig, glitchtipOptions } from './errorReporting'

import type * as Sentry from '@sentry/sveltekit'

let sentry: typeof Sentry | null = null

/** Charge le SDK serveur seulement si un DSN est fourni : sans DSN, rien n'est importé. */
export const initServerErrorReporting = async () => {
  const config = errorReportingConfig(GLITCHTIP_DSN, PUBLIC_GLITCHTIP_ENVIRONMENT, dev)
  if (!config) return
  sentry = await import('@sentry/sveltekit')
  sentry.init({
    ...glitchtipOptions(config),
    integrations: (defaults) =>
      defaults.map((integration) =>
        integration.name === 'Http' && sentry
          ? sentry.httpIntegration({ maxRequestBodySize: 'none' })
          : integration,
      ),
  })
}

export const reportServerError = (error: unknown) => {
  sentry?.captureException(error)
}
