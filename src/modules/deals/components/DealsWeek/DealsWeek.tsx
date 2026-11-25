import { Text } from '@/shared/components/Text/Text'
import type { Week } from '@/shared/types/week'
import { cn } from '@/shared/utils/cn'
import { formatShortDateRange } from '@/shared/utils/dates'

interface DealsWeekProps {
  week: Week
  className?: string
}

export const DealsWeek = ({ week, className }: DealsWeekProps) => {
  return (
    <Text
      size="sm"
      color="muted"
      className={cn('flex items-baseline gap-2 whitespace-nowrap', className)}
    >
      <Text render={<span />} weight="semibold" color="strong">
        Week {week.number}
      </Text>
      {formatShortDateRange(week.start, week.end)}
    </Text>
  )
}
