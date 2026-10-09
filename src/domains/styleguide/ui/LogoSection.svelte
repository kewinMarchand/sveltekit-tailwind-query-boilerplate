<script lang="ts">
  import { SITE } from '@/core/config'

  import Section from './Section.svelte'
</script>

<Section id="logo" title="Logo">
  <div class="grid gap-4 sm:grid-cols-2">
    <div class="flex items-center gap-4 rounded-md border border-skeleton bg-surface p-6">
      <img src="/logo-mark.svg" alt="" width="64" height="64" />
      <span class="logo-link text-text">{SITE.name}</span>
    </div>
    <div class="flex items-center gap-4 rounded-md bg-primary-dark p-6 text-white">
      <img src="/logo-mark.svg" alt="" width="64" height="64" />
      <span class="logo-link">{SITE.name}</span>
    </div>
  </div>
</Section>
