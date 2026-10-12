<script lang="ts">
  import { Button, Icon } from '#lib/shared/ui/kit'

  import { useA11yMode } from './useA11yMode.svelte'

  const mode = useA11yMode()
</script>

<Button
  type="button"
  variant="nav"
  aria-pressed={mode.enhanced}
  onclick={mode.toggle}
  data-testid="a11y-mode-toggle"
>
  <Icon name="accessibility" />
  Accessibilité renforcée
</Button>
