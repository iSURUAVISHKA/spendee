import {
  DealsForYou,
  RecentActivity,
  SpendingByCategory,
  Summary,
  TipOfTheWeek,
  ToReview,
  type ActivityItem,
  type CategorySpending,
  type Deal,
  type ReviewItem,
  type StoreSpending,
  type SummaryItem,
} from '@/modules/dashboard'
import { formatMoney } from '@/shared/utils/money'
import { Header } from '@/shared/widgets/Header/Header'

const summaryItems: SummaryItem[] = [
  { title: 'Total Spent', value: formatMoney(245000, { decimals: 'never' }) },
  { title: 'Total Spent Last Month', value: formatMoney(218000, { decimals: 'never' }) },
  { title: 'Total Transactions', value: '128' },
  { title: 'Monthly Status', value: 'On Track' },
]

const categories: CategorySpending[] = [
  { categoryName: 'Housing', amount: 895000 },
  { categoryName: 'Groceries', amount: 164200 },
  { categoryName: 'Transport', amount: 79500 },
  { categoryName: 'Eating out', amount: 68400 },
  { categoryName: 'Bills and utilities', amount: 28900 },
  { categoryName: 'Subscriptions', amount: 12600 },
]

const topStores: StoreSpending[] = [
  { id: 'willys', name: 'Willys', amount: 64200 },
  { id: 'lidl', name: 'Lidl', amount: 49800 },
  { id: 'ica-nara', name: 'ICA Nära', amount: 31200 },
  { id: 'coop', name: 'Coop', amount: 19000 },
]

const recentActivity: ActivityItem[] = [
  {
    id: '1',
    title: 'Thai Kitchen',
    categoryName: 'Eating out',
    date: '2026-11-09',
    amount: 11900,
    type: 'expense',
  },
  {
    id: '2',
    title: 'ICA Nära',
    categoryName: 'Groceries',
    date: '2026-11-08',
    amount: 8650,
    type: 'expense',
  },
  {
    id: '3',
    title: 'Salary',
    categoryName: 'Income',
    date: '2026-11-04',
    amount: 3120000,
    type: 'income',
  },
  {
    id: '4',
    title: 'Rent',
    categoryName: 'Housing',
    date: '2026-11-01',
    amount: 895000,
    type: 'expense',
  },
]

const reviewItems: ReviewItem[] = [
  {
    id: 'receipt-1',
    kind: 'receipt',
    title: 'Willys receipt',
    description: `6 items · ${formatMoney(26140)}`,
    actionLabel: 'Review',
  },
  { id: 'flyer-1', kind: 'flyer', title: 'hemkop-week-46.pdf', description: 'Reading flyer…' },
  {
    id: 'statement-1',
    kind: 'statement',
    title: 'October statement',
    description: '5 payments have no receipt',
    actionLabel: 'Check',
  },
]

const deals: Deal[] = [
  {
    id: 'deal-1',
    productName: 'Chicken fillet, 1 kg',
    storeName: 'Lidl',
    endsOn: '2026-11-22',
    price: 9900,
    originalPrice: 10900,
  },
  {
    id: 'deal-2',
    productName: 'Coffee, 450 g',
    storeName: 'Lidl',
    endsOn: '2026-11-22',
    price: 3990,
    originalPrice: 5490,
  },
  {
    id: 'deal-3',
    productName: 'Pasta, 1 kg',
    storeName: 'Lidl',
    endsOn: '2026-11-22',
    price: 1790,
    originalPrice: 2290,
  },
]

export const DashboardPage = () => {
  return (
    <>
      <Header title="Dashboard" />
      <div className="pt-4">
        <Summary items={summaryItems} />
        <div className="mt-4 grid gap-4 xl:grid-cols-2">
          <SpendingByCategory
            title="Spending by category"
            actionLabel="Open Insights"
            onAction={() => {}}
            categories={categories}
            storesTitle="Top grocery stores"
            stores={topStores}
          />
          <RecentActivity
            title="Recent activity"
            actionLabel="See all"
            actionHref="/activity"
            items={recentActivity}
          />
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <ToReview title="To review" items={reviewItems} onItemAction={() => {}} />
          <DealsForYou
            title="Deals for you"
            actionLabel="All deals"
            actionHref="/deals"
            deals={deals}
          />
          <TipOfTheWeek
            title="Tip of the week"
            message="Coffee on the go: 9 times this month, 378 kr. Eating out is up 40% from October."
            confirmLabel="Useful"
            onConfirm={() => {}}
            dismissLabel="Not avoidable"
            onDismiss={() => {}}
          />
        </div>
      </div>
    </>
  )
}
