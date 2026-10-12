<script lang="ts">
  import { ALL_NAVIGATION, CATALOG_NAVIGATION } from '#lib/shared/config'
  import { resolveHref } from '#lib/shared/routing'
  import { PageHeader } from '#lib/shared/ui/layout'

  import SitemapTree from './SitemapTree.svelte'

  import type { NavigationNode } from '#lib/shared/config'

  interface Props {
    categories: NavigationNode[]
  }

  const { categories }: Props = $props()
</script>

<PageHeader
  title="Plan du site"
  description="Plan du site : toutes les pages accessibles, dont chaque catégorie du catalogue de plantes tropicales."
/>

<div class="prose-legal">
  <ul data-testid="legal-sitemap">
    {#each ALL_NAVIGATION as item (item.href)}
      <li>
        <a href={resolveHref(item.href)}>{item.label}</a>
        {#if item.href === CATALOG_NAVIGATION.href}
          <SitemapTree nodes={categories} />
        {/if}
      </li>
    {/each}
  </ul>
</div>
