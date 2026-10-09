<script lang="ts">
  import Icon from './Icon.svelte'

  import type { IconName } from './Icon.svelte'
  import type { Snippet } from 'svelte'

  type Severity = 'error' | 'warning' | 'success' | 'info'

  interface Props {
    severity: Severity
    children: Snippet
    action?: Snippet
    'data-testid'?: string
  }

  const SEVERITY_ICONS: Record<Severity, IconName> = {
    error: 'circle-alert',
    warning: 'triangle-alert',
    success: 'circle-check',
    info: 'info',
  }

  const { severity, children, action, 'data-testid': testId }: Props = $props()
</script>

<div class={['alert', `alert-${severity}`]} data-testid={testId}>
  <Icon name={SEVERITY_ICONS[severity]} />
  <p class="grow">{@render children()}</p>
  {@render action?.()}
</div>
