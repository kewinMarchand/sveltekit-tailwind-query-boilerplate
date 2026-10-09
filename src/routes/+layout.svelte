<script lang="ts">
  import { Providers } from '@/core/providers'
  import { AppShell } from '@/core/ui/layouts'

  const { data, children } = $props()
</script>

<Providers>
  <AppShell categoryMenu={data.categoryMenu}>
    {@render children()}
  </AppShell>
</Providers>
