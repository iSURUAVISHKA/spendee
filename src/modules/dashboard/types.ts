export interface SummaryItem {
  title: string
  value: string
}

export interface CategorySpending {
  categoryName: string
  amount: number
}

export interface StoreSpending {
  id: string
  name: string
  amount: number
}

export type ActivityType = 'expense' | 'income'

export interface ActivityItem {
  id: string
  title: string
  categoryName: string
  date: string
  amount: number
  type: ActivityType
}

export type ReviewKind = 'receipt' | 'flyer' | 'statement'

export interface ReviewItem {
  id: string
  kind: ReviewKind
  title: string
  description: string
  actionLabel?: string
}

export interface Deal {
  id: string
  productName: string
  storeName: string
  endsOn: string
  price: number
  originalPrice: number
}
