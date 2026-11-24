import type { TableColumn } from '@/shared/components/Table/types'
import { Text } from '@/shared/components/Text/Text'
import { formatMoney } from '@/shared/utils/money'
import type { ReceiptLineItem } from '../types'

interface UseReceiptLineItemsTableOptions {
  currency: string
}

export const useReceiptLineItemsTable = ({ currency }: UseReceiptLineItemsTableOptions) => {
  const columns: TableColumn<ReceiptLineItem>[] = [
    {
      id: 'item',
      header: 'Item',
      cell: (item) => (
        <div className="flex flex-col gap-0.5">
          <Text render={<span />} size="sm" weight="medium" color="strong">
            {item.translatedName}
          </Text>
          <Text render={<span lang="sv" />} size="sm" color="muted">
            {item.originalName}
          </Text>
        </div>
      ),
    },
    {
      id: 'quantity',
      header: 'Qty',
      align: 'right',
      className: 'tabular-nums',
      cell: (item) => item.quantity,
    },
    {
      id: 'amount',
      header: 'Amount',
      align: 'right',
      className: 'whitespace-nowrap tabular-nums',
      cell: (item) => formatMoney(item.amount, { currency }),
    },
  ]

  return { columns }
}
