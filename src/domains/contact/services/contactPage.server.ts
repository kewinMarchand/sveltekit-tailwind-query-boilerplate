import { fail, message, superValidate } from 'sveltekit-superforms'
import { zod4 } from 'sveltekit-superforms/adapters'

import { sendContactMessage } from '../api/sendContactMessage'
import { contactSchema } from '../common/models/contactSchema'

import type { Contact } from '../common/models/contactSchema'

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

    try {
      await sendContactMessage(form.data)
    } catch {
      return message(form, { status: 'error' }, { status: 500 })
    }

    form.data = EMPTY_VALUES
    return message(form, { status: 'success' })
  },
}
