import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { CategoryIcon } from '@/shared/components/CategoryIcon/CategoryIcon'
import type { TableColumn } from '@/shared/components/Table/types'
import { Text } from '@/shared/components/Text/Text'
import { getCategory } from '@/shared/utils/categories'
import { cn } from '@/shared/utils/cn'
import { formatShortDate } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { Transaction } from '../types'

interface UseTransactionsTableOptions {
  onEdit: (transaction: Transaction) => void
}

export const useTransactionsTable = ({ onEdit }: UseTransactionsTableOptions) => {
  const columns: TableColumn<Transaction>[] = [
    {
      id: 'date',
      header: 'Date',
      sort: true,
      className: 'whitespace-nowrap',
      cell: (transaction) => (
        <Text render={<time dateTime={transaction.date} />} size="sm" color="muted">
          {formatShortDate(transaction.date)}
        </Text>
      ),
    },
    {
      id: 'title',
      header: 'Title',
      sort: true,
      cell: (transaction) => (
        <div className="flex min-w-40 flex-col gap-0.5">
          <button
            type="button"
            aria-label={`Edit ${transaction.title}`}
            className="cursor-pointer text-left outline-none after:absolute after:inset-0 focus-visible:after:ring-[3px] focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
            onClick={() => onEdit(transaction)}
          >
            <Text render={<span />} size="sm" weight="medium" color="strong">
              {transaction.title}
            </Text>
          </button>
          <Text size="sm" color="muted">
            {transaction.description}
          </Text>
        </div>
      ),
    },
    {
      id: 'category',
      header: 'Category',
      className: 'hidden whitespace-nowrap md:table-cell',
      cell: (transaction) => {
        const category = getCategory(transaction.category)

        return (
          <div className="flex items-center gap-3">
            <CategoryIcon category={category} className="size-8 rounded-md" />
            <Text render={<span />} size="sm">
              {category.name}
            </Text>
          </div>
        )
      },
    },
    {
      id: 'source',
      header: 'Source',
      className: 'hidden whitespace-nowrap lg:table-cell',
      cell: (transaction) => (
        <Text render={<span />} size="sm" color="muted">
          {transaction.source}
        </Text>
      ),
    },
    {
      id: 'bankStatement',
      header: 'Bank statement',
      className: 'hidden whitespace-nowrap sm:table-cell',
      cell: (transaction) =>
        transaction.bankStatementChecked ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-income">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-4" aria-hidden />
            Checked
          </span>
        ) : (
          <Text render={<span />} size="sm" color="muted">
            Not checked
          </Text>
        ),
    },
    {
      id: 'currency',
      header: 'Currency',
      hidden: true,
      cell: (transaction) => transaction.currency,
    },
    {
      id: 'amount',
      header: 'Amount',
      sort: true,
      align: 'right',
      className: 'whitespace-nowrap',
      cell: (transaction) => {
        const isIncome = transaction.category === 'Income'

        return (
          <Text
            render={<span />}
            size="sm"
            weight="medium"
            color={isIncome ? 'inherit' : 'strong'}
            className={cn('tabular-nums', isIncome && 'text-income')}
          >
            {isIncome && '+'}
            {formatMoney(transaction.amount, { currency: transaction.currency })}
          </Text>
        )
      },
    },
  ]

  return { columns }
}
