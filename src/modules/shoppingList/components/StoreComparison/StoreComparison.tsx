import { dealStores, type DealStore } from '@/modules/deals'
import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { ShoppingListItem } from '../../types'
import { getCheapestStore, getStoreTotals } from '../../utils'
import { StoreComparisonRow } from './StoreComparisonRow'
import { StoreComparisonRowSkeleton } from './StoreComparisonRowSkeleton'

interface StoreComparisonProps {
  items: ShoppingListItem[]
  selectedStore: DealStore | null
  onStoreChange: (store: DealStore | null) => void
  isLoading: boolean
  className?: string
}

export const StoreComparison = ({
  items,
  selectedStore,
  onStoreChange,
  isLoading,
  className,
}: StoreComparisonProps) => {
  const storeTotals = getStoreTotals(items)
  const cheapestStore = getCheapestStore(storeTotals)

  return (
    <Card className={cn('gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Compare stores
        </Text>
        <Text size="sm" color="muted">
          Pick a store to see what your list costs there.
        </Text>
      </div>
      <ul aria-label="Stores" aria-busy={isLoading} className="flex flex-col gap-2">
        {isLoading
          ? [null, ...dealStores].map((store) => (
              <StoreComparisonRowSkeleton key={store ?? 'all'} />
            ))
          : storeTotals.map((totals) => (
              <StoreComparisonRow
                key={totals.store ?? 'all'}
                totals={totals}
                isSelected={totals.store === selectedStore}
                isCheapest={totals.store !== null && totals.store === cheapestStore}
                onSelect={() => onStoreChange(totals.store)}
              />
            ))}
      </ul>
    </Card>
  )
}
