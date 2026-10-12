<script lang="ts">
  import { BlogSection } from '#lib/modules/blog'
  import { SITE } from '#lib/shared/config'
  import { buildHomeJsonLd, buildPageMeta, SeoHead } from '#lib/shared/seo'
  import { ImageCarousel } from '#lib/shared/ui/carousel'

  import { HOME_SLIDES } from './featuredSlides'
  import Hero from './Hero.svelte'

  import type { Article } from '#lib/modules/blog'

  interface Props {
    blog: Article.Blog
  }

  const { blog }: Props = $props()

  const carouselTitleId = $props.id()
</script>

<SeoHead
  meta={buildPageMeta({ description: SITE.description, path: '/', jsonLd: buildHomeJsonLd() })}
/>

<Hero />

<section aria-labelledby={carouselTitleId} data-testid="home-carousel">
  <h2 id={carouselTitleId} class="section-title">À la une</h2>
  <ImageCarousel slides={HOME_SLIDES} label="À la une" />
</section>

<BlogSection {blog} />
