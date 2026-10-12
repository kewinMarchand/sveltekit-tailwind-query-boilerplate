<script lang="ts">
  import { Providers } from '#lib/shared/providers'
  import { AppShell } from '#lib/shared/ui/layout'

  const { data, children } = $props()
</script>

<Providers>
  <AppShell categoryMenu={data.categoryMenu}>
    {@render children()}
  </AppShell>
</Providers>
