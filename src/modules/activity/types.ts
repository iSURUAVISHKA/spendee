export type TransactionSource = 'By hand' | 'Receipt' | 'Bank statement'

export type BankStatementStatus = 'checked' | 'unchecked'

export interface TransactionFilters {
  category: string[]
  source: TransactionSource[]
  bankStatement: BankStatementStatus[]
}

export interface FilterOption<Value extends string> {
  value: Value
  label: string
}

export interface Transaction {
  id: string
  date: string
  title: string
  description: string
  category: string
  source: TransactionSource
  amount: number
  currency: string
  bankStatementChecked: boolean
}

export type TransactionDetails = Pick<Transaction, 'date' | 'title' | 'category' | 'amount'>
