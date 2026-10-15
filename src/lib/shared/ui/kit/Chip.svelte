<script lang="ts">
  import Icon from './Icon.svelte'

  import type { Snippet } from 'svelte'
  import type { HTMLAnchorAttributes } from 'svelte/elements'

  type Props = Omit<HTMLAnchorAttributes, 'children'> & {
    /** Lien vers la page filtrée. `aria-current="page"` marque la puce de la page courante. */
    href: string
    /** Filtre actif : un clic le retire, ce que l'icône montre et un texte masqué annonce. */
    removable?: boolean
    children: Snippet
  }

  const { href, removable = false, class: className, children, ...rest }: Props = $props()
</script>

<a {href} class={['bui-chip', className]} {...rest}
  >{#if removable}<span class="bui-visually-hidden"
      >Retirer le filtre :
    </span>{/if}{@render children()}{#if removable}<Icon name="x" />{/if}</a
>
