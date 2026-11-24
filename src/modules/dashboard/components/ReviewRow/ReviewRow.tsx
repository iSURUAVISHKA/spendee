import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { reviewKindStyles } from '../../constants'
import type { ReviewItem } from '../../types'
import { RoundIcon } from '../RoundIcon/RoundIcon'

interface ReviewRowProps {
  item: ReviewItem
  onAction?: (item: ReviewItem) => void
  className?: string
}

export const ReviewRow = ({ item, onAction, className }: ReviewRowProps) => {
  const { Icon, tone } = reviewKindStyles[item.kind]

  return (
    <li className={cn('flex items-center gap-3', className)}>
      <RoundIcon icon={<Icon />} tone={tone} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Text weight="semibold" color="strong" className="truncate">
          {item.title}
        </Text>
        <Text size="sm" color="muted" className="truncate">
          {item.description}
        </Text>
      </div>
      {item.actionLabel && (
        <Button
          variant="secondary"
          disabled={false}
          aria-label={`${item.actionLabel} ${item.title}`}
          onClick={() => onAction?.(item)}
        >
          {item.actionLabel}
        </Button>
      )}
    </li>
  )
}
