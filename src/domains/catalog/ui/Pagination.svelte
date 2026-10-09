<script lang="ts">
  import { paginationWindow } from '../common/models/catalogListing'
  import { catalogHref } from './hooks/useCatalogNavigation.svelte'

  import type { Catalog } from '../common/models/catalog'
  import type { AppPath } from '@/core/routing'

  interface Props {
    path: AppPath
    query: Catalog.Query
    totalPages: number
  }

  const { path, query, totalPages }: Props = $props()

  const items = $derived(paginationWindow(query.page, totalPages))
  const hrefFor = (page: number) => catalogHref(path, { ...query, page })
</script>

{#if totalPages > 1}
  <nav aria-label="Pagination" class="mt-8" data-ui-chrome data-testid="catalog-pagination">
    <ul class="flex flex-wrap items-center gap-1">
      <li>
        {#if query.page > 1}
          <a href={hrefFor(query.page - 1)} rel="prev" class="page-link">Précédent</a>
        {:else}
          <span class="page-link text-text-muted" aria-disabled="true">Précédent</span>
        {/if}
      </li>
      {#each items as item, index (`${item}-${index}`)}
        <li>
          {#if item === 'ellipsis'}
            <span class="page-link" aria-hidden="true">…</span>
          {:else if item === query.page}
            <span class="page-link page-link-current" aria-current="page">
              <span class="sr-only">Page</span>
              {item}
            </span>
          {:else}
            <a href={hrefFor(item)} class="page-link">
              <span class="sr-only">Page</span>
              {item}
            </a>
          {/if}
        </li>
      {/each}
      <li>
        {#if query.page < totalPages}
          <a href={hrefFor(query.page + 1)} rel="next" class="page-link">Suivant</a>
        {:else}
          <span class="page-link text-text-muted" aria-disabled="true">Suivant</span>
        {/if}
      </li>
    </ul>
  </nav>
{/if}
