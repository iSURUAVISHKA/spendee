import type { Transaction } from './types'

export const transactionsPageSize = 25

type TransactionTemplate = Omit<Transaction, 'id' | 'date' | 'bankStatementChecked'>

const transactionTemplates: TransactionTemplate[] = [
  {
    title: 'Thai Kitchen',
    description: 'Dinner',
    category: 'Eating out',
    source: 'By hand',
    amount: 11900,
    currency: 'SEK',
  },
  {
    title: 'Willys',
    description: 'Weekly groceries',
    category: 'Groceries',
    source: 'Receipt',
    amount: 64250,
    currency: 'SEK',
  },
  {
    title: 'SL',
    description: 'Monthly travel card',
    category: 'Transport',
    source: 'Bank statement',
    amount: 97000,
    currency: 'SEK',
  },
  {
    title: 'Spotify',
    description: 'Premium family',
    category: 'Subscriptions',
    source: 'Bank statement',
    amount: 18900,
    currency: 'SEK',
  },
  {
    title: 'Lidl',
    description: 'Fruit and vegetables',
    category: 'Groceries',
    source: 'Receipt',
    amount: 23475,
    currency: 'SEK',
  },
  {
    title: 'Vattenfall',
    description: 'Electricity',
    category: 'Bills and utilities',
    source: 'Bank statement',
    amount: 54300,
    currency: 'SEK',
  },
  {
    title: 'Max Burgers',
    description: 'Lunch',
    category: 'Eating out',
    source: 'By hand',
    amount: 10900,
    currency: 'SEK',
  },
  {
    title: 'Swish payment',
    description: 'Shared dinner',
    category: 'Income',
    source: 'By hand',
    amount: 25000,
    currency: 'SEK',
  },
  {
    title: 'ICA Nära',
    description: 'Snacks',
    category: 'Groceries',
    source: 'Receipt',
    amount: 8790,
    currency: 'SEK',
  },
  {
    title: 'Netflix',
    description: 'Standard plan',
    category: 'Subscriptions',
    source: 'Bank statement',
    amount: 12900,
    currency: 'SEK',
  },
  {
    title: 'Circle K',
    description: 'Fuel',
    category: 'Transport',
    source: 'Receipt',
    amount: 72000,
    currency: 'SEK',
  },
  {
    title: 'Clas Ohlson',
    description: 'Light bulbs',
    category: 'Housing',
    source: 'Receipt',
    amount: 14990,
    currency: 'SEK',
  },
]

const toIsoDate = (daysBefore: number) =>
  new Date(Date.UTC(2026, 10, 9 - daysBefore)).toISOString().slice(0, 10)

export const sampleTransactions: Transaction[] = Array.from({ length: 150 }, (_, index) => ({
  ...transactionTemplates[index % transactionTemplates.length],
  id: `txn-${String(index + 1).padStart(3, '0')}`,
  date: toIsoDate(Math.floor(index / 2)),
  bankStatementChecked: index % 3 !== 0,
}))
