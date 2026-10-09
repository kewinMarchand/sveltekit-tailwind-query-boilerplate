<script lang="ts">
  import { PageHeader } from '@/core/ui/layouts'

  import TasksPanel from './TasksPanel.svelte'
</script>

<PageHeader
  title="Tâches"
  description="Démo TanStack Query : liste de tâches chargée côté client avec gestion du chargement, des erreurs et de la liste vide."
/>

<p class="lead">
  Données chargées côté client avec TanStack Query : chargement, erreur et liste vide sont gérés.
</p>
<TasksPanel />
