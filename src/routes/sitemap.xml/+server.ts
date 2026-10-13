import { listCatalogPaths } from '#lib/modules/catalog/index.server'
import { buildSitemapXml } from '#lib/shared/seo'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = async () =>
  new Response(buildSitemapXml(await listCatalogPaths()), {
    headers: { 'content-type': 'application/xml; charset=utf-8' },
  })
