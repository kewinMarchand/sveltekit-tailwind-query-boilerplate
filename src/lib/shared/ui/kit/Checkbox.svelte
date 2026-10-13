<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'

  type Props = Omit<HTMLInputAttributes, 'id' | 'type' | 'class' | 'role'> & {
    id: string
    label: string
    /** Interrupteur : case native avec `role="switch"`. */
    switch?: boolean
  }

  const { id, label, switch: isSwitch = false, ...rest }: Props = $props()

  const block = $derived(isSwitch ? 'bui-switch' : 'bui-checkbox')
</script>

<div class={block}>
  <input
    class="{block}__input"
    {id}
    type="checkbox"
    role={isSwitch ? 'switch' : undefined}
    {...rest}
  />
  <label class="{block}__label" for={id}>{label}</label>
</div>
