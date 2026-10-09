import { QueryClient } from '@tanstack/svelte-query'
import { browser } from '$app/env'

export const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { enabled: browser, staleTime: 60_000, retry: 1, refetchOnWindowFocus: false },
    },
  })
