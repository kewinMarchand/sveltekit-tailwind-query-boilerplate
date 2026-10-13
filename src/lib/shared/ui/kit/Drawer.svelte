<script lang="ts">
  import { openModal } from '@kewinmarchand/boilerplates-ui/vanilla'

  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'

  interface Props {
    open: boolean
    title: string
    side?: 'start' | 'end'
    triggerClass?: string
    triggerLabel?: string
    triggerTestId?: string
    panelTestId?: string
    trigger: Snippet
    children: Snippet
  }

  let {
    open = $bindable(false),
    title,
    side = 'end',
    triggerClass,
    triggerLabel,
    triggerTestId,
    panelTestId,
    trigger,
    children,
  }: Props = $props()

  const id = $props.id()
  let dialog = $state<HTMLDialogElement>()
  let rendered = $state(false)

  $effect(() => {
    if (open) {
      rendered = true
      if (dialog && !dialog.open) openModal(dialog)
    } else if (dialog?.open) {
      dialog.close()
    }
  })

  const handleClose = () => {
    open = false
    rendered = false
  }
</script>

<button
  type="button"
  class={triggerClass}
  aria-label={triggerLabel}
  aria-haspopup="dialog"
  aria-expanded={open}
  data-testid={triggerTestId}
  onclick={() => (open = true)}
>
  {@render trigger()}
</button>
<!-- Monté seulement ouvert : un `<dialog>` fermé laisserait son contenu (champs, data-testid) dans la page. -->
{#if rendered}
  <dialog
    bind:this={dialog}
    class={['bui-modal', 'bui-modal--drawer', side === 'start' && 'bui-modal--start']}
    {id}
    aria-labelledby="{id}-title"
    data-testid={panelTestId}
    onclose={handleClose}
  >
    <div class="bui-modal__header">
      <h2 class="bui-modal__title" id="{id}-title">{title}</h2>
      <button
        type="button"
        class="bui-modal__close"
        aria-label="Fermer"
        onclick={() => dialog?.close()}
      >
        <Icon name="x" />
      </button>
    </div>
    <div class="bui-modal__body">{@render children()}</div>
  </dialog>
{/if}
