import { buildSitemapXml } from '@/core/seo'
import { listCatalogPaths } from '@/domains/catalog/index.server'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = () =>
  new Response(buildSitemapXml(listCatalogPaths()), {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  })
