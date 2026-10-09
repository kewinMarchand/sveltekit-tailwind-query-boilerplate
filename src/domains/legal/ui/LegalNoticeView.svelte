<script lang="ts">
  import { SITE } from '@/core/config'
  import { PageHeader } from '@/core/ui/layouts'

  const { publisher, host } = SITE
</script>

<PageHeader
  title="Mentions légales"
  description="Mentions légales du site : éditeur, directeur de la publication, hébergeur et propriété intellectuelle."
/>

<div class="prose-legal">
  <h2>Éditeur du site</h2>
  <p>
    {publisher.name}<br />
    {publisher.address}<br />
    SIRET : {publisher.siret}<br />
    Contact : <a href={`mailto:${publisher.email}`}>{publisher.email}</a>
  </p>

  <h2>Directeur de la publication</h2>
  <p>{publisher.publicationDirector}</p>

  <h2>Hébergeur</h2>
  <p>
    {host.name}<br />
    {host.address}
  </p>

  <h2>Propriété intellectuelle</h2>
  <p>
    L’ensemble des contenus de ce site (textes, images, code) est la propriété de {publisher.name},
    sauf mention contraire. Toute reproduction sans autorisation écrite préalable est interdite.
  </p>
</div>
