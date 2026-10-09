<script lang="ts">
  import { Alert, Button, Icon } from '@/core/ui/ui-kit'

  import type { Task } from '../common/models/task'

  interface Props {
    status: Task.Status
    tasks: Task.Entity[] | undefined
    errorMessage?: string | undefined
    onRetry: () => void
  }

  const { status, tasks, errorMessage, onRetry }: Props = $props()
</script>

{#if status === 'pending'}
  <div
    class="flex flex-col gap-2"
    role="status"
    aria-busy="true"
    aria-label="Chargement des tâches"
    data-testid="tasks-loading"
  >
    {#each [1, 2, 3] as key (key)}
      <div class="skeleton"></div>
    {/each}
  </div>
{:else if status === 'error'}
  <Alert severity="error" data-testid="tasks-error">
    {errorMessage}
    {#snippet action()}
      <Button variant="inherit" onclick={onRetry} data-testid="tasks-retry">
        <Icon name="rotate-cw" />
        Réessayer
      </Button>
    {/snippet}
  </Alert>
{:else if !tasks?.length}
  <Alert severity="info" data-testid="tasks-empty">
    Aucune tâche pour l'instant. Tout est à jour.
  </Alert>
{:else}
  <ul class="flex flex-col" data-testid="tasks-list">
    {#each tasks as task (task.id)}
      <li class="flex items-center gap-4 py-2" data-testid="tasks-item">
        <Icon name={task.done ? 'circle-check' : 'list-todo'} />
        <div>
          <p>{task.title}</p>
          <p class="text-body-sm text-text-muted">{task.done ? 'Terminée' : 'À faire'}</p>
        </div>
      </li>
    {/each}
  </ul>
{/if}
