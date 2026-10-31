<script lang="ts">
  import { Alert, Button, Icon, Skeleton } from '#lib/shared/ui/kit'

  import BlogCard from './BlogCard.svelte'

  import type { Article } from '../domain/article'

  interface Props {
    status: Article.Status
    articles: Article.Entity[] | undefined
    errorMessage?: string | undefined
    onRetry: () => void
  }

  const { status, articles, errorMessage, onRetry }: Props = $props()
</script>

{#if status === 'pending'}
  <div
    class="blog-grid"
    role="status"
    aria-busy="true"
    aria-label="Chargement des articles"
    data-testid="home-blog-loading"
  >
    {#each [1, 2, 3] as key (key)}
      <Skeleton height="128px" />
    {/each}
  </div>
{:else if status === 'error'}
  <div class="flex flex-col items-start gap-3">
    <Alert variant="error" data-testid="home-blog-error">{errorMessage}</Alert>
    <Button variant="outline" onclick={onRetry} data-testid="home-blog-retry"
      ><Icon name="rotate-cw" />Réessayer
    </Button>
  </div>
{:else if !articles?.length}
  <Alert variant="info" data-testid="home-blog-empty">
    Aucun article publié pour l'instant. Revenez bientôt.
  </Alert>
{:else}
  <div class="blog-grid">
    {#each articles as article (article.id)}
      <BlogCard {article} />
    {/each}
  </div>
{/if}
