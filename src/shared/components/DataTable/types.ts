import type { TableColumn } from '@/shared/components/Table/types'

export interface DataTableProps<Row> {
  label: string
  columns: TableColumn<Row>[]
  rows: Row[]
  getRowId: (row: Row) => string
  isLoading: boolean
  skeletonRows?: number
  className?: string
}
