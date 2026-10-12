import { listCategoryPaths, toCategoryMenu } from '../domain/categoryPath'
import { findCategoryTree } from '../infrastructure/catalogRepository'

export const getCategoryMenu = () => toCategoryMenu(findCategoryTree())

export const listCatalogPaths = () => listCategoryPaths(findCategoryTree())
