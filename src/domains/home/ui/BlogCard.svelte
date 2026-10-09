<script lang="ts">
  import { ResponsiveImage } from '@/core/ui/ui-kit'

  import { formatPublishedAt } from '../services/formatPublishedAt'

  import type { Article } from '../common/models/article'

  interface Props {
    article: Article.Entity
  }

  const { article }: Props = $props()
</script>

<article class="card" data-testid="home-blog-card">
  <ResponsiveImage
    basePath={article.imageBasePath}
    widths={[480, 960]}
    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
    width={960}
    height={540}
    alt=""
    class="aspect-video h-auto w-full object-cover"
  />
  <div class="p-4">
    <div class="flex flex-col gap-2 @md:flex-row @md:items-baseline @md:justify-between">
      <h3 class="text-title font-semibold">{article.title}</h3>
      <time datetime={article.publishedAt} class="text-body-sm text-text-muted">
        {formatPublishedAt(article.publishedAt)}
      </time>
    </div>
    <p class="mt-2">{article.excerpt}</p>
  </div>
</article>
