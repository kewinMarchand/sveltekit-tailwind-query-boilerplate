import { EXPOSURES, SIZES } from '../common/models/catalog'
import {
  countFacetValues,
  filterProducts,
  paginate,
  sortProducts,
} from '../common/models/catalogListing'
import { categoryPath, collectLeafSlugs, findCategoryChain } from '../common/models/categoryTree'
import { CATEGORY_TREE, PRODUCTS } from './catalogData'

import type { Catalog } from '../common/models/catalog'

const LATENCY_MS = 300

const ROOT_DESCRIPTION =
  'Catalogue de notre jardinerie tropicale : plantes d’intérieur, d’extérieur et aquatiques, filtrables par exposition, taille et prix.'

const delay = <T>(value: T) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(value), LATENCY_MS))

const productsOf = (categories: Catalog.Category[]) => {
  const leaves = new Set(categories.flatMap((category) => collectLeafSlugs(category)))
  return PRODUCTS.filter((product) => leaves.has(product.categorySlug))
}

export const findCategoryTree = (): Catalog.Category[] => CATEGORY_TREE

export const findCatalogListing = (
  slugs: string[],
  query: Catalog.Query,
): Promise<Catalog.Listing | null> => {
  const chain = findCategoryChain(CATEGORY_TREE, slugs)
  if (!chain) return delay(null)

  const current = chain.at(-1)
  const children = current ? current.children : CATEGORY_TREE
  const branch = productsOf(current ? [current] : CATEGORY_TREE)
  const filtered = sortProducts(filterProducts(branch, query), query.sort)
  const { items, page, totalPages } = paginate(filtered, query.page)

  return delay({
    chain: chain.map((category, index) => ({
      slug: category.slug,
      name: category.name,
      path: categoryPath(slugs.slice(0, index + 1)),
    })),
    description: current?.description ?? ROOT_DESCRIPTION,
    children: children.map((child) => ({
      slug: child.slug,
      name: child.name,
      path: categoryPath([...slugs, child.slug]),
      count: filterProducts(productsOf([child]), query).length,
    })),
    products: items,
    total: filtered.length,
    page,
    totalPages,
    facets: {
      exposure: countFacetValues(branch, query, 'exposure', EXPOSURES),
      size: countFacetValues(branch, query, 'size', SIZES),
    },
  })
}
