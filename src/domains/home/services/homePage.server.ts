import { findLatestArticles } from '../api/articlesRepository'
import { ArticlesLoadError } from '../common/exceptions/ArticlesLoadError'
import { HOME_ARTICLES_DEPENDENCY } from './dependencies'

import type { Article } from '../common/models/article'
import type { ServerLoadEvent } from '@sveltejs/kit'

export const loadHomePage = async ({ depends }: Pick<ServerLoadEvent, 'depends'>) => {
  depends(HOME_ARTICLES_DEPENDENCY)

  try {
    const blog: Article.Blog = { status: 'success', articles: await findLatestArticles() }
    return { blog }
  } catch {
    const blog: Article.Blog = { status: 'error', message: new ArticlesLoadError().message }
    return { blog }
  }
}
