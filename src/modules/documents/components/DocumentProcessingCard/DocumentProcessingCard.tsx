import { Card } from '@/shared/components/Card/Card'
import { NoData } from '@/shared/components/NoData/NoData'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import type { DocumentProcessing } from '../../types'
import { DocumentProcessingError } from './DocumentProcessingError'
import { DocumentProcessingLoading } from './DocumentProcessingLoading'
import { DocumentProcessingResults } from './DocumentProcessingResults'

interface DocumentProcessingCardProps {
  processing: DocumentProcessing | null
  onRetry: () => void
  className?: string
}

export const DocumentProcessingCard = ({
  processing,
  onRetry,
  className,
}: DocumentProcessingCardProps) => {
  return (
    <Card className={cn('flex flex-col gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Document check
        </Text>
        <Text size="sm" color="muted">
          AI reads your document and checks the details.
        </Text>
      </div>
      <div className="flex flex-1 flex-col">
        {!processing && (
          <NoData
            className="flex-1"
            title="Nothing to check yet"
            description="Upload a receipt or a bill to start."
          />
        )}
        {processing?.status === 'processing' && (
          <DocumentProcessingLoading fileName={processing.fileName} />
        )}
        {processing?.status === 'error' && (
          <DocumentProcessingError fileName={processing.fileName} onRetry={onRetry} />
        )}
        {processing?.status === 'complete' && (
          <DocumentProcessingResults fileName={processing.fileName} checks={processing.checks} />
        )}
      </div>
    </Card>
  )
}
