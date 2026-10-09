<script lang="ts">
  import { page } from '$app/state'

  import { toAppPath } from '@/core/routing'
  import { buildBreadcrumb, buildPageMeta, SeoHead } from '@/core/seo'

  import Breadcrumb from './Breadcrumb.svelte'

  import type { Seo } from '@/core/seo'

  interface Props {
    title: string
    description: string
    parents?: Seo.BreadcrumbItem[]
    seo?: Omit<Seo.Input, 'title' | 'description' | 'path' | 'breadcrumb'>
  }

  const { title, description, parents = [], seo = {} }: Props = $props()

  const path = $derived(toAppPath(page.url.pathname))
  const breadcrumb = $derived(buildBreadcrumb({ label: title, path }, parents))
  const meta = $derived(buildPageMeta({ ...seo, title, description, path, breadcrumb }))
</script>

<SeoHead {meta} />
<Breadcrumb items={breadcrumb} />
<h1 id="page-title" tabindex="-1" class="heading-1">{title}</h1>
