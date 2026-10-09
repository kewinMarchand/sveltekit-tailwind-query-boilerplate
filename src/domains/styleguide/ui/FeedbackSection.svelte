<script lang="ts">
  import { Alert, Button, Icon } from '@/core/ui/ui-kit'

  import Section from './Section.svelte'
</script>

<Section id="retours" title="Retours">
  <div class="flex flex-col gap-4">
    <Alert severity="info">Information : le catalogue est mis à jour chaque lundi.</Alert>
    <Alert severity="success">Succès : votre message a bien été envoyé.</Alert>
    <Alert severity="warning">Avertissement : ce produit est bientôt épuisé.</Alert>
    <Alert severity="error">Erreur : impossible de charger les données.</Alert>
    <div role="status" aria-label="Exemple de chargement" class="flex flex-col gap-2">
      <div class="skeleton"></div>
      <div class="skeleton"></div>
    </div>
    <Alert severity="info">Aucun élément pour l'instant. Revenez bientôt.</Alert>
    <Alert severity="error">
      Le chargement a échoué.
      {#snippet action()}
        <Button type="button" variant="inherit">
          <Icon name="rotate-cw" />
          Réessayer
        </Button>
      {/snippet}
    </Alert>
  </div>
</Section>
