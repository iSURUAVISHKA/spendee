import { Card } from '@/shared/components/Card/Card'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { formatDate } from '@/shared/utils/dates'
import { formatMoney } from '@/shared/utils/money'
import type { ReceiptDocument } from '../../types'
import { DocumentDetailRow } from '../DocumentDetailRow/DocumentDetailRow'
import { DocumentStatusLabel } from '../DocumentStatusLabel/DocumentStatusLabel'

interface ReceiptDetailsProps {
  receipt: ReceiptDocument
  className?: string
}

export const ReceiptDetails = ({ receipt, className }: ReceiptDetailsProps) => {
  const { store, purchasedOn, category, amount, currency } = receipt.findings

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
        <DocumentStatusLabel status={receipt.status} />
      </div>
      <dl className="flex flex-col divide-y divide-muted">
        <DocumentDetailRow label="Date">
          <time dateTime={purchasedOn}>{formatDate(purchasedOn)}</time>
        </DocumentDetailRow>
        <DocumentDetailRow label="Category">{category}</DocumentDetailRow>
        <DocumentDetailRow label="Total">
          <span className="font-semibold tabular-nums">{formatMoney(amount, { currency })}</span>
        </DocumentDetailRow>
      </dl>
    </Card>
  )
}
