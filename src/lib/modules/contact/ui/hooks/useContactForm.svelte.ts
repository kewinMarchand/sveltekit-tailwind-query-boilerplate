import { superForm } from 'sveltekit-superforms'
import { zod4Client } from 'sveltekit-superforms/adapters'

import { contactSchema } from '#lib/modules/contact/domain/contactSchema'

import type { Contact } from '#lib/modules/contact/domain/contactSchema'
import type { SuperValidated } from 'sveltekit-superforms'

export const useContactForm = (initial: SuperValidated<Contact.FormValues, Contact.FormMessage>) =>
  superForm(initial, {
    validators: zod4Client(contactSchema),
    validationMethod: 'onblur',
  })
