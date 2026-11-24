import type { TableColumn } from '@/shared/components/Table/types'
import { Text } from '@/shared/components/Text/Text'
import { formatDate } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { ReconciliationEntry, ReconciliationStatus } from '../types'
import { getAmountDifference } from '../utils'

const amountClass = 'whitespace-nowrap tabular-nums'

interface UseReconciliationTableOptions {
  status: ReconciliationStatus
  currency: string
}

export const useReconciliationTable = ({ status, currency }: UseReconciliationTableOptions) => {
  const formatAmount = (amount: number | null) =>
    amount === null ? '—' : formatMoney(amount, { currency })

  const formatDifference = (difference: number | null) => {
    if (difference === null) return '—'

    return `${difference > 0 ? '+' : ''}${formatMoney(difference, { currency })}`
  }

  const columns: TableColumn<ReconciliationEntry>[] = [
    {
      id: 'date',
      header: 'Date',
      className: 'whitespace-nowrap',
      cell: (entry) => (
        <Text render={<time dateTime={entry.date} />} size="sm" color="muted">
          {formatDate(entry.date)}
        </Text>
      ),
    },
    {
      id: 'description',
      header: 'Description',
      cell: (entry) => (
        <Text render={<span />} size="sm" weight="medium" color="strong">
          {entry.description}
        </Text>
      ),
    },
    {
      id: 'statementAmount',
      header: 'On statement',
      align: 'right',
      className: amountClass,
      hidden: status === 'notOnStatement',
      cell: (entry) => formatAmount(entry.statementAmount),
    },
    {
      id: 'receiptAmount',
      header: 'On receipt',
      align: 'right',
      className: amountClass,
      hidden: status === 'noReceipt',
      cell: (entry) => formatAmount(entry.receiptAmount),
    },
    {
      id: 'difference',
      header: 'Difference',
      align: 'right',
      className: amountClass,
      hidden: status !== 'amountDiffers',
      cell: (entry) => formatDifference(getAmountDifference(entry)),
    },
  ]

  return { columns }
}
