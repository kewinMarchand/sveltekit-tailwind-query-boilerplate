import { fail, message, setError, superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

import { contactSchema } from '../domain/contactSchema'
import { sendContactMessage } from '../infrastructure/sendContactMessage'

import type { Contact } from '../domain/contactSchema'

const contactAdapter = zod4(contactSchema)

const EMPTY_VALUES: Contact.FormValues = { name: '', email: '', message: '' }

export const loadContactPage = async () => ({
  form: await superValidate<Contact.FormValues, Contact.FormMessage>(contactAdapter),
})

export const contactActions = {
  default: async ({ request }: { request: Request }) => {
    const form = await superValidate<Contact.FormValues, Contact.FormMessage>(
      request,
      contactAdapter,
    )

    if (!form.valid) {
      return fail(400, { form })
    }

    let result
    try {
      result = await sendContactMessage(form.data)
    } catch {
      return message(form, { status: 'error' }, { status: 500 })
    }

    if (result.status === 'invalid') {
      for (const { field, message: error } of result.fieldErrors) setError(form, field, error)
      return fail(422, { form })
    }

    form.data = EMPTY_VALUES
    return message(form, { status: 'success' })
  },
}
