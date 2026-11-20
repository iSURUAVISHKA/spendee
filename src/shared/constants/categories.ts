import BillsIcon from '@/shared/assets/icon/Bills.svg?react'
import EatingOutIcon from '@/shared/assets/icon/EatingOut.svg?react'
import GroceriesIcon from '@/shared/assets/icon/Groceries.svg?react'
import HousingIcon from '@/shared/assets/icon/Housing.svg?react'
import IncomeIcon from '@/shared/assets/icon/Income.svg?react'
import SubscriptionIcon from '@/shared/assets/icon/Subscription.svg?react'
import TransportIcon from '@/shared/assets/icon/Transport.svg?react'
import type { Category, CategoryColor } from '@/shared/types/category'

export const categories: Category[] = [
  { name: 'Housing', color: 'purple', icon: HousingIcon },
  { name: 'Groceries', color: 'green', icon: GroceriesIcon },
  { name: 'Transport', color: 'blue', icon: TransportIcon },
  { name: 'Eating out', color: 'orange', icon: EatingOutIcon },
  { name: 'Bills and utilities', color: 'cyan', icon: BillsIcon },
  { name: 'Subscriptions', color: 'yellow', icon: SubscriptionIcon },
  { name: 'Income', color: 'green', icon: IncomeIcon },
]

export const categoryBgClass: Record<CategoryColor, string> = {
  purple: 'bg-category-purple',
  green: 'bg-income',
  blue: 'bg-category-blue',
  orange: 'bg-category-orange',
  cyan: 'bg-category-cyan',
  yellow: 'bg-category-yellow',
  gray: 'bg-muted-foreground',
}
