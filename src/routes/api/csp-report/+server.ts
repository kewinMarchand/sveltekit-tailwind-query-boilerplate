import { cspReportHandler } from '#lib/shared/security/index.server'

import type { RequestHandler } from './$types'

export const POST: RequestHandler = ({ request }) => cspReportHandler(request)
