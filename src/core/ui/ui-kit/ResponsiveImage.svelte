<script lang="ts">
  interface Props {
    basePath: string
    widths: number[]
    sizes: string
    width: number
    height: number
    alt: string
    priority?: boolean
    eager?: boolean
    class?: string
  }

  const {
    basePath,
    widths,
    sizes,
    width,
    height,
    alt,
    priority = false,
    eager = false,
    class: className,
  }: Props = $props()

  const srcset = (format: 'avif' | 'webp') =>
    widths.map((w) => `${basePath}-${w}.${format} ${w}w`).join(', ')

  const fallback = $derived(`${basePath}-${widths.at(-1)}.webp`)
</script>

<svelte:head>
  {#if priority}
    <link
      rel="preload"
      as="image"
      type="image/avif"
      imagesrcset={srcset('avif')}
      imagesizes={sizes}
      fetchpriority="high"
    />
  {/if}
</svelte:head>

<picture>
  <source type="image/avif" srcset={srcset('avif')} {sizes} />
  <source type="image/webp" srcset={srcset('webp')} {sizes} />
  <img
    src={fallback}
    {alt}
    {width}
    {height}
    loading={priority || eager ? 'eager' : 'lazy'}
    fetchpriority={priority ? 'high' : 'auto'}
    decoding={priority ? 'sync' : 'async'}
    class={className}
  />
</picture>
