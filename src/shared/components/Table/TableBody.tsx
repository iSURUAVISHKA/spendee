import type { ComponentProps } from 'react'
import { cn } from '@/shared/utils/cn'
import { TableCell } from './TableCell'
import { TableRow } from './TableRow'
import type { TableColumn } from './types'

interface TableBodyProps<Row> extends Omit<ComponentProps<'tbody'>, 'children'> {
  columns: TableColumn<Row>[]
  rows: Row[]
  getRowId: (row: Row) => string
  isLoading: boolean
  skeletonRows?: number
}

export const TableBody = <Row,>({
  columns,
  rows,
  getRowId,
  isLoading,
  skeletonRows = 8,
  className,
  ...props
}: TableBodyProps<Row>) => {
  const visibleColumns = columns.filter((column) => !column.hidden)

  return (
    <tbody className={cn('[&>tr:last-child]:border-b-0', className)} {...props}>
      {isLoading
        ? Array.from({ length: skeletonRows }, (_, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-transparent">
              {visibleColumns.map((column) => (
                <TableCell key={column.id} className={column.className}>
                  <div
                    className={cn(
                      'h-4 w-3/4 animate-pulse rounded bg-muted',
                      column.align === 'right' && 'ml-auto w-1/2',
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))
        : rows.map((row) => (
            <TableRow key={getRowId(row)}>
              {visibleColumns.map((column) => (
                <TableCell
                  key={column.id}
                  className={cn(column.align === 'right' && 'text-right', column.className)}
                >
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
    </tbody>
  )
}
