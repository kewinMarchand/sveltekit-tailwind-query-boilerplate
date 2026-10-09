<script lang="ts">
  import { listActiveFilters } from '../common/models/catalogQuery'
  import { catalogHref } from './hooks/useCatalogNavigation.svelte'

  import type { Catalog } from '../common/models/catalog'
  import type { AppPath } from '@/core/routing'
  import type { Snippet } from 'svelte'

  interface Props {
    path: AppPath
    query: Catalog.Query
    clearAction: Snippet
  }

  const { path, query, clearAction }: Props = $props()

  const filters = $derived(listActiveFilters(query))
</script>

{#if filters.length > 0}
  <div
    class="mb-4 flex flex-wrap items-center gap-2"
    data-ui-chrome
    data-testid="catalog-active-filters"
  >
    <ul class="flex flex-wrap gap-2">
      {#each filters as filter (filter.label)}
        <li>
          <a
            href={catalogHref(path, filter.query)}
            class="chip"
            data-testid="catalog-active-filter"
          >
            <span class="sr-only">Retirer le filtre :</span>
            {filter.label}
            <span aria-hidden="true">×</span>
          </a>
        </li>
      {/each}
    </ul>
    {@render clearAction()}
  </div>
{/if}
