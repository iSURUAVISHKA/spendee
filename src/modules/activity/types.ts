export type TransactionSource = 'By hand' | 'Receipt' | 'Bank statement'

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
