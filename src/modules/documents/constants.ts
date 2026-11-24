import dayjs from 'dayjs'
import type { ComponentType, SVGProps } from 'react'
import type { DropdownOption } from '@/shared/components/Dropdown/types'
import { statusIcons } from '@/shared/constants/statusIcons'
import hemkopFlyerUrl from './assets/HemkopFlyer.pdf?no-inline'
import icaReceiptUrl from './assets/IcaReceipt.svg'
import lidlFlyerUrl from './assets/LidlFlyer.pdf?no-inline'
import swedbankStatementUrl from './assets/SwedbankStatement.pdf?no-inline'
import willysFlyerUrl from './assets/WillysFlyer.pdf?no-inline'
import willysReceiptUrl from './assets/WillysReceipt.svg'
import type {
  DocumentKind,
  DocumentStatus,
  ProcessingCheck,
  ReconciliationStatus,
  UploadedDocument,
} from './types'

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

export const documentStatuses: DocumentStatus[] = ['pending', 'published', 'saved']

export const documentKinds: DocumentKind[] = ['receipt', 'flyer', 'bankStatement']

export const documentStatusLabels: Record<DocumentStatus, string> = {
  pending: 'Ready to review',
  published: 'Published',
  saved: 'Saved',
}

export const documentStatusIcons: Record<DocumentStatus, ComponentType<SVGProps<SVGSVGElement>>> = {
  pending: statusIcons.pending,
  published: statusIcons.complete,
  saved: statusIcons.complete,
}

export const documentKindLabels: Record<DocumentKind, string> = {
  receipt: 'Receipt',
  flyer: 'Flyer',
  bankStatement: 'Bank statement',
}

export const reconciliationParam = 'match'

export const reconciliationStatuses: ReconciliationStatus[] = [
  'noReceipt',
  'amountDiffers',
  'notOnStatement',
  'matched',
]

export const reconciliationStatusLabels: Record<ReconciliationStatus, string> = {
  noReceipt: 'No receipt',
  amountDiffers: 'Amount differs',
  notOnStatement: 'Not on statement',
  matched: 'Matched',
}

export const reconciliationEmptyTitles: Record<ReconciliationStatus, string> = {
  noReceipt: 'Every transaction has a receipt',
  amountDiffers: 'No amounts differ',
  notOnStatement: 'Every receipt is on the statement',
  matched: 'No matches yet',
}

export const documentStatusOptions: DropdownOption<DocumentStatus>[] = documentStatuses.map(
  (status) => ({ value: status, label: documentStatusLabels[status] }),
)

export const documentKindOptions: DropdownOption<DocumentKind>[] = documentKinds.map((kind) => ({
  value: kind,
  label: documentKindLabels[kind],
}))

export const documentFilterOptions = {
  status: documentStatuses,
  kind: documentKinds,
}

export const documentsPageSize = 10

const recentDocuments: UploadedDocument[] = [
  {
    id: 'doc-001',
    fileName: 'IMG_2041.jpg',
    kind: 'receipt',
    uploadedAt: '2026-11-23T17:45:00',
    status: 'pending',
    fileUrl: willysReceiptUrl,
    findings: {
      store: 'Willys',
      purchasedOn: '2026-11-23',
      category: 'Groceries',
      amount: 26140,
      currency: 'SEK',
      lineItems: [
        {
          id: 'line-1',
          originalName: 'Mjölk 3% 1,5 l',
          translatedName: 'Milk 3% 1.5 l',
          quantity: 2,
          amount: 3790,
        },
        {
          id: 'line-2',
          originalName: 'Fullkornsbröd',
          translatedName: 'Wholegrain bread',
          quantity: 1,
          amount: 3290,
        },
        {
          id: 'line-3',
          originalName: 'Bananer',
          translatedName: 'Bananas',
          quantity: 1,
          amount: 2450,
        },
        {
          id: 'line-4',
          originalName: 'Kycklingfilé 900 g',
          translatedName: 'Chicken breast 900 g',
          quantity: 1,
          amount: 9900,
        },
        {
          id: 'line-5',
          originalName: 'Ägg 12-pack',
          translatedName: 'Eggs, 12 pack',
          quantity: 1,
          amount: 3990,
        },
        {
          id: 'line-6',
          originalName: 'Gurka',
          translatedName: 'Cucumber',
          quantity: 2,
          amount: 2720,
        },
      ],
    },
  },
  {
    id: 'doc-002',
    fileName: 'hemkop-week-48.pdf',
    kind: 'flyer',
    uploadedAt: '2026-11-23T09:12:00',
    status: 'pending',
    fileUrl: hemkopFlyerUrl,
    findings: {
      store: 'Hemköp',
      week: 48,
      validFrom: '2026-11-23',
      validTo: '2026-11-29',
      currency: 'SEK',
      deals: [
        {
          id: 'deal-1',
          originalName: 'Kycklingfilé 900 g',
          translatedName: 'Chicken breast 900 g',
          price: 8990,
          originalPrice: 11990,
          onShoppingList: true,
        },
        {
          id: 'deal-2',
          originalName: 'Mellanmjölk 1,5 l',
          translatedName: 'Semi-skimmed milk 1.5 l',
          price: 1595,
          originalPrice: 1995,
          onShoppingList: true,
        },
        {
          id: 'deal-3',
          originalName: 'Lingongrova',
          translatedName: 'Lingonberry rye bread',
          price: 2500,
          originalPrice: 3290,
          onShoppingList: false,
        },
        {
          id: 'deal-4',
          originalName: 'Clementiner 2 kg',
          translatedName: 'Clementines 2 kg',
          price: 3000,
          originalPrice: 4490,
          onShoppingList: false,
        },
        {
          id: 'deal-5',
          originalName: 'Bryggkaffe 450 g',
          translatedName: 'Ground coffee 450 g',
          price: 4990,
          originalPrice: 6990,
          onShoppingList: true,
        },
        {
          id: 'deal-6',
          originalName: 'Smör 500 g',
          translatedName: 'Butter 500 g',
          price: 4490,
          originalPrice: 5790,
          onShoppingList: false,
        },
      ],
    },
  },
  {
    id: 'doc-003',
    fileName: 'willys-week-48.pdf',
    kind: 'flyer',
    uploadedAt: '2026-11-23T07:30:00',
    status: 'published',
    fileUrl: willysFlyerUrl,
    findings: {
      store: 'Willys',
      week: 48,
      validFrom: '2026-11-23',
      validTo: '2026-11-29',
      currency: 'SEK',
      deals: [
        {
          id: 'deal-1',
          originalName: 'Laxfilé 400 g',
          translatedName: 'Salmon fillet 400 g',
          price: 6990,
          originalPrice: 8990,
          onShoppingList: false,
        },
        {
          id: 'deal-2',
          originalName: 'Bananer per kg',
          translatedName: 'Bananas per kg',
          price: 1990,
          originalPrice: 2490,
          onShoppingList: true,
        },
        {
          id: 'deal-3',
          originalName: 'Pasta 1 kg',
          translatedName: 'Pasta 1 kg',
          price: 1500,
          originalPrice: 2290,
          onShoppingList: true,
        },
        {
          id: 'deal-4',
          originalName: 'Krossade tomater 500 g',
          translatedName: 'Crushed tomatoes 500 g',
          price: 1000,
          originalPrice: 1490,
          onShoppingList: false,
        },
        {
          id: 'deal-5',
          originalName: 'Ägg 15-pack',
          translatedName: 'Eggs, 15 pack',
          price: 3990,
          originalPrice: 4990,
          onShoppingList: true,
        },
      ],
    },
  },
  {
    id: 'doc-004',
    fileName: 'IMG_2039.jpg',
    kind: 'receipt',
    uploadedAt: '2026-11-08T18:20:00',
    status: 'saved',
    fileUrl: icaReceiptUrl,
    findings: {
      store: 'ICA Nära',
      purchasedOn: '2026-11-08',
      category: 'Groceries',
      amount: 8650,
      currency: 'SEK',
      lineItems: [
        {
          id: 'line-1',
          originalName: 'Bryggkaffe 450 g',
          translatedName: 'Ground coffee 450 g',
          quantity: 1,
          amount: 5490,
        },
        {
          id: 'line-2',
          originalName: 'Naturell yoghurt',
          translatedName: 'Plain yoghurt',
          quantity: 1,
          amount: 1995,
        },
        {
          id: 'line-3',
          originalName: 'Äpplen',
          translatedName: 'Apples',
          quantity: 1,
          amount: 1165,
        },
      ],
    },
  },
  {
    id: 'doc-005',
    fileName: 'lidl-week-46.pdf',
    kind: 'flyer',
    uploadedAt: '2026-11-08T08:05:00',
    status: 'published',
    fileUrl: lidlFlyerUrl,
    findings: {
      store: 'Lidl',
      week: 46,
      validFrom: '2026-11-09',
      validTo: '2026-11-15',
      currency: 'SEK',
      deals: [
        {
          id: 'deal-1',
          originalName: 'Nötfärs 500 g',
          translatedName: 'Minced beef 500 g',
          price: 4990,
          originalPrice: 6490,
          onShoppingList: true,
        },
        {
          id: 'deal-2',
          originalName: 'Potatis 2 kg',
          translatedName: 'Potatoes 2 kg',
          price: 1990,
          originalPrice: 2990,
          onShoppingList: false,
        },
        {
          id: 'deal-3',
          originalName: 'Havregryn 1,5 kg',
          translatedName: 'Rolled oats 1.5 kg',
          price: 2290,
          originalPrice: 2990,
          onShoppingList: true,
        },
        {
          id: 'deal-4',
          originalName: 'Gurka',
          translatedName: 'Cucumber',
          price: 1000,
          originalPrice: 1490,
          onShoppingList: false,
        },
      ],
    },
  },
  {
    id: 'doc-006',
    fileName: 'swedbank-2026-10.pdf',
    kind: 'bankStatement',
    uploadedAt: '2026-11-02T20:10:00',
    status: 'pending',
    fileUrl: swedbankStatementUrl,
    findings: {
      bank: 'Swedbank',
      currency: 'SEK',
      entries: [
        {
          id: 'txn-01',
          date: '2026-10-02',
          description: 'Willys',
          status: 'matched',
          statementAmount: 52340,
          receiptAmount: 52340,
        },
        {
          id: 'txn-02',
          date: '2026-10-03',
          description: 'SL',
          status: 'noReceipt',
          statementAmount: 106000,
          receiptAmount: null,
        },
        {
          id: 'txn-03',
          date: '2026-10-05',
          description: 'ICA Nära',
          status: 'amountDiffers',
          statementAmount: 31250,
          receiptAmount: 30250,
        },
        {
          id: 'txn-04',
          date: '2026-10-07',
          description: 'Lidl',
          status: 'matched',
          statementAmount: 21875,
          receiptAmount: 21875,
        },
        {
          id: 'txn-05',
          date: '2026-10-09',
          description: 'Espresso House',
          status: 'noReceipt',
          statementAmount: 6500,
          receiptAmount: null,
        },
        {
          id: 'txn-06',
          date: '2026-10-12',
          description: 'ICA Nära',
          status: 'matched',
          statementAmount: 9450,
          receiptAmount: 9450,
        },
        {
          id: 'txn-07',
          date: '2026-10-15',
          description: 'Circle K',
          status: 'matched',
          statementAmount: 65000,
          receiptAmount: 65000,
        },
        {
          id: 'txn-08',
          date: '2026-10-17',
          description: 'Apotek Hjärtat',
          status: 'noReceipt',
          statementAmount: 18900,
          receiptAmount: null,
        },
        {
          id: 'txn-09',
          date: '2026-10-19',
          description: 'Willys',
          status: 'amountDiffers',
          statementAmount: 48990,
          receiptAmount: 48090,
        },
        {
          id: 'txn-10',
          date: '2026-10-21',
          description: 'Hemköp',
          status: 'matched',
          statementAmount: 18320,
          receiptAmount: 18320,
        },
        {
          id: 'txn-11',
          date: '2026-10-24',
          description: 'Systembolaget',
          status: 'noReceipt',
          statementAmount: 24900,
          receiptAmount: null,
        },
        {
          id: 'txn-12',
          date: '2026-10-26',
          description: 'Willys',
          status: 'matched',
          statementAmount: 41210,
          receiptAmount: 41210,
        },
        {
          id: 'txn-13',
          date: '2026-10-28',
          description: 'Hemköp',
          status: 'notOnStatement',
          statementAmount: null,
          receiptAmount: 15690,
        },
        {
          id: 'txn-14',
          date: '2026-10-30',
          description: 'Pressbyrån',
          status: 'notOnStatement',
          statementAmount: null,
          receiptAmount: 4500,
        },
      ],
    },
  },
]

const toOlderDocument = (template: UploadedDocument, index: number): UploadedDocument => {
  const cycle = Math.floor(index / recentDocuments.length)
  const base = {
    id: `doc-${String(index + 1).padStart(3, '0')}`,
    uploadedAt: dayjs('2026-11-02T20:10:00')
      .subtract(index - recentDocuments.length + 1, 'day')
      .format('YYYY-MM-DDTHH:mm:ss'),
  }

  if (template.kind === 'receipt') {
    return {
      ...template,
      ...base,
      fileName: `IMG_${2041 - index}.jpg`,
      status: 'saved',
      findings: { ...template.findings, purchasedOn: base.uploadedAt.slice(0, 10) },
    }
  }

  if (template.kind === 'bankStatement') {
    const month = dayjs('2026-10-01').subtract(cycle, 'month').format('YYYY-MM')

    return {
      ...template,
      ...base,
      fileName: template.fileName.replace('2026-10', month),
      status: 'saved',
    }
  }

  const { week, validFrom, validTo } = template.findings
  const shiftWeeks = (date: string) => dayjs(date).subtract(cycle, 'week').format('YYYY-MM-DD')

  return {
    ...template,
    ...base,
    fileName: template.fileName.replace(String(week), String(week - cycle)),
    status: 'published',
    findings: {
      ...template.findings,
      week: week - cycle,
      validFrom: shiftWeeks(validFrom),
      validTo: shiftWeeks(validTo),
    },
  }
}

export const sampleDocuments: UploadedDocument[] = Array.from({ length: 48 }, (_, index) => {
  const template = recentDocuments[index % recentDocuments.length]

  return index < recentDocuments.length ? template : toOlderDocument(template, index)
})
