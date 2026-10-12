/**
 * Simulateur de l'API : filtre, comptage disjonctif, tri et pagination appartiennent au
 * fournisseur. Au branchement de l'API, ce dossier disparaît ou ne sert plus qu'aux tests.
 */
import { PAGE_SIZE } from '#lib/modules/catalog/domain/catalog'
import { eurosToCents } from '#lib/modules/catalog/domain/price'

import type { Catalog } from '#lib/modules/catalog/domain/catalog'

const matchesPrice = (product: Catalog.Product, query: Catalog.Query) =>
  (query.priceMin === undefined || product.price >= eurosToCents(query.priceMin)) &&
  (query.priceMax === undefined || product.price <= eurosToCents(query.priceMax))

export const filterProducts = (
  products: Catalog.Product[],
  query: Catalog.Query,
  ignoredFacet?: Catalog.Facet,
) =>
  products.filter(
    (product) =>
      (ignoredFacet === 'exposure' ||
        query.exposures.length === 0 ||
        query.exposures.includes(product.exposure)) &&
      (ignoredFacet === 'size' || query.sizes.length === 0 || query.sizes.includes(product.size)) &&
      matchesPrice(product, query) &&
      (!query.inStock || product.inStock),
  )

export const countFacetValues = <T extends string>(
  products: Catalog.Product[],
  query: Catalog.Query,
  facet: Catalog.Facet,
  values: readonly T[],
): Catalog.FacetCount<T>[] => {
  const candidates = filterProducts(products, query, facet)
  return values.map((value) => ({
    value,
    count: candidates.filter((product) => product[facet] === value).length,
  }))
}

const COLLATOR = new Intl.Collator('fr')

export const sortProducts = (products: Catalog.Product[], sort: Catalog.Sort) => {
  const sorted = [...products]
  if (sort === 'prix-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'prix-desc') sorted.sort((a, b) => b.price - a.price)
  if (sort === 'nom') sorted.sort((a, b) => COLLATOR.compare(a.name, b.name))
  return sorted
}

export const paginate = <T>(items: T[], page: number, pageSize = PAGE_SIZE) => {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  return {
    items: items.slice((page - 1) * pageSize, page * pageSize),
    page,
    totalPages,
  }
}
