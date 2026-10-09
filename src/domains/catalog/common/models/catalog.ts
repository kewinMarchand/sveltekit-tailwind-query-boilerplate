import type { AppPath } from '@/core/routing'

export const EXPOSURES = ['soleil', 'mi-ombre', 'ombre'] as const
export const SIZES = ['S', 'M', 'L'] as const
export const SORTS = ['pertinence', 'prix-asc', 'prix-desc', 'nom'] as const
export const VIEWS = ['grille', 'liste'] as const
export const PAGE_SIZE = 12

export const EXPOSURE_LABELS: Record<Catalog.Exposure, string> = {
  soleil: 'Soleil',
  'mi-ombre': 'Mi-ombre',
  ombre: 'Ombre',
}

export const SIZE_LABELS: Record<Catalog.Size, string> = { S: 'Petite', M: 'Moyenne', L: 'Grande' }

export const SORT_LABELS: Record<Catalog.Sort, string> = {
  pertinence: 'Pertinence',
  'prix-asc': 'Prix croissant',
  'prix-desc': 'Prix décroissant',
  nom: 'Nom (A à Z)',
}

export declare namespace Catalog {
  type Exposure = (typeof EXPOSURES)[number]
  type Size = (typeof SIZES)[number]
  type Sort = (typeof SORTS)[number]
  type View = (typeof VIEWS)[number]
  type Facet = 'exposure' | 'size'

  interface Product {
    id: string
    slug: string
    name: string
    categorySlug: string
    price: number
    exposure: Exposure
    size: Size
    inStock: boolean
    image: number
  }

  interface Category {
    slug: string
    name: string
    description: string
    children: Category[]
  }

  interface CategoryLink {
    slug: string
    name: string
    path: AppPath
  }

  interface Query {
    exposures: Exposure[]
    sizes: Size[]
    priceMin: number | undefined
    priceMax: number | undefined
    inStock: boolean
    sort: Sort
    view: View
    page: number
  }

  interface FacetCount<T extends string> {
    value: T
    count: number
  }

  interface Facets {
    exposure: FacetCount<Exposure>[]
    size: FacetCount<Size>[]
  }

  interface Listing {
    chain: CategoryLink[]
    description: string
    children: (CategoryLink & { count: number })[]
    products: Product[]
    total: number
    page: number
    totalPages: number
    facets: Facets
  }

  type Result = { status: 'success'; listing: Listing } | { status: 'error'; message: string }

  type Status = 'pending' | 'error' | 'success'

  type PaginationItem = number | 'ellipsis'
}
