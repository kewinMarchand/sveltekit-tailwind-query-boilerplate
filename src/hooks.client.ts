import {
  reportClientError,
  scheduleClientErrorReporting,
  shouldReportError,
} from '#lib/shared/observability'

import type { ClientInit, HandleClientError } from '@sveltejs/kit/hooks'

export const init: ClientInit = () => scheduleClientErrorReporting()

export const handleError: HandleClientError = ({ kind, error }) => {
  if (shouldReportError({ kind, scenario: null })) reportClientError(error)
  return { message: 'Une erreur est survenue.' }
}
