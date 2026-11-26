import { useState } from 'react'
import { sampleDeals, type Deal } from '@/modules/deals'
import { sampleShoppingList, shoppingListCurrency } from '../constants'
import type { ShoppingListItem, ShoppingListItemDetails } from '../types'

const toWords = (text: string) =>
  text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)

const matchesItem = (deal: Deal, itemWords: string[]) => {
  const dealWords = [deal.productName, deal.description].flatMap(toWords)

  return itemWords.every((itemWord) => dealWords.some((dealWord) => dealWord.startsWith(itemWord)))
}

const findDeals = (name: string) => {
  const itemWords = toWords(name)

  if (itemWords.length === 0) return []

  return sampleDeals.filter((deal) => matchesItem(deal, itemWords))
}

export const useSampleShoppingList = () => {
  const [items, setItems] = useState(sampleShoppingList)
  const data: ShoppingListItem[] = items.map((item) => ({ ...item, deals: findDeals(item.name) }))

  const addItem = (details: ShoppingListItemDetails) => {
    setItems((current) => [
      ...current,
      { ...details, id: crypto.randomUUID(), currency: shoppingListCurrency },
    ])
  }

  const updateItem = (id: string, details: ShoppingListItemDetails) => {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, ...details } : item)))
  }

  const deleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  return {
    data,
    isLoading: false,
    isError: false,
    refetch: () => {},
    addItem,
    updateItem,
    deleteItem,
  }
}
