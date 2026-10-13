<script lang="ts">
  interface Props {
    variant?: 'block' | 'text' | 'circle'
    width?: string
    height?: string
  }

  const { variant = 'block', width, height }: Props = $props()
</script>

<span
  class={['bui-skeleton', variant !== 'block' && `bui-skeleton--${variant}`]}
  aria-hidden="true"
  style:width
  style:height
></span>
