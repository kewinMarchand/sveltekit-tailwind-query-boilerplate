<script lang="ts">
  import { Alert, Button, Icon, TextField } from '@/core/ui/ui-kit'

  import { useContactForm } from './hooks/useContactForm.svelte'

  import type { Contact } from '../common/models/contactSchema'
  import type { SuperValidated } from 'sveltekit-superforms'

  interface Props {
    data: SuperValidated<Contact.FormValues, Contact.FormMessage>
  }

  const { data }: Props = $props()

  // svelte-ignore state_referenced_locally
  const { form, errors, message, submitting, enhance } = useContactForm(data)
</script>

<form method="POST" novalidate class="flex max-w-form flex-col gap-4" use:enhance>
  <TextField
    name="name"
    label="Nom"
    autocomplete="name"
    required
    errors={$errors.name}
    data-testid="contact-name"
    bind:value={$form.name}
  />
  <TextField
    name="email"
    label="E-mail"
    type="email"
    autocomplete="email"
    required
    errors={$errors.email}
    data-testid="contact-email"
    bind:value={$form.email}
  />
  <TextField
    name="message"
    label="Message"
    multiline
    required
    errors={$errors.message}
    data-testid="contact-message"
    bind:value={$form.message}
  />
  <Button type="submit" loading={$submitting} data-testid="contact-submit">
    <Icon name="mail" />
    Envoyer
  </Button>
  <div aria-live="polite">
    {#if $message?.status === 'success'}
      <Alert severity="success" data-testid="contact-success">
        Merci, votre message a bien été envoyé.
      </Alert>
    {:else if $message?.status === 'error'}
      <Alert severity="error" data-testid="contact-error">
        L'envoi a échoué. Réessayez dans quelques instants.
      </Alert>
    {/if}
  </div>
</form>
