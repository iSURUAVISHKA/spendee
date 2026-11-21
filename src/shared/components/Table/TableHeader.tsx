import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'
import { useSortParam } from '@/shared/hooks/useSortParam'
import { cn } from '@/shared/utils/cn'
import { ariaSort, sortIcons } from './constants'
import { TableRow } from './TableRow'
import type { SortDirection, SortState, TableColumn } from './types'

const getNextSort = (sort: SortState | null, columnId: string): SortState | null => {
  if (sort?.columnId !== columnId) return { columnId, direction: 'asc' }

  if (sort.direction === 'asc') return { columnId, direction: 'desc' }

  return null
}

interface TableHeadProps extends ComponentProps<'th'> {
  sortDirection?: SortDirection | 'none'
  onSort?: () => void
}

const TableHead = ({
  sortDirection = 'none',
  onSort,
  className,
  children,
  ...props
}: TableHeadProps) => {
  return (
    <th
      aria-sort={onSort ? ariaSort[sortDirection] : undefined}
      className={cn(
        'h-11 px-4 text-left align-middle text-sm font-medium whitespace-nowrap text-foreground-strong',
        className,
      )}
      {...props}
    >
      {onSort ? (
        <button
          type="button"
          onClick={onSort}
          className="-mx-1 inline-flex items-center gap-1 rounded-sm px-1 py-0.5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          {children}
          <HugeiconsIcon
            icon={sortIcons[sortDirection]}
            className={cn('size-4', sortDirection === 'none' && 'text-muted-foreground')}
            aria-hidden
          />
        </button>
      ) : (
        children
      )}
    </th>
  )
}

interface TableHeaderProps<Row> extends Omit<ComponentProps<'thead'>, 'children'> {
  columns: TableColumn<Row>[]
}

export const TableHeader = <Row,>({ columns, className, ...props }: TableHeaderProps<Row>) => {
  const [sort, setSort] = useSortParam()
  const visibleColumns = columns.filter((column) => !column.hidden)

  return (
    <thead className={cn('sticky top-0 z-10 bg-table-header', className)} {...props}>
      <TableRow className="border-b-0 hover:bg-transparent">
        {visibleColumns.map((column) => (
          <TableHead
            key={column.id}
            scope="col"
            sortDirection={sort?.columnId === column.id ? sort.direction : 'none'}
            onSort={column.sort ? () => setSort(getNextSort(sort, column.id)) : undefined}
            className={cn(column.align === 'right' && 'text-right', column.className)}
          >
            {column.header}
          </TableHead>
        ))}
      </TableRow>
    </thead>
  )
}
