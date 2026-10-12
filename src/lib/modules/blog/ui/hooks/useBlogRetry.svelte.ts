import { invalidate } from '$app/navigation'

import { BLOG_ARTICLES_DEPENDENCY } from '../dependencies'

import type { Article } from '#lib/modules/blog/domain/article'

export const useBlogRetry = (getBlog: () => Article.Blog) => {
  let retrying = $state(false)

  return {
    get status(): Article.Status {
      return retrying ? 'pending' : getBlog().status
    },
    async retry() {
      retrying = true
      try {
        await invalidate(BLOG_ARTICLES_DEPENDENCY)
      } finally {
        retrying = false
      }
    },
  }
}
