<script lang="ts">
  import { SORT_LABELS, SORTS } from '../common/models/catalog'
  import { queryEntries } from '../common/models/catalogQuery'
  import { catalogHref } from './hooks/useCatalogNavigation.svelte'

  import type { Catalog } from '../common/models/catalog'
  import type { AppPath } from '@/core/routing'
  import type { Snippet } from 'svelte'

  interface Props {
    path: AppPath
    query: Catalog.Query
    total: number
    onSortChange: (sort: Catalog.Sort) => void
    filterButton: Snippet
  }

  const { path, query, total, onSortChange, filterButton }: Props = $props()

  const sortId = $props.id()
  const keptFields = $derived(queryEntries(query, ['tri']))

  const handleSortChange = (event: Event) => {
    const select = event.currentTarget
    if (!(select instanceof HTMLSelectElement)) return
    const sort = SORTS.find((value) => value === select.value)
    if (sort) onSortChange(sort)
  }
</script>

<div class="catalog-toolbar" data-ui-chrome>
  {@render filterButton()}
  <p role="status" class="grow font-semibold" data-testid="catalog-results-count">
    {total}
    {total > 1 ? 'produits' : 'produit'}
  </p>
  <form method="GET" class="flex items-end gap-2">
    {#each keptFields as [name, value], index (`${name}-${index}`)}
      <input type="hidden" {name} {value} />
    {/each}
    <label for={sortId} class="field">
      Trier par
      <select
        id={sortId}
        name="tri"
        class="field-input"
        data-testid="catalog-sort"
        onchange={handleSortChange}
      >
        {#each SORTS as sort (sort)}
          <option value={sort} selected={sort === query.sort}>{SORT_LABELS[sort]}</option>
        {/each}
      </select>
    </label>
    <button type="submit" class="btn btn-outline js:hidden">Trier</button>
  </form>
  <nav aria-label="Affichage" class="flex gap-1">
    <a
      href={catalogHref(path, { ...query, view: 'grille' })}
      class="chip"
      aria-current={query.view === 'grille' ? 'page' : undefined}
      data-testid="catalog-view-grid">Grille</a
    >
    <a
      href={catalogHref(path, { ...query, view: 'liste' })}
      class="chip"
      aria-current={query.view === 'liste' ? 'page' : undefined}
      data-testid="catalog-view-list">Liste</a
    >
  </nav>
</div>
