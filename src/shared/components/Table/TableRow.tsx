import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn(
        'relative border-b border-muted transition-colors hover:bg-muted/40',
        className,
      )}
      {...props}
    />
  )
}
