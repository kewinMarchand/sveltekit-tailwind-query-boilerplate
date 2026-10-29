import { tick } from 'svelte'
import { PUBLIC_MATOMO_SITE_ID, PUBLIC_MATOMO_URL } from '$app/env/public'
import { afterNavigate } from '$app/navigation'

import { matomoConfig, pageViewCommands, setupCommands } from './matomo'
import { mesureRefusee } from './oppositionMesure'

import type { MatomoCommand } from './matomo'

declare global {
  interface Window {
    _paq?: { push: (command: MatomoCommand) => unknown }
  }
}

const config = matomoConfig(PUBLIC_MATOMO_URL, PUBLIC_MATOMO_SITE_ID)

export const isAudienceMeasurementEnabled = config !== null

const loadTracker = (scriptUrl: string) => {
  const script = document.createElement('script')
  script.async = true
  script.src = scriptUrl
  document.head.append(script)
}

/** Une page vue par navigation, y compris côté client, avec l'URL et le titre à jour. */
export const useMatomo = () => {
  if (!config) return
  let previousUrl: string | undefined

  afterNavigate(async ({ to }) => {
    // Refus lu avant la première commande (section 16 de la spec) : ni file, ni script, ni requête.
    if (!to || mesureRefusee()) return
    const pending: MatomoCommand[] = []
    const queue = (window._paq ??= pending)
    if (previousUrl === undefined) {
      setupCommands(config).forEach((command) => queue.push(command))
      loadTracker(config.scriptUrl)
    }
    await tick()
    pageViewCommands({ url: to.url.href, title: document.title, referrer: previousUrl }).forEach(
      (command) => queue.push(command),
    )
    previousUrl = to.url.href
  })
}
