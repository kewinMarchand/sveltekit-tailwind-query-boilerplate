import {
  clearCatalogFilters,
  DEFAULT_QUERY,
  isIndexable,
  listActiveFilters,
  parseCatalogQuery,
  serializeCatalogQuery,
  updateCatalogQuery,
} from './catalogQuery'

const parse = (search: string) => parseCatalogQuery(new URLSearchParams(search))

describe('parseCatalogQuery', () => {
  it('lit chaque paramètre, avec les clés répétées', () => {
    expect(
      parse(
        'exposition=soleil&exposition=ombre&taille=M&prix_min=10&prix_max=40&en_stock=1&tri=prix-asc&vue=liste&page=2',
      ),
    ).toEqual({
      exposures: ['soleil', 'ombre'],
      sizes: ['M'],
      priceMin: 10,
      priceMax: 40,
      inStock: true,
      sort: 'prix-asc',
      view: 'liste',
      page: 2,
    })
  })

  it('ignore les valeurs invalides', () => {
    expect(
      parse('exposition=lune&taille=XL&prix_min=abc&tri=hasard&vue=mosaique&page=-3&en_stock=oui'),
    ).toEqual(DEFAULT_QUERY)
  })
})

describe('serializeCatalogQuery', () => {
  it('fait l’aller-retour sans perte', () => {
    const search =
      '?exposition=soleil&taille=S&taille=L&prix_max=30&en_stock=1&tri=nom&vue=liste&page=3'
    expect(serializeCatalogQuery(parse(search))).toBe(search)
  })

  it('omet les valeurs par défaut', () => {
    expect(serializeCatalogQuery(DEFAULT_QUERY)).toBe('')
  })
})

describe('updateCatalogQuery', () => {
  it('remet la page à 1 et conserve les autres paramètres', () => {
    const query = parse('vue=liste&tri=nom&page=2')
    expect(updateCatalogQuery(query, { exposures: ['soleil'] })).toEqual({
      ...query,
      exposures: ['soleil'],
      page: 1,
    })
  })
})

describe('filtres actifs', () => {
  it('liste une puce par filtre, chacune retirant le sien seulement', () => {
    const filters = listActiveFilters(parse('exposition=mi-ombre&taille=S&en_stock=1'))
    expect(filters.map((filter) => filter.label)).toEqual(['Mi-ombre', 'Taille petite', 'En stock'])
    expect(filters[0]?.query.exposures).toEqual([])
    expect(filters[0]?.query.sizes).toEqual(['S'])
  })

  it('tout effacer garde la vue et retire filtres et tri', () => {
    expect(clearCatalogFilters(parse('exposition=soleil&tri=nom&vue=liste'))).toEqual({
      ...DEFAULT_QUERY,
      view: 'liste',
    })
  })

  it('n’indexe que la liste sans filtre ni tri', () => {
    expect(isIndexable(parse('page=2'))).toBe(true)
    expect(isIndexable(parse('tri=nom'))).toBe(false)
  })
})
