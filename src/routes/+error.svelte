<script lang="ts">
  import { page } from '$app/state'

  import { ErrorView } from '@/domains/error'
</script>

<ErrorView status={page.status} pathname={page.url.pathname} />
