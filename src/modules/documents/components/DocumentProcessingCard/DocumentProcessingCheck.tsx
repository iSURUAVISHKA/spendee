import { cva } from 'class-variance-authority'
import CompleteIcon from '@/shared/assets/icon/Complete.svg?react'
import WarningIcon from '@/shared/assets/icon/Warning.svg?react'
import { Text } from '@/shared/components/Text/Text'
import type { ProcessingCheck } from '../../types'

const checkIconVariants = cva(
  'flex size-6 shrink-0 items-center justify-center rounded-full [&>svg]:size-4',
  {
    variants: {
      status: {
        done: 'bg-success/15',
        warning: 'bg-warning/15',
      },
    },
  },
)

const checkStyles = {
  done: { icon: <CompleteIcon aria-hidden />, label: 'Done' },
  warning: { icon: <WarningIcon aria-hidden />, label: 'Check this' },
}

interface DocumentProcessingCheckProps {
  check: ProcessingCheck
}

export const DocumentProcessingCheck = ({ check }: DocumentProcessingCheckProps) => {
  const style = checkStyles[check.status]

  return (
    <li className="flex items-start gap-3">
      <span className={checkIconVariants({ status: check.status })}>{style.icon}</span>
      <Text size="sm" className="pt-0.5">
        <span className="sr-only">{style.label}: </span>
        {check.message}
      </Text>
    </li>
  )
}
