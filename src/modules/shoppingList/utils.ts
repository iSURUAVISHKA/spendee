import { dealStores, type Deal, type DealStore } from '@/modules/deals'
import type { ItemPrice, ShoppingListItem, ShoppingListTotals, StoreTotals } from './types'

const findBestDeal = (deals: Deal[], store: DealStore | null) =>
  deals
    .filter((deal) => store === null || deal.store === store)
    .reduce<Deal | null>((best, deal) => (best && best.price <= deal.price ? best : deal), null)

export const getItemPrice = (item: ShoppingListItem, store: DealStore | null): ItemPrice => {
  const deal = findBestDeal(item.deals, store)

  if (deal) {
    return {
      deal,
      total: deal.price * item.quantity,
      saving: (deal.originalPrice - deal.price) * item.quantity,
    }
  }

  return {
    deal: null,
    total: item.usualPrice === null ? null : item.usualPrice * item.quantity,
    saving: 0,
  }
}

export const getListTotals = (
  items: ShoppingListItem[],
  store: DealStore | null,
): ShoppingListTotals =>
  items.reduce<ShoppingListTotals>(
    (totals, item) => {
      const price = getItemPrice(item, store)

      return {
        total: totals.total + (price.total ?? 0),
        saving: totals.saving + price.saving,
        dealCount: totals.dealCount + (price.deal ? 1 : 0),
        unpricedCount: totals.unpricedCount + (price.total === null ? 1 : 0),
      }
    },
    { total: 0, saving: 0, dealCount: 0, unpricedCount: 0 },
  )

export const getStoreTotals = (items: ShoppingListItem[]): StoreTotals[] =>
  [null, ...dealStores].map((store) => ({ store, ...getListTotals(items, store) }))

const compareTotals = (a: ShoppingListTotals, b: ShoppingListTotals) =>
  a.unpricedCount - b.unpricedCount || a.total - b.total

export const getCheapestStore = (storeTotals: StoreTotals[]) => {
  const [cheapest, runnerUp] = storeTotals
    .filter((totals) => totals.store !== null && totals.dealCount > 0)
    .toSorted(compareTotals)

  if (!cheapest || (runnerUp && compareTotals(cheapest, runnerUp) === 0)) return null

  return cheapest.store
}

export const getStoreLabel = (store: DealStore | null) => store ?? 'All stores'

export const formatUnpricedCount = (count: number) =>
  count === 1 ? '1 item has no price' : `${count} items have no price`
