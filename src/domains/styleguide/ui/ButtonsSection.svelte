<script lang="ts">
  import { Button } from '@/core/ui/ui-kit'

  import Section from './Section.svelte'

  const VARIANTS = ['primary', 'outline', 'inherit'] as const
  const STATES = ['défaut', 'survol', 'focus', 'actif', 'désactivé', 'chargement'] as const
  const FORCED: Record<(typeof STATES)[number], string | undefined> = {
    défaut: undefined,
    survol: 'hover',
    focus: 'focus',
    actif: 'active',
    désactivé: undefined,
    chargement: undefined,
  }
</script>

<Section id="boutons" title="Boutons">
  <div class="overflow-x-auto">
    <table class="w-full border-separate border-spacing-2 text-left">
      <thead>
        <tr>
          <th scope="col">Variante</th>
          {#each STATES as state (state)}
            <th scope="col" class="text-body-sm">{state}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each VARIANTS as variant (variant)}
          <tr>
            <th scope="row" class="text-body-sm"><code>{variant}</code></th>
            {#each STATES as state (state)}
              <td>
                <Button
                  type="button"
                  {variant}
                  data-force={FORCED[state]}
                  disabled={state === 'désactivé'}
                  loading={state === 'chargement'}
                >
                  Action
                </Button>
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class="mt-4 flex flex-wrap gap-2 rounded-md bg-primary p-4">
    <Button type="button" variant="outline-light">Contour clair</Button>
    <Button type="button" variant="nav">Navigation</Button>
  </div>
</Section>
