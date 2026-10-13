<script lang="ts">
  import Icon from './Icon.svelte'

  import type { HTMLSelectAttributes } from 'svelte/elements'

  type Props = Omit<HTMLSelectAttributes, 'id' | 'class' | 'children'> & {
    id: string
    label: string
    options: readonly { value: string; label: string }[]
    value?: string
  }

  const { id, label, options, value, ...rest }: Props = $props()
</script>

<div class="bui-field">
  <label class="bui-field__label" for={id}>{label}</label>
  <div class="bui-select">
    <select class="bui-field__input bui-select__control" {id} {...rest}>
      {#each options as option (option.value)}
        <option value={option.value} selected={option.value === value}>{option.label}</option>
      {/each}
    </select>
    <Icon name="chevron-down" class="bui-select__icon" />
  </div>
</div>
