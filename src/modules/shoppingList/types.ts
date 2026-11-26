import type { Deal, DealStore } from '@/modules/deals'

export interface ShoppingListItem {
  id: string
  name: string
  quantity: number
  usualPrice: number | null
  currency: string
  deals: Deal[]
}

export type ShoppingListItemDetails = Pick<ShoppingListItem, 'name' | 'quantity' | 'usualPrice'>

export interface ItemPrice {
  deal: Deal | null
  total: number | null
  saving: number
}

export interface ShoppingListTotals {
  total: number
  saving: number
  dealCount: number
  unpricedCount: number
}

export interface StoreTotals extends ShoppingListTotals {
  store: DealStore | null
}
