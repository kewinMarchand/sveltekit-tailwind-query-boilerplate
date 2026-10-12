import { error } from '@sveltejs/kit'

import { parseCatalogQuery } from '../domain/catalogQuery'
import { listCategoryPaths, parseCategorySlugs, toCategoryMenu } from '../domain/categoryPath'
import { findCatalogListing, findCategoryTree } from '../infrastructure/catalogRepository'
import { CatalogLoadError } from './CatalogLoadError'
import { CATALOG_DEPENDENCY } from './dependencies'

import type { Catalog } from '../domain/catalog'
import type { ServerLoadEvent } from '@sveltejs/kit'

type CatalogLoadEvent = Pick<ServerLoadEvent, 'url' | 'depends'> & { params: { slugs?: string } }

export const loadCatalogPage = async ({ params, url, depends }: CatalogLoadEvent) => {
  depends(CATALOG_DEPENDENCY)
  const slugs = parseCategorySlugs(params.slugs)

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

export const getCategoryMenu = () => toCategoryMenu(findCategoryTree())

export const listCatalogPaths = () => listCategoryPaths(findCategoryTree())
