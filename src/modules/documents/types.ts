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

export type DocumentStatus = 'pending' | 'published' | 'saved'

export interface ReceiptLineItem {
  id: string
  originalName: string
  translatedName: string
  quantity: number
  amount: number
}

export interface ReceiptFindings {
  store: string
  purchasedOn: string
  category: string
  amount: number
  currency: string
  lineItems: ReceiptLineItem[]
}

export interface FlyerDeal {
  id: string
  originalName: string
  translatedName: string
  price: number
  originalPrice: number
  onShoppingList: boolean
}

export interface FlyerFindings {
  store: string
  week: number
  validFrom: string
  validTo: string
  currency: string
  deals: FlyerDeal[]
}

interface DocumentRecord {
  id: string
  fileName: string
  uploadedAt: string
  status: DocumentStatus
  fileUrl: string
}

export interface ReceiptDocument extends DocumentRecord {
  kind: 'receipt'
  findings: ReceiptFindings
}

export interface FlyerDocument extends DocumentRecord {
  kind: 'flyer'
  findings: FlyerFindings
}

export type ReconciliationStatus = 'noReceipt' | 'amountDiffers' | 'notOnStatement' | 'matched'

export interface ReconciliationEntry {
  id: string
  date: string
  description: string
  status: ReconciliationStatus
  statementAmount: number | null
  receiptAmount: number | null
}

export interface BankStatementFindings {
  bank: string
  currency: string
  entries: ReconciliationEntry[]
}

export interface BankStatementDocument extends DocumentRecord {
  kind: 'bankStatement'
  findings: BankStatementFindings
}

export type UploadedDocument = ReceiptDocument | FlyerDocument | BankStatementDocument

export type DocumentKind = UploadedDocument['kind']

export interface DocumentFilterValues {
  status: DocumentStatus[]
  kind: DocumentKind[]
}
