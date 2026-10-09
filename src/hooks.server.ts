import { MAINTENANCE } from '$app/env/private'

import { A11Y_MODE_INLINE_SCRIPT } from '@/core/a11y-mode'
import { MAINTENANCE_HTML, MAINTENANCE_RETRY_AFTER_SECONDS } from '@/core/errors'

import type { Handle, HandleServerError } from '@sveltejs/kit/hooks'

export const handle: Handle = ({ event, resolve }) => {
  if (MAINTENANCE === '1') {
    return new Response(MAINTENANCE_HTML, {
      status: 503,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'retry-after': String(MAINTENANCE_RETRY_AFTER_SECONDS),
      },
    })
  }

  return resolve(event, {
    preload: ({ type }) => type === 'css',
    transformPageChunk: ({ html }) => html.replace('%a11y-mode.script%', A11Y_MODE_INLINE_SCRIPT),
  })
}

export const handleError: HandleServerError = ({ kind, error }) => {
  if (kind === 'unknown') console.error(error)
  return { message: 'Une erreur est survenue.' }
}
