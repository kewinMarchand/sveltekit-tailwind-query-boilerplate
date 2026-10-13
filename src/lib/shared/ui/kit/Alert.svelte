<script lang="ts">
  import Icon from './Icon.svelte'

  import type { IconName } from './iconNames'
  import type { Snippet } from 'svelte'

  type Variant = 'info' | 'success' | 'warning' | 'error'

  interface Props {
    variant?: Variant
    title?: string
    role?: 'alert' | 'status'
    children: Snippet
    'data-testid'?: string
  }

  const VARIANTS: Record<Variant, { icon: IconName; prefix: string }> = {
    info: { icon: 'info', prefix: 'Information :' },
    success: { icon: 'circle-check', prefix: 'Succès :' },
    warning: { icon: 'triangle-alert', prefix: 'Attention :' },
    error: { icon: 'circle-alert', prefix: 'Erreur :' },
  }

  const { variant = 'info', title, role, children, 'data-testid': testId }: Props = $props()
</script>

<div class={['bui-alert', `bui-alert--${variant}`]} {role} data-testid={testId}>
  <Icon name={VARIANTS[variant].icon} class="bui-alert__icon" />
  <div class="bui-alert__content">
    <span class="bui-visually-hidden">{VARIANTS[variant].prefix}</span>
    {#if title}
      <p class="bui-alert__title">{title}</p>
    {/if}
    <div class="bui-alert__body">{@render children()}</div>
  </div>
</div>
