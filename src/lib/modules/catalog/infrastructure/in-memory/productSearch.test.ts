import { DEFAULT_QUERY } from '#lib/modules/catalog/domain/catalogQuery'
import { Price } from '#lib/modules/catalog/domain/price'

import { countFacetValues, filterProducts, paginate, sortProducts } from './productSearch'

import type { Catalog } from '#lib/modules/catalog/domain/catalog'

const product = (overrides: Partial<Catalog.Product>): Catalog.Product => ({
  id: '1',
  slug: 'a',
  name: 'A',
  categorySlug: 'monstera',
  price: Price.fromCents(1000),
  exposure: 'soleil',
  size: 'M',
  inStock: true,
  image: 1,
  ...overrides,
})

const PRODUCTS = [
  product({
    id: '1',
    name: 'Bananier',
    price: Price.fromCents(3000),
    exposure: 'soleil',
    size: 'L',
  }),
  product({
    id: '2',
    name: 'Anthurium',
    price: Price.fromCents(1500),
    exposure: 'mi-ombre',
    size: 'M',
  }),
  product({
    id: '3',
    name: 'Calathea',
    price: Price.fromCents(2000),
    exposure: 'ombre',
    size: 'S',
    inStock: false,
  }),
  product({
    id: '4',
    name: 'Dracaena',
    price: Price.fromCents(1000),
    exposure: 'mi-ombre',
    size: 'L',
  }),
]

describe('filterProducts', () => {
  it('combine les facettes en ET et les valeurs d’une facette en OU', () => {
    const query: Catalog.Query = {
      ...DEFAULT_QUERY,
      exposures: ['soleil', 'mi-ombre'],
      sizes: ['L'],
    }
    expect(filterProducts(PRODUCTS, query).map((item) => item.id)).toEqual(['1', '4'])
  })

  it('filtre par prix en euros et par disponibilité', () => {
    const query: Catalog.Query = { ...DEFAULT_QUERY, priceMin: 12, priceMax: 25, inStock: true }
    expect(filterProducts(PRODUCTS, query).map((item) => item.id)).toEqual(['2'])
  })
})

describe('countFacetValues', () => {
  it('compte une facette sur les résultats filtrés par les autres seulement', () => {
    const query: Catalog.Query = {
      ...DEFAULT_QUERY,
      exposures: ['mi-ombre'],
      sizes: ['L'],
    }
    expect(countFacetValues(PRODUCTS, query, 'exposure', ['soleil', 'mi-ombre', 'ombre'])).toEqual([
      { value: 'soleil', count: 1 },
      { value: 'mi-ombre', count: 1 },
      { value: 'ombre', count: 0 },
    ])
    expect(countFacetValues(PRODUCTS, query, 'size', ['S', 'M', 'L'])).toEqual([
      { value: 'S', count: 0 },
      { value: 'M', count: 1 },
      { value: 'L', count: 1 },
    ])
  })
})

describe('sortProducts', () => {
  it('trie par prix et par nom sans muter l’entrée', () => {
    expect(sortProducts(PRODUCTS, 'prix-asc').map((item) => item.price)).toEqual([
      1000, 1500, 2000, 3000,
    ])
    expect(sortProducts(PRODUCTS, 'prix-desc')[0]?.price).toBe(3000)
    expect(sortProducts(PRODUCTS, 'nom').map((item) => item.name)).toEqual([
      'Anthurium',
      'Bananier',
      'Calathea',
      'Dracaena',
    ])
    expect(PRODUCTS[0]?.id).toBe('1')
  })
})

describe('paginate', () => {
  it('découpe par pages de 12', () => {
    const items = Array.from({ length: 25 }, (_, index) => index)
    expect(paginate(items, 3)).toEqual({ items: [24], page: 3, totalPages: 3 })
  })
})
