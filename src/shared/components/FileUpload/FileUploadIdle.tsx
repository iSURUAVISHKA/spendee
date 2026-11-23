import UploadIcon from '@/shared/assets/icon/Upload.svg?react'
import { Button } from '@/shared/components/Button/Button'
import { Text } from '@/shared/components/Text/Text'
import { FileUploadContent } from './FileUploadContent'

interface FileUploadIdleProps {
  title: string
  hint?: string
  buttonLabel: string
  onChoose: () => void
}

export const FileUploadIdle = ({ title, hint, buttonLabel, onChoose }: FileUploadIdleProps) => {
  return (
    <FileUploadContent
      icon={<UploadIcon aria-hidden />}
      title={title}
      description={
        hint && (
          <Text size="sm" color="muted">
            {hint}
          </Text>
        )
      }
    >
      <Button disabled={false} onClick={onChoose}>
        {buttonLabel}
      </Button>
    </FileUploadContent>
  )
}
