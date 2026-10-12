import { findCatalogListing } from '../infrastructure/catalogRepository'
import { loadCatalogPage } from './catalogPage.server'

import type * as CatalogRepository from '../infrastructure/catalogRepository'

vi.mock('../infrastructure/catalogRepository', async (importOriginal) => {
  const original = await importOriginal<typeof CatalogRepository>()
  return { ...original, findCatalogListing: vi.fn(original.findCatalogListing) }
})

const params = (search = '') => new URLSearchParams(search)

describe('loadCatalogPage', () => {
  it('renvoie la page d’une catégorie connue', async () => {
    const page = await loadCatalogPage('plantes-interieur/feuillages', params('tri=nom'))

    expect(page.status).toBe('ok')
    if (page.status !== 'ok' || page.result.status !== 'success') throw new Error('page attendue')
    expect(page.query.sort).toBe('nom')
    expect(page.result.listing.chain.map((link) => link.slug)).toEqual([
      'plantes-interieur',
      'feuillages',
    ])
  })

  it('déclare introuvables une catégorie inconnue, un chemin trop profond et une page hors bornes', async () => {
    expect(await loadCatalogPage('inconnue', params())).toEqual({ status: 'not-found' })
    expect(await loadCatalogPage('a/b/c/d', params())).toEqual({ status: 'not-found' })
    expect(await loadCatalogPage(undefined, params('page=9'))).toEqual({ status: 'not-found' })
  })

  it('transforme un échec du dépôt en résultat d’erreur affichable', async () => {
    vi.mocked(findCatalogListing).mockRejectedValueOnce(new Error('panne'))

    const page = await loadCatalogPage(undefined, params())

    expect(page).toEqual({
      status: 'ok',
      query: expect.objectContaining({ page: 1 }),
      result: { status: 'error', message: 'Impossible de charger le catalogue pour le moment.' },
    })
  })
})
