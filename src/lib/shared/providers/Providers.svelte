<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query'
  import { dev } from '$app/env'

  import { makeQueryClient } from './makeQueryClient'

  import type { Snippet } from 'svelte'

  interface Props {
    children: Snippet
  }

  const { children }: Props = $props()

  const queryClient = makeQueryClient()
</script>

<QueryClientProvider client={queryClient}>
  {@render children()}
  {#if dev}
    {#await import('@tanstack/svelte-query-devtools') then { SvelteQueryDevtools }}
      <SvelteQueryDevtools buttonPosition="bottom-left" />
    {/await}
  {/if}
</QueryClientProvider>
