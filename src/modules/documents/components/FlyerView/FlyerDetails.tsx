import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatDateRange } from '@/shared/utils/dates'
import type { FlyerDocument } from '../../types'
import { DocumentDetailRow } from '../DocumentDetailRow/DocumentDetailRow'
import { DocumentStatusLabel } from '../DocumentStatusLabel/DocumentStatusLabel'

interface FlyerDetailsProps {
  flyer: FlyerDocument
  className?: string
}

export const FlyerDetails = ({ flyer, className }: FlyerDetailsProps) => {
  const { store, week, validFrom, validTo, deals } = flyer.findings
  const onListCount = deals.filter((deal) => deal.onShoppingList).length

  return (
    <Card className={cn('gap-4', className)}>
      <div className="flex items-center justify-between gap-4">
        <Text
          render={<h2 />}
          size="xl"
          weight="semibold"
          color="strong"
          className="min-w-0 truncate"
        >
          {store}
        </Text>
        <DocumentStatusLabel status={flyer.status} />
      </div>
      <dl className="flex flex-col divide-y divide-muted">
        <DocumentDetailRow label="Week">{week}</DocumentDetailRow>
        <DocumentDetailRow label="Valid">{formatDateRange(validFrom, validTo)}</DocumentDetailRow>
        <DocumentDetailRow label="Deals">
          <span className="tabular-nums">{deals.length}</span>
        </DocumentDetailRow>
        <DocumentDetailRow label="On your shopping list">
          <span className="tabular-nums">{onListCount}</span>
        </DocumentDetailRow>
      </dl>
    </Card>
  )
}
