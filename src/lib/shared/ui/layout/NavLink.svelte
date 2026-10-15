<script lang="ts">
  import { page } from '$app/state'

  import { isActivePath } from '#lib/shared/config'
  import { resolveHref } from '#lib/shared/routing'
  import { Button } from '#lib/shared/ui/kit'

  import type { NavigationItem } from '#lib/shared/config'

  const { href, label }: NavigationItem = $props()

  const isActive = $derived(isActivePath(page.url.pathname, href))
</script>

<Button href={resolveHref(href)} variant="nav" aria-current={isActive ? 'page' : undefined}>
  {label}
</Button>
