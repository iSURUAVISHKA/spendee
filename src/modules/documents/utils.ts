import { isAcceptedFile } from '@/shared/components/FileUpload/utils'
import { formatMoney } from '@/shared/utils/money'
import { documentMaxSize } from './constants'
import type { FlyerDeal, ReconciliationEntry, UploadedDocument } from './types'

export const getDocumentError = (file: File) => {
  if (!isAcceptedFile(file)) return 'Choose a JPEG, PNG, HEIC, PDF or CSV file.'
  if (file.size === 0) return 'This file is empty. Choose another one.'
  if (file.size > documentMaxSize) return 'This file is over 10 MB. Choose a smaller one.'

  return undefined
}

export const getDocumentAction = (doc: UploadedDocument) =>
  doc.status === 'pending' ? 'Review' : 'Open'

export const getFindingsSource = (doc: UploadedDocument) =>
  doc.kind === 'bankStatement' ? doc.findings.bank : doc.findings.store

export const getFindingsDetail = (doc: UploadedDocument) => {
  if (doc.kind === 'receipt') {
    return formatMoney(doc.findings.amount, { currency: doc.findings.currency })
  }

  if (doc.kind === 'bankStatement') {
    const count = doc.findings.entries.filter((entry) => entry.statementAmount !== null).length

    return count === 1 ? '1 transaction' : `${count} transactions`
  }

  const dealCount = doc.findings.deals.length

  return dealCount === 1 ? '1 deal' : `${dealCount} deals`
}

export const getDealSaving = (deal: FlyerDeal) =>
  Math.round(((deal.originalPrice - deal.price) * 100) / deal.originalPrice)

export const getAmountDifference = (entry: ReconciliationEntry) =>
  entry.statementAmount === null || entry.receiptAmount === null
    ? null
    : entry.statementAmount - entry.receiptAmount
