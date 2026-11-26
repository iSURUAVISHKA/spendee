import type { DealStore } from '@/modules/deals'
import { cn } from '@/shared/utils/cn'
import { formatMoney } from '@/shared/utils/money'
import { shoppingListCurrency } from '../../constants'
import type { ShoppingListItem } from '../../types'
import { formatUnpricedCount, getListTotals } from '../../utils'
import { ShoppingListStat } from './ShoppingListStat'

interface ShoppingListSummaryProps {
  items: ShoppingListItem[]
  store: DealStore | null
  isLoading: boolean
  className?: string
}

export const ShoppingListSummary = ({
  items,
  store,
  isLoading,
  className,
}: ShoppingListSummaryProps) => {
  const totals = getListTotals(items, store)
  const storeText = store ? `At ${store}` : 'Best price at any store'
  const totalText =
    totals.unpricedCount > 0
      ? `${storeText} · ${formatUnpricedCount(totals.unpricedCount)}`
      : storeText

  return (
    <dl className={cn('grid gap-4 sm:grid-cols-3', className)}>
      <ShoppingListStat
        label="Estimated total"
        value={formatMoney(totals.total, { currency: shoppingListCurrency, decimals: 'always' })}
        description={totalText}
        isLoading={isLoading}
      />
      <ShoppingListStat
        label="You save"
        value={formatMoney(totals.saving, { currency: shoppingListCurrency, decimals: 'always' })}
        description="Compared with regular prices"
        isLoading={isLoading}
        highlight={totals.saving > 0}
      />
      <ShoppingListStat
        label="Deals found"
        value={`${totals.dealCount} of ${items.length}`}
        description="Items on sale this week"
        isLoading={isLoading}
      />
    </dl>
  )
}
