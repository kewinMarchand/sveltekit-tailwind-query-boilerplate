<script lang="ts">
  import { PageHeader } from '#lib/shared/ui/layout'

  import ButtonsSection from './ButtonsSection.svelte'
  import ColorsSection from './ColorsSection.svelte'
  import FeedbackSection from './FeedbackSection.svelte'
  import FormsSection from './FormsSection.svelte'
  import IconsSection from './IconsSection.svelte'
  import LogoSection from './LogoSection.svelte'
  import MediaSection from './MediaSection.svelte'
  import NavigationSection from './NavigationSection.svelte'
  import SpacingSection from './SpacingSection.svelte'
  import TypographySection from './TypographySection.svelte'
</script>

<PageHeader
  title="Charte graphique"
  description="Charte graphique de développement : tokens, typographie, composants et états, rendus avec les vrais composants du projet."
  seo={{ noindex: true }}
/>

<p class="lead">
  Page de développement, absente en production. Le bouton « Accessibilité renforcée » de l’en-tête
  permet de comparer les deux modes. Les composants génériques viennent de boilerplates-ui,
  documentés dans son <a
    class="bui-link"
    href="https://kewinmarchand.github.io/boilerplates-ui/"
    rel="external">Storybook</a
  >.
</p>

<ColorsSection />
<TypographySection />
<SpacingSection />
<ButtonsSection />
<FormsSection />
<FeedbackSection />
<NavigationSection />
<MediaSection />
<IconsSection />
<LogoSection />
