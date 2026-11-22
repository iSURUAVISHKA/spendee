import { useState } from 'react'
import { useLocation } from 'react-router'
import {
  ActivityFilters,
  EditTransactionModal,
  TransactionsTable,
  type Transaction,
  type TransactionDetails,
  transactionFilterOptions,
  transactionsPageSize,
  useSampleTransactions,
  useTransactionsTable,
} from '@/modules/activity'
import PlusIcon from '@/shared/assets/icon/Plus.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { IconButton } from '@/shared/components/Button/IconButton'
import { MonthPicker } from '@/shared/components/MonthPicker/MonthPicker'
import { NoData } from '@/shared/components/NoData/NoData'
import { Pagination } from '@/shared/components/Pagination/Pagination'
import { Text } from '@/shared/components/Text/Text'
import { useFilterParams } from '@/shared/hooks/useFilterParams'
import { useMonthParam } from '@/shared/hooks/useMonthParam'
import { usePageParam } from '@/shared/hooks/usePageParam'
import { useSearchParam } from '@/shared/hooks/useSearchParam'
import { useSortParam } from '@/shared/hooks/useSortParam'
import { cn } from '@/shared/utils/cn'
import { formatMonthYear } from '@/shared/utils/dates'
import { Header } from '@/shared/widgets/Header/Header'
import { TopBar } from '@/shared/widgets/TopBar/TopBar'

export const ActivityPage = () => {
  const location = useLocation()
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const openEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction)
    setIsEditOpen(true)
  }

  const { columns } = useTransactionsTable({ onEdit: openEdit })
  const [search] = useSearchParam()
  const [month, setMonth] = useMonthParam()
  const [page] = usePageParam(1)
  const [sort] = useSortParam()
  const { filters, hasFilters, changeFilter, clearFilters } =
    useFilterParams(transactionFilterOptions)

  const transactions = useSampleTransactions({
    search,
    sort,
    filters,
    month,
    page,
    pageSize: transactionsPageSize,
  })

  const { isLoading, isError } = transactions
  const hasRows = !isError && transactions.data.length > 0
  const isEmpty = !isLoading && !isError && transactions.data.length === 0
  const isFiltered = hasFilters || search !== ''

  const handleSave = (id: string, details: TransactionDetails) => {
    transactions.updateTransaction(id, details)
    setIsEditOpen(false)
  }

  return (
    <div className="flex h-full flex-col">
      <Header
        title="Activity"
        withSearch
        actions={
          <>
            <MonthPicker value={month} onValueChange={setMonth} />
            <IconButton icon={<PlusIcon aria-hidden />} text="Add" tooltip="Add transaction" />
          </>
        }
      />
      <TopBar
        className="mt-4"
        filters={<ActivityFilters filters={filters} onFilterChange={changeFilter} />}
        actions={
          hasFilters && (
            <Button variant="link" disabled={false} onClick={clearFilters}>
              Clear filters
            </Button>
          )
        }
      />
      <TransactionsTable
        key={location.search}
        className={cn('mt-4 min-h-0', (isLoading || hasRows) && 'flex-1')}
        columns={columns}
        transactions={isError ? [] : transactions.data}
        isLoading={isLoading}
      />
      {isError && (
        <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center">
          <Text size="sm" color="muted">
            Couldn't load your transactions.
          </Text>
        </div>
      )}
      {isEmpty && (
        <NoData
          title={
            isFiltered
              ? 'No matching transactions'
              : `No transactions in ${formatMonthYear(month.year, month.month)}`
          }
          description={
            isFiltered
              ? 'Try a different search or clear the filters.'
              : 'Add one by hand or upload a receipt.'
          }
        />
      )}
      {hasRows && <Pagination className="mt-4" {...transactions.pagination} />}
      <EditTransactionModal
        transaction={editingTransaction}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={handleSave}
      />
    </div>
  )
}
