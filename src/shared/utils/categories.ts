import OtherIcon from '@/shared/assets/icon/Other.svg?react'
import { categories } from '@/shared/constants/categories'
import type { Category } from '@/shared/types/category'

const categoriesByName = new Map(
  categories.map((category) => [category.name.toLowerCase(), category]),
)

export const getCategory = (name: string): Category =>
  categoriesByName.get(name.trim().toLowerCase()) ?? { name, color: 'gray', icon: OtherIcon }
