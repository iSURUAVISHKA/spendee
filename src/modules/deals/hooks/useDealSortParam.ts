import { pageParam, sortParam } from '@/shared/constants/searchParams'
import { useSearchParamState } from '@/shared/hooks/useSearchParamState'
import { dealSorts, defaultDealSort } from '../constants'
import type { DealSort } from '../types'

const isDealSort = (value: string): value is DealSort => dealSorts.some((sort) => sort === value)

export const useDealSortParam = () =>
  useSearchParamState<DealSort>(sortParam, {
    defaultValue: defaultDealSort,
    serialize: (sort) => sort,
    deserialize: (value) => (isDealSort(value) ? value : null),
    resetKeys: [pageParam],
  })
