import { useState } from 'react'
import { Card } from '@/shared/components/Card/Card'
import { FileUpload } from '@/shared/components/FileUpload/FileUpload'
import type { FileUploadEntry } from '@/shared/components/FileUpload/types'
import { Select } from '@/shared/components/Select/Select'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'
import { dealStoreOptions, flyerUploadHint } from '../../constants'
import type { DealStore } from '../../types'

interface FlyerUploadCardProps {
  upload: FileUploadEntry | null
  onFileSelected: (file: File, store: DealStore) => void
  onCancel: () => void
  onRetry?: () => void
  className?: string
}

export const FlyerUploadCard = ({
  upload,
  onFileSelected,
  onCancel,
  onRetry,
  className,
}: FlyerUploadCardProps) => {
  const [store, setStore] = useState<DealStore | null>(null)
  const [storeError, setStoreError] = useState<string | null>(null)

  const handleStoreChange = (value: DealStore) => {
    setStore(value)
    setStoreError(null)
  }

  const handleFileSelected = (file: File) => {
    if (!store) {
      setStoreError('Choose a store first.')
      return
    }

    onFileSelected(file, store)
  }

  return (
    <Card className={cn('gap-5', className)}>
      <div className="flex flex-col gap-1">
        <Text render={<h2 />} size="xl" weight="semibold" color="strong">
          Upload a flyer
        </Text>
        <Text size="sm" color="muted">
          Pick the store, then add its weekly flyer.
        </Text>
      </div>
      <Select
        label="Store"
        options={dealStoreOptions}
        value={store}
        onValueChange={handleStoreChange}
        placeholder="Select a store"
        errorMessage={storeError}
        disabled={upload?.status === 'uploading'}
      />
      <FileUpload
        upload={upload}
        hint={flyerUploadHint}
        className="flex-1"
        onFileSelected={handleFileSelected}
        onCancel={onCancel}
        onRetry={onRetry}
      />
    </Card>
  )
}
