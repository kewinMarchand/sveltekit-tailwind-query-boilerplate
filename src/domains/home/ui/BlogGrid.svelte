<script lang="ts">
  import { Alert, Button, Icon } from '@/core/ui/ui-kit'

  import BlogCard from './BlogCard.svelte'

  import type { Article } from '../common/models/article'

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
      <div class="skeleton h-32"></div>
    {/each}
  </div>
{:else if status === 'error'}
  <Alert severity="error" data-testid="home-blog-error">
    {errorMessage}
    {#snippet action()}
      <Button variant="inherit" onclick={onRetry} data-testid="home-blog-retry">
        <Icon name="rotate-cw" />
        Réessayer
      </Button>
    {/snippet}
  </Alert>
{:else if !articles?.length}
  <Alert severity="info" data-testid="home-blog-empty">
    Aucun article publié pour l'instant. Revenez bientôt.
  </Alert>
{:else}
  <div class="blog-grid">
    {#each articles as article (article.id)}
      <BlogCard {article} />
    {/each}
  </div>
{/if}
