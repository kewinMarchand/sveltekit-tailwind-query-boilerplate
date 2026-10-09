<script lang="ts">
  import { HomeView } from '@/domains/home'

  const { data } = $props()
</script>

<HomeView blog={data.blog} />
