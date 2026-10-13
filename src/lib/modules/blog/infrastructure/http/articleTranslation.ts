import type { Article } from '#lib/modules/blog/domain/article'
import type { components } from '#lib/shared/api/client'

type ArticleDto = components['schemas']['Article']

export const toArticle = (dto: ArticleDto): Article.Entity => ({
  id: String(dto.id),
  title: dto.title,
  excerpt: dto.excerpt,
  imageBasePath: `/images/blog-${dto.id}`,
  publishedAt: dto.publishedAt,
})
