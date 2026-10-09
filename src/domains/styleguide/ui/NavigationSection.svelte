<script lang="ts">
  import { resolve } from '$app/paths'

  import Section from './Section.svelte'
</script>

<Section id="navigation" title="Navigation">
  <div class="flex flex-col gap-6">
    <nav aria-label="Fil d'Ariane (exemple)" class="breadcrumb">
      <ol>
        <li><a href={resolve('/')}>Accueil</a></li>
        <li><a href={resolve('/plan-du-site')}>Plan du site</a></li>
        <li><span aria-current="page">Page courante</span></li>
      </ol>
    </nav>
    <nav aria-label="Pagination (exemple)">
      <ul class="flex flex-wrap items-center gap-1">
        <li><span class="page-link text-text-muted" aria-disabled="true">Précédent</span></li>
        <li>
          <span class="page-link page-link-current" aria-current="page"
            ><span class="sr-only">Page</span> 1</span
          >
        </li>
        <li>
          <a href={resolve('/plan-du-site')} class="page-link"
            ><span class="sr-only">Page</span> 2</a
          >
        </li>
        <li><span class="page-link" aria-hidden="true">…</span></li>
        <li><a href={resolve('/plan-du-site')} class="page-link">Suivant</a></li>
      </ul>
    </nav>
    <ul class="flex flex-wrap gap-2">
      <li>
        <a href={resolve('/plan-du-site')} class="chip"
          ><span class="sr-only">Retirer le filtre :</span> Mi-ombre
          <span aria-hidden="true">×</span></a
        >
      </li>
      <li><a href={resolve('/plan-du-site')} class="chip" aria-current="page">Puce active</a></li>
    </ul>
    <p class="flex flex-wrap gap-6">
      <a href={resolve('/plan-du-site')} class="text-primary underline">Lien interne</a>
      <a
        href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
        class="text-primary underline"
        rel="external"
      >
        Lien externe : RGAA
      </a>
    </p>
  </div>
</Section>
