<script lang="ts">
  import { page } from '$app/state'

  import { CATALOG_NAVIGATION, isActivePath, MAIN_NAVIGATION } from '@/core/config'
  import { resolveHref } from '@/core/routing'
  import { Icon, SidePanel } from '@/core/ui/ui-kit'

  import { useDrillDown } from './hooks/useDrillDown.svelte'

  import type { NavigationNode } from '@/core/config'

  interface Props {
    nodes: NavigationNode[]
  }

  const { nodes }: Props = $props()

  let open = $state(false)
  let heading = $state<HTMLElement | null>(null)
  const drill = useDrillDown(() => heading?.focus())

  const catalogNode = $derived<NavigationNode>({
    id: 'catalogue',
    label: CATALOG_NAVIGATION.label,
    path: CATALOG_NAVIGATION.href,
    children: nodes,
  })

  $effect(() => {
    if (!open) drill.reset()
  })

  const close = () => {
    open = false
  }
</script>

<SidePanel
  bind:open
  title="Menu"
  side="right"
  triggerClass="btn btn-nav"
  triggerTestId="layout-mobile-menu-toggle"
  panelTestId="layout-mobile-menu"
>
  {#snippet trigger()}
    <Icon name="menu" />
    Menu
  {/snippet}

  <nav aria-label="Menu mobile">
    {#if drill.current}
      {@const current = drill.current}
      <button
        type="button"
        class="btn btn-inherit mb-2"
        data-testid="layout-mobile-menu-back"
        onclick={drill.back}
      >
        <Icon name="chevron-left" />
        Retour à {drill.parentLabel ?? 'Menu'}
      </button>
      <h2 class="mb-2 text-title font-semibold" tabindex="-1" bind:this={heading}>
        {current.label}
      </h2>
      <ul class="flex flex-col">
        <li>
          <a href={resolveHref(current.path)} class="mobile-menu-item" onclick={close}>
            Voir toute la catégorie
          </a>
        </li>
        {#each current.children as node (node.id)}
          <li>
            {#if node.children.length > 0}
              <button type="button" class="mobile-menu-item" onclick={() => drill.open(node)}>
                {node.label}
                <Icon name="chevron-right" />
              </button>
            {:else}
              <a href={resolveHref(node.path)} class="mobile-menu-item" onclick={close}
                >{node.label}</a
              >
            {/if}
          </li>
        {/each}
      </ul>
    {:else}
      <h2 class="sr-only" tabindex="-1" bind:this={heading}>Navigation</h2>
      <ul class="flex flex-col">
        {#each MAIN_NAVIGATION as item (item.href)}
          <li>
            <a
              href={resolveHref(item.href)}
              class="mobile-menu-item"
              aria-current={isActivePath(page.url.pathname, item.href) ? 'page' : undefined}
              onclick={close}>{item.label}</a
            >
          </li>
        {/each}
        <li>
          <button type="button" class="mobile-menu-item" onclick={() => drill.open(catalogNode)}>
            {CATALOG_NAVIGATION.label}
            <Icon name="chevron-right" />
          </button>
        </li>
      </ul>
    {/if}
  </nav>
</SidePanel>
