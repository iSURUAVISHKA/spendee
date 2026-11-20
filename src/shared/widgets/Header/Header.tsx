import type { ReactNode } from 'react'
import { Text } from '@/shared/components/Text/Text'
import { cn } from '@/shared/utils/cn'

interface HeaderProps {
  title: string
  actions?: ReactNode
  className?: string
}

export const Header = ({ title, actions, className }: HeaderProps) => {
  return (
    <header
      className={cn(
        'box-content flex h-9 items-center justify-between gap-4 border-b border-border pb-3',
        className,
      )}
    >
      <Text render={<h1 />} size="xl" weight="semibold" className="min-w-0 truncate">
        {title}
      </Text>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </header>
  )
}
