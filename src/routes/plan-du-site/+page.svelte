<script lang="ts">
  import { SitemapView } from '@/domains/legal'

  const { data } = $props()
</script>

<SitemapView categories={data.categoryMenu} />
