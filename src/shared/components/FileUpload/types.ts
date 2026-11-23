export type FileUploadStatus = 'uploading' | 'complete' | 'error'

export interface FileUploadEntry {
  id: string
  file: File
  status: FileUploadStatus
  progress: number
  error?: string
}
