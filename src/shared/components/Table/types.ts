import type { ReactNode } from 'react'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  columnId: string
  direction: SortDirection
}

export type TableAlign = 'left' | 'right'

export interface TableColumn<Row> {
  id: string
  header: ReactNode
  cell: (row: Row) => ReactNode
  align?: TableAlign
  sort?: boolean
  hidden?: boolean
  className?: string
}
