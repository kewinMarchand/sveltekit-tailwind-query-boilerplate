<script lang="ts">
  interface Props {
    label: string
    variant?: 'neutral' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
  }

  const { label, variant = 'neutral' }: Props = $props()
</script>

<span class={['bui-badge', variant !== 'neutral' && `bui-badge--${variant}`]}>{label}</span>
