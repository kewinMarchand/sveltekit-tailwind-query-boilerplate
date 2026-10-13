<script lang="ts">
  import { Alert, Badge, Button, Skeleton } from '#lib/shared/ui/kit'

  import Section from './Section.svelte'
</script>

<Section id="retours" title="Retours">
  <div class="flex flex-col gap-4">
    <Alert variant="info">Le catalogue est mis à jour chaque lundi.</Alert>
    <Alert variant="success">Votre message a bien été envoyé.</Alert>
    <Alert variant="warning" title="Stock limité">Ce produit est bientôt épuisé.</Alert>
    <Alert variant="error">Impossible de charger les données.</Alert>
    <div role="status" aria-label="Exemple de chargement" class="flex flex-col gap-2">
      <Skeleton />
      <Skeleton variant="text" width="60%" />
    </div>
    <p class="flex flex-wrap gap-2">
      <Badge label="Neutre" />
      <Badge label="Info" variant="info" />
      <Badge label="Succès" variant="success" />
      <Badge label="Attention" variant="warning" />
      <Badge label="Rupture de stock" variant="error" />
    </p>
    <div class="flex flex-col items-start gap-3">
      <Alert variant="error">Le chargement a échoué.</Alert>
      <Button variant="outline" icon="rotate-cw">Réessayer</Button>
    </div>
  </div>
</Section>
