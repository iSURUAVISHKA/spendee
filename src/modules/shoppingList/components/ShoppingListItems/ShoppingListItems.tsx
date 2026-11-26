import type { DealStore } from '@/modules/deals'
import { Button } from '@/shared/components/Button/Button'
import { Card } from '@/shared/components/Card/Card'
import { NoData } from '@/shared/components/NoData/NoData'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { ShoppingListItem } from '../../types'
import { ShoppingListItemRow } from './ShoppingListItemRow'
import { ShoppingListItemRowSkeleton } from './ShoppingListItemRowSkeleton'

interface ShoppingListItemsProps {
  items: ShoppingListItem[]
  store: DealStore | null
  isLoading: boolean
  isError: boolean
  onRetry: () => void
  onAdd: () => void
  onEdit: (item: ShoppingListItem) => void
  onDelete: (item: ShoppingListItem) => void
  skeletonCount?: number
  className?: string
}

export const ShoppingListItems = ({
  items,
  store,
  isLoading,
  isError,
  onRetry,
  onAdd,
  onEdit,
  onDelete,
  skeletonCount = 6,
  className,
}: ShoppingListItemsProps) => {
  const hasItems = !isError && items.length > 0
  const isEmpty = !isLoading && !isError && items.length === 0

  return (
    <Card className={cn('gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Your list
        </Text>
        <Text size="sm" color="muted">
          {store ? `This week's prices at ${store}.` : "This week's best price for each item."}
        </Text>
      </div>
      {(isLoading || hasItems) && (
        <ul
          aria-label="Shopping list"
          aria-busy={isLoading}
          className="flex flex-col divide-y divide-muted"
        >
          {isLoading
            ? Array.from({ length: skeletonCount }, (_, index) => (
                <ShoppingListItemRowSkeleton key={index} />
              ))
            : items.map((item) => (
                <ShoppingListItemRow
                  key={item.id}
                  item={item}
                  store={store}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
        </ul>
      )}
      {isError && (
        <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
          <Text size="sm" color="muted">
            Couldn't load your shopping list.
          </Text>
          <Button variant="secondary" disabled={false} onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
      {isEmpty && (
        <div className="flex flex-col items-center gap-4 pb-8">
          <NoData
            className="pb-0"
            title="Your list is empty"
            description="Add what you need and we'll look for this week's deals."
          />
          <Button variant="secondary" disabled={false} onClick={onAdd}>
            Add item
          </Button>
        </div>
      )}
    </Card>
  )
}
