import { useRef, useState, type ChangeEvent, type DragEvent } from 'react'
import { cn } from '@/shared/utils/cn'
import { fileUploadAccept } from './constants'
import { FileUploadComplete } from './FileUploadComplete'
import { FileUploadError } from './FileUploadError'
import { FileUploadIdle } from './FileUploadIdle'
import { FileUploadProgress } from './FileUploadProgress'
import type { FileUploadEntry } from './types'

interface FileUploadProps {
  upload: FileUploadEntry | null
  onFileSelected: (file: File) => void
  onCancel: () => void
  onRetry?: () => void
  title?: string
  hint?: string
  buttonLabel?: string
  className?: string
}

export const FileUpload = ({
  upload,
  onFileSelected,
  onCancel,
  onRetry,
  title = 'Drag and drop a file here',
  hint,
  buttonLabel = 'Choose a file',
  className,
}: FileUploadProps) => {
  const zoneRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const isUploading = upload?.status === 'uploading'

  const focusZone = () => zoneRef.current?.focus()

  const openPicker = () => inputRef.current?.click()

  const selectFile = (fileList: FileList | null) => {
    const file = fileList?.[0]

    if (!file) return

    onFileSelected(file)
    focusZone()
  }

  const handleCancel = () => {
    onCancel()
    focusZone()
  }

  const handleRetry = () => {
    onRetry?.()
    focusZone()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files)
    event.target.value = ''
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (isUploading) {
      event.dataTransfer.dropEffect = 'none'
      return
    }

    event.dataTransfer.dropEffect = 'copy'
    setIsDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    const target = event.relatedTarget

    if (target instanceof Node && event.currentTarget.contains(target)) return

    setIsDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)

    if (isUploading) return

    selectFile(event.dataTransfer.files)
  }

  return (
    <div
      ref={zoneRef}
      tabIndex={-1}
      data-dragging={isDragging || undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        'flex min-h-64 flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed border-border p-6 text-center outline-none transition-colors data-dragging:border-link data-dragging:bg-muted/40',
        className,
      )}
    >
      {!upload && (
        <FileUploadIdle title={title} hint={hint} buttonLabel={buttonLabel} onChoose={openPicker} />
      )}
      {upload?.status === 'uploading' && (
        <FileUploadProgress upload={upload} onCancel={handleCancel} />
      )}
      {upload?.status === 'error' && (
        <FileUploadError
          upload={upload}
          onChoose={openPicker}
          onRetry={onRetry ? handleRetry : undefined}
        />
      )}
      {upload?.status === 'complete' && <FileUploadComplete upload={upload} />}
      <input
        ref={inputRef}
        type="file"
        hidden
        tabIndex={-1}
        accept={fileUploadAccept.join(',')}
        onChange={handleChange}
      />
    </div>
  )
}
