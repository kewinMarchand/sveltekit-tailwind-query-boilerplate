import { render } from '@testing-library/svelte'

import Icon from './Icon.svelte'

describe('Icon', () => {
  it('produit le balisage bui-icon, masqué, qui pointe vers le sprite du site', () => {
    const { container } = render(Icon, { name: 'mail' })
    const svg = container.querySelector('svg')

    expect(svg).toHaveClass('bui-icon')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('use')).toHaveAttribute('href', '/icons.svg#mail')
  })
})
