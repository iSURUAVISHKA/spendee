import { BankIcon, ReceiptTextIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import DocsIcon from '@/shared/assets/icon/Docs.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { ReviewItem, ReviewKind } from '../../types'
import { RoundIcon } from '../RoundIcon/RoundIcon'

const kindStyle = {
  receipt: { icon: <HugeiconsIcon icon={ReceiptTextIcon} />, tone: 'blue' },
  flyer: { icon: <DocsIcon />, tone: 'gray' },
  statement: { icon: <HugeiconsIcon icon={BankIcon} />, tone: 'yellow' },
} as const satisfies Record<ReviewKind, object>

interface ReviewRowProps {
  item: ReviewItem
  onAction?: (item: ReviewItem) => void
  className?: string
}

export const ReviewRow = ({ item, onAction, className }: ReviewRowProps) => {
  const style = kindStyle[item.kind]

  return (
    <li className={cn('flex items-center gap-3', className)}>
      <RoundIcon icon={style.icon} tone={style.tone} />
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
