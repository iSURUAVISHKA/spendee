import { DataTable } from '@/shared/components/DataTable/DataTable'
import type { DataTableProps } from '@/shared/components/DataTable/types'
import type { Transaction } from '../../types'

interface TransactionsTableProps extends Omit<
  DataTableProps<Transaction>,
  'label' | 'rows' | 'getRowId'
> {
  transactions: Transaction[]
}

export const TransactionsTable = ({ transactions, ...props }: TransactionsTableProps) => {
  return (
    <DataTable
      label="Transactions"
      rows={transactions}
      getRowId={(transaction) => transaction.id}
      {...props}
    />
  )
}
