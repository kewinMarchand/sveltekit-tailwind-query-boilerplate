<script lang="ts">
  import type { IconName } from './iconNames'

  interface Props {
    name: IconName
    size?: number
    label?: string
  }

  const { name, size = 20, label }: Props = $props()
</script>

{#if label}
  <svg width={size} height={size} role="img" aria-label={label}>
    <use href="/icons.svg#{name}"></use>
  </svg>
{:else}
  <svg width={size} height={size} aria-hidden="true" focusable="false">
    <use href="/icons.svg#{name}"></use>
  </svg>
{/if}
