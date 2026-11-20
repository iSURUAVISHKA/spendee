import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { CategorySpending, StoreSpending } from '../../types'
import { CategoryRow } from '../CategoryRow/CategoryRow'
import { SectionHeader } from '../SectionHeader/SectionHeader'
import { TopStores } from '../TopStores/TopStores'

interface SpendingByCategoryProps {
  title: string
  actionLabel?: string
  onAction?: () => void
  categories: CategorySpending[]
  storesTitle: string
  stores: StoreSpending[]
  className?: string
}

export const SpendingByCategory = ({
  title,
  actionLabel,
  onAction,
  categories,
  storesTitle,
  stores,
  className,
}: SpendingByCategoryProps) => {
  const max = Math.max(1, ...categories.map((category) => category.amount))

  return (
    <Card className={cn('flex flex-col gap-5', className)}>
      <SectionHeader title={title} actionLabel={actionLabel} onAction={onAction} />
      {categories.length > 0 ? (
        <ul className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-4 sm:grid-cols-[auto_1fr_auto]">
          {categories.map((category) => (
            <CategoryRow
              key={category.categoryName}
              categoryName={category.categoryName}
              amount={category.amount}
              max={max}
            />
          ))}
        </ul>
      ) : (
        <Text size="sm" color="muted">
          No spending yet.
        </Text>
      )}
      {stores.length > 0 && <TopStores title={storesTitle} stores={stores} />}
    </Card>
  )
}
