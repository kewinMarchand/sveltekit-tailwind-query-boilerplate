import { sendContactMessage } from '../infrastructure/sendContactMessage'
import { contactActions } from './contactPage.server'

vi.mock('../infrastructure/sendContactMessage', () => ({
  sendContactMessage: vi.fn(async () => ({ status: 'sent' })),
}))

const VALID = { name: 'Ada', email: 'ada@exemple.fr', message: 'Bonjour, ceci est un message.' }

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
    const result = await post(VALID)

    expect(result).not.toHaveProperty('status')
    expect(result).toMatchObject({
      form: { valid: true, message: { status: 'success' }, data: { name: '', email: '' } },
    })
  })

  it('relaie les violations 422 de l’API sous les champs concernés', async () => {
    vi.mocked(sendContactMessage).mockResolvedValueOnce({
      status: 'invalid',
      fieldErrors: [{ field: 'name', message: 'Votre nom ne doit pas dépasser 255 caractères.' }],
    })

    const result = await post(VALID)

    expect(result).toMatchObject({
      status: 422,
      data: { form: { errors: { name: ['Votre nom ne doit pas dépasser 255 caractères.'] } } },
    })
  })
})
