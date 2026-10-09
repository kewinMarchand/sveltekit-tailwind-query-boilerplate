import { contactActions } from './contactPage.server'

const post = (fields: Record<string, string>) =>
  contactActions.default({
    request: new Request('http://localhost/contact', {
      method: 'POST',
      body: new URLSearchParams(fields),
    }),
  })

describe('contactActions', () => {
  it('renvoie 400 et les erreurs du schéma quand le formulaire est invalide', async () => {
    const result = await post({ name: '', email: 'ada', message: '' })

    expect(result).toMatchObject({ status: 400 })
    expect(JSON.stringify(result)).toContain('adresse e-mail valide')
  })

  it('renvoie un message de succès et un formulaire vidé quand le formulaire est valide', async () => {
    const result = await post({
      name: 'Ada',
      email: 'ada@exemple.fr',
      message: 'Bonjour, ceci est un message.',
    })

    expect(result).not.toHaveProperty('status')
    expect(result).toMatchObject({
      form: { valid: true, message: { status: 'success' }, data: { name: '', email: '' } },
    })
  })
})
