<script lang="ts">
  import { ALL_NAVIGATION, CATALOG_NAVIGATION } from '@/core/config'
  import { resolveHref } from '@/core/routing'
  import { PageHeader } from '@/core/ui/layouts'

  import SitemapTree from './SitemapTree.svelte'

  import type { NavigationNode } from '@/core/config'

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
