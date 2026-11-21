import { useLocation } from 'react-router'
import {
  TransactionsTable,
  transactionFilterOptions,
  transactionsPageSize,
  useSampleTransactions,
  useTransactionsTable,
} from '@/modules/activity'
import { NoData } from '@/shared/components/NoData/NoData'
import { Pagination } from '@/shared/components/Pagination/Pagination'
import { Text } from '@/shared/components/Text/Text'
import { useFilterParams } from '@/shared/hooks/useFilterParams'
import { usePageParam } from '@/shared/hooks/usePageParam'
import { useSearchParam } from '@/shared/hooks/useSearchParam'
import { useSortParam } from '@/shared/hooks/useSortParam'
import { cn } from '@/shared/utils/cn'
import { Header } from '@/shared/widgets/Header/Header'

export const ActivityPage = () => {
  const location = useLocation()
  const { columns } = useTransactionsTable()
  const [search] = useSearchParam()
  const [page] = usePageParam(1)
  const [sort] = useSortParam()
  const { filters, hasFilters } = useFilterParams(transactionFilterOptions)

  const transactions = useSampleTransactions({
    search,
    sort,
    filters,
    page,
    pageSize: transactionsPageSize,
  })

  const { isLoading, isError } = transactions
  const hasRows = !isError && transactions.data.length > 0
  const isEmpty = !isLoading && !isError && transactions.data.length === 0
  const isFiltered = hasFilters || search !== ''

  return (
    <div className="flex h-full flex-col">
      <Header title="Activity" />
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
          title={isFiltered ? 'No matching transactions' : 'No transactions yet'}
          description={
            isFiltered
              ? 'Try a different search or clear the filters.'
              : 'Add one by hand or upload a receipt.'
          }
        />
      )}
      {hasRows && <Pagination className="mt-4" {...transactions.pagination} />}
    </div>
  )
}
