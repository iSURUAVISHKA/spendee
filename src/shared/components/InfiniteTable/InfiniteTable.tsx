import type { ReactNode } from 'react'
import { Button } from '@/shared/components/Button/Button'
import { Spinner } from '@/shared/components/Spinner/Spinner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/Table/Table'
import { Text } from '@/shared/components/Text/Text'
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll'
import { cn } from '@/shared/utils/cn'

export type InfiniteTableAlign = 'left' | 'right'

export interface InfiniteTableColumn<Row> {
  id: string
  header: ReactNode
  cell: (row: Row) => ReactNode
  align?: InfiniteTableAlign
  className?: string
}

interface InfiniteTableProps<Row> {
  caption: string
  columns: InfiniteTableColumn<Row>[]
  rows: Row[]
  getRowId: (row: Row) => string
  hasMore: boolean
  isLoading: boolean
  isFetchingMore: boolean
  isError: boolean
  onLoadMore: () => void
  onRetry: () => void
  emptyMessage?: ReactNode
  errorMessage?: string
  skeletonRows?: number
  className?: string
}

export const InfiniteTable = <Row,>({
  caption,
  columns,
  rows,
  getRowId,
  hasMore,
  isLoading,
  isFetchingMore,
  isError,
  onLoadMore,
  onRetry,
  emptyMessage = 'Nothing here yet.',
  errorMessage = "Couldn't load the data.",
  skeletonRows = 8,
  className,
}: InfiniteTableProps<Row>) => {
  const sentinelRef = useInfiniteScroll<HTMLDivElement>({
    enabled: hasMore && !isLoading && !isFetchingMore && !isError,
    onLoadMore,
  })

  const hasRows = rows.length > 0
  const columnCount = columns.length

  const renderBody = () => {
    if (isLoading) {
      return Array.from({ length: skeletonRows }, (_, rowIndex) => (
        <TableRow key={rowIndex} className="hover:bg-transparent">
          {columns.map((column) => (
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
    }

    if (!hasRows && isError) {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnCount} className="py-12">
            <div role="alert" className="flex flex-col items-center gap-3 text-center">
              <Text size="sm" color="muted">
                {errorMessage}
              </Text>
              <Button variant="secondary" disabled={false} onClick={onRetry}>
                Try again
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )
    }

    if (!hasRows) {
      return (
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={columnCount} className="py-12 text-center">
            <Text render={<div />} size="sm" color="muted">
              {emptyMessage}
            </Text>
          </TableCell>
        </TableRow>
      )
    }

    return (
      <>
        {rows.map((row) => (
          <TableRow key={getRowId(row)}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                className={cn(column.align === 'right' && 'text-right', column.className)}
              >
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}

        {isFetchingMore && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columnCount} className="py-4 text-center">
              <Spinner size="sm" label="Loading more" className="text-muted-foreground" />
            </TableCell>
          </TableRow>
        )}

        {isError && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columnCount} className="py-4">
              <div role="alert" className="flex items-center justify-center gap-3">
                <Text size="sm" color="muted">
                  Couldn't load more.
                </Text>
                <Button variant="link" disabled={false} onClick={onRetry}>
                  Try again
                </Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </>
    )
  }

  return (
    <div className={cn('overflow-auto rounded-md border border-muted bg-card', className)}>
      <Table aria-busy={isLoading || isFetchingMore}>
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow className="border-b-0 hover:bg-transparent">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                scope="col"
                className={cn(column.align === 'right' && 'text-right', column.className)}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{renderBody()}</TableBody>
      </Table>
      {hasRows && <div ref={sentinelRef} aria-hidden="true" />}
    </div>
  )
}
