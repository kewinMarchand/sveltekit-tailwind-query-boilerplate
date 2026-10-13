<script lang="ts">
  import Icon from './Icon.svelte'

  import type { HTMLInputAttributes } from 'svelte/elements'

  interface Props {
    name: string
    label: string
    value: string
    errors?: string[] | undefined
    hint?: string
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
    hint,
    disabled = false,
    multiline = false,
    type = 'text',
    autocomplete,
    required = false,
    'data-testid': testId,
  }: Props = $props()

  const uid = $props.id()
  const id = $derived(`${uid}-${name}`)
  const error = $derived(errors?.[0])
  const describedBy = $derived(
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined,
  )
</script>

<div class="bui-field">
  <label class="bui-field__label" for={id}
    >{label}{#if required}<span class="bui-field__required">&nbsp;(obligatoire)</span>{/if}</label
  >
  {#if hint}
    <p class="bui-field__hint" id="{id}-hint">{hint}</p>
  {/if}
  {#if multiline}
    <textarea
      class="bui-field__input bui-field__input--multiline"
      rows="4"
      {id}
      {name}
      {required}
      {disabled}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      data-testid={testId}
      bind:value></textarea>
  {:else}
    <input
      class="bui-field__input"
      {type}
      {autocomplete}
      {id}
      {name}
      {required}
      {disabled}
      aria-invalid={error ? 'true' : undefined}
      aria-describedby={describedBy}
      data-testid={testId}
      bind:value
    />
  {/if}
  {#if error}
    <p class="bui-field__error" id="{id}-error"><Icon name="circle-alert" />{error}</p>
  {/if}
</div>
