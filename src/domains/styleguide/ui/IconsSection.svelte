<script lang="ts">
  import { Icon, ICON_NAMES } from '@/core/ui/ui-kit'

  import Section from './Section.svelte'
</script>

<Section id="icones" title="Icônes">
  <ul class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
    {#each ICON_NAMES as name (name)}
      <li class="flex items-center gap-2 text-body-sm">
        <Icon {name} size={24} />
        <code>{name}</code>
      </li>
    {/each}
  </ul>
</Section>
