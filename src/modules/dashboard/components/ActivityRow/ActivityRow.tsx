import { CategoryIcon } from '@/shared/components/CategoryIcon/CategoryIcon'
import { Text } from '@/shared/components/Text/Text'
import { getCategory } from '@/shared/utils/categories'
import { cn } from '@/shared/utils/cn'
import { formatShortDate } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { ActivityItem } from '../../types'

interface ActivityRowProps {
  item: ActivityItem
  className?: string
}

export const ActivityRow = ({ item, className }: ActivityRowProps) => {
  const category = getCategory(item.categoryName)
  const isIncome = item.type === 'income'

  return (
    <li className={cn('flex items-center gap-4', className)}>
      <CategoryIcon category={category} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Text weight="medium" color="strong" className="truncate">
          {item.title}
        </Text>
        <Text size="sm" color="muted" className="truncate">
          {category.name} · <time dateTime={item.date}>{formatShortDate(item.date)}</time>
        </Text>
      </div>
      <Text
        render={<span />}
        color={isIncome ? 'inherit' : 'strong'}
        className={cn('shrink-0 text-right tabular-nums', isIncome && 'text-income')}
      >
        {isIncome && '+'}
        {formatMoney(item.amount)}
      </Text>
    </li>
  )
}
