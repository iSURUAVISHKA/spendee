import { Card } from '@/shared/components/Card/Card'
import { FileUpload } from '@/shared/components/FileUpload/FileUpload'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { documentUploadHint } from '../../constants'
import type { DocumentUpload } from '../../types'

interface DocumentUploadCardProps {
  upload: DocumentUpload | null
  onFileSelected: (file: File) => void
  onRetry: () => void
  onCancel: () => void
  className?: string
}

export const DocumentUploadCard = ({
  upload,
  onFileSelected,
  onRetry,
  onCancel,
  className,
}: DocumentUploadCardProps) => {
  return (
    <Card className={cn('gap-5 lg:gap-4', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Upload a document
        </Text>
        <Text size="sm" color="muted">
          Add a receipt or a bill.
        </Text>
      </div>
      <FileUpload
        upload={upload}
        hint={documentUploadHint}
        className="lg:min-h-0 lg:flex-1 lg:gap-2 lg:p-4"
        onFileSelected={onFileSelected}
        onCancel={onCancel}
        onRetry={upload?.canRetry ? onRetry : undefined}
      />
    </Card>
  )
}
