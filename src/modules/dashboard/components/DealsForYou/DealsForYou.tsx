import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { Deal } from '../../types'
import { DealRow } from '../DealRow/DealRow'
import { SectionHeader } from '../SectionHeader/SectionHeader'

interface DealsForYouProps {
  title: string
  actionLabel?: string
  actionHref?: string
  deals: Deal[]
  className?: string
}

export const DealsForYou = ({
  title,
  actionLabel,
  actionHref,
  deals,
  className,
}: DealsForYouProps) => {
  return (
    <Card className={cn('flex flex-col gap-5', className)}>
      <SectionHeader title={title} actionLabel={actionLabel} actionHref={actionHref} />
      {deals.length > 0 ? (
        <ul className="flex flex-col divide-y divide-muted">
          {deals.map((deal) => (
            <DealRow key={deal.id} deal={deal} />
          ))}
        </ul>
      ) : (
        <Text size="sm" color="muted">
          No deals right now.
        </Text>
      )}
    </Card>
  )
}
