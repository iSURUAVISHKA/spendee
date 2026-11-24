import { Card } from '@/shared/components/Card/Card'
import { cn } from '@/shared/utils/cn'
import type { ReceiptDocument } from '../../types'

interface ReceiptImageProps {
  receipt: ReceiptDocument
  className?: string
}

export const ReceiptImage = ({ receipt, className }: ReceiptImageProps) => {
  return (
    <Card className={cn('items-center p-4', className)}>
      <img
        src={receipt.fileUrl}
        alt={`Receipt from ${receipt.findings.store}`}
        className="h-auto w-full max-w-sm rounded-sm"
      />
    </Card>
  )
}
