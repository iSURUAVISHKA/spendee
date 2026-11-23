import CompleteIcon from '@/shared/assets/icon/Complete.svg?react'
import { Text } from '@/shared/components/Text/Text'
import { FileUploadContent } from './FileUploadContent'
import type { FileUploadEntry } from './types'
import { formatFileSize } from './utils'

interface FileUploadCompleteProps {
  upload: FileUploadEntry
}

export const FileUploadComplete = ({ upload }: FileUploadCompleteProps) => {
  return (
    <FileUploadContent
      icon={<CompleteIcon aria-hidden />}
      tone="success"
      title={upload.file.name}
      description={
        <Text role="status" size="sm" color="success">
          {formatFileSize(upload.file.size)} · Uploaded
        </Text>
      }
    />
  )
}
