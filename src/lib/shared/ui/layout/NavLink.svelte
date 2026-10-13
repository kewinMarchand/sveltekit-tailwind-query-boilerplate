<script lang="ts">
  import { page } from '$app/state'

  import { isActivePath } from '#lib/shared/config'
  import { resolveHref } from '#lib/shared/routing'

  import type { NavigationItem } from '#lib/shared/config'

  const { href, label }: NavigationItem = $props()

  const isActive = $derived(isActivePath(page.url.pathname, href))
</script>

<a href={resolveHref(href)} class="btn btn-nav" aria-current={isActive ? 'page' : undefined}>
  {label}
</a>
