<script lang="ts">
  import { resolveHref } from '#lib/shared/routing'

  import SitemapTree from './SitemapTree.svelte'

  import type { NavigationNode } from '#lib/shared/config'

  interface Props {
    nodes: NavigationNode[]
  }

  const { nodes }: Props = $props()
</script>

{#if nodes.length > 0}
  <ul>
    {#each nodes as node (node.id)}
      <li>
        <a href={resolveHref(node.path)}>{node.label}</a>
        <SitemapTree nodes={node.children} />
      </li>
    {/each}
  </ul>
{/if}
