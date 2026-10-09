import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('le lien actif porte aria-current (desktop)', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Sur mobile, la navigation principale est dans le menu latéral.')
    await page.goto('/contact')

    const nav = page.getByRole('navigation', { name: 'Navigation principale' })
    await expect(nav.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page')
    await expect(nav.getByRole('link', { name: 'Accueil' })).not.toHaveAttribute('aria-current')
  })

  test('le logo mène à l’accueil et porte aria-current sur l’accueil', async ({ page }) => {
    await page.goto('/')
    const logo = page.getByTestId('layout-logo')

    await expect(logo).toHaveAttribute('href', '/')
    await expect(logo).toHaveAccessibleName('SvelteKit Tailwind Query Boilerplate')
    await expect(logo).toHaveAttribute('aria-current', 'page')

    await page.goto('/contact')
    await expect(page.getByTestId('layout-logo')).not.toHaveAttribute('aria-current')
  })

  test('le lien d’évitement mène au contenu principal', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')

    const skipLink = page.getByRole('link', { name: 'Aller au contenu principal' })
    await expect(skipLink).toBeFocused()
    await skipLink.press('Enter')
    await expect(page).toHaveURL(/#main$/)
  })

  test('le footer mène aux quatre pages légales', async ({ page }) => {
    await page.goto('/')

    const legal = page.getByRole('navigation', { name: 'Liens légaux' })
    await expect(legal.getByRole('link')).toHaveCount(4)
    await legal.getByRole('link', { name: 'Mentions légales' }).click()
    await expect(page.getByRole('heading', { level: 1, name: 'Mentions légales' })).toBeVisible()
  })
})
