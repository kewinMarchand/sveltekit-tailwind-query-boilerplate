<script lang="ts">
  import { ContactView } from '@/domains/contact'

  const { data } = $props()
</script>

<ContactView form={data.form} />
