import { error } from '@sveltejs/kit'

import { parseCatalogQuery } from '../domain/catalogQuery'
import { categoryPath, listCategoryPaths } from '../domain/categoryTree'
import { findCatalogListing, findCategoryTree } from '../infrastructure/catalogRepository'
import { CatalogLoadError } from './CatalogLoadError'
import { CATALOG_DEPENDENCY } from './dependencies'

import type { Catalog } from '../domain/catalog'
import type { ServerLoadEvent } from '@sveltejs/kit'
import type { NavigationNode } from '#lib/shared/config'

const MAX_DEPTH = 3

type CatalogLoadEvent = Pick<ServerLoadEvent, 'url' | 'depends'> & { params: { slugs?: string } }

export const loadCatalogPage = async ({ params, url, depends }: CatalogLoadEvent) => {
  depends(CATALOG_DEPENDENCY)
  const slugs = (params.slugs ?? '').split('/').filter(Boolean)
  if (slugs.length > MAX_DEPTH) error(404, 'Catégorie introuvable')

  const query = parseCatalogQuery(url.searchParams)

  let listing: Catalog.Listing | null
  try {
    listing = await findCatalogListing(slugs, query)
  } catch {
    const result: Catalog.Result = { status: 'error', message: new CatalogLoadError().message }
    return { query, result }
  }

  if (!listing) error(404, 'Catégorie introuvable')
  if (query.page > listing.totalPages) error(404, 'Page introuvable')

  const result: Catalog.Result = { status: 'success', listing }
  return { query, result }
}

const toNavigationNodes = (
  categories: Catalog.Category[],
  parents: string[] = [],
): NavigationNode[] =>
  categories.map((category) => {
    const slugs = [...parents, category.slug]
    return {
      id: category.slug,
      label: category.name,
      path: categoryPath(slugs),
      children: toNavigationNodes(category.children, slugs),
    }
  })

export const loadCategoryMenu = () => toNavigationNodes(findCategoryTree())

export const listCatalogPaths = () => listCategoryPaths(findCategoryTree())
