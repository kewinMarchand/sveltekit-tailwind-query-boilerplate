<script lang="ts">
  import { resolveHref } from '@/core/routing'

  import { EXPOSURE_LABELS, SIZE_LABELS } from '../common/models/catalog'
  import { queryEntries } from '../common/models/catalogQuery'

  import type { Catalog } from '../common/models/catalog'

  interface Props {
    query: Catalog.Query
    listing: Catalog.Listing
    onsubmit: (event: Event) => void
  }

  const { query, listing, onsubmit }: Props = $props()

  const keptFields = $derived(
    queryEntries(query, ['exposition', 'taille', 'prix_min', 'prix_max', 'en_stock']),
  )
</script>

<form
  method="GET"
  class="flex flex-col gap-4"
  data-testid="catalog-filters"
  onchange={onsubmit}
  {onsubmit}
>
  {#each keptFields as [name, value] (name)}
    <input type="hidden" {name} {value} />
  {/each}

  {#if listing.children.length > 0}
    <details open class="facet">
      <summary>Catégorie</summary>
      <ul class="flex flex-col">
        {#each listing.children as child (child.slug)}
          <li>
            <a href={resolveHref(child.path)} class="facet-link">
              {child.name} <span class="text-text-muted">({child.count})</span>
            </a>
          </li>
        {/each}
      </ul>
    </details>
  {/if}

  <details open class="facet">
    <summary>Exposition</summary>
    <fieldset>
      <legend class="sr-only">Exposition</legend>
      {#each listing.facets.exposure as { value, count } (value)}
        {@const checked = query.exposures.includes(value)}
        <label class="facet-option">
          <input
            type="checkbox"
            name="exposition"
            {value}
            {checked}
            disabled={count === 0 && !checked}
            data-testid={`catalog-filter-exposure-${value}`}
          />
          {EXPOSURE_LABELS[value]} <span class="text-text-muted">({count})</span>
        </label>
      {/each}
    </fieldset>
  </details>

  <details open class="facet">
    <summary>Taille</summary>
    <fieldset>
      <legend class="sr-only">Taille</legend>
      {#each listing.facets.size as { value, count } (value)}
        {@const checked = query.sizes.includes(value)}
        <label class="facet-option">
          <input
            type="checkbox"
            name="taille"
            {value}
            {checked}
            disabled={count === 0 && !checked}
            data-testid={`catalog-filter-size-${value}`}
          />
          {SIZE_LABELS[value]} <span class="text-text-muted">({count})</span>
        </label>
      {/each}
    </fieldset>
  </details>

  <details open class="facet">
    <summary>Prix</summary>
    <fieldset class="flex flex-wrap gap-3">
      <legend class="sr-only">Prix en euros</legend>
      <label class="field w-28">
        Minimum (€)
        <input
          type="number"
          name="prix_min"
          min="0"
          inputmode="numeric"
          class="field-input"
          value={query.priceMin ?? ''}
          data-testid="catalog-filter-price-min"
        />
      </label>
      <label class="field w-28">
        Maximum (€)
        <input
          type="number"
          name="prix_max"
          min="0"
          inputmode="numeric"
          class="field-input"
          value={query.priceMax ?? ''}
          data-testid="catalog-filter-price-max"
        />
      </label>
    </fieldset>
  </details>

  <details open class="facet">
    <summary>Disponibilité</summary>
    <fieldset>
      <legend class="sr-only">Disponibilité</legend>
      <label class="facet-option">
        <input
          type="checkbox"
          role="switch"
          name="en_stock"
          value="1"
          class="switch"
          checked={query.inStock}
          data-testid="catalog-filter-in-stock"
        />
        En stock uniquement
      </label>
    </fieldset>
  </details>

  <button type="submit" class="btn btn-primary js:hidden">Appliquer les filtres</button>
</form>
