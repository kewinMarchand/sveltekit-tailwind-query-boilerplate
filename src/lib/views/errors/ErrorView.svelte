<script lang="ts">
  import { resolve } from '$app/paths'

  import { resolveHref, toAppPath } from '#lib/shared/routing'
  import { Button } from '#lib/shared/ui/kit'
  import { PageHeader } from '#lib/shared/ui/layout'

  interface Props {
    status: number
    pathname: string
  }

  const { status, pathname }: Props = $props()

  const isNotFound = $derived(status === 404)
  const title = $derived(isNotFound ? 'Page introuvable' : 'Une erreur est survenue')
  const description = $derived(
    isNotFound
      ? "La page demandée n'existe pas ou a été déplacée. Utilisez le plan du site ou le catalogue pour retrouver votre chemin."
      : 'Une erreur inattendue nous empêche d’afficher cette page. Réessayez dans quelques instants ou revenez à l’accueil.',
  )
</script>

<PageHeader {title} {description} seo={{ noindex: true }} />

<p class="lead">{description}</p>
<div class="flex flex-wrap gap-4">
  {#if !isNotFound}
    <a
      href={resolveHref(toAppPath(pathname))}
      class="btn btn-primary"
      data-sveltekit-reload
      data-testid="error-retry"
    >
      Réessayer
    </a>
  {/if}
  <Button
    href={resolve('/')}
    variant={isNotFound ? 'primary' : 'outline'}
    data-testid="error-home-link"
  >
    Retour à l'accueil
  </Button>
  {#if isNotFound}
    <Button href={resolve('/plan-du-site')} variant="outline" data-testid="error-sitemap-link">
      Plan du site
    </Button>
    <Button
      href={resolve('/catalogue/[...slugs]', { slugs: '' })}
      variant="outline"
      data-testid="error-catalog-link"
    >
      Catalogue
    </Button>
  {/if}
</div>
