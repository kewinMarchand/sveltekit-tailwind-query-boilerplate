import { PAGE_SIZE } from './catalog'

import type { Catalog } from './catalog'

const matchesPrice = (product: Catalog.Product, query: Catalog.Query) =>
  (query.priceMin === undefined || product.price >= query.priceMin * 100) &&
  (query.priceMax === undefined || product.price <= query.priceMax * 100)

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

const WINDOW_THRESHOLD = 7

export const paginationWindow = (current: number, total: number): Catalog.PaginationItem[] => {
  if (total <= WINDOW_THRESHOLD) return Array.from({ length: total }, (_, index) => index + 1)

  const pages = [1, current - 1, current, current + 1, total].filter(
    (page, index, all) => page >= 1 && page <= total && all.indexOf(page) === index,
  )

  return pages.flatMap((page, index): Catalog.PaginationItem[] => {
    const previous = pages[index - 1]
    return previous !== undefined && page - previous > 1 ? ['ellipsis', page] : [page]
  })
}
