import BankIcon from '@/shared/assets/icon/Bank.svg?react'
import DocsIcon from '@/shared/assets/icon/Docs.svg?react'
import ReceiptIcon from '@/shared/assets/icon/Receipt.svg?react'
import type { ReviewKind } from './types'

export const reviewKindStyles = {
  receipt: { Icon: ReceiptIcon, tone: 'blue' },
  flyer: { Icon: DocsIcon, tone: 'gray' },
  statement: { Icon: BankIcon, tone: 'yellow' },
} as const satisfies Record<ReviewKind, object>
