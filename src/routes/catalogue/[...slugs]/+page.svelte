<script lang="ts">
  import { CatalogView } from '@/domains/catalog'

  const { data } = $props()
</script>

<CatalogView query={data.query} result={data.result} />
