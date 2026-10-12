const navigation = vi.hoisted(() => ({ afterNavigate: vi.fn() }))
vi.mock('$app/navigation', () => navigation)

import { isAudienceMeasurementEnabled, useMatomo } from './useMatomo.svelte'

describe('mesure d’audience sans variable', () => {
  it('n’injecte aucun script et n’écoute aucune navigation', () => {
    useMatomo()

    expect(isAudienceMeasurementEnabled).toBe(false)
    expect(navigation.afterNavigate).not.toHaveBeenCalled()
    expect(document.querySelectorAll('script')).toHaveLength(0)
    expect(window._paq).toBeUndefined()
  })
})
