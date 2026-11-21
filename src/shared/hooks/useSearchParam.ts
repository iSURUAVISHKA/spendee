import { pageParam, searchParam } from '@/shared/constants/searchParams'
import { useSearchParamState } from './useSearchParamState'

export const useSearchParam = () =>
  useSearchParamState(searchParam, {
    defaultValue: '',
    serialize: (value) => value,
    deserialize: (value) => value,
    resetKeys: [pageParam],
    replace: true,
  })
