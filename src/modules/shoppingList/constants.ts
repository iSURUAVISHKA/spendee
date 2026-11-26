import type { ShoppingListItem } from './types'

export const shoppingStoreParam = 'store'

export const shoppingListCurrency = 'SEK'

export const sampleShoppingList: Omit<ShoppingListItem, 'deals'>[] = [
  { id: 'item-1', name: 'Coffee', quantity: 2, usualPrice: 5490, currency: 'SEK' },
  { id: 'item-2', name: 'Milk', quantity: 3, usualPrice: 2290, currency: 'SEK' },
  { id: 'item-3', name: 'Eggs', quantity: 1, usualPrice: 3990, currency: 'SEK' },
  { id: 'item-4', name: 'Bananas', quantity: 1, usualPrice: 2490, currency: 'SEK' },
  { id: 'item-5', name: 'Chicken fillet', quantity: 1, usualPrice: 11990, currency: 'SEK' },
  { id: 'item-6', name: 'Toothpaste', quantity: 2, usualPrice: 2990, currency: 'SEK' },
  { id: 'item-7', name: 'Batteries', quantity: 1, usualPrice: null, currency: 'SEK' },
]
