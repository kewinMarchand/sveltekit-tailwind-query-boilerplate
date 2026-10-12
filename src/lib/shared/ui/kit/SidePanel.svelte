<script lang="ts">
  import { Dialog } from 'bits-ui'

  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    open: boolean
    title: string
    side?: 'left' | 'right'
    triggerClass?: string
    triggerTestId?: string
    panelTestId?: string
    trigger: Snippet
    children: Snippet
  }

  let {
    open = $bindable(false),
    title,
    side = 'left',
    triggerClass,
    triggerTestId,
    panelTestId,
    trigger,
    children,
  }: Props = $props()
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger class={triggerClass} data-testid={triggerTestId}>
    {@render trigger()}
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay class="side-panel-overlay" />
    <Dialog.Content class={['side-panel', `side-panel-${side}`]} data-testid={panelTestId}>
      <div class="flex items-center justify-between gap-2 border-b border-skeleton p-4">
        <Dialog.Title class="text-title font-semibold">{title}</Dialog.Title>
        <Dialog.Close class="btn btn-inherit" aria-label="Fermer">
          <Icon name="x" />
        </Dialog.Close>
      </div>
      <div class="overflow-y-auto p-4">
        {@render children()}
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
