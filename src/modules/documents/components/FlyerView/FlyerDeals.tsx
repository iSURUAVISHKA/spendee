import { Card } from '@/shared/components/Card/Card'
import { DataTable } from '@/shared/components/DataTable/DataTable'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { useFlyerDealsTable } from '../../hooks/useFlyerDealsTable'
import type { FlyerDocument } from '../../types'

interface FlyerDealsProps {
  flyer: FlyerDocument
  className?: string
}

export const FlyerDeals = ({ flyer, className }: FlyerDealsProps) => {
  const { deals, currency } = flyer.findings
  const { columns } = useFlyerDealsTable({ currency })
  const sortedDeals = deals.toSorted((a, b) => Number(b.onShoppingList) - Number(a.onShoppingList))

  return (
    <Card className={cn('gap-4', className)}>
      <Text render={<h2 />} size="xl" weight="semibold" color="strong">
        Deals
      </Text>
      {deals.length > 0 ? (
        <DataTable
          label="Flyer deals"
          columns={columns}
          rows={sortedDeals}
          getRowId={(deal) => deal.id}
          isLoading={false}
        />
      ) : (
        <Text size="sm" color="muted">
          No deals found in this flyer.
        </Text>
      )}
    </Card>
  )
}
