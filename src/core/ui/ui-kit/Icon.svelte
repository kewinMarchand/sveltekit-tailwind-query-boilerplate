<script lang="ts" module>
  import Accessibility from '@lucide/svelte/icons/accessibility'
  import ChevronDown from '@lucide/svelte/icons/chevron-down'
  import ChevronLeft from '@lucide/svelte/icons/chevron-left'
  import ChevronRight from '@lucide/svelte/icons/chevron-right'
  import CircleAlert from '@lucide/svelte/icons/circle-alert'
  import CircleCheck from '@lucide/svelte/icons/circle-check'
  import Info from '@lucide/svelte/icons/info'
  import ListTodo from '@lucide/svelte/icons/list-todo'
  import LoaderCircle from '@lucide/svelte/icons/loader-circle'
  import Mail from '@lucide/svelte/icons/mail'
  import MenuIcon from '@lucide/svelte/icons/menu'
  import RotateCw from '@lucide/svelte/icons/rotate-cw'
  import SlidersHorizontal from '@lucide/svelte/icons/sliders-horizontal'
  import TriangleAlert from '@lucide/svelte/icons/triangle-alert'
  import X from '@lucide/svelte/icons/x'

  const ICONS = {
    accessibility: Accessibility,
    'chevron-down': ChevronDown,
    'chevron-left': ChevronLeft,
    'chevron-right': ChevronRight,
    'circle-alert': CircleAlert,
    'circle-check': CircleCheck,
    info: Info,
    'list-todo': ListTodo,
    'loader-circle': LoaderCircle,
    mail: Mail,
    menu: MenuIcon,
    'rotate-cw': RotateCw,
    'sliders-horizontal': SlidersHorizontal,
    'triangle-alert': TriangleAlert,
    x: X,
  } as const

  export type IconName = keyof typeof ICONS

  export const ICON_NAMES = Object.keys(ICONS) as IconName[]
</script>

<script lang="ts">
  interface Props {
    name: IconName
    size?: number
    label?: string
  }

  const { name, size = 20, label }: Props = $props()

  const Component = $derived(ICONS[name])
</script>

{#if label}
  <Component {size} role="img" aria-label={label} />
{:else}
  <Component {size} aria-hidden="true" focusable="false" />
{/if}
