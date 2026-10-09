<script lang="ts">
  import BlogGrid from './BlogGrid.svelte'
  import { useBlogRetry } from './hooks/useBlogRetry.svelte'

  import type { Article } from '../common/models/article'

  interface Props {
    blog: Article.Blog
  }

  const { blog }: Props = $props()

  const titleId = $props.id()
  const blogRetry = useBlogRetry(() => blog)
</script>

<section aria-labelledby={titleId} class="mt-12" data-testid="home-blog">
  <h2 id={titleId} class="section-title">Derniers articles</h2>
  <div aria-live="polite">
    <BlogGrid
      status={blogRetry.status}
      articles={blog.status === 'success' ? blog.articles : undefined}
      errorMessage={blog.status === 'error' ? blog.message : undefined}
      onRetry={() => void blogRetry.retry()}
    />
  </div>
</section>
