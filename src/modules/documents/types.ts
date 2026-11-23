import type { FileUploadEntry } from '@/shared/components/FileUpload/types'

export interface DocumentUpload extends FileUploadEntry {
  canRetry: boolean
}

export type ProcessingCheckStatus = 'done' | 'warning'

export interface ProcessingCheck {
  id: string
  status: ProcessingCheckStatus
  message: string
}

export type DocumentProcessingStatus = 'processing' | 'complete' | 'error'

export interface DocumentProcessing {
  fileName: string
  status: DocumentProcessingStatus
  checks: ProcessingCheck[]
}
