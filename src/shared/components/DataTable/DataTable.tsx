import { Table } from '@/shared/components/Table/Table'
import { TableBody } from '@/shared/components/Table/TableBody'
import { TableHeader } from '@/shared/components/Table/TableHeader'
import { cn } from '@/shared/utils/cn'
import type { DataTableProps } from './types'

export const DataTable = <Row,>({
  label,
  columns,
  rows,
  getRowId,
  isLoading,
  skeletonRows,
  className,
}: DataTableProps<Row>) => {
  return (
    <div className={cn('overflow-auto', className)}>
      <Table aria-label={label} aria-busy={isLoading}>
        <TableHeader columns={columns} />
        <TableBody
          columns={columns}
          rows={rows}
          getRowId={getRowId}
          isLoading={isLoading}
          skeletonRows={skeletonRows}
        />
      </Table>
    </div>
  )
}
