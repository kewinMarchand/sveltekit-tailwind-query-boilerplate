<script lang="ts">
  import { SitemapView } from '#lib/views/legal'

  const { data } = $props()
</script>

<SitemapView categories={data.categoryMenu} />
