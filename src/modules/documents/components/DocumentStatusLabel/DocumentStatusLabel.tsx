import { cva } from 'class-variance-authority'
import { cn } from '@/shared/utils/cn'
import { documentStatusIcons, documentStatusLabels } from '../../constants'
import type { DocumentStatus } from '../../types'

const documentStatusVariants = cva('inline-flex items-center gap-1.5 text-sm whitespace-nowrap', {
  variants: {
    status: {
      pending: 'text-warning',
      published: 'text-income',
      saved: 'text-income',
    },
  },
})

interface DocumentStatusLabelProps {
  status: DocumentStatus
  className?: string
}

export const DocumentStatusLabel = ({ status, className }: DocumentStatusLabelProps) => {
  const Icon = documentStatusIcons[status]

  return (
    <span className={cn(documentStatusVariants({ status }), className)}>
      <Icon className="size-4" aria-hidden />
      {documentStatusLabels[status]}
    </span>
  )
}
