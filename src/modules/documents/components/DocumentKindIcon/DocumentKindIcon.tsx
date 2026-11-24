import { News01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { cva } from 'class-variance-authority'
import type { ReactNode } from 'react'
import BankIcon from '@/shared/assets/icon/Bank.svg?react'
import ReceiptIcon from '@/shared/assets/icon/Receipt.svg?react'
import { cn } from '@/shared/utils/cn'
import type { DocumentKind } from '../../types'

const documentKindIconVariants = cva(
  'flex size-8 shrink-0 items-center justify-center rounded-md [&>svg]:size-4',
  {
    variants: {
      kind: {
        receipt: 'bg-category-blue/15 text-category-blue',
        flyer: 'bg-category-orange/15 text-category-orange',
        bankStatement: 'bg-category-purple/15 text-category-purple',
      },
    },
  },
)

const kindIcons: Record<DocumentKind, ReactNode> = {
  receipt: <ReceiptIcon />,
  flyer: <HugeiconsIcon icon={News01Icon} />,
  bankStatement: <BankIcon />,
}

interface DocumentKindIconProps {
  kind: DocumentKind
  className?: string
}

export const DocumentKindIcon = ({ kind, className }: DocumentKindIconProps) => {
  return (
    <span aria-hidden className={cn(documentKindIconVariants({ kind }), className)}>
      {kindIcons[kind]}
    </span>
  )
}
