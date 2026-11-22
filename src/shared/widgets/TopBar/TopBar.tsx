import type { ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'

interface TopBarProps {
  filters?: ReactNode
  actions?: ReactNode
  className?: string
}

export const TopBar = ({ filters, actions, className }: TopBarProps) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {filters && (
        <div role="group" aria-label="Filters" className="flex flex-wrap items-center gap-2">
          {filters}
        </div>
      )}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  )
}
