import DocsIcon from '@/shared/assets/icon/Docs.svg?react'
import { Button } from '@/shared/components/Button/Button'
import {
  Progress,
  ProgressIndicator,
  ProgressTrack,
  ProgressValue,
} from '@/shared/components/Progress/Progress'
import { Text } from '@/shared/components/Text/Text'
import { FileUploadContent } from './FileUploadContent'
import type { FileUploadEntry } from './types'
import { formatFileSize } from './utils'

interface FileUploadProgressProps {
  upload: FileUploadEntry
  onCancel: () => void
}

export const FileUploadProgress = ({ upload, onCancel }: FileUploadProgressProps) => {
  const { file, progress } = upload

  return (
    <FileUploadContent
      icon={<DocsIcon aria-hidden />}
      title={file.name}
      description={
        <Text size="sm" color="muted">
          {formatFileSize(file.size)} · Uploading
        </Text>
      }
    >
      <Progress
        value={progress}
        aria-label={`Uploading ${file.name}`}
        className="flex w-full max-w-xs items-center gap-3"
      >
        <ProgressTrack className="flex-1">
          <ProgressIndicator />
        </ProgressTrack>
        <ProgressValue className="w-10 shrink-0 text-right text-xs text-muted-foreground tabular-nums" />
      </Progress>
      <Button variant="secondary" disabled={false} onClick={onCancel}>
        Cancel
      </Button>
    </FileUploadContent>
  )
}
