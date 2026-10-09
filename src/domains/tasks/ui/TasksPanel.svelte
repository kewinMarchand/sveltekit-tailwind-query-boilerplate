<script lang="ts">
  import { useTasks } from './hooks/useTasks.svelte'
  import TaskList from './TaskList.svelte'

  const query = useTasks()
</script>

<div aria-live="polite">
  <TaskList
    status={query.status}
    tasks={query.data}
    errorMessage={query.error?.message}
    onRetry={() => void query.refetch()}
  />
</div>
