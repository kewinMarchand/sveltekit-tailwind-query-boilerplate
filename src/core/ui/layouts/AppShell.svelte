<script lang="ts">
  import '@/core/theme/theme.css'

  import Footer from './Footer.svelte'
  import Header from './Header.svelte'

  import type { NavigationNode } from '@/core/config'
  import type { Snippet } from 'svelte'

  interface Props {
    categoryMenu: NavigationNode[]
    children: Snippet
  }

  const { categoryMenu, children }: Props = $props()
</script>

<div class="flex min-h-screen flex-col">
  <a href="#main" class="skip-link">Aller au contenu principal</a>
  <Header {categoryMenu} />
  <main id="main" tabindex="-1" class="page-grid grow">
    {@render children()}
  </main>
  <Footer />
</div>
