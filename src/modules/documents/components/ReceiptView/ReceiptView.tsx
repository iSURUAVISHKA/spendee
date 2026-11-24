import { cn } from '@/shared/utils/cn'
import type { ReceiptDocument } from '../../types'
import { ReceiptDetails } from './ReceiptDetails'
import { ReceiptImage } from './ReceiptImage'
import { ReceiptLineItems } from './ReceiptLineItems'

interface ReceiptViewProps {
  receipt: ReceiptDocument
  className?: string
}

export const ReceiptView = ({ receipt, className }: ReceiptViewProps) => {
  return (
    <div className={cn('grid gap-4 lg:grid-cols-2 lg:items-start', className)}>
      <ReceiptImage receipt={receipt} />
      <div className="flex flex-col gap-4">
        <ReceiptDetails receipt={receipt} />
        <ReceiptLineItems receipt={receipt} />
      </div>
    </div>
  )
}
