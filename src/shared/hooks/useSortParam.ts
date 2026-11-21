import type { SortState } from '@/shared/components/Table/types'
import { pageParam, sortParam } from '@/shared/constants/searchParams'
import { useSearchParamState } from './useSearchParamState'

const serializeSort = (sort: SortState) => `${sort.columnId}.${sort.direction}`

const deserializeSort = (value: string): SortState | null => {
  const [columnId, direction] = value.split('.')

  if (!columnId || !/^[\w-]+$/.test(columnId)) return null

  if (direction !== 'asc' && direction !== 'desc') return null

  return { columnId, direction }
}

export const useSortParam = () =>
  useSearchParamState<SortState | null>(sortParam, {
    defaultValue: null,
    serialize: serializeSort,
    deserialize: deserializeSort,
    resetKeys: [pageParam],
  })
