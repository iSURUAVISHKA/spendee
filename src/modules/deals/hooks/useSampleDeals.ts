import { useState } from 'react'
import { paginate } from '@/shared/utils/paginate'
import { sampleDeals } from '../constants'
import type { Deal, DealFilterValues, DealSort, DealStore } from '../types'

interface UseSampleDealsOptions {
  search: string
  filters: DealFilterValues
  sort: DealSort
  page: number
  pageSize: number
}

const comparators: Record<DealSort, (a: Deal, b: Deal) => number> = {
  'price.asc': (a, b) => a.price - b.price,
  'price.desc': (a, b) => b.price - a.price,
}

const matchesSearch = (deal: Deal, search: string) => {
  const query = search.trim().toLowerCase()

  if (!query) return true

  return [deal.productName, deal.description].some((text) => text.toLowerCase().includes(query))
}

const matchesStore = (deal: Deal, stores: DealStore[]) =>
  stores.length === 0 || stores.includes(deal.store)

export const useSampleDeals = ({
  search,
  filters,
  sort,
  page,
  pageSize,
}: UseSampleDealsOptions) => {
  const [deals, setDeals] = useState(sampleDeals)
  const results = deals
    .filter((deal) => matchesSearch(deal, search) && matchesStore(deal, filters.store))
    .toSorted(comparators[sort])
  const { data, pagination } = paginate(results, page, pageSize)

  const addToShoppingList = (id: number) => {
    setDeals((current) =>
      current.map((deal) => (deal.id === id ? { ...deal, onShoppingList: true } : deal)),
    )
  }

  return {
    data,
    pagination,
    isLoading: false,
    isError: false,
    refetch: () => {},
    addToShoppingList,
  }
}
