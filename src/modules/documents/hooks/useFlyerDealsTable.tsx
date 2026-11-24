import { Badge } from '@/shared/components/Badge/Badge'
import type { TableColumn } from '@/shared/components/Table/types'
import { Text } from '@/shared/components/Text/Text'
import { formatMoney } from '@/shared/utils/money'
import type { FlyerDeal } from '../types'
import { getDealSaving } from '../utils'

interface UseFlyerDealsTableOptions {
  currency: string
}

export const useFlyerDealsTable = ({ currency }: UseFlyerDealsTableOptions) => {
  const columns: TableColumn<FlyerDeal>[] = [
    {
      id: 'product',
      header: 'Product',
      cell: (deal) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <Text render={<span />} size="sm" weight="medium" color="strong">
              {deal.translatedName}
            </Text>
            {deal.onShoppingList && <Badge className="px-2 py-0.5 text-xs">On your list</Badge>}
          </div>
          <Text render={<span lang="sv" />} size="sm" color="muted">
            {deal.originalName}
          </Text>
        </div>
      ),
    },
    {
      id: 'price',
      header: 'Price',
      align: 'right',
      className: 'whitespace-nowrap tabular-nums',
      cell: (deal) => (
        <div className="flex flex-col items-end gap-0.5">
          <Text render={<span />} size="sm" weight="semibold" color="strong">
            {formatMoney(deal.price, { currency, decimals: 'always' })}
          </Text>
          <Text render={<s />} size="sm" color="muted">
            <span className="sr-only">Was </span>
            {formatMoney(deal.originalPrice, { currency, decimals: 'always' })}
          </Text>
        </div>
      ),
    },
    {
      id: 'saving',
      header: 'Saving',
      align: 'right',
      className: 'hidden whitespace-nowrap tabular-nums sm:table-cell',
      cell: (deal) => `${getDealSaving(deal)}%`,
    },
  ]

  return { columns }
}
