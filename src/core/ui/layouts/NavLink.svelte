<script lang="ts">
  import { page } from '$app/state'

  import { isActivePath } from '@/core/config'
  import { resolveHref } from '@/core/routing'
  import { Button } from '@/core/ui/ui-kit'

  import type { NavigationItem } from '@/core/config'

  const { href, label }: NavigationItem = $props()

  const isActive = $derived(isActivePath(page.url.pathname, href))
</script>

<Button href={resolveHref(href)} variant="nav" aria-current={isActive ? 'page' : undefined}>
  {label}
</Button>
