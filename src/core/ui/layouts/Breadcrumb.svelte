<script lang="ts">
  import { resolveHref } from '@/core/routing'

  import type { Seo } from '@/core/seo'

  interface Props {
    items: Seo.BreadcrumbItem[]
  }

  const { items }: Props = $props()
</script>

<nav aria-label="Fil d'Ariane" class="breadcrumb" data-testid="layout-breadcrumb">
  <ol>
    {#each items as item, index (item.path)}
      <li>
        {#if index === items.length - 1}
          <span aria-current="page">{item.label}</span>
        {:else}
          <a href={resolveHref(item.path)}>{item.label}</a>
        {/if}
      </li>
    {/each}
  </ol>
</nav>
