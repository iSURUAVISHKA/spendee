import { useState } from 'react'
import type { YearMonth } from '@/shared/components/MonthPicker/types'
import { toMonthKey } from '@/shared/components/MonthPicker/utils'
import type { PaginationData } from '@/shared/components/Pagination/types'
import type { SortState } from '@/shared/components/Table/types'
import { sampleTransactions } from '../constants'
import type {
  BankStatementStatus,
  Transaction,
  TransactionDetails,
  TransactionFilters,
} from '../types'

const comparators: Partial<Record<string, (a: Transaction, b: Transaction) => number>> = {
  date: (a, b) => a.date.localeCompare(b.date),
  title: (a, b) => a.title.localeCompare(b.title, 'sv'),
  amount: (a, b) => a.amount - b.amount,
}

interface UseSampleTransactionsOptions {
  search: string
  sort: SortState | null
  filters: TransactionFilters
  month: YearMonth
  page: number
  pageSize: number
}

const matchesSearch = (transaction: Transaction, search: string) => {
  const query = search.trim().toLowerCase()

  if (!query) return true

  return [transaction.title, transaction.description].some((text) =>
    text.toLowerCase().includes(query),
  )
}

const matches = <Value extends string>(selected: Value[], value: Value) =>
  selected.length === 0 || selected.includes(value)

const matchesFilters = (transaction: Transaction, filters: TransactionFilters) => {
  const bankStatement: BankStatementStatus = transaction.bankStatementChecked
    ? 'checked'
    : 'unchecked'

  return (
    matches(filters.category, transaction.category) &&
    matches(filters.source, transaction.source) &&
    matches(filters.bankStatement, bankStatement)
  )
}

const queryTransactions = (
  transactions: Transaction[],
  { search, sort, filters, month }: UseSampleTransactionsOptions,
) => {
  const monthKey = toMonthKey(month)
  const filtered = transactions.filter(
    (transaction) =>
      transaction.date.startsWith(monthKey) &&
      matchesSearch(transaction, search) &&
      matchesFilters(transaction, filters),
  )

  if (!sort) return filtered

  const compare = comparators[sort.columnId]

  if (!compare) return filtered

  const direction = sort.direction === 'asc' ? 1 : -1

  return [...filtered].sort((a, b) => compare(a, b) * direction)
}

export const useSampleTransactions = (options: UseSampleTransactionsOptions) => {
  const { page, pageSize } = options
  const [transactions, setTransactions] = useState(sampleTransactions)
  const results = queryTransactions(transactions, options)
  const lastPage = Math.max(1, Math.ceil(results.length / pageSize))
  const currentPage = Math.min(page, lastPage)
  const start = (currentPage - 1) * pageSize

  const pagination: PaginationData = {
    page: currentPage,
    pageSize,
    totalCount: results.length,
  }

  const updateTransaction = (id: string, details: TransactionDetails) => {
    setTransactions((current) =>
      current.map((transaction) =>
        transaction.id === id ? { ...transaction, ...details } : transaction,
      ),
    )
  }

  return {
    data: results.slice(start, start + pageSize),
    pagination,
    isLoading: false,
    isError: false,
    refetch: () => {},
    updateTransaction,
  }
}
