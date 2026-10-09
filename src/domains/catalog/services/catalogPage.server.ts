import { error } from '@sveltejs/kit'

import { findCatalogListing, findCategoryTree } from '../api/catalogRepository'
import { CatalogLoadError } from '../common/exceptions/CatalogLoadError'
import { parseCatalogQuery } from '../common/models/catalogQuery'
import { categoryPath, listCategoryPaths } from '../common/models/categoryTree'
import { CATALOG_DEPENDENCY } from './dependencies'

import type { Catalog } from '../common/models/catalog'
import type { NavigationNode } from '@/core/config'
import type { ServerLoadEvent } from '@sveltejs/kit'

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
