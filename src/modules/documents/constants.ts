import type { ProcessingCheck } from './types'

export const documentMaxSize = 10 * 1024 * 1024

export const documentUploadHint = 'JPEG, PNG, HEIC, PDF or CSV, up to 10 MB'

export const sampleProcessingChecks: ProcessingCheck[] = [
  { id: 'store', status: 'done', message: 'Store name and date found on the receipt.' },
  { id: 'items', status: 'done', message: 'All 12 line items read and translated.' },
  { id: 'names', status: 'warning', message: 'Two item names could not be translated.' },
  { id: 'total', status: 'done', message: 'Total matches the sum of the line items.' },
  { id: 'vat', status: 'warning', message: 'VAT amount is missing, please check it.' },
  { id: 'category', status: 'done', message: 'Suggested category Groceries based on the store.' },
]
