<script lang="ts">
  import { TextField } from '@/core/ui/ui-kit'

  import Section from './Section.svelte'

  let text = $state('')
  let email = $state('ada')
  let message = $state('')
  let disabledValue = $state('Valeur figée')
</script>

<Section id="formulaires" title="Formulaires">
  <form class="grid max-w-form gap-4" onsubmit={(event) => event.preventDefault()}>
    <TextField
      name="sg-text"
      label="Champ texte"
      help="Aide : 2 caractères minimum."
      bind:value={text}
    />
    <TextField
      name="sg-email"
      label="E-mail"
      type="email"
      errors={['Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.']}
      bind:value={email}
    />
    <label class="field">
      Nombre
      <input type="number" inputmode="numeric" class="field-input" min="0" value="12" />
    </label>
    <TextField name="sg-message" label="Zone de texte" multiline bind:value={message} />
    <label class="field">
      Liste déroulante
      <select class="field-input">
        <option>Première option</option>
        <option>Seconde option</option>
      </select>
    </label>
    <label class="facet-option">
      <input type="checkbox" class="size-5 accent-primary" checked />
      Case à cocher
    </label>
    <label class="facet-option">
      <input type="checkbox" role="switch" class="switch" />
      Interrupteur
    </label>
    <fieldset class="flex flex-col">
      <legend class="mb-1">Boutons radio</legend>
      <label class="facet-option"
        ><input type="radio" name="sg-radio" class="size-5 accent-primary" checked /> Option A</label
      >
      <label class="facet-option"
        ><input type="radio" name="sg-radio" class="size-5 accent-primary" /> Option B</label
      >
    </fieldset>
    <TextField name="sg-disabled" label="Champ désactivé" disabled bind:value={disabledValue} />
  </form>
</Section>
