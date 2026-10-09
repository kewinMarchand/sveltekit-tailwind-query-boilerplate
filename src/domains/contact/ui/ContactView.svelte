<script lang="ts">
  import { PageHeader } from '@/core/ui/layouts'

  import ContactForm from './ContactForm.svelte'

  import type { Contact } from '../common/models/contactSchema'
  import type { SuperValidated } from 'sveltekit-superforms'

  interface Props {
    form: SuperValidated<Contact.FormValues, Contact.FormMessage>
  }

  const { form }: Props = $props()
</script>

<PageHeader
  title="Contact"
  description="Démo de formulaire : validation par schéma zod avec superforms, erreurs liées aux champs, envoi par action serveur avec amélioration progressive."
/>

<p class="lead">
  Formulaire validé par un schéma zod, envoyé par une action serveur. Il fonctionne aussi sans
  JavaScript.
</p>
<ContactForm data={form} />
