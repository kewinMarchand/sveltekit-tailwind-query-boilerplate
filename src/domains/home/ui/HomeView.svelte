<script lang="ts">
  import { SITE } from '@/core/config'
  import { buildHomeJsonLd, buildPageMeta, SeoHead } from '@/core/seo'
  import { ImageCarousel } from '@/features/carousel'

  import { HOME_SLIDES } from '../api/homeSlides'
  import BlogSection from './BlogSection.svelte'
  import Hero from './Hero.svelte'

  import type { Article } from '../common/models/article'

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
