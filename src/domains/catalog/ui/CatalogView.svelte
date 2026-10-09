<script lang="ts">
  import { CATALOG_NAVIGATION } from '@/core/config'
  import { resolveHref } from '@/core/routing'
  import { absoluteUrl } from '@/core/seo'
  import { useIsDesktop } from '@/core/ui/hooks'
  import { PageHeader } from '@/core/ui/layouts'
  import { Icon, SidePanel } from '@/core/ui/ui-kit'

  import {
    clearCatalogFilters,
    countActiveFilters,
    isIndexable,
  } from '../common/models/catalogQuery'
  import { CATALOG_ROOT_PATH } from '../common/models/categoryTree'
  import ActiveFilters from './ActiveFilters.svelte'
  import CatalogFilters from './CatalogFilters.svelte'
  import CatalogToolbar from './CatalogToolbar.svelte'
  import { catalogHref, useCatalogNavigation } from './hooks/useCatalogNavigation.svelte'
  import Pagination from './Pagination.svelte'
  import ProductGrid from './ProductGrid.svelte'

  import type { Catalog } from '../common/models/catalog'
  import type { Seo } from '@/core/seo'

  interface Props {
    query: Catalog.Query
    result: Catalog.Result
  }

  const { query, result }: Props = $props()

  const listing = $derived(result.status === 'success' ? result.listing : undefined)
  const chain = $derived(listing?.chain ?? [])
  const current = $derived(chain.at(-1))
  const path = $derived(current?.path ?? CATALOG_ROOT_PATH)
  const title = $derived(current?.name ?? CATALOG_NAVIGATION.label)
  const parents = $derived<Seo.BreadcrumbItem[]>(
    current
      ? [
          { label: CATALOG_NAVIGATION.label, path: CATALOG_ROOT_PATH },
          ...chain.slice(0, -1).map((link) => ({ label: link.name, path: link.path })),
        ]
      : [],
  )
  const firstProduct = $derived(listing?.products[0])
  const seo = $derived<Omit<Seo.Input, 'title' | 'description' | 'path' | 'breadcrumb'>>({
    noindex: !isIndexable(query),
    canonicalPath: query.page >= 2 ? `${path}?page=${query.page}` : path,
    prevPath: query.page > 1 ? catalogHref(path, { ...query, page: query.page - 1 }) : undefined,
    nextPath:
      listing && query.page < listing.totalPages
        ? catalogHref(path, { ...query, page: query.page + 1 })
        : undefined,
    image: firstProduct && {
      path: `/images/product-${firstProduct.image}-800.webp`,
      width: 800,
      height: 800,
      alt: firstProduct.name,
    },
    jsonLd: listing && [
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: listing.products.map((product, index) => ({
          '@type': 'ListItem',
          position: (listing.page - 1) * listing.products.length + index + 1,
          name: product.name,
          url: absoluteUrl(`${path}#${product.slug}`),
        })),
      },
    ],
  })

  const navigation = useCatalogNavigation(
    () => path,
    () => query,
  )
  const isDesktop = useIsDesktop()
  let filtersOpen = $state(false)

  const status = $derived<Catalog.Status>(navigation.pending ? 'pending' : result.status)
  const activeCount = $derived(countActiveFilters(query))
</script>

<PageHeader
  {title}
  description={listing?.description ?? 'Catalogue de notre jardinerie tropicale.'}
  {parents}
  {seo}
/>

{#snippet clearAction()}
  <a
    href={catalogHref(path, clearCatalogFilters(query))}
    class="btn btn-outline"
    data-testid="catalog-clear-filters"
  >
    Tout effacer
  </a>
{/snippet}

{#if listing && listing.children.length > 0}
  <nav aria-label="Sous-catégories" class="mb-6">
    <ul class="flex flex-wrap gap-2">
      {#each listing.children as child (child.slug)}
        <li><a href={resolveHref(child.path)} class="chip">{child.name} ({child.count})</a></li>
      {/each}
    </ul>
  </nav>
{/if}

<div class="catalog-layout">
  {#if listing && isDesktop.current}
    <aside aria-labelledby="catalog-filters-title" class="catalog-aside">
      <h2 id="catalog-filters-title" class="mb-4 text-title font-semibold">Filtres</h2>
      <CatalogFilters {query} {listing} onsubmit={navigation.submitForm} />
    </aside>
  {/if}

  <div class="min-w-0">
    {#snippet filterButton()}
      {#if listing && !isDesktop.current}
        <SidePanel
          bind:open={filtersOpen}
          title="Filtres"
          triggerClass="btn btn-outline"
          triggerTestId="catalog-filters-open"
        >
          {#snippet trigger()}
            <Icon name="sliders-horizontal" />
            Filtrer{activeCount > 0 ? ` (${activeCount})` : ''}
          {/snippet}
          <CatalogFilters {query} {listing} onsubmit={navigation.submitForm} />
          <button
            type="button"
            class="btn btn-primary mt-6 w-full"
            onclick={() => (filtersOpen = false)}
          >
            Voir les {listing.total} produits
          </button>
        </SidePanel>
      {/if}
    {/snippet}

    <CatalogToolbar
      {path}
      {query}
      total={listing?.total ?? 0}
      onSortChange={(sort) => navigation.update({ sort })}
      {filterButton}
    />
    <ActiveFilters {path} {query} {clearAction} />
    <ProductGrid
      {status}
      products={listing?.products ?? []}
      view={query.view}
      errorMessage={result.status === 'error' ? result.message : undefined}
      onRetry={navigation.retry}
      {clearAction}
    />
    {#if listing}
      <Pagination {path} {query} totalPages={listing.totalPages} />
    {/if}
  </div>
</div>
