<script lang="ts">
  import { ResponsiveImage } from '@/core/ui/ui-kit'

  import { EXPOSURE_LABELS, SIZE_LABELS } from '../common/models/catalog'
  import { formatPrice } from '../services/formatPrice'

  import type { Catalog } from '../common/models/catalog'

  interface Props {
    product: Catalog.Product
    eager?: boolean
    priority?: boolean
  }

  const { product, eager = false, priority = false }: Props = $props()
</script>

<article id={product.slug} class="product-card" data-testid="catalog-product">
  <div class="product-card-body">
    <ResponsiveImage
      basePath={`/images/product-${product.image}`}
      widths={[400, 800]}
      sizes="(min-width: 1024px) 25vw, (min-width: 480px) 50vw, 100vw"
      width={800}
      height={800}
      alt={product.name}
      {eager}
      {priority}
      class="product-card-image"
    />
    <div class="flex flex-col gap-1 p-4">
      <h2 class="text-title font-semibold">{product.name}</h2>
      <p class="font-semibold" data-testid="catalog-product-price">{formatPrice(product.price)}</p>
      <p class="text-body-sm text-text-muted">
        {EXPOSURE_LABELS[product.exposure]} · Taille {SIZE_LABELS[product.size].toLowerCase()}
      </p>
      {#if !product.inStock}
        <p class="badge">Rupture de stock</p>
      {/if}
    </div>
  </div>
</article>
