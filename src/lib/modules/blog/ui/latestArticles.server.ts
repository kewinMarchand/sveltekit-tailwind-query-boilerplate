import { findLatestArticles } from '../infrastructure/articleRepository'
import { ArticlesLoadError } from '../infrastructure/ArticlesLoadError'
import { BLOG_ARTICLES_DEPENDENCY } from './dependencies'

import type { Article } from '../domain/article'
import type { ServerLoadEvent } from '@sveltejs/kit'

export const loadLatestArticles = async ({ depends }: Pick<ServerLoadEvent, 'depends'>) => {
  depends(BLOG_ARTICLES_DEPENDENCY)

  try {
    const blog: Article.Blog = { status: 'success', articles: await findLatestArticles() }
    return { blog }
  } catch {
    const blog: Article.Blog = { status: 'error', message: new ArticlesLoadError().message }
    return { blog }
  }
}
