import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface TableCellProps extends ComponentProps<'td'> {}

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return <td className={cn('px-4 py-3 align-middle text-foreground', className)} {...props} />
}
