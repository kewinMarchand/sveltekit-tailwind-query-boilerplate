<script lang="ts">
  import { resolve } from '$app/paths'

  import { Icon } from '#lib/shared/ui/kit'

  import Section from './Section.svelte'
</script>

<Section id="navigation" title="Navigation">
  <div class="flex flex-col gap-6">
    <nav class="bui-breadcrumb" aria-label="Fil d’Ariane (exemple)">
      <ol class="bui-breadcrumb__list">
        <li class="bui-breadcrumb__item">
          <a class="bui-link" href={resolve('/')}>Accueil</a>
        </li>
        <li class="bui-breadcrumb__item">
          <a class="bui-link" href={resolve('/plan-du-site')}>Plan du site</a>
        </li>
        <li class="bui-breadcrumb__item">
          <span class="bui-breadcrumb__current" aria-current="page">Page courante</span>
        </li>
      </ol>
    </nav>
    <nav class="bui-pagination" aria-label="Pagination (exemple)">
      <ul class="bui-pagination__list">
        <li>
          <a class="bui-pagination__link" href={resolve('/plan-du-site')} aria-current="page"
            ><span class="bui-visually-hidden">Page&nbsp;</span>1</a
          >
        </li>
        <li>
          <a class="bui-pagination__link" href={resolve('/plan-du-site')}
            ><span class="bui-visually-hidden">Page&nbsp;</span>2</a
          >
        </li>
        <li class="bui-pagination__ellipsis" aria-hidden="true">…</li>
        <li>
          <a class="bui-pagination__link" href={resolve('/plan-du-site')} rel="next"
            >Suivant<Icon name="chevron-right" /></a
          >
        </li>
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
      <a href={resolve('/plan-du-site')} class="bui-link">Lien interne</a>
      <a
        href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
        class="bui-link"
        rel="external"
      >
        Lien externe : RGAA
      </a>
    </p>
  </div>
</Section>
