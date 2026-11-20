import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from '@/shared/components/Meter/Meter'
import { categoryBgClass } from '@/shared/constants/categories'
import { getCategory } from '@/shared/utils/categories'
import { cn } from '@/shared/utils/cn'
import { formatMoney } from '@/shared/utils/money'

interface CategoryRowProps {
  categoryName: string
  amount: number
  max: number
  className?: string
}

export const CategoryRow = ({ categoryName, amount, max, className }: CategoryRowProps) => {
  const { name, color } = getCategory(categoryName)
  const formattedAmount = formatMoney(amount, { decimals: 'never' })

  return (
    <li className={cn('col-span-full grid grid-cols-subgrid', className)}>
      <Meter
        value={amount}
        max={max}
        aria-valuetext={formattedAmount}
        className="col-span-full grid grid-cols-subgrid items-center gap-y-2"
      >
        <MeterLabel className="flex min-w-0 items-center gap-3 text-foreground">
          <span
            aria-hidden
            className={cn('size-2.5 shrink-0 rounded-full', categoryBgClass[color])}
          />
          <span className="truncate">{name}</span>
        </MeterLabel>
        <MeterTrack className="order-last col-span-full sm:order-none sm:col-span-1">
          <MeterIndicator className={categoryBgClass[color]} />
        </MeterTrack>
        <MeterValue className="text-right font-semibold text-foreground-strong tabular-nums">
          {() => formattedAmount}
        </MeterValue>
      </Meter>
    </li>
  )
}
