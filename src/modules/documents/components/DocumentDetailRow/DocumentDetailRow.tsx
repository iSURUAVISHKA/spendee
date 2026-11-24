import type { ReactNode } from 'react'
import { Text } from '@/shared/components/Text/Text'

interface DocumentDetailRowProps {
  label: string
  children: ReactNode
}

export const DocumentDetailRow = ({ label, children }: DocumentDetailRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <Text render={<dt />} size="sm" color="muted">
        {label}
      </Text>
      <Text render={<dd />} size="sm" color="strong" className="text-right">
        {children}
      </Text>
    </div>
  )
}
