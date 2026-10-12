import { tick } from 'svelte'
import { afterNavigate, goto, invalidate } from '$app/navigation'
import { navigating, page } from '$app/state'

import { CATALOG_DEPENDENCY } from '#lib/modules/catalog/application/dependencies'
import {
  queryFromFormData,
  serializeCatalogQuery,
  updateCatalogQuery,
} from '#lib/modules/catalog/domain/catalogQuery'
import { resolveHref } from '#lib/shared/routing'

import type { Catalog } from '#lib/modules/catalog/domain/catalog'
import type { AppPath } from '#lib/shared/routing'

const CATALOG_ROUTE_ID = '/catalogue/[...slugs]'
const PAGE_TITLE_ID = 'page-title'

export const catalogHref = (path: AppPath, query: Catalog.Query) =>
  resolveHref(`${path}${serializeCatalogQuery(query)}`)

export const useCatalogNavigation = (getPath: () => AppPath, getQuery: () => Catalog.Query) => {
  const apply = (query: Catalog.Query) => goto(catalogHref(getPath(), query), { reset: false })

  afterNavigate(async ({ type }) => {
    if (type === 'enter') return
    await tick()
    const active = document.activeElement
    if (!active || active === document.body) {
      document.getElementById(PAGE_TITLE_ID)?.focus()
    }
  })

  return {
    get pending() {
      return (
        navigating.to?.route.id === CATALOG_ROUTE_ID && navigating.from?.route.id === page.route.id
      )
    },
    update(patch: Partial<Omit<Catalog.Query, 'page'>>) {
      void apply(updateCatalogQuery(getQuery(), patch))
    },
    submitForm(event: Event) {
      event.preventDefault()
      const form = event.currentTarget
      if (form instanceof HTMLFormElement) void apply(queryFromFormData(new FormData(form)))
    },
    retry() {
      void invalidate(CATALOG_DEPENDENCY)
    },
  }
}
