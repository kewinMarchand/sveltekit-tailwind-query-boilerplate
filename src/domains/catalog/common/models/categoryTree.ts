import type { Catalog } from './catalog'
import type { AppPath } from '@/core/routing'

export const CATALOG_ROOT_PATH = '/catalogue' as const

export const findCategoryChain = (
  tree: Catalog.Category[],
  slugs: string[],
): Catalog.Category[] | null => {
  const chain: Catalog.Category[] = []
  let level = tree
  for (const slug of slugs) {
    const category = level.find((candidate) => candidate.slug === slug)
    if (!category) return null
    chain.push(category)
    level = category.children
  }
  return chain
}

export const collectLeafSlugs = (category: Catalog.Category): string[] =>
  category.children.length === 0
    ? [category.slug]
    : category.children.flatMap((child) => collectLeafSlugs(child))

export const categoryPath = (slugs: string[]): AppPath =>
  slugs.length > 0 ? `${CATALOG_ROOT_PATH}/${slugs.join('/')}` : CATALOG_ROOT_PATH

export const listCategoryPaths = (tree: Catalog.Category[], parents: string[] = []): AppPath[] =>
  tree.flatMap((category) => {
    const slugs = [...parents, category.slug]
    return [categoryPath(slugs), ...listCategoryPaths(category.children, slugs)]
  })
