import { buildRobotsTxt } from '#lib/shared/seo'

import type { RequestHandler } from './$types'

export const GET: RequestHandler = () =>
  new Response(buildRobotsTxt(), { headers: { 'content-type': 'text/plain; charset=utf-8' } })
