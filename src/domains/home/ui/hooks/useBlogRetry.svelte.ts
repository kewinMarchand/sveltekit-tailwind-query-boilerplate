import { invalidate } from '$app/navigation'

import { HOME_ARTICLES_DEPENDENCY } from '@/domains/home/services/dependencies'

import type { Article } from '@/domains/home/common/models/article'

export const useBlogRetry = (getBlog: () => Article.Blog) => {
  let retrying = $state(false)

  return {
    get status(): Article.Status {
      return retrying ? 'pending' : getBlog().status
    },
    async retry() {
      retrying = true
      try {
        await invalidate(HOME_ARTICLES_DEPENDENCY)
      } finally {
        retrying = false
      }
    },
  }
}
