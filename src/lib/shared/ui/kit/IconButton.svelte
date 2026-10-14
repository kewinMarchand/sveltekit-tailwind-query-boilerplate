<script lang="ts">
  import Icon from './Icon.svelte'

  import type { IconName } from './iconNames'
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = Omit<HTMLButtonAttributes, 'children' | 'aria-label'> & {
    label: string
    icon: IconName
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md'
  }

  const {
    label,
    icon,
    variant = 'primary',
    size = 'md',
    class: className,
    ...rest
  }: Props = $props()
</script>

<button
  type="button"
  class={[
    'bui-button',
    variant !== 'primary' && `bui-button--${variant}`,
    size !== 'md' && `bui-button--${size}`,
    'bui-button--icon',
    className,
  ]}
  aria-label={label}
  {...rest}
>
  <Icon name={icon} />
</button>
