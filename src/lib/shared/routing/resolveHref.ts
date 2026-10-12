import { resolve } from '$app/paths'

import type { ResolvedPathname } from '$app/types'

export type AppPath = `/${string}`

// Les chemins viennent de la config ou des données : `resolve` ne peut pas les typer statiquement.
const resolvePathname = resolve as (pathname: string) => ResolvedPathname

export const resolveHref = (path: AppPath): ResolvedPathname => resolvePathname(path.slice(1))

export const toAppPath = (pathname: string): AppPath => `/${pathname.replace(/^\/+/, '')}`
