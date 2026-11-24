import { Spinner } from '@/shared/components/Spinner/Spinner'
import { Text } from '@/shared/components/Text/Text'

interface DocumentProcessingLoadingProps {
  fileName: string
}

export const DocumentProcessingLoading = ({ fileName }: DocumentProcessingLoadingProps) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-8 text-center lg:py-0">
      <Spinner size="lg" label={`Processing ${fileName}`} className="text-primary" />
      <div className="flex w-full flex-col items-center gap-1">
        <Text weight="medium" color="strong" className="max-w-full truncate" title={fileName}>
          Processing {fileName}
        </Text>
        <Text size="sm" color="muted">
          Reading the details. This can take a minute.
        </Text>
      </div>
    </div>
  )
}
