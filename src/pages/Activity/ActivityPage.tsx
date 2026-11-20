import { TransactionsTable, useSampleTransactions } from '@/modules/activity'
import { Header } from '@/shared/widgets/Header/Header'

export const ActivityPage = () => {
  const transactions = useSampleTransactions()

  return (
    <>
      <Header title="Activity" />
      <div className="pt-4">
        <TransactionsTable
          transactions={transactions.data}
          hasMore={transactions.hasNextPage}
          isLoading={transactions.isLoading}
          isFetchingMore={transactions.isFetchingNextPage}
          isError={transactions.isError}
          onLoadMore={transactions.fetchNextPage}
          onRetry={transactions.refetch}
        />
      </div>
    </>
  )
}
