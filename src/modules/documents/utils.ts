import { isAcceptedFile } from '@/shared/components/FileUpload/utils'
import { documentMaxSize } from './constants'

export const getDocumentError = (file: File) => {
  if (!isAcceptedFile(file)) return 'Choose a JPEG, PNG, HEIC, PDF or CSV file.'
  if (file.size === 0) return 'This file is empty. Choose another one.'
  if (file.size > documentMaxSize) return 'This file is over 10 MB. Choose a smaller one.'

  return undefined
}
