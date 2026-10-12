import { render, screen } from '@testing-library/svelte'

import Icon from './Icon.svelte'

describe('Icon', () => {
  it('pointe vers le symbole du sprite et reste masquée sans libellé', () => {
    const { container } = render(Icon, { name: 'mail' })
    const svg = container.querySelector('svg')

    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg?.querySelector('use')).toHaveAttribute('href', '/icons.svg#mail')
  })

  it('porte un nom accessible quand un libellé est fourni', () => {
    render(Icon, { name: 'info', label: 'Information' })

    expect(screen.getByRole('img', { name: 'Information' })).toBeInTheDocument()
  })
})
