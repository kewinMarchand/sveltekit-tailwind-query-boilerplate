<script lang="ts">
  import { Button } from 'bits-ui'

  import Icon from './Icon.svelte'

  import type { ComponentProps } from 'svelte'

  type Variant = 'primary' | 'outline' | 'outline-light' | 'inherit' | 'nav'

  type Props = ComponentProps<typeof Button.Root> & {
    variant?: Variant
    loading?: boolean
  }

  const {
    variant = 'primary',
    loading = false,
    class: className,
    children,
    ...rest
  }: Props = $props()
</script>

<Button.Root
  class={['btn', `btn-${variant}`, className]}
  aria-busy={loading || undefined}
  {...rest}
  disabled={loading || rest.disabled}
>
  {#if loading}
    <span class="motion-safe:animate-spin"><Icon name="loader-circle" /></span>
  {/if}
  {@render children?.()}
</Button.Root>
