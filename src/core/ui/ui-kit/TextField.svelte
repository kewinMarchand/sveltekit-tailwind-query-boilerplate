<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props {
    name: string
    label: string
    value: string
    errors?: string[] | undefined
    help?: string
    disabled?: boolean
    multiline?: boolean
    type?: HTMLInputAttributes['type']
    autocomplete?: HTMLInputAttributes['autocomplete']
    required?: boolean
    'data-testid'?: string
  }

  let {
    name,
    label,
    value = $bindable(),
    errors,
    help,
    disabled = false,
    multiline = false,
    type = 'text',
    autocomplete,
    required = false,
    'data-testid': testId,
  }: Props = $props()

  const id = $props.id()
  const inputId = $derived(`${id}-${name}`)
  const errorId = $derived(`${inputId}-error`)
  const helpId = $derived(`${inputId}-help`)
  const error = $derived(errors?.[0])
  const describedBy = $derived(
    [help && helpId, error && errorId].filter(Boolean).join(' ') || undefined,
  )
</script>

<div class="field">
  <label for={inputId}>{label}{required ? ' *' : ''}</label>
  {#if multiline}
    <textarea
      id={inputId}
      {name}
      rows="4"
      class="field-input"
      {required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      {disabled}
      data-testid={testId}
      bind:value></textarea>
  {:else}
    <input
      id={inputId}
      {name}
      {type}
      {autocomplete}
      class="field-input"
      {required}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      {disabled}
      data-testid={testId}
      bind:value
    />
  {/if}
  {#if help}
    <p id={helpId} class="text-body-sm text-text-muted">{help}</p>
  {/if}
  {#if error}
    <p id={errorId} class="field-error">{error}</p>
  {/if}
</div>
