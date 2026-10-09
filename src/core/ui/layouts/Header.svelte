<script lang="ts">
  import { resolve } from '$app/paths'
  import { page } from '$app/state'

  import { A11yModeToggle } from '@/core/a11y-mode'
  import { CATALOG_NAVIGATION, MAIN_NAVIGATION, SITE } from '@/core/config'

  import CategoryMenu from './CategoryMenu.svelte'
  import MobileMenu from './MobileMenu.svelte'
  import NavLink from './NavLink.svelte'

  import type { NavigationNode } from '@/core/config'

  interface Props {
    categoryMenu: NavigationNode[]
  }

  const { categoryMenu }: Props = $props()

  const [home, ...otherLinks] = MAIN_NAVIGATION
</script>

<header class="bg-primary text-on-primary">
  <div class="container-page flex min-h-16 flex-wrap items-center gap-2 py-2">
    <a
      href={resolve('/')}
      class="logo-link grow"
      aria-current={page.url.pathname === '/' ? 'page' : undefined}
      data-testid="layout-logo"
    >
      <img src="/logo-mark.svg" alt="" width="40" height="40" />
      {SITE.name}
    </a>
    <nav aria-label="Navigation principale" class="js:max-lg:hidden">
      <ul class="flex flex-wrap gap-1">
        {#if home}
          <li><NavLink {...home} /></li>
        {/if}
        <li class="js:hidden"><NavLink {...CATALOG_NAVIGATION} /></li>
        <li class="hidden js:block"><CategoryMenu nodes={categoryMenu} /></li>
        {#each otherLinks as item (item.href)}
          <li><NavLink {...item} /></li>
        {/each}
      </ul>
    </nav>
    <A11yModeToggle />
    <div class="hidden js:max-lg:block">
      <MobileMenu nodes={categoryMenu} />
    </div>
  </div>
</header>
