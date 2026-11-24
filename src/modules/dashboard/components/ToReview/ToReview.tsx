import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { ReviewItem } from '../../types'
import { ReviewRow } from '../ReviewRow/ReviewRow'
import { SectionHeader } from '../SectionHeader/SectionHeader'

interface ToReviewProps {
  title: string
  items: ReviewItem[]
  onItemAction?: (item: ReviewItem) => void
  className?: string
}

export const ToReview = ({ title, items, onItemAction, className }: ToReviewProps) => {
  return (
    <Card className={cn('gap-5', className)}>
      <SectionHeader title={title} />
      {items.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {items.map((item) => (
            <ReviewRow key={item.id} item={item} onAction={onItemAction} />
          ))}
        </ul>
      ) : (
        <Text size="sm" color="muted">
          Nothing to review.
        </Text>
      )}
    </Card>
  )
}
