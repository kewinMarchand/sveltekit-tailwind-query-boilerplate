<script lang="ts">
  import { Alert, Button, Icon } from '@/core/ui/ui-kit'

  import ProductCard from './ProductCard.svelte'

  import type { Catalog } from '../common/models/catalog'
  import type { Snippet } from 'svelte'

  interface Props {
    status: Catalog.Status
    products: Catalog.Product[]
    view: Catalog.View
    errorMessage?: string | undefined
    onRetry: () => void
    clearAction: Snippet
  }

  const { status, products, view, errorMessage, onRetry, clearAction }: Props = $props()

  const EAGER_COUNT = 4
</script>

{#if status === 'pending'}
  <div class="catalog-grid" role="status" aria-label="Chargement des produits">
    {#each [1, 2, 3, 4] as key (key)}
      <div class="skeleton h-80"></div>
    {/each}
  </div>
{:else if status === 'error'}
  <Alert severity="error" data-testid="catalog-error">
    {errorMessage}
    {#snippet action()}
      <Button variant="inherit" onclick={onRetry} data-testid="catalog-retry">
        <Icon name="rotate-cw" />
        Réessayer
      </Button>
    {/snippet}
  </Alert>
{:else if products.length === 0}
  <div class="flex flex-col items-start gap-4" data-testid="catalog-empty">
    <Alert severity="info">Aucun produit ne correspond à ces filtres.</Alert>
    {@render clearAction()}
  </div>
{:else}
  <ul class="catalog-grid" data-view={view}>
    {#each products as product, index (product.id)}
      <li><ProductCard {product} eager={index < EAGER_COUNT} priority={index === 0} /></li>
    {/each}
  </ul>
{/if}
