import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'

interface TableProps extends ComponentProps<'table'> {}

export const Table = ({ className, ...props }: TableProps) => {
  return <table className={cn('w-full border-collapse text-sm', className)} {...props} />
}

interface TableCaptionProps extends ComponentProps<'caption'> {}

export const TableCaption = ({ className, ...props }: TableCaptionProps) => {
  return <caption className={cn('sr-only', className)} {...props} />
}

interface TableHeaderProps extends ComponentProps<'thead'> {}

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <thead className={cn('sticky top-0 z-10 bg-card', className)} {...props} />
}

interface TableBodyProps extends ComponentProps<'tbody'> {}

export const TableBody = ({ className, ...props }: TableBodyProps) => {
  return <tbody className={cn('[&>tr:last-child]:border-b-0', className)} {...props} />
}

interface TableRowProps extends ComponentProps<'tr'> {}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={cn('border-b border-muted transition-colors hover:bg-muted/40', className)}
      {...props}
    />
  )
}

interface TableHeadProps extends ComponentProps<'th'> {}

export const TableHead = ({ className, ...props }: TableHeadProps) => {
  return (
    <th
      className={cn(
        'h-11 border-b border-muted px-4 text-left align-middle text-xs font-medium whitespace-nowrap text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

interface TableCellProps extends ComponentProps<'td'> {}

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return <td className={cn('px-4 py-3 align-middle text-foreground', className)} {...props} />
}
