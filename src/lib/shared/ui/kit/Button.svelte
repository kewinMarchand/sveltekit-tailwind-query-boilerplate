<script lang="ts">
  import Icon from './Icon.svelte'

  import type { IconName } from './iconNames'
  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements'

  type Props = Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'children'> & {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'inverse' | 'nav'
    size?: 'sm' | 'md' | 'lg'
    /** Lien en forme de bouton : même classes sur un `<a>`. */
    href?: string
    loading?: boolean
    icon?: IconName
    children: Snippet
  }

  const {
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    disabled,
    loading = false,
    icon,
    class: className,
    children,
    ...rest
  }: Props = $props()

  const classes = $derived([
    'bui-button',
    variant !== 'primary' && `bui-button--${variant}`,
    size !== 'md' && `bui-button--${size}`,
    className,
  ])
</script>

{#snippet content()}
  {#if loading}
    <Icon name="loader-circle" class="bui-button__spinner" />
  {:else if icon}
    <Icon name={icon} />
  {/if}
  {@render children()}
  {#if loading}
    <span class="bui-visually-hidden">&nbsp;(chargement en cours)</span>
  {/if}
{/snippet}

{#if href}
  <a {href} class={classes} {...rest}>{@render content()}</a>
{:else}
  <button {type} class={classes} {disabled} aria-disabled={loading ? 'true' : undefined} {...rest}>
    {@render content()}
  </button>
{/if}
