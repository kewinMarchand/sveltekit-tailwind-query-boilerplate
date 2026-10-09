import { render, screen } from '@testing-library/svelte'
import { superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

import { contactSchema } from '../common/models/contactSchema'
import ContactForm from './ContactForm.svelte'

import type { Contact } from '../common/models/contactSchema'

describe('ContactForm', () => {
  it('lie le message d’erreur au champ invalide', async () => {
    const data = await superValidate<Contact.FormValues, Contact.FormMessage>(
      { name: 'Ada', email: 'ada', message: 'Bonjour à tous' },
      zod4(contactSchema),
    )
    render(ContactForm, { data })

    const email = screen.getByTestId('contact-email')
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription(/adresse e-mail valide/)
    expect(screen.getByTestId('contact-name')).not.toHaveAttribute('aria-invalid')
  })

  it('confirme l’envoi quand le serveur renvoie un succès', async () => {
    const data = await superValidate<Contact.FormValues, Contact.FormMessage>(zod4(contactSchema))
    data.message = { status: 'success' }
    render(ContactForm, { data })

    expect(screen.getByTestId('contact-success')).toBeInTheDocument()
    expect(screen.queryByTestId('contact-error')).not.toBeInTheDocument()
  })
})
