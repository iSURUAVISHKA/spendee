import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatWeekday } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { Deal } from '../../types'

interface DealRowProps {
  deal: Deal
  className?: string
}

export const DealRow = ({ deal, className }: DealRowProps) => {
  return (
    <li
      className={cn('flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0', className)}
    >
      <div className="flex min-w-0 flex-col gap-0.5">
        <Text weight="medium" color="strong" className="truncate">
          {deal.productName}
        </Text>
        <Text size="sm" color="muted" className="truncate">
          {deal.storeName} · Ends <time dateTime={deal.endsOn}>{formatWeekday(deal.endsOn)}</time>
        </Text>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5 tabular-nums">
        <Text weight="semibold" color="strong">
          {formatMoney(deal.price, { decimals: 'always' })}
        </Text>
        <Text render={<s />} size="sm" color="muted">
          <span className="sr-only">Was </span>
          {formatMoney(deal.originalPrice, { decimals: 'always', showCurrency: false })}
        </Text>
      </div>
    </li>
  )
}
