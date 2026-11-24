import { Card } from '@/shared/components/Card/Card'
import { DataTable } from '@/shared/components/DataTable/DataTable'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { useReceiptLineItemsTable } from '../../hooks/useReceiptLineItemsTable'
import type { ReceiptDocument } from '../../types'

interface ReceiptLineItemsProps {
  receipt: ReceiptDocument
  className?: string
}

export const ReceiptLineItems = ({ receipt, className }: ReceiptLineItemsProps) => {
  const { lineItems, currency } = receipt.findings
  const { columns } = useReceiptLineItemsTable({ currency })

  return (
    <Card className={cn('gap-4', className)}>
      <Text render={<h2 />} size="xl" weight="semibold" color="strong">
        Items
      </Text>
      {lineItems.length > 0 ? (
        <DataTable
          label="Receipt items"
          columns={columns}
          rows={lineItems}
          getRowId={(item) => item.id}
          isLoading={false}
        />
      ) : (
        <Text size="sm" color="muted">
          No items found on this receipt.
        </Text>
      )}
    </Card>
  )
}
