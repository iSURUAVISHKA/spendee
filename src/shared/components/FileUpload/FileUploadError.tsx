import ErrorIcon from '@/shared/assets/icon/Error.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'
import { FileUploadContent } from './FileUploadContent'
import type { FileUploadEntry } from './types'

interface FileUploadErrorProps {
  upload: FileUploadEntry
  onChoose: () => void
  onRetry?: () => void
}

export const FileUploadError = ({ upload, onChoose, onRetry }: FileUploadErrorProps) => {
  return (
    <FileUploadContent
      icon={<ErrorIcon aria-hidden />}
      tone="destructive"
      title={upload.file.name}
      description={
        <Text role="alert" size="sm" color="destructive">
          {upload.error ?? 'Upload failed.'}
        </Text>
      }
    >
      <div className="flex flex-wrap justify-center gap-2">
        {onRetry && (
          <Button disabled={false} onClick={onRetry}>
            Try again
          </Button>
        )}
        <Button variant="secondary" disabled={false} onClick={onChoose}>
          Choose another file
        </Button>
      </div>
    </FileUploadContent>
  )
}
