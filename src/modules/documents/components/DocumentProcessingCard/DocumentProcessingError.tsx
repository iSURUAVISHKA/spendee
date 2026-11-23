import ErrorIcon from '@/shared/assets/icon/Error.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'

interface DocumentProcessingErrorProps {
  fileName: string
  onRetry: () => void
}

export const DocumentProcessingError = ({ fileName, onRetry }: DocumentProcessingErrorProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-destructive/15 [&>svg]:size-6">
        <ErrorIcon aria-hidden />
      </span>
      <div role="alert" className="flex w-full flex-col items-center gap-1">
        <Text weight="medium" color="strong" className="max-w-full truncate" title={fileName}>
          Couldn't process {fileName}
        </Text>
        <Text size="sm" color="muted">
          Your file is saved. Try again in a moment.
        </Text>
      </div>
      <Button disabled={false} onClick={onRetry}>
        Try again
      </Button>
    </div>
  )
}
