import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { ActivityItem } from '../../types'
import { ActivityRow } from '../ActivityRow/ActivityRow'
import { SectionHeader } from '../SectionHeader/SectionHeader'

interface RecentActivityProps {
  title: string
  actionLabel?: string
  actionHref?: string
  items: ActivityItem[]
  className?: string
}

export const RecentActivity = ({
  title,
  actionLabel,
  actionHref,
  items,
  className,
}: RecentActivityProps) => {
  return (
    <Card className={cn('flex flex-col gap-5', className)}>
      <SectionHeader title={title} actionLabel={actionLabel} actionHref={actionHref} />
      {items.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <ActivityRow key={item.id} item={item} />
          ))}
        </ul>
      ) : (
        <Text size="sm" color="muted">
          No activity yet.
        </Text>
      )}
    </Card>
  )
}
